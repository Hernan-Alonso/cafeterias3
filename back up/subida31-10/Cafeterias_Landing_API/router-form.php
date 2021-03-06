<?php

/* print_r($_SERVER['REQUEST_METHOD']); */

//header('Content-Type: application/json; charset=utf-8');
//require "../autoload.php";
require "autoload.php";

use \CafeteriasBA\Controllers\UsuarioController;
use \CafeteriasBA\Core\View;
use \CafeteriasBA\Validation\Validator;

$jsonData = file_get_contents('php://input');

$postData = json_decode($jsonData, true);
$email = $postData['email'];
$password = $postData['passwd'];
$passwordConfirm = $postData['passwdConfirm'];

/**
 * se fija que los campos mail y contrase&ntilde;a no esten vacios.
 */

if ($email != "" && $password != "" ) {
    /**
     * si el nombre esta seteado, entones es un Registro. (no implementado)
     */
    if (isset($postData['nombre'])) {
        
        $nombre = $postData['nombre'];
        
        $data = [
            'email' => $email,
            'password' => $password,
            'nombre' => $nombre
        ];
        
        $validator = new Validator($data, [
            'email' => ['required', 'min:8' ,'email'],
            'password' => ['required', 'min:6'] ,           
            'nombre' => ['required', 'min:6']            
        ]);
        
        if($validator->errors){
             
            $salida = [
                "status" => 0,
                "errores" => $validator->errors
            ];

            View::render($salida);
  
        }else{
         
            UsuarioController::Register($data);
            
        }
        
        
    } else {
        
        $data = [
            'email' => $email,
            'password' => $password,
        ];
        
        UsuarioController::Login($data);
        // UsuarioController::{$action}($data);
    }
    
} else {
    
    $salida = [
        "status" => 0,
        "mensaje" => "Los campos estan vacios Completar",
    ];

    View::render($salida);
}