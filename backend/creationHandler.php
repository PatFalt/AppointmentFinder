<?php
if(isset($_POST["saveName"])){
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
    //$eventName = $_POST["saveOptionName"];
    //$sql = $mysqli->prepare("select eventID from event where name = ?");
    //$sql->bind_param('s', $eventName);
    //$sql->execute();
    $sql = "select max(eventID) from event";
    if(mysqli_query($mysqli, $sql)){
        $mysqli->bind_result($id);
    } else {return "error";}   
    $date = $_POST["saveOptionDate"];
    $timeStart = $_POST["saveOptionTimeStart"];
    $timeEnd = $_POST["saveOptionTimeEnd"];
    $sql = "insert into options (f_eventID, date, timeStart, timeEnd) values ('$id', '$date', '$timeStart', '$timeEnd')";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
    $mysqli->close();
}
?>