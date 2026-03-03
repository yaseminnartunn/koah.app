import { useState, useEffect } from "react";
import { Bell, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ExerciseCard from "../components/exercise/ExerciseCard";
import CategoryFilter from "../components/exercise/CategoryFilter";
import StatsCard from "../components/exercise/StatsCard";
import { exerciseStore, progressStore } from "@/lib/localStore";

export default function Home() {
  const [exercises, setExercises] = useState([]);
  const [progress, setProgress] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setExercises(exerciseStore.list());
    setProgress(progressStore.list());
  }, []);

  const filtered = exercises.filter((ex) => {
    const matchCat = category === "all" || ex.category === category;
    const matchSearch =
      !search || ex.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const todayStr = new Date().toISOString().split("T")[0];
  const todayCount = progress.filter((p) => p.completed_date === todayStr).length;
  const totalCount = progress.length;

  return (
    <div className="min-h-screen bg-[#fff0f6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e91e8c] to-[#f06292] px-4 pt-10 pb-8 rounded-b-[2.5rem] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-pink-100 text-sm font-semibold">Hoş geldin 👋</p>
            <h1 className="text-white text-xl font-bold">Kullanıcı</h1>
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-white/20 rounded-full">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <Link to={createPageUrl("Profile")} className="p-2 bg-white/20 rounded-full">
              <User className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Egzersiz ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none text-gray-700"
          />
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Stats */}
        <div className="flex gap-3">
          <StatsCard label="Bugün Tamamlanan" value={todayCount} color="bg-gradient-to-b from-[#e91e8c] to-[#f48fb1]" />
          <StatsCard label="Toplam Egzersiz" value={totalCount} color="bg-gradient-to-b from-[#ad1457] to-[#e91e8c]" />
          <StatsCard label="Mevcut Egzersiz" value={exercises.length} color="bg-gradient-to-b from-[#f06292] to-[#f48fb1]" />
        </div>

        {/* Bugünkü Öneri */}
        <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm">
          <p className="text-xs text-pink-500 font-bold tracking-widest mb-1">✦ GÜNÜN EGZERSİZİ</p>
          <p className="text-base font-bold text-gray-800">Bugünkü egzersize hazır mısın?</p>
          <p className="text-xs text-gray-500 mt-1">
            Solunum rehabilitasyonu için nefes egzersizleri seni bekliyor.
          </p>
          <Link
            to={createPageUrl("Exercises")}
            className="mt-3 inline-block bg-gradient-to-r from-[#e91e8c] to-[#f06292] text-white text-sm font-bold px-5 py-2 rounded-xl shadow"
          >
            Başla →
          </Link>
        </div>

        {/* Kategori filtresi */}
        <div>
          <h2 className="text-sm font-bold text-gray-700 mb-3">Egzersizler</h2>
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>

        {/* Egzersiz listesi */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">😔</p>
            <p className="text-sm mt-2">Egzersiz bulunamadı</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}