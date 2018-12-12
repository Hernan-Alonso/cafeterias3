window.addEventListener("DOMContentLoaded",function(){
    let flagCrud = true;
    let messageInfo = document.createElement('p');
	let cafeteriasTab = $s('#cafeterias');
    let tablaDashboard = $s('#listado-dashboard');
    let divAddCafeteria = document.createElement('div');
    divAddCafeteria.className = 'divButton';
    let linkAddCafeteria = document.createElement('a');
    linkAddCafeteria.href = '#';
    linkAddCafeteria.id = "crear-c";
    linkAddCafeteria.innerHTML = 'Añadir Cafeteria';
    let crudForm = $s('#crudForm');
    let divShow = $s('#divShow');
    let tableHeader = $s('#headerTable');
    let tableBody = $s('#bodyTable');
    let divContainer = $s('.text-dashboard');
    let preHeader = $s('.page-bg-wrapper').getElementsByTagName('h1')[0];
    /**
     * Funcion editar cafeteria, recibe como parametro la cafeteria tomada del listado para realizar una peticion ajax y editar la misma en la
     * base de datos. Crea la vista del formulario de edicion a trabajar
     * @param cafeteria
     */
    let editFunction = function(cafeteria){
        //TODO: Eliminar y Editar;
        /***
         * EDIT
         */
        let editarCafeteria = $s('#editar-c');
        editarCafeteria.addEventListener("click",function(){
            let formEdit = document.createElement('form');
            preHeader.innerHTML = 'Editar Cafeteria';
            formEdit.action = '../../Cafeterias_Landing_API/crud-router.php';
            //console.log("clicked me to edit: "+cafeteria.horario_apertura);
            divShow.className = 'listado-oculto';
            messageInfo.innerHTML = '';
            crudForm.className = '';
            crudForm.id = 'editarForm';
            let inputNombre = document.createElement('input');
            inputNombre.name = "nombre";
            inputNombre.type = "text";
            inputNombre.value = cafeteria.nombre;
            let inputDireccion = document.createElement('input');
            inputDireccion.name = "direccion";
            inputDireccion.type = "text";
            inputDireccion.value = cafeteria.direccion;
            let inputEmail = document.createElement('input');
            inputEmail.name = "email";
            inputEmail.type = "email";
            inputEmail.value = cafeteria.email;
            let inputHorarioApertura = document.createElement('input');
            inputHorarioApertura.name = "horarioApertura";
            inputHorarioApertura.type = "number";
            let cafeApertura = cafeteria.horario_apertura;
            let stringApertura = cafeApertura.substring(0,2);
            inputHorarioApertura.value = stringApertura;
            let inputHorarioCierre = document.createElement('input');
            inputHorarioCierre.name = "horarioCierre";
            inputHorarioCierre.type = "number";
            let cafeCierre = cafeteria.horario_cierre;
            let stringCierre = cafeCierre.substring(0,2);
            inputHorarioCierre.value = stringCierre;
            let inputSitioWeb= document.createElement('input');
            inputSitioWeb.name = "sitioWeb";
            inputSitioWeb.type = "text";
            inputSitioWeb.value = cafeteria.sitio_web;
            let inputSucursal = document.createElement('input');
            inputSucursal.name = "sucursal";
            inputSucursal.type = "text";
            inputSucursal.value = cafeteria.sucursal;
            let inputTelefono = document.createElement('input');
            inputTelefono.name = "telefono";
            inputTelefono.type = "number";
            inputTelefono.value = cafeteria.telefono;
            if(flagCrud == true)
            {
                let divContainer = document.createElement('div');
                divContainer.className = "wrapper-form";
                let labelNombre = document.createElement('label');
                labelNombre.innerHTML = "Nombre: ";
                let labelDireccion = document.createElement('label');
                labelDireccion.innerHTML = "Direccion: ";
                let labelEmail = document.createElement('label');
                labelEmail.innerHTML = "Email: ";
                let divFirst = document.createElement('div');
                let labelHorarioApertura = document.createElement('label');
                labelHorarioApertura.innerHTML = "Horario Apertura: ";
                let labelHorarioCierre = document.createElement('label');
                labelHorarioCierre.innerHTML = "Horario Cierre: ";
                let labelSitioWeb= document.createElement('label');
                labelSitioWeb.innerHTML = "Sitio Web: ";
                let divSecond = document.createElement('div');
                let labelSucursal = document.createElement('label');
                labelSucursal.innerHTML = "Sucursal: ";
                let labelTelefono = document.createElement('label');
                labelTelefono.innerHTML = "Telefono: ";
                let divThird = document.createElement('div');
                let divForth= document.createElement('div');
                divForth.className = 'divButton';

                let editButton = document.createElement('input');
                editButton.type = 'submit';
                editButton.value = "Actualizar Cafeteria";

                crudForm.appendChild(formEdit);
                formEdit.appendChild(messageInfo);
                formEdit.appendChild(divContainer);
                formEdit.appendChild(divForth);
                divContainer.appendChild(divFirst);
                divFirst.appendChild(labelNombre);
                divFirst.appendChild(labelDireccion);
                divFirst.appendChild(labelEmail);
                divContainer.appendChild(divSecond);
                divSecond.appendChild(labelHorarioApertura);
                divSecond.appendChild(labelHorarioCierre);
                divSecond.appendChild(labelSitioWeb);
                divContainer.appendChild(divThird);
                divThird.appendChild(labelSucursal);
                divThird.appendChild(labelTelefono);
                labelNombre.appendChild(inputNombre);
                labelDireccion.appendChild(inputDireccion);
                labelEmail.appendChild(inputEmail);
                labelHorarioApertura.appendChild(inputHorarioApertura);
                labelHorarioCierre.appendChild(inputHorarioCierre);
                labelSitioWeb.appendChild(inputSitioWeb);
                labelSucursal.appendChild(inputSucursal);
                labelTelefono.appendChild(inputTelefono);
                divForth.appendChild(editButton);
                flagCrud = false;
            }
            //TODO: Enviar el formulario para EDITAR
            /**
             * evento edicion en el submit. recompila los datos modificados y envia todos los datos a la peticion ajax para realizar las ediciones
             * necesarias en la base de datos.
             */
            formEdit.addEventListener("submit",function(ev){
                ev.preventDefault();
                console.log("editar: "+cafeteria.id);
                if(inputDireccion.value != ''&& inputNombre.value != '' && inputEmail.value != '' && inputHorarioApertura.value != '' && inputHorarioCierre.value != '' && inputSitioWeb.value != '' && inputSucursal.value != '' && inputTelefono.value != '')
                {
                    let dataForm =
                    {
                        idcafeteria: cafeteria.id,
                        nombre: inputNombre.value,
                        direccion: inputDireccion.value,
                        email: inputEmail.value,
                        horarioApertura: inputHorarioApertura.value+':00:00',
                        horarioCierre: inputHorarioCierre.value+':00:00',
                        sitioWeb: inputSitioWeb.value,
                        sucursal: inputSucursal.value,
                        telefono: inputTelefono.value,
                        crud: 'cafeteria'
                    };
                    /**
                     * peticion ajax tipo PUT para realizar la edicion. Envia la accion al router de formulario el cual se encarga de ver que
                     * accion llama del controller y que controller debe llamar.
                     */
                    ajax({
                        method:'PUT',
                        url: '../../Cafeterias_Landing_API/crud-router.php',
                        data: JSON.stringify(dataForm),
                        successCallback: function(rta)
                        {
                            //console.log(JSON.parse(rta));
                            let EditeddataBack = JSON.parse(rta).data;
                            //console.log(EditeddataBack);
                            //messageInfo.innerHTML = 'Se ha actualizado la cafeteria satisfactoriamente';
                            //messageInfo.className = 'msgExito';
                            let divContainerModal = document.createElement("div");
                            divContainerModal.className = "modalWrapper";
                            let divModal = document.createElement("div");
                            divModal.className = "modal";
                            let textoInfo = document.createElement("p");
                            textoInfo.innerHTML = "Cafeteria Actualizada correctamente";
                            let body = document.getElementsByTagName("body")[0];
                            body.appendChild(divContainerModal);
                            divContainerModal.appendChild(divModal);
                            divModal.appendChild(textoInfo);
                            inputNombre.value = "";
                            inputDireccion.value = "";
                            inputEmail.value = "";
                            inputHorarioApertura.value = "";
                            inputHorarioCierre.value = "";
                            inputSitioWeb.value = "";
                            inputSucursal.value = "";
                            inputTelefono.value = "";
                            textoInfo.style.color = "#197328";
                            divModal.style.transition = "all .35s";
                            divModal.style.width = "35%";
                            setTimeout(function() {
                                divContainerModal.innerHTML = "";
                                body.removeChild(divContainerModal);
                            }, 2000);

                            showTable();
                            /*inputNombre.value = EditeddataBack.nombre;
                            inputDireccion.value = EditeddataBack.direccion;
                            inputEmail.value = EditeddataBack.email;
                            inputHorarioApertura.value = EditeddataBack.horario_apertura.substring(0,2);
                            inputHorarioCierre.value = EditeddataBack.horario_cierre.substring(0,2);
                            inputSitioWeb.value = EditeddataBack.sitio_web;
                            inputSucursal.value = EditeddataBack.sucursal;
                            inputTelefono.value = EditeddataBack.telefono;

                            setTimeout(function() {
                                messageInfo.innerHTML = '';
                            }, 3000);*/
                        }
                    });
                }
                else
                {
                    messageInfo.className = "msgErr";
                    messageInfo.innerHTML = 'Existen datos vacios, por favor completar todos los campos.';
                }
            });
        });
    };
    /**
     * funcion borrar para realizar un borrado "LOGICO" en la base de datos de la cafeteria seleccionada.
     * @param cafeteria
     */
    let borrarFunction = function(cafeteria){

        let borrarButton = $s('#borrar-c');
        borrarButton.addEventListener("click",function(){

           // console.log("eliminar: "+cafeteria.id);
            let divContainerModal = document.createElement("div");
            divContainerModal.className = "modalWrapper";
            let divModal = document.createElement("div");
            divModal.className = "modal";
            let textoInfo = document.createElement("p");
            textoInfo.innerHTML = "Estas seguro que queres borrar la cafeteria?";
            let confirmarBorrar = document.createElement("a");
            confirmarBorrar.href = "#";
            confirmarBorrar.innerHTML = "Borrar";
            let cancelarBorrar = document.createElement("a");
            cancelarBorrar.href = "#";
            cancelarBorrar.innerHTML = "Cancelar";
            let body = document.getElementsByTagName("body")[0];
            body.appendChild(divContainerModal);
            divContainerModal.appendChild(divModal);
            divModal.appendChild(textoInfo);
            divModal.appendChild(confirmarBorrar);
            divModal.appendChild(cancelarBorrar);


            cancelarBorrar.addEventListener("click",function(){
                divContainerModal.innerHTML = "";
                body.removeChild(divContainerModal);
            });

            confirmarBorrar.addEventListener("click",function(){
                //console.log("eliminar: "+cafeteria.id);
                let idToDelete = cafeteria.id;
                /**
                 * peticion AJAX Delete enviada al router de formulario para realizar la accion de borrado logico en la base de datos.
                 */
                ajax({
                    method:'DELETE',
                    url: '../../Cafeterias_Landing_API/cafeterias-router.php',
                    data: 'id='+idToDelete,
                    successCallback: function(rta){
                        console.log(rta);
                        textoInfo.innerHTML = "Cafeteria Eliminada Satisfactoriamente";
                        textoInfo.style.color = "#197328";
                        divModal.style.transition = "all .35s";
                        divModal.style.width = "35%";
                        divModal.removeChild(confirmarBorrar);
                        divModal.removeChild(cancelarBorrar);
                        setTimeout(function() {
                            divContainerModal.innerHTML = "";
                            body.removeChild(divContainerModal);
                        }, 2000);

                        showTable();

                    }

                });
            });

        });

    };
    /**
     * Funcion para ver la cafeteria que se clickeo en el listado.
     */
    let assignIDShow = function(){
        /****
         * SEE BY ID
         * @type {NodeList}
         */
        divShow.innerHTML = '';
        let rowItems = tableBody.getElementsByTagName('tr');
        for(let iteration = 0; iteration < rowItems.length;iteration++)
        {
            /**
             * evento click sobre las rows de la tabla del listado de cafeterias para realizar la peticion ajax que traera una cafeteria y
             * generara la vista para que el usuario administrador pueda ver el detalle de la cafeteria que selecciono.
             */
            rowItems[iteration].addEventListener("click",function(){
                let idToSee = this.firstChild.innerHTML;
                /**
                 * peticion ajax para ver la cafeteria seleccionada.
                 */
                ajax({
                    url:'../../Cafeterias_Landing_API/cafeterias-router.php',
                    data: 'id='+idToSee,
                    successCallback: function(rta)
                    {
                        let cafeteria = JSON.parse(rta).data[0];
                        //console.log(cafeteria);
                        tablaDashboard.className = 'listado-oculto';
                        divAddCafeteria.className = 'listado-oculto';
                        divShow.className = 'showID';
                        preHeader.innerHTML = 'Detalle de Cafeteria';
                        let divContainer = document.createElement('div');
                        divContainer.className = 'show-wrapper';
                        let divColumnOne = document.createElement('div');
                        let divColumnTwo = document.createElement('div');
                        let divColumnThree = document.createElement('div');
                        let divColumnFour = document.createElement('div');
                        divColumnFour.className = 'columnFourHeader';
                        let linkEdit = document.createElement('a');
                        linkEdit.href = '#';
                        linkEdit.innerHTML = 'Editar Cafeteria';
                        linkEdit.id = 'editar-c';
                        let linkBorrar = document.createElement('a');
                        linkBorrar.href = '#';
                        linkBorrar.innerHTML = 'Eliminar Cafeteria';
                        linkBorrar.id = 'borrar-c';
                        let divTitleInfo = document.createElement('div');
                        divTitleInfo.className = 'titleInfoShow';
                        let titleInfo = document.createElement('h1');
                        titleInfo.innerHTML = "Datos de la Cafeteria";
                        let divInfoContainerNombre = document.createElement('div');
                        let divInfoContainerDireccion = document.createElement('div');
                        let divInfoContainerEmail= document.createElement('div');
                        let divInfoContainerSitioWeb= document.createElement('div');
                        let divInfoContainerSucursal = document.createElement('div');
                        let divInfoContainerHorario = document.createElement('div');
                        let divInfoContainerTelefono= document.createElement('div');
                        let divInfoContainerValoracion = document.createElement('div');
                        let divInfoContainerVotos = document.createElement('div');

                        let titleNombre = document.createElement('h2');
                        titleNombre.innerHTML = "Nombre:";
                        let titleDireccion = document.createElement('h2');
                        titleDireccion.innerHTML = "Direccion:";
                        let titleEmail = document.createElement('h2');
                        titleEmail.innerHTML = "Email:";
                        let titleSitioWeb = document.createElement('h2');
                        titleSitioWeb.innerHTML = "Sitio Web:";
                        let titleSucursal = document.createElement('h2');
                        titleSucursal.innerHTML = "Sucursal:";
                        let titleHorario = document.createElement('h2');
                        titleHorario.innerHTML = "Horario:";
                        let titleTelefono = document.createElement('h2');
                        titleTelefono.innerHTML = "Telefono:";
                        let titleValoracion = document.createElement('h2');
                        titleValoracion.innerHTML = "Valoracion:";
                        let titleVotos = document.createElement('h2');
                        titleVotos.innerHTML = "Votos:";

                        let textNombre = document.createElement('p');
                        textNombre.innerHTML = cafeteria.nombre;
                        let textDireccion = document.createElement('p');
                        textDireccion.innerHTML = cafeteria.direccion;
                        let textEmail = document.createElement('p');
                        textEmail.innerHTML = cafeteria.email;
                        let textSitioWeb = document.createElement('p');
                        textSitioWeb.innerHTML = cafeteria.sitio_web;
                        let textSucursal = document.createElement('p');
                        textSucursal.innerHTML = cafeteria.sucursal;
                        let textHorario = document.createElement('p');
                        textHorario.innerHTML = cafeteria.horario_apertura+" - "+cafeteria.horario_cierre;
                        let textTelefono = document.createElement('p');
                        textTelefono.innerHTML = cafeteria.telefono;
                        let textValoracion = document.createElement('p');
                        textValoracion.innerHTML = cafeteria.valoracion;
                        let textVotos = document.createElement('p');
                        textVotos.innerHTML = cafeteria.votos;

                        divShow.appendChild(divColumnFour);
                        divColumnFour.appendChild(linkEdit);
                        divColumnFour.appendChild(linkBorrar);
                        divColumnFour.appendChild(divTitleInfo);
                        divTitleInfo.appendChild(titleInfo);

                        divShow.appendChild(divContainer);
                        divContainer.appendChild(divColumnOne);
                        divContainer.appendChild(divColumnTwo);
                        divContainer.appendChild(divColumnThree);

                        divColumnOne.className = 'column-show';
                        divColumnTwo.className = 'column-show';
                        divColumnThree.className = 'column-show';

                        divColumnOne.appendChild(divInfoContainerNombre);
                        divColumnOne.appendChild(divInfoContainerDireccion);
                        divColumnOne.appendChild(divInfoContainerEmail);

                        divInfoContainerNombre.appendChild(titleNombre);
                        divInfoContainerNombre.appendChild(textNombre);
                        divInfoContainerDireccion.appendChild(titleDireccion);
                        divInfoContainerDireccion.appendChild(textDireccion);
                        divInfoContainerEmail.appendChild(titleEmail);
                        divInfoContainerEmail.appendChild(textEmail);

                        divColumnTwo.appendChild(divInfoContainerSitioWeb);
                        divColumnTwo.appendChild(divInfoContainerSucursal);
                        divColumnTwo.appendChild(divInfoContainerHorario);

                        divInfoContainerSitioWeb.appendChild(titleSitioWeb);
                        divInfoContainerSitioWeb.appendChild(textSitioWeb);
                        divInfoContainerSucursal.appendChild(titleSucursal);
                        divInfoContainerSucursal.appendChild(textSucursal);
                        divInfoContainerHorario.appendChild(titleHorario);
                        divInfoContainerHorario.appendChild(textHorario);

                        divColumnThree.appendChild(divInfoContainerTelefono);
                        divColumnThree.appendChild(divInfoContainerValoracion);
                        divColumnThree.appendChild(divInfoContainerVotos);

                        divInfoContainerTelefono.appendChild(titleTelefono);
                        divInfoContainerTelefono.appendChild(textTelefono);
                        divInfoContainerValoracion.appendChild(titleValoracion);
                        divInfoContainerValoracion.appendChild(textValoracion);
                        divInfoContainerVotos.appendChild(titleVotos);
                        divInfoContainerVotos.appendChild(textVotos);
                        editFunction(cafeteria);
                        borrarFunction(cafeteria);
                    }
                });
            });
        }
    };
    /**
     * funcion para ver el listado completo de cafeterias. peticion ajax traera todas las cafeterias que esten con status "Activo"
     */
    var showTable = function (){
        divContainer.innerHTML = '';
        divContainer.appendChild(divAddCafeteria);
        divAddCafeteria.appendChild(linkAddCafeteria);
        divShow.innerHTML = '';
        preHeader.innerHTML = 'Listado de Cafeterias';
        divShow.className = 'listado-oculto';
        divAddCafeteria.className = 'divButton';
        //tablaDashboard.innerHTML = '';
        /**
         * peticion Ajax para traer todas las cafeterias con status "activo"
         */
        ajax({
            url: '../../Cafeterias_Landing_API/cafeterias-router.php',
            successCallback: function(rta){
                flagCrud = true;
                crudForm.innerHTML = "";
                tablaDashboard.className = "";
                let arrayCafeterias = JSON.parse(rta).data;
                // Agregar un flag para saber si esta cargada o no, y para saber si borrar en otros clicks de tablas o no

                let headerID = 'ID';
                let headerNombre = 'Nombre';
                let headerDireccion = 'Direccion';
                let headerEmail = 'Email';
                let headerHorario = 'Sitio Web';
                let headerSitioWeb = 'Sucursal';
                let headerSucursal = 'Telefono';
                let headerTelefono = 'Horario';
                let headerValoracion = 'Valoracion';
                let headerVotos = 'Votos';

                tableHeader.innerHTML = "<tr>"+"<th>"+headerID+"</th>"+
                    "<th>"+headerNombre+"</th>"+
                    "<th>"+headerDireccion+"</th>"+
                    "<th>"+headerEmail+"</th>"+
                    "<th>"+headerHorario+"</th>"+
                    "<th>"+headerSitioWeb+"</th>"+
                    "<th>"+headerSucursal+"</th>"+
                    "<th>"+headerTelefono+"</th>"+
                    "<th>"+headerValoracion+"</th>"+
                    "<th>"+headerVotos+"</th>";


                tableBody.innerHTML = "";
                for(let arr = 0; arr < arrayCafeterias.length; arr++)
                {
                    tableBody.innerHTML += "<tr>"+"<td>"+arrayCafeterias[arr].id+"</td>"+
                        "<td>"+arrayCafeterias[arr].nombre+"</td>"+
                        "<td>"+arrayCafeterias[arr].direccion+"</td>"+
                        "<td>"+arrayCafeterias[arr].email+"</td>"+
                        "<td>"+arrayCafeterias[arr].sitio_web+"</td>"+
                        "<td>"+arrayCafeterias[arr].sucursal+"</td>"+
                        "<td>"+arrayCafeterias[arr].telefono+"</td>"+
                        "<td>"+arrayCafeterias[arr].horario_apertura+"-"+arrayCafeterias[arr].horario_cierre+"</td>"+
                        "<td>"+arrayCafeterias[arr].valoracion+"</td>"+
                        "<td>"+arrayCafeterias[arr].votos+"</td>"+
                        "</tr>";
                }
                assignIDShow();
            }
        });
    };
                //TODO: seeID
    /**
     * evento on click en el link de la barra de navegacion que carga el listado de cafeterias.
     */
    cafeteriasTab.addEventListener("click",function(){
		    showTable();
	});
    //TODO Create;
    /**
     * evento click sobre el boton añadir cafeteria. Crea el formulario de Alta y luego realiza una peticion ajax para generar el alta de la
     * cafeteria.
     */
    linkAddCafeteria.addEventListener("click",function(){
        let formAlta = document.createElement('form');
        formAlta.action = '../../Cafeterias_Landing_API/crud-router.php';
        messageInfo.className = '';
        messageInfo.innerHTML = '';
        preHeader.innerHTML = 'Nueva Cafeteria';
        tablaDashboard.className="listado-oculto";
        divAddCafeteria.className = 'listado-oculto';
        crudForm.className = "";
        let inputNombre = document.createElement('input');
        inputNombre.name = "nombre";
        inputNombre.type = "text";
        let inputDireccion = document.createElement('input');
        inputDireccion.name = "direccion";
        inputDireccion.type = "text";
        let inputEmail = document.createElement('input');
        inputEmail.name = "email";
        inputEmail.type = "email";
        let inputHorarioApertura = document.createElement('input');
        inputHorarioApertura.name = "horarioApertura";
        inputHorarioApertura.type = "number";
        let inputHorarioCierre = document.createElement('input');
        inputHorarioCierre.name = "horarioCierre";
        inputHorarioCierre.type = "number";
        let inputSitioWeb= document.createElement('input');
        inputSitioWeb.name = "sitioWeb";
        inputSitioWeb.type = "text";
        let inputSucursal = document.createElement('input');
        inputSucursal.name = "sucursal";
        inputSucursal.type = "text";
        let inputTelefono = document.createElement('input');
        inputTelefono.name = "telefono";
        inputTelefono.type = "number";
        if(flagCrud == true)
        {
            let divContainer = document.createElement('div');
                divContainer.className = "wrapper-form";
            let labelNombre = document.createElement('label');
                labelNombre.innerHTML = "Nombre: ";
            let labelDireccion = document.createElement('label');
                labelDireccion.innerHTML = "Direccion: ";
            let labelEmail = document.createElement('label');
                labelEmail.innerHTML = "Email: ";
            let divFirst = document.createElement('div');
            let labelHorarioApertura = document.createElement('label');
                labelHorarioApertura.innerHTML = "Horario Apertura: ";
            let labelHorarioCierre = document.createElement('label');
                labelHorarioCierre.innerHTML = "Horario Cierre: ";
            let labelSitioWeb= document.createElement('label');
                labelSitioWeb.innerHTML = "Sitio Web: ";
            let divSecond = document.createElement('div');
            let labelSucursal = document.createElement('label');
                labelSucursal.innerHTML = "Sucursal: ";
            let labelTelefono = document.createElement('label');
                labelTelefono.innerHTML = "Telefono: ";
            let divThird = document.createElement('div');
            let divForth= document.createElement('div');
                divForth.className = 'divButton';

            let createButton = document.createElement('input');
                createButton.type = 'submit';
                createButton.value = "Crear Cafeteria";

                //formAlta.className = '';
            crudForm.appendChild(formAlta);
            formAlta.appendChild(messageInfo);
            formAlta.appendChild(divContainer);
            formAlta.appendChild(divForth);
            divContainer.appendChild(divFirst);
            divFirst.appendChild(labelNombre);
            divFirst.appendChild(labelDireccion);
            divFirst.appendChild(labelEmail);
            divContainer.appendChild(divSecond);
            divSecond.appendChild(labelHorarioApertura);
            divSecond.appendChild(labelHorarioCierre);
            divSecond.appendChild(labelSitioWeb);
            divContainer.appendChild(divThird);
            divThird.appendChild(labelSucursal);
            divThird.appendChild(labelTelefono);
            labelNombre.appendChild(inputNombre);
            labelDireccion.appendChild(inputDireccion);
            labelEmail.appendChild(inputEmail);
            labelHorarioApertura.appendChild(inputHorarioApertura);
            labelHorarioCierre.appendChild(inputHorarioCierre);
            labelSitioWeb.appendChild(inputSitioWeb);
            labelSucursal.appendChild(inputSucursal);
            labelTelefono.appendChild(inputTelefono);
            divForth.appendChild(createButton);
            flagCrud = false;
        }
        /**
         * evento submit del formulario que llama a la peticion Ajax para la posterior insercion en la base de datos.
         */
        formAlta.addEventListener("submit",function(ev){
            ev.preventDefault();
            if(inputDireccion.value != ''&& inputNombre.value != '' && inputEmail.value != '' && inputHorarioApertura.value != '' && inputHorarioCierre.value != '' && inputSitioWeb.value != '' && inputSucursal.value != '' && inputTelefono.value != '')
            {
                let dataForm =
                {
                    nombre: inputNombre.value,
                    direccion: inputDireccion.value,
                    email: inputEmail.value,
                    horarioApertura: inputHorarioApertura.value+':00:00',
                    horarioCierre: inputHorarioCierre.value+':00:00',
                    sitioWeb: inputSitioWeb.value,
                    sucursal: inputSucursal.value,
                    telefono: inputTelefono.value,
                    crud: 'cafeteria'
                };
                /**
                 * Peticion Ajax que envia los datos al router de formulario para posteriormente usar el controlador correspondiente y realizar la
                 * insercion en la base de datos.
                 */
               ajax({
                    method:'POST',
                    url: '../../Cafeterias_Landing_API/crud-router.php',
                    data: JSON.stringify(dataForm),
                    successCallback: function(rta)
                    {
                        // El CONSOLE.LOG ESTA DEVOLVIENDO TRUENULL ???????
                        //console.log(rta);
                        //let dataBack = JSON.parse(rta);
                       // messageInfo.innerHTML = 'Se ha creado la cafeteria satisfactoriamente';
                        //messageInfo.className = 'msgExito';
                        let divContainerModal = document.createElement("div");
                        divContainerModal.className = "modalWrapper";
                        let divModal = document.createElement("div");
                        divModal.className = "modal";
                        let textoInfo = document.createElement("p");
                        textoInfo.innerHTML = "Cafeteria Creada correctamente";
                        let body = document.getElementsByTagName("body")[0];
                        body.appendChild(divContainerModal);
                        divContainerModal.appendChild(divModal);
                        divModal.appendChild(textoInfo);
                        inputNombre.value = "";
                        inputDireccion.value = "";
                        inputEmail.value = "";
                        inputHorarioApertura.value = "";
                        inputHorarioCierre.value = "";
                        inputSitioWeb.value = "";
                        inputSucursal.value = "";
                        inputTelefono.value = "";
                        textoInfo.style.color = "#197328";
                        divModal.style.transition = "all .35s";
                        divModal.style.width = "35%";
                        setTimeout(function() {
                            divContainerModal.innerHTML = "";
                            body.removeChild(divContainerModal);
                        }, 2000);

                        showTable();
                    }
               });
            }
            else
            {
                messageInfo.className = "msgErr";
                messageInfo.innerHTML = 'Existen datos vacios, por favor completar todos los campos.';
            }
        });
    });


});