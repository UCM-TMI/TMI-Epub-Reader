$(function(){
	
	
	
	$("#option_btn").on("click", function(){
		$("#opciones").panel( "toggle" );	
	});
	
	$("#nav_btn").on("click", function(){
		$("#navegador").panel( "toggle" );	
	});
	
	$("#libros_btn").on("click", function(){
		$(".tabs").hide();
		$("#libros").toggle();	
	});
	$("#musica_btn").on("click", function(){
		$(".tabs").hide();
		$("#musica").toggle();	
	});
	$("#notas_btn").on("click", function(){
		$(".tabs").hide();
		$("#notas").toggle();	
	});
	
	
	//$("#").panel( "toggle" );
	
	
	
	
	
	
	
});