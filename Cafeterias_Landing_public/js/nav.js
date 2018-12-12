document.addEventListener("DOMContentLoaded",function(){
  function $s(CssSelector)
  {
    return document.querySelector(CssSelector);
  }
  var overlay = $s('.overlay');
  var mainPopUp = $s('.main-popup');
  var signIn = $s('#sign-in');
  var register = $s('#register');
  var formSignIn = $s('.sign-in');
  var formRegister = $s('.register');
  var closePopUp = $s('#popup-close-button');
  
  var loginLink = $s('.loginLink');
  
  var header = $s('.headmnhome');
  var logo = $s('.logoCafeteriasBA');
  var last_known_scroll_position = 0;
  var ticking = false;

    /**
     * evento que modifica el CSS del navbar para que los call to action esten siempre visibles
     * @param scroll_pos
     */
  function doSomething(scroll_pos) {
  // Hacer algo con la posición del scroll
    if(scroll_pos >= 272)
    {
      if(header != null){
      header.className = 'top-fixed';
      logo.style.display = 'none';
      }
    }else{
      if(header != null){
      header.className = 'headmnhome';
      logo.style.display = 'block';
    }
    }
  }

    /**
     * Se ejecuta la anterior funcion al realizar "scroll" vertical de la pagina
     */
  window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
      });
    }
   ticking = true;
  });
    /***
     * evento click en el que se abre el modal para realizar Login o Registrarse.
     */
    if(loginLink !== null){
  loginLink.addEventListener("click",function(){
    overlay.classList.add('visible');
    mainPopUp.classList.add('visible');
    signIn.classList.add('active');
    register.classList.remove('active');
    formRegister.classList.remove('move-left');
    formSignIn.classList.remove('move-left');
  });
    }
  overlay.addEventListener("click",function(){
    this.classList.remove('visible');
    mainPopUp.classList.remove('visible');
  });
  closePopUp.addEventListener("click",function(e){
    e.preventDefault();
    overlay.classList.remove('visible');
    mainPopUp.classList.remove('visible');
  });
  signIn.addEventListener("click",function(){
    signIn.classList.add('active');
    register.classList.remove('active');
    formSignIn.classList.remove('move-left');
    formRegister.classList.remove('move-left');
  });
  register.addEventListener("click",function(){
    signIn.classList.remove('active');
    register.classList.add('active');
    formSignIn.classList.add('move-left');
    formRegister.classList.add('move-left');
  });
});




/* comportamiento nuevo menu */
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
/* comportamiento nuevo menu */