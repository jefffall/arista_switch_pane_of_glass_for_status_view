(function($) {
    
    var selected_item = null;
    
    $('.dropdown .dropdown-menu .dropdown-item').on("click",function(){
        
    selected_item = $(this).text();
        
  
   //console.log("name of selected item: " + $(this).text());
})
    
    $('.dropdown').on("click",function(){
        
        var name_of_dropdown = $(this).attr('id');
        
         //console.log("name of dropdown: " +  $(this).attr('id') );

   //console.log($(this).text());
       //console.log($(this).find('option:selected').text());
        //console.log(node.text());
      if (selected_item != null) {
              console.log("Name of Dropdown: " + name_of_dropdown + "Item Selected: " + selected_item);
          
          $.ajax({
			type: 'POST',
			url: "config_dropdown_value",
			data: JSON.stringify(name_of_dropdown + ":" + selected_item),
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		});
          
          
          
          
          
          
          
              selected_item = null;
          
          setTimeout(function(){ 
              //window.location = window.location;
              //location.reload(true);
              
               $.ajax({
        url: window.location.href,
        headers: {
            "Pragma": "no-cache",
            "Expires": -1,
            "Cache-Control": "no-cache"
        }
    }).done(function () {
        window.location.reload(true);
    });
              
              
              
              
              
              
               }, 100);
          
           //location.reload(true);
         }   
        
        
        })
     
 
    
})(jQuery);
 