const API_KEY = "cb9de51af2f80e0f633d956f7ecb942f"; // <- Reemplaza aquí con tu API key real

// quitar tildes/acentos y limpiar texto
function normalizar(texto) {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
}

function mostrarError(msg){
    const out = document.getElementById("resultado");
    out.innerHTML = `<div style="color:#ffb3ff;"><strong>⚠️ ${msg}</strong></div>`;
}

function buscarClima() {
    let ciudad = document.getElementById("ciudad").value;
    if (!ciudad || ciudad.trim() === "") return alert("Ingresa una ciudad.");

    ciudad = normalizar(ciudad);

    // Específicamente pediste ciudades de Paraguay, usamos PY como filtro pero la normalización ayuda.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)},PY&lang=es&units=metric&appid=${API_KEY}`;

    const out = document.getElementById("resultado");
    out.innerHTML = `<div style="color:var(--muted)">Buscando clima para <strong>${ciudad}</strong>...</div>`;

    fetch(url)
        .then(res => {
            if (!res.ok) {
                // si devuelve 404 o 401, damos mensaje distinto
                if (res.status === 401) throw new Error("Clave API inválida. Reemplaza TU_API_KEY_DE_OPENWEATHER.");
                throw new Error("Ciudad no encontrada");
            }
            return res.json();
        })
        .then(data => {
            const nombre = data.name || ciudad;
            const temp = data.main?.temp ?? "—";
            const hum = data.main?.humidity ?? "—";
            const desc = data.weather?.[0]?.description ?? "—";

            out.innerHTML = `
                <div class="card">
                    <div style="flex:1">
                        <h3 style="margin:0">${nombre}</h3>
                        <p style="margin:6px 0; color:var(--muted)">Temperatura: <strong>${temp}°C</strong></p>
                        <p style="margin:6px 0; color:var(--muted)">Humedad: <strong>${hum}%</strong></p>
                        <p style="margin:6px 0; color:var(--muted)">Descripción: <strong>${desc}</strong></p>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error(err);
            mostrarError(err.message.includes("API inválida") ? err.message : "Ciudad no encontrada o no válida. Prueba: Asuncion, Encarnacion, Concepcion");
        });
}