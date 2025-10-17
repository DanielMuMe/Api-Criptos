import React from 'react'


export default function InfoPage(){
return (
<div className="glass p-6 rounded-2xl">
<h2 className="text-xl font-semibold">Página informativa</h2>
<p className="mt-3 text-slate-300">Explicación de la app, fuentes y cómo usarla.</p>
<ul className="mt-4 text-sm space-y-2 text-slate-300">
<li>- Datos provistos por CoinGecko (https://api.coingecko.com)</li>
<li>- Puedes buscar por nombre o símbolo.</li>
<li>- Guarda favoritos en localStorage.</li>
</ul>
</div>
)
}