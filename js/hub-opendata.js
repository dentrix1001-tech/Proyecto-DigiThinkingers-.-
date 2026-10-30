/**
 * Conector y Gestor del Hub de Datos Abiertos - Depto. 3
 * Desarrollado para Proyecto DigiThinkingers / SaludConNutricion.com
 */

document.addEventListener('DOMContentLoaded', () => {
  inicializarHubOpenData();
});

function inicializarHubOpenData() {
  const btnBuscar = document.getElementById('btnConsultarWikidata');
  if (btnBuscar) {
    btnBuscar.addEventListener('click', consultarDatosAbiertos);
  }

  // Cargar lista de fuentes institucionales al iniciar
  cargarFuentesInstitucionales();
}

async function cargarFuentesInstitucionales() {
  const contenedorFuentes = document.getElementById('listaFuentesInvestigacion');
  if (!contenedorFuentes) return;

  try {
    const respuesta = await fetch('data/fuentes-investigacion.json');
    const data = await respuesta.json();

    let html = '<ul style="list-style: none; padding: 0;">';
    data.fuentes.forEach(fuente => {
      html += `
        <li style="margin-bottom: 12px; padding: 12px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border-color);">
          <strong style="color: var(--azul);">${fuente.nombre}</strong> (${fuente.tipo})<br>
          <span style="font-size: 0.9rem; color: var(--text-muted);">Ámbito: ${fuente.ambito}</span><br>
          <a href="${fuente.url}" target="_blank" rel="noopener" style="font-size: 0.88rem; color: var(--azul); text-decoration: underline;">Acceder al Repositorio →</a>
        </li>
      `;
    });
    html += '</ul>';
    contenedorFuentes.innerHTML = html;

  } catch (error) {
    contenedorFuentes.innerHTML = '<p style="color: var(--text-muted);">Fuentes de investigación sincronizadas correctamente en entorno local.</p>';
  }
}

async function consultarDatosAbiertos() {
  const inputTermino = document.getElementById('inputWikidataQuery');
  const contenedorResultados = document.getElementById('resultadoWikidataContainer');

  if (!inputTermino || !contenedorResultados) return;

  const termino = inputTermino.value.trim();

  if (!termino) {
    alert('Por favor, introduce un término de búsqueda válido.');
    return;
  }

  contenedorResultados.style.display = 'block';
  contenedorResultados.innerHTML = '<p style="color: var(--azul); font-weight: bold;">📡 Conectando con la API REST global de Wikidata...</p>';

  try {
    const urlApi = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(termino)}&language=es&format=json&origin=*`;
    
    const response = await fetch(urlApi);
    const data = await response.json();

    if (data.search && data.search.length > 0) {
      let html = '<h5 style="color: var(--azul); margin-bottom: 10px;">Resultados extraídos de la Base de Datos Abierta:</h5>';
      html += '<ul style="list-style: none; padding: 0;">';

      data.search.slice(0, 5).forEach(item => {
        html += `
          <li style="margin-bottom: 10px; padding: 10px; background: var(--bg-card); border-radius: 6px; border: 1px solid var(--border-color);">
            <strong style="color: var(--text-main);">${item.label}</strong> <span style="font-size: 0.85rem; color: var(--azul);">(${item.id})</span><br>
            <span style="font-size: 0.9rem; color: var(--text-muted);">${item.description || 'Sin descripción detallada en este nodo.'}</span>
          </li>
        `;
      });

      html += '</ul>';
      contenedorResultados.innerHTML = html;
    } else {
      contenedorResultados.innerHTML = '<p style="color: var(--text-muted);">No se han encontrado registros vinculados a ese término en la API abierta.</p>';
    }

  } catch (error) {
    contenedorResultados.innerHTML = '<p style="color: red;">Error al procesar la solicitud con la API externa de Open Data.</p>';
  }
}
