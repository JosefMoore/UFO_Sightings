// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var all_filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let elementChanged = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let valueChanged = elementChanged.property('value');
    // 4c. Save the id of the filter that was changed as a variable.
    let idChanged = elementChanged.attr('id');
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (valueChanged) {
      all_filters[idChanged] = valueChanged
    } else {
      delete all_filters[idChanged]
    };
      
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(all_filters).forEach(function([filterID, tableRow]) {
      console.log(filterID, tableRow)
      if (filterID === 'datetime'){
        filteredData = filteredData.filter(row => row.datetime === tableRow)
      }
      else if (filterID === 'city'){
        filteredData = filteredData.filter(row => row.city === tableRow)
      }
      else if (filterID === 'country'){
        filteredData = filteredData.filter(row => row.country === tableRow)
      }
      else if (filterID === 'state'){
        filteredData = filteredData.filter(row => row.state === tableRow)
      }
      else if (filterID === 'shape'){
        filteredData = filteredData.filter(row => row.shape === tableRow)
      }
    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  };
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll('input').on('change', updateFilters)
  
  // Build the table when the page loads
  buildTable(tableData);
