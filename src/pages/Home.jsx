import React, { useEffect, useState } from "react";
import { fetchMarkets, fetchCoin } from "../api";
import ListItem from "../components/ListItem";
import DetailModal from "../components/DetailModal";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("fav")) || []
  );

  useEffect(() => {
    load();
  }, [page]);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchMarkets({ per_page: 50, page });
      setCoins(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function openDetail(id) {
    const c = await fetchCoin(id);
    setSelected(c);
  }

  function toggleFavorite(id) {
    const n = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    setFavorites(n);
    localStorage.setItem("fav", JSON.stringify(n));
  }

  const filtered = coins
    .filter((c) => {
      if (filter === "gainers") return c.price_change_percentage_24h > 0;
      if (filter === "losers") return c.price_change_percentage_24h < 0;
      return true;
    })
    .filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.symbol.toLowerCase().includes(query.toLowerCase())
    );

  // 👇 A partir de aquí va el return (dentro de la función)
  return (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-3 p-4 rounded-2xl glass">
        <h2 className="text-lg font-semibold mb-3">Menú</h2>
        <div className="flex flex-col gap-2">
          <button className="btn" onClick={() => setFilter("all")}>
            Todos
          </button>
          <button className="btn" onClick={() => setFilter("gainers")}>
            Suben (24h)
          </button>
          <button className="btn" onClick={() => setFilter("losers")}>
            Bajan (24h)
          </button>

          <div className="mt-4">
            <label className="text-sm text-slate-300">Buscar</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Bitcoin, ETH..."
              className="mt-2 input"
            />
          </div>
        </div>
      </aside>

      <section className="col-span-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Lista de criptomonedas</h2>
          <div className="text-sm text-slate-400">Página {page}</div>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="p-6 glass">Cargando...</div>
          ) : (
            filtered.map((c) => (
              <ListItem
                key={c.id}
                coin={c}
                onOpen={() => openDetail(c.id)}
                onToggleFav={() => toggleFavorite(c.id)}
                fav={favorites.includes(c.id)}
              />
            ))
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            className="btn-ghost"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Anterior
          </button>
          <button className="btn" onClick={() => setPage((p) => p + 1)}>
            Siguiente
          </button>
        </div>
      </section>

      <aside className="col-span-3 p-4 rounded-2xl glass">
        <h3 className="font-semibold mb-3">Favoritos rápidos</h3>
        {favorites.length === 0 ? (
          <div className="text-slate-400">No hay favoritos</div>
        ) : (
          <ul className="space-y-2">
            {favorites.map((id) => (
              <li key={id} className="text-sm">
                {id}
              </li>
            ))}
          </ul>
        )}
      </aside>

      {selected && (
        <DetailModal
          coin={selected}
          onClose={() => setSelected(null)}
          onToggleFav={() => toggleFavorite(selected.id)}
          fav={favorites.includes(selected.id)}
        />
      )}
    </div>
  );
}
