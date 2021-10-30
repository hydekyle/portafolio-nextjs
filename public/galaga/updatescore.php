<?php
    header("Access-Control-Allow-Origin: *");
    
    include "config.php";

    $alias = $_GET["alias"];
    $score = $_GET["score"];
    $token = $_GET["token"];

    $table_name = "registro";
    $column_alias = "reg_alias";
    $column_score = "reg_score";

    $update_score_query = "UPDATE $table_name SET $column_score = $score WHERE $column_alias = '$alias'";
    $get_user_query = "SELECT * FROM $table_name WHERE $column_alias = '$alias'";

    $valid_token = strlen($alias) * intval($score) + 7;
    if (intval($token) !== $valid_token) die ("Token no valido");

    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($mysqli->connect_errno) exit("Error de conexión");

    if (!$resultado = $mysqli->query($get_user_query)) die("Error de consulta");

    if ($resultado->num_rows === 0) {
        die("No se encontró al usuario");
    } else {
        $storedUser = $resultado->fetch_array();
	if ($storedUser[$column_score] < $score) {
		if ($updated_user = $mysqli->query($update_score_query)) die ("Usuario Updated");
	}else die ("Record no superado");

    }

?>
