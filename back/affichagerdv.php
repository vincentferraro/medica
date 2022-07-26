<?php 
    include 'bdd_connect.php';

    //Récupération login
    session_start();
    $id_patient=intval($_SESSION['id_patient']);

    //Json array pour stocker information rdv
    $json=array();

    //Connexion BDD
    $conn=connectBdd();

    $sql="SELECT id_rdv,nom, date, heure FROM rdv NATURAL JOIN docteur WHERE id_patient=$id_patient;";
    
    $resultat=mysqli_query($conn,$sql);
    
    
    while($res=mysqli_fetch_array($resultat,MYSQLI_ASSOC)){
        $row=array(
            "id_rdv"=>$res['id_rdv'],
            "nom"=>$res['nom'],
            "date"=>$res['date'],
            "heure"=>$res['heure']
        );
        array_push($json,$row);
        //echo $res['nom'];
        //echo $res['date'];
        //echo $res['heure'];
    }
    
    echo json_encode($json);

    $conn->close();
?>