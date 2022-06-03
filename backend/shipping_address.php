<?php

require_once "class/responses.class.php";
require_once "class/shipping_address.class.php";

$_responses = new responses;
$_shipping_address = new shipping_address;

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (isset($_GET["userId"])) {
        $userId = $_GET["userId"];
        $address = $_shipping_address->getAddres($userId);
        header("Content-Type: application/json");
        echo json_encode($address);
        http_response_code(200);
    }

} else if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // obtener los datos enviados
    $postBody = file_get_contents("php://input");
    // enviar los datos al controlador
    $dataArray = $_shipping_address->post($postBody);
    // devolvemos una respuesta
    header("Content-Type: application/json");
    if (isset($dataArray["result"]["error_id"])) {
        $responseCode = $dataArray["result"]["error_id"];
        http_response_code($responseCode);
    } else {
        http_response_code(200);
    }
    echo (json_encode($dataArray));

} else if ($_SERVER["REQUEST_METHOD"] == "PUT") {

    // obtener los datos a modificar
    $postBody = file_get_contents("php://input");
    // enviar los datos al controlador
    $dataArray = $_shipping_address->put($postBody);
    // devolvemos una respuesta
    header("Content-Type: application/json");
    if (isset($dataArray["result"]["error_id"])) {
        $responseCode = $dataArray["result"]["error_id"];
        http_response_code($responseCode);
    } else {
        http_response_code(200);
    }
    echo (json_encode($dataArray));

} else if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    
    // obtener los datos a modificar
    $postBody = file_get_contents("php://input");
    // enviar los datos al controlador
    $dataArray = $_shipping_address->delete($postBody);
    // devolvemos una respuesta
    header("Content-Type: application/json");
    if (isset($dataArray["result"]["error_id"])) {
        $responseCode = $dataArray["result"]["error_id"];
        http_response_code($responseCode);
    } else {
        http_response_code(200);
    }
    echo (json_encode($dataArray));

} else {

    header("Content-Type: application/json");
    $dataArray = $_responses->error_405();
    echo json_encode($dataArray);
}
