/* ===================================
   GUÍAS IA - JAVASCRIPT COMÚN
   Autor: JJRM - 2026
   =================================== */

/**
 * Abre el modal de imagen con la ruta especificada
 * @param {string} imageSrc - Nombre del archivo de imagen
 */
function openImageModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  
  if (modal && modalImage) {
    modalImage.src = 'img/' + imageSrc;
    modal.classList.add('active');
  }
}

/**
 * Cierra el modal de imagen
 */
function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Inicializa los event listeners cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
  // Permitir cerrar con tecla Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeImageModal();
    }
  });

  // Cerrar modal al hacer clic fuera del contenido
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeImageModal();
      }
    });
  }
});
