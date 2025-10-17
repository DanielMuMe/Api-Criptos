import React from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import OriginalTab from './pages/OriginalTab'
import InfoPage from './pages/InfoPage'
import SharedObject from './components/SharedObject'
import './glow.css'


function App() {
const navigate = useNavigate()


return (
<div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#04091e,_#071028)] text-slate-100 font-sans">
<header className="p-4 backdrop-blur-sm bg-white/3 border-b border-white/6 sticky top-0 z-30">
<div className="max-w-6xl mx-auto flex items-center gap-4">
<div className="logo flex items-center gap-3 cursor-pointer" onClick={() => navigate('/') }>
<div className="w-10 h-10 rounded-xl neon p-1">
<div className="w-full h-full rounded bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg" />
</div>
<div>
<h1 className="text-xl font-semibold leading-4">CriptoExplorer</h1>
<p className="text-xs text-slate-300">Explora criptomonedas — CoinGecko API</p>
</div>
</div>


<nav className="ml-auto flex items-center gap-2">
<NavLink to="/" end className={({isActive}) => `tab ${isActive? 'active': ''}`}>Lista</NavLink>
<NavLink to="/favorites" className={({isActive}) => `tab ${isActive? 'active': ''}`}>Favoritos</NavLink>
<NavLink to="/original" className={({isActive}) => `tab ${isActive? 'active': ''}`}>Pestaña original</NavLink>
<NavLink to="/info" className={({isActive}) => `tab ${isActive? 'active': ''}`}>Página info</NavLink>
</nav>
</div>
</header>


<main className="max-w-6xl mx-auto p-6">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/favorites" element={<Favorites />} />
<Route path="/original" element={<OriginalTab />} />
<Route path="/info" element={<InfoPage />} />
</Routes>
</main>


<SharedObject />


<footer className="mt-12 text-center text-slate-400 pb-8">Made with ⚡ by CriptoExplorer — Data from CoinGecko</footer>
</div>
)
}

export default App;

