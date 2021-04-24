<? php
function _connection($dbName)   //funzione di libreria con nome db come parametro
{
define('DBHOST', 'localhost');  //Definisce il dominio del server
define('DBUSER', 'root');       //Definisce il nome utente
define('DBPASS', '');           //Definisce la passsword. Di default il nome utente è root e non ha password


mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try{
    $con = new mysqli(DBHOST, DBUSER, DBPASS, $dbName);
    return $con;
   }
catch (mysqli_sql_exception $ex) {
    die ("Errore connessione al database: <br>" . $ex->getMessage()); 
}
?>