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

if(isset($_GET)){
    /*$eventName = $_GET["eventName"];
    $endDate = $_GET["endDate"];
    $description = $_GET["description"];
    $sql = "insert into event (name, description, closeDate) values ('$eventname', '$description', '$endDate')";
    if(mysqli_query($mysqli, $sql)){
        echo "done";
    }*/

    $sql = "insert into event (name, description, closeDate) values (?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $name = test_input($_GET["eventName"]);
    $description = test_input($_GET["description"]);
    $closeDate = $_GET["endDate"];
    echo $name."<br>".$description."<br>".$closeDate."<br>";

    $stmt->bind_param("sss", $name, $description, $closeDate);
    $stmt->execute();
    //header("Refresh:0, url=../index.html");

}

?>