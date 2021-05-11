"use strict"

$(document).ready(function(){
	let _divFilm= $("#div_Film")
	let _divDettagli= $("#div_Dettagli")
	let _divRiproduzione= $("#div_Riproduzione")
	let _selectGeneri=$(".intestazione select")
	let _elencoFilm = $(".elencoFilm");
	let _search = $(".intestazione button");

	_divDettagli.hide();
	_divRiproduzione.hide();
	caricaListaGeneri();
	caricaFilm();
	_search.on("click", caricaFilmPerGenere)

	function caricaFilmPerGenere()
	{
		_elencoFilm.empty();
		let idGenere = $('.intestazione option:selected').val();
		console.log(idGenere);
		let request = inviaRichiesta("get","/film");
		request.fail(errore);
		request.done(function(films){
			for (const film of films) {
				if(film.genere==idGenere)
				{
				let div=$("<div>");
				div.appendTo(_elencoFilm);
				let img = $("<img>");
				img.prop("src", "img/"+film.titolo+".png");
				img.on("click", visualizzaDettagli);
				img.prop("film",film);
				img.appendTo(div);
				}
			}
		})
	}

	function caricaListaGeneri()
	{
	let request  = inviaRichiesta("get","/generi");
	request.fail(errore);
	request.done(function(generi){
		let opt= $("<option>");
		opt.html("Tutti");
		opt.val("0");
		opt.prop("selected",true);
		opt.appendTo(_selectGeneri);
		for (const genere of generi) {
			opt= $("<option>");
			opt.html(genere.nome);
			opt.val(genere.id);
			opt.appendTo(_selectGeneri);
		}
	})
	}

	function caricaFilm()
	{
		_elencoFilm.empty();
		let request  = inviaRichiesta("get","/film");
		request.fail(errore);
		request.done(function(films){
		console.log(films);
		for (const film of films) {
			let div=$("<div>");
			div.appendTo(_elencoFilm);
			let img = $("<img>");
			img.prop("src", "img/"+film.titolo+".png");
			img.on("click", visualizzaDettagli);
			img.prop("film",film);
			img.appendTo(div);
		}
		})
	}
	
	function visualizzaDettagli()
	{
	_divFilm.fadeOut();
	_divDettagli.fadeIn();
	_divDettagli.children("img").prop("src",this.src)
	_divDettagli.children(":nth-child(1)").on("click", function()
	{
		_divDettagli.fadeOut();
		_divFilm.fadeIn();
	})
	_divDettagli.children(":nth-child(3)").html(this.film.titolo);
	_divDettagli.children(":nth-child(4)").html(this.film.prezzo);
	_divDettagli.children(":nth-child(5)").html(this.film.descrizione);
	_divDettagli.children(":nth-child(6)").on("click", mostraVideo(this.film.id, this.film.nVisualizzazioni))
	_divDettagli.children(":nth-child(7)").html("visualizzazioni: "+this.film.nVisualizzazioni);
	}

	function mostraVideo(id, n)
	{
		_divRiproduzione.fadeIn();
		_divRiproduzione.children("video").prop("src", "video/video"+id+".mp4");
		let request  = inviaRichiesta("patch","/film/"+id, {nVisualizzazioni : n+1});
	}
});