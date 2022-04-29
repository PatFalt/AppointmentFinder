<?php
    /*$sql = "select eventID, name, description, open, closeDate, date, timeStart, timeEnd, voteCount
            from event left join options 
            on event.eventID = options.f_eventID
            where (select max(voteCount) from options)";*/
    if(isset($_GET["loadCheck"]) && $_GET["loadCheck"] == 1){
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


    if(isset($_GET["viewCheck"] )&& $_GET["viewCheck"] == 1){
        require_once("dbaccess.php");
        $sql = "select date, timeStart, timeEnd 
            from options where f_eventID = ?";
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

    if(isset($_GET["resultCheck"]) && $_GET["resultCheck"] == 1){
        require_once("dbaccess.php");
        $sql = "select date, timeStart, timeEnd 
            from options 
            where f_eventID = ? and voteCount = (select max(voteCount) from options where f_eventID = ?)";
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
?>
//alle options
    //sql = "select date, timeStart, timeEnd from options where f_eventID = ?" 
//winning option
    //sql = "select date, timeStart, timeEnd from options where f_eventID = ? and voteCount = (select max(voteCount) from options where f_eventID = ?)"