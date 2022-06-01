<?php 

require_once "class/connection/connection.php";

$connection = new connection;

$query = "select * from users";

print_r($connection->getData($query));