export function building (data) {
  const table = document.createElement('table');
  /**
     * @type {never[]}
     */
  let positionMatrix = [];
  let row;
  class cA{
    /**
       * @param {any} cellA
       * @param {any} position
       */
    constructor(cellA, position) {
      this.cellA = cellA;
      this.position = position;
    }
  }

  class cB{
    /**
     * @param {any} cellB
     * @param {any} position
     */
    constructor(cellB, position) {
      this.cellB = cellB
      this.position = position;
    }
  }
  class cC{
    /**
     * @param {any} cellC
     * @param {any} position
     */
    constructor(cellC, position) {
      this.cellC = cellC;
      this.position = position;
    }
  }

  // @ts-ignore
  document.getElementById('array').appendChild(table);

  for (const key in data) {
    // @ts-ignore
    console.log(data);
    row = table.insertRow();
    let cellA = new cA(row.insertCell(), null);
    let cellB = new cB(row.insertCell(), null);
    for (const i in data[key].cur_arr) {
      // @ts-ignore
      //positionMatrix[key][i] = data[key].cur_arr[i].position;
      // @ts-ignore
      //console.log(positionMatrix[key][i]);
      let cellC = new cC(row.insertCell(), null);
      cellC.cellC.innerHTML = data[key].cur_arr[i];
      cellC.cellC.style.textAlign = 'center';
      cellC.position = data[key].cur_arr[i].position; //?
      //console.log(cellC.position);
    }

    cellA.cellA.innerHTML = data[key].text;
    cellA.position = data[key].position;
   // console.log(cellA.position);
    cellB.cellB.style.backgroundColor = '#438440';
    cellB.cellB.style.color = 'white';
    cellB.cellB.innerHTML = data[key].type;
    cellB.position = data[key].position;
  }

  // @ts-ignore
  document.querySelector('table').onclick = (event) => {
    let cell = event.target;
    // @ts-ignore
   // console.log(cell.cellA.position);
    let i = cell.parentNode.rowIndex;
    // @ts-ignore
    let j = cell.cellIndex;

    console.log(i,j);
  }
}

