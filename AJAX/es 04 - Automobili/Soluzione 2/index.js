"use strict"

const URL = "http://localhost:3000"
let intestazione = [{
    "tag":"th",
    "text":"nomeModello",
    "width":"15%",
},
{
    "tag":"th",
    "text":"alimentazione",
    "width":"15%",
},
{
    "tag":"th",
    "text":"colore",
    "width":"15%",
},
{
    "tag":"th",
    "text":"anno",
    "width":"10%",
},
{
    "tag":"th",
    "text":"img",
    "width":"20%",
},
{
    "tag":"th",
    "text":"Dettagli",
    "width":"13%",
},
{
    "tag":"th",
    "text":"Elimina",
    "width":"12%",
}]
$(document).ready(function () {
    let modello_sel;
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
	let _table = $("table");
	let _dettagli = $(".row").eq(2).children("div").eq(1);
    _dettagli.hide();
    let request = inviaRichiesta("get", URL + "/marche");
    request.fail(errore);
    request.done(function(marche){
        for (const marca of marche) {
            let op = $("<option>");
            op.val(marca.id);
            op.text(marca.nome);
            op.appendTo(_lstMarche);
        }
        _lstMarche.prop("selectedIndex",-1);
    });
    /****************************************/
    _lstMarche.on("change", function(){
        _lstModelli.html("");
        let codMarca = _lstMarche.val();
        let request = inviaRichiesta("get", URL + "/modelli?codMarca=" + codMarca);
        request.fail(errore);
        request.done(function(modelli){
            for (const modello of modelli) {
                let op = $("<option>");
                op.val(modello.id);
                op.text(modello.nome + " - " + modello.alimentazione);
                op.appendTo(_lstModelli);
                // salvo dentro ogni opzione tutte le info del modello selezionato
                // op.prop("modello", modello);
            }
            _lstModelli.prop("selectedIndex",-1);
        });
    })
    /*nomeModello, alimentazione, colore, anno, img. Le immagini hanno una altezza fissa di 65px.*/
    _lstModelli.on("change", function(){
        _table.empty();
        modello_sel = _lstModelli.val();// salvo dentro modello_sel l'id del modello selezionato
        // let opzione_selezionata = _lstModelli.children("option").eq(_lstModelli.prop("selectedIndex"));
        // Vado a salvare dentro il list box le info relative al modello selezionato
        // _lstModelli.prop("modello", opzione_selezionata.prop("modello"));
        console.log(opzione_selezionata);
        let codModello = _lstModelli.val();
        let request = inviaRichiesta("get", URL + "/automobili?codModello=" + codModello);
        request.fail(errore);
        request.done(function(automobili){
            let thead = $("<thead>");
            thead.appendTo(_table);
            let tr = $("<tr>");
            tr.appendTo(thead);
            for (let i = 0; i < intestazione.length; i++) {
                let th = $(`<${intestazione[i].tag}>`);
                // let th = $("<th>")
                th.appendTo(tr);
                th.text(intestazione[i].text);
                th.css({"width":intestazione[i].width});
            }
            let tbody = $("<tbody>");
            tbody.appendTo(_table);
            for (const auto of automobili) {
                let tr = $("<tr>");
                tr.appendTo(tbody);
                let td = $("<td>");
                td.appendTo(tr);
                td.text((_lstModelli.prop("modello")).nome);
                /********* */
                td = $("<td>");
                td.appendTo(tr);
                td.text((_lstModelli.prop("modello")).alimentazione);
                /******************** */
                td = $("<td>");
                td.appendTo(tr);
                td.text(auto.colore);
                /***********************/
                td = $("<td>");
                td.appendTo(tr);
                td.text(auto.anno);
                /************************/
                td = $("<td>");
                td.appendTo(tr);
                let img = $("<img>");
                img.appendTo(td);
                img.prop("src",`img/${auto.img}`);
                img.css("height","65px");
                /******************/
                td = $("<td>");
                td.appendTo(tr);
                let btn = $("<button>");
                btn.addClass("btn btn-xs btn-success");
                btn.appendTo(td);
                btn.text("Dettagli");
                btn.prop("automobile", auto);// IMPORTANTE PASSO L'INTERO JSON DELL'AUTO
                btn.on("click", dettagliClick);
                /*********/
                td = $("<td>");
                td.appendTo(tr);
                btn = $("<button>");
                btn.prop("id", auto.id);
                btn.addClass("btn btn-xs btn-secondary");
                btn.appendTo(td);
                btn.text("Elimina");
                btn.on("click",eliminaClick)
            }
            
        })
    })
    let _salva = $("#btnSalva");
    _salva.on("click",function(){
        let url = URL + "/automobili/" + $("#txtId").val();
        let request = inviaRichiesta("patch", url, {"prezzo":parseInt($("#txtPrezzo").val())})
        request.fail(errore);
        request.done(function(){
            alert("record aggiornato correttamente");
            _lstModelli.trigger("change");
        })
    })

function eliminaClick(){
    let url = URL + "/automobili/" + ($(this).prop("id"));
    let request = inviaRichiesta("delete", url);
    request.fail(errore);
    request.done(function(){
        alert("record eliminato correttamente");
        // questo forza l'evento change come se avessi cliccato sul mouse
        _lstModelli.trigger("change");

    })
}
function dettagliClick(){
    _dettagli.show();
    $("#txtId").val(($(this).prop("automobile")).id);
    $("#txtTarga").val(($(this).prop("automobile")).targa);
    $("#txtColore").val(($(this).prop("automobile")).colore);
    $("#txtAnno").val(($(this).prop("automobile")).anno);
    $("#txtKm").val(($(this).prop("automobile")).km);
    $("#txtPrezzo").val(($(this).prop("automobile")).prezzo);

    // $("#txtNome").val((_lstModelli.prop("modello")).nome);
    // $("#txtAlimentazione").val((_lstModelli.prop("modello")).alimentazione);
    // $("#txtCilindrata").val((_lstModelli.prop("modello")).cilindrata);
    let url = URL + "/modelli/" + modello_sel;
    let request = inviaRichiesta("get", url);
    request.fail(errore);
    request.done(function(modello){
        $("#txtNome").val(modello.nome);
        $("#txtAlimentazione").val(modello.alimentazione);
        $("#txtCilindrata").val(modello.cilindrata);
    })



}
       

		
});


