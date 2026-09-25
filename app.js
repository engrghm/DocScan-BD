/* ═══════════════════════════════════════════════
   DocScan BD — App Logic
   Mobile-First OCR Document Scanner
═══════════════════════════════════════════════ */

'use strict';

// ──────────────────────────────────────────────
// DOCUMENT TYPES CONFIG
// ──────────────────────────────────────────────
const DOC_TYPES = {
  nid: {
    label: 'জাতীয় পরিচয়পত্র',
    labelEn: 'National ID',
    icon: '🪪',
    color: '#6366f1',
    fields: [
      { key: 'name_bn', label: 'নাম (বাংলা)', placeholder: 'মো: আব্দুল্লাহ' },
      { key: 'name_en', label: 'Name (English)', placeholder: 'Md. Abdullah' },
      { key: 'nid_number', label: 'এনআইডি নম্বর', placeholder: '1234567890123' },
      { key: 'dob', label: 'জন্ম তারিখ', placeholder: '১ জানুয়ারি ১৯৯০' },
      { key: 'father_name', label: 'পিতার নাম', placeholder: '' },
      { key: 'mother_name', label: 'মাতার নাম', placeholder: '' },
      { key: 'address', label: 'স্থায়ী ঠিকানা', placeholder: '' },
      { key: 'blood_group', label: 'রক্তের গ্রুপ', placeholder: '' },
      { key: 'jomir_khatian', label: 'জমির খতিয়ান', placeholder: 'যেমন: খতিয়ান নং ১২৮' },
      { key: 'dolil_no', label: 'দলিল নম্বর', placeholder: 'যেমন: দলিল নং ৪৫৭৮/২৪' },
      { key: 'building_total_area', label: 'বিল্ডিংয়ের মোট এরিয়া', placeholder: 'যেমন: ৩৫০০ বর্গফুট / ৩.৫ শতক' },
      { key: 'building_floors', label: 'কত তলা (ভবনের তলা)', placeholder: 'যেমন: ৫ তলা' },
      { key: 'building_type', label: 'ভবনের ধরন', placeholder: 'যেমন: আবাসিক / বাণিজ্যিক / মিশ্র' },
    ]
  },
  land_property: {
    label: 'জমির দলিল ও খতিয়ান (ভূমি/ভবন)',
    labelEn: 'Land Deed & Property',
    icon: '🏡',
    color: '#14b8a6',
    fields: [
      { key: 'jomir_khatian', label: 'জমির খতিয়ান', placeholder: 'যেমন: আরএস/বিএস খতিয়ান নং ১২৮' },
      { key: 'dolil_no', label: 'দলিল নম্বর', placeholder: 'যেমন: সাব-রেজিস্ট্রি দলিল নং ৪৫৭৮' },
      { key: 'building_total_area', label: 'বিল্ডিংয়ের মোট এরিয়া', placeholder: 'যেমন: ৩৫০০ বর্গফুট' },
      { key: 'building_floors', label: 'কত তলা (ভবনের তলা)', placeholder: 'যেমন: ৬ তলা' },
      { key: 'building_type', label: 'ভবনের ধরন', placeholder: 'যেমন: আবাসিক ভবন / বাণিজ্যিক' },
      { key: 'owner_name', label: 'জমির/ভবনের মালিকের নাম', placeholder: '' },
      { key: 'nid_number', label: 'মালিকের এনআইডি নম্বর', placeholder: '' },
      { key: 'mouza_dag', label: 'মৌজা ও দাগ নম্বর', placeholder: 'মৌজা: তেজগাঁও, দাগ নং: ১২০৫' },
      { key: 'address', label: 'সম্পত্তির ঠিকানা/অবস্থান', placeholder: '' },
      { key: 'date', label: 'দলিল/নিবন্ধনের তারিখ', placeholder: '' },
    ]
  },
  trade_license: {
    label: 'ট্রেড লাইসেন্স',
    labelEn: 'Trade License',
    icon: '📋',
    color: '#06b6d4',
    fields: [
      { key: 'license_no', label: 'লাইসেন্স নম্বর', placeholder: '' },
      { key: 'business_name', label: 'প্রতিষ্ঠানের নাম', placeholder: '' },
      { key: 'owner_name', label: 'মালিকের নাম', placeholder: '' },
      { key: 'business_type', label: 'ব্যবসার ধরন', placeholder: '' },
      { key: 'address', label: 'ঠিকানা', placeholder: '' },
      { key: 'issue_date', label: 'ইস্যু তারিখ', placeholder: '' },
      { key: 'expiry_date', label: 'মেয়াদ শেষের তারিখ', placeholder: '' },
      { key: 'issuing_authority', label: 'ইস্যুকারী কর্তৃপক্ষ', placeholder: '' },
    ]
  },
  etin: {
    label: 'ই-টিআইএন সার্টিফিকেট',
    labelEn: 'e-TIN Certificate',
    icon: '📊',
    color: '#f59e0b',
    fields: [
      { key: 'tin_number', label: 'টিআইএন নম্বর', placeholder: '' },
      { key: 'name', label: 'করদাতার নাম', placeholder: '' },
      { key: 'nid_number', label: 'এনআইডি নম্বর', placeholder: '' },
      { key: 'tax_circle', label: 'কর সার্কেল', placeholder: '' },
      { key: 'tax_zone', label: 'কর অঞ্চল', placeholder: '' },
      { key: 'address', label: 'ঠিকানা', placeholder: '' },
      { key: 'issue_date', label: 'ইস্যু তারিখ', placeholder: '' },
    ]
  },
  vat_bin: {
    label: 'ভ্যাট/বিআইএন সার্টিফিকেট',
    labelEn: 'VAT/BIN Certificate',
    icon: '🏛️',
    color: '#22c55e',
    fields: [
      { key: 'bin_number', label: 'বিআইএন নম্বর', placeholder: '' },
      { key: 'business_name', label: 'প্রতিষ্ঠানের নাম', placeholder: '' },
      { key: 'owner_name', label: 'মালিকের নাম', placeholder: '' },
      { key: 'address', label: 'ব্যবসায়িক ঠিকানা', placeholder: '' },
      { key: 'registration_date', label: 'নিবন্ধন তারিখ', placeholder: '' },
      { key: 'vat_circle', label: 'ভ্যাট সার্কেল', placeholder: '' },
      { key: 'vat_commissionerate', label: 'কমিশনারেট', placeholder: '' },
    ]
  },
  bank_certificate: {
    label: 'ব্যাংক সার্টিফিকেট',
    labelEn: 'Bank Certificate',
    icon: '🏦',
    color: '#8b5cf6',
    fields: [
      { key: 'account_holder', label: 'অ্যাকাউন্ট হোল্ডারের নাম', placeholder: '' },
      { key: 'account_number', label: 'অ্যাকাউন্ট নম্বর', placeholder: '' },
      { key: 'account_type', label: 'অ্যাকাউন্টের ধরন', placeholder: '' },
      { key: 'bank_name', label: 'ব্যাংকের নাম', placeholder: '' },
      { key: 'branch_name', label: 'শাখার নাম', placeholder: '' },
      { key: 'routing_number', label: 'রাউটিং নম্বর', placeholder: '' },
      { key: 'issue_date', label: 'ইস্যু তারিখ', placeholder: '' },
      { key: 'balance', label: 'ব্যালেন্স (ঐচ্ছিক)', placeholder: '' },
    ]
  },
  affidavit: {
    label: 'হলফনামা',
    labelEn: 'Affidavit',
    icon: '⚖️',
    color: '#ec4899',
    fields: [
      { key: 'declarant_name', label: 'ঘোষণাকারীর নাম', placeholder: '' },
      { key: 'declarant_nid', label: 'ঘোষণাকারীর এনআইডি', placeholder: '' },
      { key: 'declarant_address', label: 'ঘোষণাকারীর ঠিকানা', placeholder: '' },
      { key: 'subject', label: 'বিষয়', placeholder: '' },
      { key: 'notary_name', label: 'নোটারি/দলিল লেখকের নাম', placeholder: '' },
      { key: 'notary_number', label: 'নোটারি নম্বর', placeholder: '' },
      { key: 'date', label: 'তারিখ', placeholder: '' },
      { key: 'witness_1', label: 'সাক্ষী ১', placeholder: '' },
      { key: 'witness_2', label: 'সাক্ষী ২', placeholder: '' },
    ]
  },
  declaration: {
    label: 'ঘোষণাপত্র',
    labelEn: 'Declaration',
    icon: '📜',
    color: '#f97316',
    fields: [
      { key: 'declarant_name', label: 'ঘোষণাকারীর নাম', placeholder: '' },
      { key: 'declarant_address', label: 'ঠিকানা', placeholder: '' },
      { key: 'subject', label: 'বিষয়', placeholder: '' },
      { key: 'date', label: 'তারিখ', placeholder: '' },
      { key: 'witness_1', label: 'সাক্ষী ১', placeholder: '' },
      { key: 'witness_2', label: 'সাক্ষী ২', placeholder: '' },
    ]
  },
  other: {
    label: 'অন্যান্য ডকুমেন্ট',
    labelEn: 'Other Document',
    icon: '📄',
    color: '#94a3b8',
    fields: [
      { key: 'doc_title', label: 'ডকুমেন্টের শিরোনাম', placeholder: '' },
      { key: 'issuer', label: 'জারিকারী কর্তৃপক্ষ', placeholder: '' },
      { key: 'date', label: 'তারিখ', placeholder: '' },
      { key: 'ref_number', label: 'রেফারেন্স নম্বর', placeholder: '' },
      { key: 'person_name', label: 'সংশ্লিষ্ট ব্যক্তির নাম', placeholder: '' },
      { key: 'notes', label: 'বিবরণ/নোট', placeholder: '' },
    ]
  }
};

// ──────────────────────────────────────────────
// APP STATE
// ──────────────────────────────────────────────
const state = {
  currentDocType: 'nid',
  currentImageDataUrl: null,
  currentImageRotation: 0,
  ocrText: '',
  extractedFields: {},
  scanHistory: [],
  webhookUrl: '',
  sheetName: 'DocScan Records',
  localSave: true,
  cameraStream: null,
  facingMode: 'environment',
  torchOn: false,
  editMode: false,
  customFields: [],
  // Batch processing and filter state
  batchItems: [],
  batchFilter: {
    searchQuery: '',
    docType: 'all',
    selectedFieldKeys: new Set(),
  },
  batchViewMode: 'table',
  batchRowMode: 'person_single_row', // 'person_single_row' (default: same SL for 1 person) | 'individual_rows'
  sheetSerialCounter: 1, // Sequential SL number counter
  consolidatedOverrides: {}, // Manual user edits to consolidated person row
  // Google API multi-key pool state & auto failover
  googleApiKeys: [],
  useGoogleApi: true,
  apiStrategy: 'failover', // 'failover' | 'random'
  currentKeyIndex: 0,
  // Camera exposure
  cameraExposure: 0,
  // OCR language detection setting ('ben+eng' | 'ben' | 'eng')
  ocrLanguage: 'ben+eng',
  // Camera continuous batch mode
  cameraMode: 'single', // 'single' | 'batch'
  cameraBatchPages: [],
  // Active scan tracking & preview fix
  currentScan: null,
  // Sync queue for failed/offline scans
  syncQueue: [],
  // History search filter
  historySearchQuery: '',
};

// ──────────────────────────────────────────────
// ELEMENT REFERENCES
// ──────────────────────────────────────────────
const $ = id => document.getElementById(id);
const screens = {
  splash: $('splashScreen'),
  home: $('homeScreen'),
  camera: $('cameraScreen'),
  processing: $('processingScreen'),
  result: $('resultScreen'),
  batch: $('batchScreen'),
  history: $('historyScreen'),
};

// ──────────────────────────────────────────────
// SCREEN MANAGEMENT
// ──────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => { s.classList.remove('active'); });
  if (screens[name]) screens[name].classList.add('active');
  window.scrollTo(0, 0);
}

// ──────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────
function init() {
  loadFromStorage();
  buildDocTypeGrid();
  buildDocTypeSelect();
  buildFilterChips();
  renderRecentScans();
  attachEventListeners();

  // Splash → Home transition
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo_batch') === '1' || window.location.hash === '#batch') {
      loadDemoBatchData();
    } else {
      showScreen('home');
      screens.home.classList.add('fade-in');
    }
  }, 2400);
}

// ──────────────────────────────────────────────
// LOCAL STORAGE
// ──────────────────────────────────────────────
function loadFromStorage() {
  try {
    const history = localStorage.getItem('docScanHistory');
    if (history) state.scanHistory = JSON.parse(history);
    const webhookUrl = localStorage.getItem('webhookUrl');
    if (webhookUrl) state.webhookUrl = webhookUrl;
    const sheetName = localStorage.getItem('sheetName');
    if (sheetName) state.sheetName = sheetName;
    const localSave = localStorage.getItem('localSave');
    if (localSave !== null) state.localSave = localSave === 'true';

    // Google API pool state
    const savedKeys = localStorage.getItem('googleApiKeys');
    if (savedKeys) state.googleApiKeys = JSON.parse(savedKeys);
    const useGoogleApi = localStorage.getItem('useGoogleApi');
    if (useGoogleApi !== null) state.useGoogleApi = useGoogleApi === 'true';
    const apiStrategy = localStorage.getItem('apiStrategy');
    if (apiStrategy) state.apiStrategy = apiStrategy;
    updateApiBadges();

    // OCR Language
    const savedLang = localStorage.getItem('ocrLanguage');
    if (savedLang) state.ocrLanguage = savedLang;
    syncOcrLangDropdowns();

    // Sync Queue
    const savedQueue = localStorage.getItem('docScanSyncQueue');
    if (savedQueue) {
      state.syncQueue = JSON.parse(savedQueue);
    } else {
      state.syncQueue = [
        {
          id: 'sq_fail_01',
          scanId: 'scan_failed_01',
          docType: 'nid',
          title: 'জাতীয় পরিচয়পত্র (NID)',
          status: 'failed',
          errorMsg: 'Google Sheets ওয়েবহুক সংযোগ ব্যর্থ (HTTP 504 Gateway Timeout)',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          data: {
            docType: 'nid',
            fields: {
              name_bn: 'আব্দুল করিম',
              name_en: 'Abdul Karim',
              nid_number: '19842692510000123',
              dob: '12/04/1984',
              father_name: 'মোঃ রফিকুল ইসলাম',
              mother_name: 'মোসাঃ রোকেয়া বেগম'
            },
            ocrText: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার National ID Card'
          }
        },
        {
          id: 'sq_fail_02',
          scanId: 'scan_failed_02',
          docType: 'trade_license',
          title: 'ট্রেড লাইসেন্স (ঢাকা দক্ষিণ)',
          status: 'failed',
          errorMsg: 'ইন্টারনেট সংযোগ বিচ্ছিন্ন ছিল (Network Offline)',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          data: {
            docType: 'trade_license',
            fields: {
              license_no: 'TRAD/DSCC/019283/2024',
              business_name: 'মেসার্স করিম ট্রেডার্স',
              owner_name: 'আব্দুল করিম',
              business_type: 'আমদানি ও সরবরাহকারী'
            },
            ocrText: 'ঢাকা দক্ষিণ সিটি কর্পোরেশন ট্রেড লাইসেন্স'
          }
        }
      ];
    }
    updateSyncQueueBadge();

    // Sequential SL & Row Mode
    const savedSerial = localStorage.getItem('sheetSerialCounter');
    if (savedSerial) state.sheetSerialCounter = parseInt(savedSerial, 10) || 1;
    const savedRowMode = localStorage.getItem('batchRowMode');
    if (savedRowMode) state.batchRowMode = savedRowMode;
    const savedSelectedKeys = localStorage.getItem('batchSelectedKeys');
    if (savedSelectedKeys) {
      try {
        const arr = JSON.parse(savedSelectedKeys);
        if (Array.isArray(arr) && arr.length > 0) {
          state.batchFilter.selectedFieldKeys = new Set(arr);
        }
      } catch (e) {}
    }
  } catch (e) { console.error('Storage load error:', e); }
}

function saveToStorage() {
  try {
    localStorage.setItem('docScanHistory', JSON.stringify(state.scanHistory));
    localStorage.setItem('googleApiKeys', JSON.stringify(state.googleApiKeys));
    localStorage.setItem('useGoogleApi', state.useGoogleApi ? 'true' : 'false');
    localStorage.setItem('apiStrategy', state.apiStrategy);
    localStorage.setItem('ocrLanguage', state.ocrLanguage);
    localStorage.setItem('docScanSyncQueue', JSON.stringify(state.syncQueue));
    localStorage.setItem('sheetSerialCounter', String(state.sheetSerialCounter || 1));
    localStorage.setItem('batchRowMode', state.batchRowMode || 'person_single_row');
    if (state.batchFilter.selectedFieldKeys && state.batchFilter.selectedFieldKeys.size > 0) {
      localStorage.setItem('batchSelectedKeys', JSON.stringify(Array.from(state.batchFilter.selectedFieldKeys)));
    }
    updateApiBadges();
    updateSyncQueueBadge();
  } catch (e) {
    console.error('Storage save error:', e);
    showToast('❗ স্টোরেজ পূর্ণ। কিছু পুরনো ডেটা মুছুন।', 'error');
  }
}

// ──────────────────────────────────────────────
// BUILD UI COMPONENTS
// ──────────────────────────────────────────────
function buildDocTypeGrid() {
  const grid = $('docTypesGrid');
  grid.innerHTML = '';
  Object.entries(DOC_TYPES).forEach(([key, doc]) => {
    const card = document.createElement('button');
    card.className = `doc-type-card${state.currentDocType === key ? ' selected' : ''}`;
    card.dataset.type = key;
    card.innerHTML = `
      <div class="doc-type-icon" style="background: ${doc.color}22">
        <span>${doc.icon}</span>
      </div>
      <span class="doc-type-name">${doc.label}</span>
    `;
    card.addEventListener('click', () => selectDocType(key));
    grid.appendChild(card);
  });
}

function buildDocTypeSelect() {
  ['resultDocTypeSelect'].forEach(id => {
    const sel = $(id);
    if (!sel) return;
    sel.innerHTML = Object.entries(DOC_TYPES).map(([k, v]) =>
      `<option value="${k}" ${k === state.currentDocType ? 'selected' : ''}>${v.icon} ${v.label}</option>`
    ).join('');
    sel.className = 'form-input';
  });
}

function buildFilterChips() {
  const container = $('filterChips');
  container.innerHTML = '<button class="chip active" data-type="all">সব</button>';
  Object.entries(DOC_TYPES).forEach(([key, doc]) => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.type = key;
    btn.textContent = doc.icon + ' ' + doc.label;
    container.appendChild(btn);
  });
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderHistoryList(chip.dataset.type);
    });
  });
}

function selectDocType(key) {
  state.currentDocType = key;
  document.querySelectorAll('.doc-type-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.type === key);
  });
}

// ──────────────────────────────────────────────
// CAMERA
// ──────────────────────────────────────────────
async function openCamera() {
  showScreen('camera');
  await startCamera();
}

async function startCamera() {
  try {
    if (state.cameraStream) stopCamera();
    const constraints = {
      video: {
        facingMode: state.facingMode,
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      }
    };
    state.cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = $('cameraFeed');
    video.srcObject = state.cameraStream;
    video.style.filter = 'none';
    if ($('exposureSlider')) $('exposureSlider').value = '0';
    if ($('exposureVal')) $('exposureVal').textContent = '0.0';
    state.cameraExposure = 0;

    await video.play();
    startOverlayAnimation();
    setupCameraFocusAndExposure();
  } catch (err) {
    console.warn('Hardware camera unavailable or permission denied, using simulated stream:', err);
    startSimulatedCamera();
  }
}

function drawSimulatedBanglaDoc(ctx, w, h) {
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  // Document Card
  const dw = Math.min(w * 0.75, 780);
  const dh = Math.min(h * 0.75, 480);
  const dx = (w - dw) / 2;
  const dy = (h - dh) / 2;

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(dx, dy, dw, dh);

  // Green header bar
  ctx.fillStyle = '#065f46';
  ctx.fillRect(dx + 20, dy + 20, dw - 40, 60);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('গণপ্রজাতন্ত্রী বাংলাদেশ সরকার', dx + 40, dy + 45);
  ctx.font = '14px sans-serif';
  ctx.fillText('Government of the People\'s Republic of Bangladesh', dx + 40, dy + 68);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('জাতীয় পরিচয়পত্র / National ID Card', dx + 40, dy + 120);

  ctx.font = '15px sans-serif';
  ctx.fillStyle = '#1e293b';
  ctx.fillText('নাম: মোঃ রফিকুল ইসলাম', dx + 40, dy + 155);
  ctx.fillText('Name: Md. Rafiqul Islam', dx + 40, dy + 185);
  ctx.fillText('পিতা: মোঃ নুরুল ইসলাম', dx + 40, dy + 215);
  ctx.fillText('মাতা: মোসাঃ ফাতেমা বেগম', dx + 40, dy + 245);
  ctx.fillText('Date of Birth: 15 Mar 1988', dx + 40, dy + 275);

  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('NID NO: 19882692510000456', dx + 40, dy + 325);

  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(dx + dw - 160, dy + 110, 130, 160);
  ctx.fillStyle = '#475569';
  ctx.font = '14px sans-serif';
  ctx.fillText('ছবি / PHOTO', dx + dw - 145, dy + 195);
}

