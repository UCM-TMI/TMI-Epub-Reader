$(function () {
  if (!window.FileReader || !window.ArrayBuffer) {
    $("#error_block").removeClass("hidden").addClass("show");
    return;
  }


  var $result = $("#result");
  $("#file").on("change", function(evt) {
    // remove content
   // $result.html("");
    // be sure to show the results
   // $("#result_block").removeClass("hidden").addClass("show");

    // see http://www.html5rocks.com/en/tutorials/file/dndfiles/

    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var $title = $("<h4>", {
            text : theFile.name
          });
          $result.append($title);
          var $fileContent = $("<ul>");
          try {

            var dateBefore = new Date();
            // read the content of the file with JSZip
            var zip = new JSZip(e.target.result);
            var dateAfter = new Date();

            $title.append($("<span>", {
              text:" (parsed in " + (dateAfter - dateBefore) + "ms)"
            }));

            // that, or a good ol' for(var entryName in zip.files)
            $.each(zip.files, function (index, zipEntry) {
            	
            	if(zipEntry.name.indexOf(".opf") > -1){
            		  xmlDoc = $.parseXML( zipEntry.asText() ),
            		  $xml = $( xmlDoc ),
            		  $title = $xml.find( "title" );
            		  
            		  $fileContent.append($("<li>", {
                          text : $title[0].innerHTML
                        }));
            		//alert("titulo " + $title);
            	}
            	
//              $fileContent.append($("<li>", {
//                text : zipEntry.name
//              }));
//              $fileContent.append($("<li>", {
//                text : zipEntry.asText()
//              }));
              // the content is here : zipEntry.asText()
            });
            // end of the magic !

          } catch(e) {
            $fileContent = $("<div>", {
              "class" : "alert alert-danger",
              text : "Error reading " + theFile.name + " : " + e.message
            });
          }
          $result.append($fileContent);
        }
      })(f);

      // read the file !
      // readAsArrayBuffer and readAsBinaryString both produce valid content for JSZip.
      reader.readAsArrayBuffer(f);
      // reader.readAsBinaryString(f);
    }
  });
});
