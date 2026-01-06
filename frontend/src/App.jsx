import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import AddProductModal from "./components/AddProductModal.jsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const isEmpty = useMemo(() => query.trim().length === 0, [query]);

  useEffect(() => {
    let cancel = false;

    async function run() {
      if (isEmpty) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get(`${API}/api/products/search?q=${encodeURIComponent(query)}`);
        if (!cancel) setResults(data);
      } catch (e) {
        if (!cancel) setResults([]);
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    const t = setTimeout(run, 250);
    return () => {
      cancel = true;
      clearTimeout(t);
    };
  }, [query, isEmpty]);

  return (
    <div className="min-h-screen relative">
      <Header onAdd={() => setOpenAdd(true)} />
      <main className="mx-auto max-w-6xl px-4 pb-16 relative z-10">
        <div className="mt-12">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mt-10">
          {isEmpty ? (
            <div className="rounded-3xl border-2 border-red-900/40 bg-slate-900/80 backdrop-blur-sm p-12 text-center shadow-2xl">
              <div className="text-6xl mb-4">🇹🇳</div>
              <p className="text-3xl font-bold text-white mb-2">مرحبا بك في ConsumeSafe</p>
              <p className="text-xl text-slate-300 mb-6">
                ابحث عن المنتجات للتحقق من قائمة المقاطعة واكتشاف البدائل التونسية
              </p>
              <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Type a product name or brand to check if it's boycotted and discover Tunisian alternatives that support our local economy.
              </p>
            </div>
          ) : loading ? (
            <div className="mt-10 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
              <p className="mt-4 text-slate-300 font-semibold">جاري البحث...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="mt-10 rounded-3xl border-2 border-red-900/40 bg-slate-900/80 backdrop-blur-sm p-10 text-center shadow-2xl">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-2xl font-bold text-white">لا توجد نتائج</p>
              <p className="mt-3 text-lg text-slate-300">No match found • جرب اسم منتج آخر أو أضفه إلى قاعدة البيانات</p>
              <button
                className="mt-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 font-bold text-white text-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg hover:shadow-red-900/50"
                onClick={() => setOpenAdd(true)}
              >
                ➕ أضف منتج جديد
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <p className="text-slate-400 font-semibold">
                  {results.length} {results.length === 1 ? 'نتيجة' : 'نتائج'} • {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>

        <AddProductModal open={openAdd} onClose={() => setOpenAdd(false)} api={API} />
      </main>

      <footer className="border-t border-red-900/40 bg-slate-950/90 py-8 text-center text-sm text-slate-400 relative z-10">
        <p className="font-semibold">🇹🇳 صنع من أجل تونس • Built for Tunisia</p>
        <p className="mt-2 text-xs text-slate-500">Support local products • ادعم المنتجات المحلية</p>
      </footer>
    </div>
  );
}
