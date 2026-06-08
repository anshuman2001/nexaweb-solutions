(() => {
  // State
  let selectedStyle = 'modern-indian';
  let uploadedFile = null;
  let originalImageDataUrl = null;
  let isGenerating = false;

  // Elements
  const uploadZone = document.getElementById('uploadZone');
  const imageInput = document.getElementById('imageInput');
  const uploadContent = document.getElementById('uploadContent');
  const previewImg = document.getElementById('previewImg');
  const promptInput = document.getElementById('promptInput');
  const strengthSlider = document.getElementById('strengthSlider');
  const sliderValue = document.getElementById('sliderValue');
  const generateBtn = document.getElementById('generateBtn');
  const generateBtnText = document.getElementById('generateBtnText');
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.getElementById('closeSettings');
  const saveSettings = document.getElementById('saveSettings');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const toast = document.getElementById('toast');

  // Result elements
  const emptyState = document.getElementById('emptyState');
  const loadingState = document.getElementById('loadingState');
  const resultWrap = document.getElementById('resultWrap');
  const errorState = document.getElementById('errorState');
  const resultImg = document.getElementById('resultImg');
  const beforeImg = document.getElementById('beforeImg');
  const downloadBtn = document.getElementById('downloadBtn');
  const compareBtn = document.getElementById('compareBtn');
  const compareOverlay = document.getElementById('compareOverlay');
  const retryBtn = document.getElementById('retryBtn');

  // Loading steps
  const steps = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4')
  ];

  // ── Upload ──
  uploadZone.addEventListener('click', () => imageInput.click());

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });

  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageFile(file);
    else showToast('Please drop an image file', 'error');
  });

  imageInput.addEventListener('change', () => {
    if (imageInput.files[0]) handleImageFile(imageInput.files[0]);
  });

  function handleImageFile(file) {
    if (file.size > 20 * 1024 * 1024) {
      showToast('Image must be under 20MB', 'error');
      return;
    }
    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      originalImageDataUrl = e.target.result;
      previewImg.src = e.target.result;
      previewImg.classList.add('visible');
      uploadContent.style.display = 'none';
      checkReady();
    };
    reader.readAsDataURL(file);
    showToast('Image loaded ✓', 'success');
  }

  // ── Style chips ──
  document.querySelectorAll('.style-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.style-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedStyle = chip.dataset.style;
    });
  });

  // ── Prompt tags ──
  document.querySelectorAll('.prompt-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const tagText = tag.dataset.tag;
      const current = promptInput.value;
      if (!current.includes(tagText)) {
        promptInput.value = current ? `${current}, ${tagText}` : tagText;
      }
    });
  });

  // ── Slider ──
  strengthSlider.addEventListener('input', () => {
    sliderValue.textContent = `${Math.round(strengthSlider.value * 100)}%`;
  });

  // ── Settings ──
  settingsBtn.addEventListener('click', () => {
    const saved = sessionStorage.getItem('replicate_key') || '';
    apiKeyInput.value = saved;
    settingsModal.classList.add('open');
  });

  closeSettings.addEventListener('click', () => settingsModal.classList.remove('open'));
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.classList.remove('open');
  });

  saveSettings.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (!key) { showToast('Please enter your API token', 'error'); return; }
    sessionStorage.setItem('replicate_key', key);
    settingsModal.classList.remove('open');
    showToast('API token saved ✓', 'success');
    checkReady();
  });

  // ── Generate ──
  generateBtn.addEventListener('click', generate);
  retryBtn.addEventListener('click', generate);

  function checkReady() {
    const hasImage = !!uploadedFile;
    generateBtn.disabled = !hasImage || isGenerating;
  }

  async function generate() {
    if (isGenerating) return;

    const apiKey = sessionStorage.getItem('replicate_key') || '';
    const prompt = promptInput.value.trim();

    if (!uploadedFile) {
      showToast('Please upload a room photo first', 'error');
      return;
    }

    isGenerating = true;
    generateBtn.disabled = true;
    generateBtn.classList.add('loading');
    generateBtnText.textContent = '⏳ Generating...';

    showState('loading');
    animateSteps();

    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('prompt', prompt);
      formData.append('style_preset', selectedStyle);
      formData.append('strength', strengthSlider.value);
      formData.append('api_key', apiKey);

      const res = await fetch('/api/redesign', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      // Show result
      resultImg.src = data.imageUrl;
      beforeImg.src = originalImageDataUrl;
      downloadBtn.href = data.imageUrl;

      resultImg.onload = () => {
        showState('result');
        showToast('Design generated! ✓', 'success');
      };

    } catch (err) {
      console.error(err);
      document.getElementById('errorTitle').textContent = 'Generation failed';
      document.getElementById('errorHint').textContent = err.message || 'Check your API key in Settings and try again.';
      showState('error');
      showToast(err.message || 'Generation failed', 'error');
    } finally {
      isGenerating = false;
      generateBtn.disabled = false;
      generateBtn.classList.remove('loading');
      generateBtnText.textContent = '✦ Generate Design';
    }
  }

  // ── Compare ──
  let compareMode = false;
  compareBtn.addEventListener('click', () => {
    compareMode = !compareMode;
    compareOverlay.style.display = compareMode ? 'grid' : 'none';
    compareBtn.textContent = compareMode ? '✕ Close Compare' : '⇄ Compare';
  });

  // ── State manager ──
  function showState(state) {
    emptyState.style.display = 'none';
    loadingState.style.display = 'none';
    resultWrap.style.display = 'none';
    errorState.style.display = 'none';

    if (state === 'empty') emptyState.style.display = '';
    else if (state === 'loading') loadingState.style.display = '';
    else if (state === 'result') resultWrap.style.display = '';
    else if (state === 'error') errorState.style.display = '';
  }

  // ── Loading animation ──
  let stepInterval = null;
  function animateSteps() {
    steps.forEach(s => { s.classList.remove('active', 'done'); });
    let current = 0;
    steps[0].classList.add('active');

    stepInterval = setInterval(() => {
      if (current < steps.length - 1) {
        steps[current].classList.remove('active');
        steps[current].classList.add('done');
        current++;
        steps[current].classList.add('active');
      }
    }, 22000 / steps.length);

    setTimeout(() => clearInterval(stepInterval), 90000);
  }

  // ── Toast ──
  let toastTimer = null;
  function showToast(msg, type = '') {
    toast.textContent = msg;
    toast.className = `toast show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Init
  checkReady();

})();
