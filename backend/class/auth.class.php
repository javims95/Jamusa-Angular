<?php

require_once "connection/connection.php";
require_once "responses.class.php";

class auth extends connection
{

    public function login($json)
    {
        $_responses = new responses;
        $data = json_decode($json, true);

        if (!isset($data["username"]) || !isset($data["password"])) {
            // error de formato
            return $_responses->error_400();
        } else {
            // formato correcto
            $username = $data["username"];
            $password = $data["password"];
            // $password = parent::encrypt($password);
            $data = $this->getDataUser($username);

            if ($data) {
                // verificar si la contraseña es igual
                if ($password == $data[0]["password"]) {
                    // verifica si el usuario está activo
                    if ($data[0]["status"] == "active") {
                        $verify = $this->insertToken($data[0]["userId"]);
                        if ($verify) {
                            // token guardado
                            $result = $_responses->response;
                            $result["result"] = array(
                                "token" => $verify
                            );
                            return $result;
                        } else {
                            // token no se pudo guardar
                            return $_responses->error_500("Error interno, no hemos podido guardar su token");
                        }
                    } else {
                        // usuario desactivado
                        return $_responses->error_401("Su usuario ha sido desactivado");
                    }
                } else {
                    // error 401, contraseña incorrecta
                    return $_responses->error_401("Contraseña incorrecta");
                }
            } else {
                // el usuario no existe
                return $_responses->error_401("El usuario '$username' no existe");
            }
        }
    }

    private function getDataUser($username)
    {

        $query = "SELECT userId, username, name, surnames, email, password, status FROM users where username = '$username'";
        $data = parent::getData($query);

        if (isset($data[0]["username"])) {
            return $data;
        } else {
            return 0;
        }
    }

    private function insertToken($userId)
    {

        $val = true;
        $token = bin2hex(openssl_random_pseudo_bytes(48, $val));
        $date = date("Y-m-d H:i");
        $status = "active";
        $query = "INSERT INTO user_tokens (userId, token,status, date) VALUES('$userId', '$token', '$status', '$date')";
        $check = parent::nonQuery($query);

        if ($check) {
            return $token;
        } else {
            return false;
        }
    }
}
