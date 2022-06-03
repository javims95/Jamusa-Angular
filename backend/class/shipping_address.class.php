<?php

require_once "connection/connection.php";
require_once "responses.class.php";


class shipping_address extends connection
{

    private $userId = "";
    private $name = "";
    private $surname = "";
    private $country = "";
    private $address = "";
    private $additional_address = "";
    private $postal_code = "";
    private $population = "";
    private $province = "";
    private $telephone_number = "";
    private $email = "";

    public function getAddres($userId)
    {

        $query = "SELECT * FROM shipping_address WHERE userId = $userId";
        return parent::getData($query);
    }

    public function post($json)
    {

        $_responses = new responses;
        $data = json_decode($json, true);

        if (!isset($data["name"]) || !isset($data["surname"]) || !isset($data["country"]) || !isset($data["address"]) || !isset($data["postal_code"]) || !isset($data["population"]) || !isset($data["province"]) || !isset($data["telephone_number"]) || !isset($data["email"])) {
            return $_responses->error_400();
        } else {


            $this->name = $data["name"];
            $this->surname = $data["surname"];
            $this->country = $data["country"];
            $this->address = $data["address"];
            if (isset($data["additional_address"])) {
                $this->additional_address = $data["additional_address"];
            }
            $this->postal_code = $data["postal_code"];
            $this->population = $data["population"];
            $this->province = $data["province"];
            $this->telephone_number = $data["telephone_number"];
            $this->email = $data["email"];

            $resp = $this->insertAddress();

            if ($resp) {
                $response = $_responses->response;
                $response["result"] = array(
                    "id" => $resp
                );
                return $response;
            } else {
                return $_responses->error_500();
            }
        }
    }

    private function insertAddress()
    {

        $query = "INSERT INTO shipping_address (name, surname, country, address, additional_address, postal_code, population, province, telephone_number, email) VALUES(
            '" . $this->name . "',
            '" . $this->surname . "',
            '" . $this->country . "',
            '" . $this->address . "',
            '" . $this->additional_address . "',
            '" . $this->postal_code . "',
            '" . $this->population . "',
            '" . $this->province . "',
            '" . $this->telephone_number . "',
            '" . $this->email . "'
        )";
        $resp = parent::nonQueryId($query);

        if ($resp) {
            return $resp;
        } else {
            return 0;
        }
    }

    public function put($json)
    {

        $_responses = new responses;
        $data = json_decode($json, true);

        if (!isset($data["userId"])) {
            return $_responses->error_400();
        } else {

            $this->userId = $data["userId"];
            if (isset($data["name"])) {
                $this->name = $data["name"];
            }
            if (isset($data["surname"])) {
                $this->surname = $data["surname"];
            }
            if (isset($data["country"])) {
                $this->country = $data["country"];
            }
            if (isset($data["address"])) {
                $this->address = $data["address"];
            }
            if (isset($data["additional_address"])) {
                $this->additional_address = $data["additional_address"];
            }
            if (isset($data["postal_code"])) {
                $this->postal_code = $data["postal_code"];
            }
            if (isset($data["population"])) {
                $this->population = $data["population"];
            }
            if (isset($data["province"])) {
                $this->province = $data["province"];
            }
            if (isset($data["telephone_number"])) {
                $this->telephone_number = $data["telephone_number"];
            }
            if (isset($data["email"])) {
                $this->email = $data["email"];
            }

            $resp = $this->updateAddress();
            if ($resp) {
                $response = $_responses->response;
                $response["result"] = array(
                    "id" => $this->userId
                );
                return $response;
            } else {
                return $_responses->error_500();
            }
        }
    }

    private function updateAddress()
    {

        $query = "UPDATE shipping_address SET 
            name ='" . $this->name . "', 
            surname = '" . $this->surname . "', 
            country = '" . $this->country . "', 
            address = '" . $this->address . "', 
            additional_address = '" . $this->additional_address . "', 
            postal_code = '" . $this->postal_code . "', 
            population = '" . $this->population . "', 
            province = '" . $this->province . "' ,
            telephone_number = '" . $this->telephone_number . "' ,
            email = '" . $this->email . "' 
            WHERE id = " . $this->userId . "
        ";

        $resp = parent::nonQuery($query);
        if ($resp >= 1) {
            return $resp;
        } else {
            return 0;
        }
    }

    public function delete($json)
    {
        $_responses = new responses;
        $data = json_decode($json, true);

        if (!isset($data["userId"])) {
            return $_responses->error_400();
        } else {

            $this->userId = $data["userId"];
            
            $resp = $this->deleteAddress();
            if ($resp) {
                $response = $_responses->response;
                $response["result"] = array(
                    "id" => $this->userId
                );
                return $response;
            } else {
                return $_responses->error_500();
            }
        }
    }

    private function deleteAddress() {
        $query = "DELETE FROM shipping_address WHERE userId = '" . $this->userId . "'";
        $resp = parent::nonQuery($query);
        if($resp >= 1) {
            return $resp;
        } else {
            return 0;
        }
    }
}
