<?php
if(isset($_POST["saveName"])){
    $eventName = $_POST["saveName"];
    $endDate = $_POST["saveDate"];
    $description = $_POST["saveDescription"];
    $sql = "insert into event (name, description, closeDate) values ('$eventName', '$description', '$endDate')";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
}

if(isset($_POST["saveOptionTimeStart"])){
    $eventName = $_POST["saveName"];
    $sql = "select eventID from event where name is ".$eventName;
    mysqli_query($mysqli, $sql);
    $mysqli->bind_result($id);
    $date = $_POST["saveOptionDate"];
    $timeStart = $_POST["saveOptionTimeStart"];
    $timeEnd = $_POST["saveOptionTimeEnd"];
    $sql = "insert into options (f_eventID, date, timeStart, timeEnd) values ('$id', '$date', '$timeStart', '$timeEnd')";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
}
?>