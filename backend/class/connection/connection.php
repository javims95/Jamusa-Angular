<?php

class connection
{

    private $server;
    private $user;
    private $password;
    private $database;
    private $port;
    private $connection;

    function __construct()
    {
        $listData = $this->connectionData();
        foreach ($listData as $key => $value) {
            $this->server = $value["server"];
            $this->user = $value["user"];
            $this->password = $value["password"];
            $this->database = $value["database"];
            $this->port = $value["port"];
        }
        $this->connection = new mysqli($this->server, $this->user, $this->password, $this->database, $this->port);
        if ($this->connection->connect_errno) {
            echo "Error de conexión";
            die();
        }
    }

    private function connectionData()
    {
        $path = dirname(__FILE__);
        $jsonData = file_get_contents($path . "/" . "config");
        return json_decode($jsonData, true);
    }

    private function convertUTF8($array)
    {
        array_walk_recursive($array, function (&$item, $key) {
            if (!mb_detect_encoding($item, 'utf-8', true)) {
                $item = utf8_encode($item);
            }
        });
        return $array;
    }

    public function getData($sqlStr)
    {
        $results = $this->connection->query($sqlStr);
        $resultArray = array();

        foreach ($results as $key) {
            $resultArray[] = $key;
        }
        return $this->convertUTF8($resultArray);
    }

    public function nonQuery($sqlStr)
    {
        $results = $this->connection->query($sqlStr);
        return $this->connection->affected_rows;
    }

    // Insert
    public function nonQueryId($sqlStr)
    {
        $results = $this->connection->query($sqlStr);
        $rows = $this->connection->affected_rows;
        if ($rows >= 1) {
            return $this->connection->insert_id;
        } else {
            return 0;
        }
    }

    // Encrypt
    protected function encrypt($string)
    {
        return md5($string);
    }
}