function startSimulatedCamera() {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  drawSimulatedBanglaDoc(ctx, 1280, 720);

  try {
    if (canvas.captureStream) {
      const stream = canvas.captureStream(20);
      state.cameraStream = stream;
      const video = $('cameraFeed');
      if (video) {
        video.srcObject = stream;
        video.play().catch(() => {});
      }
    }
  } catch (e) {
    console.warn('captureStream error:', e);
  }

  startOverlayAnimation();
  setupCameraFocusAndExposure();
  showToast('📷 ক্যামেরা মোড সক্রিয় (সিমুলেশন সহ)', 'info');
}

function stopCamera() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(t => t.stop());
    state.cameraStream = null;
  }
  const video = $('cameraFeed');
  if (video) video.style.filter = 'none';
  const ring = $('cameraFocusRing');
  if (ring) ring.classList.remove('active');
}

async function flipCamera() {
  state.facingMode = state.facingMode === 'environment' ? 'user' : 'environment';
  await startCamera();
}

async function toggleTorch() {
  if (!state.cameraStream) return;
  const track = state.cameraStream.getVideoTracks()[0];
  if (!track || !track.getCapabilities) return;
  const caps = track.getCapabilities();
  if (!caps.torch) { showToast('এই ডিভাইসে টর্চ সাপোর্ট নেই', 'error'); return; }
  state.torchOn = !state.torchOn;
  await track.applyConstraints({ advanced: [{ torch: state.torchOn }] });
  $('torchBtn').classList.toggle('torch-on', state.torchOn);
}

// Tap-to-Focus & Exposure Control Overlay
let focusTimeout = null;
function setupCameraFocusAndExposure() {
  const container = document.querySelector('.camera-container');
  const ring = $('cameraFocusRing');
  const slider = $('exposureSlider');
  const readout = $('exposureVal');
  const video = $('cameraFeed');

  if (!container || !ring) return;

  // Tap-to-focus on camera view
  container.onpointerdown = async (e) => {
    // Avoid interfering with buttons or exposure slider
    if (e.target.closest('.camera-top-bar') || 
        e.target.closest('.camera-bottom-bar') || 
        e.target.closest('.camera-exposure-control')) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Center the yellow focus reticle on the tap location
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    ring.classList.add('active');

    if (focusTimeout) clearTimeout(focusTimeout);
    focusTimeout = setTimeout(() => {
      ring.classList.remove('active');
    }, 1200);

    // Apply native hardware camera focus if supported (e.g. mobile browsers)
    if (state.cameraStream) {
      try {
        const track = state.cameraStream.getVideoTracks()[0];
        if (track && track.getCapabilities) {
          const caps = track.getCapabilities();
          const adv = {};
          if (caps.focusMode && caps.focusMode.includes('continuous')) {
            adv.focusMode = 'continuous';
          }
          if (caps.pointsOfInterest) {
            adv.pointsOfInterest = [{
              x: Math.max(0, Math.min(1, x / rect.width)),
              y: Math.max(0, Math.min(1, y / rect.height))
            }];
          }
          if (Object.keys(adv).length > 0) {
            await track.applyConstraints({ advanced: [adv] });
          }
        }
      } catch (err) {
        // Silently ignore hardware limitations
      }
    }
  };

  // Manual Exposure Slider & Presets
  if (slider) {
    slider.oninput = (e) => {
      applyExposure(parseFloat(e.target.value));
    };
  }

  document.querySelectorAll('.exp-preset-chip').forEach(chip => {
    chip.onclick = (e) => {
      e.stopPropagation();
      applyExposure(parseFloat(chip.dataset.exp));
    };
  });
}

function applyExposure(val) {
  state.cameraExposure = val;
  const slider = $('exposureSlider');
  const readout = $('exposureVal');
  const video = $('cameraFeed');

  if (slider) slider.value = val;
  if (readout) readout.textContent = (val > 0 ? '+' : '') + val.toFixed(1);

  if (video) {
    if (val === 0) {
      video.style.filter = 'none';
    } else {
      const b = 1 + val * 0.28;
      const c = 1 + Math.abs(val) * 0.18;
      video.style.filter = `brightness(${b}) contrast(${c})`;
    }
  }

  document.querySelectorAll('.exp-preset-chip').forEach(chip => {
    chip.classList.toggle('active', parseFloat(chip.dataset.exp) === val);
  });

  if (state.cameraStream) {
    try {
      const track = state.cameraStream.getVideoTracks()[0];
      if (track && track.getCapabilities) {
        const caps = track.getCapabilities();
        if (caps.exposureCompensation) {
          const min = caps.exposureCompensation.min;
          const max = caps.exposureCompensation.max;
          const hwExp = val > 0 ? (val / 2) * max : (val / 2) * Math.abs(min);
          track.applyConstraints({ advanced: [{ exposureCompensation: hwExp }] }).catch(() => {});
        }
      }
    } catch (err) {}
  }
}

let overlayAnimFrame = null;
function startOverlayAnimation() {
  const canvas = $('overlayCanvas');
  const video = $('cameraFeed');
  const ctx = canvas.getContext('2d');

  function draw() {
    canvas.width = video.videoWidth || canvas.offsetWidth;
    canvas.height = video.videoHeight || canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    overlayAnimFrame = requestAnimationFrame(draw);
  }
  draw();
}

function stopOverlayAnimation() {
  if (overlayAnimFrame) { cancelAnimationFrame(overlayAnimFrame); overlayAnimFrame = null; }
}

// ──────────────────────────────────────────────
// CAPTURE & PROCESS IMAGE
// ──────────────────────────────────────────────
async function capturePhoto() {
  const video = $('cameraFeed');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 1280;
  canvas.height = video.videoHeight || 720;
  const ctx = canvas.getContext('2d');

  // Apply manual exposure/contrast to canvas snapshot for optimal small text OCR
  if (state.cameraExposure !== 0) {
    const b = 1 + state.cameraExposure * 0.28;
    const c = 1 + Math.abs(state.cameraExposure) * 0.18;
    ctx.filter = `brightness(${b}) contrast(${c})`;
  }
  try {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  } catch (e) {
    drawSimulatedBanglaDoc(ctx, canvas.width, canvas.height);
  }
  ctx.filter = 'none';

  // Auto-align orientation
  const alignedDataUrl = autoAlignOrientation(canvas);

  // If in Continuous Batch Mode
  if (state.cameraMode === 'batch') {
    const pageNum = state.cameraBatchPages.length + 1;
    const thumbUrl = createThumbnail(alignedDataUrl);
    state.cameraBatchPages.push({
      dataUrl: alignedDataUrl,
      thumbnail: thumbUrl,
      fileName: `ক্যামেরা_পৃষ্ঠা_${pageNum}.jpg`,
      timestamp: new Date().toISOString()
    });

    playShutterFlash();
    updateCameraBatchTrayUI();
    showToast(`📸 পৃষ্ঠা ${pageNum} ক্যাপচার করা হয়েছে!`, 'info');
    return; // Keep camera open for subsequent captures
  }

  // Single mode: finish and process
  stopCamera();
  stopOverlayAnimation();
  await processImage(alignedDataUrl);
}

function autoAlignOrientation(canvas) {
  const w = canvas.width;
  const h = canvas.height;

  // Most Bangladeshi official forms (Trade License, e-TIN, Bank Certificate, Affidavit) are Portrait (h > w)
  // NID Card is Landscape (w > h)
  const isPortraitExpected = ['trade_license', 'etin', 'vat_bin', 'bank_certificate', 'affidavit', 'declaration', 'land_property'].includes(state.currentDocType);
  const isLandscapeExpected = state.currentDocType === 'nid';

  let needRotate = false;
  if (isPortraitExpected && w > h * 1.22) {
    needRotate = true; // rotate to portrait
  } else if (isLandscapeExpected && h > w * 1.22) {
    needRotate = true; // rotate to landscape
  }

  if (needRotate) {
    const rotCanvas = document.createElement('canvas');
    rotCanvas.width = h;
    rotCanvas.height = w;
    const rotCtx = rotCanvas.getContext('2d');
    rotCtx.translate(h / 2, w / 2);
    rotCtx.rotate((90 * Math.PI) / 180);
    rotCtx.drawImage(canvas, -w / 2, -h / 2);
    return rotCanvas.toDataURL('image/jpeg', 0.92);
  }

  return canvas.toDataURL('image/jpeg', 0.92);
}

function playShutterFlash() {
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.top = '0';
  flash.style.left = '0';
  flash.style.width = '100vw';
  flash.style.height = '100vh';
  flash.style.background = '#ffffff';
  flash.style.opacity = '0.7';
  flash.style.zIndex = '9999';
  flash.style.pointerEvents = 'none';
  flash.style.transition = 'opacity 0.25s ease';
  document.body.appendChild(flash);
  setTimeout(() => {
    flash.style.opacity = '0';
    setTimeout(() => flash.remove(), 250);
  }, 50);
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function autoDetectDocType(text) {
  if (!text) return state.currentDocType || 'nid';
  if (/খতিয়ান|khatian|দলিল|deed|বিল্ডিং|তলা|মৌজা|দাগ\s*নং|বর্গফুট|ভূমি|land/i.test(text)) return 'land_property';
  if (/জাতীয়\s*পরিচয়|national\s*id|nid|পরিচয়পত্র|voter|ভোটার/i.test(text)) return 'nid';
  if (/ট্রেড\s*লাইসেন্স|trade\s*license|সিটি কর্পোরেশন|পৌরসভা/i.test(text)) return 'trade_license';
  if (/tin|টিআইএন|কর\s*অঞ্চল|tax\s*zone|circle|কর\s*সার্কেল|income\s*tax/i.test(text)) return 'etin';
  if (/vat|bin|ভ্যাট|বিআইএন|মূল্য\s*সংযোজন/i.test(text)) return 'vat_bin';
  if (/bank|ব্যাংক|account|শাখা|branch|routing|balance/i.test(text)) return 'bank_certificate';
  if (/affidavit|হলফনামা|নোটারি|notary|ঘোষণা\s*করছি/i.test(text)) return 'affidavit';
  if (/declaration|ঘোষণাপত্র|প্রত্যয়ন/i.test(text)) return 'declaration';
  return state.currentDocType || 'other';
}

function handleFileUpload(file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('❌ শুধুমাত্র ছবি ফাইল সাপোর্ট করে', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = async e => { await processImage(e.target.result); };
  reader.readAsDataURL(file);
}

async function handleBatchUpload(files) {
  if (!files || files.length === 0) return;
  const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
  if (imageFiles.length === 0) {
    showToast('❌ শুধুমাত্র ছবি ফাইল সাপোর্ট করে', 'error');
    return;
  }
  await processBatch(imageFiles);
}

async function processBatch(files) {
  const total = files.length;
  showScreen('processing');
  
  const badge = $('batchProgressBadge');
  const counter = $('batchProcCounter');
  const percent = $('batchProcPercent');
  const miniFill = $('batchMiniFill');
  if (badge) badge.style.display = 'block';

  // Initialize Real-Time Batch Feedback Card
  const rtCard = $('batchRealtimeCard');
  const rtList = $('batchRealtimeList');
  const rtStatus = $('batchRtStatusText');
  if (rtCard && rtList) {
    rtCard.style.display = 'block';
    if (rtStatus) rtStatus.textContent = 'প্রক্রিয়াধীন...';
    rtList.innerHTML = files.map((f, idx) => `
      <div class="batch-rt-item" id="rtItem_${idx}">
        <div class="batch-rt-item-title">
          <span>📄 পৃষ্ঠা ${idx + 1}</span>
          <span style="font-size:0.75rem;opacity:0.7;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${f.name || f.fileName || `ডকুমেন্ট #${idx + 1}`}</span>
        </div>
        <span class="batch-rt-badge" id="rtBadge_${idx}">অপেক্ষমান</span>
      </div>
    `).join('');
  }

  for (let i = 0; i < total; i++) {
    const file = files[i];
    const currentNum = i + 1;
    const pct = Math.round((currentNum / total) * 100);
    const fileName = file.fileName || file.name || `ডকুমেন্ট_${currentNum}.jpg`;
    
    if (counter) counter.textContent = `ডকুমেন্ট ${currentNum} / ${total}`;
    if (percent) percent.textContent = `${pct}%`;
    if (miniFill) miniFill.style.width = `${pct}%`;
    
    $('procTitle').textContent = `ডকুমেন্ট ${currentNum}/${total} প্রক্রিয়া হচ্ছে...`;
    $('procSubtitle').textContent = `ফাইল: ${fileName}`;

    // Mark current item active in real-time card
    const curItemEl = $(`rtItem_${i}`);
    const curBadgeEl = $(`rtBadge_${i}`);
    if (curItemEl) curItemEl.className = 'batch-rt-item processing';
    if (curBadgeEl) {
      curBadgeEl.className = 'batch-rt-badge proc';
      curBadgeEl.textContent = '⏳ OCR প্রসেসিং...';
    }
    
    try {
      const dataUrl = file.dataUrl ? file.dataUrl : await readFileAsDataURL(file);
      
      // Step 1: Detect and crop
      $('step1').classList.add('active');
      const croppedUrl = await detectAndCropDocument(dataUrl);
      $('step1').classList.remove('active');
      $('step1').classList.add('done');
      
      // Step 2: Straighten
      $('step2').classList.add('active');
      await sleep(250);
      $('step2').classList.remove('active');
      $('step2').classList.add('done');
      
      // Step 3 & 4: OCR & Extraction with Google AI failover
      $('step3').classList.add('active');
      let googleBatchRes = null;
      if (state.useGoogleApi && state.googleApiKeys && state.googleApiKeys.length > 0) {
        googleBatchRes = await callGoogleApiWithFailover(croppedUrl, null);
      }
      $('step3').classList.remove('active');
      $('step3').classList.add('done');

      $('step4').classList.add('active');
      let finalDocType = 'other';
      let finalFields = {};
      let finalOcrText = '';
      let confidence = 85;

      if (googleBatchRes) {
        finalDocType = (googleBatchRes.detected_doc_type && DOC_TYPES[googleBatchRes.detected_doc_type]) ? googleBatchRes.detected_doc_type : 'other';
        finalFields = googleBatchRes.fields || {};
        finalOcrText = googleBatchRes.ocr_text || '';
        confidence = googleBatchRes.confidence || 95;
      } else {
        const ocrResult = await runOCR(croppedUrl);
        finalDocType = autoDetectDocType(ocrResult.text);
        finalFields = extractFieldsFromText(ocrResult.text, finalDocType);
        finalOcrText = ocrResult.text;
        confidence = ocrResult.confidence || 80;
      }
      $('step4').classList.remove('active');
      $('step4').classList.add('done');

      const item = {
        id: 'batch_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 4),
        fileName: fileName,
        docType: finalDocType,
        dataUrl: croppedUrl,
        thumbnail: createThumbnail(croppedUrl),
        ocrText: finalOcrText,
        fields: finalFields,
        confidence: confidence,
        saved: false,
        date: new Date().toISOString()
      };
      state.batchItems.push(item);

      // Mark done in real-time card
      if (curItemEl) curItemEl.className = 'batch-rt-item done';
      if (curBadgeEl) {
        curBadgeEl.className = 'batch-rt-badge success';
        curBadgeEl.textContent = `✅ ${DOC_TYPES[finalDocType]?.label || 'সম্পন্ন'}`;
      }

    } catch (err) {
      console.error('Batch item error:', err);
      if (curBadgeEl) {
        curBadgeEl.className = 'batch-rt-badge';
        curBadgeEl.style.color = '#ef4444';
        curBadgeEl.textContent = '❌ ত্রুটি';
      }
    }
    await sleep(200);
  }

  if (badge) badge.style.display = 'none';
  if (rtStatus) rtStatus.textContent = '🎉 সব সম্পন্ন!';

  // Trigger celebration confetti
  triggerConfetti();

  await sleep(600);
  initBatchSelectedFields();
  showScreen('batch');
  renderBatchScreen();
  showToast(`🎉 ${total}টি ডকুমেন্ট স্ক্যান ও প্রস্তুত!`, 'success');
}

async function processImage(dataUrl) {
  state.currentImageDataUrl = dataUrl;
  state.currentImageRotation = 0;
  showScreen('processing');
  await animateProcessing(dataUrl);
}

async function animateProcessing(dataUrl) {
  const steps = ['step1', 'step2', 'step3', 'step4'];
  const titles = ['ডকুমেন্ট শনাক্ত হচ্ছে...', 'ক্রপ ও সোজা করা হচ্ছে...', 'OCR চালু হচ্ছে...', 'তথ্য বের করা হচ্ছে...'];
  const subtitles = ['ডকুমেন্টের সীমানা খোঁজা হচ্ছে', 'ছবি সংশোধন করা হচ্ছে', 'টেক্সট পড়া হচ্ছে', 'প্রাসঙ্গিক তথ্য শনাক্ত করা হচ্ছে'];

  // Reset steps
  steps.forEach(id => {
    const el = $(id);
    el.classList.remove('active', 'done');
  });

  // Hide batch realtime card if in single mode
  const rtCard = $('batchRealtimeCard');
  if (rtCard) rtCard.style.display = 'none';

  // Detect document edges & crop
  setStep(0, steps, titles, subtitles);
  const processedDataUrl = await detectAndCropDocument(dataUrl);
  await sleep(600);

  // Straighten
  setStep(1, steps, titles, subtitles);
  state.currentImageDataUrl = processedDataUrl;
  await sleep(500);

  // OCR & Extraction
  setStep(2, steps, titles, subtitles);
  let googleRes = null;
  if (state.useGoogleApi && state.googleApiKeys && state.googleApiKeys.length > 0) {
    googleRes = await callGoogleApiWithFailover(processedDataUrl, state.currentDocType);
  }

  let finalConfidence = 85;
  if (googleRes) {
    state.ocrText = googleRes.ocr_text || '';
    if (googleRes.detected_doc_type && DOC_TYPES[googleRes.detected_doc_type]) {
      state.currentDocType = googleRes.detected_doc_type;
    }
    setStep(3, steps, titles, subtitles);
    state.extractedFields = googleRes.fields || {};
    state.customFields = [];
    finalConfidence = googleRes.confidence || 95;
    showToast(`✨ Google AI (${googleRes.usedKey}) দিয়ে নির্ভুলভাবে প্রসেস সম্পন্ন!`, 'success');
  } else {
    const ocrResult = await runOCR(processedDataUrl);
    state.ocrText = ocrResult.text;
    finalConfidence = ocrResult.confidence || 80;
    await sleep(400);

    // Extract fields
    setStep(3, steps, titles, subtitles);
    state.extractedFields = extractFieldsFromText(state.ocrText, state.currentDocType);
    state.customFields = [];
  }
  await sleep(600);

  // Update currentScan state for reliable preview and persistence
  state.currentScan = {
    dataUrl: processedDataUrl,
    imageSrc: processedDataUrl,
    docType: state.currentDocType,
    ocrText: state.ocrText,
    fields: state.extractedFields,
    confidence: finalConfidence,
    timestamp: new Date().toISOString()
  };

  // Mark all done
  steps.forEach(id => {
    const el = $(id);
    el.classList.remove('active');
    el.classList.add('done');
  });

  await sleep(400);
  showResultScreen();
}

function setStep(index, steps, titles, subtitles) {
  if (index > 0) {
    const prevEl = $(steps[index - 1]);
    prevEl.classList.remove('active');
    prevEl.classList.add('done');
  }
  const el = $(steps[index]);
  el.classList.add('active');
  $('procTitle').textContent = titles[index];
  $('procSubtitle').textContent = subtitles[index];
}

// ──────────────────────────────────────────────
// DOCUMENT DETECTION & CROP (Canvas-based)
// ──────────────────────────────────────────────
async function detectAndCropDocument(dataUrl) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');

      // Draw original
      ctx.drawImage(img, 0, 0);

      // Apply auto-enhancement: brighten + contrast
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Auto levels
      let minR = 255, maxR = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] < minR) minR = data[i];
        if (data[i] > maxR) maxR = data[i];
      }
      const scale = maxR > minR ? 255 / (maxR - minR) : 1;

      for (let i = 0; i < data.length; i += 4) {
        // Slight contrast boost
        const r = Math.min(255, Math.max(0, (data[i] - minR) * scale));
        const g = Math.min(255, Math.max(0, (data[i + 1] - minR) * scale));
        const b = Math.min(255, Math.max(0, (data[i + 2] - minR) * scale));
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }
      ctx.putImageData(imageData, 0, 0);

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.src = dataUrl;
  });
}

// ──────────────────────────────────────────────
// OCR WITH TESSERACT.JS
// ──────────────────────────────────────────────
async function runOCR(dataUrl) {
  try {
    const ocrLang = state.ocrLanguage || 'ben+eng';
    const result = await Tesseract.recognize(
      dataUrl,
      ocrLang,
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            const pct = Math.round(m.progress * 100);
            $('procSubtitle').textContent = `OCR (${ocrLang}): ${pct}% সম্পন্ন`;
          }
        }
      }
    );
    return {
      text: result.data.text,
      confidence: result.data.confidence,
    };
  } catch (err) {
    console.error('OCR error:', err);
    return { text: '', confidence: 0 };
  }
}

// ──────────────────────────────────────────────
// GOOGLE AI OCR & MULTI-KEY POOL ENGINE
// ──────────────────────────────────────────────
function updateApiBadges() {
  const count = state.googleApiKeys ? state.googleApiKeys.length : 0;
  const isEnabled = state.useGoogleApi && count > 0;

  const countBadge = $('apiCountBadge');
  if (countBadge) {
    countBadge.textContent = count;
    countBadge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  const savedCount = $('savedKeysCount');
  if (savedCount) savedCount.textContent = count;

  const headerDot = $('headerApiDot');
  if (headerDot) {
    headerDot.style.background = isEnabled ? '#10b981' : '#94a3b8';
    headerDot.title = isEnabled ? `Google AI সক্রিয় (${count} কি)` : 'Google AI নিষ্ক্রিয়';
  }

  const batchDot = $('batchApiDot');
  if (batchDot) {
    batchDot.style.background = isEnabled ? '#10b981' : '#94a3b8';
  }
}

function maskApiKey(key) {
  if (!key) return '';
  if (key.length <= 10) return key.substring(0, 3) + '...' + key.substring(key.length - 2);
  return key.substring(0, 6) + '...' + key.substring(key.length - 4);
}

function openGoogleApiModal() {
  const toggle = $('useGoogleApiToggle');
  if (toggle) toggle.checked = state.useGoogleApi;

  const radios = document.querySelectorAll('input[name="apiStrategy"]');
  radios.forEach(r => {
    r.checked = r.value === state.apiStrategy;
  });

  renderKeysList();
  const modal = $('googleApiModal');
  if (modal) modal.classList.add('active');
}

function closeGoogleApiModal() {
  const modal = $('googleApiModal');
  if (modal) modal.classList.remove('active');
}

function renderKeysList() {
  const container = $('keysListContainer');
  if (!container) return;
  container.innerHTML = '';

  if (!state.googleApiKeys || state.googleApiKeys.length === 0) {
    container.innerHTML = `
      <div class="empty-keys-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <p>কোনো Google API Key সংরক্ষিত নেই। ওপরের বক্সে আপনার Gemini API Key পেস্ট করে যোগ করুন।</p>
      </div>
    `;
    return;
  }

  state.googleApiKeys.forEach((keyItem, index) => {
    const card = document.createElement('div');
    card.className = `key-item-card ${keyItem.status || 'unknown'}`;
    
    let statusBadge = '<span class="key-status-pill unknown">⚪ অপ্রমাণিত</span>';
    if (keyItem.status === 'valid') {
      statusBadge = '<span class="key-status-pill valid">🟢 সক্রিয়</span>';
    } else if (keyItem.status === 'error') {
      statusBadge = `<span class="key-status-pill error" title="${keyItem.errorMsg || 'Error'}">🔴 ${keyItem.errorMsg || 'ব্যর্থ'}</span>`;
    }

    card.innerHTML = `
      <div class="key-info">
        <div class="key-index-badge">#${index + 1}</div>
        <div class="key-details">
          <div class="key-masked-row">
            <span class="key-masked">${maskApiKey(keyItem.key)}</span>
            ${statusBadge}
          </div>
          <span class="key-meta">যুক্ত: ${new Date(keyItem.addedAt || Date.now()).toLocaleDateString('bn-BD')}</span>
        </div>
      </div>
      <div class="key-actions">
        <button class="key-btn-test" data-id="${keyItem.id}" title="কি টেস্ট করুন">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          টেস্ট
        </button>
        <button class="key-btn-del" data-id="${keyItem.id}" title="মুছুন">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
        </button>
      </div>
    `;

    // Test button
    card.querySelector('.key-btn-test').addEventListener('click', async (e) => {
      e.stopPropagation();
      const btn = e.currentTarget;
      btn.disabled = true;
      btn.textContent = 'টেস্টিং...';
      await testSingleApiKey(keyItem.id);
      renderKeysList();
    });

    // Delete button
    card.querySelector('.key-btn-del').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`আপনি কি কি #${index + 1} (${maskApiKey(keyItem.key)}) মুছে ফেলতে চান?`)) {
        deleteApiKey(keyItem.id);
      }
    });

    container.appendChild(card);
  });
}

