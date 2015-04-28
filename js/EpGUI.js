$(function(){

	
	$("#option_btn").on("click", function(){
		$("#opciones").panel( "toggle" );	
	});
	
	$("#nav_btn").on("click", function(){
		$("#navegador").panel( "toggle" );	
	});


	
	$("#libros_btn").on("click", function(){
		if(mostrandoContenido){
			$(".tabs").hide();
			$("#libro_contenido").toggle();
		}else{
			$(".tabs").hide();
			$("#libros").toggle();	
		}
		
		
	});
	$("#musica_btn").on("click", function(){

		if(mostrandoMusica){
			$(".tabs").hide();
		//	$("#libro_contenido").toggle();
		}else{
			$(".tabs").hide();
		//	$("#libros").toggle();	
		}
		$(".tabs").hide();
		$("#musica").toggle();	
	});

	$("#notas_btn").on("click", function(){
		$(".tabs").hide();
		$("#notas").toggle();	
	});
	
	 $("#file").on("change", function(evt) {
		   var files = evt.target.files;
		    for (var i = 0, f; f = files[i]; i++) {
		    	core.agregarEpub(f);
		    }
	 });
	//$("#").panel( "toggle" );

	$(".botonAt").on("click", function(){
		$(".tabs").hide();
		$(this).hide();
		$("#libro_contenido").hide();
		$("#libros").show();
	});
	
	$("#lib_cont_btn_prev").on("click", function(){
		atras();
	});
	$("#lib_cont_btn_next").on("click", function(){
		siguiente();
	});
});



var mostrandoContenido = false;
var mostrandoMusica = false;

function mostrarContenidoLibro(){
	mostrandoContenido = true;
	$(".tabs").hide();
	$(".botonAt").show();
	$("#libro_contenido").toggle();
	 
}
