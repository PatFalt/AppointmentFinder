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
    require("dbaccess.php");
    //$eventName = $_POST["saveOptionName"];
    $sql = $mysqli->prepare("select max(eventID) from event");
    //$sql->bind_param('s', $eventName);
    $sql->execute();
    $sql->bind_result($id);  
    $intid = intval($id);
    $date = $_POST["saveOptionDate"];
    $timeStart = $_POST["saveOptionTimeStart"];
    $timeEnd = $_POST["saveOptionTimeEnd"];
    $sql = "insert into options (f_eventID, date, timeStart, timeEnd) values ('$intid', '$date', '$timeStart', '$timeEnd')";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
    $mysqli->close();
}
?>