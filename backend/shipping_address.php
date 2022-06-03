<?php 

require_once "class/responses.class.php";
require_once "class/shipping_address.class.php";

$_responses = new responses;
$_shipping_address = new shipping_address;

if($_SERVER["REQUEST_METHOD"] == "GET") {

    if(isset($_GET["userId"])) {
        $userId = $_GET["userId"];
        $address = $_shipping_address->getAddres($userId);
        echo json_encode($address);
    }

} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "POST";
} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    echo "PUT";
} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    echo "DELETE";
} else {

    header("Content-Type: application/json");
    $dataArray = $_responses->error_405();
    echo json_encode($dataArray);

}