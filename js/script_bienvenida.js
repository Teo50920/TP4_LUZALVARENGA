document.addEventListener("DOMContentLoaded", () => {

    // Mostrar mensaje de bienvenida con animación
    const bienvenida = document.getElementById("bienvenida");

    setTimeout(() => {
        bienvenida.style.opacity = "1";
        bienvenida.style.transform = "translateY(0)";
    }, 300);

    // 🔥 PEDIR NOMBRE Y APELLIDO
    let nombreUsuario = localStorage.getItem("nombreUsuario");

    if (!nombreUsuario) {
        nombreUsuario = prompt("Bienvenido/a 💫\n\nPor favor, ingresa tu nombre y apellido:");

        if (!nombreUsuario || nombreUsuario.trim() === "") {
            nombreUsuario = "Invitado/a";
        }

        localStorage.setItem("nombreUsuario", nombreUsuario);
    }

    // Insertar el nombre en la página
    document.getElementById("usuarioNombre").textContent = nombreUsuario;

    // Animación para mostrar el nombre
    const nombreBox = document.getElementById("nombreBox");
    nombreBox.style.opacity = "1";
    nombreBox.style.transform = "translateY(0)";
});