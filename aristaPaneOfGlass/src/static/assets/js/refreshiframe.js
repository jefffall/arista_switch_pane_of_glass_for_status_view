 window.onload = setupRefresh;
 
      function setupRefresh() {
          setInterval("refreshFrame();", 10000);
      }
      function refreshFrame() {
          try
              {
         parent.Frame1.location.reload();
              }
          catch
              {}
      }