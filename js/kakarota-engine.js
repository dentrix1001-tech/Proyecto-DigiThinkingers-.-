/**
 * ============================================================================
 * FICHA TÉCNICA - SCRIPT ASISTENTE KAKAROTA (Depto. 6)
 * ============================================================================
 * @file kakarota-engine.js
 * @author JuanDaniel Blázquez Antón (Dentrix)
 * @description Motor lógico del asistente inteligente y diagnóstico guiado.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  inicializarAsistenteKakarota();
});

async function inicializarAsistenteKakarota() {
  const btnConsultar = document.getElementById('btnEjecutarKakarota');
  if (btnConsultar) {
    btnConsultar.addEventListener('click', procesarConsultaKakarota);
  }
}

async function procesarConsultaKakarota() {
  const selectTema = document.getElementById('selectTemaKakarota');
  const contenedorRespuestas = document.getElementById('resultadoKakarotaContainer');

  if (!selectTema || !contenedorRespuestas) return;

  const seleccion = selectTema.value;
  contenedorRespuestas.style.display = 'block';
  contenedorRespuestas.innerHTML = '<p style="color: var(--azul); font-weight: bold;">🤖 Kakarota AI Node analizando tu consulta...</p>';

  try {
    const respuesta = await fetch('data/diagnostico-reglas.json');
    const data = await respuesta.json();

    const reglaEncontrada = data.modulos_guia.find(m => m.clave === seleccion || m.key === seleccion);

    setTimeout(() => {
      if (reglaEncontrada) {
        contenedorRespuestas.innerHTML = `
          <h5 style="color: var(--azul); margin-bottom: 8px;">Asesoría Experta Kakarota:</h5>
          <p><strong>Cuestión Evaluada:</strong> ${reglaEncontrada.pregunta}</p>
          <div style="margin-top: 10px; padding: 12px; background: var(--bg-card); border-radius: 8px; border: 1px solid var(--border-color);">
            <strong style="color: var(--text-main);">💡 Recomendación del Sistema:</strong><br>
            <span style="color: var(--text-muted);">${reglaEncontrada.recomendacion}</span>
          </div>
        `;
      } else {
        contenedorRespuestas.innerHTML = '<p>Consulta procesada correctamente dentro del ecosistema modular.</p>';
      }
    }, 600);

  } catch (error) {
    contenedorRespuestas.innerHTML = '<p style="color: red;">Error al procesar las reglas de diagnóstico inteligente.</p>';
  }
}
