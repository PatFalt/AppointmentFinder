<?php
include("dbaccess.php");
include("event.php");
include("option.php");
include("user.php");

function test_input($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if(isset($_POST["name"])){
    $eventName = $_POST["name"];
    $endDate = $_POST["date"];
    $description = $_POST["description"];
    $sql = "insert into event (name, description, closeDate) values ('$eventName', '$description', '$endDate')";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }
}

?>
