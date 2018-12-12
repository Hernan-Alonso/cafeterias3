<?php

require '../../autoload.php';
use CafeteriasBA\Session\Session;


?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no">
  <title>Cafeterias BA</title>
  <link href="../css/default.css" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>

<body>
  <div class="wrapper wrapper-page-bg">
  <div class="wrapper wrapper-page-bg">
  <header class="top-fixed"> 
  <div class="topnav" id="myTopnav">
  <div class="container1200max">

    <?php
    
        if($_SESSION['Rol'] == 1){
            ?>
    
    <a id="dashboard" href="index.php"><img src="../img/logo-elegido-byn.png" alt="logoCafeteriasBA"></a>
        <a class="navitem" href="../index.php">Home</a>
    <a id="cafeterias" href="#">Abm Cafeterías</a>
    <a id="sugerencias" href="#">Abm Sugerencias</a>    
    <a id="productos" href="#">Abm Productos</a>
    <a id="usuarios" href="#">Abm Usuarios</a>
    
    <?php
        }else if($_SESSION['Rol'] == 2){
    ?>
    
    <a id="dashboard" href="index.php"><img src="../img/logo-elegido-byn.png" alt="logoCafeteriasBA"></a>
        <a class="navitem" href="../index.php">Home</a>
    <a id="cafeterias" href="perfilUser.php">Mis datos</a>
    
    
    <?php
        }
    ?>
    
     <a class="usrmnbtns" title="Desloguearse" href="#"><i id="desloguearse" class="fa fa-sign-out-alt" aria-hidden="true"></i></a>
    <a href="javascript:void(0);" class="iconRspnsv" onclick="myFunction()">
    <i class="fa fa-bars"></i>
    </a>
    <!-- Este botón ingresar debe ser visible si el usuario no está logueado <a class="usrmnbtns loginLink" title="Ingresar" href="#">Ingresar</a>  -->
    <span class="clearflt"></span> 
   </div>
  </div>
  
  </header>  
  </div>