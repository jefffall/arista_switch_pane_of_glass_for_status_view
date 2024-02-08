// Function to convert JSON data to HTML table

      

      function convert(jsonData) {
          console.log("In convert");
          console.log(jsonData);
         
         // Sample JSON data
         
         // Get the container element where the table will be inserted
         let container = $("#mycontainer");
          container.empty();
         
         // Create the table element
         let table = $("<table>");
         
         // Get the keys (column names) of the first object in the JSON data
         let cols = Object.keys(jsonData[0]);
         
         // Create the header element
         let thead = $("<thead>");
         let tr = $("<tr>");
         
         // Loop through the column names and create header cells
         $.each(cols, function(i, item){
            let th = $("<th>");
            th.text(item); // Set the column name as the text of the header cell
            tr.append(th); // Append the header cell to the header row
         });
         thead.append(tr); // Append the header row to the header
         table.append(tr) // Append the header to the table
         
         // Loop through the JSON data and create table rows
         $.each(jsonData, function(i, item){
         let tr = $("<tr>");
            
            // Get the values of the current object in the JSON data
            let vals = Object.values(item);
            
            // Loop through the values and create table cells
            $.each(vals, (i, elem) => {
               let td = $("<td>");
               td.text(elem); // Set the value as the text of the table cell
               tr.append(td); // Append the table cell to the table row
            });
            table.append(tr); // Append the table row to the table
         });
         container.append(table) // Append the table to the container element
      }