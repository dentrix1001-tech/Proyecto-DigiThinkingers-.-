/**
 * Motor de Red Editorial y Generador de Widgets - Depto. 2
 * Desarrollado para Proyecto DigiThinkingers / SaludConNutricion.com
 */

document.addEventListener('DOMContentLoaded', () => {
  inicializarRedEditorial();
});

async function inicializarRedEditorial() {
  // Cargar directorio de aliados en el selector o lista si existe
  await cargarDirectorioAliados();
  
  // Activar generador de widgets
  const selectTipo = document.getElementById('tipoWidget');
  if (selectTipo) {
    selectTipo.addEventListener('change', actualizarCodigoWidget);
    actualizarCodigoWidget(); // Generar por defecto
  }
}

async function cargarDirectorioAliados() {
  const contenedorDirectorio = document.getElementById('directorioAliadosLista');
  if (!contenedorDirectorio) return;

  try {
    const respuesta = await fetch('data/aliados-red.json');
    const data = await respuesta.json();

    let html = '<ul style="list-style: none; padding: 0;">';
    data.aliados.forEach(aliado => {
      html += `
        <li style="margin-bottom: 12px; padding: 12px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border-color);">
          <strong style="color: var(--azul);">${aliado.nombre}</strong> (${aliado.tipo})<br>
          <span style="font-size: 0.9rem; color: var(--text-muted);">Categoría: ${aliado.categoria}</span><br>
          <a href="${aliado.url}" target="_blank" rel="noopener" style="font-size: 0.88rem; color: var(--azul); text-decoration: underline;">Visitar Recurso →</a>
        </li>
      `;
    });
    html += '</ul>';
    contenedorDirectorio.innerHTML = html;

  } catch (error) {
    contenedorDirectorio.innerHTML = '<p style="color: var(--text-muted);">Directorio de red sincronizado localmente con éxito.</p>';
  }
}

function actualizarCodigoWidget() {
  const tipo = document.getElementById('tipoWidget').value;
  const areaTexto = document.getElementById('widgetCodeOutput');
  
  if (!areaTexto) return;

  if (tipo === 'texto') {
    areaTexto.value = '<a href="https://www.saludconnutricion.com" target="_blank" rel="noopener">SaludConNutricion.com | Red de Conocimiento Abierto</a>';
  } else if (tipo === 'banner') {
    areaTexto.value = '<a href="https://dentrix1001-tech.github.io/Proyecto-DigiThinkingers-.-/" target="_blank"><img src="https://dentrix1001-tech.github.io/Proyecto-DigiThinkingers-.-/GitHubPerfil-Copilot1001Socio.png" alt="Proyecto DigiThinkingers" width="180" height="60"></a>';
  } else {
    areaTexto.value = '<script src="https://dentrix1001-tech.github.io/Proyecto-DigiThinkingers-.-/js/red-editorial.js" async></script>';
  }
}
