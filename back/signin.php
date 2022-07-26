<?php
    //Code permettant à un utilisateur de s'authentifier et d'accéder à son 
    //espace personnel

    session_start();
    $_SESSION['login'];
    $_SESSION['nom'];
    $_SESSION['prenom'];
    $_SESSION['mail'];
    $_SESSION['nom'];
    $_SESSION['telephone'];

    include 'bdd_connect.php';

    $login=$_POST['login'];
    $pass=$_POST['pass'];

    $conn=connectBdd();

    $sql="SELECT login,pass FROM patient WHERE login='$login' AND pass='$pass';";

    //echo $sql.'<br>';
    $json=array(
        "bool"=>false,
        "motif"=>""
    );

    $result=mysqli_query($conn,$sql);

    if(mysqli_num_rows($result)==0){

        
        $json['bool']=false;
        $json['motif']='Erreur identifiant ou mot de passe';
        echo json_encode($json);

    }else{
        $res=mysqli_fetch_assoc($result);
        $json['bool']=true;
        $json['motif']="Connexion validée";
        $_SESSION['login']=$res['login'];
        echo json_encode($json);
        //header("Location:http://localhost:8888/MEDICA/front/accueil.html");
    }


    

    $conn->close();

    
?>