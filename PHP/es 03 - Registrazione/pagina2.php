<!DOCTYPE html>
<html lang="it">
 <head>
 <meta charset="UTF-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title> PHP </title>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>
	<body>
		<h1>Pagina 2!</h1>

		<?php
			require("php-mysqli.php"); // = Include
			//Step 1: lettura e controllo parametri	
			if(isset($_REQUEST["txtNome"]))
				$nome = $_REQUEST["txtNome"];
			else
				die("Nome mancante");
			
			if(isset($_REQUEST["optIndirizzo"]))
				$indirizzo = $_REQUEST["optIndirizzo"];
			else
				die("Indirizzo mancante");
			
			if(isset($_REQUEST["chkHobbies"]))
			{
				$hobbies = $_REQUEST["chkHobbies"];
				//implote --> Equivalente JOIN js --> Opposto della split, unisce le stringhe
				$hobbies = implode(',',$hobbies);
			}
			else
				$hobbies = "";

				if(isset($_REQUEST["lstCitta"]))
				{
					$hobbies = $_REQUEST["lstCitta"];
					//implote --> Equivalente JOIN js --> Opposto della split, unisce le stringhe
					$hobbies = implode(',',$hobbies);
				}
					die("Indirizzo mancante");
			
			//Fine controllo parametri

			//Step 2: Connesione al DB
			//Serie di istruzioni SEMPRE uguali --> Procedura esterna in file esterno (funzione di libreria tipo inviaRichiesta)
			//Pag 23 dispense php

			$con = _connection("4B_studenti")

			//Per accedere a proprietà e metodi di un ogetto uso -> al posto del punto 
			//Il punto in PHP concatena

			//Proteggo il parametro dalla SQLInjection 
			$nome = $_con->real_escape_string($nome); 
			$indirizzo = $_con->real_escape_string($nome);
			$hobbies = $_con->real_escape_string($nome);
			$citta = $_con->real_escape_string($nome);
			$segni = $_con->real_escape_string($nome);
			$scoperta = $_con->real_escape_string($nome);
			//Fine step 2 

			//Step 3: esecuzione della Query --> va a scrivere nel db
			$sql = ""; //All'interno scrivo il comando di esecuzione della query

		?>
	</body>
</html>