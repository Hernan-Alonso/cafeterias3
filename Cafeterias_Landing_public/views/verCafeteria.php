<?php
//use CafeteriasBA;

include_once './header-public.php';

?>
<!-- @FIXME LUEGO SACAR ESTE ESTILO INLINE-->

<style>

  .singlecommentgrp{
      display: none;
  }
</style>
<!-- @FIXME -->
<main>

  <input type="hidden" id="cafeteria_id" value="<?php echo $_GET['id'] ?>">

  <div class="page-bg">
    <div class="page-bg-wrapper">
      <h1 id="titulo"></h1>
      <!--p>Especialistas en caf&eacute; y un ambiente t�nico</p-->
    </div>
  </div>
  <section class="container vercafeteriasection">
    <div class="row text-row margintop10">
      <div class="text-container aboutus margintop40 container1200max">
        <div class="rowcont">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb navegacionResumen">
              <li class="breadcrumb-item"><a href="../index.php">Home</a></li>
              <li class="breadcrumb-item"><a href="search.php">Cafeter&eacute;as</a></li>
              <li class="breadcrumb-item" aria-current="page">Especialidad</li>
            </ol>
          </nav>
          <div class="rowfichacafe">
            <div class="col6 contfichacafe">

            </div>
            <div class="col6 detailcafe">
              <div class="horarios">

              </div>
              <div class="clearflt"></div>
            </div>
            <div class="clearflt"></div>
          </div>
          <div class="rowtxtstmapa">
            <div class="col6">
              <p id="descripcion"></p>
            </div>		
            <div class="col6">
              <iframe class="mapavercafeteria" 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.71348871307!2d-58.46150218530834!3d-34.56080898047058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5d4c4929eb1%3A0xd069655c700ba877!2sAll+Saints+Cafe!5e0!3m2!1ses-419!2sar!4v1540520105926"
                      width="100%" height="300" frameborder="0" allowfullscreen></iframe>
            </div>	
            <div class="clearflt"></div>				
          </div>

          <div class="rowcontainertxt" style="display:none;">
            <div class="co12">
              <h2>Cursos especializados dictados por sus propios baristas</h2>
              <p>All Saints Caf&eacute; cree en la calidad sobre todas las cosas. Compran directamente a peque&ntilde;os podructores cafeteros alrededor del mundo. El caf&eacute; utilizado 
                proviene de microlotes de origen único, en lo posible org&aacute;nicos y sustentables, de la mas alta calidad puntuados en cata de 84 puntos en adelante.</p>
              <p>El caf&eacute; es tostado siguiendo los m&aacute;s rigurosos st&aacute;ndares de calidad.</p>
              <p>El resultado se disfruta en cada taza. Cuentan con una m&aacute;quina de tostar caf&eacute; Probat Roadster, marca m&aacute;s antigua y lider en el segmento de torrefacci&oacute;n 
                y microtorrefacci&oacute;n. De origen aleman, es utilizada por los principales speciality coffee shops del mundo.</p>
            </div>		
            <div class="clearflt"></div>				
          </div>

          <!-- slider imgs -->			
          <div class="rowcontainertxt" style="display:none;">

            <div class="co12">


              <h2>Im&aacute;genes</h2>
              
              <section id="photostack-1" class="photostack">
                <div>
                  <figure>
                    <!-- a href="#" class="photostack-img" --><img src="../img/slider/1.jpg" alt="img01"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/2.jpg" alt="img02"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/3.jpg" alt="img03"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/4.jpg" alt="img04"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/5.jpg" alt="img05"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/6.jpg" alt="img06"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/7.jpg" alt="img07"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/8.jpg" alt="img08"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/9.jpg" alt="img09"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/10.jpg" alt="img10"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/11.jpg" alt="img11"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/12.jpg" alt="img12"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure>
                    <img src="../img/slider/13.jpg" alt="img13"/>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                  <figure data-dummy>
                    <img src="../img/slider/14.jpg" alt="img14"/></a>
                    <figcaption>
                      <h2 class="photostack-title">All saints caf&eacute;</h2>
                    </figcaption>
                  </figure>
                </div>
              </section>	

            </div>		
            <div class="clearflt"></div>				
          </div>
          <!-- slider imgs -->


          <div class="rowcontainertxt" style="display:none;">
            <h2>Promociones disponibles</h2>
            <div class="col6">
              <div class="promosC">
                <div>
                  <img alt="Cafeterias BA" src="http://cafeteriasba.com/img/promo01.jpg">  
                  <div class="txtPromo"><p>Texto Promo</p></div>
                </div>
              </div>
            </div>	
            <div class="col6">
              <div class="promosC">
                <div>
                  <img alt="Cafeterias BA" src="http://cafeteriasba.com/img/promo01.jpg">  
                  <div class="txtPromo"><p>Texto Promo</p></div>
                </div>
              </div>
            </div>		
            <div class="clearflt"></div>				
          </div>


          <input type="hidden" value="<?php echo($_SESSION['Id']) ?>" name="ui" id="ui">

          <div class="rowcontainertxt">
            <div class="container">
               <?php
               
                if (isset($_SESSION['Usuario'])) {
                    ?>
              <h2>Carg&aacute; tu rese&ntilde;a</h2>

              <div class="bloqueResena">
               
                    <!--  form cargar rese&ntilde;a -->									
                    <div class="resena">
                      
                      <form action="../../Cafeterias_Landing_API/cafeterias-router.php"  action="POST" id="insertcomentario">
                        <div class="textareaW" name="comentario">
                          <textarea id="comentario" placeholder="Escribi una rese&ntilde;a sobre tu experiencia en esta cafeteria. Que cosa probaste? que fue lo que mas te gusto?" rows="7"></textarea>
                          <p id="error_comen"></p>
                        </div>
                        <div class="califyprecio">
                          <p class="starasignbox"><b>Asign&aacute; una calificaci&oacute;n:</b> 
                          <!--  <i class="starspoints far fa-star"></i>
                            <i class="starspoints far fa-star"></i>
                            <i class="starspoints far fa-star"></i>
                            <i class="starspoints far fa-star"></i>
                            <i class="starspoints far fa-star"></i>
                           
                          @FIXME hacer el js para que sea con estrellas -->
                            <select name="calificacion" id="calificacion">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select></p>

     <!--<p><b>A&ntilde;adir foto a la rese&ntilde;a: </b><input class="loadimgs" placeholder="" name="myFile" type="file">-->
                          <div class="boxbtnvmas">


                            <div class="normal-search">
                              <div class="paddingleft0 width250">
                                <button id="search-input" type="submit" class="searchbarbutton heightsearch">Cargar Rese&ntilde;a</button>
                              </div>
                            </div>


                          </div>
                          </p>
                          <div class="clear"></div>
                        </div>
                      </form>
                      
                    </div>
    <?php
}
?>
                <!--  form cargar rese&ntilde;a -->								

                <!--  cometnarios registrados -->						
                <div class="commentsgroud" id="commentsgroup">

                </div>
               
                <!--  cometnarios registrados -->					
              </div>

            </div>				


          </div>


        </div>
      </div>
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
      <p>&copy; Cafeter&eacute;asBA 2018 - Escuela Davinci &reg;</p>
    </div>
  </div>
</footer>


<script src="../js/ajax.js"></script>
<script src="../js/funciones.js"></script>
<script src="../js/nav.js"></script>

<script src="../js/cafeteria-dashboard.js"></script>
<script src="../js/register.js"></script>
<script src="../js/login.js"></script>
<script src="../js/logout.js"></script>


<script src="../js/slider_classie.js"></script>
<script src="../js/slider_photostack.js"></script>
<script>
// [].slice.call( document.querySelectorAll( '.photostack' ) ).forEach( function( el ) { new Photostack( el ); } );

    new Photostack(document.getElementById('photostack-1'), {
      callback: function (item) {
        //console.log(item)
      }
    });
    new Photostack(document.getElementById('photostack-2'), {
      callback: function (item) {
        //console.log(item)
      }
    });
    new Photostack(document.getElementById('photostack-3'), {
      callback: function (item) {
        //console.log(item)
      }
    });
</script>

</body>
</html>