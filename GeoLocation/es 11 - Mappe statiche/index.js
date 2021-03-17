"use strict";

const URL = "http://maps.googleapis.com/maps/api/staticmap"
const key  = "key" 

const params = {
	"key":key,
	"center": "via san michele 68, fossano", //"44.5557763,7.7347183",
	"zoom":16,
	"size":"800x600",	
	// maptype viene aggiunto dopo  manualmente
	"markers":"color:blue|size:big|label:V|44.5557763,7.7347183"	
}
const mapType = ['roadmap', 'satellite', 'hybrid', 'terrain', 'streetview'];

window.onload = function () {	
    let imgBox = $("#imgBox");
    let btnBox = $("#btnBox");
    for (const item of mapType) {
        let button = $("<button>");
        button.text(item);
        button.appendTo(btnBox);
        button.on("click", visualizzaMappa);
    }

    function visualizzaMappa(){
        if($(this).text()!="streetview")
        {
           let url=URL+"?"+impostaParametri($(this).text());
            console.log(url);
            imgBox.prop("src", url);
        }
        else
        {
            url=URL+"/streetview?"+impostaParametri("streetview");
        }
    }

    function impostaParametri(mapType){
        let qstring="";
        for (const key in params) {
            qstring+=key+"="+params[key]+"&";
        }
        qstring+="maptype="+mapType;
        return qstring;
    }
}