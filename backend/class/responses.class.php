<?php

class responses
{

    public $response = [
        "status" => "ok",
        "result" => array()
    ];

    public function error_200($valor = "Datos incorrectos")
    {
        $this->response["status"] = "error";
        $this->response["result"] = array(
            "error_id" => "200",
            "error_msg" => $valor
        );
        return $this->response;
    }

    public function error_400()
    {
        $this->response["status"] = "error";
        $this->response["result"] = array(
            "error_id" => "400",
            "error_msg" => "No se puede procesar la solicitud porque tiene un formato incorrecto o es incorrecta."
        );
        return $this->response;
    }

    public function error_401($valor = "La informacion de autenticacion necesaria falta o no es valida para el recurso.")
    {
        $this->response["status"] = "error";
        $this->response["result"] = array(
            "error_id" => "401",
            "error_msg" => $valor
        );
        return $this->response;
    }

    public function error_405()
    {
        $this->response["status"] = "error";
        $this->response["result"] = array(
            "error_id" => "405",
            "error_msg" => "Metodo no permitido"
        );
        return $this->response;
    }

    public function error_500($valor = "Se produjo un error interno de servidor al procesar la solicitud.")
    {
        $this->response["status"] = "error";
        $this->response["result"] = array(
            "error_id" => "401",
            "error_msg" => $valor
        );
        return $this->response;
    }
}
