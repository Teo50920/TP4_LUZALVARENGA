function buscarPais() {
    const pais = (document.getElementById("pais").value || "").trim();
    if (!pais) return alert("Ingresa el nombre del país.");

    const out = document.getElementById("resultado");
    out.innerHTML = `<div style="color:var(--muted)">Buscando ${pais}...</div>`;

    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(pais)}`)
        .then(res => {
            if (!res.ok) throw new Error("País no encontrado");
            return res.json();
        })
        .then(data => {
            const p = data[0];
            const bandera = p.flags?.png || p.flags?.svg || "";
            const capital = Array.isArray(p.capital) ? p.capital.join(", ") : (p.capital || "—");
            out.innerHTML = `
                <div class="card">
                    <div class="avatar"><img src="${bandera}" alt="bandera"></div>
                    <div style="flex:1">
                        <h3 style="margin:0">${p.name.common}</h3>
                        <p style="margin:6px 0; color:var(--muted)">Capital: <strong>${capital}</strong></p>
                        <p style="margin:6px 0; color:var(--muted)">Población: <strong>${p.population.toLocaleString()}</strong></p>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error(err);
            out.innerHTML = `<div style="color:#ffb3b3;"><strong>País no encontrado.</strong></div>`;
        });
}

