// Objetos

function Epub () {
    this.titulo = "<Titulo>";
    this.cover = "portada_no_disponible.png";
    this.ruta = "<ruta>";
    this.crearItem = function(padre){
    	$('<div/>', {
    	    title: this.titulo,
    	    class: "libroItem",
    	   
    	})
    	  .append($("<img>",{
		  	src : this.cover,
		  	width: "120px",
		  	height: "170px"
		  })).click(function(){alert(this.titulo);})
		  .appendTo(padre);
    };
  
}


// Funciones
function encode(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	while (i < input.length) {
		chr1 = input[i++];
		chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the
															// index
		chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed
															// here

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output += keyStr.charAt(enc1) + keyStr.charAt(enc2)
				+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
	}
	return output;
}