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

const fechaFiesta = new Date("2026-08-18T18:00:00").getTime();

function actualizarContador() {
  const ahora = new Date().getTime();
  const diferencia = fechaFiesta - ahora;

  if (diferencia <= 0) {
    document.querySelector(".contador").innerHTML = "<h3>¡Llegó el gran día!</h3>";
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

const formulario = document.getElementById("formulario");
const integrantesDiv = document.getElementById("integrantes");

if (formulario && integrantesDiv) {
  const cupos = Number(formulario.dataset.cupos);

  integrantesDiv.innerHTML = "";

  for (let i = 1; i <= cupos; i++) {
    integrantesDiv.innerHTML += `
      <div class="integrante">
        <h3>Integrante ${i}</h3>

        <input type="text" id="nombre${i}" placeholder="Nombre y apellido" required>

        <select id="menu${i}" required>
          <option value="">Menú</option>
          <option value="Tradicional">Tradicional</option>
          <option value="Vegetariano">Vegetariano</option>
          <option value="Vegano">Vegano</option>
          <option value="Celíaco">Celíaco</option>
        </select>

        <input type="text" id="restriccion${i}" placeholder="Restricción alimentaria (opcional)">
      </div>
    `;
  }

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    lanzarConfeti();

    const familia = document.getElementById("familia").value;

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
      window.location.href = `https://wa.me/542634475711?text=${mensaje}`;
    }, 1500);
  });
}

function lanzarConfeti() {
  const colores = ["#ffffff", "#e8e8e8", "#cfcfcf", "#f7f7f7"];

  for (let i = 0; i < 120; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");

    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style.background = colores[Math.floor(Math.random() * colores.length)];
    confeti.style.animationDuration = Math.random() * 2 + 2 + "s";

    document.body.appendChild(confeti);

    setTimeout(() => {
      confeti.remove();
    }, 4000);
  }
}