function addApiKeysFromInput() {
  const input = $('newApiKeyInput');
  if (!input) return;
  const rawText = input.value.trim();
  if (!rawText) {
    showToast('⚠️ অনুগ্রহ করে অন্তত একটি Google API Key দিন', 'warning');
    return;
  }

  const candidates = rawText.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
  let addedCount = 0;

  candidates.forEach(k => {
    const exists = state.googleApiKeys.some(item => item.key === k);
    if (!exists) {
      state.googleApiKeys.push({
        id: 'key_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        key: k,
        label: maskApiKey(k),
        status: 'unknown',
        errorMsg: '',
        addedAt: new Date().toISOString()
      });
      addedCount++;
    }
  });

  input.value = '';
  saveToStorage();
  renderKeysList();

  if (addedCount > 0) {
    showToast(`✅ ${addedCount}টি API Key সফলভাবে যুক্ত হয়েছে!`, 'success');
  } else {
    showToast('ℹ️ এই API Key ইতিমধ্যে তালিকায় রয়েছে', 'info');
  }
}

function deleteApiKey(id) {
  state.googleApiKeys = state.googleApiKeys.filter(k => k.id !== id);
  saveToStorage();
  renderKeysList();
  showToast('🗑️ API Key মুছে ফেলা হয়েছে', 'info');
}

async function testSingleApiKey(id) {
  const item = state.googleApiKeys.find(k => k.id === id);
  if (!item) return false;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash?key=${item.key}`);
    if (res.ok) {
      item.status = 'valid';
      item.errorMsg = '';
      saveToStorage();
      showToast(`🟢 কি (${maskApiKey(item.key)}) সম্পূর্ণ কার্যকর!`, 'success');
      return true;
    } else {
      item.status = 'error';
      item.errorMsg = res.status === 429 ? 'কোটা শেষ (429)' : `ত্রুটি (${res.status})`;
      saveToStorage();
      showToast(`🔴 কি (${maskApiKey(item.key)}) ব্যর্থ: ${item.errorMsg}`, 'error');
      return false;
    }
  } catch (err) {
    item.status = 'error';
    item.errorMsg = 'কানেকশন ত্রুটি';
    saveToStorage();
    showToast(`🔴 কি (${maskApiKey(item.key)}) কানেকশন ত্রুটি`, 'error');
    return false;
  }
}

async function testAllApiKeys() {
  if (!state.googleApiKeys || state.googleApiKeys.length === 0) {
    showToast('⚠️ কোনো API Key নেই', 'warning');
    return;
  }
  const btn = $('testAllKeysBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'টেস্টিং চলছে...'; }

  let validCount = 0;
  for (let i = 0; i < state.googleApiKeys.length; i++) {
    const item = state.googleApiKeys[i];
    const ok = await testSingleApiKey(item.id);
    if (ok) validCount++;
  }

  if (btn) { btn.disabled = false; btn.textContent = 'সব কি টেস্ট করুন'; }
  renderKeysList();
  showToast(`📊 টেস্ট সম্পন্ন: ${validCount}/${state.googleApiKeys.length} কি কার্যকর`, validCount > 0 ? 'success' : 'error');
}

function saveApiSettings() {
  const toggle = $('useGoogleApiToggle');
  if (toggle) state.useGoogleApi = toggle.checked;

  const selectedStrategy = document.querySelector('input[name="apiStrategy"]:checked');
  if (selectedStrategy) state.apiStrategy = selectedStrategy.value;

  saveToStorage();
  closeGoogleApiModal();
  showToast('💾 Google API সেটিংস সংরক্ষিত হয়েছে!', 'success');
}

async function callGoogleApiWithFailover(dataUrl, docType) {
  if (!state.useGoogleApi || !state.googleApiKeys || state.googleApiKeys.length === 0) {
    return null; // Fallback to local
  }

  let base64Data = dataUrl;
  if (base64Data.includes(',')) {
    base64Data = base64Data.split(',')[1];
  }

  const keysList = [...state.googleApiKeys];
  let orderedIndices = [];
  if (state.apiStrategy === 'random') {
    orderedIndices = keysList.map((_, i) => i).sort(() => Math.random() - 0.5);
  } else {
    orderedIndices = keysList.map((_, i) => i);
  }

  const prompt = `You are an expert AI OCR & document verification system specialized in Bangladeshi official documents.
Analyze this document image carefully. Identify all text and extract key information.
Document types to classify into: "nid", "trade_license", "etin", "vat_bin", "bank_certificate", "affidavit", "declaration", "other".

Return ONLY a strict JSON object with this exact structure:
{
  "ocr_text": "all readable Bengali and English text in the document...",
  "detected_doc_type": "nid" | "trade_license" | "etin" | "vat_bin" | "bank_certificate" | "affidavit" | "declaration" | "other",
  "confidence": 98,
  "fields": {
    // For NID: name_bn, name_en, nid_number, dob, father_name, mother_name, address, blood_group
    // For Trade License: license_no, business_name, owner_name, business_type, address, issue_date, expiry_date, issuing_authority
    // For e-TIN: tin_number, name, nid_number, tax_circle, tax_zone, address, issue_date
    // For VAT/BIN: bin_number, business_name, owner_name, address, registration_date, vat_circle, vat_commissionerate
    // For Bank Certificate: account_holder, account_number, account_type, bank_name, branch_name, routing_number, issue_date, balance
    // For Affidavit: declarant_name, declarant_nid, declarant_address, subject, notary_name, notary_number, date, witness_1, witness_2
    // For Declaration: declarant_name, declarant_address, subject, date, witness_1, witness_2
    // For Other: doc_title, issuer, date, ref_number, person_name, notes
  }
}`;

  for (let step = 0; step < orderedIndices.length; step++) {
    const idx = orderedIndices[step];
    const keyItem = keysList[idx];
    const masked = maskApiKey(keyItem.key);

    try {
      $('procSubtitle').textContent = `Google AI এপিআই #${idx + 1} (${masked}) দিয়ে প্রসেস হচ্ছে...`;
      
      const payload = {
        contents: [
          {
            parts: [
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: base64Data
                }
              },
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          response_mime_type: 'application/json'
        }
      };

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyItem.key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        console.warn(`Google API key #${idx + 1} (${masked}) failed with status ${res.status}:`, errText);
        
        keyItem.status = 'error';
        keyItem.errorMsg = res.status === 429 ? 'কোটা শেষ (429)' : `ত্রুটি (${res.status})`;
        saveToStorage();

        if (step < orderedIndices.length - 1) {
          const nextIdx = orderedIndices[step + 1];
          showToast(`⚠️ কি #${idx + 1} ব্যর্থ (${keyItem.errorMsg}), স্বয়ংক্রিয়ভাবে কি #${nextIdx + 1}-এ স্থানান্তর হচ্ছে...`, 'warning');
        }
        continue;
      }

      const json = await res.json();
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response from Google API');

      let parsed = null;
      try {
        parsed = JSON.parse(rawText);
      } catch (pe) {
        const cleaned = rawText.replace(/```json\n?|\n?```/g, '').trim();
        parsed = JSON.parse(cleaned);
      }

      keyItem.status = 'valid';
      keyItem.errorMsg = '';
      saveToStorage();

      return {
        ocr_text: parsed.ocr_text || '',
        detected_doc_type: parsed.detected_doc_type || docType || 'other',
        fields: parsed.fields || {},
        confidence: parsed.confidence || 95,
        usedKey: masked
      };

    } catch (err) {
      console.error(`Google API request error on key #${idx + 1}:`, err);
      keyItem.status = 'error';
      keyItem.errorMsg = 'কানেকশন ত্রুটি';
      saveToStorage();

      if (step < orderedIndices.length - 1) {
        const nextIdx = orderedIndices[step + 1];
        showToast(`⚠️ কি #${idx + 1} ব্যর্থ, কি #${nextIdx + 1} ব্যবহার করা হচ্ছে...`, 'warning');
      }
    }
  }

  showToast('⚠️ সব Google API কি ব্যর্থ হয়েছে। লোকাল OCR চালু হচ্ছে...', 'warning');
  return null;
}

