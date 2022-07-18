const btnMensaje = document.querySelector(".contacto__btn__enviar");
const inputs = document.querySelectorAll("input");
const txtarea = document.querySelector("textarea");

const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const asunto = document.querySelector("#asunto");

function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (input.validity.valid) {
        input.parentElement.classList.remove("contacto__input__container__invalid");
        input.parentElement.querySelector(".contacto__mensaje__error").innerHTML = "";
    } else {
        input.parentElement.classList.add("contacto__input__container__invalid");
        input.parentElement.querySelector(".contacto__mensaje__error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    asunto: {
        valueMissing: "El asunto no puede estar vacío"
    },
    mensaje: {
        valueMissing: "El mensaje no puede estar vacío"
    }
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

function btnStatus() {
    let status = false
    let nombreIn = nombre.validity.valueMissing;
    let correoIn = correo.validity.valueMissing;
    let correoIe = correo.validity.valid;
    let asuntoIn = asunto.validity.valueMissing;
    let mensaje = txtarea.validity.valueMissing;

    if (nombreIn || correoIn || !correoIe || asuntoIn || mensaje) {
        //console.log("uno o varios campos están vacíos");
        status = true;
    }
    else {
        //console.log("todos los campos están completos");
        status = false;
    }
    return status;
}

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    });
});

txtarea.addEventListener("blur", (input) => {
    valida(input.target);
});

btnMensaje.addEventListener("click", (evento) => {
    evento.preventDefault();
    let status = btnStatus();
    if (status) {
        console.log("No se puede enviar el formulario");
    } else {
        console.log("Aquí se envía el formulario");
        document.querySelector(".contacto__datos").classList.add("contacto__datos__hidden");
        document.querySelector(".contacto__gracias").classList.remove("contacto__gracias__hidden");
        setTimeout(resetContacto, 6000);
    }
});

function resetContacto() {
    document.getElementById("contacto__form").reset();
    document.querySelector(".contacto__gracias").classList.add("contacto__gracias__hidden");
    document.querySelector(".contacto__datos").classList.remove("contacto__datos__hidden");
}