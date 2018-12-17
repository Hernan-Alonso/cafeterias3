<?php

require "autoload.php";
header('Content-Type: application/json; charset=utf-8');
$jsonData = file_get_contents('php://input');
$postData = json_decode($jsonData, true);
$method = $_SERVER['REQUEST_METHOD'];
use \CafeteriasBA\Controllers\CafeteriaController;
use \CafeteriasBA\Controllers\UsuarioController;
use \CafeteriasBA\Controllers\ProductoController;
//use \CafeteriasBA\Controllers\NotaController;
/**
	* Switch que analiza el method request. POST, PUT o PATCH. Analiza en el envio del postData de que "crud" viene para llamar al controller
	* necesario (cafeteria/usuario/producto/nota) y realiza la accion necesaria en la base de datos.
	*/
switch ($method)
{
		case 'POST':
				switch($postData['crud'])
				{
						case 'cafeteria':
								CafeteriaController::Create($postData);
							break;
						case 'nota':
								$output =
									[
										'status' => 'n',
										'message' => 'ALTA PARA NOTA',
									];
								break;
						case 'usuario':
								UsuarioController::Create($postData);
								$output =
									[
										'status' => 'u',
										'message' => 'ALTA PARA USUARIO',
									];
								break;
						case 'producto':
								ProductoController::Create($postData);
								$output =
									[
										'status' => 'p',
										'message' => 'ALTA PARA PRODUCTO',
									];
								break;

				}
		break;
		case 'PUT':
				switch($postData['crud'])
				{
						case 'cafeteria':
								CafeteriaController::Update($postData);
								break;
						case 'nota':
								$output =
									[
										'status' => 'n',
										'message' => 'ALTA PARA NOTA',
									];
								break;
						case 'usuario':
								UsuarioController::Update($postData);
								$output =
									[
										'status' => 'u',
										'message' => 'ALTA PARA USUARIO',
									];
								break;
						case 'producto':
								ProductoController::Update($postData);
								$output =
									[
										'status' => 'p',
										'message' => 'ALTA PARA PRODUCTO',
									];
								break;

				}
				break;

}