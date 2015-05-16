var core = {
	listadoRutas : {},
	listadoEpub : {},
	listadoMp3 : {},
	listadoNotas :{},
	idNotaActual : "",
	epubActual : "",
	epubBook : "",
	agregarEpub : function(f,ruta) {
		cargarFichero(f,ruta);
	},
	mostrarLibro : function(){
		mostrarContenidoLibro();
	},
	tamanoLetra : 1,
	tipoLetra : "Times New Roman",
	agregarMusica : function(f,ruta) {
		cargarAudio(f,ruta);
	}
}

