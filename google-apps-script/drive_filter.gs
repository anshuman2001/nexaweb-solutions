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
var MAX_EXEC_MS = 5 * 60 * 1000; // 5 min safety margin

// ── Entry point — returns IMMEDIATELY, schedules processing via trigger ─────────
function doGet(e) {
  var action     = e.parameter.action    || 'start';
  var jobId      = e.parameter.jobId     || '';
  var folderId   = e.parameter.folderId  || '';
  var websiteCol = e.parameter.col       || 'Website';

  if (action === 'status')   return getStatus(jobId);
  if (action === 'download') return getDownloadInfo(jobId);

  // ── Start new job ──────────────────────────────────────────────────────────
  jobId = 'job_' + Date.now();

  // Create output file immediately
  var outFile = DriveApp.createFile(
    'no_website_output_' + jobId + '.csv',
    '',
    MimeType.PLAIN_TEXT
  );

  // Store all job state
  PROPS.setProperty(jobId + '_status',     'processing');
  PROPS.setProperty(jobId + '_folderId',   folderId);
  PROPS.setProperty(jobId + '_col',        websiteCol);
  PROPS.setProperty(jobId + '_total',      '0');
  PROPS.setProperty(jobId + '_noWeb',      '0');
  PROPS.setProperty(jobId + '_filesDone',  '0');
  PROPS.setProperty(jobId + '_totalFiles', '0');
  PROPS.setProperty(jobId + '_headerDone', 'false');
  PROPS.setProperty(jobId + '_outFileId',  outFile.getId());

  // Schedule background processing — doGet returns right away
  PROPS.setProperty('pendingJob', jobId);
  ScriptApp.newTrigger('processPendingJob')
    .timeBased().after(2000)
    .create();

  return jsonResponse({ jobId: jobId, status: 'processing' });
}

// ── Background trigger entry point ─────────────────────────────────────────────
function processPendingJob() {
  var jobId = PROPS.getProperty('pendingJob');
  if (!jobId) return;
  PROPS.deleteProperty('pendingJob');
  deleteTriggers('processPendingJob');
  runBatch(jobId);
}

// ── Continue trigger (for jobs that hit time limit mid-way) ───────────────────
function continueJob() {
  var jobId = PROPS.getProperty('continueJobId');
  if (!jobId) return;
  PROPS.deleteProperty('continueJobId');
  deleteTriggers('continueJob');
  runBatch(jobId);
}

