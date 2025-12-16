// InvoiceHTML.js
export const invoiceHTML = data => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    margin: 30px;
    color: #000;
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .logo img {
    width: 110px;
  }

  .company {
    width: 70%;
    text-align: right;
  }

  .company b {
    font-size: 14px;
  }

  h1 {
    text-align: center;
    border: 1px solid #ccc;
    padding: 6px;
    font-size: 16px;
    margin: 20px 0;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .box {
    width: 32%;
    border: 1px solid #ccc;
    padding: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }

  th, td {
    border: 1px solid #000;
    padding: 6px;
    text-align: center;
    font-size: 11px;
  }

  th {
    background: #f1f1f1;
  }

  .total {
    display: flex;
    justify-content: space-between;
    border: 1px solid #000;
    padding: 8px;
    margin-top: 10px;
    font-weight: bold;
  }

  .note {
    margin-top: 10px;
    font-size: 11px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
</style>
</head>

<body>

<div class="header">
  <div class="logo">
    <img src="LOGO_BASE64_HERE" />
  </div>

  <div class="company">
    <b>${data.company_details.regd_company_details}</b><br/>
    Warehouse: ${data.warehouse_details.address}<br/>
    Registered: ${data.company_details.regd_address}<br/>
    ${data.company_details.company_website} | ${data.company_details.email}<br/>
    CIN: ${data.company_details.company_cin}<br/>
    GSTIN: 09AABC53150L1Z7
  </div>
</div>

<h1>Tax Invoice</h1>

<div class="row">
  <div class="box">
    <b>Bill To</b><br/>
    ${data.bill_to.address}<br/>
    Phone: ${data.bill_to.phone}<br/>
    GSTIN: ${data.bill_to.gstin}<br/>
    PAN: ${data.bill_to.pan}
  </div>

  <div class="box">
    <b>Ship To</b><br/>
    ${data.ship_to.address}<br/>
    Phone: ${data.ship_to.phone}<br/>
    GSTIN: ${data.ship_to.gstin}<br/>
    PAN: ${data.ship_to.pan}
  </div>

  <div class="box">
    Invoice No: ${data.invoice_details.invoice_number}<br/>
    Date: ${data.invoice_details.invoice_date}<br/>
    Qty: ${data.invoice_details.total_quantity}<br/>
    Emp Code: ${data.invoice_details.emp_code}
  </div>
</div>

<table>
  <tr>
    <th>S.No</th>
    <th>Description of Goods</th>
    <th>IMEI</th>
    <th>Barcode</th>
    <th>Grade</th>
    <th>HSN</th>
  </tr>

  ${data.items.map((i, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${i.description}</td>
      <td>${i.imei}</td>
      <td>${i.barcode}</td>
      <td>${i.grade}</td>
      <td>${i.hsn}</td>
    </tr>
  `).join('')}
</table>

<div class="total">
  <div>Amount in Words: ${data.summary.amount_in_words}</div>
  <div>Total: ₹${data.summary.grand_total}</div>
</div>

<p class="note">Note: Whether tax payable under reverse charge - NO</p>

<table>
  <tr>
    <th>IGST (18%)</th>
    <th>CGST (9%)</th>
    <th>SGST (9%)</th>
    <th>Total Tax</th>
  </tr>
  <tr>
    <td>${data.summary.total_igst}</td>
    <td>${data.summary.total_cgst}</td>
    <td>${data.summary.total_sgst}</td>
    <td>${
      Number(data.summary.total_igst || 0) +
      Number(data.summary.total_cgst || 0) +
      Number(data.summary.total_sgst || 0)
    }</td>
  </tr>
</table>

<div class="footer">
  <div>
    <b>Terms & Conditions</b><br/>
    1. Goods once sold cannot be returned.<br/>
    2. Buyer responsible after delivery.<br/>
    3. Seller not liable for misuse.
  </div>

  <div style="text-align:center">
    <img src="SIGN_BASE64_HERE" width="100"/><br/>
    Authorized Signatory
  </div>
</div>

</body>
</html>
`;
