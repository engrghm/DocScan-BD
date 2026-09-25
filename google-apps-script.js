// ═══════════════════════════════════════════════════════════
//  DocScan BD — Google Apps Script Backend
//  Copy this entire file into Google Apps Script editor
//  Then deploy as Web App (Execute as: Me, Anyone can access)
// ═══════════════════════════════════════════════════════════

/**
 * Handle POST requests from DocScan BD app
 * This function receives document data and writes it to Google Sheets
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // If it's a test request, just return success
    if (data.test === true) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: 'Connection OK' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get or create the spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get sheet name from data, default to "DocScan Records"
    const sheetName = data.sheet_name || 'DocScan Records';
    let sheet = ss.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Check if this is a batch request with multiple rows
    if (Array.isArray(data.rows) && data.rows.length > 0) {
      let savedCount = 0;
      data.rows.forEach(rowItem => {
        const rowData = buildRowData(rowItem, sheet, data.columns);
        sheet.appendRow(rowData.values);
        if (rowData.isFirstRow) {
          styleHeaderRow(sheet);
        }
        savedCount++;
      });
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: `${savedCount}টি রেকর্ড সফলভাবে সংরক্ষিত হয়েছে`,
          sheet: sheetName,
          count: savedCount,
          lastRow: sheet.getLastRow()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Single record save
    const rowData = buildRowData(data, sheet, data.columns);
    sheet.appendRow(rowData.values);
    
    // Style the header row on first entry
    if (rowData.isFirstRow) {
      styleHeaderRow(sheet);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Data saved successfully',
        sheet: sheetName,
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: err.message 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing the endpoint)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      success: true, 
      message: 'DocScan BD API is running',
      version: '1.0'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Build row data with headers
 */
function buildRowData(data, sheet, customColumns) {
  // Define column order for each document type
  const COLUMN_ORDERS = {
    'National ID': ['timestamp', 'doc_type_bn', 'name_bn', 'name_en', 'nid_number', 'dob', 'father_name', 'mother_name', 'blood_group', 'address'],
    'Trade License': ['timestamp', 'doc_type_bn', 'license_no', 'business_name', 'owner_name', 'business_type', 'address', 'issue_date', 'expiry_date', 'issuing_authority'],
    'e-TIN Certificate': ['timestamp', 'doc_type_bn', 'tin_number', 'name', 'nid_number', 'tax_circle', 'tax_zone', 'address', 'issue_date'],
    'VAT/BIN Certificate': ['timestamp', 'doc_type_bn', 'bin_number', 'business_name', 'owner_name', 'address', 'registration_date', 'vat_circle', 'vat_commissionerate'],
    'Bank Certificate': ['timestamp', 'doc_type_bn', 'account_holder', 'account_number', 'account_type', 'bank_name', 'branch_name', 'routing_number', 'issue_date', 'balance'],
    'Affidavit': ['timestamp', 'doc_type_bn', 'declarant_name', 'declarant_nid', 'declarant_address', 'subject', 'notary_name', 'notary_number', 'date', 'witness_1', 'witness_2'],
    'Declaration': ['timestamp', 'doc_type_bn', 'declarant_name', 'declarant_address', 'subject', 'date', 'witness_1', 'witness_2'],
    'Other Document': ['timestamp', 'doc_type_bn', 'doc_title', 'issuer', 'date', 'ref_number', 'person_name', 'notes'],
  };
  
  const BENGALI_HEADERS = {
    sl: 'ক্রমিক (SL)',
    SL: 'ক্রমিক (SL)',
    timestamp: 'সময়',
    doc_type: 'ডকুমেন্টের ধরন (EN)',
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
    jomir_khatian: 'জমির খতিয়ান',
    dolil_no: 'দলিল নম্বর',
    building_total_area: 'বিল্ডিংয়ের মোট এরিয়া',
    building_floors: 'ভবনের তলা সংখ্যা',
    building_type: 'ভবনের ধরন',
    mouza_dag: 'মৌজা ও দাগ নম্বর',
    owner_name: 'মালিকের নাম',
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
    issuer: 'জারিকারী',
    ref_number: 'রেফারেন্স নম্বর',
    person_name: 'ব্যক্তির নাম',
    notes: 'নোট',
  };
  
  const lastRow = sheet.getLastRow();
  const isFirstRow = lastRow === 0;
  
  let columns;
  if (isFirstRow) {
    if (Array.isArray(customColumns) && customColumns.length > 0) {
      columns = [...customColumns];
    } else {
      // Use predefined column order based on doc type
      columns = COLUMN_ORDERS[data.doc_type] || Object.keys(data).filter(k => k !== 'sheet_name');
      // Add any extra custom fields not in the predefined order
      Object.keys(data).forEach(k => {
        if (k !== 'sheet_name' && !columns.includes(k)) {
          columns.push(k);
        }
      });
    }
    
    // Write Bengali headers
    const headers = columns.map(col => BENGALI_HEADERS[col] || col);
    sheet.appendRow(headers);
    styleHeaderRow(sheet);
    
    // Write data row
    const values = columns.map(col => data[col] || '');
    return { values, isFirstRow: true, columns };
  } else {
    // Read existing headers
    const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const existingCols = headerRow.map(h => 
      Object.keys(BENGALI_HEADERS).find(k => BENGALI_HEADERS[k] === h) || h
    );
    
    // Add any new columns
    const allDataKeys = (Array.isArray(customColumns) && customColumns.length > 0)
      ? customColumns
      : Object.keys(data).filter(k => k !== 'sheet_name');

    const newCols = allDataKeys.filter(k => !existingCols.includes(k));
    if (newCols.length > 0) {
      const lastCol = sheet.getLastColumn();
      newCols.forEach((col, i) => {
        sheet.getRange(1, lastCol + i + 1).setValue(BENGALI_HEADERS[col] || col);
      });
      existingCols.push(...newCols);
    }
    
    const values = existingCols.map(col => data[col] || '');
    return { values, isFirstRow: false };
  }
}

/**
 * Style the header row
 */
function styleHeaderRow(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) return;
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange.setBackground('#1a237e');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
}

/*
═══════════════════════════════════════════════════
 SETUP INSTRUCTIONS:
═══════════════════════════════════════════════════

1. Google Sheets খুলুন (sheets.google.com)
2. Extensions → Apps Script ক্লিক করুন
3. এই সম্পূর্ণ কোডটি পেস্ট করুন (পুরনো কোড মুছে)
4. Save করুন (Ctrl+S)
5. Deploy → New Deployment ক্লিক করুন
6. Type: Web App নির্বাচন করুন
7. Settings:
   - Description: DocScan BD API
   - Execute as: Me
   - Who has access: Anyone
8. Deploy ক্লিক করুন
9. URL কপি করুন (https://script.google.com/macros/s/...)
10. DocScan BD অ্যাপে সেই URL পেস্ট করুন
    (সেভ বাটন লং-প্রেস করুন → Google Sheets সংযোগ)

═══════════════════════════════════════════════════
*/
