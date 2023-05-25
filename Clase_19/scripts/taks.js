// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
const jwt = localStorage.getItem('jwt');
if (!jwt) {
  location.replace('index.html');
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector('#closeApp');
  const formCrearTarea = document.querySelector('form.nueva-tarea');
  const nombreUsuario = document.querySelector('.user-info p');
  const contenedorTareas = document.querySelector('.tareas-pendientes');
  const inputTarea = document.querySelector('#nuevaTarea');





  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
   console.log('cerrar sesion');
   const confirmacion = confirm('Desea salir?');

    if (confirmacion) {
      localStorage.clear(); //guarda todo en el servidor
      //localStorage.removeItem('jwt');
      location.replace('index.html');
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const url = 'https://ctd-todo-api.herokuapp.com/vi1/users/getMe';
    const config = {
      method: 'GET',
      headers: {
        authorization: jwt
      }
    }
    fetch(url, config).then(response => response.json())
      .then(data => {
        console.log(data);
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = data.firstName;
      }).catch(response => {
        console.error(response);
      })
    
    }
  
  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const url = 'https://ctd-todo-api.herokuapp.com/v1/tasks' ;
    const config = {
      method: 'GET',
      headers: {
        authorization: jwt
    }
    }

    fetch(url, config).then(response => response.json())
      .then(data => {
        console.log(data);

        //clasificar las tareas
        let completas = [];
        let pendientes =[];

        data.forEach(tarea => {
          if (tarea.completed) {
            completas.push(tarea);
          } else {
            pendientes.push(tarea);
          }
        });
        //Renderizar tareas
        renderizarTareas(completas);
        renderizarTareas(pendientes);
        //botonesCambioEstado();
        //botonBorrarTarea();
      }).catch(response => {
        console.error(response);
      })};

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Preparando tarea', inputTarea.value);

    //Solicitud de la Api con el metodo Post

    //preparamos el obj a enviar al servidor
    const nueva = {
      description: inputTarea.value,
      completed:false
    }

    //armamos la carta (peticion) como la pide el servidor (ver documentacion)
    const conf = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: jwt
    },
      body: JSON.stringify(nueva)
    }







 




  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    contenedorTareas.innerHTML = '';
      listado.forEach(tarea => {
        contenedorTareas.innerHTML += `
        <li class="tarea” data-aos="fade-up">
          <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${ tarea.description }</p>
          <div class="cambios-estados">
            <button class="change incompleta" id="tarea_id" type="button"><i class="fa-solid fa-rotate-left"></i></button>
            <button class="borrar" id="tarea2 lid" type="button"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </li>
      `;
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };
  obtenerNombreUsuario();
  consultarTareas();

});