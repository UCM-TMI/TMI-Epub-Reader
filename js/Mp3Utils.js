// Objetos

function MusicP3() {
	this.titulo = "<Titulo>";
	this.autor = "";
	this.tipo = "";
	this.duracion = "";
}


function cargarAudio(f) {
//	reader.onload = function() {
//		 var zip =  new JSZip(reader.result);
		 var musica = generarMP3(f);
//		 	epub.archivo = reader.result;
		if (core.listadoMP3[f.name] == null) {
//			epub.cargarCover();
			core.listadoEpub[f.name] = epub;
			//epub.crearItem($("#listadoAudios"));
//             		}
	};

	if (f.name.indexOf(".epub") > -1)
		reader.readAsBinaryString(f);
}

function generarMP3(f){
	/*var musica = new MusicP3();
	
	var ID3 = require('id3-reader/files');

	var id3_3v1 = new ID3(f);
	alert(id3_3v1.getTags());

	musica.titulo = f.name; */
	var direccion = "../" || f.webkitRelativePath || f.mozFullPath || f.name
	alert(direccion);
	var tags;
	id3({ file: f.name, type: id3.OPEN_LOCAL }, function(err, tags) {
        // tags now contains your ID3 tags
    });
	alert(tags.artist + " - " + tags.title + ", " + tags.album);
}