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

	
});

var mostrandoContenido = false;

function mostrarContenidoLibro(){
	mostrandoContenido = true;
	$(".tabs").hide();
	$("#libro_contenido").toggle();
	 
}
