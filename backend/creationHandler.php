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

if(isset($_POST["timeStart"])){
    $sql = "select eventID from event where name is ".$eventName;
    mysqli_query($mysqli, $sql);
    $mysqli->bind_result($id);
    $date = $_POST["date"];
    $timeStart = $_POST["timeStart"];
    $timeEnd = $_POST["timeEnd"];
    $sql = "insert into options (f_eventID, date, timeStart, timeEnd) values ('$id', '$date', '$timeStart', '$timeEnd')";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
}
?>