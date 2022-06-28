export function building(data) {
    let table = document.createElement("table"), row, cellA, cellB, cellC;
    document.getElementById("array").appendChild(table);
    for (let key in data) {
        row = table.insertRow();
        cellA = row.insertCell();
        cellB = row.insertCell();
        for (let i in data[key].cur_arr) {
            cellC = row.insertCell();
            cellC.innerHTML = data[key].cur_arr[i];
        }

        cellA.innerHTML = data[key].text;
        cellB.style.backgroundColor = "#438440";
        cellB.style.color = "white";
        cellB.innerHTML = data[key].type;
    }
};
