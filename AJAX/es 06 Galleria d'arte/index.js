"use strict"

const URL = "http://localhost:3000"

$(function () {
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    _btnPrev.prop("disabled", true)
	let quadri;
	let _wrapperAdd = $('.wrapper').eq(1);
    // <label> <input type='radio'> artistname </label> -->
    let request = inviaRichiesta("get", URL + "/artisti");
    request.fail(errore);
    request.done(function(artisti){
        for (const artista of artisti) {
            let lbl = $("<label>");
            lbl.appendTo(_head);
            lbl.text(artista.name);
            let inp = $("<input>");
            inp.prop("type", "radio");
            inp.appendTo(lbl);
            inp.prop("artista",artista);
        }
        //$("input[type=radio]")
        let request2 = inviaRichiesta("get", URL + "/quadri");
        request2.fail(errore);
        request2.done(function(quadris){
            quadri = quadris;
            let chk = $("input[type=radio]").eq(generaNumero(0, 5));
            chk.prop("checked", true);
            let id = $("<label>");
            id.text("ID = " + chk.prop("artista").id);
            id.appendTo(_info);
            let like;
            let br = $("<br>");
            br.appendTo(_info);
            for (const quadro of quadri) {
                if(quadro["artist"] == chk.prop("artista").id)
                {
                    let Titolo = $("<label>");
                    Titolo.text("Titolo = " + quadro.title);
                    Titolo.appendTo(_info);
                    like = quadro.nLike;
                    _img.prop("src","img/" + quadro.img);
                    console.log("img/" + quadro.img);
                    break;
                }
            }
            br = $("<br>");
            br.appendTo(_info);
            let genere = $("<label>");
            genere.text("genere = " + chk.prop("artista").gender);
            genere.appendTo(_info);
            br = $("<br>");
            br.appendTo(_info);
            genere = $("<label>");
            genere.text("Like = " + like);
            genere.appendTo(_info);
            



            /*let id = $("<label>");
            id.text("ID = " + chk.val().id);*/



        })
    })


})
