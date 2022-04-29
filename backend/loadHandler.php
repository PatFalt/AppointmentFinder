<?php
    if(isset($_POST["loadCheck"]) && $_POST["loadCheck"] == 1){
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
    }

    if(isset($_POST["viewCheck"] )&& $_POST["viewCheck"] == 1){
        require_once("dbaccess.php");
        $eventID = $_POST["eventID"];
        $sql = "select date, timeStart, timeEnd 
        from options 
        join event on event.eventID = options.f_eventID 
        where f_eventID = $eventID";
        $result = mysqli_query($mysqli, $sql);
        $table = [];
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)){
                $table[] = $row;
            }
            echo json_encode($table);
        }
        $mysqli->close();
    }

    if(isset($_POST["resultCheck"]) && $_POST["resultCheck"] == 1){
        require_once("dbaccess.php");
        $eventID = $_POST["eventID"];
        $sql = "select date, timeStart, timeEnd 
            from options 
            where f_eventID = $eventID and voteCount = (select max(voteCount) from options where f_eventID = $eventID)";
        $result = mysqli_query($mysqli, $sql);
        $table = [];
        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)){
                $table[] = $row;
            }
            echo json_encode($table);
        }
        $mysqli->close();
    }
    //alle options
    //sql = "select date, timeStart, timeEnd from options where f_eventID = ?" 
    //winning option
    //sql = "select date, timeStart, timeEnd from options where f_eventID = ? and voteCount = (select max(voteCount) from options where f_eventID = ?)"
?>
