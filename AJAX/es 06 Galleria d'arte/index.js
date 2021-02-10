"option strict"

const URL = "http://localhost:3000"

$(function () {
    let _head = $('.head');
    let _info = $('.info');
    let _img = $('.img');
    let _btnPrev = $('button').eq(0);
    let _btnNext = $('button').eq(1);
    _btnPrev.prop("disabled", true)
	
	let _wrapperAdd = $('.wrapper').eq(1);
    let request = inviaRichiesta("get", URL+"/artisti");
    request.fail(errore);
    request.done(function(artisti)
    {
        // 0. Realizzare una applicazione di tipo single page basata su jQuery e Ajax
        //che presenti all’avvio un insieme di Option Button contenenti l’elenco degli artisti memorizzati nel DB.

        for (const artista of artisti) {
        let _lbl= $("<label>");
        _lbl.appendTo(_head);
        let _radio = $("<input type='radio'>");
        //_radio.prop("type","radio");
        _radio.appendTo(_lbl);

        //Setto a tutti i radio lo stesso nome affinchè siano esclusvi
        _radio.prop("name","artista");
        _radio.prop("artista",artista); //UTLE
        //Se uso altri metodi sovrascrive e fa cose brutte
        _lbl.append(artista.name); //Soluzione OKAY
        //_lbl.html(_lbl.html()+artista.name); --> Altra soluzione OKAY MA NON USARE per evitare errori sul prop
        //Quando imposto le prop a radio, vado a metterle il prima possibile x evitare rischi e le inserisco tutte insieme
        }

        //1. All’avvio viene selezionato casualmente uno degli artisti e vengono visualizzate nella parte inferiore tutte le
        //informazioni relative al primo quadro di quell’artista (come indicato in figura)
        //Suggerimento: memorizzare lato client l’intero elenco di tutti i quadri di quell’artista

        //let n = generaNumero(0,artisti.length-1)

        //Gli pseudoselettori passati al $ NON hanno spazi intermedi
        $("input[type='radio']").eq(0).prop("checked",true);
        let _idArtista = $("input[type='radio']").eq(0).prop("artista").id;
        let request2 = inviaRichiesta("get", URL+"/quadri?artist="+_idArtista);
        request2.fail(errore);
        request2.done(function(quadri){
            visualizzaQuadro($("input[type='radio']").eq(0).prop("artista").gender,quadri[0])
        })
    })

    _head.on("click", "input", function()
    {
        let idChk= $this.prop("artista").id;
    })
    function visualizzaQuadro(genere, quadro)
    {
        _info.html="";
        $("<p>").text("ID: " + quadro.id).appendTo(_info);
        $("<p>").html("Titolo: " + quadro.title).appendTo(_info);
        //$("<p>").text("Artista: " + ).appendTo(_info);
    }
    function nviaRichiestaQuadri(idArtista){
        
    }
})
