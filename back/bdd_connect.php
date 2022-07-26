<?php
    /*Fonction pour se connecter à la base de données et éviter de recopier le code pour chaque
    requêtes*/
    /*ATTENTION cloturer la connexion a a fin de chaque fichier php*/

    function connectBdd(){

        $servername="localhost";
        $username="root";
        $password="root";
        $database="bdd_medica";

        $conn=mysqli_connect($servername,$username,$password,$database);

        if($conn){

            return $conn;

        }else{
            
        }

    }
    
    
?>