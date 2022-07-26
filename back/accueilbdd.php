<?php
    include 'bdd_connect.php';

    

    session_start();

    $_SESSION['id_patient'];
    

    $loginuser=$_SESSION['login'];

    $conn=connectBdd();

    $sql="SELECT * FROM patient WHERE login='$loginuser';";

    $resultat=mysqli_query($conn,$sql);

    $res=mysqli_fetch_assoc($resultat);

    $userInfo=array(
        'nom'=>$res['nom'],
        'prenom'=>$res['prenom'],
        'mail'=>$res['mail'],
        'telephone'=>$res['telephone']
    );
    $_SESSION['id_patient']=$res['id_patient'];
    echo json_encode($userInfo);

    $conn->close();
?>