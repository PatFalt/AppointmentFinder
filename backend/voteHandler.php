<?php
    if(isset($_POST["voteEvent"])){
        require_once("dbaccess.php");
        $optionID = $_POST["optionID"];
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