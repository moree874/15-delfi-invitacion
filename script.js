// ============================
// ABRIR INVITACIÓN
// ============================

function abrirInvitacion() {

    const musica = document.getElementById("musica");

    if (musica) {
        musica.play().catch(() => {
            console.log("El navegador bloqueó la música.");
        });
    }

    document.querySelector(".portada").style.display = "none";
    document.getElementById("contenido").classList.remove("oculto");

}

// ============================
// CUENTA REGRESIVA
// ============================

const fechaFiesta = new Date("2026-08-18T18:00:00").getTime();

function actualizarContador() {

    const ahora = new Date().getTime();

    const diferencia = fechaFiesta - ahora;

    if (diferencia <= 0) {

        document.querySelector(".contador").innerHTML =
            "<h3>¡Llegó el gran día!</h3>";

        return;

    }

    document.getElementById("dias").textContent =
        Math.floor(diferencia / (1000 * 60 * 60 * 24));

    document.getElementById("horas").textContent =
        Math.floor((diferencia / (1000 * 60 * 60)) % 24);

    document.getElementById("minutos").textContent =
        Math.floor((diferencia / (1000 * 60)) % 60);

    document.getElementById("segundos").textContent =
        Math.floor((diferencia / 1000) % 60);

}

setInterval(actualizarContador, 1000);

actualizarContador();


// ======================================
// SOLO PARA LA INVITACIÓN ORIGINAL
// (si existe el selector cantidad)
// ======================================

const cantidadSelect = document.getElementById("cantidad");

const integrantesDiv = document.getElementById("integrantes");

if (cantidadSelect && integrantesDiv) {

    cantidadSelect.addEventListener("change", function () {

        const cantidad = Number(this.value);

        integrantesDiv.innerHTML = "";

        for (let i = 1; i <= cantidad; i++) {

            integrantesDiv.innerHTML += `

            <div class="integrante">

                <h3>Integrante ${i}</h3>

                <input
                type="text"
                id="nombre${i}"
                placeholder="Nombre y apellido"
                required>

                <select id="menu${i}" required>

                    <option value="">Menú</option>

                    <option value="Tradicional">Tradicional</option>

                    <option value="Vegetariano">Vegetariano</option>

                    <option value="Vegano">Vegano</option>

                    <option value="Celíaco">Celíaco</option>

                </select>

                <input
                type="text"
                id="restriccion${i}"
                placeholder="Restricción alimentaria (opcional)">

            </div>

            `;

        }

    });

}



// ============================
// FORMULARIO
// ============================

const formulario = document.getElementById("formulario");

if (formulario) {
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    lanzarConfeti();

    const familia = document.getElementById("familia").value;
    const cupos = Number(formulario.dataset.cupos);

    let mensaje = 
      `Hola, confirmo asistencia:%0A` +
      `Familia: ${familia}%0A` +
      `Invitación válida para: ${cupos} persona(s)%0A`;

    for (let i = 1; i <= cupos; i++) {
      const nombre = document.getElementById(`nombre${i}`).value;
      const menu = document.getElementById(`menu${i}`).value;
      const restriccion = document.getElementById(`restriccion${i}`).value || "Ninguna";

      mensaje += 
        `%0AIntegrante ${i}:%0A` +
        `Nombre: ${nombre}%0A` +
        `Menú: ${menu}%0A` +
        `Restricción: ${restriccion}%0A`;
    }

    setTimeout(() => {
      window.open(`https://wa.me/542634475711?text=${mensaje}`, "_blank");
    }, 1200);
  });
}