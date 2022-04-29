<?php
    /*$sql = "select eventID, name, description, open, closeDate, date, timeStart, timeEnd, voteCount
            from event left join options 
            on event.eventID = options.f_eventID
            where (select max(voteCount) from options)";*/
    require_once("dbaccess.php");
    $sql = "select * from event order by closeDate asc";
    $result = mysqli_query($mysqli, $sql);
    $table = [];
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            $table[] = $row;
        }
        echo json_encode($table);
    }
    $mysqli->close();

    if(isset($_POST["viewCheck"]))
?>