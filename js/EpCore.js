var core = {
	listadoRutas : {},
	listadoEpub : {},
	listadoMp3 : {},
	epubActual : "",
	agregarEpub : function(f,ruta) {
		cargarFichero(f,ruta);
	},
	mostrarLibro : function(){
		mostrarContenidoLibro();
	}
}

