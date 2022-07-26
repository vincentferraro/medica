<?php
    include 'bdd_connect.php';

    $id_rdv=$_POST['id_rdv'];

    $conn=connectBdd();


    $sql="DELETE FROM `rdv` WHERE id_rdv=$id_rdv";

    $res=mysqli_query($conn,$sql);
    if($res==TRUE){
        echo 'Rendez Vous annulé';
    }
    else(
        print 'Impossible d\'annuler le rdv;'
    );

    $conn->close();
?>