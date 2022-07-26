<?php
    include 'bdd_connect.php';

    $conn=connectBdd();

    $sql="Select * FROM patient";

    $resultat=mysqli_query($conn,$sql);
    while($res=mysqli_fetch_assoc($resultat)){
        print_r($res);
        echo '<br>';
        
    };


?>