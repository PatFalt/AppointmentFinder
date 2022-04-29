<?php
    if(isset($_POST["deleteMe"]) && $_POST["deleteMe"] == 1){
        require_once("dbaccess.php");
        $eventID = $_POST["eventID"];
        $sql = "delete drom options
            where f_eventID = $eventID";
        if(mysqli_query($mysqli, $sql)){
            echo "done";
        }
        $sql = "delete drom event
        where eventID = $eventID";
        if(mysqli_query($mysqli, $sql)){
            echo "done";
        }
        $mysqli->close();
    }
?>