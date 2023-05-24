window.addEventListener('load', function () { //adentro son variables locales, no las veo en el browser, 
    /* ---------------------- obtenemos variables globales ---------------------- */
    const inputNombre = document.querySelector('#inputNombre');
    const inputApellido = document.querySelector('#inputApellido');
    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
    const inputPasswordRepetida = document.querySelector('#inputPasswordRepetida');
    const form = document.querySelector('form');


    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Preparando datos');
        //Validar los dos pwd sean iguales
        const datosUsuario={
            firstName: inputNombre.value,
            lastName: inputApellido.value,
            email: inputEmail.value,
            password: inputPassword.value
        }

        console.log(datosUsuario);
        realizarRegister(datosUsuario);

        form.reset(); //limpiar formulario



    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(datosUsuario) {
        const url = 'https:ctd-todo-api.herokuapp.com/v1/users';

        const config = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(datosUsuario)
        }

        fetch(url, config).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.jwt) {
                    localStorage.setItem('jwt', data.jwt);
                    location.replace('mis-tareas.html');
                }
            }).catch((response) => {
                console.error(response);
            })







    };


});