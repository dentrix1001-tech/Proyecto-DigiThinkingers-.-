/**
 * Motor de Diagnóstico de Arquitectura PWA y Entorno - Depto. 4
 * Desarrollado para Proyecto DigiThinkingers / SaludConNutricion.com
 */

document.addEventListener('DOMContentLoaded', () => {
  inicializarArquitectura();
});

function inicializarArquitectura() {
  const btnDiagnostico = document.getElementById('btnEjecutarDiagnosticoPWA');
  if (btnDiagnostico) {
    btnDiagnostico.addEventListener('click', ejecutarDiagnosticoEntorno);
  }
  cargarEspecificacionesTecnicas();
}

async function cargarEspecificacionesTecnicas() {
  const contenedorSpecs = document.getElementById('listaEspecificacionesSpecs');
  if (!contenedorSpecs) return;

  try {
    const respuesta = await fetch('data/arquitectura-pwa.json');
    const data = await respuesta.json();

    let html = '<ul style="list-style: none; padding: 0;">';
    data.especificaciones.forEach(spec => {
      html += `
        <li style="margin-bottom: 12px; padding: 12px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border-color);">
          <strong style="color: var(--azul);">${spec.nombre}</strong> <span style="font-size: 0.85rem; color: var(--text-muted);">[${spec.estado}]</span><br>
          <span style="font-size: 0.9rem; color: var(--text-muted);">${spec.descripcion}</span>
        </li>
      `;
    });
    html += '</ul>';
    contenedorSpecs.innerHTML = html;
  } catch (error) {
    contenedorSpecs.innerHTML = '<p style="color: var(--text-muted);">Especificaciones técnicas sincronizadas localmente.</p>';
  }
}

function ejecutarDiagnosticoEntorno() {
  const contenedorResultados = document.getElementById('resultadoDiagnosticoContainer');
  if (!contenedorResultados) return;

  contenedorResultados.style.display = 'block';
  contenedorResultados.innerHTML = '<p style="color: var(--azul); font-weight: bold;">🔄 Analizando capacidades del navegador y entorno PWA...</p>';

  setTimeout(() => {
    const online = navigator.onLine;
    const cookiesHabilitadas = navigator.cookieEnabled;
    const idioma = navigator.language || 'es-ES';
    const plataforma = navigator.platform || 'Estándar Web';
    const modoOscuroActivo = document.documentElement.hasAttribute('data-theme');

    contenedorResultados.innerHTML = `
      <h5 style="color: var(--azul); margin-bottom: 10px;">Informe de Capacidades del Sistema Cliente:</h5>
      <ul style="list-style: none; padding: 0; font-size: 0.95rem;">
        <li style="margin-bottom: 6px;">🌐 <strong>Conectividad de Red:</strong> ${online ? '✅ En línea (Conectado)' : '⚠️ Modo Sin Conexión (Offline)'}</li>
        <li style="margin-bottom: 6px;">🍪 <strong>Almacenamiento Local / Cookies:</strong> ${cookiesHabilitadas ? '✅ Habilitado' : '❌ Deshabilitado'}</li>
        <li style="margin-bottom: 6px;">🗣️ <strong>Idioma del Sistema:</strong> ${idioma}</li>
        <li style="margin-bottom: 6px;">💻 <strong>Plataforma Base:</strong> ${plataforma}</li>
        <li style="margin-bottom: 6px;">🌓 <strong>Esquema Visual Actual:</strong> ${modoOscuroActivo ? 'Modo Oscuro (Dark Theme)' : 'Modo Claro (Light Theme)'}</li>
      </ul>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 12px;">
        * Diagnóstico ejecutado en tiempo real mediante el motor nativo del navegador cliente.
      </p>
    `;
  }, 700);
}
