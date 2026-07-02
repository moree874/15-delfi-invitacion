function abrirInvitacion() {
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

const cantidadSelect = document.getElementById("cantidad");
const integrantesDiv = document.getElementById("integrantes");

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
          placeholder="Nombre y apellido del integrante ${i}" 
          required
        >

        <select id="menu${i}" required>
          <option value="">Menú del integrante ${i}</option>
          <option value="Tradicional">Tradicional</option>
          <option value="Vegetariano">Vegetariano</option>
          <option value="Vegano">Vegano</option>
          <option value="Celíaco">Celíaco</option>
        </select>

        <input 
          type="text" 
          id="restriccion${i}" 
          placeholder="Restricción alimentaria del integrante ${i}"
        >
      </div>
    `;
  }
});

document.getElementById("formulario").addEventListener("submit", function(e) {
  e.preventDefault();

  lanzarConfeti();

  const familia = document.getElementById("familia").value;
  const cantidad = Number(document.getElementById("cantidad").value);

  let integrantesMensaje = "";

  for (let i = 1; i <= cantidad; i++) {
    const nombre = document.getElementById(`nombre${i}`).value;
    const menu = document.getElementById(`menu${i}`).value;
    const restriccion = document.getElementById(`restriccion${i}`).value || "Ninguna";

    integrantesMensaje +=
      `%0AIntegrante ${i}:%0A` +
      `Nombre: ${nombre}%0A` +
      `Menú: ${menu}%0A` +
      `Restricción: ${restriccion}%0A`;
  }

  const mensaje =
    `Hola, confirmo asistencia:%0A` +
    `Familia: ${familia}%0A` +
    `Cantidad de integrantes: ${cantidad}%0A` +
    integrantesMensaje;

  setTimeout(() => {
    window.open(`https://wa.me/542634475711?text=${mensaje}`, "_blank");
  }, 1200);
});

function lanzarConfeti() {
  const colores = ["#ffffff", "#d8d8d8", "#c0c0c0", "#f5f5f5"];

  for (let i = 0; i < 90; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");

    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style.background = colores[Math.floor(Math.random() * colores.length)];
    confeti.style.animationDuration = Math.random() * 2 + 2 + "s";
    confeti.style.opacity = Math.random();

    document.body.appendChild(confeti);

    setTimeout(() => {
      confeti.remove();
    }, 4000);
  }
}