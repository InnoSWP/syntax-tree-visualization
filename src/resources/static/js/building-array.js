export function building(data) {
  const table = document.createElement('table');
  let row, cellA, cellB, cellC;
  document.getElementById('array').appendChild(table);
  for (const key in data) {
    row = table.insertRow();
    cellA = row.insertCell();
    cellB = row.insertCell();
    for (const i in data[key].cur_arr) {
      cellC = row.insertCell();
      cellC.innerHTML = data[key].cur_arr[i];
      cellC.style.textAlign = 'center';
    }

    cellA.innerHTML = data[key].text;
    cellB.style.backgroundColor = '#438440';
    cellB.style.color = 'white';
    cellB.innerHTML = data[key].type;
  }
};
