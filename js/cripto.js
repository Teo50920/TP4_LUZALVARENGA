function buscarCripto() {
    const moneda = (document.getElementById("cripto").value || "").trim();
    if (!moneda) return alert("Selecciona una moneda.");

    const out = document.getElementById("resultado");
    out.innerHTML = `<div style="color:var(--muted)">Buscando ${moneda}...</div>`;

    fetch(`https://api.coingecko.com/api/v3/coins/${encodeURIComponent(moneda)}`)
        .then(res => {
            if (!res.ok) throw new Error("No encontrado");
            return res.json();
        })
        .then(data => {
            const m = data.market_data;
            out.innerHTML = `
                <div class="card">
                    <div class="avatar"><img src="${data.image?.small || ''}" alt="${data.name}"></div>
                    <div style="flex:1">
                        <h3 style="margin:0">${data.name} (${data.symbol?.toUpperCase()})</h3>
                        <p style="margin:6px 0; color:var(--muted)">Precio USD: <strong>$${(m.current_price.usd || 0).toLocaleString()}</strong></p>
                        <p style="margin:6px 0; color:var(--muted)">Cambio 24h: <strong>${(m.price_change_percentage_24h || 0).toFixed(2)}%</strong></p>
                        <p style="margin:6px 0; color:var(--muted)">Market Cap: <strong>$${(m.market_cap.usd || 0).toLocaleString()}</strong></p>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            console.error(err);
            out.innerHTML = `<div style="color:#ffb3b3;"><strong>No se pudo obtener la información de la cripto.</strong></div>`;
        });
}

