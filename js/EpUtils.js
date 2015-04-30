// Objetos

function Epub() {
	this.titulo = "<Titulo>";
	this.subtitulo = "<Subtitulo>";
	this.cover = "portada_no_disponible.png";
	this.archivo = "<Vacio>";
	this.opf = "<Vacio>;"
	this.coverPath = "<Vacio>;"
	this.estilos = [];
	this.imagenes = [];
	this.relativePath = "";
	this.elementos = {};
	this.ano = "Desconocido";
	this.idioma = "Desconocido";
	this.capitulo = 0;
	this.capituloActual = 0;
	this.paginaActual =0;
	this.listaCapitulos = [];
	this.elementosOrden = [];
	this.crearItem = function(padre) {
		var variable = this;
		$('<div/>', {
			title : this.titulo,
			class : "libroItem",

		}).append($("<img>", {
			src : this.cover,
			width : "120px",
			height : "170px"
		})).click(function() {
			cargarEpub(variable);
			$("#lib_cont").html($("<div></div>").append(cargarPagina(variable)))
		}).appendTo(padre);
	};
	this.cargarCover = function() {

		var zip = new JSZip(this.ruta.target.result);
		for ( var vr in zip.files) {
			var zipEntry = zip.files[vr];
			if (this.elementos[this.coverPath] != null
					&& zipEntry.name == this.relativePath
							+ this.elementos[this.coverPath].ruta) {
				this.cover = "data:image/png;base64,"
						+ encode(zipEntry.asUint8Array());
			}
		}
	};
}

function EpElemento() {
	this.tipo = "<SinTipo>";
	this.ruta = "<SinRuta>", this.prop = "<NoProp>";
	this.id = "<SinID>;"
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

function cargarFichero(f) {
	var reader = new FileReader();

	reader.onload = function(e) {
		var epub = generarEpub(e);
		if (core.listadoEpub[epub.titulo] == null) {
			epub.archivo = f;
			epub.cargarCover();
			core.listadoEpub[epub.titulo] = epub;
			epub.crearItem($("#listadoLibros"));
		}
	};

	if (f.name.indexOf(".epub") > -1)
		reader.readAsArrayBuffer(f);
}

function generarEpub(binario) {
	var epub = new Epub();
	epub.ruta = binario;
	try {
		var zip = new JSZip(binario.target.result);
		xmlDoc = $.parseXML(zip.files["META-INF/container.xml"].asText()),
		$xml = $(xmlDoc),
		$root = $xml.find("rootfile[media-type='application/oebps-package+xml']");
		epub.opf = $root.attr("full-path");
		epub.relativePath = $root.attr("full-path").replace(/[^\/]*$/, "");
		
		xmlDoc = $.parseXML(zip.files[epub.opf].asText()),
		$xml = $(xmlDoc), $title = $xml.find("title");
		epub.coverPath = $xml.find("meta[name='cover']").attr("content");

		var contadorEstilos = 0;
		var contadorImagenes = 0;
		// Se cargan todos los elementos del Epub
		$xml.find("manifest").children('item').each(
				function() {
					var elem = new EpElemento();
					elem.ruta = $(this).attr("href");
					elem.prop = $(this).attr(
							"properties");
					elem.tipo = $(this).attr(
							"media-type");
					elem.id = $(this).attr("id");
					epub.elementos[elem.id] = elem;
					
					if(elem.tipo == "text/css"){
						epub.estilos[contadorEstilos] = elem.ruta;
						contadorEstilos++;
					}
					
					if(elem.tipo == "image/jpeg"){
						epub.imagenes[contadorImagenes] = elem.ruta;
						contadorImagenes++;
					}
					
				});
	
		
		
// Se lee el orden de carga
		$xml.find("spine")
		.children('itemref')
		.each(function() {
					epub.elementosOrden[epub.elementosOrden.length] = $(
							this).attr('idref');
		});
		epub.titulo = $title[0].innerHTML;
		
	} catch (e) {
		alert(e);
	}

	return epub;

}

function cargarEpub(Epub) {
	mostrarContenidoLibro();
	var zip = new JSZip(Epub.ruta.target.result);
	var contenidoLibro ="";
	//Se carga el epub a los trancazos 
	for (var i = 0; i < Epub.elementosOrden.length; i++) {
		if(Epub.elementos[Epub.elementosOrden[i]].tipo != "application/xhtml+xml") continue;
		xmlDoc = $.parseXML(zip.files[Epub.relativePath + Epub.elementos[Epub.elementosOrden[i]].ruta].asText()),
		$xml = $(xmlDoc).find("body");
		Epub.listaCapitulos[i] = estructurarCapitulo($xml);
	}
	
	
	// Se carga el estilo para ese epub
	var estilo = $("<style></style>");
	for(var i = 0; i< Epub.estilos.length ; i++){
		estilo.append(document.createTextNode(zip.files[Epub.relativePath + Epub.estilos[i]].asText()));
	}
	$("head").append(estilo);
	core.epubActual = Epub.titulo;

}


function cargarPagina(Epub){
	contenidoLibro = Epub.listaCapitulos[Epub.capituloActual];
	
	if(Epub.paginaActual < 0){
		Epub.capituloActual--;
		contenidoLibro = Epub.listaCapitulos[Epub.capituloActual];
		Epub.paginaActual = $(contenidoLibro).children().length -1;
	}
	
	if(Epub.paginaActual >= $(contenidoLibro).children().length){
		Epub.paginaActual = 0;
		Epub.capituloActual++;
		contenidoLibro = Epub.listaCapitulos[Epub.capituloActual];
	}
	

	var zip = new JSZip(Epub.ruta.target.result);
	// Se cargan las imagenes para ese capitulo
	for(var i = 0; i< Epub.imagenes.length ; i++){
		$(contenidoLibro).find("img[src*='"+Epub.imagenes[i]+"']").attr("src","data:image;base64,"
		+ encode(zip.files[Epub.relativePath + Epub.imagenes[i]].asUint8Array())).attr("style","width:400px");
		
		$(contenidoLibro).find("image[xlink\\:href*='"+Epub.imagenes[i]+"']").attr("xlink:href","data:image;base64,"
				+ encode(zip.files[Epub.relativePath + Epub.imagenes[i]].asUint8Array())).attr("style","width:400px");

	}
	return $(contenidoLibro).children()[Epub.paginaActual].innerHTML;
}

function siguiente(){
	var epub = core.listadoEpub[core.epubActual];
	epub.paginaActual = epub.paginaActual +1;
	$("#lib_cont").html($("<div></div>").append(cargarPagina(epub)));
}

function atras(){
	var epub = core.listadoEpub[core.epubActual];
	epub.paginaActual = epub.paginaActual -1;
	$("#lib_cont").html($("<div></div>").append(cargarPagina(epub)));
}

function estructurarCapitulo(capXml){
	return capXml;
}