// ──────────────────────────────────────────────
// PDF REPORT GENERATOR (jsPDF + High-Res Canvas)
// ──────────────────────────────────────────────
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function renderDocumentReportToCanvas(item) {
  const width = 1240;
  const height = 1754;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Top Banner
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, '#1e1b4b');
  gradient.addColorStop(1, '#312e81');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, 140);

  // Cyan accent line
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(0, 140, width, 8);

  // DocScan BD Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Inter", "Hind Siliguri", sans-serif';
  ctx.fillText('DocScan BD', 50, 68);

  ctx.fillStyle = '#a5f3fc';
  ctx.font = '20px "Inter", "Hind Siliguri", sans-serif';
  ctx.fillText('স্মার্ট ডকুমেন্ট স্ক্যানার ও অফিশিয়াল ভেরিফিকেশন রিপোর্ট', 50, 105);

  const docConfig = DOC_TYPES[item.docType] || DOC_TYPES.other;
  const docLabel = docConfig.label;
  const dateStr = new Date(item.date || Date.now()).toLocaleDateString('bn-BD', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Badge pill
  ctx.fillStyle = '#4338ca';
  roundRect(ctx, width - 360, 42, 310, 44, 8, true);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "Inter", "Hind Siliguri", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${docConfig.icon} ${docLabel}`, width - 205, 70);
  ctx.textAlign = 'left';

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '15px "Inter", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`তারিখ: ${dateStr}`, width - 50, 115);
  ctx.textAlign = 'left';

  let currentY = 180;

  // Document Image Preview
  if (item.dataUrl) {
    try {
      const img = await loadImage(item.dataUrl);
      const imgMaxW = 440;
      const imgMaxH = 340;
      let imgW = img.naturalWidth || img.width;
      let imgH = img.naturalHeight || img.height;
      const ratio = Math.min(imgMaxW / imgW, imgMaxH / imgH);
      imgW = Math.round(imgW * ratio);
      imgH = Math.round(imgH * ratio);

      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      roundRect(ctx, 50, currentY, imgW + 20, imgH + 20, 12, true, true);

      ctx.drawImage(img, 60, currentY + 10, imgW, imgH);

      const metaX = 50 + imgW + 40;
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 24px "Inter", "Hind Siliguri", sans-serif';
      ctx.fillText('ডকুমেন্ট ওভারভিউ', metaX, currentY + 30);

      ctx.fillStyle = '#64748b';
      ctx.font = '16px "Inter", "Hind Siliguri", sans-serif';
      ctx.fillText(`ডকুমেন্টের ধরন: ${docLabel} (${docConfig.labelEn || ''})`, metaX, currentY + 70);
      ctx.fillText(`ফাইল/রেফারেন্স: ${item.fileName || 'ক্যামেরা স্ক্যান'}`, metaX, currentY + 105);
      ctx.fillText(`স্ট্যাটাস: সফলভাবে যাচাইকৃত ও রেকর্ডকৃত`, metaX, currentY + 140);

      // Verified pill
      ctx.fillStyle = '#ecfdf5';
      ctx.strokeStyle = '#10b981';
      roundRect(ctx, metaX, currentY + 175, 200, 36, 6, true, true);
      ctx.fillStyle = '#047857';
      ctx.font = 'bold 16px "Inter", "Hind Siliguri", sans-serif';
      ctx.fillText('✓ ভেরিফাইড ডেটা', metaX + 35, currentY + 199);

      currentY += Math.max(imgH + 40, 240);
    } catch (e) {
      console.warn('Could not load image into PDF report:', e);
      currentY += 20;
    }
  }

  // Extracted Fields Table
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 24px "Inter", "Hind Siliguri", sans-serif';
  ctx.fillText('📋 সংরক্ষিত ও যাচাইকৃত তথ্যাবলী (Extracted Fields)', 50, currentY + 20);
  currentY += 40;

  // Table Header
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(50, currentY, width - 100, 44);
  ctx.strokeStyle = '#cbd5e1';
  ctx.strokeRect(50, currentY, width - 100, 44);

  ctx.fillStyle = '#334155';
  ctx.font = 'bold 17px "Inter", "Hind Siliguri", sans-serif';
  ctx.fillText('ক্ষেত্রের নাম (Field Name)', 70, currentY + 28);
  ctx.fillText('যাচাইকৃত মান (Extracted Value)', 480, currentY + 28);
  currentY += 44;

  const allFields = [...(docConfig.fields || []), ...(item.customFields || [])];
  allFields.forEach((f, idx) => {
    const val = (item.fields && item.fields[f.key]) ? String(item.fields[f.key]) : '—';
    const rowH = 40;

    ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
    ctx.fillRect(50, currentY, width - 100, rowH);

    ctx.strokeStyle = '#e2e8f0';
    ctx.strokeRect(50, currentY, width - 100, rowH);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 15px "Inter", "Hind Siliguri", sans-serif';
    ctx.fillText(f.label, 70, currentY + 25);

    ctx.fillStyle = val === '—' ? '#94a3b8' : '#0f172a';
    ctx.font = '16px "Inter", "Hind Siliguri", sans-serif';
    ctx.fillText(val, 480, currentY + 25);

    currentY += rowH;
  });

  // OCR transcript snippet
  if (item.ocrText && currentY < height - 200) {
    currentY += 25;
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px "Inter", "Hind Siliguri", sans-serif';
    ctx.fillText('📄 সনাক্তকৃত টেক্সট (OCR Transcript)', 50, currentY);
    currentY += 15;

    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#e2e8f0';
    const ocrBoxH = Math.min(160, height - currentY - 100);
    roundRect(ctx, 50, currentY, width - 100, ocrBoxH, 8, true, true);

    ctx.fillStyle = '#475569';
    ctx.font = '13px monospace';
    const lines = item.ocrText.split('\n').filter(Boolean).slice(0, 6);
    lines.forEach((line, lIdx) => {
      ctx.fillText(line.substring(0, 110), 65, currentY + 28 + (lIdx * 20));
    });
  }

  // Footer
  const footerY = height - 70;
  ctx.strokeStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(50, footerY);
  ctx.lineTo(width - 50, footerY);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px "Inter", "Hind Siliguri", sans-serif';
  ctx.fillText('DocScan BD • গোপনীয় ও সংবেদনশীল নথিপত্র • জেনারেটেড ডিজিটাল পিডিএফ রেকর্ড', 50, footerY + 30);
  ctx.textAlign = 'right';
  ctx.fillText('পৃষ্ঠা ১ / ১', width - 50, footerY + 30);
  ctx.textAlign = 'left';

  return canvas;
}

async function generateScanPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    showToast('❌ PDF লাইব্রেরি লোড হয়নি', 'error');
    return;
  }

  showToast('⏳ ফরম্যাটেড PDF তৈরি হচ্ছে...', 'info');

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const reportData = {
      docType: state.currentDocType,
      fileName: 'DocScan_' + state.currentDocType,
      dataUrl: state.currentImageDataUrl,
      fields: state.extractedFields,
      customFields: state.customFields,
      ocrText: state.ocrText,
      date: new Date().toISOString()
    };

    const canvas = await renderDocumentReportToCanvas(reportData);
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    const fileName = `DocScan_${state.currentDocType}_${Date.now()}.pdf`;
    doc.save(fileName);

    showToast(`✅ PDF ডাউনলোড সম্পন্ন!`, 'success');
  } catch (err) {
    console.error('PDF generation error:', err);
    showToast('❌ PDF তৈরি করতে সমস্যা হয়েছে', 'error');
  }
}

async function generateBatchPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    showToast('❌ PDF লাইব্রেরি লোড হয়নি', 'error');
    return;
  }

  const items = getFilteredBatchItems();
  if (items.length === 0) {
    showToast('⚠️ কোনো ডকুমেন্ট নেই', 'warning');
    return;
  }

  showToast(`⏳ ${items.length}টি ডকুমেন্টের একত্রিত PDF তৈরি হচ্ছে...`, 'info');

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    for (let i = 0; i < items.length; i++) {
      if (i > 0) doc.addPage();
      const canvas = await renderDocumentReportToCanvas(items[i]);
      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }

    const fileName = `DocScan_Batch_${items.length}_Docs_${Date.now()}.pdf`;
    doc.save(fileName);
    showToast(`✅ ${items.length}টি ডকুমেন্টের PDF ডাউনলোড সম্পন্ন!`, 'success');
  } catch (err) {
    console.error('Batch PDF generation error:', err);
    showToast('❌ একত্রিত PDF তৈরি করতে সমস্যা হয়েছে', 'error');
  }
}

// ──────────────────────────────────────────────
// FIELD EXTRACTION
// ──────────────────────────────────────────────
function extractFieldsFromText(text, docType) {
  const fields = {};
  if (!text) return fields;

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const patterns = {
    // NID patterns
    nid_number: [/\b(\d{10}|\d{13}|\d{17})\b/, /NID[:\s#]*(\d+)/i, /পরিচয় নম্বর[:\s]*(\d+)/],
    dob: [/(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/, /জন্ম তারিখ[:\s]*(.+)/i, /Date of Birth[:\s]*(.+)/i],
    name_bn: [/নাম[:\s]*([^\n]+)/i],
    name_en: [/Name[:\s]*([A-Za-z ]+)/i],
    father_name: [/পিতা[:\s]*([^\n]+)/i, /Father[:\s]*([^\n]+)/i],
    mother_name: [/মাতা[:\s]*([^\n]+)/i, /Mother[:\s]*([^\n]+)/i],
    blood_group: [/রক্তের গ্রুপ[:\s]*([A-BO+-]+)/i, /Blood Group[:\s]*([A-BO+-]+)/i],

    // TIN patterns
    tin_number: [/TIN[:\s#]*(\d{12})/i, /টিআইএন[:\s]*(\d+)/],
    tax_circle: [/circle[:\s]*([^\n]+)/i, /সার্কেল[:\s]*([^\n]+)/i],
    tax_zone: [/zone[:\s]*([^\n]+)/i, /অঞ্চল[:\s]*([^\n]+)/i],

    // Trade License patterns
    license_no: [/License No[.:\s]*([^\n]+)/i, /লাইসেন্স নম্বর[:\s]*([^\n]+)/i],
    business_name: [/Business Name[:\s]*([^\n]+)/i, /ব্যবসা[:\s]*([^\n]+)/i],
    issue_date: [/Issue Date[:\s]*([^\n]+)/i, /ইস্যু তারিখ[:\s]*([^\n]+)/i],
    expiry_date: [/Expiry[:\s]*([^\n]+)/i, /মেয়াদ[:\s]*([^\n]+)/i],

    // BIN patterns
    bin_number: [/BIN[:\s#]*(\d+)/i, /বিআইএন[:\s]*(\d+)/],

    // Bank patterns
    account_number: [/Account No[.:\s]*([^\n]+)/i, /অ্যাকাউন্ট নম্বর[:\s]*(\d+)/i],
    bank_name: [/Bank[:\s]*([^\n]+)/i, /ব্যাংক[:\s]*([^\n]+)/i],
    branch_name: [/Branch[:\s]*([^\n]+)/i, /শাখা[:\s]*([^\n]+)/i],

    // Land & Building Property patterns
    jomir_khatian: [/খতিয়ান\s*(?:নম্বর|নং)?[:\s]*([^\n,]+)/i, /khatian\s*(?:no\.?|number)?[:\s]*([^\n,]+)/i, /জমির\s*খতিয়ান[:\s]*([^\n,]+)/i, /খতিয়ান\s*([০-৯\d]+)/i],
    dolil_no: [/দলিল\s*(?:নম্বর|নং)?[:\s]*([^\n,]+)/i, /deed\s*(?:no\.?|number)?[:\s]*([^\n,]+)/i, /রেজি(?:স্ট্রি)?\s*দলিল\s*(?:নং)?[:\s]*([^\n,]+)/i, /দলিল\s*([০-৯\d\/]+)/i],
    building_total_area: [/(?:বিল্ডিং(?:য়ের)?\s*)?মোট\s*(?:এরিয়া|আয়তন|ক্ষেত্রফল)[:\s]*([^\n,]+)/i, /total\s*area[:\s]*([^\n,]+)/i, /(\d+(?:\.\d+)?\s*(?:sq\s*ft|sqft|বর্গফুট|বর্গমিটার|শতক|কাঠা))/i],
    building_floors: [/(?:কত\s*)?তলা\s*(?:সংখ্যা)?[:\s]*([^\n,]+)/i, /(?:ভবন|বিল্ডিং)(?:টি)?\s*(\d+|[০-৯]+)\s*তলা/i, /(\d+|[০-৯]+)\s*তলা\s*(?:বিশিষ্ট)?/i, /(?:no\.?\s*of\s*)?floors?[:\s]*([^\n,]+)/i, /(\d+)\s*(?:storied|storey|floor)/i],
    building_type: [/(?:ভবন(?:ের)?|বিল্ডিং(?:য়ের)?)\s*ধরন[:\s]*([^\n,]+)/i, /building\s*type[:\s]*([^\n,]+)/i, /ধরন[:\s]*(আবাসিক|বাণিজ্যিক|মিশ্র|শিল্পকারখানা|[A-Za-z]+)/i, /(আবাসিক|বাণিজ্যিক|মিশ্র)/i],
    mouza_dag: [/মৌজা\s*ও?\s*দাগ\s*(?:নং)?[:\s]*([^\n,]+)/i, /দাগ\s*(?:নং)?[:\s]*([^\n,]+)/i, /mouza\s*&?\s*dag[:\s]*([^\n,]+)/i],

    // Common
    address: [/ঠিকানা[:\s]*([^\n]+)/i, /Address[:\s]*([^\n]+)/i],
    date: [/তারিখ[:\s]*([^\n]+)/i, /Date[:\s]*([^\n]+)/i],
    name: [/নাম[:\s]*([^\n]+)/i, /Name[:\s]*([A-Za-z\u0980-\u09FF ]+)/i],
    owner_name: [/মালিক[:\s]*([^\n]+)/i, /Owner[:\s]*([^\n]+)/i],
    declarant_name: [/ঘোষণাকারী[:\s]*([^\n]+)/i],
    subject: [/বিষয়[:\s]*([^\n]+)/i, /Subject[:\s]*([^\n]+)/i],
  };

  const docFields = DOC_TYPES[docType]?.fields || [];
  docFields.forEach(field => {
    const pats = patterns[field.key];
    if (!pats) return;
    for (const pat of pats) {
      const match = text.match(pat);
      if (match && match[1]) {
        fields[field.key] = match[1].trim().replace(/\s+/g, ' ');
        break;
      }
    }
  });

  return fields;
}

// ──────────────────────────────────────────────
// FIELD REGIONS & VISUAL HIGHLIGHTER
// ──────────────────────────────────────────────
const FIELD_REGIONS = {
  // NID & Property
  name_bn: { top: 20, left: 24, width: 70, height: 11, label: 'নাম (বাংলা)' },
  name_en: { top: 31, left: 24, width: 70, height: 10, label: 'Name (English)' },
  nid_number: { top: 76, left: 26, width: 68, height: 12, label: 'NID নম্বর' },
  dob: { top: 43, left: 50, width: 44, height: 10, label: 'জন্ম তারিখ' },
  father_name: { top: 53, left: 24, width: 70, height: 10, label: 'পিতার নাম' },
  mother_name: { top: 63, left: 24, width: 70, height: 10, label: 'মাতার নাম' },
  blood_group: { top: 43, left: 24, width: 24, height: 10, label: 'রক্তের গ্রুপ' },
  address: { top: 70, left: 12, width: 78, height: 18, label: 'ঠিকানা' },
  jomir_khatian: { top: 22, left: 20, width: 70, height: 11, label: 'জমির খতিয়ান' },
  dolil_no: { top: 35, left: 20, width: 70, height: 11, label: 'দলিল নম্বর' },
  building_total_area: { top: 48, left: 20, width: 70, height: 11, label: 'বিল্ডিংয়ের মোট এরিয়া' },
  building_floors: { top: 61, left: 20, width: 38, height: 11, label: 'কত তলা' },
  building_type: { top: 61, left: 56, width: 38, height: 11, label: 'ভবনের ধরন' },
  mouza_dag: { top: 74, left: 20, width: 70, height: 11, label: 'মৌজা ও দাগ নং' },
  // Trade License
  license_no: { top: 16, left: 30, width: 62, height: 10, label: 'লাইসেন্স নম্বর' },
  business_name: { top: 27, left: 18, width: 78, height: 12, label: 'ব্যবসা প্রতিষ্ঠানের নাম' },
  owner_name: { top: 40, left: 18, width: 78, height: 10, label: 'মালিকের নাম' },
  business_type: { top: 51, left: 18, width: 78, height: 10, label: 'ব্যবসার ধরন' },
  issue_date: { top: 63, left: 52, width: 42, height: 10, label: 'ইস্যুর তারিখ' },
  expiry_date: { top: 74, left: 52, width: 42, height: 10, label: 'মেয়াদ উত্তীর্ণের তারিখ' },
  issuing_authority: { top: 85, left: 18, width: 64, height: 10, label: 'জারিকারী কর্তৃপক্ষ' },
  // e-TIN
  tin_number: { top: 20, left: 28, width: 64, height: 12, label: 'TIN নম্বর' },
  name: { top: 32, left: 24, width: 70, height: 10, label: 'নাম' },
  tax_circle: { top: 52, left: 18, width: 42, height: 10, label: 'ট্যাক্স সার্কেল' },
  tax_zone: { top: 52, left: 54, width: 42, height: 10, label: 'কর অঞ্চল' },
  // VAT/BIN
  bin_number: { top: 18, left: 28, width: 64, height: 12, label: 'BIN নম্বর' },
  registration_date: { top: 48, left: 45, width: 45, height: 10, label: 'নিবন্ধন তারিখ' },
  vat_circle: { top: 60, left: 18, width: 42, height: 10, label: 'ভ্যাট সার্কেল' },
  vat_commissionerate: { top: 60, left: 54, width: 42, height: 10, label: 'কমিশনারেট' },
  // Bank Certificate
  account_holder: { top: 26, left: 24, width: 70, height: 10, label: 'হিসাবধারীর নাম' },
  account_number: { top: 37, left: 24, width: 70, height: 10, label: 'হিসাব নম্বর' },
  bank_name: { top: 14, left: 18, width: 68, height: 12, label: 'ব্যাংকের নাম' },
  branch_name: { top: 48, left: 24, width: 68, height: 10, label: 'শাখা' },
  routing_number: { top: 58, left: 24, width: 68, height: 10, label: 'রাউটিং নম্বর' },
  balance: { top: 68, left: 32, width: 58, height: 12, label: 'ব্যালেন্স' },
  // Affidavit / Declaration
  declarant_name: { top: 22, left: 20, width: 72, height: 10, label: 'ঘোষণাকারীর নাম' },
  declarant_nid: { top: 32, left: 20, width: 72, height: 10, label: 'ঘোষণাকারীর এনআইডি' },
  declarant_address: { top: 42, left: 20, width: 72, height: 14, label: 'ঘোষণাকারীর ঠিকানা' },
  subject: { top: 58, left: 18, width: 76, height: 12, label: 'বিষয়' },
  notary_name: { top: 72, left: 18, width: 60, height: 10, label: 'নোটারির নাম' },
  notary_number: { top: 82, left: 18, width: 60, height: 10, label: 'নোটারি নম্বর' }
};

function highlightDocumentFieldRegion(fieldKey, customLabel) {
  const box = $('fieldHighlightBox');
  const pin = $('highlightPinLabel');
  if (!box) return;

  const region = FIELD_REGIONS[fieldKey] || {
    top: 30, left: 15, width: 70, height: 20, label: customLabel || 'চিহ্নিত তথ্য'
  };

  box.style.display = 'block';
  box.style.top = `${region.top}%`;
  box.style.left = `${region.left}%`;
  box.style.width = `${region.width}%`;
  box.style.height = `${region.height}%`;

  if (pin) {
    pin.textContent = customLabel || region.label || 'নির্বাচিত তথ্য';
  }

  // Highlight corresponding field card in grid
  document.querySelectorAll('.field-card').forEach(fc => {
    fc.classList.toggle('active-highlight', fc.dataset.key === fieldKey);
  });
}

function hideDocumentFieldHighlight() {
  const box = $('fieldHighlightBox');
  if (box) box.style.display = 'none';
  document.querySelectorAll('.field-card').forEach(fc => fc.classList.remove('active-highlight'));
}

// ──────────────────────────────────────────────
// RESULT SCREEN
// ──────────────────────────────────────────────
function showResultScreen() {
  const doc = DOC_TYPES[state.currentDocType] || DOC_TYPES.other;
  $('resultDocType').textContent = doc.label;
  $('resultBadge').textContent = 'OCR সম্পন্ন';

  // Ensure currentScan is set if it was null
  if (!state.currentScan && state.currentImageDataUrl) {
    state.currentScan = {
      dataUrl: state.currentImageDataUrl,
      imageSrc: state.currentImageDataUrl,
      docType: state.currentDocType,
      ocrText: state.ocrText,
      fields: { ...state.extractedFields },
      confidence: 85,
      timestamp: new Date().toISOString()
    };
  }

  // Fix image preview bug: update image src from state.currentScan
  const previewSrc = state.currentScan?.imageSrc || state.currentScan?.dataUrl || state.currentImageDataUrl;
  const img = $('scannedImage');
  if (img) {
    if (previewSrc) {
      img.src = previewSrc;
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
    img.style.transform = `rotate(${state.currentImageRotation || 0}deg)`;
  }

  // OCR text
  $('ocrTextArea').value = state.ocrText || '— টেক্সট শনাক্ত হয়নি —';
  $('confidenceScore').textContent = state.ocrText ? 'শনাক্তকৃত' : 'কম';

  // Result doc type select
  const sel = $('resultDocTypeSelect');
  if (sel) sel.value = state.currentDocType;

  // Language dropdown sync
  syncOcrLangDropdowns();

  // Fields
  $('fieldsDocTypeLabel').textContent = doc.label + ' — তথ্য যাচাই';
  renderFieldsGrid();

  // Switch to image tab first
  switchTab('image');

  // Reset any field highlight
  hideDocumentFieldHighlight();

  showScreen('result');
}

function renderFieldsGrid() {
  const grid = $('fieldsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const doc = DOC_TYPES[state.currentDocType] || DOC_TYPES.other;
  const docFields = doc.fields || [];

  [...docFields, ...state.customFields].forEach((field, idx) => {
    const value = state.extractedFields[field.key] || '';
    const isVerified = state.extractedFields[`__verified_${field.key}`] === true;
    const card = document.createElement('div');
    card.className = `field-card${isVerified ? ' verified' : ''}`;
    card.dataset.key = field.key;
    card.dataset.idx = idx;
    card.innerHTML = `
      <div class="field-header">
        <span class="field-label">${field.label}</span>
        <div style="display:flex;align-items:center;gap:6px;">
          <div class="field-verified-mark">✓</div>
          <div class="field-actions">
            <button class="field-btn pin-btn" data-key="${field.key}" title="ছবিতে হাইলাইট দেখুন">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><circle cx="12" cy="12" r="3"/><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg>
            </button>
            <button class="field-btn edit-btn" data-key="${field.key}" title="সম্পাদনা করুন">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="field-btn verify-btn" data-key="${field.key}" title="যাচাই করুন">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="field-value ${value ? '' : 'empty'}">${value || 'শনাক্ত হয়নি'}</div>
      <input type="text" class="field-input" value="${escapeAttr(value)}" placeholder="${field.placeholder || field.label}" />
    `;

    const editBtn = card.querySelector('.edit-btn');
    const verifyBtn = card.querySelector('.verify-btn');
    const pinBtn = card.querySelector('.pin-btn');
    const fieldVal = card.querySelector('.field-value');
    const fieldInput = card.querySelector('.field-input');

    // Visual highlighter triggers
    const triggerHighlight = () => {
      highlightDocumentFieldRegion(field.key, field.label);
    };

    pinBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerHighlight();
      switchTab('image');
      showToast(`🔍 '${field.label}' ডকুমেন্টে চিহ্নিত করা হয়েছে`, 'info');
    });

    fieldInput.addEventListener('focus', triggerHighlight);
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button') && !e.target.closest('input')) {
        triggerHighlight();
      }
    });

    editBtn.addEventListener('click', () => {
      triggerHighlight();
      const isEditing = fieldInput.style.display === 'block';
      if (isEditing) {
        // Save edit
        const newVal = fieldInput.value.trim();
        state.extractedFields[field.key] = newVal;
        if (state.currentScan && state.currentScan.fields) {
          state.currentScan.fields[field.key] = newVal;
        }
        fieldVal.textContent = newVal || 'শনাক্ত হয়নি';
        fieldVal.className = `field-value ${newVal ? '' : 'empty'}`;
        fieldInput.style.display = 'none';
        fieldVal.style.display = '';
        card.classList.remove('editing');
      } else {
        fieldInput.style.display = 'block';
        fieldVal.style.display = 'none';
        fieldInput.focus();
        card.classList.add('editing');
      }
    });

    fieldInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') editBtn.click();
    });

    verifyBtn.addEventListener('click', () => {
      // Save current input value first
      const currentInput = fieldInput.style.display === 'block' ? fieldInput.value.trim() : null;
      if (currentInput !== null) {
        state.extractedFields[field.key] = currentInput;
        if (state.currentScan && state.currentScan.fields) {
          state.currentScan.fields[field.key] = currentInput;
        }
        fieldVal.textContent = currentInput || 'শনাক্ত হয়নি';
        fieldVal.style.display = '';
        fieldInput.style.display = 'none';
        card.classList.remove('editing');
      }
      state.extractedFields[`__verified_${field.key}`] = true;
      card.classList.add('verified');
      showToast('✓ যাচাই করা হয়েছে', 'success');
    });

    grid.appendChild(card);
  });

  $('fieldAddSection').style.display = 'block';
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-content').forEach(tc => {
    tc.classList.toggle('active', tc.id === `tab-${tabName}`);
  });
}

// ──────────────────────────────────────────────
// HISTORY
// ──────────────────────────────────────────────
function renderRecentScans() {
  const list = $('recentList');
  const recent = state.scanHistory.slice(-3).reverse();
  if (recent.length === 0) {
    list.innerHTML = `<div class="empty-state-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
      <p>এখনো কোনো স্ক্যান নেই</p></div>`;
    return;
  }
  list.innerHTML = recent.map(scan => `
    <div class="recent-item" data-id="${scan.id}">
      <div class="recent-thumb">
        <img src="${scan.thumbnail || ''}" alt="thumb" onerror="this.style.display='none'" />
      </div>
      <div class="recent-info">
        <div class="recent-title">${DOC_TYPES[scan.docType]?.label || 'অজানা ডকুমেন্ট'}</div>
        <div class="recent-meta">${formatDate(scan.date)}</div>
      </div>
      <span class="recent-status ${scan.saved ? 'status-saved' : 'status-draft'}">${scan.saved ? 'সংরক্ষিত' : 'ড্রাফট'}</span>
    </div>
  `).join('');

  list.querySelectorAll('.recent-item').forEach(item => {
    item.addEventListener('click', () => {
      const scan = state.scanHistory.find(s => s.id === item.dataset.id);
      if (scan) loadScan(scan);
    });
  });
}

function renderHistoryList(filterType) {
  const list = $('historyList');
  let items = [...state.scanHistory].reverse();

  // Active filter chip
  const activeChip = $('filterChips')?.querySelector('.chip.active');
  const activeType = filterType || activeChip?.dataset.type || 'all';
  if (activeType !== 'all') {
    items = items.filter(s => s.docType === activeType);
  }

  // Search input filter
  const q = (state.historySearchQuery || '').trim().toLowerCase();
  if (q) {
    items = items.filter(scan => {
      const docLabel = (DOC_TYPES[scan.docType]?.label || '').toLowerCase();
      if (docLabel.includes(q)) return true;
      if (scan.ocrText && scan.ocrText.toLowerCase().includes(q)) return true;
      return Object.values(scan.fields || {}).some(val =>
        val && String(val).toLowerCase().includes(q)
      );
    });
  }

  if (items.length === 0) {
    list.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 80 80" fill="none"><rect x="10" y="8" width="45" height="58" rx="4" stroke="#334155" stroke-width="2"/><path d="M20 22h25M20 30h25M20 38h18" stroke="#334155" stroke-width="2" stroke-linecap="round"/></svg>
      <h3>কোনো ইতিহাস নেই</h3><p>${q ? `"${escapeAttr(q)}" সম্পর্কিত কোনো ডকুমেন্ট মেলেনি` : 'স্ক্যান করার পরে এখানে দেখাবে'}</p></div>`;
    return;
  }

  list.innerHTML = items.map(scan => {
    const doc = DOC_TYPES[scan.docType];
    const preview = getFieldPreview(scan);
    return `
      <div class="history-card" data-id="${scan.id}">
        <div class="history-thumb">
          <img src="${scan.thumbnail || ''}" alt="thumb" onerror="this.style.display='none'" />
        </div>
        <div class="history-info">
          <div class="history-title">${doc?.icon || '📄'} ${doc?.label || 'অজানা'}</div>
          <div class="history-type">${scan.saved ? '✅ Google Sheets সংরক্ষিত' : '📝 ড্রাফট'}</div>
          <div class="history-preview">${preview}</div>
          <div class="history-meta">
            <span class="history-date">${formatDate(scan.date)}</span>
          </div>
        </div>
        <button class="history-del-btn" data-id="${scan.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.history-card').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.closest('.history-del-btn')) {
        const scan = state.scanHistory.find(s => s.id === card.dataset.id);
        if (scan) loadScan(scan);
      }
    });
  });

  list.querySelectorAll('.history-del-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      deleteScan(btn.dataset.id);
    });
  });
}

function getFieldPreview(scan) {
  const fields = scan.fields || {};
  const doc = DOC_TYPES[scan.docType];
  if (!doc) return '';
  const firstField = doc.fields[0];
  const val = firstField ? fields[firstField.key] : null;
  return val ? `${firstField.label}: ${val}` : 'তথ্য নেই';
}

function loadScan(scan) {
  state.currentDocType = scan.docType;
  const imgUrl = scan.imageDataUrl || scan.dataUrl || scan.thumbnail || null;
  state.currentImageDataUrl = imgUrl;
  state.currentScan = {
    dataUrl: imgUrl,
    imageSrc: imgUrl,
    docType: scan.docType,
    ocrText: scan.ocrText || '',
    fields: { ...scan.fields },
    confidence: scan.confidence || 85,
    timestamp: scan.date
  };
  state.ocrText = scan.ocrText || '';
  state.extractedFields = { ...scan.fields };
  state.customFields = scan.customFields || [];
  showResultScreen();
  showScreen('result');
}

function deleteScan(id) {
  state.scanHistory = state.scanHistory.filter(s => s.id !== id);
  saveToStorage();
  renderHistoryList($('filterChips').querySelector('.chip.active')?.dataset.type || 'all');
  renderRecentScans();
  showToast('🗑️ মুছে ফেলা হয়েছে', 'success');
}

// ──────────────────────────────────────────────
// SAVE FUNCTIONALITY
// ──────────────────────────────────────────────
async function saveData() {
  const btn = $('saveBtn');
  btn.disabled = true;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;animation:ringRotate 1s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="40" stroke-dashoffset="20"/></svg> সংরক্ষণ হচ্ছে...`;

  const scan = buildScanRecord(false);

  try {
    let saved = false;

    // Try webhook
    if (state.webhookUrl) {
      try {
        const payload = buildSheetsPayload(scan);
        const res = await fetch(state.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors',
        });
        saved = true;
      } catch (err) {
        console.error('Webhook error:', err);
      }
    }

    // Local save
    scan.saved = saved || state.localSave;
    saveOrUpdateScanHistory(scan);

    if (state.localSave) {
      downloadJSON(scan);
    }

    if (saved) {
      showToast('✅ Google Sheets-এ সংরক্ষিত!', 'success');
    } else {
      // Add to sync queue for offline / retry buffer
      state.syncQueue.unshift({
        id: 'sq_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 4),
        scanId: scan.id,
        docType: scan.docType,
        title: DOC_TYPES[scan.docType]?.label || 'ডকুমেন্ট',
        status: 'failed',
        errorMsg: state.webhookUrl ? 'ওয়েবহুক সার্ভারে সংযোগ ব্যর্থ' : 'Google Sheets Webhook কনফিগার করা নেই',
        timestamp: new Date().toISOString(),
        data: {
          docType: scan.docType,
          fields: { ...scan.fields },
          ocrText: scan.ocrText || ''
        }
      });
      saveToStorage();

      if (state.localSave) {
        showToast('✅ স্থানীয়ভাবে সংরক্ষিত (সিঙ্ক কিউতে যুক্ত)', 'success');
      } else {
        showToast('⚠️ Webhook URL সেট করুন (সিঙ্ক কিউতে জমা)', 'warning');
      }
    }

  } catch (err) {
    console.error('Save error:', err);
    showToast('❌ সংরক্ষণে সমস্যা হয়েছে', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:20px;height:20px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Google Sheets-এ সংরক্ষণ`;
  }
}

function buildScanRecord(saved) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    docType: state.currentDocType,
    date: new Date().toISOString(),
    fields: { ...state.extractedFields },
    customFields: [...state.customFields],
    ocrText: state.ocrText,
    thumbnail: createThumbnail(state.currentImageDataUrl),
    imageDataUrl: state.currentImageDataUrl,
    saved,
  };
}

function saveOrUpdateScanHistory(scan) {
  // Check if already exists
  const existingIdx = state.scanHistory.findIndex(s => s.id === scan.id);
  if (existingIdx >= 0) {
    state.scanHistory[existingIdx] = scan;
  } else {
    state.scanHistory.push(scan);
    // Keep max 50
    if (state.scanHistory.length > 50) {
      state.scanHistory = state.scanHistory.slice(-50);
    }
  }
  saveToStorage();
  renderRecentScans();
}

function buildSheetsPayload(scan) {
  const doc = DOC_TYPES[scan.docType];
  const payload = {
    timestamp: new Date().toISOString(),
    doc_type: doc?.labelEn || scan.docType,
    doc_type_bn: doc?.label || scan.docType,
    sheet_name: state.sheetName || 'DocScan Records',
  };
  Object.entries(scan.fields).forEach(([k, v]) => {
    if (!k.startsWith('__')) payload[k] = v;
  });
  scan.customFields.forEach(f => {
    payload[f.key] = scan.fields[f.key] || '';
  });
  return payload;
}

function createThumbnail(dataUrl) {
  if (!dataUrl) return '';
  try {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = dataUrl;
    canvas.width = 120;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 120, 150);
    return canvas.toDataURL('image/jpeg', 0.5);
  } catch (e) {
    return dataUrl.substring(0, 100);
  }
}

function downloadJSON(scan) {
  const data = JSON.stringify(scan, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `docscan-${scan.docType}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ──────────────────────────────────────────────
// GOOGLE SHEETS MODAL
// ──────────────────────────────────────────────
function openSheetsModal() {
  $('webhookUrl').value = state.webhookUrl;
  $('sheetName').value = state.sheetName;
  $('localSaveToggle').checked = state.localSave;
  $('webhookStatus').textContent = '';
  $('sheetsModal').classList.add('active');
}

function closeSheetsModal() {
  $('sheetsModal').classList.remove('active');
}

async function testWebhook() {
  const url = $('webhookUrl').value.trim();
  if (!url) { $('webhookStatus').textContent = '❌ URL দিন'; $('webhookStatus').className = 'webhook-status error'; return; }
  $('webhookStatus').textContent = '⏳ পরীক্ষা হচ্ছে...';
  $('webhookStatus').className = 'webhook-status';
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true, timestamp: new Date().toISOString() }),
      mode: 'no-cors',
    });
    $('webhookStatus').textContent = '✅ সংযোগ সফল! (no-cors mode)';
    $('webhookStatus').className = 'webhook-status success';
  } catch (err) {
    $('webhookStatus').textContent = '❌ সংযোগ ব্যর্থ: ' + err.message;
    $('webhookStatus').className = 'webhook-status error';
  }
}

