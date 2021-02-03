"use strict"

const URL = "http://localhost:3000"

$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table= $("table")
	let _dettagli=$(".row").eq(2).children("div").eq(1)
  
    _dettagli.hide()
    let request = inviaRichiesta("get", URL+"/marche");     //No parametri nella GET
    request.fail(errore);
    request.done(function(marche){
    //Marche = data -> Marche è un vettore enumerativo di json
    for (const marca of marche) {
        let opt = $("<option>");
        opt.val(marca.id);
        opt.text(marca.nome);
        opt.appendTo(_lstMarche);
        }
        _lstMarche.prop("selectedIndex", -1);
    })

 //SOLO nele ListBox da il value della voce selezionata
_lstMarche.on("change", function(){
    _lstModelli.html("");
    let codMarca=_lstMarche.val();
    let request = inviaRichiesta("get", URL+"/modelli?codMarca="+codMarca)
    request.fail(errore);
    request.done(function(modelli){
    //Marche = data -> Marche è un vettore enumerativo di json
    for (const modello of modelli) {
        let opt = $("<option>");
        opt.val(modello.id);
        opt.text(modello.nome+ " "+ modello.alimentazione);
        opt.appendTo(_lstModelli);
        }
        _lstModelli.prop("selectedIndex", -1); //Per voce vuota all'inizio
        })
    })

    _lstModelli.on("change",function(){
    let codModello=_lstModelli.val();
    let request = inviaRichiesta("get", URL+"/modelli?codMarca="+codModello)
    request.fail(errore);
    request.done(function(automobili)
    {
        let thead= $("<thead>");
        thead.appendTo(_table);
        let tr= $("<tr>");
        tr.appendTo(thead);
        for(let i =0; i< intestazione.length; i++)
        {
            let th = $(`<$(intestazione[i].tag)>`);
        }
    })
    });
});


