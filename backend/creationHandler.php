<?php
if(isset($_POST["saveName"])){
    require_once("dbaccess.php");
    $eventName = $_POST["saveName"];
    $endDate = $_POST["saveDate"];
    $description = $_POST["saveDescription"];
    $sql = "insert into event (name, description, closeDate) values ('$eventName', '$description', '$endDate')";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
    $mysqli->close();
}

if(isset($_POST["saveOptionTimeStart"])){
    require_once("dbaccess.php");
    $date = $_POST["saveOptionDate"];
    $timeStart = $_POST["saveOptionTimeStart"];
    $timeEnd = $_POST["saveOptionTimeEnd"];
    $sql = "insert into options (f_eventID) SELECT eventID from event where eventID = (select max(eventID) from event)";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
    $sql = "update options set date = '$date', timeStart = '$timeStart', timeEnd = '$timeEnd' where optionID = (select max(optionID) from options)";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
    $mysqli->close();
}
?>