<?php
    include 'bdd_connect.php';
    session_start();

    $date=$_POST['date'];
    $heure=$_POST['heure'];
    

    $json=array();

    $conn=connectBdd();

    $sql="SELECT id_docteur, nom FROM rdv NATURAL JOIN docteur WHERE date='$date' AND heure='$heure'";

    $resultat=mysqli_query($conn,$sql);
    
    while($res=mysqli_fetch_assoc($resultat)){
        $row=array(
            "id_docteur"=>$res['id_docteur'],
            "nom"=>$res['nom']
        );
        array_push($json,$row);
        
    }
    if(empty($json)){
        $row=array(
            "id_docteur"=>0,
            "nom"=>""
        );
        array_push($json,$row);
        //echo "aucune ligne";
    }

    echo json_encode($json);

    $conn->close();

?>