function buscarPokemon() {
    const poke = (document.getElementById("pokemon").value || "").toLowerCase().trim();
    if (!poke) return alert("Ingresa nombre o ID del Pokémon.");

    const out = document.getElementById("resultado");
    out.innerHTML = `<div style="color:var(--muted)">Buscando ${poke}...</div>`;

    fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(poke)}`)
        .then(res => {
            if (!res.ok) throw new Error("No encontrado");
            return res.json();
        })
        .then(data => {
            const tipos = data.types.map(t => t.type.name).join(", ");
            out.innerHTML = `
                <div class="card">
                    <div class="avatar"><img src="${data.sprites.front_default}" alt="${data.name}"></div>
                    <div style="flex:1">
                        <h3 style="margin:0; text-transform:capitalize">${data.name}</h3>
                        <p style="margin:6px 0; color:var(--muted)">Tipo: <strong>${tipos}</strong></p>
                        <p style="margin:6px 0; color:var(--muted)">Peso: <strong>${data.weight}</strong></p>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error(err);
            out.innerHTML = `<div style="color:#ffb3b3;"><strong>Pokémon no encontrado.</strong></div>`;
        });
}

