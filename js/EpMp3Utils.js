// Objetos

function MusicP3() {
	this.titulo = "<Titulo>";
	this.
	this.crearItem = function(padre) {
		var variable = this;
		$('<div/>', {
			title : this.titulo,
			class : "libroItem",

		}).append($("<img>", {
			src : this.cover,
			width : "120px",
			height : "170px"
		})).click(function() {
			cargarEpub(variable)
		}).appendTo(padre);
	};
	this.cargarCover = function() {

		var zip = new JSZip(this.ruta.target.result);
		for ( var vr in zip.files) {
			var zipEntry = zip.files[vr];
			if (this.elementos[this.coverPath] != null
					&& zipEntry.name == this.relativePath
							+ this.elementos[this.coverPath].ruta) {
				this.cover = "data:image/png;base64,"
						+ encode(zipEntry.asUint8Array());
			}
		}
	};
}


