<?php

require_once "connection/connection.php";
require_once "responses.class.php";


class shipping_address extends connection {

    public function getAddres($userId) {

        $query = "SELECT * FROM shipping_address WHERE userId = $userId";
        return parent::getData($query);
    }

}