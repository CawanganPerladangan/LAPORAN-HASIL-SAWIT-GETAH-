const form = document.getElementById('dataForm');
const tableBody = document.querySelector('#dataTable tbody');
const summary = document.getElementById('summary');

let data = JSON.parse(localStorage.getItem('hasilData')) || [];

function saveData() {
  localStorage.setItem('hasilData', JSON.stringify(data));
}

function renderTable() {
  tableBody.innerHTML = '';
  let totalPendapatan = 0;

  data.forEach(item => {
    const row = document.createElement('tr');
    const pendapatan = item.kuantiti * item.harga;
    totalPendapatan += pendapatan;

    row.innerHTML = `
      <td>${item.tarikh}</td>
      <td>${item.jenis}</td>
      <td>${item.kuantiti}</td>
      <td>${item.harga.toFixed(2)}</td>
      <td>${pendapatan.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });

  summary.textContent = `Jumlah Pendapatan Bulanan: RM ${totalPendapatan.toFixed(2)}`;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const entry = {
    tarikh: document.getElementById('tarikh').value,
    jenis: document.getElementById('jenis').value,
    kuantiti: parseFloat(document.getElementById('kuantiti').value),
    harga: parseFloat(document.getElementById('harga').value)
  };

  data.push(entry);
  saveData();
  renderTable();
  form.reset();
});

function exportCSV() {
  let csv = 'Tarikh,Jenis,Kuantiti,Harga,Pendapatan\n';
  data.forEach(item => {
    const pendapatan = item.kuantiti * item.harga;
    csv += `${item.tarikh},${item.jenis},${item.kuantiti},${item.harga},${pendapatan.toFixed(2)}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'laporan_sawit_getah.csv';
  a.click();
}

renderTable();
