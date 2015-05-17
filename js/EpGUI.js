$(function() {

	$("#option_btn").on("click", function() {
		$("#opciones").panel("toggle");
	});

	$("#nav_btn").on("click", function() {
		$("#navegador").panel("toggle");
	});

	$("#libros_btn").on("click", function() {
		if (mostrandoContenido) {
			$(".tabs").hide();
			$("#libro_contenido").toggle();
		} else {
			$(".tabs").hide();
			$("#libros").toggle();
		}

	});

	$("#musica_btn").on("click", function() {

		if (mostrandoMusica) {
			$(".tabs").hide();
			// $("#libro_contenido").toggle();
		} else {
			$(".tabs").hide();
			// $("#libros").toggle();
		}
		$(".tabs").hide();
		$("#musica").toggle();
	});

	$("#notas_btn").on("click", function() {
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

	// $("#").panel( "toggle" );

	$(".botonAt").on("click", function() {
		$(".tabs").hide();
		$(this).hide();
		$("#libro_contenido").hide();
		$("#libros").show();
	})

	$("#prev").on(
			'click',
			function() {
				core.epubBook.prevPage();
				setTimeout(function() {
					$($(window.frames[0].document).find("html")).css(
							"font-size", core.tamanoLetra + "em")
				}, 20);
				setTimeout(function() {
					$($(window.frames[0].document).find("html")).css(
							"font-family", core.tipoLetra)
				}, 20);
				$.each(core.listadoEpub[core.epubActual].notas, function(i, val) {
					var clave = i;
					var valor = val;
					var color = core.listadoEpub[core.epubActual].notaColor[clave];
					$("#epubjs-iframe").contents().find(":contains('"+clave+"')").html(function(i, v) {
						var reg =  new RegExp(clave,"g");
				        return v.replace(reg,"<span style='background-color:#"+color+"' title='"+valor+"' >"+clave+"</span>");    
					});
					
				});
				
				
			});

	$("#next").on(
			'click',
			function() {
				core.epubBook.nextPage();
				setTimeout(function() {
					$($(window.frames[0].document).find("html")).css(
							"font-size", core.tamanoLetra + "em")
				}, 20);
				setTimeout(function() {
					$($(window.frames[0].document).find("html")).css(
							"font-family", core.tipoLetra)
				}, 20);
				
				$.each(core.listadoEpub[core.epubActual].notas, function(i, val) {
					var clave = i;
					var valor = val;
					var color = core.listadoEpub[core.epubActual].notaColor[clave];
					$("#epubjs-iframe").contents().find(":contains('"+clave+"')").html(function(i, v) {
						var reg =  new RegExp(clave,"g");
				        return v.replace(reg,"<span style='background-color:#"+color+"' title='"+valor+"' >"+clave+"</span>");    
					});
					
				});
				
				
			});

	// Slider Epub

	$('#slider-fill').slider({
		mini : true
	});

	$("#slider-fill").bind(
			"change",
			function(event, ui) {
				$($(window.frames[0].document).find("html")).css("font-size",
						$(this).val() + "em");
				core.tamanoLetra = $(this).val();
			});

	$("#tipo-letra").bind(
			"change",
			function(event, ui) {
				$($(window.frames[0].document).find("html")).css("font-family",
						$(this).val());
				core.tipoLetra = $(this).val();
			});

	$("#musicas").on("change", function(evt) {
		var files = evt.target.files;
		for (var i = 0, f; f = files[i]; i++) {
			core.agregarMusica(f);
		}
	});
	
	$("#idNotaCrear").on("click", agregarNota);
	
	$("#idNotaCancelar").on("click", descartarNota);

	$("#idNota").on("click", function() {

		var iframe = document.getElementById("epubjs-iframe");
		if (iframe != null) {

			var texto = getIframeSelectionText(iframe);

			if (texto != "") {
				$("#notaText").show();
				$("#idNotaCrear").show();
				$("#idNotaCancelar").show();
				core.idNotaActual = texto;
			} else {
				$('#notaMsg').flash_message({
					text : 'Debe seleccionar algo del documento',
					how : 'append'
				});
			}
		}else{
			$('#notaMsg').flash_message({
				text : 'Debe elegir un libro primero',
				how : 'append'
			});
		}
	});

});

var mostrandoContenido = false;
var mostrandoMusica = false;

function getIframeSelectionText(iframe) {
	var win = iframe.contentWindow;
	var doc = iframe.contentDocument || win.document;

	if (win.getSelection) {
		return win.getSelection().toString();
	} else if (doc.selection && doc.selection.createRange) {
		return doc.selection.createRange().text;
	}
};

function getSelectionText() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	return text;
};

function mostrarContenidoLibro() {
	mostrandoContenido = true;
	$("#area").empty();
	$(".tabs").hide();
	$(".botonAt").show();
	$("#libro_contenido").toggle();

};

(function($) {
	$.fn.flash_message = function(options) {

		options = $.extend({
			text : 'Done',
			time : 1000,
			how : 'before',
			class_name : ''
		}, options);

		return $(this).each(function() {
			if ($(this).parent().find('.flash_message').get(0))
				return;

			var message = $('<span />', {
				'class' : 'flash_message ' + options.class_name,
				text : options.text
			}).hide().fadeIn('fast');

			$(this)[options.how](message);

			message.delay(options.time).fadeOut('normal', function() {
				$(this).remove();
			});

		});
	};
})(jQuery);
