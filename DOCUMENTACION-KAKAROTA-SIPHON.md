# 📑 Documentación Técnica: Kakarota Siphon Engine
> **Ecosistema:** Salud con Nutrición & Proyecto-DigiThinkingers  
> **Autor / Operador:** Dentrix *.1 / Humanoide Digital  

---

## 1. Visión General
El subsistema **Kakarota Siphon** es el motor automatizado encargado de la ingesta, filtrado inteligente y estructuración de flujos informativos externos procedentes de múltiples canales de comunicación (Gmail, Microsoft Graph y Axarnet IMAP), transformándolos en fichas JSON normalizadas para su consumo en los diferentes departamentos web del ecosistema.

## 2. Estructura de Fichas Consolidadas
Los datos procesados se almacenan y exponen de manera pública y estructurada en la carpeta `/data/` bajo los siguientes identificadores normalizados:
* `kakarota-fichas-empleo-a.json` ➔ Ofertas laborales y oportunidades activas.
* `kakarota-fichas-formacion-b.json` ➔ Programas educativos y recursos formativos.
* `kakarota-fichas-b2b-c.json` ➔ Propuestas corporativas y de colaboración.

## 3. Automatización y Ciclo de Sincronización
La actualización de estos ficheros se realiza mediante ejecuciones programadas (Cron / tareas automatizadas en VPS Axarnet) que aplican las siguientes reglas operativas:
1. **Lectura Multicanal:** Conexión segura a buzones configurados mediante credenciales aisladas (`.env`).
2. **Parser Inteligente:** Clasificación semántica del contenido entrante.
3. **Retención Dinámica:** Purgado automático de registros obsoletos y limitación a los últimos 50 registros activos por categoría para garantizar la máxima velocidad de carga en GitHub Pages.

---
*Documentación oficial del motor Kakarota Siphon.*
