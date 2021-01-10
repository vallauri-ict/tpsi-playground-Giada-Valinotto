"use strict"
/*Variabile globale per salvarmi DATA, che è una variabile fondamentale*/

$(document).ready(function(){
    /*Si cerca sempre di lavorare all'interno del dcument ready*/
    let _elencoArticoli =$("#elencoArticoli");
    let _divFotocamera;
    let _imgFotocamera;
    let _divNomeFotocamera;
    let _articoli=$(articoli);
    let _dettagli=$(".details");
    let _btnCarrello=$("#btnCarrello");
    let _carrello=$("#carrello");
    let _table=$("table");
    let carrelloChiuso = 0;

    for (let i=0; i<_articoli.length;i++)
    {
        _divFotocamera=$("<div>");
        _divFotocamera.id="article-"+i;
        _divFotocamera.addClass("article");
        _divFotocamera.appendTo(_elencoArticoli);

        _imgFotocamera=$("<img>");
        _imgFotocamera.prop("src", "img/"+_articoli[i].src+".jpg");
        _imgFotocamera.addClass("image");
        _imgFotocamera.prop("title", "Aggiungi al carrello");
        _imgFotocamera.appendTo(_divFotocamera);

        _divNomeFotocamera=$("<div>");
        _divNomeFotocamera.addClass("name");
        _divNomeFotocamera.appendTo(_divFotocamera);
    }
/*Uso i delegated events per definire l'evento sul wrapper ma delegarlo a img, che non esiste ancora*/
    /*ma in questo caso non è un problema*/
    _elencoArticoli.on("mouseenter ","img", function () {

        /*$(this) se usato qui dentro, si riferisce all'oggetto che ha scatenato l'evento
        * ma, se viene richiamata una sottofunzione non funziona più
        * Vale solo nella function direttamente associata all'evento
        * Se mi serve, passo $(this) COME PARAMETRO*/

        /*.index restituisce l'indice del parametro all'interno della collezione*/
        /*$(this).next().html()*/
            /*.next concede di accedere al fratello immediatamente successivo al corrente ($(this)), indipendentemente dal tipo di tag e qualsiasi altra cosa.
            Basta trovarsi nello stesso nodo all'interno dell'albero. */
        let pos=$("img").index($(this)); /*Trovare la posizione dell'immagine cliccata*/
        /*eq(pos) è la versione jQuery di [pos] per le collezioni*/
        let _nome=$(".name").eq(pos);
        _nome.html(articoli[pos].nome);
    });
    _elencoArticoli.on("mouseleave", "img", function () {
        let pos=$("img").index($(this)); /*Trovare la posizione dell'immagine cliccata*/
        let _nome=$(".name").eq(pos);
        _nome.html(" ");
    });
    _dettagli.hide();

    /*Il secondo parametro dei delegated events è sempre un selettore css, una stringa semplice*/
    _elencoArticoli.on("click", "div.article",function () { //Se l'evento è associato ad _elencoArticoli
        let pos=$(".article").index($(this)); //Qui mi serve _elencoArticoli
        /*Soluzione più semplice:
        * sfrutto l'id che mi fornisce la posizione
        * let pos = $(this).prop("id").split("-")[1]; */
        _dettagli.slideDown(1000);
        _dettagli.html(" ");
        _dettagli.css("display","block");

        let _dettagliClose=$("<div>");
        _dettagliClose.addClass("detail-close");
        _dettagliClose.appendTo(_dettagli);

        let _spanDettagliClose=$("<span>");
        _spanDettagliClose.html("X");
        _spanDettagliClose.on("click", function () {
            _dettagli.slideUp(1000);
        })
        _spanDettagliClose.appendTo(_dettagliClose);

        let _dettagliImg=$("<div>");
        _dettagliImg.addClass("detail-img");
        _dettagliImg.appendTo(_dettagli);
        let _imgDettagliImg=$("<img>");
        _imgDettagliImg.prop("src","img/"+articoli[pos].src+".jpg");
        _imgDettagliImg.appendTo(_dettagliImg);

        let _dettagliInfo=$("<div>");
        _dettagliInfo.addClass("detail-info");
        _dettagliInfo.appendTo(_dettagli);
        let _h4=$("<h4>");
        _h4.addClass("item-title");
        _h4.html(articoli[pos].nome);
        _h4.appendTo(_dettagliInfo);
        let _p1=$("<p>");
        _p1.html(articoli[pos].descrizione);
        _p1.appendTo(_dettagliInfo);
        let _p2=$("<p>");
        _p2.html("$" + articoli[pos].prezzo);
        _p2.appendTo(_dettagliInfo);
        let _button=$("<button>");
        _button.addClass("item-add");
        _button.html("Aggiungi al carrello");
        _button.appendTo(_dettagliInfo);
    });

    _btnCarrello.on("click", function () {
        _carrello.slideToggle(1000);
        if(carrelloChiuso == 0)
        {
            carrelloChiuso = 1;
            _btnCarrello.html("&#708 Chiudi carrello");
        }
        else
        {
            carrelloChiuso=0;
            _btnCarrello.html("&#709 Apri Carrello");
        }
    })
_dettagli.on("click", "button", function () {
    /*this ora sarebbe il button Aggiungi al Carrello che ho cliccato*/
    /*$(this) è sempre l'elemento di partenza*/
    let _tr=$("<tr>");
    _tr.appendTo(_table);

    let _tdNome= $("<td>");
    _tdNome.html($(".item-title").html());
    _tdNome.appendTo(_tr);

    let _tdPrezzo= $("<td>");
    _tdPrezzo.html(($("p")).eq(1).html());
    _tdPrezzo.appendTo(_tr);

    let _tdQuantita= $("<td>");
    _tdQuantita.html("1");
    _tdQuantita.appendTo(_tr);

    let _tdImg=$("<td>");
    let _img = $("<img>");
    _img.prop("src","img/_cestino.png");
    _img.appendTo(_tdImg);
    _tdImg.appendTo(_tr);
    /*.remove() elimina l'elemento corrente dal DOM*/
})
})

