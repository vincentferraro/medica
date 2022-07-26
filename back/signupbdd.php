<?php 
    //Ce fichier enregistre le patient dans la BDD//

    include 'bdd_connect.php';

    //Récupération données de signup.html//

    $nom=$_POST["nom"];
    $prenom=$_POST["prenom"];
    $mail=$_POST["mail"];
    $telephone=$_POST["telephone"];
    $login=$_POST["login"];
    $pass=$_POST["pass"];

    //Connection BDD//

    $conn=connectBdd();

    //Requête pour traitement//
    
    //Avant enregistrement vérification si l'adresse mail et login ne sont pas existant dans la BDD//

    $sql1="SELECT mail FROM patient WHERE mail='$mail'";
    $sql2="SELECT login FROM patient WHERE login='$login'";
    $sql3="INSERT INTO patient(`nom`, `prenom`, `mail`, `telephone`,`login`,`pass`)
             VALUES ('$nom','$prenom','$mail',$telephone,'$login','$pass')";

    // print($sql1.'<br>');
    //print($sql2.'<br>');
    //print($sql3.'<br>');

    //création de array pour réponse JSON permettant de traiter l'inscription
    $responsejson=array(
        "bool"=>false,
        "motif"=>""
    );

    //Lance la requête 1//
    $result=mysqli_query($conn,$sql1);
    //Vérifie si mail déjà existant//
    if(mysqli_num_rows($result)==1){

        $responsejson['bool']=false;
        $responsejson['motif']="Mail déjà utilisé, Veuillez saisir une autre adresse mail";
        echo json_encode($responsejson);
        
    }else{

        //Vérifie si login déjà existant//

        $result=mysqli_query($conn,$sql2);
        $rowcount=mysqli_num_rows($result);
        if($rowcount>0){
            
            $responsejson['bool']=false;
            $responsejson['motif']="Login existant, merci de changer de Login";
            echo json_encode($responsejson);

        }
        else{
            

            //mail et login disponible insertion de la requête pour enregistrement//

            if(mysqli_query($conn,$sql3)){

                $responsejson['bool']=true;
                $responsejson['motif']="Inscription valide, retour à l'accueil dans quelque secondes...";
                echo json_encode($responsejson);

            }else{
                
                $responsejson['bool']=false;
                $responsejson['motif']="Erreur à la dernière étape veuillez contacter un administrateur";

                echo json_encode($responsejson);
                echo $nom.",".$prenom.','.$mail.','.$telephone.','.$login.','.$pass;

                
            };
        }
    }

    
    

    $conn->close();

    ?>