<?php
    /*$sql = "select event.name, event.description, event.open, event.closeDate, options.date, options.timeStart, options.timeEnd, options.voteCount
            from event join options 
            on event.eventID = options.f_eventID";*/
    $sql = "select * from event";
    $result = mysqli_query($mysqli, $sql);
    $table = [];
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            $table[] = $row;
        }
        echo json_encode($table);
    }
?>