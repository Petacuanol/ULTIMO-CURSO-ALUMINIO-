const galeria = document.querySelectorAll('.galeria img');
const lightbox = document.getElementById('lightbox');
const imagenAmpliada = document.getElementById('imagen-ampliada');
const cerrar = document.querySelector('.cerrar');

galeria.forEach(img => {
  img.addEventListener('click', () => {
    imagenAmpliada.src = img.src;
    lightbox.style.display = 'flex';
  });
});

cerrar.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.style.display = 'none';
  }
});
