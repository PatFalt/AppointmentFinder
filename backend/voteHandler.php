<?php
    if(isset($_POST["voteEvent"])){
        require_once("dbaccess.php");
        $optionID = $_POST["optionID"];
        $sql = "update options set voteCount = voteCount + 1 where optionID = $optionID";
        if(mysqli_query($mysqli, $sql)){
            echo "done";
        }
        $mysqli->close();
    }
?>