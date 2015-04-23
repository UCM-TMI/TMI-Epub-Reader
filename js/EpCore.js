var core = {
	listadoRutas : {},
	listadoEpub : {},
	listadoMp3 : {},
	agregarEpub : function(f,ruta) {
		cargarFichero(f,ruta);
	},
	mostrarLibro : function(){
		mostrarContenidoLibro();
	}
}

