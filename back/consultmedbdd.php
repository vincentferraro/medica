<?php
    include 'bdd_connect.php';

    $conn=connectBdd();

    session_start();

    $iddoc=$_POST['iddoc'];
    $date=$_POST['date'];

    $json=array();


    $sql="SELECT heure FROM rdv WHERE id_docteur=$iddoc AND date='$date'";

    $resultat=mysqli_query($conn,$sql);

    while($res=mysqli_fetch_assoc($resultat)){
        $res=array(
            "heure"=>$res["heure"]
                );
        array_push($json,$res);
        
    }
    if($res==false){
        $res=array(
            "heure"=>"O"
        );
        
    };
    
    echo json_encode($json);
    

    $conn->close();
?>