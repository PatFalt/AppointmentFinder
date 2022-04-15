<?php
    $mysqli = mysqli_connect('localhost', 'bif2webscriptinguser', 'bif2021', 'appointmentfinder_db');
    print_r(mysqli_get_connection_stats($mysqli));

?>