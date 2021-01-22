# Progetto RANDOMUSER  :books:


>  :raising_hand: *stud. [Valinotto Giada](https://github.com/Giada-Valinotto) \
>  :school_satchel: I.I.S. G. Vallauri Fossano,\
>  :mortar_board: classe 4^B INF 2020/2021*

##
### Scopo del progetto:


Progetto simulato sulla base del sito [randomuser.me](https://randomuser.me) , il quale gestisce una folta anagrafica di persone cui dati sono inventati.

<center>
<img src="https://miro.medium.com/max/700/1*EEn-tB8M38krdKQuuTR-9Q.png" border="0" />
</center>

### Funzionalità: 

* Ad ogni refresh mostra a centro video tutte le informazioni di una unica persona generata casualmente(nome, mail, data di nascita, indirizzo, numero di telefono, password, etc). 
* Fornisce un servizio /api attraverso il quale può restituire al chiamante un certo numero di record casuali in formato XML o JSON (chè è il default, quindi può anche essere omesso).


<img src="https://github.com/vallauri-ict/randomuser-Giada-Valinotto/blob/master/Valinotto%20-%20RandomUser/img_README/RandomUser_foto1.jpg?raw=true" border="0" width="30%"> <img src="https://github.com/vallauri-ict/randomuser-Giada-Valinotto/blob/master/Valinotto%20-%20RandomUser/img_README/RandomUser_foto2.jpg?raw=true" border="0" width="30%"> <img src="https://github.com/vallauri-ict/randomuser-Giada-Valinotto/blob/master/Valinotto%20-%20RandomUser/img_README/RandomUser_foto3.jpg?raw=true" border="0" width="30%">

<img src="https://github.com/vallauri-ict/randomuser-Giada-Valinotto/blob/master/Valinotto%20-%20RandomUser/img_README/RandomUser_foto4.jpg?raw=true" border="0" width="30%"> <img src="https://github.com/vallauri-ict/randomuser-Giada-Valinotto/blob/master/Valinotto%20-%20RandomUser/img_README/RandomUser_foto5.jpg?raw=true" border="0" width="30%"> <img src="https://github.com/vallauri-ict/randomuser-Giada-Valinotto/blob/master/Valinotto%20-%20RandomUser/img_README/RandomUser_foto6.jpg?raw=true" border="0" width="30%">

#### Esempio api: 
- [https://randomuser.me/api/?format=json&results=5](https://randomuser.me/api/?format=json&results=5)
- [https://randomuser.me/api/?format=xml&results=5](https://randomuser.me/api/?format=xml&results=5)
- [https://randomuser.me/api/?results=5&gender=male](https://randomuser.me/api/?results=5&gender=male)

#### Esempio record JSON:
```json
{"gender":"male",
"name" : {"title":"mr", "first":"jeff", "last":"macrae"},
"location" :{ "street":"3726 new road", "city":"st davids",
"state":"merseyside", "postcode":"T5 3AJ"},
"email":"jeff.macrae@example.com",
"login":{"username":"beautifuldog250",
"password":"stoner",
"salt":"RlR2XPyo",
"md5":"4be80d04964ee023ddd9e15d60c8f77e",
"sha1":"da02bb1ce150c2478eae2be81126d6473a6a71fb",
"sha256":"4982eccd025aac4037c4b3431488fe829c1d30eefbc227fc640f345700c69273"
},
"dob":"1963-01-18 02:15:37",
"registered":"2005-01-08 09:05:14",
"phone":"019467 93281", "cell":"0791-787-027",
"id" : {"name":"NINO", "value":"NK 36 94 71 C"},
"picture":{"large":"https://randomuser.me/api/portraits/men/6.jpg","medium":"ht
tps://randomuser.me/api/portraits/med/men/6.jpg","thumbnail":"https://rando
muser.me/api/portraits/thumb/men/6.jpg"},
"nat":"GB"
}
```
### Risultato:

Il risultato ottenuto è una riproduzione della sezione di sfondo bianco del sito originale,con l'aggiunta di alcuni elementi:
* Slider di selezione, mediante il quale è possibile scegliere il numero di record da caricare 
* Pulsanti di navigazione (avanti/indietro), i quali consentono di visualizzare ciascun record
* 3 radio buttons, per la selezione di genere/i (uomo/donna/entrambi) da visualizzare
* Checkbox che permettono di caricare record di utenti appartenenti soltanto alle nazionalità desiderate


<img src="https://github.com/vallauri-ict/randomuser-Giada-Valinotto/blob/master/Valinotto%20-%20RandomUser/img_README/risultatoFinale.png?raw=true" border="0">
