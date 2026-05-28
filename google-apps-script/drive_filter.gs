/**
 * DigiAgentix — No-Website Filter
 * Google Apps Script Web App
 *
 * DEPLOY STEPS:
 * 1. Open https://script.google.com → New Project
 * 2. Paste this entire file
 * 3. Click Deploy → New Deployment → Web App
 * 4. Execute as: Me | Who has access: Anyone
 * 5. Copy the Web App URL → paste into the tool on digiagentix.com
 */

var PROPS = PropertiesService.getScriptProperties();
var MAX_EXEC_MS = 5 * 60 * 1000; // 5 min safety margin (6 min limit)

// ── Entry point ────────────────────────────────────────────────────────────────
function doGet(e) {
  var action    = e.parameter.action    || 'start';
  var jobId     = e.parameter.jobId     || '';
  var folderId  = e.parameter.folderId  || '';
  var websiteCol = e.parameter.col      || 'Website';

  if (action === 'status') return getStatus(jobId);
  if (action === 'download') return getDownloadInfo(jobId);

  // Start new job
  jobId = 'job_' + Date.now();
  PROPS.setProperty(jobId + '_status',    'processing');
  PROPS.setProperty(jobId + '_folderId',  folderId);
  PROPS.setProperty(jobId + '_col',       websiteCol);
  PROPS.setProperty(jobId + '_total',     '0');
  PROPS.setProperty(jobId + '_noWeb',     '0');
  PROPS.setProperty(jobId + '_filesDone', '0');
  PROPS.setProperty(jobId + '_outFileId', '');

  // Create output CSV in Drive root
  var outFile = DriveApp.createFile(
    'no_website_output_' + jobId + '.csv',
    '',
    MimeType.CSV
  );
  PROPS.setProperty(jobId + '_outFileId', outFile.getId());

  // Run first batch (will schedule continuation if needed)
  runBatch(jobId);

  return jsonResponse({ jobId: jobId, status: 'processing' });
}

// ── Batch processor ────────────────────────────────────────────────────────────
function runBatch(jobId) {
  var startTime   = Date.now();
  var folderId    = PROPS.getProperty(jobId + '_folderId');
  var websiteCol  = PROPS.getProperty(jobId + '_col');
  var outFileId   = PROPS.getProperty(jobId + '_outFileId');
  var filesDone   = parseInt(PROPS.getProperty(jobId + '_filesDone') || '0');
  var total       = parseInt(PROPS.getProperty(jobId + '_total')     || '0');
  var noWeb       = parseInt(PROPS.getProperty(jobId + '_noWeb')     || '0');
  var headerDone  = PROPS.getProperty(jobId + '_headerDone') === 'true';

  // Collect all CSV files
  var allFiles = getAllCsvFiles(folderId);
  var totalFiles = allFiles.length;

  PROPS.setProperty(jobId + '_totalFiles', String(totalFiles));

  var outFile = DriveApp.getFileById(outFileId);
  var content = outFile.getBlob().getDataAsString();

  for (var i = filesDone; i < totalFiles; i++) {
    // Time check
    if (Date.now() - startTime > MAX_EXEC_MS) {
      // Save state and schedule continuation
      PROPS.setProperty(jobId + '_filesDone', String(i));
      PROPS.setProperty(jobId + '_total',     String(total));
      PROPS.setProperty(jobId + '_noWeb',     String(noWeb));
      PROPS.setProperty(jobId + '_headerDone', String(headerDone));
      PROPS.setProperty(jobId + '_outContent', content);

      // Schedule next batch via time trigger (1 minute from now)
      ScriptApp.newTrigger('continueBatch_' + jobId)
        .timeBased().after(1 * 60 * 1000).create();

      // Store jobId for trigger
      PROPS.setProperty('trigger_' + jobId, jobId);
      PROPS.setProperty(jobId + '_status', 'processing');
      return;
    }

    var file = allFiles[i];
    if (!file.getName().toLowerCase().endsWith('.csv')) continue;

    try {
      var csv = file.getBlob().getDataAsString('UTF-8');
      var rows = Utilities.parseCsv(csv);
      if (rows.length < 2) continue;

      var headers = rows[0];
      var colIdx = findColIndex(headers, websiteCol);

      if (!headerDone) {
        content += rows[0].map(quoteField).join(',') + ',Source File\n';
        headerDone = true;
      }

      for (var r = 1; r < rows.length; r++) {
        total++;
        var website = colIdx >= 0 && rows[r].length > colIdx ? rows[r][colIdx].trim() : '';
        if (!website) {
          noWeb++;
          content += rows[r].map(quoteField).join(',') + ',' + quoteField(file.getName()) + '\n';
        }
      }
    } catch (err) {
      // Skip bad files silently
    }

    // Write every 5 files to avoid memory bloat
    if ((i + 1) % 5 === 0) {
      outFile.setContent(content);
      content = outFile.getBlob().getDataAsString();
    }
  }

  // All done
  outFile.setContent(content);
  outFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  PROPS.setProperty(jobId + '_status',    'done');
  PROPS.setProperty(jobId + '_total',     String(total));
  PROPS.setProperty(jobId + '_noWeb',     String(noWeb));
  PROPS.setProperty(jobId + '_filesDone', String(totalFiles));
  PROPS.setProperty(jobId + '_downloadUrl',
    'https://drive.google.com/uc?export=download&id=' + outFileId);
}