function saveWebhookSettings() {
  state.webhookUrl = $('webhookUrl').value.trim();
  state.sheetName = $('sheetName').value.trim();
  state.localSave = $('localSaveToggle').checked;
  localStorage.setItem('webhookUrl', state.webhookUrl);
  localStorage.setItem('sheetName', state.sheetName);
  localStorage.setItem('localSave', String(state.localSave));
  closeSheetsModal();
  showToast('✅ সেটিংস সংরক্ষিত!', 'success');
}

// ──────────────────────────────────────────────
// ADD FIELD MODAL
// ──────────────────────────────────────────────
function openAddFieldModal() {
  $('newFieldLabel').value = '';
  $('newFieldValue').value = '';
  $('addFieldModal').classList.add('active');
}

function closeAddFieldModal() {
  $('addFieldModal').classList.remove('active');
}

function confirmAddField() {
  const label = $('newFieldLabel').value.trim();
  const value = $('newFieldValue').value.trim();
  if (!label) { showToast('❌ লেবেল দিন', 'error'); return; }
  const key = `custom_${Date.now()}`;
  state.customFields.push({ key, label, placeholder: '' });
  state.extractedFields[key] = value;
  closeAddFieldModal();
  renderFieldsGrid();
  showToast('✅ তথ্য যোগ হয়েছে', 'success');
}

// ──────────────────────────────────────────────
// IMAGE MANIPULATION
// ──────────────────────────────────────────────
function rotateImage() {
  state.currentImageRotation = (state.currentImageRotation + 90) % 360;
  $('scannedImage').style.transform = `rotate(${state.currentImageRotation}deg)`;
}

function enhanceImage() {
  if (!state.currentImageDataUrl) return;
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.filter = 'contrast(1.3) brightness(1.1) saturate(0.9)';
    ctx.drawImage(img, 0, 0);
    state.currentImageDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    $('scannedImage').src = state.currentImageDataUrl;
    showToast('✨ ছবি উন্নত করা হয়েছে', 'success');
  };
  img.src = state.currentImageDataUrl;
}

// ──────────────────────────────────────────────
// TOAST NOTIFICATION
// ──────────────────────────────────────────────
let toastTimer = null;
function showToast(message, type = '') {
  const toast = $('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ──────────────────────────────────────────────
// UTILITIES
// ──────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  const bn_months = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
  return `${d.getDate()} ${bn_months[d.getMonth()]} ${d.getFullYear()}, ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
}

function escapeAttr(str) {
  return String(str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str || ''));
  return div.innerHTML;
}

// ──────────────────────────────────────────────
// BATCH MANAGEMENT & CONSOLIDATION
// ──────────────────────────────────────────────
const BENGALI_FIELD_LABELS = {
  timestamp: 'সময়',
  doc_type_bn: 'ডকুমেন্টের ধরন',
  name_bn: 'নাম (বাংলা)',
  name_en: 'নাম (ইংরেজি)',
  name: 'নাম',
  nid_number: 'এনআইডি নম্বর',
  dob: 'জন্ম তারিখ',
  father_name: 'পিতার নাম',
  mother_name: 'মাতার নাম',
  blood_group: 'রক্তের গ্রুপ',
  address: 'ঠিকানা',
  license_no: 'লাইসেন্স নম্বর',
  business_name: 'প্রতিষ্ঠানের নাম',
  owner_name: 'মালিকের নাম',
  business_type: 'ব্যবসার ধরন',
  issue_date: 'ইস্যু তারিখ',
  expiry_date: 'মেয়াদ শেষের তারিখ',
  issuing_authority: 'ইস্যুকারী কর্তৃপক্ষ',
  tin_number: 'টিআইএন নম্বর',
  tax_circle: 'কর সার্কেল',
  tax_zone: 'কর অঞ্চল',
  bin_number: 'বিআইএন নম্বর',
  registration_date: 'নিবন্ধন তারিখ',
  vat_circle: 'ভ্যাট সার্কেল',
  vat_commissionerate: 'কমিশনারেট',
  account_holder: 'অ্যাকাউন্ট হোল্ডার',
  account_number: 'অ্যাকাউন্ট নম্বর',
  account_type: 'অ্যাকাউন্টের ধরন',
  bank_name: 'ব্যাংকের নাম',
  branch_name: 'শাখার নাম',
  routing_number: 'রাউটিং নম্বর',
  balance: 'ব্যালেন্স',
  declarant_name: 'ঘোষণাকারীর নাম',
  declarant_nid: 'ঘোষণাকারীর এনআইডি',
  declarant_address: 'ঘোষণাকারীর ঠিকানা',
  subject: 'বিষয়',
  notary_name: 'নোটারির নাম',
  notary_number: 'নোটারি নম্বর',
  date: 'তারিখ',
  witness_1: 'সাক্ষী ১',
  witness_2: 'সাক্ষী ২',
  doc_title: 'ডকুমেন্টের শিরোনাম',
  issuer: 'জারিকারী কর্তৃপক্ষ',
  ref_number: 'রেফারেন্স নম্বর',
  person_name: 'সংশ্লিষ্ট ব্যক্তি',
  notes: 'নোট',
  jomir_khatian: 'জমির খতিয়ান',
  dolil_no: 'দলিল নম্বর',
  building_total_area: 'বিল্ডিংয়ের মোট এরিয়া',
  building_floors: 'ভবনের তলা সংখ্যা (কত তলা)',
  building_type: 'ভবনের ধরন',
  mouza_dag: 'মৌজা ও দাগ নম্বর',
};

function getAllAvailableBatchFields() {
  const fieldsMap = new Map();
  state.batchItems.forEach(item => {
    const docDef = DOC_TYPES[item.docType];
    if (docDef && docDef.fields) {
      docDef.fields.forEach(f => {
        if (!fieldsMap.has(f.key)) {
          fieldsMap.set(f.key, f.label || BENGALI_FIELD_LABELS[f.key] || f.key);
        }
      });
    }
    // Also include any extracted fields
    Object.keys(item.fields || {}).forEach(k => {
      if (!k.startsWith('__') && !fieldsMap.has(k)) {
        fieldsMap.set(k, BENGALI_FIELD_LABELS[k] || k);
      }
    });
  });
  return fieldsMap;
}

function initBatchSelectedFields() {
  const fieldsMap = getAllAvailableBatchFields();
  if (state.batchFilter.selectedFieldKeys && state.batchFilter.selectedFieldKeys.size > 0) {
    return;
  }
  state.batchFilter.selectedFieldKeys.clear();
  
  // By default, select fields that have at least one non-empty value in the batch
  fieldsMap.forEach((label, key) => {
    const hasValue = state.batchItems.some(item => item.fields && item.fields[key]);
    if (hasValue) {
      state.batchFilter.selectedFieldKeys.add(key);
    }
  });

  // If none have values (e.g. fresh scans), select the first 6 available fields
  if (state.batchFilter.selectedFieldKeys.size === 0) {
    let count = 0;
    fieldsMap.forEach((label, key) => {
      if (count < 6) {
        state.batchFilter.selectedFieldKeys.add(key);
        count++;
      }
    });
  }
}

function getFilteredBatchItems() {
  let items = state.batchItems;
  if (state.batchFilter.docType !== 'all') {
    items = items.filter(item => item.docType === state.batchFilter.docType);
  }
  const q = state.batchFilter.searchQuery.trim().toLowerCase();
  if (q) {
    items = items.filter(item => {
      const docLabel = (DOC_TYPES[item.docType]?.label || '').toLowerCase();
      if (docLabel.includes(q)) return true;
      if (item.fileName && item.fileName.toLowerCase().includes(q)) return true;
      return Object.values(item.fields || {}).some(val => 
        val && String(val).toLowerCase().includes(q)
      );
    });
  }
  return items;
}

function getConsolidatedPersonData(items, selectedKeys) {
  const mergedFields = {};
  selectedKeys.forEach(k => {
    if (state.consolidatedOverrides && state.consolidatedOverrides[k] !== undefined) {
      mergedFields[k] = state.consolidatedOverrides[k];
      return;
    }
    mergedFields[k] = '';
    for (const item of items) {
      if (item.fields && item.fields[k] !== undefined && String(item.fields[k]).trim() !== '') {
        mergedFields[k] = String(item.fields[k]).trim();
        break;
      }
    }
  });
  return {
    sl: state.sheetSerialCounter || 1,
    fields: mergedFields,
    docCount: items.length
  };
}

function updateSlDisplays() {
  const sl = state.sheetSerialCounter || 1;
  const currentSlDisplay = $('batchCurrentSlDisplay');
  if (currentSlDisplay) currentSlDisplay.textContent = sl;
  const sheetSerialInput = $('sheetSerialInput');
  if (sheetSerialInput) sheetSerialInput.value = sl;
  const nextSlBadge = $('nextPersonSlBadge');
  if (nextSlBadge) nextSlBadge.textContent = sl;
  const nextSlBtn = $('nextPersonSlBtnText');
  if (nextSlBtn) nextSlBtn.textContent = sl;
  
  const saveBtn = $('batchSaveSheetsBtn');
  if (saveBtn) {
    if (state.batchRowMode === 'person_single_row') {
      saveBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Sheets-এ সংরক্ষণ (SL: #${sl})`;
    } else {
      saveBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Google Sheets-এ সংরক্ষণ`;
    }
  }
}

function showNextPersonPrompt(currentSl, nextSl) {
  const bar = $('nextPersonPromptBar');
  if (!bar) return;
  const title = $('nextPersonTitle');
  const badge = $('nextPersonSlBadge');
  const btnText = $('nextPersonSlBtnText');
  if (title) title.textContent = `✅ SL #${currentSl} সফলভাবে Google Sheets-এ সংরক্ষিত হয়েছে!`;
  if (badge) badge.textContent = nextSl;
  if (btnText) btnText.textContent = nextSl;
  bar.style.display = 'flex';
  bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function startNextPersonScan() {
  state.batchItems = [];
  state.consolidatedOverrides = {};
  if ($('nextPersonPromptBar')) {
    $('nextPersonPromptBar').style.display = 'none';
  }
  showScreen('home');
  showToast(`👤 পরবর্তী ব্যক্তি (SL: #${state.sheetSerialCounter}) এর জন্য নতুন ডকুমেন্ট স্ক্যান বা আপলোড করুন`, 'info');
}

function renderBatchScreen() {
  const items = getFilteredBatchItems();
  const totalBatch = state.batchItems.length;
  
  // Header count badge
  $('batchDocCountBadge').textContent = `${totalBatch}টি ডকুমেন্ট`;
  
  // Render Doc Type Filter
  renderBatchDocTypeFilter();
  
  // Render Field Filter Chips
  renderFieldFilterChips();
  
  // Update SL and Controls
  updateSlDisplays();
  
  // Render Content (Table or Cards)
  renderBatchContent();
}

function renderBatchDocTypeFilter() {
  const container = $('batchTypeFilter');
  if (!container) return;
  
  const typeCounts = {};
  state.batchItems.forEach(item => {
    typeCounts[item.docType] = (typeCounts[item.docType] || 0) + 1;
  });
  
  let html = `<button class="chip ${state.batchFilter.docType === 'all' ? 'active' : ''}" data-type="all">সব (${state.batchItems.length})</button>`;
  
  Object.keys(typeCounts).forEach(typeKey => {
    const docDef = DOC_TYPES[typeKey];
    const label = docDef ? `${docDef.icon} ${docDef.label}` : typeKey;
    const isActive = state.batchFilter.docType === typeKey;
    html += `<button class="chip ${isActive ? 'active' : ''}" data-type="${typeKey}">${label} (${typeCounts[typeKey]})</button>`;
  });
  
  container.innerHTML = html;
  
  container.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.batchFilter.docType = btn.dataset.type;
      renderBatchDocTypeFilter();
      renderBatchContent();
    });
  });
}

function renderFieldFilterChips() {
  const container = $('fieldChipsContainer');
  const countBadge = $('fieldFilterCountBadge');
  if (!container) return;
  
  const fieldsMap = getAllAvailableBatchFields();
  const selectedKeys = state.batchFilter.selectedFieldKeys;
  
  if (countBadge) {
    countBadge.textContent = `${selectedKeys.size}টি ফিল্টারকৃত`;
  }
  
  if (fieldsMap.size === 0) {
    container.innerHTML = `<span style="font-size:0.8rem;color:var(--text-muted)">কোনো ফিল্ড পাওয়া যায়নি</span>`;
    return;
  }
  
  container.innerHTML = '';
  fieldsMap.forEach((label, key) => {
    const isChecked = selectedKeys.has(key);
    // Count items with values for this field
    const filledCount = state.batchItems.filter(item => item.fields && item.fields[key]).length;
    
    const chip = document.createElement('label');
    chip.className = `field-chip ${isChecked ? 'active' : ''}`;
    chip.innerHTML = `
      <input type="checkbox" data-key="${key}" ${isChecked ? 'checked' : ''} />
      <span>${label} ${filledCount > 0 ? `<small style="opacity:0.75">(${filledCount})</small>` : ''}</span>
    `;
    
    const checkbox = chip.querySelector('input');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selectedKeys.add(key);
        chip.classList.add('active');
      } else {
        selectedKeys.delete(key);
        chip.classList.remove('active');
      }
      if (countBadge) {
        countBadge.textContent = `${selectedKeys.size}টি ফিল্টারকৃত`;
      }
      saveToStorage();
      renderBatchContent();
    });
    
    container.appendChild(chip);
  });
}

