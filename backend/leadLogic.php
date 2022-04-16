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
    $inputs = array ();
    $data = array ();
    foreach($_POST as $x){
        $inputs[$x] = $x;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    foreach( $inputs as $input){
        $data[$input] = test_input($input);
    }
}

if(isset($_POST)){
    $eventName = $_POST["eventName"];
    $endDate = $_POST["endDate"];
    $description = mysqli::real_escape_string($_POST["description"]);
    if(true){

    }
    foreach($data as $x){
        echo $x."<br>";
    }

}

?>