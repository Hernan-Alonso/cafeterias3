window.addEventListener('DOMContentLoaded',function(){
  

  
var contenido ='';
	ajax({
            url: 'Cafeterias_Landing_API/router-home.php',
            
            successCallback: function(rta){
              
              let rankingData = JSON.parse(rta);

            $.each(rankingData, function( index, value ) {
            
              contenido =contenido+'<div class="first-item"> <div>\n\
              <a href="views/verCafeteria.php?id='+value.id+'">\n\
              <img src="img/cafeterias/cafe_'+index+'.jpg"></a></div>\n\
              <h3>#'+(index+1)+' '+value.nombre+'</h3><hr><div class="desc-recommended">\n\
              <p>Valoraci&oacute;n: '+armarRanking(value.valoracion)+' </p>  <p>Zona: '+value.sucursal+'</p>\n\
              <p>Telefono: '+value.telefono+'</p><p>Categor&iacute;a: Especialidad</p> </div></div>';

              });
              
              $('#ranking').html(contenido);
            }
        });

	let desloguearse = $s('#desloguearse');

	if(desloguearse !== null){
		desloguearse.addEventListener('click',function(){

		ajax({
				url: '../Cafeterias_Landing_API/end-session.php',
				successCallback: function(rta){
					location.reload();
				}
		});
	});

	}
	

});