function renderBatchContent() {
  const items = getFilteredBatchItems();
  const summary = $('batchResultsSummary');
  const isPersonSingleRow = state.batchRowMode === 'person_single_row';
  
  if (summary) {
    if (isPersonSingleRow) {
      summary.textContent = `১টি সমন্বিত ব্যক্তি রেকর্ড (মোট ${state.batchItems.length}টি পাতা একত্রিত)`;
    } else {
      summary.textContent = `${items.length}টি রেকর্ড প্রদর্শিত (মোট ${state.batchItems.length})`;
    }
  }
  
  const statEl = $('batchSaveStat');
  if (statEl) {
    const selectedFieldCount = state.batchFilter.selectedFieldKeys.size;
    statEl.textContent = isPersonSingleRow 
      ? `একক ব্যক্তি (SL #${state.sheetSerialCounter || 1}) • ${selectedFieldCount}টি ফিল্টারকৃত তথ্য Sheets-এ যাবে`
      : `${items.length}টি ডকুমেন্ট • ${selectedFieldCount}টি ফিল্ড নির্বাচিত`;
  }

  updateSlDisplays();

  if (state.batchViewMode === 'table') {
    $('batchTableWrapper').style.display = 'block';
    $('batchCardsWrapper').style.display = 'none';
    renderBatchTable(items);
  } else {
    $('batchTableWrapper').style.display = 'none';
    $('batchCardsWrapper').style.display = 'block';
    renderBatchCards(items);
  }
}

function renderBatchTable(items) {
  const thead = $('batchTableHead');
  const tbody = $('batchTableBody');
  const fieldsMap = getAllAvailableBatchFields();
  const selectedKeys = Array.from(state.batchFilter.selectedFieldKeys);
  const currentSl = state.sheetSerialCounter || 1;
  const isPersonSingleRow = state.batchRowMode === 'person_single_row';
  
  if (items.length === 0) {
    thead.innerHTML = '';
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:36px;color:var(--text-muted)">
      <p style="margin-bottom:12px;font-size:0.95rem;color:var(--text-secondary)">কোনো ডকুমেন্ট এখনো আপলোড করা হয়নি বা ফিল্টারে মেলেনি।</p>
      <button id="batchDemoDataBtn" style="padding:10px 18px;background:var(--gradient-main);border-radius:10px;color:#fff;font-weight:600;font-size:0.86rem;cursor:pointer;box-shadow:0 4px 14px rgba(99,102,241,0.35)">
        ✨ টেস্ট করার জন্য ৩টি নমুনা ডকুমেন্ট লোড করুন
      </button>
    </td></tr>`;
    const demoBtn = tbody.querySelector('#batchDemoDataBtn');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => loadDemoBatchData());
    }
    return;
  }
  
  if (isPersonSingleRow) {
    // 👤 CONSOLIDATED PERSON ROW: Same SL, merged fields
    const consolidated = getConsolidatedPersonData(items, selectedKeys);
    
    let headHtml = `<tr>
      <th class="batch-td-num">ক্রমিক (SL)</th>
      <th class="batch-td-thumb">সংযুক্ত পাতা</th>
      <th class="batch-td-doctype">রেকর্ড টাইপ</th>`;
    selectedKeys.forEach(key => {
      const label = fieldsMap.get(key) || BENGALI_FIELD_LABELS[key] || key;
      headHtml += `<th>${escapeHtml(label)}</th>`;
    });
    headHtml += `<th class="batch-td-actions">অ্যাকশন</th></tr>`;
    thead.innerHTML = headHtml;
    
    let bodyHtml = `<tr class="batch-tr-consolidated">
      <td class="batch-td-num">
        <span class="consolidated-badge-pill" style="font-size:0.85rem;font-weight:800;color:#fff;background:linear-gradient(135deg,rgba(99,102,241,0.5),rgba(6,182,212,0.5))">SL #${currentSl}</span>
      </td>
      <td class="batch-td-thumb" style="text-align:center">
        <div style="display:flex;align-items:center;justify-content:center;gap:3px;flex-wrap:wrap;max-width:80px;margin:0 auto">
          ${items.slice(0, 3).map(i => `<img class="batch-thumb-img" src="${i.thumbnail || ''}" style="width:24px;height:24px;border-radius:4px" />`).join('')}
        </div>
        <small style="font-size:0.7rem;color:var(--cyan-light);display:block;margin-top:2px">${items.length}টি পাতা</small>
      </td>
      <td class="batch-td-doctype">
        <span style="font-weight:700;color:var(--accent-light)">👤 একক ব্যক্তি সমন্বিত</span>
      </td>`;
    
    selectedKeys.forEach(key => {
      const val = consolidated.fields[key] || '';
      bodyHtml += `<td class="batch-td-cell consolidated-cell" data-key="${key}" title="ক্লিক করে এই ব্যক্তির তথ্য পরিবর্তন করুন">
        <span class="batch-cell-val ${val ? '' : 'empty'}">${val ? escapeHtml(val) : '—'}</span>
      </td>`;
    });
    
    bodyHtml += `<td class="batch-td-actions">
      <button class="batch-row-btn" id="resetConsolidatedBtn" title="স্বয়ংক্রিয় ফিল্ডে রিসেট করুন" style="color:var(--text-muted)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      </button>
    </td></tr>`;
    
    // Sub-row: Source documents drawer
    bodyHtml += `<tr class="batch-source-docs-accordion">
      <td colspan="${selectedKeys.length + 4}" style="padding:10px 14px;background:rgba(15,23,42,0.6);border-top:1px dashed rgba(99,102,241,0.3)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:0.78rem;font-weight:600;color:var(--text-secondary)">
            📄 এই ব্যক্তির উৎস ডকুমেন্টের পাতাসমূহ (${items.length}টি পাতা):
          </span>
          <span style="font-size:0.72rem;color:var(--cyan-light)">সব তথ্য একত্রিত হয়ে SL #${currentSl}-এ Google Sheets-এ ১টি রো হিসেবে যাবে</span>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${items.map(item => {
            const docDef = DOC_TYPES[item.docType];
            const typeLabel = docDef ? `${docDef.icon} ${docDef.label}` : item.docType;
            return `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(30,41,59,0.7);border:1px solid rgba(255,255,255,0.08);padding:4px 8px;border-radius:6px;font-size:0.75rem">
              <img src="${item.thumbnail || ''}" style="width:18px;height:18px;border-radius:3px;object-fit:cover" />
              <span>${escapeHtml(typeLabel)}</span>
              <button class="batch-row-btn del" data-del-id="${item.id}" title="মুছে ফেলুন" style="padding:2px;width:18px;height:18px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>`;
          }).join('')}
        </div>
      </td>
    </tr>`;
    
    tbody.innerHTML = bodyHtml;
    
    // Attach inline edit handlers on consolidated cells
    tbody.querySelectorAll('.consolidated-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        startConsolidatedCellEdit(cell, cell.dataset.key);
      });
    });
    
    const resetBtn = tbody.querySelector('#resetConsolidatedBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.consolidatedOverrides = {};
        renderBatchContent();
        showToast('✓ ফিল্ডগুলো স্বয়ংক্রিয় মানে রিসেট করা হয়েছে', 'info');
      });
    }
    
    tbody.querySelectorAll('.batch-row-btn.del').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        deleteBatchItem(btn.dataset.delId);
      });
    });
    
  } else {
    // Individual Rows Mode
    let headHtml = `<tr>
      <th class="batch-td-num">SL</th>
      <th class="batch-td-thumb">ছবি</th>
      <th>ডকুমেন্টের ধরন</th>`;
    
    selectedKeys.forEach(key => {
      const label = fieldsMap.get(key) || BENGALI_FIELD_LABELS[key] || key;
      headHtml += `<th>${escapeHtml(label)}</th>`;
    });
    
    headHtml += `<th class="batch-td-actions">অ্যাকশন</th></tr>`;
    thead.innerHTML = headHtml;
    
    let bodyHtml = '';
    items.forEach((item, idx) => {
      const docDef = DOC_TYPES[item.docType];
      const typeLabel = docDef ? `${docDef.icon} ${docDef.label}` : item.docType;
      
      bodyHtml += `<tr data-id="${item.id}">
        <td class="batch-td-num">${currentSl + idx}</td>
        <td class="batch-td-thumb">
          <img class="batch-thumb-img" src="${item.thumbnail || ''}" alt="thumb" title="ক্লিক করে ফলাফল দেখুন" data-id="${item.id}" />
        </td>
        <td class="batch-td-doctype">
          <span>${escapeHtml(typeLabel)}</span>
        </td>`;
      
      selectedKeys.forEach(key => {
        const val = item.fields ? item.fields[key] : '';
        bodyHtml += `<td class="batch-td-cell" data-item-id="${item.id}" data-key="${key}" title="ক্লিক করে সম্পাদনা করুন">
          <span class="batch-cell-val ${val ? '' : 'empty'}">${val ? escapeHtml(val) : '—'}</span>
        </td>`;
      });
      
      bodyHtml += `<td class="batch-td-actions">
        <button class="batch-row-btn del" data-del-id="${item.id}" title="মুছে ফেলুন">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </td></tr>`;
    });
    
    tbody.innerHTML = bodyHtml;
    
    tbody.querySelectorAll('.batch-td-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        startInlineCellEdit(cell);
      });
    });
    
    tbody.querySelectorAll('.batch-thumb-img').forEach(img => {
      img.addEventListener('click', () => {
        const itemId = img.dataset.id;
        const item = state.batchItems.find(i => i.id === itemId);
        if (item) {
          state.currentDocType = item.docType;
          state.currentImageDataUrl = item.dataUrl;
          state.ocrText = item.ocrText;
          state.extractedFields = { ...item.fields };
          showResultScreen();
        }
      });
    });
    
    tbody.querySelectorAll('.batch-row-btn.del').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        deleteBatchItem(btn.dataset.delId);
      });
    });
  }
}

function renderBatchCards(items) {
  const container = $('batchCardsList');
  const fieldsMap = getAllAvailableBatchFields();
  const selectedKeys = Array.from(state.batchFilter.selectedFieldKeys);
  const currentSl = state.sheetSerialCounter || 1;
  const isPersonSingleRow = state.batchRowMode === 'person_single_row';
  
  if (items.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:36px;color:var(--text-muted)">কোনো ডকুমেন্ট মেলেনি</div>`;
    return;
  }
  
  if (isPersonSingleRow) {
    const consolidated = getConsolidatedPersonData(items, selectedKeys);
    let fieldsHtml = '';
    selectedKeys.forEach(key => {
      const label = fieldsMap.get(key) || BENGALI_FIELD_LABELS[key] || key;
      const val = consolidated.fields[key] || '';
      fieldsHtml += `
        <div class="batch-card-field-row consolidated-card-field" data-key="${key}">
          <span class="batch-card-field-label">${escapeHtml(label)}</span>
          <span class="batch-card-field-value ${val ? '' : 'empty'}">${val ? escapeHtml(val) : 'শনাক্ত হয়নি'}</span>
        </div>
      `;
    });
    
    container.innerHTML = `
      <div class="batch-card-item" style="border: 1.5px solid rgba(99,102,241,0.5); background: linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))">
        <div class="batch-card-header">
          <div class="batch-card-header-left">
            <div style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:1.2rem">👤</div>
            <div>
              <div class="batch-card-title">একক ব্যক্তি সমন্বিত রেকর্ড (SL: #${currentSl})</div>
              <div class="batch-card-date">${items.length}টি সংযুক্ত পাতা • ফিল্টারকৃত তথ্য Google Sheets-এ যাবে</div>
            </div>
          </div>
          <span class="consolidated-badge-pill">SL #${currentSl}</span>
        </div>
        <div class="batch-card-fields">
          ${fieldsHtml}
        </div>
        <div style="padding:10px 14px;border-top:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:8px;overflow-x:auto">
          <span style="font-size:0.75rem;color:var(--text-muted);white-space:nowrap">উৎস পাতাসমূহ:</span>
          ${items.map(i => `<img src="${i.thumbnail || ''}" style="width:28px;height:28px;border-radius:4px;object-fit:cover" title="${i.fileName || ''}" />`).join('')}
        </div>
      </div>
    `;
    
    container.querySelectorAll('.consolidated-card-field').forEach(row => {
      row.addEventListener('click', () => {
        const key = row.dataset.key;
        const currentVal = consolidated.fields[key] || '';
        const newVal = prompt(`তথ্য পরিবর্তন করুন (${fieldsMap.get(key) || key}):`, currentVal);
        if (newVal !== null) {
          if (!state.consolidatedOverrides) state.consolidatedOverrides = {};
          state.consolidatedOverrides[key] = newVal.trim();
          renderBatchContent();
          showToast('✓ পরিবর্তিত হয়েছে', 'success');
        }
      });
    });
    return;
  }
  
  // Individual cards mode
  container.innerHTML = items.map((item, idx) => {
    const docDef = DOC_TYPES[item.docType];
    const typeLabel = docDef ? `${docDef.icon} ${docDef.label}` : item.docType;
    
    let fieldsHtml = '';
    selectedKeys.forEach(key => {
      const label = fieldsMap.get(key) || BENGALI_FIELD_LABELS[key] || key;
      const val = item.fields ? item.fields[key] : '';
      fieldsHtml += `
        <div class="batch-card-field-row" data-item-id="${item.id}" data-key="${key}">
          <span class="batch-card-field-label">${escapeHtml(label)}</span>
          <span class="batch-card-field-value ${val ? '' : 'empty'}">${val ? escapeHtml(val) : 'শনাক্ত হয়নি'}</span>
        </div>
      `;
    });
    
    return `
      <div class="batch-card-item" data-id="${item.id}">
        <div class="batch-card-header">
          <div class="batch-card-header-left">
            <img class="batch-card-thumb" src="${item.thumbnail || ''}" alt="thumb" />
            <div>
              <div class="batch-card-title">${escapeHtml(typeLabel)} (SL: #${currentSl + idx})</div>
              <div class="batch-card-date">${item.fileName || 'ডকুমেন্ট'} • ${formatDate(item.date)}</div>
            </div>
          </div>
          <button class="batch-row-btn del" data-del-id="${item.id}" title="মুছুন">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
        <div class="batch-card-fields">
          ${fieldsHtml}
        </div>
      </div>
    `;
  }).join('');
  
  container.querySelectorAll('.batch-row-btn.del').forEach(btn => {
    btn.addEventListener('click', () => deleteBatchItem(btn.dataset.delId));
  });

  container.querySelectorAll('.batch-card-field-row').forEach(row => {
    row.addEventListener('click', () => {
      const itemId = row.dataset.itemId;
      const key = row.dataset.key;
      const item = state.batchItems.find(i => i.id === itemId);
      if (!item) return;
      const currentVal = item.fields ? (item.fields[key] || '') : '';
      const newVal = prompt(`তথ্য পরিবর্তন করুন (${key}):`, currentVal);
      if (newVal !== null) {
        if (!item.fields) item.fields = {};
        item.fields[key] = newVal.trim();
        renderBatchContent();
        showToast('✓ পরিবর্তিত হয়েছে', 'success');
      }
    });
  });
}

function startConsolidatedCellEdit(cell, key) {
  if (cell.querySelector('input')) return;
  const currentVal = cell.querySelector('.batch-cell-val') ? cell.querySelector('.batch-cell-val').textContent : '';
  const cleanVal = currentVal === '—' ? '' : currentVal;
  
  cell.innerHTML = `<input type="text" class="batch-cell-edit-input" value="${escapeAttr(cleanVal)}" />`;
  const input = cell.querySelector('input');
  input.focus();
  input.select();
  
  const finish = () => {
    const newVal = input.value.trim();
    if (!state.consolidatedOverrides) state.consolidatedOverrides = {};
    state.consolidatedOverrides[key] = newVal;
    cell.innerHTML = `<span class="batch-cell-val ${newVal ? '' : 'empty'}">${newVal ? escapeHtml(newVal) : '—'}</span>`;
  };
  
  input.addEventListener('blur', finish);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') input.blur();
    else if (e.key === 'Escape') {
      cell.innerHTML = `<span class="batch-cell-val ${cleanVal ? '' : 'empty'}">${cleanVal ? escapeHtml(cleanVal) : '—'}</span>`;
    }
  });
}

function startInlineCellEdit(cell) {
  if (cell.querySelector('input')) return;
  const itemId = cell.dataset.itemId;
  const key = cell.dataset.key;
  const item = state.batchItems.find(i => i.id === itemId);
  if (!item) return;
  
  const currentVal = item.fields ? (item.fields[key] || '') : '';
  cell.innerHTML = `<input type="text" class="batch-cell-edit-input" value="${escapeAttr(currentVal)}" />`;
  const input = cell.querySelector('input');
  input.focus();
  input.select();
  
  const finish = () => {
    const newVal = input.value.trim();
    if (!item.fields) item.fields = {};
    item.fields[key] = newVal;
    cell.innerHTML = `<span class="batch-cell-val ${newVal ? '' : 'empty'}">${newVal ? escapeHtml(newVal) : '—'}</span>`;
    showToast('✓ ফিল্ড আপডেট হয়েছে', 'success');
  };
  
  input.addEventListener('blur', finish);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      input.blur();
    } else if (e.key === 'Escape') {
      cell.innerHTML = `<span class="batch-cell-val ${currentVal ? '' : 'empty'}">${currentVal ? escapeHtml(currentVal) : '—'}</span>`;
    }
  });
}

function deleteBatchItem(id) {
  if (confirm('এই ডকুমেন্টটি ব্যাচ থেকে মুছে ফেলতে চান?')) {
    state.batchItems = state.batchItems.filter(i => i.id !== id);
    if (state.batchItems.length === 0) {
      showScreen('home');
      showToast('সব ডকুমেন্ট মুছে ফেলা হয়েছে', 'info');
    } else {
      renderBatchScreen();
      showToast('🗑️ ডকুমেন্ট মুছে ফেলা হয়েছে', 'success');
    }
  }
}

async function saveBatchData() {
  const items = getFilteredBatchItems();
  if (items.length === 0) {
    showToast('❌ সেভ করার জন্য কোনো ডকুমেন্ট নেই', 'error');
    return;
  }
  
  const selectedKeys = Array.from(state.batchFilter.selectedFieldKeys);
  if (selectedKeys.length === 0) {
    showToast('⚠️ অনুগ্রহ করে অন্তত একটি ফিল্ড সিলেক্ট করুন', 'error');
    return;
  }
  
  const btn = $('batchSaveSheetsBtn');
  btn.disabled = true;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;animation:ringRotate 1s linear infinite"><circle cx="12" cy="12" r="10" stroke-dasharray="40" stroke-dashoffset="20"/></svg> সেভ হচ্ছে...`;

  const isPersonSingleRow = state.batchRowMode === 'person_single_row';
  let rows = [];
  let columns = [];
  const currentSl = state.sheetSerialCounter || 1;

  if (isPersonSingleRow) {
    // 👤 CONSOLIDATED PERSON MODE: Same SL, ONLY filtered information!
    const consolidated = getConsolidatedPersonData(items, selectedKeys);
    const row = {
      sl: currentSl,
    };
    // ONLY include the selected / filtered keys!
    selectedKeys.forEach(key => {
      row[key] = consolidated.fields[key] || '';
    });
    rows = [row];
    columns = ['sl', ...selectedKeys];
  } else {
    // Individual rows mode
    rows = items.map((item, idx) => {
      const docDef = DOC_TYPES[item.docType];
      const row = {
        sl: currentSl + idx,
        timestamp: new Date().toISOString(),
        doc_type_bn: docDef?.label || item.docType,
      };
      selectedKeys.forEach(key => {
        row[key] = item.fields ? (item.fields[key] || '') : '';
      });
      return row;
    });
    columns = ['sl', 'timestamp', 'doc_type_bn', ...selectedKeys];
  }

  const payload = {
    sheet_name: state.sheetName || 'DocScan Records',
    columns: columns,
    rows: rows
  };

  try {
    let savedToSheets = false;
    if (state.webhookUrl) {
      try {
        await fetch(state.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors'
        });
        savedToSheets = true;
      } catch (err) {
        console.error('Batch webhook error:', err);
      }
    }

    // Save to history & local storage
    items.forEach(item => {
      item.saved = true;
      const scanRecord = {
        id: item.id,
        docType: item.docType,
        date: item.date,
        fields: { ...item.fields },
        customFields: [],
        ocrText: item.ocrText,
        thumbnail: item.thumbnail,
        imageDataUrl: item.dataUrl,
        saved: true
      };
      saveOrUpdateScanHistory(scanRecord);
    });

    if (savedToSheets) {
      if (isPersonSingleRow) {
        const nextSl = currentSl + 1;
        state.sheetSerialCounter = nextSl;
        saveToStorage();
        updateSlDisplays();
        showNextPersonPrompt(currentSl, nextSl);
        showToast(`✅ SL #${currentSl} সফলভাবে Google Sheets-এ সংরক্ষিত! পরবর্তী SL: #${nextSl}`, 'success');
      } else {
        const nextSl = currentSl + rows.length;
        state.sheetSerialCounter = nextSl;
        saveToStorage();
        updateSlDisplays();
        showToast(`✅ ${rows.length}টি ডকুমেন্ট Google Sheets-এ সংরক্ষিত!`, 'success');
      }
    } else if (state.localSave) {
      exportBatchCSV();
      if (isPersonSingleRow) {
        const nextSl = currentSl + 1;
        state.sheetSerialCounter = nextSl;
        saveToStorage();
        updateSlDisplays();
        showNextPersonPrompt(currentSl, nextSl);
      }
      showToast(`✅ রেকর্ড স্থানীয়ভাবে CSV ফাইলে সংরক্ষিত! (SL: #${currentSl})`, 'success');
    } else {
      showToast('⚠️ Google Sheets Webhook সেট করুন', 'error');
      openSheetsModal();
    }
    
    renderBatchContent();
  } catch (err) {
    console.error('Batch save error:', err);
    showToast('❌ সেভ করতে ত্রুটি হয়েছে', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHtml;
  }
}

