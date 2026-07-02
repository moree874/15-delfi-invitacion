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

document.getElementById("formulario").addEventListener("submit", function(e) {
  e.preventDefault();

  lanzarConfeti();

  const nombre = document.getElementById("nombre").value;
  const asistencia = document.getElementById("asistencia").value;
  const menu = document.getElementById("menu").value;
  const restriccion = document.getElementById("restriccion").value;
  const cancion = document.getElementById("cancion").value;

  const mensaje =
    `Hola, confirmo asistencia:%0A` +
    `Nombre: ${nombre}%0A` +
    `Asistencia: ${asistencia}%0A` +
    `Menú: ${menu}%0A` +
    `Restricción alimentaria: ${restriccion}%0A` +
    `Canción recomendada: ${cancion}`;

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