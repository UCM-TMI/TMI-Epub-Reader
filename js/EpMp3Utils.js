// Objetos

function Epub() {
	this.titulo = "<Titulo>";
	this.subtitulo = "<Subtitulo>";
	this.cover = "portada_no_disponible.png";
	this.archivo = "<Vacio>";
	this.opf = "<Vacio>;"
	this.coverPath = "<Vacio>;"
	this.relativePath = "";
	this.elementos = {};
	this.ano = "Desconocido";
	this.idioma = "Desconocido";
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
			cargarEpub(variable)
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
		$
				.each(
						zip.files,
						function(index, zipEntry) {
							// Se lee la cabezera del
							if (zipEntry.name == "META-INF/container.xml") {
										xmlDoc = $.parseXML(zipEntry.asText()),
										$xml = $(xmlDoc),
										$root = $xml
												.find("rootfile[media-type='application/oebps-package+xml']");
								epub.opf = $root.attr("full-path");
								epub.relativePath = $root.attr("full-path")
										.replace(/[^\/]*$/, "");
							}
							// Cargamos el contenido del opf
							if (zipEntry.name.indexOf(epub.opf) > -1) {
								xmlDoc = $.parseXML(zipEntry.asText()),
										$xml = $(xmlDoc), $title = $xml
												.find("title");
								epub.coverPath = $xml
										.find("meta[name='cover']").attr(
												"content");

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
										});

								// Se lee el orden de carga
								$xml
										.find("spine")
										.children('itemref')
										.each(
												function() {
													epub.elementosOrden[epub.elementosOrden.length] = $(
															this).attr('idref');
												});

								// Se lee el titulo y subtitulo
								epub.titulo = $title[0].innerHTML;
								if ($title[1]) {
									epub.subtitulo = $title[1].innerHTML;
								}
							}
						});

	} catch (e) {
		alert(e);
	}

	return epub;

}

function cargarEpub(Epub) {
	mostrarContenidoLibro();
	var zip = new JSZip(Epub.ruta.target.result);
	for (var i = 0; i < Epub.elementosOrden.length; i++) {
		alert(Epub.elementos[Epub.elementosOrden[i]].id);
	}

}

