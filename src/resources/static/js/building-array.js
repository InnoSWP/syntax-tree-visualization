export function building (data) {
  const table = document.createElement('table');
  let row, cellA, cellB, cellC;
  class cA{
    /**
       * @param {any} cellA
       * @param {any} position
       */
    constructor(cellA, position) {
      this.cellA = cellA;
      this.position = position;
    }
  };

  class cB{
    /**
     * @param {any} cellB
     * @param {any} position
     */
    constructor(cellB, position) {
      this.cellB = cellB
      this.position = position;
    }
  };
  class cC{
    /**
     * @param {any} cellC
     * @param {any} position
     */
    constructor(cellC, position) {
      this.cellC = cellC;
      this.position = position;
    }
  };

  // @ts-ignore
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

  // @ts-ignore
  document.querySelector('table').onclick = (event) => {
    let cell = event.target;
    // @ts-ignore
    console.log(cell.innerText);
  }
}

