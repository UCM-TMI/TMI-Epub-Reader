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

	$("#musicas").on("change", function(evt) {
	   var files = evt.target.files;
	    for (var i = 0, f; f = files[i]; i++) {
	    	core.agregarMusica(f);
	    }
	});
	

	//$("#").panel( "toggle" );

	$(".botonAt").on("click", function(){
		$(".tabs").hide();
		$(this).hide();
		$("#libro_contenido").hide();
		$("#libros").show();
	})
	
	 $("#prev").on('click',function(){
		 core.epubBook.prevPage();
		 setTimeout(function(){$($(window.frames[0].document).find("html")).css( "font-size",core.tamanoLetra +"em")},20);
		 setTimeout(function(){$($(window.frames[0].document).find("html")).css( "font-family",core.tipoLetra )},20);
	 });

     $("#next").on('click',function(){
    	 core.epubBook.nextPage();
    	 setTimeout(function(){$($(window.frames[0].document).find("html")).css( "font-size",core.tamanoLetra +"em")},20);
    	 setTimeout(function(){$($(window.frames[0].document).find("html")).css( "font-family",core.tipoLetra )},20);
     });
     
     // Slider Epub
     
     $('#slider-fill').slider({ mini: true });
     
     $( "#slider-fill" ).bind( "change", function(event, ui) {
    	 $($(window.frames[0].document).find("html")).css( "font-size",$(this).val() +"em");
    	 core.tamanoLetra = $(this).val();
     });
     
     $( "#tipo-letra" ).bind( "change", function(event, ui) {
    	 $($(window.frames[0].document).find("html")).css( "font-family",$(this).val());
    	 core.tipoLetra = $(this).val();
     });
   
   	$("#musicas").on("change", function(evt) {
	   var files = evt.target.files;
	    for (var i = 0, f; f = files[i]; i++) {
	    	core.agregarMusica(f);
	    }
	});
	
});



var mostrandoContenido = false;
var mostrandoMusica = false;

function mostrarContenidoLibro(){
	mostrandoContenido = true;
	$("#area").empty();
	$(".tabs").hide();
	$(".botonAt").show();
	$("#libro_contenido").toggle();
	 
}
