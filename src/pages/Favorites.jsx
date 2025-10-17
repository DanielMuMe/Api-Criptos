import React, { useEffect, useState } from 'react'
import { fetchCoin } from '../api'
import ListItem from '../components/ListItem'


export default function Favorites(){
const [items, setItems] = useState([])
const [fav, setFav] = useState(() => JSON.parse(localStorage.getItem('fav')) || [])


useEffect(()=>{
(async ()=>{
const data = []
for(const id of fav.slice(0,20)){
try{ const c = await fetchCoin(id); data.push({id:c.id, symbol:c.symbol, name:c.name, image:c.image.small, current_price: c.market_data.current_price.usd, price_change_percentage_24h: c.market_data.price_change_percentage_24h}) }catch(e){ }
}
setItems(data)
})()
}, [fav])


function toggleFavorite(id){
const n = fav.includes(id) ? fav.filter(x=>x!==id) : [...fav, id]
setFav(n)
localStorage.setItem('fav', JSON.stringify(n))
setItems(items.filter(i=>i.id!==id))
}


return (
<div className="glass p-6 rounded-2xl">
<h2 className="text-xl font-semibold mb-4">Tus Favoritos</h2>
{items.length===0 ? <div className="text-slate-400">No hay favoritos guardados.</div> : (
<div className="space-y-3">
{items.map(c => <ListItem key={c.id} coin={c} onOpen={()=>{}} onToggleFav={()=>toggleFavorite(c.id)} fav={true} />)}
</div>
)}
</div>
)
}