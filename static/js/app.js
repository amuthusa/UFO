function buildTable(data) {
    //clear the existing data from the table
    tbody.html("");
    //loop thru each object in the data
    //and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        //append a row to the table body
        let row = tbody.append("tr");
        //loop thru values from each object and add
        // each value to a cell in the row
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
};

function handleClick() {
    //get teh datetime value from filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    //check if datetime value is entered, if so use it to filter the data
    // whose dateTime matches the filtered date time entered
    if (date) {
        filteredData = filteredData.filter(row => row.dateTime === date);
    }
    //rebuild table usig the filtered data
    //if no dateTime was entered the original data is retained
    buildTable(filteredData);
};