// ── Core batch processor ───────────────────────────────────────────────────────
function runBatch(jobId) {
  var startTime  = Date.now();
  var folderId   = PROPS.getProperty(jobId + '_folderId');
  var websiteCol = PROPS.getProperty(jobId + '_col');
  var outFileId  = PROPS.getProperty(jobId + '_outFileId');
  var filesDone  = parseInt(PROPS.getProperty(jobId + '_filesDone')  || '0');
  var total      = parseInt(PROPS.getProperty(jobId + '_total')      || '0');
  var noWeb      = parseInt(PROPS.getProperty(jobId + '_noWeb')      || '0');
  var headerDone = PROPS.getProperty(jobId + '_headerDone') === 'true';

  // Collect file list (cached after first run)
  var fileListJson = PROPS.getProperty(jobId + '_fileList');
  var allFileIds;
  if (fileListJson) {
    allFileIds = JSON.parse(fileListJson);
  } else {
    allFileIds = getAllCsvFileIds(folderId);
    PROPS.setProperty(jobId + '_fileList', JSON.stringify(allFileIds));
    PROPS.setProperty(jobId + '_totalFiles', String(allFileIds.length));
  }

  var totalFiles = allFileIds.length;
  var outFile    = DriveApp.getFileById(outFileId);
  var buf        = [];

  for (var i = filesDone; i < totalFiles; i++) {

    // Time check — save state and schedule continuation
    if (Date.now() - startTime > MAX_EXEC_MS) {
      flushBuf(outFile, buf);
      PROPS.setProperty(jobId + '_filesDone', String(i));
      PROPS.setProperty(jobId + '_total',     String(total));
      PROPS.setProperty(jobId + '_noWeb',     String(noWeb));
      PROPS.setProperty(jobId + '_headerDone', String(headerDone));
      PROPS.setProperty('continueJobId', jobId);
      ScriptApp.newTrigger('continueJob').timeBased().after(60000).create();
      return;
    }

    var fileId = allFileIds[i];
    try {
      var file = DriveApp.getFileById(fileId);
      var csv  = file.getBlob().getDataAsString('UTF-8');
      var rows = Utilities.parseCsv(csv);
      if (rows.length < 2) continue;

      var headers = rows[0];
      var colIdx  = findColIndex(headers, websiteCol);

      if (!headerDone) {
        buf.push(rows[0].map(quoteField).join(',') + ',Source File');
        headerDone = true;
      }

      for (var r = 1; r < rows.length; r++) {
        total++;
        var website = colIdx >= 0 && rows[r].length > colIdx
          ? rows[r][colIdx].trim() : '';
        if (!website) {
          noWeb++;
          buf.push(rows[r].map(quoteField).join(',') + ',' + quoteField(file.getName()));
        }
      }
    } catch (err) {
      // skip bad files
    }

    // Flush buffer every 10 files
    if ((i + 1) % 10 === 0) {
      flushBuf(outFile, buf);
      buf = [];
    }
  }

  // Final flush
  flushBuf(outFile, buf);

  // Share output file
  outFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  PROPS.setProperty(jobId + '_status',      'done');
  PROPS.setProperty(jobId + '_total',       String(total));
  PROPS.setProperty(jobId + '_noWeb',       String(noWeb));
  PROPS.setProperty(jobId + '_filesDone',   String(totalFiles));
  PROPS.setProperty(jobId + '_downloadUrl',
    'https://drive.google.com/uc?export=download&id=' + outFileId);
}

// ── Status / download endpoints ────────────────────────────────────────────────
function getStatus(jobId) {
  if (!jobId) return jsonResponse({ error: 'No jobId' });
  return jsonResponse({
    status:      PROPS.getProperty(jobId + '_status')     || 'unknown',
    totalRows:   parseInt(PROPS.getProperty(jobId + '_total')      || '0'),
    noWebRows:   parseInt(PROPS.getProperty(jobId + '_noWeb')      || '0'),
    filesDone:   parseInt(PROPS.getProperty(jobId + '_filesDone')  || '0'),
    totalFiles:  parseInt(PROPS.getProperty(jobId + '_totalFiles') || '0'),
    downloadUrl: PROPS.getProperty(jobId + '_downloadUrl') || '',
  });
}

function getDownloadInfo(jobId) {
  return jsonResponse({ downloadUrl: PROPS.getProperty(jobId + '_downloadUrl') || '' });
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function getAllCsvFileIds(folderId) {
  var ids = [];
  collectFileIds(DriveApp.getFolderById(folderId), ids);
  return ids;
}

function collectFileIds(folder, acc) {
  var fileIter = folder.getFiles();
  while (fileIter.hasNext()) {
    var f = fileIter.next();
    if (f.getName().toLowerCase().endsWith('.csv')) acc.push(f.getId());
  }
  var subIter = folder.getFolders();
  while (subIter.hasNext()) collectFileIds(subIter.next(), acc);
}

function flushBuf(outFile, buf) {
  if (!buf.length) return;
  var existing = outFile.getBlob().getDataAsString('UTF-8');
  outFile.setContent(existing + buf.join('\n') + '\n');
}

function findColIndex(headers, colName) {
  var lower = colName.toLowerCase();
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].trim().toLowerCase() === lower) return i;
  }
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

function deleteTriggers(fnName) {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === fnName) ScriptApp.deleteTrigger(t);
  });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
