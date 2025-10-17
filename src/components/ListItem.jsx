import React from 'react'


export default function ListItem({ coin, onOpen, onToggleFav, fav }){
const price = coin.current_price ?? coin.market_data?.current_price?.usd ?? '?'
const change = coin.price_change_percentage_24h ?? coin.market_data?.price_change_percentage_24h ?? 0


return (
<div className="p-3 rounded-xl glass flex items-center justify-between">
<div className="flex items-center gap-3 cursor-pointer" onClick={onOpen}>
<img src={coin.image || coin.small || coin.image?.thumb} alt="" className="w-10 h-10 rounded" />
<div>
<div className="font-semibold">{coin.name} <span className="text-sm text-slate-400">{coin.symbol?.toUpperCase()}</span></div>
<div className="text-sm text-slate-400">${Number(price).toLocaleString()}</div>
</div>
</div>


<div className="flex items-center gap-4">
<div className={`text-sm font-medium ${change>0 ? 'text-emerald-400' : 'text-rose-400'}`}>{change ? change.toFixed(2) + '%' : '-'}</div>
<button className={`p-2 rounded-lg border ${fav ? 'bg-white/6' : 'bg-white/3'}`} onClick={onToggleFav}>{fav ? '★' : '☆'}</button>
</div>
</div>
)
}