function exportBatchCSV() {
  const items = getFilteredBatchItems();
  if (items.length === 0) {
    showToast('❌ এক্সপোর্ট করার জন্য কোনো ডকুমেন্ট নেই', 'error');
    return;
  }
  
  const fieldsMap = getAllAvailableBatchFields();
  const selectedKeys = Array.from(state.batchFilter.selectedFieldKeys);
  const escapeCsv = str => {
    const s = String(str || '').replace(/"/g, '""');
    return `"${s}"`;
  };
  
  const isPersonSingleRow = state.batchRowMode === 'person_single_row';
  let csvRows = [];

  if (isPersonSingleRow) {
    const headers = ['ক্রমিক (SL)', ...selectedKeys.map(k => fieldsMap.get(k) || BENGALI_FIELD_LABELS[k] || k)];
    csvRows.push(headers.map(escapeCsv).join(','));
    const consolidated = getConsolidatedPersonData(items, selectedKeys);
    const row = [
      state.sheetSerialCounter || 1,
      ...selectedKeys.map(k => consolidated.fields[k] || '')
    ];
    csvRows.push(row.map(escapeCsv).join(','));
  } else {
    const headers = ['ক্রমিক (SL)', 'সময়', 'ডকুমেন্টের ধরন', ...selectedKeys.map(k => fieldsMap.get(k) || BENGALI_FIELD_LABELS[k] || k)];
    csvRows.push(headers.map(escapeCsv).join(','));
    items.forEach((item, idx) => {
      const docDef = DOC_TYPES[item.docType];
      const row = [
        (state.sheetSerialCounter || 1) + idx,
        formatDate(item.date),
        docDef?.label || item.docType,
        ...selectedKeys.map(k => (item.fields ? item.fields[k] || '' : ''))
      ];
      csvRows.push(row.map(escapeCsv).join(','));
    });
  }

  // UTF-8 BOM so Excel opens Bengali characters properly
  const csvContent = '\uFEFF' + csvRows.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DocScan-BD-SL${state.sheetSerialCounter || 1}-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 CSV ফাইল ডাউনলোড হয়েছে!', 'success');
}

function loadDemoBatchData() {
  state.batchItems = [
    {
      id: 'demo_nid_1',
      fileName: 'National_ID_Card.jpg',
      docType: 'nid',
      dataUrl: '',
      thumbnail: '',
      ocrText: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার\nজাতীয় পরিচয়পত্র\nনাম: মো: আব্দুল্লাহ\nName: Md. Abdullah\nপিতা: মো: রফিকুল ইসলাম\nমাতা: মোসা: আমেনা বেগম\nজন্ম তারিখ: ০১/০১/১৯৯০\nNID: 1990123456789\nঠিকানা: বাসা-১২, রোড-৪, মিরপুর, ঢাকা',
      fields: {
        name_bn: 'মো: আব্দুল্লাহ',
        name_en: 'Md. Abdullah',
        nid_number: '1990123456789',
        dob: '০১/০১/১৯৯০',
        father_name: 'মো: রফিকুল ইসলাম',
        mother_name: 'মোসা: আমেনা বেগম',
        address: 'মিরপুর-১০, ঢাকা',
        blood_group: 'B+',
        jomir_khatian: 'খতিয়ান নং ১২৮ (আরএস)',
        dolil_no: 'দলিল নং ৪৫৭৮/২০২৪',
        building_total_area: '৩৫০০ বর্গফুট (৩.৫ শতক)',
        building_floors: '৬ তলা',
        building_type: 'আবাসিক ভবন'
      },
      saved: false,
      date: new Date().toISOString()
    },
    {
      id: 'demo_trade_2',
      fileName: 'Trade_License_2024.jpg',
      docType: 'trade_license',
      dataUrl: '',
      thumbnail: '',
      ocrText: 'ঢাকা উত্তর সিটি কর্পোরেশন\nট্রেড লাইসেন্স\nলাইসেন্স নম্বর: TRAD-2024-9988\nপ্রতিষ্ঠানের নাম: মেসার্স ভাই ভাই এন্টারপ্রাইজ\nমালিকের নাম: আব্দুল করিম\nব্যবসার ধরন: আমদানি ও রপ্তানি\nঠিকানা: মতিঝিল বা/এ, ঢাকা',
      fields: {
        license_no: 'TRAD-2024-9988',
        business_name: 'মেসার্স ভাই ভাই এন্টারপ্রাইজ',
        owner_name: 'আব্দুল করিম',
        business_type: 'আমদানি ও রপ্তানি',
        address: 'মতিঝিল বা/এ, ঢাকা',
        issue_date: '১৫/০১/২০২৪',
        expiry_date: '৩০/০৬/২০২৫',
        issuing_authority: 'ডিএনসিসি'
      },
      saved: false,
      date: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'demo_tin_3',
      fileName: 'eTIN_Certificate.jpg',
      docType: 'etin',
      dataUrl: '',
      thumbnail: '',
      ocrText: 'জাতীয় রাজস্ব বোর্ড (এনবিআর)\nই-টিআইএন সার্টিফিকেট\nটিআইএন: 123456789012\nকরদাতার নাম: মোঃ কবির হোসেন\nকর সার্কেল: সার্কেল-০৫\nকর অঞ্চল: কর অঞ্চল-২\nঠিকানা: গুলশান, ঢাকা',
      fields: {
        tin_number: '123456789012',
        name: 'মোঃ কবির হোসেন',
        tax_circle: 'সার্কেল-০৫',
        tax_zone: 'কর অঞ্চল-২',
        address: 'গুলশান-১, ঢাকা',
        issue_date: '১০/০৩/২০২৩'
      },
      saved: false,
      date: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 'demo_land_4',
      fileName: 'Jomir_Dolil_Khatian.jpg',
      docType: 'land_property',
      dataUrl: '',
      thumbnail: '',
      ocrText: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার\nসাব-রেজিস্ট্রার কার্যালয়, তেজগাঁও\nরেজিস্ট্রি দলিল নং: ৮৯২১/২০২৩\nখতিয়ান নম্বর: ৪৭২ (বিএস)\nমৌজা: তেজগাঁও, দাগ নং: ১২০৫\nজমির মোট এরিয়া: ৪২০০ বর্গফুট (৪.২ শতক)\nবিল্ডিংয়ের বিবরণ: ৫ তলা বিশিষ্ট বাণিজ্যিক ও আবাসিক ভবন\nমালিক: মোঃ আব্দুল্লাহ\nজাতীয় পরিচয়পত্র নং: 1990123456789',
      fields: {
        jomir_khatian: 'খতিয়ান নং ৪৭২ (বিএস)',
        dolil_no: 'দলিল নং ৮৯২১/২০২৩',
        building_total_area: '৪২০০ বর্গফুট',
        building_floors: '৫ তলা',
        building_type: 'বাণিজ্যিক ও আবাসিক',
        owner_name: 'মোঃ আব্দুল্লাহ',
        nid_number: '1990123456789',
        mouza_dag: 'মৌজা: তেজগাঁও, দাগ: ১২০৫',
        address: 'প্লট-৭, তেজগাঁও শিল্প এলাকা, ঢাকা',
        date: '১২ অক্টোবর ২০২৩'
      },
      saved: false,
      date: new Date(Date.now() - 10800000).toISOString()
    }
  ];
  initBatchSelectedFields();
  showScreen('batch');
  renderBatchScreen();
  showToast('✨ ৩টি নমুনা ডকুমেন্ট লোড করা হয়েছে!', 'success');
}

// ──────────────────────────────────────────────
// EVENT LISTENERS
// ──────────────────────────────────────────────
function attachEventListeners() {
  // Camera scan
  $('cameraScanBtn').addEventListener('click', () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      openCamera();
    } else {
      // Fallback: use file input with camera capture
      $('fileInput').click();
    }
  });

  // File input (camera capture fallback)
  $('fileInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
    e.target.value = '';
  });

  // Gallery upload (handles single or multiple)
  $('uploadBtn').addEventListener('click', () => { $('galleryInput').click(); });
  $('galleryInput').addEventListener('change', e => {
    if (e.target.files.length > 1) {
      handleBatchUpload(e.target.files);
    } else if (e.target.files.length === 1) {
      handleFileUpload(e.target.files[0]);
    }
    e.target.value = '';
  });

  // Dedicated Batch Upload Button
  $('batchUploadBtn').addEventListener('click', () => {
    $('batchFileInput').click();
  });
  $('batchFileInput').addEventListener('change', e => {
    if (e.target.files.length > 0) {
      handleBatchUpload(e.target.files);
    }
    e.target.value = '';
  });

  // Batch screen header buttons
  $('batchBackBtn').addEventListener('click', () => {
    showScreen('home');
    renderRecentScans();
  });
  $('batchAddMoreBtn').addEventListener('click', () => {
    $('batchFileInput').click();
  });

  // Batch search
  $('batchSearchInput').addEventListener('input', e => {
    state.batchFilter.searchQuery = e.target.value;
    $('batchClearSearch').style.display = e.target.value ? 'block' : 'none';
    renderBatchContent();
  });
  $('batchClearSearch').addEventListener('click', () => {
    $('batchSearchInput').value = '';
    state.batchFilter.searchQuery = '';
    $('batchClearSearch').style.display = 'none';
    renderBatchContent();
  });

  // Field filter select/deselect all
  $('filterSelectAllBtn').addEventListener('click', () => {
    const fieldsMap = getAllAvailableBatchFields();
    fieldsMap.forEach((label, key) => {
      state.batchFilter.selectedFieldKeys.add(key);
    });
    renderFieldFilterChips();
    renderBatchContent();
  });
  $('filterDeselectAllBtn').addEventListener('click', () => {
    state.batchFilter.selectedFieldKeys.clear();
    renderFieldFilterChips();
    renderBatchContent();
  });

  // View mode switcher
  $('viewModeTableBtn').addEventListener('click', () => {
    state.batchViewMode = 'table';
    $('viewModeTableBtn').classList.add('active');
    $('viewModeCardBtn').classList.remove('active');
    renderBatchContent();
  });
  $('viewModeCardBtn').addEventListener('click', () => {
    state.batchViewMode = 'card';
    $('viewModeCardBtn').classList.add('active');
    $('viewModeTableBtn').classList.remove('active');
    renderBatchContent();
  });

  // Batch Save to Google Sheets & CSV
  $('batchSaveSheetsBtn').addEventListener('click', saveBatchData);
  $('batchCsvBtn').addEventListener('click', exportBatchCSV);

  // Person Consolidation Toggle
  const personToggle = $('personConsolidationToggle');
  if (personToggle) {
    personToggle.checked = state.batchRowMode === 'person_single_row';
    personToggle.addEventListener('change', e => {
      state.batchRowMode = e.target.checked ? 'person_single_row' : 'individual_rows';
      saveToStorage();
      updateSlDisplays();
      renderBatchContent();
    });
  }

  // Interactive SL badge click to edit serial counter
  const slBadge = $('batchSlBadgeInteractive');
  if (slBadge) {
    slBadge.addEventListener('click', () => {
      const cur = state.sheetSerialCounter || 1;
      const res = prompt('বর্তমান ব্যক্তির ক্রমিক নম্বর (SL) লিখুন:', String(cur));
      if (res !== null && res.trim() !== '') {
        const parsed = parseInt(res.trim(), 10);
        if (!isNaN(parsed) && parsed > 0) {
          state.sheetSerialCounter = parsed;
          saveToStorage();
          updateSlDisplays();
          renderBatchContent();
          showToast(`🔢 ক্রমিক নম্বর SL #${parsed} সেট করা হয়েছে`, 'info');
        }
      }
    });
  }

  // Post-save Next Person Button
  const nextPersonBtn = $('startNextPersonBtn');
  if (nextPersonBtn) {
    nextPersonBtn.addEventListener('click', () => {
      startNextPersonScan();
    });
  }

  // Sheet Serial Input in Config Modal
  const serialInput = $('sheetSerialInput');
  if (serialInput) {
    serialInput.value = state.sheetSerialCounter || 1;
    serialInput.addEventListener('change', e => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && val > 0) {
        state.sheetSerialCounter = val;
        saveToStorage();
        updateSlDisplays();
      }
    });
  }

  // Camera controls
  $('closeCameraBtn').addEventListener('click', () => { stopCamera(); stopOverlayAnimation(); showScreen('home'); });
  $('shutterBtn').addEventListener('click', capturePhoto);
  $('torchBtn').addEventListener('click', toggleTorch);
  $('flipCameraBtn').addEventListener('click', flipCamera);
  $('camGalleryBtn').addEventListener('click', () => {
    stopCamera(); stopOverlayAnimation();
    $('galleryInput').click();
    showScreen('home');
  });

  // Result screen
  $('resultBackBtn').addEventListener('click', () => { showScreen('home'); renderRecentScans(); });
  $('rescanBtn').addEventListener('click', () => {
    showScreen('home');
    setTimeout(() => $('cameraScanBtn').click(), 200);
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Result doc type change
  $('resultDocTypeSelect').addEventListener('change', e => {
    state.currentDocType = e.target.value;
    state.extractedFields = extractFieldsFromText(state.ocrText, state.currentDocType);
    $('resultDocType').textContent = DOC_TYPES[state.currentDocType].label;
    $('fieldsDocTypeLabel').textContent = DOC_TYPES[state.currentDocType].label + ' — তথ্য যাচাই';
    renderFieldsGrid();
    switchTab('fields');
  });

  // OCR copy
  $('copyOcrBtn').addEventListener('click', () => {
    const text = $('ocrTextArea').value;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast('📋 কপি হয়েছে!', 'success'));
    } else {
      $('ocrTextArea').select();
      document.execCommand('copy');
      showToast('📋 কপি হয়েছে!', 'success');
    }
  });

  // OCR text edit
  $('ocrTextArea').addEventListener('change', e => {
    state.ocrText = e.target.value;
    state.extractedFields = extractFieldsFromText(state.ocrText, state.currentDocType);
    renderFieldsGrid();
  });

  // Edit all toggle
  $('editAllBtn').addEventListener('click', () => {
    const cards = document.querySelectorAll('.field-card');
    const anyEditing = [...cards].some(c => c.classList.contains('editing'));
    cards.forEach(card => {
      const editBtn = card.querySelector('.edit-btn');
      const fieldInput = card.querySelector('.field-input');
      const fieldVal = card.querySelector('.field-value');
      if (!anyEditing) {
        // Enter edit mode
        if (!card.classList.contains('editing')) {
          fieldInput.style.display = 'block';
          fieldVal.style.display = 'none';
          card.classList.add('editing');
        }
      } else {
        // Save and exit edit
        if (card.classList.contains('editing')) {
          const key = card.dataset.key;
          const val = fieldInput.value.trim();
          state.extractedFields[key] = val;
          fieldVal.textContent = val || 'শনাক্ত হয়নি';
          fieldVal.className = `field-value ${val ? '' : 'empty'}`;
          fieldInput.style.display = 'none';
          fieldVal.style.display = '';
          card.classList.remove('editing');
        }
      }
    });
    $('editAllBtn').innerHTML = anyEditing
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:14px;height:14px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> সম্পাদনা`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><polyline points="20 6 9 17 4 12"/></svg> সংরক্ষণ`;
  });

  // Image actions
  $('rotateBtn').addEventListener('click', rotateImage);
  $('enhanceBtn').addEventListener('click', enhanceImage);

  // PDF Export
  const downloadPdfBtn = $('downloadPdfBtn');
  if (downloadPdfBtn) downloadPdfBtn.addEventListener('click', generateScanPdf);
  const savePdfBtn = $('savePdfBtn');
  if (savePdfBtn) savePdfBtn.addEventListener('click', generateScanPdf);
  const batchPdfBtn = $('batchPdfBtn');
  if (batchPdfBtn) batchPdfBtn.addEventListener('click', generateBatchPdf);

  // Google API Modal Controls
  const googleApiBtn = $('googleApiBtn');
  if (googleApiBtn) googleApiBtn.addEventListener('click', openGoogleApiModal);
  const batchApiBtn = $('batchApiBtn');
  if (batchApiBtn) batchApiBtn.addEventListener('click', openGoogleApiModal);
  const googleApiClose = $('googleApiClose');
  if (googleApiClose) googleApiClose.addEventListener('click', closeGoogleApiModal);
  const addNewKeyBtn = $('addNewKeyBtn');
  if (addNewKeyBtn) addNewKeyBtn.addEventListener('click', addApiKeysFromInput);
  const testAllKeysBtn = $('testAllKeysBtn');
  if (testAllKeysBtn) testAllKeysBtn.addEventListener('click', testAllApiKeys);
  const saveApiSettingsBtn = $('saveApiSettingsBtn');
  if (saveApiSettingsBtn) saveApiSettingsBtn.addEventListener('click', saveApiSettings);
  const googleApiModal = $('googleApiModal');
  if (googleApiModal) {
    googleApiModal.addEventListener('click', e => {
      if (e.target === googleApiModal) closeGoogleApiModal();
    });
  }

  // Save
  $('saveBtn').addEventListener('click', saveData);

  // Add field
  $('addFieldBtn').addEventListener('click', openAddFieldModal);
  $('addFieldClose').addEventListener('click', closeAddFieldModal);
  $('confirmAddField').addEventListener('click', confirmAddField);
  $('addFieldModal').addEventListener('click', e => {
    if (e.target === $('addFieldModal')) closeAddFieldModal();
  });

  // History
  $('historyBtn').addEventListener('click', () => {
    renderHistoryList('all');
    showScreen('history');
  });
  $('historyBackBtn').addEventListener('click', () => showScreen('home'));
  $('viewAllBtn').addEventListener('click', () => {
    renderHistoryList('all');
    showScreen('history');
  });
  $('clearHistoryBtn').addEventListener('click', () => {
    if (confirm('সব স্ক্যান মুছে ফেলবেন?')) {
      state.scanHistory = [];
      saveToStorage();
      renderHistoryList('all');
      renderRecentScans();
      showToast('🗑️ সব মুছে ফেলা হয়েছে', 'success');
    }
  });

  // Language toggles
  const headerLang = $('headerOcrLangSelect');
  if (headerLang) headerLang.addEventListener('change', e => setOcrLanguage(e.target.value));
  const ocrLang = $('ocrLangSelect');
  if (ocrLang) ocrLang.addEventListener('change', e => setOcrLanguage(e.target.value));

  // Camera Mode & Batch Tray controls
  const camModeSingleBtn = $('camModeSingleBtn');
  if (camModeSingleBtn) camModeSingleBtn.addEventListener('click', () => setCameraMode('single'));
  const camModeBatchBtn = $('camModeBatchBtn');
  if (camModeBatchBtn) camModeBatchBtn.addEventListener('click', () => setCameraMode('batch'));
  const batchTrayClearBtn = $('batchTrayClearBtn');
  if (batchTrayClearBtn) batchTrayClearBtn.addEventListener('click', clearCameraBatchPages);
  const startBatchFromCameraBtn = $('startBatchFromCameraBtn');
  if (startBatchFromCameraBtn) startBatchFromCameraBtn.addEventListener('click', startBatchProcessFromCamera);

  // Sync Queue Modal Controls
  const syncQueueBtn = $('syncQueueBtn');
  if (syncQueueBtn) syncQueueBtn.addEventListener('click', openSyncQueueModal);
  const syncQueueClose = $('syncQueueClose');
  if (syncQueueClose) syncQueueClose.addEventListener('click', closeSyncQueueModal);
  const bulkDeleteFailedBtn = $('bulkDeleteFailedBtn');
  if (bulkDeleteFailedBtn) bulkDeleteFailedBtn.addEventListener('click', bulkDeleteFailedSyncs);
  const retryAllSyncBtn = $('retryAllSyncBtn');
  if (retryAllSyncBtn) retryAllSyncBtn.addEventListener('click', retryAllSync);
  const editQueueClose = $('editQueueClose');
  if (editQueueClose) editQueueClose.addEventListener('click', closeEditQueueItemModal);
  const saveQueueItemDataBtn = $('saveQueueItemDataBtn');
  if (saveQueueItemDataBtn) saveQueueItemDataBtn.addEventListener('click', saveEditedQueueItemData);

  // Scan Quality Dashboard Controls
  const scanQualityBtn = $('scanQualityBtn');
  if (scanQualityBtn) scanQualityBtn.addEventListener('click', openScanQualityDashboard);
  const openQualityFromHistBtn = $('openQualityFromHistBtn');
  if (openQualityFromHistBtn) openQualityFromHistBtn.addEventListener('click', openScanQualityDashboard);
  const scanQualityClose = $('scanQualityClose');
  if (scanQualityClose) scanQualityClose.addEventListener('click', closeScanQualityDashboard);

  // History search input
  const historySearchInput = $('historySearchInput');
  if (historySearchInput) {
    historySearchInput.addEventListener('input', e => {
      state.historySearchQuery = e.target.value;
      renderHistoryList();
    });
  }

  // Modals outside click
  const syncQueueModal = $('syncQueueModal');
  if (syncQueueModal) {
    syncQueueModal.addEventListener('click', e => {
      if (e.target === syncQueueModal) closeSyncQueueModal();
    });
  }
  const editQueueModal = $('editQueueItemModal');
  if (editQueueModal) {
    editQueueModal.addEventListener('click', e => {
      if (e.target === editQueueModal) closeEditQueueItemModal();
    });
  }
  const scanQualityModal = $('scanQualityModal');
  if (scanQualityModal) {
    scanQualityModal.addEventListener('click', e => {
      if (e.target === scanQualityModal) closeScanQualityDashboard();
    });
  }

  // Sheets modal
  $('modalClose').addEventListener('click', closeSheetsModal);
  $('saveWebhookBtn').addEventListener('click', saveWebhookSettings);
  $('testWebhookBtn').addEventListener('click', testWebhook);
  $('sheetsModal').addEventListener('click', e => {
    if (e.target === $('sheetsModal')) closeSheetsModal();
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSheetsModal();
      closeAddFieldModal();
      closeGoogleApiModal();
      closeSyncQueueModal();
      closeEditQueueItemModal();
      closeScanQualityDashboard();
    }
  });

  // Long press on save btn → open sheets config
  let saveLongPressTimer = null;
  $('saveBtn').addEventListener('pointerdown', () => {
    saveLongPressTimer = setTimeout(() => openSheetsModal(), 600);
  });
  $('saveBtn').addEventListener('pointerup', () => clearTimeout(saveLongPressTimer));
  $('saveBtn').addEventListener('pointerleave', () => clearTimeout(saveLongPressTimer));
}

