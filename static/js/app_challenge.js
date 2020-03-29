function buildTable(data) {
    var tbody = d3.select("tbody");
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
}
/*
* function to hndle on click event from filter-btn (button)
*
*/
function handleClick() {
    //get the datetime value from filter
    let date = d3.select("#datetime").property("value");
    let city = d3.select("#city").property("value");
    let state = d3.select("#state").property("value");
    let country = d3.select("#country").property("value");
    let shape = d3.select("#shape").property("value");
    let filteredData = tableData;
    //check if datetime or city or state or country or shape value is entered, 
    // if so use it to filter the data whose values matches the data entered
    if (date || city || state || country || shape) {
        filteredData = filteredData.filter(row => (!date || row.datetime === date) && 
                                                  (!city || row.city === city) &&
                                                  (!state || row.state === state) &&
                                                  (!country || row.country === country) &&
                                                  (!shape || row.shape === shape));
    }
    //rebuild table usig the filtered data
    //if no dateTime was entered the original data is retained
    buildTable(filteredData);
}

function handleOnChange(d, index, nodes) {
    updateFilters(d, index, nodes);
    filterTable();
}

var filters = {};
/**
 * function to get the current changed filter and update it
 * @param {*} d 
 * @param {*} index 
 * @param {*} nodes 
 */
function updateFilters(d, index, nodes) {
    //get the node which generated the event
    let node = nodes[index];
    //get the value and id of the node from where the event is generated
    let value = node.value;
    let id = node.id;
    if (filters[id]) {
        if (value) {
            filters[id] = value;
        } else {
            delete filters[id];
        }
    } else if (value) {
        filters[id] = value;
    }
}

function filterTable() {
    //set the filtered data to table data to reset before filtering
    let filteredData = data;
    //get all the fields whih has changed and needs to be used for filtering
    let filterFields = Object.keys(filters);
    //loop through all the fields which changed and using the value entered filter the data
    //if multiple fields has value it would be behaving like and condition.
    filterFields.forEach(filterField => filteredData = filteredData.filter(row => row[filterField] === filters[filterField]));

    //rebuild table using the filtered data
    buildTable(filteredData);
}

function reloadTable() {
    cleanupFilters();
    //reset the table with original data
    tableData = data;
    //rebuild table using the data
    buildTable(tableData);
}

function cleanupFilters() {
    let filterFields = Object.keys(filters);
    //reset the filter field if it has value
    filterFields.forEach(filterField => d3.select("#"+filterField).property("value", ""));
    //reset the filters
    filters = {};

}
//add a listener for all text fields on change
d3.selectAll("input[type=text").on("change", handleOnChange);

//add a listener for reloading the data table
d3.select("#reload-btn").on("click", reloadTable);

var tableData = data;
//build the table once the page loads
buildTable(tableData);