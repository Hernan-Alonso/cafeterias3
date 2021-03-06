window.addEventListener("DOMContentLoaded",function(){

    let rolesCompletas;

    /***
     * Funcion AJAX para traer todos los Roles disponibles
     */
    ajax({
        url:'../../Cafeterias_Landing_API/rol-router.php',
        successCallback: function(rta)
        {
            let ajaxData = JSON.parse(rta);

            rolesCompletas = ajaxData.data;
        }
    });

    let flagCrud = true;
    let messageInfo = document.createElement('p');
    let usuariosTab = $s('#usuarios');
    let tablaDashboard = $s('#listado-dashboard');
    let divAddUsuario = document.createElement('div');
    divAddUsuario.className = 'divButton';
    let linkAddUsuario = document.createElement('a');
    linkAddUsuario.href = '#';
    linkAddUsuario.id = "crear-u";
    linkAddUsuario.innerHTML = 'Añadir Usuario';
    let crudForm = $s('#crudForm');
    let divShow = $s('#divShow');
    let tableHeader = $s('#headerTable');
    let tableBody = $s('#bodyTable');
    let divContainer = $s('.text-dashboard');
    let preHeader = $s('.page-bg-wrapper').getElementsByTagName('h1')[0];
    /***
     * Function EditarUsuario - Edita en la base de datos los nuevos valores para el usuario
     * @param usuario
     */
    let editFunction = function(usuario){
        //TODO: Eliminar y Editar;
        /***
         *  Creacion de bloque para editar y completar los campos acordes al usuario dado.
         */
            console.log(usuario);
        let editarUsuario = $s('#editar-u');
        editarUsuario.addEventListener("click",function(){
            let formEdit = document.createElement('form');
            preHeader.innerHTML = 'Editar Usuario';
            formEdit.action = '../../Cafeterias_Landing_API/crud-router.php';
            //console.log("clicked me to edit: "+usuario.horario_apertura);
            divShow.className = 'listado-oculto';
            messageInfo.innerHTML = '';
            crudForm.className = '';
            crudForm.id = 'editarForm';
            let inputNombre = document.createElement('input');
            inputNombre.name = "nombre";
            inputNombre.type = "text";
            inputNombre.value = usuario.nombre;
            let inputApellido = document.createElement('input');
            inputApellido.name = "apellido";
            inputApellido.type = "text";
            inputApellido.value = usuario.apellido;
            let inputRol = document.createElement('select');
            inputRol.name = "rol";
            if(flagCrud == true)
            {
                let divContainer = document.createElement('div');
                divContainer.className = "wrapper-form";
                let labelNombre = document.createElement('label');
                labelNombre.innerHTML = "Nombre: ";
                let labelApellido = document.createElement('label');
                labelApellido.innerHTML = "Apellido: ";
                let labelRol = document.createElement('label');
                labelRol.innerHTML = "Rol: ";
                let divFirst = document.createElement('div');
                let divForth= document.createElement('div');
                divForth.className = 'divButton';

                let editButton = document.createElement('input');
                editButton.type = 'submit';
                editButton.value = "Actualizar Usuario";

                crudForm.appendChild(formEdit);
                formEdit.appendChild(messageInfo);
                formEdit.appendChild(divContainer);
                formEdit.appendChild(divForth);
                divContainer.appendChild(divFirst);
                divFirst.appendChild(labelNombre);
                divFirst.appendChild(labelApellido);
                divFirst.appendChild(labelRol);
                divFirst.style.width = "100%";
                labelNombre.appendChild(inputNombre);
                labelApellido.appendChild(inputApellido);
                labelRol.appendChild(inputRol);
                inputRol.className = 'select-crud';
                for(let i = 0; i<rolesCompletas.length;i++)
                {
                    let optionRol = document.createElement('option');
                    optionRol.value = rolesCompletas[i].id_rol_usuario;
                    optionRol.innerHTML = rolesCompletas[i].descripcion;
                    inputRol.appendChild(optionRol);
                    if(rolesCompletas[i].id_rol_usuario == usuario.fk_rol_usuario)
                    {
                        optionRol.selected = true;
                    }
                    else
                    {
                        optionRol.selected = false;
                    }
                }
                divForth.appendChild(editButton);
                flagCrud = false;
            }
            //TODO: Enviar el formulario para EDITAR
            /***
             * Envio de formulario de Edicion, verificacion que los campos no esten vacios.
             */
            formEdit.addEventListener("submit",function(ev){
                ev.preventDefault();
                // console.log("editar: "+usuario.id);
                if(inputApellido.value != ''&& inputNombre.value != '' && inputRol.value != '')
                {
                    let dataForm =
                    {
                        idusuario: usuario.id,
                        nombre: inputNombre.value,
                        apellido: inputApellido.value,
                        fk_rol_usuario: inputRol.value,
                        crud: 'usuario'
                    };
                    // console.log(dataForm);
                    /***
                     * Function Ajax para hacer UPDATE en la base de datos
                     */
                    ajax({
                        method:'PUT',
                        url: '../../Cafeterias_Landing_API/crud-router.php',
                        data: JSON.stringify(dataForm),
                        successCallback: function(rta)
                        {

                            let EditeddataBack = JSON.parse(rta).data;
                            //console.log(EditeddataBack);
                            let divContainerModal = document.createElement("div");
                            divContainerModal.className = "modalWrapper";
                            let divModal = document.createElement("div");
                            divModal.className = "modal";
                            let textoInfo = document.createElement("p");
                            textoInfo.innerHTML = "Usuario Actualizado correctamente";
                            let body = document.getElementsByTagName("body")[0];
                            body.appendChild(divContainerModal);
                            divContainerModal.appendChild(divModal);
                            divModal.appendChild(textoInfo);
                            inputNombre.value = "";
                            inputApellido.value = "";
                            textoInfo.style.color = "#197328";
                            divModal.style.transition = "all .35s";
                            divModal.style.width = "35%";
                            setTimeout(function() {
                                divContainerModal.innerHTML = "";
                                body.removeChild(divContainerModal);
                            }, 2000);

                            showTableUsuarios();
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
    /***
     * Function EliminarUsuario - Confirmacion y eliminacion de Usuario al hacer click en el boton
     * @param usuario
     */
    let borrarFunction = function(usuario){

        let borrarButton = $s('#borrar-u');
        borrarButton.addEventListener("click",function(){

            // console.log("eliminar: "+usuario.id);
            let divContainerModal = document.createElement("div");
            divContainerModal.className = "modalWrapper";
            let divModal = document.createElement("div");
            divModal.className = "modal";
            let textoInfo = document.createElement("p");
            textoInfo.innerHTML = "Estas seguro que queres borrar el usuario?";
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
                //console.log("eliminar: "+usuario.id);
                let idToDelete = usuario.id;
                ajax({
                    method:'DELETE',
                    url: '../../Cafeterias_Landing_API/usuarios-router.php',
                    data: 'id='+idToDelete,
                    successCallback: function(rta){
                        console.log(rta);
                        textoInfo.innerHTML = "Usuario Eliminado Satisfactoriamente";
                        textoInfo.style.color = "#197328";
                        divModal.style.transition = "all .35s";
                        divModal.style.width = "35%";
                        divModal.removeChild(confirmarBorrar);
                        divModal.removeChild(cancelarBorrar);
                        setTimeout(function() {
                            divContainerModal.innerHTML = "";
                            body.removeChild(divContainerModal);
                        }, 2000);

                        showTableUsuarios();

                    }

                });
            });

        });

    };
    /**
     * funcion verUsuario - En base al clik del usuario realiza la peticion AJAX para traer un unico usuario y mostrarlo
     */
    let verUsuarioId = function()
    {
        divShow.innerHTML = '';
        let rowItems = tableBody.getElementsByTagName('tr');
        for(let iteracion = 0; iteracion < rowItems.length;iteracion++)
        {
            rowItems[iteracion].addEventListener("click",function(){
                let idToSee = this.firstChild.innerHTML;
                //console.log(idToSee);
                /***
                 * Peticion AJAX para mostrar usuario clickeado y creacion de estructura HTML
                 */
                ajax({
                    url:'../../Cafeterias_Landing_API/usuarios-router.php',
                    data: 'id='+idToSee,
                    successCallback: function(rta)
                    {
                        //console.log(JSON.parse(rta).data[0]);
                        let usuario = JSON.parse(rta).data[0];
                        tablaDashboard.className = 'listado-oculto';
                        divAddUsuario.className = 'listado-oculto';
                        divShow.className = 'showID';
                        preHeader.innerHTML = 'Detalle de Usuario';
                        let divContainer = document.createElement('div');
                        divContainer.className = 'show-wrapper';
                        let divColumnOne = document.createElement('div');
                        let divColumnTwo = document.createElement('div');
                        let divColumnFour = document.createElement('div');
                        divColumnFour.className = 'columnFourHeader';
                        let linkEdit = document.createElement('a');
                        linkEdit.href = '#';
                        linkEdit.innerHTML = 'Editar Usuario';
                        linkEdit.id = 'editar-u';
                        let linkBorrar = document.createElement('a');
                        linkBorrar.href = '#';
                        linkBorrar.innerHTML = 'Eliminar Usuario';
                        linkBorrar.id = 'borrar-u';
                        let divTitleInfo = document.createElement('div');
                        divTitleInfo.className = 'titleInfoShow';
                        let titleInfo = document.createElement('h1');
                        titleInfo.innerHTML = "Datos del Usuario";
                        let divInfoContainerNombre = document.createElement('div');
                        let divInfoContainerApellido = document.createElement('div');
                        let divInfoContainerEmail = document.createElement('div');
                        let divInfoContainerFechaRegistro = document.createElement('div');
                        let divInfoContainerRolUsuario = document.createElement('div');

                        let titleNombre = document.createElement('h2');
                        titleNombre.innerHTML = "Nombre:";
                        let titleApellido = document.createElement('h2');
                        titleApellido.innerHTML = "Apellido:";
                        let titleEmail = document.createElement('h2');
                        titleEmail.innerHTML = "Email:";
                        let titleFechaRegistro = document.createElement('h2');
                        titleFechaRegistro.innerHTML = "Fecha de Registro:";
                        let titleRolUsuario = document.createElement('h2');
                        titleRolUsuario.innerHTML = "Rol:";

                        let textNombre = document.createElement('p');
                        textNombre.innerHTML = usuario.nombre;
                        let textApellido = document.createElement('p');
                        textApellido.innerHTML = usuario.apellido;
                        let textEmail = document.createElement('p');
                        textEmail.innerHTML = usuario.email;
                        let textFechaRegistro = document.createElement('p');
                        textFechaRegistro.innerHTML = usuario.fecha_registro;
                        let textRolUsuario = document.createElement('p');
                        let rolValue = '';
                        for(let x = 0; x<rolesCompletas.length;x++)
                        {
                            //console.log(rolesCompletas[x].id_rol_usuario + " "+ arrayUsuarios[arr].fk_rol_usuario );
                            if(rolesCompletas[x].id_rol_usuario == usuario.fk_rol_usuario)
                            {
                                rolValue = rolesCompletas[x].descripcion;
                            }
                        }
                        textRolUsuario.innerHTML = rolValue;

                        divShow.appendChild(divColumnFour);
                        divColumnFour.appendChild(linkEdit);
                        divColumnFour.appendChild(linkBorrar);
                        divColumnFour.appendChild(divTitleInfo);
                        divTitleInfo.appendChild(titleInfo);

                        divShow.appendChild(divContainer);
                        divContainer.appendChild(divColumnOne);
                        divContainer.appendChild(divColumnTwo);

                        divColumnOne.className = 'column-show';
                        divColumnTwo.className = 'column-show';

                        divColumnOne.style.width = "50%";
                        divColumnTwo.style.width = "50%";

                        divColumnOne.appendChild(divInfoContainerNombre);
                        divColumnOne.appendChild(divInfoContainerApellido);
                        divColumnOne.appendChild(divInfoContainerEmail);

                        divInfoContainerNombre.appendChild(titleNombre);
                        divInfoContainerNombre.appendChild(textNombre);
                        divInfoContainerApellido.appendChild(titleApellido);
                        divInfoContainerApellido.appendChild(textApellido);
                        divInfoContainerEmail.appendChild(titleEmail);
                        divInfoContainerEmail.appendChild(textEmail);

                        divColumnTwo.appendChild(divInfoContainerFechaRegistro);
                        divColumnTwo.appendChild(divInfoContainerRolUsuario);

                        divInfoContainerFechaRegistro.appendChild(titleFechaRegistro);
                        divInfoContainerFechaRegistro.appendChild(textFechaRegistro);
                        divInfoContainerRolUsuario.appendChild(titleRolUsuario);
                        divInfoContainerRolUsuario.appendChild(textRolUsuario);

                        editFunction(usuario);
                        borrarFunction(usuario);
                    }
                });
            });
        }
    };
    /**
     * Function para listar los usuario encontrados en la Base de datos que esten ACTIVOS y no sea el ADMIN general (halonso@cafeteriasba.com.ar)
     */
    var showTableUsuarios = function (){

        divContainer.innerHTML = '';
        //tablaDashboard.innerHTML = '';
        divContainer.appendChild(divAddUsuario);
        divAddUsuario.appendChild(linkAddUsuario);
        divShow.innerHTML = '';
        preHeader.innerHTML = 'Listado de Usuarios';
        divShow.className = 'listado-oculto';
        divAddUsuario.className = 'divButton';
        ajax({
            url: '../../Cafeterias_Landing_API/usuarios-router.php',
            successCallback: function(rta){
                flagCrud = true;
                crudForm.innerHTML = "";
                tablaDashboard.className = "";
                let arrayUsuarios = JSON.parse(rta).data;



                let headerID = 'ID';
                let headerNombre = 'Nombre';
                let headerPrecio = 'Apellido';
                let headerDescripcion = 'Email';
                let headerFechaRegistro= 'Fehca de Registro';
                let headerRol= 'Rol';


                tableHeader.innerHTML = "<tr>"+"<th>"+headerID+"</th>"+
                    "<th>"+headerNombre+"</th>"+
                    "<th>"+headerPrecio+"</th>"+
                    "<th>"+headerDescripcion+"</th>"+
                    "<th>"+headerFechaRegistro+"</th>"+
                    "<th>"+headerRol+"</th>";
                //console.log(arrayUsuarios);
                tableBody.innerHTML = "";
                let rolValue = '';
                for(let arr = 0; arr < arrayUsuarios.length; arr++)
                {

                    for(let x = 0; x<rolesCompletas.length;x++)
                    {
                        //console.log(rolesCompletas[x].id_rol_usuario + " "+ arrayUsuarios[arr].fk_rol_usuario );
                        if(rolesCompletas[x].id_rol_usuario == arrayUsuarios[arr].fk_rol_usuario)
                        {
                            rolValue = rolesCompletas[x].descripcion;
                        }
                    }
                    tableBody.innerHTML += "<tr>"+"<td>"+arrayUsuarios[arr].id+"</td>"+
                        "<td>"+arrayUsuarios[arr].nombre+"</td>"+
                        "<td>"+arrayUsuarios[arr].apellido+"</td>"+
                        "<td>"+arrayUsuarios[arr].email+"</td>"+
                        "<td>"+arrayUsuarios[arr].fecha_registro+"</td>"+
                        "<td>"+rolValue+"</td>"+
                        "</tr>";
                }
                verUsuarioId();
            }
        });
    };

    /**
     * Evento Click del menu "Usuarios" para listar los mismos
     */
    usuariosTab.addEventListener("click",function(){
        showTableUsuarios();
    });


    /***
     ** Evento Click para ver el Formulario de NUEVO USUARIO
     **/
    linkAddUsuario.addEventListener("click",function(){
        //console.log(categoriasCompletas);
        let formAlta = document.createElement('form');
        preHeader.innerHTML = 'Nuevo Usuario';
        formAlta.action = '../../Cafeterias_Landing_API/crud-router.php';
        messageInfo.className = '';
        messageInfo.innerHTML = '';
        divAddUsuario.className = 'listado-oculto';
        tablaDashboard.className="listado-oculto";
        crudForm.className = "";
        let inputNombre = document.createElement('input');
        inputNombre.name = "nombre";
        inputNombre.type = "text";
        let inputApellido = document.createElement('input');
        inputApellido.name = "apellido";
        inputApellido.type = "text";
        let inputEmail = document.createElement('input');
        inputEmail.name = "email";
        inputEmail.type = "email";
        let inputPassword = document.createElement('input');
        inputPassword.name = "password";
        inputPassword.type = "text";
        let inputRol = document.createElement('select');
        inputRol.name = "rol";


        if(flagCrud == true)
        {
            let divContainer = document.createElement('div');
            divContainer.className = "wrapper-form";
            let labelNombre = document.createElement('label');
            labelNombre.innerHTML = "Nombre: ";
            let labelApellido = document.createElement('label');
            labelApellido.innerHTML = "Apellido: ";
            let labelEmail = document.createElement('label');
            labelEmail.innerHTML = "Email: ";
            let labelPassword = document.createElement('label');
            labelPassword.innerHTML = "Contraseña: ";
            let labelRol = document.createElement('label');
            labelRol.innerHTML = "Rol: ";
            let divFirst = document.createElement('div');
            let divSecond = document.createElement('div');
            let labelDescripcion = document.createElement('label');
            labelDescripcion.innerHTML = "Descripcion: ";

            let divForth= document.createElement('div');
            divForth.className = 'divButton';

            let createButton = document.createElement('input');
            createButton.type = 'submit';
            createButton.value = "Crear Usuario";

            //formAlta.className = '';
            crudForm.appendChild(formAlta);
            formAlta.appendChild(messageInfo);
            formAlta.appendChild(divContainer);
            formAlta.appendChild(divForth);
            divContainer.appendChild(divFirst);
            divFirst.appendChild(labelNombre);
            divFirst.appendChild(labelApellido);
            divFirst.appendChild(labelEmail);
            divFirst.style.width = "50%";
            divContainer.appendChild(divSecond);
            divSecond.appendChild(labelPassword);
            divSecond.appendChild(labelRol);
            divSecond.style.width = "50%";
            labelNombre.appendChild(inputNombre);
            labelApellido.appendChild(inputApellido);
            labelEmail.appendChild(inputEmail);
            labelPassword.appendChild(inputPassword);
            labelRol.appendChild(inputRol);
            inputRol.className = 'select-crud';
            for(let i = 0; i<rolesCompletas.length;i++)
            {
                let optionRol = document.createElement('option');
                optionRol.value = rolesCompletas[i].id_rol_usuario;
                optionRol.innerHTML = rolesCompletas[i].descripcion;
                inputRol.appendChild(optionRol);
            }
            divForth.appendChild(createButton);
            flagCrud = false;
        }
        /**
         * Evento Submit para enviar el nuevo Usuario a la insercion de BBDD, verificacion que los campos no esten vacios.
         */
        formAlta.addEventListener("submit",function(ev){
            ev.preventDefault();
            if(inputNombre.value != '' && inputApellido.value != '' && inputEmail.value != '' && inputPassword.value != '')
            {
                let loadedData =
                {
                    nombre: inputNombre.value,
                    apellido: inputApellido.value,
                    email: inputEmail.value,
                    pass: inputPassword.value,
                    fk_rol_usuario: inputRol.value,
                    crud: 'usuario'
                };
                /***
                 *  Peticion AJAX para generar la creacion del nuevo Usuario en la base de datos
                 */
                ajax({
                    method: 'POST',
                    url: '../../Cafeterias_Landing_API/crud-router.php',
                    data: JSON.stringify(loadedData),
                    successCallback: function(rta)
                    {
                        //console.log(rta);
                        let divContainerModal = document.createElement("div");
                        divContainerModal.className = "modalWrapper";
                        let divModal = document.createElement("div");
                        divModal.className = "modal";
                        let textoInfo = document.createElement("p");
                        textoInfo.innerHTML = "Usuario Creado correctamente";
                        let body = document.getElementsByTagName("body")[0];
                        body.appendChild(divContainerModal);
                        divContainerModal.appendChild(divModal);
                        divModal.appendChild(textoInfo);
                        inputNombre.value = "";
                        inputApellido.value = "";
                        inputEmail.value = "";
                        inputPassword.value = "";
                        textoInfo.style.color = "#197328";
                        divModal.style.transition = "all .35s";
                        divModal.style.width = "35%";
                        setTimeout(function() {
                            divContainerModal.innerHTML = "";
                            body.removeChild(divContainerModal);
                        }, 2000);

                        showTableUsuarios();
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
