var core = {
	listadoRutas : {},
	listadoEpub : {},
	agregarEpub : function(f,ruta) {
		cargarFichero(f,ruta);
	},
	mostrarLibro : function(){
		mostrarContenidoLibro();
	}
}

