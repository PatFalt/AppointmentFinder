<?php
    if(isset($_POST["deleteMe"])){
        require_once("dbaccess.php");
        $eventID = $_POST["eventID"];
        $sql = "delete from options where f_eventID = $eventID";
        if(mysqli_query($mysqli, $sql)){
            echo "done";
        }
        $sql = "delete from event where eventID = $eventID";
        if(mysqli_query($mysqli, $sql)){
            echo "done";
        }
        $mysqli->close();
    }
?>