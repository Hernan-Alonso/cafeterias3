<?php
session_start();
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
</head>

<body>
<div class="overlay">
</div>
  <!-- POP UP PARA LOGIN REGISTER -->
  <div class="main-popup">
  <div class="popup-header">
    <div id="popup-close-button"><a href="#"></a></div>
    <ul>
      <li><a href="#" id="sign-in">Ingresar</a></li>
      <li><a href="#" id="register">Registrarse</a></li>
	  
    </ul>
  </div><!--.popup-header-->
  
  <div class="popup-content">
    <form action="../../Cafeterias_Landing_API/router-form.php" id="login-form" method="post" class="sign-in"">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email">
      <label for="contrasenia">Contraseña:</label>
      <input type="password" id="password">
      <input type="submit" class="submit" id="login" value="Ingresar">
	  <p class="resetpsswrd">¿Olvidaste tu contraseña? Hacé <a href="mailto:info@cafeteriasba.com">click aquí</a> para establecer una nueva.</p>
	  </form>
   
    <form method="post" action="../../Cafeterias_Landing_API/router-form.php" id="register-form" class="register">
      <label for="nombre-register">Nombre:</label>
      <input type="text" name="nombre" id="nombre-register">
      <label for="email-register">Email:</label>
      <input type="email" name="email" id="email-register">
      <label for="password-register">Contraseña:</label>
      <input type="password" name="password" id="password-register">
      <label for="password-confirmation">Confirmar Contraseña:</label>
      <input type="password" name="password-confirmation" id="password-confirmation">
      <input type="submit" class="submit" id="register-btn" value="Crear cuenta">
    </form>
  </div><!--.popup-content-->
</div><!--.main-popup-->
<!-- POP UP PARA LOGIN REGISTER -->
  <div class="wrapper wrapper-page-bg">
  
  <header class="top-fixed" style="padding-top: 0px;"> 

	<div class="topnav" id="myTopnav">
	<div class="container1200max">
	  <a class="logomainmnu" href="../index.php" ><img width="64" src="../img/logoCafeteriasBA.svg" alt="logoCafeteriasBA"></a>
	  <a class="navitem" href="../index.php">Home</a>
	  <a class="navitem" href="about_us.php">Quiénes Somos?</a>
	  <a class="active navitem" href="notas.php">Notas</a>
	  <a class="navitem" href="search.php">Buscar cafeterías</a>
	  <a class="navitem" href="productos.php">Productos</a>	  
	  <?php
      if(isset($_SESSION['Usuario']))
      {
        ?>
    <?php  
      if(isset($_SESSION['Admin']))
      {?>
    <a class="usrmnbtns" title="Mi perfil" href="cpanel/index.php"><?php echo $_SESSION['Usuario']?></a>
    <?php
      }else
      {
        ?>
    <a class="usrmnbtns" title="Mi perfil" href="cpanel/perfilUser.php"><?php echo $_SESSION['Usuario']?></a>
    <?php
      }
    ?>
    <a class="usrmnbtns" title="Desloguearse" href="#"><i id="desloguearse" class="fa fa-sign-out-alt" aria-hidden="true"></i></a>
    <?php
      }else{
        ?>
    <a href="#" class="loginLink">Ingresar</a>

      <?php  
      } 
      ?>
	  <a href="javascript:void(0);" class="iconRspnsv" onclick="myFunction()">
		<i class="fa fa-bars"></i>
	  </a>
	 </div>
  </div>

 
	
  </header>
  
  
</div>
<main>
  <div class="page-bg">
    <div class="page-bg-wrapper">
      <h1>Relajáte y leé nuestras Notas</h1>
      <p>Enterate de las últimas noticias del cafe, de recetas nuevas y de mucho más.</p>
    </div>
  </div>
  <section class="container">
      <div class="row">
          <div class="row">
            <div class="row-header">
              <h2>Listado completo de Notas</h2>
            </div>
          </div>
        <article id="article_wrapper_notes">
          <div class="first-item">
            <div>
              <a href="verNota.php"><img src="../img/notes/note_1.jpg"></a>
            </div>
            <h3> Titulo Nota</h3>
            <hr>
            <div class="desc-recommended">
              <p>Cafeteria: Cafeteria</p>
              <p>Categoria: </p>
              <a href="verNota.php">Leer Nota completa</a>
            </div>
          </div>
          <div class="first-item">
            <div>
              <a href="verNota.php"><img src="../img/notes/note_1.jpg"></a>
            </div>
            <h3> Titulo Nota</h3>
            <hr>
            <div class="desc-recommended">
              <p>Cafeteria: Cafeteria</p>
              <p>Categoria: </p>
              <a href="verNota.php">Leer Nota completa</a>
            </div>
          </div>
          <div class="first-item">
            <div>
              <a href="verNota.php"><img src="../img/notes/note_1.jpg"></a>
            </div>
            <h3> Titulo Nota</h3>
            <hr>
            <div class="desc-recommended">
              <p>Cafeteria: Cafeteria</p>
              <p>Categoria: </p>
              <a href="verNota.php">Leer Nota completa</a>
            </div>
          </div>
        </article>
      </div>
    </section>
</main>
<footer class="footer-landing">
    <div class="container">
      <div class="logoCafeteriasBA">
        <a href="../index.php"><img src="../img/logoCafeteriasBA.svg" alt="logoCafeteriasBA"></a>
      </div>
      <div class="social-media">
        <div>
          <a href="https://www.facebook.com/cafeterias.ba" target="_blank">
            <i class="fab fa-facebook-square"></i>
        </a>
      </div>
      <div>
        <a href="https://www.instagram.com/cafeteriasba/" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
      <div class="copy">
        <p>&copy; Cafeterías BA 2018 &reg;</p>
      </div>
    </div>
  </footer>
<script src="../js/ajax.js"></script>
<script src="../js/nav.js"></script>
<script src="../js/register.js"></script>
<script src="../js/login.js"></script>
<script src="../js/notas.js"></script>
</body>
</html>