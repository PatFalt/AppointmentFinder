<?php
include("dbaccess.php");
include("event.php");
include("option.php");
include("user.php");

if(isset($_POST)){
    $eventName = $_POST["eventName"];
    $endDate = $_POST["endDate"];
    $description = mysqli::real_escape_string($_POST["description"]);
    if()
}

?>