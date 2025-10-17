import React from 'react'


export default function DetailModal({ coin, onClose, onToggleFav, fav }){
const price = coin.market_data?.current_price?.usd ?? '?'
const change = coin.market_data?.price_change_percentage_24h ?? 0


return (
<div className="fixed inset-0 z-50 flex items-center justify-center">
<div className="absolute inset-0 bg-black/50" onClick={onClose} />
<div className="relative w-[90%] max-w-3xl p-6 glass rounded-2xl">
<div className="flex items-start gap-4">
<img src={coin.image?.large} className="w-16 h-16 rounded" />
<div>
<h3 className="text-2xl font-bold">{coin.name} <span className="text-sm text-slate-400">{coin.symbol?.toUpperCase()}</span></h3>
<div className="mt-2 text-slate-300">${price?.toLocaleString?.() ?? price} <span className={`ml-2 ${change>0? 'text-emerald-400':'text-rose-400'}`}>{change?.toFixed(2)}%</span></div>
</div>
<div className="ml-auto flex gap-2">
<button className="btn" onClick={onToggleFav}>{fav ? 'Quitar favorito' : 'Agregar favorito'}</button>
<button className="btn-ghost" onClick={onClose}>Cerrar</button>
</div>
</div>


<div className="mt-6 grid grid-cols-2 gap-4">
<div className="p-4 rounded-lg border glass">
<div className="text-sm text-slate-400">Market Cap</div>
<div className="font-semibold">${coin.market_data?.market_cap?.usd?.toLocaleString?.() ?? '-'}</div>
</div>
<div className="p-4 rounded-lg border glass">
<div className="text-sm text-slate-400">Total Volume</div>
<div className="font-semibold">${coin.market_data?.total_volume?.usd?.toLocaleString?.() ?? '-'}</div>
</div>
</div>


<div className="mt-6 text-slate-300">
<h4 className="font-semibold">Descripción</h4>
<div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: coin.description?.en?.split('\n')[0] ?? 'Sin descripción.' }} />
</div>
</div>
</div>
)
}