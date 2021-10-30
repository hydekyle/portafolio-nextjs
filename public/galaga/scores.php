<?php
    include "config.php";

    $table_name = "registro";
    $column_alias = "reg_alias";
    $column_score = "reg_score";
    $column_avatar = "reg_avatar";
    
    $get_scores = "SELECT * FROM $table_name ORDER BY $column_score DESC LIMIT 9";

    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    if ($mysqli->connect_errno) exit ("Error de conexión");

    if (!$resultado = $mysqli->query($get_scores)) die ("Error de consulta");

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_array()) {
            echo "$fila[$column_alias]·$fila[$column_score]·$fila[$column_avatar]|";
        }
    }
    
?>
