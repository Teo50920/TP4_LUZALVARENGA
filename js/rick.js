function mostrarPersonaje(data) {
    if (!data) {
        document.getElementById("resultado").innerHTML = `<div style="color:#ffb3b3;"><strong>No se encontró el personaje.</strong></div>`;
        return;
    }
    const out = document.getElementById("resultado");
    out.innerHTML = `
        <div class="card">
            <div class="avatar"><img src="${data.image}" alt="${data.name}"></div>
            <div style="flex:1">
                <h3 style="margin:0">${data.name}</h3>
                <p style="margin:6px 0; color:var(--muted)">Estado: <strong>${data.status}</strong></p>
                <p style="margin:6px 0; color:var(--muted)">Especie: <strong>${data.species}</strong></p>
                <p style="margin:6px 0; color:var(--muted)">Origen: <strong>${data.origin?.name || '—'}</strong></p>
            </div>
        </div>
    `;
}

function buscarRick() {
    const inputRaw = (document.getElementById("idRick").value || "").trim();
    if (!inputRaw) return alert("Ingresa un ID o nombre.");

    const input = inputRaw.toLowerCase();

    const out = document.getElementById("resultado");
    out.innerHTML = `<div style="color:var(--muted)">Buscando ${inputRaw}...</div>`;

    // Si es número → buscar por ID
    if (!isNaN(input) && input !== "") {
        fetch(`https://rickandmortyapi.com/api/character/${encodeURIComponent(input)}`)
            .then(res => {
                if (!res.ok) throw new Error("No encontrado");
                return res.json();
            })
            .then(data => mostrarPersonaje(data))
            .catch(err => {
                console.error(err);
                out.innerHTML = `<div style="color:#ffb3b3;"><strong>Personaje no encontrado por ID.</strong></div>`;
            });
        return;
    }

    // Si es texto → buscar por nombre (puede devolver varios, tomamos el primero)
    fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(input)}`)
        .then(res => {
            if (!res.ok) throw new Error("No encontrado");
            return res.json();
        })
        .then(data => {
            // si hay múltiples resultados, mostramos el primero y avisamos
            if (Array.isArray(data.results) && data.results.length > 0) {
                mostrarPersonaje(data.results[0]);
                if (data.results.length > 1) {
                    const more = data.results.slice(1,5).map(p => p.name).join(", ");
                    out.innerHTML += `<div style="margin-top:10px; color:var(--muted)">También se encontraron: ${more}${data.results.length>5? ", ..." : ""}</div>`;
                }
            } else {
                mostrarPersonaje(null);
            }
        })
        .catch(err => {
            console.error(err);
            out.innerHTML = `<div style="color:#ffb3b3;"><strong>Personaje no encontrado por nombre.</strong></div>`;
        });
}