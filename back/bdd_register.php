
<?php
    include 'bdd_connect.php';

    
    $conn=connectBdd();

    $sql="SELECT * FROM docteur";
            echo "<br>";

            $result=mysqli_query($conn,$sql);

            while($row=mysqli_fetch_assoc($result)){
                echo($row['id_docteur'].", ".$row['nom']." ,".$row['prenom']."<br>");
                
            }
?>