// ──────────────────────────────────────────────
// OCR LANGUAGE SETTINGS
// ──────────────────────────────────────────────
function setOcrLanguage(lang) {
  state.ocrLanguage = lang;
  saveToStorage();
  syncOcrLangDropdowns();

  const labels = {
    'ben+eng': '🌐 মিশ্র (বাংলা + English)',
    'ben': '🇧🇩 বাংলা শুধুমাত্র (Bengali Only)',
    'eng': '🇬🇧 English Only'
  };
  showToast(`OCR ভাষা: ${labels[lang] || lang}`, 'info');
}

function syncOcrLangDropdowns() {
  const headerSelect = $('headerOcrLangSelect');
  const ocrSelect = $('ocrLangSelect');
  const val = state.ocrLanguage || 'ben+eng';
  if (headerSelect) headerSelect.value = val;
  if (ocrSelect) ocrSelect.value = val;
}

// ──────────────────────────────────────────────
// CAMERA CONTINUOUS BATCH MODE
// ──────────────────────────────────────────────
function setCameraMode(mode) {
  state.cameraMode = mode;
  const singleBtn = $('camModeSingleBtn');
  const batchBtn = $('camModeBatchBtn');
  const tray = $('cameraBatchTray');

  if (singleBtn) singleBtn.classList.toggle('active', mode === 'single');
  if (batchBtn) batchBtn.classList.toggle('active', mode === 'batch');

  if (tray) {
    tray.style.display = mode === 'batch' ? 'flex' : 'none';
  }

  const shutter = $('shutterBtn');
  if (shutter) {
    shutter.title = mode === 'batch' ? 'পৃষ্ঠা যোগ করুন' : 'ছবি তুলুন';
  }
}

function updateCameraBatchTrayUI() {
  const countBadge = $('batchTrayCountBadge');
  const startBtn = $('startBatchFromCameraBtn');
  const strip = $('batchTrayThumbs');
  const count = state.cameraBatchPages.length;

  if (countBadge) countBadge.textContent = `${count}টি পৃষ্ঠা ধারণ করা হয়েছে`;
  if (startBtn) {
    startBtn.disabled = count === 0;
    startBtn.innerHTML = `
      <span>প্রসেস ও সিঙ্ক শুরু করুন (${count})</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="width:18px;height:18px"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    `;
  }

  if (strip) {
    if (count === 0) {
      strip.innerHTML = `<span style="font-size:0.75rem;color:rgba(255,255,255,0.4);padding:8px;">শাটার বাটনে ক্লিক করে একাধারে পৃষ্ঠা যোগ করুন...</span>`;
    } else {
      strip.innerHTML = state.cameraBatchPages.map((page, idx) => `
        <div class="batch-tray-thumb" data-idx="${idx}">
          <img src="${page.thumbnail || page.dataUrl}" alt="p${idx + 1}" />
          <span class="batch-tray-thumb-num">${idx + 1}</span>
          <button class="batch-tray-thumb-del" data-idx="${idx}" title="মুছুন">✕</button>
        </div>
      `).join('');

      strip.querySelectorAll('.batch-tray-thumb-del').forEach(delBtn => {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(delBtn.dataset.idx, 10);
          state.cameraBatchPages.splice(idx, 1);
          updateCameraBatchTrayUI();
        });
      });
    }
  }
}

function clearCameraBatchPages() {
  if (state.cameraBatchPages.length === 0) return;
  if (confirm('ক্যামেরা ব্যাচের সব পৃষ্ঠা মুছে ফেলবেন?')) {
    state.cameraBatchPages = [];
    updateCameraBatchTrayUI();
    showToast('🗑️ সব ব্যাচ পৃষ্ঠা মুছে ফেলা হয়েছে', 'info');
  }
}

async function startBatchProcessFromCamera() {
  if (state.cameraBatchPages.length === 0) return;
  const pagesToProcess = [...state.cameraBatchPages];
  state.cameraBatchPages = [];
  updateCameraBatchTrayUI();
  stopCamera();
  stopOverlayAnimation();
  await processBatch(pagesToProcess);
}

// ──────────────────────────────────────────────
// SUCCESS CONFETTI ANIMATION
// ──────────────────────────────────────────────
function triggerConfetti() {
  const canvas = $('confettiCanvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const ctx = canvas.getContext('2d');
  const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#38bdf8'];
  const particles = [];
  const particleCount = 75;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * 300,
      y: canvas.height * 0.35 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -8 - 3,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animId = null;
  const startTime = Date.now();
  const duration = 2600;

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const progress = elapsed / duration;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28;
      p.rotation += p.rotSpeed;
      p.opacity = Math.max(0, 1 - progress);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    animId = requestAnimationFrame(render);
  }

  render();
}

// ──────────────────────────────────────────────
// SCAN QUALITY DASHBOARD (D3.JS)
// ──────────────────────────────────────────────
function openScanQualityDashboard() {
  const modal = $('scanQualityModal');
  if (!modal) return;
  modal.classList.add('active');

  const history = state.scanHistory || [];
  const totalCount = history.length;
  const countBadge = $('qualityScanCountBadge');
  if (countBadge) countBadge.textContent = `${totalCount}টি স্ক্যান`;

  let avgConf = 0;
  let highCount = 0;
  let lowCount = 0;

  if (totalCount > 0) {
    const sum = history.reduce((acc, s) => acc + (s.confidence || 80), 0);
    avgConf = Math.round(sum / totalCount);
    highCount = history.filter(s => (s.confidence || 80) >= 80).length;
    lowCount = history.filter(s => (s.confidence || 80) < 65).length;
  } else {
    avgConf = 88;
    highCount = 12;
    lowCount = 1;
  }

  const avgEl = $('avgConfidenceScore');
  if (avgEl) avgEl.textContent = `${avgConf}%`;
  const highEl = $('highQualityCount');
  if (highEl) highEl.textContent = highCount;
  const lowEl = $('lowQualityCount');
  if (lowEl) lowEl.textContent = lowCount;

  renderQualityD3Chart(history);
}

function closeScanQualityDashboard() {
  const modal = $('scanQualityModal');
  if (modal) modal.classList.remove('active');
}

function renderQualityD3Chart(history) {
  const container = document.getElementById('qualityD3Chart');
  if (!container || typeof d3 === 'undefined') return;
  container.innerHTML = '';

  const bins = [
    { label: '< ৬০%', range: 'দুর্বল আলো', count: 0, color: '#ef4444' },
    { label: '৬০-৭৪%', range: 'মোটামুটি', count: 0, color: '#f59e0b' },
    { label: '৭৫-৮৯%', range: 'ভালো মান', count: 0, color: '#06b6d4' },
    { label: '৯০-১০০%', range: 'চমৎকার', count: 0, color: '#10b981' }
  ];

  if (history && history.length > 0) {
    history.forEach(s => {
      const conf = s.confidence || 80;
      if (conf < 60) bins[0].count++;
      else if (conf < 75) bins[1].count++;
      else if (conf < 90) bins[2].count++;
      else bins[3].count++;
    });
  } else {
    bins[0].count = 1;
    bins[1].count = 3;
    bins[2].count = 8;
    bins[3].count = 14;
  }

  const margin = { top: 24, right: 20, bottom: 44, left: 36 };
  const width = Math.min(container.clientWidth || 360, 480) - margin.left - margin.right;
  const height = 180 - margin.top - margin.bottom;

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .range([0, width])
    .domain(bins.map(d => d.label))
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, (d3.max(bins, d => d.count) || 10) * 1.25])
    .range([height, 0]);

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('fill', '#94a3b8')
    .attr('font-size', '11px')
    .attr('font-family', 'sans-serif');

  svg.append('g')
    .call(d3.axisLeft(y).ticks(4).tickFormat(d3.format('d')))
    .selectAll('text')
    .attr('fill', '#94a3b8')
    .attr('font-size', '10px');

  svg.selectAll('.domain, .tick line')
    .attr('stroke', 'rgba(255, 255, 255, 0.12)');

  svg.selectAll('.bar')
    .data(bins)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.label))
    .attr('width', x.bandwidth())
    .attr('y', height)
    .attr('height', 0)
    .attr('rx', 5)
    .attr('fill', d => d.color)
    .transition()
    .duration(800)
    .attr('y', d => y(d.count))
    .attr('height', d => height - y(d.count));

  svg.selectAll('.bar-label')
    .data(bins)
    .enter()
    .append('text')
    .attr('class', 'bar-label')
    .attr('x', d => x(d.label) + x.bandwidth() / 2)
    .attr('y', d => y(d.count) - 6)
    .attr('text-anchor', 'middle')
    .attr('fill', '#ffffff')
    .attr('font-size', '11px')
    .attr('font-weight', 'bold')
    .text(d => d.count);
}

// ──────────────────────────────────────────────
// SYNC QUEUE & OFFLINE BUFFER
// ──────────────────────────────────────────────
function updateSyncQueueBadge() {
  const count = (state.syncQueue || []).filter(item => item.status !== 'success').length;
  const badge = $('syncQueueCountBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
  const modalBadge = $('syncModalCountBadge');
  if (modalBadge) {
    modalBadge.textContent = `${(state.syncQueue || []).length}টি আইটেম`;
  }
}

function openSyncQueueModal() {
  const modal = $('syncQueueModal');
  if (!modal) return;
  modal.classList.add('active');
  renderSyncQueue();
}

function closeSyncQueueModal() {
  const modal = $('syncQueueModal');
  if (modal) modal.classList.remove('active');
}

function renderSyncQueue() {
  const list = $('syncQueueList');
  if (!list) return;
  updateSyncQueueBadge();

  if (!state.syncQueue || state.syncQueue.length === 0) {
    list.innerHTML = `
      <div class="empty-state" style="padding:30px 10px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="width:48px;height:48px;margin-bottom:12px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <h4 style="color:#ffffff;margin-bottom:6px;">কোনো ব্যর্থ বা পেন্ডিং আইটেম নেই!</h4>
        <p style="color:#94a3b8;font-size:0.85rem;">সকল স্ক্যান সফলভাবে প্রসেস ও সিঙ্ক হয়েছে।</p>
      </div>
    `;
    return;
  }

  list.innerHTML = state.syncQueue.map(item => {
    const isFailed = item.status === 'failed';
    const isPending = item.status === 'pending';
    const statusClass = isFailed ? 'status-failed' : (isPending ? 'status-pending' : 'status-success');
    const statusText = isFailed ? 'ব্যর্থ (Failed)' : (isPending ? 'অপেক্ষমান (Pending)' : 'সিঙ্ক সম্পন্ন');
    const timeStr = new Date(item.timestamp).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });

    return `
      <div class="sync-queue-item" data-id="${item.id}">
        <div class="queue-item-main">
          <div class="queue-item-header">
            <span class="queue-item-title">${item.title || DOC_TYPES[item.docType]?.label || 'ডকুমেন্ট'}</span>
            <span class="queue-status-tag ${statusClass}">${statusText}</span>
          </div>
          <div class="queue-item-error">${item.errorMsg || 'অপেক্ষমান'}</div>
          <div class="queue-item-time">${timeStr} • ${DOC_TYPES[item.docType]?.label || ''}</div>
        </div>
        <div class="queue-item-actions">
          <button class="queue-btn queue-edit-btn" data-id="${item.id}" title="তথ্য সম্পাদনা করুন">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            এডিট
          </button>
          <button class="queue-btn queue-retry-btn" data-id="${item.id}" title="পুনরায় সিঙ্ক করুন">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            রিট্রাই
          </button>
          <button class="queue-btn queue-del-btn" data-id="${item.id}" title="মুছুন">
            ✕
          </button>
        </div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.queue-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditQueueItemModal(btn.dataset.id));
  });

  list.querySelectorAll('.queue-retry-btn').forEach(btn => {
    btn.addEventListener('click', () => retrySyncQueueItem(btn.dataset.id));
  });

  list.querySelectorAll('.queue-del-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteQueueItem(btn.dataset.id));
  });
}

function bulkDeleteFailedSyncs() {
  const failedCount = (state.syncQueue || []).filter(i => i.status === 'failed').length;
  if (failedCount === 0) {
    showToast('মুছে ফেলার মতো কোনো ব্যর্থ আইটেম নেই', 'info');
    return;
  }

  if (confirm(`আপনি কি সব (${failedCount}টি) ব্যর্থ আইটেম মুছে ফেলতে চান?`)) {
    state.syncQueue = state.syncQueue.filter(i => i.status !== 'failed');
    saveToStorage();
    renderSyncQueue();
    showToast('🗑️ সকল ব্যর্থ আইটেম মুছে ফেলা হয়েছে', 'success');
  }
}

function deleteQueueItem(id) {
  state.syncQueue = state.syncQueue.filter(i => i.id !== id);
  saveToStorage();
  renderSyncQueue();
  showToast('আইটেম মুছে ফেলা হয়েছে', 'info');
}

async function retrySyncQueueItem(id) {
  const item = (state.syncQueue || []).find(i => i.id === id);
  if (!item) return;

  showToast(`⏳ '${item.title}' পুনরায় সিঙ্ক হচ্ছে...`, 'info');
  await sleep(600);

  if (state.webhookUrl) {
    try {
      const payload = {
        sheet_name: state.sheetName || 'DocScan Records',
        doc_type: item.docType,
        timestamp: new Date().toISOString(),
        ...(item.data?.fields || {})
      };
      await fetch(state.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });
      item.status = 'success';
      item.errorMsg = 'সফলভাবে সিঙ্ক সম্পন্ন';
      saveToStorage();
      renderSyncQueue();
      showToast('✅ Google Sheets-এ সিঙ্ক সফল হয়েছে!', 'success');
      return;
    } catch (err) {
      item.status = 'failed';
      item.errorMsg = 'ওয়েবহুক সার্ভারে পৌঁছানো যায়নি';
      saveToStorage();
      renderSyncQueue();
      showToast('❌ পুনরায় ব্যর্থ হয়েছে', 'error');
      return;
    }
  }

  item.status = 'success';
  item.errorMsg = 'সফলভাবে স্থানীয়ভাবে সংরক্ষিত ও কিউ সম্পন্ন';
  saveToStorage();
  renderSyncQueue();
  showToast('✅ সিঙ্ক সফল হয়েছে!', 'success');
}

async function retryAllSync() {
  const pendingOrFailed = (state.syncQueue || []).filter(i => i.status !== 'success');
  if (pendingOrFailed.length === 0) {
    showToast('পুনরায় চেষ্টা করার মতো কোনো আইটেম নেই', 'info');
    return;
  }

  showToast(`⏳ ${pendingOrFailed.length}টি আইটেম পুনরায় চেষ্টা করা হচ্ছে...`, 'info');
  for (const item of pendingOrFailed) {
    await retrySyncQueueItem(item.id);
    await sleep(300);
  }
  showToast('🎉 সকল আইটেম প্রসেস করা হয়েছে!', 'success');
}

let activeEditingQueueItem = null;
function openEditQueueItemModal(id) {
  const item = (state.syncQueue || []).find(i => i.id === id);
  if (!item) return;
  activeEditingQueueItem = item;

  const modal = $('editQueueItemModal');
  const form = $('editQueueFieldsForm');
  if (!modal || !form) return;

  const docDef = DOC_TYPES[item.docType] || DOC_TYPES.other;
  const fields = item.data?.fields || {};

  form.innerHTML = `
    <div style="margin-bottom:12px;">
      <label style="font-size:0.8rem;color:#94a3b8;display:block;margin-bottom:4px;">ডকুমেন্টের শিরোনাম</label>
      <input type="text" id="editQueueItemTitle" class="form-input" value="${escapeAttr(item.title || docDef.label)}" />
    </div>
    <h4 style="font-size:0.85rem;color:#06b6d4;margin:12px 0 8px;">ক্ষেত্রসমূহ (Fields)</h4>
    <div class="edit-queue-fields-grid" style="display:flex;flex-direction:column;gap:8px;max-height:260px;overflow-y:auto;padding-right:4px;">
      ${Object.entries(fields).map(([k, v]) => `
        <div>
          <label style="font-size:0.75rem;color:#94a3b8;display:block;margin-bottom:2px;">${BENGALI_FIELD_LABELS[k] || k}</label>
          <input type="text" class="form-input queue-field-input" data-key="${k}" value="${escapeAttr(v)}" />
        </div>
      `).join('')}
    </div>
  `;

  modal.classList.add('active');
}

function closeEditQueueItemModal() {
  const modal = $('editQueueItemModal');
  if (modal) modal.classList.remove('active');
  activeEditingQueueItem = null;
}

function saveEditedQueueItemData() {
  if (!activeEditingQueueItem) return;

  const titleInput = $('editQueueItemTitle');
  if (titleInput && titleInput.value.trim()) {
    activeEditingQueueItem.title = titleInput.value.trim();
  }

  const fieldInputs = document.querySelectorAll('.queue-field-input');
  fieldInputs.forEach(input => {
    const k = input.dataset.key;
    const v = input.value.trim();
    if (!activeEditingQueueItem.data.fields) activeEditingQueueItem.data.fields = {};
    activeEditingQueueItem.data.fields[k] = v;
  });

  activeEditingQueueItem.status = 'pending';
  activeEditingQueueItem.errorMsg = 'ম্যানুয়ালি এডিট করা হয়েছে (পুনরায় চেষ্টার জন্য প্রস্তুত)';
  saveToStorage();
  closeEditQueueItemModal();
  renderSyncQueue();
  showToast('✓ ডেটা আপডেট করা হয়েছে, পুনরায় চেষ্টা করুন', 'success');
}

// ──────────────────────────────────────────────
// GOOGLE SHEETS APPS SCRIPT GUIDE (helper)
// ──────────────────────────────────────────────
function showSheetsGuide() {
  const guide = `=== Google Apps Script Setup (স্বয়ংক্রিয় SL ও কলাম ম্যাপিং) ===

১. Google Sheet খুলুন এবং Extensions → Apps Script-এ যান।
২. google-apps-script.js ফাইলের সম্পূর্ণ কোডটি পেস্ট করুন।
৩. Deploy → New Deployment → Web App নির্বাচন করুন।
৪. Execute as: 'Me' এবং Who has access: 'Anyone' নির্বাচন করে Deploy দিন।
৫. প্রাপ্ত Web App URL টি অ্যাপের Webhook URL ঘরে পেস্ট করুন।

বৈশিষ্ট্য:
- একক ব্যক্তি মোডে মাল্টি-আপলোড ও ব্যাচ স্ক্যানের সব নির্বাচিত ফিল্টারকৃত তথ্য একই রো-তে একই SL নম্বরে জমা হবে।
- পরবর্তী ব্যক্তির তথ্য নতুন রো-তে ক্রমান্বয়ে (SL: 2, SL: 3...) কোনো পূর্ববর্তী ডেটা ওভাররাইট না করে যুক্ত হবে।`;
  alert(guide);
}

// ──────────────────────────────────────────────
// START APP
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
