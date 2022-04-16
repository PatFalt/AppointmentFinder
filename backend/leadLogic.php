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

if(isset($_POST)){
    $eventName = $_POST["eventName"];
    $endDate = $_POST["endDate"];
    //$description = mysqli::real_escape_string($_POST["description"]);
    if(true){

    }

    $sql = "insert into event (name, description, closeDate) values (?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $name = test_input($_POST["eventName"]);
    $description = test_input($_POST["description"]);
    $closeDate = test_input($_POST["endDate"]);
    echo $name."<br>".$description."<br>".$closeDate."<br>";

    $stmt->bind_param("sss", $name, $description, $closeDate);
    $stmt->execute();

    
}


?>