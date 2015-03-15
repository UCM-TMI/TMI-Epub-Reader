$(function () {
  if (!window.FileReader || !window.ArrayBuffer) {
    $("#error_block").removeClass("hidden").addClass("show");
    return;
  }

 function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}
	var imagenes = 0;

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
            	if(zipEntry.name.indexOf("cover.jpg") > -1){
            		imagenes = imagenes +1;

            			// var blob = new Blob(zipEntry.asBinary(), {type: 'application/octet-binary'});
            			// var url = URL.createObjectURL(blob);
            		  $fileContent.append($("<img>",{
            		  	src : 'data:image/png;base64,'+encode(zipEntry.asUint8Array())
            		  }));
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
          alert(imagenes);
        }
      })(f);

      // read the file !
      // readAsArrayBuffer and readAsBinaryString both produce valid content for JSZip.
      reader.readAsArrayBuffer(f);
      // reader.readAsBinaryString(f);
    }
  });
});
