<?php
    header("Access-Control-Allow-Origin: *");

    include "config.php";

    $table_name = "registro";
    $column_alias = "reg_alias";
    $column_score = "reg_score";
    $column_avatar = "reg_avatar";
    $column_intentos = "reg_intentos";
    
    $alias = $_GET["alias"];

    $get_user_query = "SELECT * FROM $table_name WHERE $column_alias = '$alias'";

    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($mysqli->connect_errno) exit ("Error de conexión");

    if (!$resultado = $mysqli->query($get_user_query)) die ("Error de consulta");

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_array()) {
            echo "$fila[$column_alias]·$fila[$column_score]·$fila[$column_avatar]·$fila[$column_intentos]|";
        }
    }
    
?>
