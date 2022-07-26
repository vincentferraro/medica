<?php
    include 'bdd_connect.php';

    session_start();
    $id_patient=intval($_SESSION['id_patient']);
    $date=$_POST['date'];
    $heure=$_POST['heure'];
    $nomDoc=$_POST['nomdoc'];
    $motif=$_POST['motif'];
    $id_docteur;

    $conn=connectBdd();

    switch($nomDoc){
        case 'Dr Mabhoul':
            $id_docteur=1;
            break;
        case 'Dr House':
            $id_docteur=2;
            break;
        case 'Dr Greys':
            $id_docteur=3;
            break;
        case 'Dr Norbert':
            $id_docteur=4;
            break;
    }
    
    $json=array();
    
    $sql="INSERT INTO `rdv`(`date`, `heure`, `motif`, `id_docteur`, `id_patient`) 
            VALUES ('$date','$heure','$motif',$id_docteur,$id_patient)";

    $resultat=mysqli_query($conn,$sql);

    if($resultat==true){
        $res=array(
            "Enregistremen"=>true
        );
        array_push($json,$res);
    }else{
        $res=array(
            "Enregistrement"=>false
        );
    }

    echo json_encode($json);

?>