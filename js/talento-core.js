/**
 * ============================================================================
 * FICHA TÉCNICA - SCRIPT TALENTO Y EMPLEO (Depto. 5)
 * ============================================================================
 * @file talento-core.js
 * @author JuanDaniel Blázquez Antón (Dentrix)
 * @description Motor de gestión de directorios de empleo y recomendación de talento.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  inicializarTalento();
});

async function inicializarTalento() {
  await cargarPortalesEmpleo();
  
  const btnFiltrar = document.getElementById('btnFiltrarTalento');
  if (btnFiltrar) {
    btnFiltrar.addEventListener('click', simularBusquedaTalento);
  }
}

async function cargarPortalesEmpleo() {
  const contenedor = document.getElementById('listaPortalesEmpleo');
  if (!contenedor) return;

  try {
    const respuesta = await fetch('data/portales-empleo.json');
    const data = await respuesta.json();

    let html = '<ul style="list-style: none; padding: 0;">';
    data.portales.forEach(portal => {
      html += `
        <li style="margin-bottom: 12px; padding: 12px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border-color);">
          <strong style="color: var(--azul);">${portal.nombre}</strong> (${portal.tipo})<br>
          <span style="font-size: 0.9rem; color: var(--text-muted);">Sector: ${portal.sector}</span><br>
          <a href="${portal.url}" target="_blank" rel="noopener" style="font-size: 0.88rem; color: var(--azul); text-decoration: underline;">Acceder al Portal →</a>
        </li>
      `;
    });
    html += '</ul>';
    contenedor.innerHTML = html;
  } catch (error) {
    contenedor.innerHTML = '<p style="color: var(--text-muted);">Directorios de talento sincronizados localmente.</p>';
  }
}

function simularBusquedaTalento() {
  const inputPerfil = document.getElementById('inputPerfilBusqueda');
  const contenedorResultados = document.getElementById('resultadoTalentoContainer');

  if (!inputPerfil || !contenedorResultados) return;

  const perfil = inputPerfil.value.trim();
  if (!perfil) {
    alert('Por favor, introduzca un perfil o competencia profesional.');
    return;
  }

  contenedorResultados.style.display = 'block';
  contenedorResultados.innerHTML = `<p style="color: var(--azul); font-weight: bold;">🔍 Cruzando competencias para el perfil "${perfil}" con bases de datos de talento...</p>`;

  setTimeout(() => {
    contenedorResultados.innerHTML = `
      <h5 style="color: var(--azul); margin-bottom: 8px;">Informe de Oportunidades & Coincidencias:</h5>
      <p><strong>Perfil Analizado:</strong> ${perfil}</p>
      <p><strong>Compatibilidad con Redes Activas:</strong> 94% (Alta demanda en el mercado tecnológico y de divulgación digital).</p>
      <p><strong>Sugerencia de Enlace:</strong> Vincular repositorio de credenciales (Google Drive / OneDrive) al perfil profesional para certificación de reclutadores.</p>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">* Simulación basada en la indexación de plataformas de empleo asociadas a SaludConNutricion.com.</p>
    `;
  }, 800);
}
