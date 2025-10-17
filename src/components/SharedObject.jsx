import React, { useState } from 'react'


export default function SharedObject(){
const [open, setOpen] = useState(false)
const [text, setText] = useState('Comparte este enlace con tu equipo: https://coingecko.com')


return (
<div className="fixed right-6 bottom-6 z-40">
<div className="neon-btn p-3 rounded-2xl glass flex items-center gap-3 cursor-pointer" onClick={() => setOpen(o => !o)}>
<div className="w-10 h-10 rounded-full flex items-center justify-center">🔗</div>
<div className="hidden md:block">
<div className="text-sm font-semibold">Objeto compartido</div>
<div className="text-xs text-slate-400">Link rápido</div>
</div>
</div>


{open && (
<div className="mt-3 w-[320px] glass p-4 rounded-lg">
<div className="text-sm text-slate-300">Compartir</div>
<input className="input mt-2 w-full" value={text} onChange={e=>setText(e.target.value)} />
<div className="flex gap-2 mt-3">
<button className="btn" onClick={() => { navigator.clipboard?.writeText(text); alert('Copiado') }}>Copiar</button>
<button className="btn-ghost" onClick={() => setOpen(false)}>Cerrar</button>
</div>
</div>
)}
</div>
)
}