// ── Trigger continuation (called by time-based trigger) ────────────────────────
function continueBatch(e) {
  // Find which job this trigger belongs to
  var keys = PROPS.getKeys();
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].startsWith('trigger_')) {
      var jobId = PROPS.getProperty(keys[i]);
      PROPS.deleteProperty(keys[i]);

      // Restore content from saved state
      var savedContent = PROPS.getProperty(jobId + '_outContent') || '';
      var outFileId = PROPS.getProperty(jobId + '_outFileId');
      DriveApp.getFileById(outFileId).setContent(savedContent);
      PROPS.deleteProperty(jobId + '_outContent');

      runBatch(jobId);
      break;
    }
  }
}

// ── Status endpoint ────────────────────────────────────────────────────────────
function getStatus(jobId) {
  if (!jobId) return jsonResponse({ error: 'No jobId' });
  var status     = PROPS.getProperty(jobId + '_status')     || 'unknown';
  var total      = PROPS.getProperty(jobId + '_total')      || '0';
  var noWeb      = PROPS.getProperty(jobId + '_noWeb')      || '0';
  var filesDone  = PROPS.getProperty(jobId + '_filesDone')  || '0';
  var totalFiles = PROPS.getProperty(jobId + '_totalFiles') || '0';
  var dlUrl      = PROPS.getProperty(jobId + '_downloadUrl')|| '';

  return jsonResponse({
    status: status,
    totalRows: parseInt(total),
    noWebRows: parseInt(noWeb),
    filesDone: parseInt(filesDone),
    totalFiles: parseInt(totalFiles),
    downloadUrl: dlUrl,
  });
}

function getDownloadInfo(jobId) {
  var dlUrl = PROPS.getProperty(jobId + '_downloadUrl') || '';
  return jsonResponse({ downloadUrl: dlUrl });
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function getAllCsvFiles(folderId) {
  var files = [];
  collectFiles(DriveApp.getFolderById(folderId), files);
  return files;
}

function collectFiles(folder, acc) {
  var fileIter = folder.getFiles();
  while (fileIter.hasNext()) acc.push(fileIter.next());
  var subIter = folder.getFolders();
  while (subIter.hasNext()) collectFiles(subIter.next(), acc);
}

function findColIndex(headers, colName) {
  var lower = colName.toLowerCase();
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].trim().toLowerCase() === lower) return i;
  }
  // fallback: any header containing 'website'
  for (var j = 0; j < headers.length; j++) {
    if (headers[j].toLowerCase().indexOf('website') >= 0) return j;
  }
  return -1;
}

function quoteField(val) {
  if (!val) return '';
  val = String(val);
  if (val.indexOf(',') >= 0 || val.indexOf('"') >= 0 || val.indexOf('\n') >= 0) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
