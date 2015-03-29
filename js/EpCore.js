var core = {
	listadoRutas: {},
	listadoEpub:{},
	agregarEpub: function(f) {
		cargarFichero(f);		
	}
}

function cargarFichero(f){
	var reader = new FileReader();
	
	reader.onload = function(e) {
		var epub = generarEpub(e);
		if(core.listadoEpub[epub.titulo] == null){
			core.listadoEpub[epub.titulo] = epub;
			epub.crearItem($("#listadoLibros"));
		}
	};
	
	reader.readAsArrayBuffer(f);
}


function generarEpub(binario) {
	var epub = new Epub();
	epub.ruta = binario;
	try {
		var zip = new JSZip(binario.target.result);
		$.each(zip.files, function(index, zipEntry) {

			if (zipEntry.name.indexOf(".opf") > -1) {
				xmlDoc = $.parseXML(zipEntry.asText()), $xml = $(xmlDoc),
			$title = $xml.find("title");
				epub.titulo = $title[0].innerHTML;
			}
			if (zipEntry.name.indexOf("cover.jpg") > -1) {
				epub.cover = "data:image/png;base64,"
						+ encode(zipEntry.asUint8Array());
			}
		});

	} catch (e) {
		alert(e);
	}

	return epub;

}