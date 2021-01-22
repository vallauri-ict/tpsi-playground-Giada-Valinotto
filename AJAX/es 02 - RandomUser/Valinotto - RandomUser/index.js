"use strict"

/*Dichiarazione dei puntatori ai selettori jQuery associati ai vari elementi della pagina*/
let _btnGenera, _sliderProfili, _profileNumber, _rdoGender, _chkNation, _persone, _informazioneDaVisualizzare, _frecciaDestra, _frecciaSinistra, _profiloVisualizzato, _li, i=0, max;

$(document).ready(function(){

    /*I selettori jQuery $() ricevono come parametro una stringa costituita da un generico selettore CSS,
    * ricerca tutti gli elementi della pagina che soddisfano le condizioni del selettore e restituisce
    * un vettore enumerativo di puntatori JS relativi agli oggetti/all'oggetto individuati/o*/
    _btnGenera=$("#btnGenera");
    _sliderProfili=$("#sliderProfili");
    _profileNumber=$("#profileNumber");
    _rdoGender=$("#divSelettori1 input");
    _chkNation=$("#divSelettori2 input");
    _frecciaDestra=$("#frecciaDestra");
    _frecciaSinistra=$("#frecciaSinistra");
    _profiloVisualizzato =$("#profiloVisualizzato");
    _li=$("li");
    /*Gestione degli eventi mediante forma esplicita*/
    _btnGenera.on("click",generaRichiesta); /*Button Generate*/
    _sliderProfili.on("input", modificaNumeroProfili);  /*Cambiamento valore slider*/
})


/********** Chiamata AJAX *********/
/* Il metodo statico $.ajax() rappresenta un semplice ed ottimo wrapper dell‟oggetto JS
* XMLHttpRequest per l'invio di una richiesta ajax ad un server. */
function inviaRichiesta(url) {
    return $.ajax({
        type: "GET",
        url: url,
        data: "",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        dataType: "text",
        timeout: 5000,
        proxy : "https://randomuser.me"
    });
}

/********** FUNZIONI **********/

function modificaNumeroProfili()
{
    _profileNumber.html(sliderProfili.value);
}

function generaRichiesta(){
    /*Creazione di una stringa nella quale "costruisco" l'url della richiesta, andando a filtrare i parametri
    * della richiesta in base a ciò che l'utente ha selezionato mediante i radio buttons inerenti al genere e le checkbox relative alla nazione*/
    let parameters="https://randomuser.me/api?results="+_sliderProfili.val()+"&gender="+_rdoGender.filter(":checked").val()+"&nat="///+_chkNation.filter(":checked").val();
    for(let i=0; i<_chkNation.length;i++)
    {
        if(_chkNation.eq(i).is(":checked"))
        {
            parameters+=_chkNation.eq(i).val();
        }
    }
    /*Invio della richiesta degli utenti al Server*/
    let richiesta = inviaRichiesta(parameters)
    /*Funzione da eseguire in caso di successo nella richiesta*/
    richiesta.done(function (data) {
        data = JSON.parse(data) /*Parsificazione del json*/
        console.log(data);  /*verifica*/
        i=0;
        max=_sliderProfili.val(); /*Imposto correttamene il range degli user da visualizzare*/
        _informazioneDaVisualizzare="btnNome"; /*E' la prima informazione visualizzata al click sul bottone*/
        /*Impostazione iniziale delle frecce di scorrimento*/
        _frecciaSinistra.css("visibility", "hidden");
        _frecciaDestra.css("visibility", "visible");
        if(max==1)
            _frecciaDestra.css("visibility", "hidden");
        $("#wrapper1").css("visibility", "visible");
        $("#wrapperFrecce").css("visibility", "visible");
        for(let i=0;i<_li.length;i++)
            _li[i].removeAttribute("class");
        _li[0].classList.add("active");

        /*Gestione della visualizzazione dei dati degli user*/
        visualizzaInformazioni(data["results"]);
    });
    /*Funzione da eseguire in caso di errore nella richiesta*/
    richiesta.fail(error)
}

function error(jqXHR, text_status, string_error) {
    if (jqXHR.status == 0)
        alert("Connection Refused or Server timeout");
    else if (jqXHR.status == 200)
        alert("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}

function visualizzaInformazioni(data)
{
    let _informazioneVisualizzata=$("#informazioneVisualizzata");
    let _informazione=$("#informazione");
    _persone=data;
    switch(_informazioneDaVisualizzare)
    {
        /*Switch sull'informazione che si desidera visualizzare (in base all'icona selezionata)
          e relativa visualizzazione delle informazioni*/
        case "btnNome":
            _informazioneVisualizzata.html("Hi, my name is");
            _informazione.html(_persone[i]["name"]["first"]+" "+_persone[i]["name"]["last"]);
            break;
        case "btnEmail":
            _informazioneVisualizzata.html("My email address is");
            _informazione.html(_persone[i]["email"]);
            break;
        case "btnCompleanno":
            _informazioneVisualizzata.html("My birthday is");
            _informazione.html(_persone[i]["dob"]["date"].slice(0,10).split('-').reverse().join('/'));
            break;
        case "btnIndirizzo":
            _informazioneVisualizzata.html("My address is");
            _informazione.html(_persone[i]["location"]["street"]["number"]+" "+ _persone[i]["location"]["street"]["name"]);
            break;
        case "btnTelefono":
            _informazioneVisualizzata.html("My phone number is");
            _informazione.html(_persone[i]["phone"]);
            break;
        case "btnPassword":
            _informazioneVisualizzata.html("My password is");
            _informazione.html(_persone[i]["login"]["password"]);
            break;
    }
    /*Impostazione della corretta immagine*/
    $("#image").prop("src", _persone[i]["picture"]["large"]);
    /*Inidce dei profili*/
    _profiloVisualizzato.html("Profile "+(i+1)+" of "+max);
}

/*Gestione dell'hover sulle icone relative alle info degli utenti*/
function movimentoBarra(btn) {
    for(let i=0;i<_li.length;i++)
        _li[i].removeAttribute("class");    /*Serve a far tornare le icone allo stato iniziale*/
    btn.classList.add("active");        /*Serve a colorare l'icona che mi interessa*/
    _informazioneDaVisualizzare=btn.id; /*Passo alla function di visualizzazione l'id dell'icona (da cui capisco cosa serve visualizzare)*/
    visualizzaInformazioni(_persone);
}

/*Gestione della corretta visualizzazione delle frecce.
  La funzione viene richiamata nell'HTML, al click su di esse.*/
function controlloFrecce(btn) {
    _frecciaDestra.css("visibility", "visible");
    _frecciaSinistra.css("visibility", "visible");
    if (btn.id == "frecciaDestra")
        i++;
    else
        i--;
    if (i == 0)
        _frecciaSinistra.css("visibility", "hidden");
    if (i == max - 1)
        _frecciaDestra.css("visibility", "hidden");
    for (let i = 0; i < _li.length; i++)
        _li[i].removeAttribute("class");
    _li[0].classList.add("active");
    _informazioneDaVisualizzare = "btnNome";
    visualizzaInformazioni(_persone);
}