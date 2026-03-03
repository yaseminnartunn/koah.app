import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ExerciseCard from "../components/exercise/ExerciseCard";
import CategoryFilter from "../components/exercise/CategoryFilter";
import { exerciseStore } from "@/lib/localStore";
import { MOCK_EXERCISES } from "@/data/mockExercises";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    setExercises(exerciseStore.list());
    setLoading(false);
  }, []);

  const filtered =
    category === "all" ? exercises : exercises.filter((e) => e.category === category);

  return (
    <div className="min-h-screen bg-[#fff0f6]">
      <div className="bg-gradient-to-br from-[#e91e8c] to-[#f06292] px-4 pt-10 pb-5 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-4">
          <Link to={createPageUrl("Home")} className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-white text-lg font-bold">KOAH Egzersizleri</h1>
        </div>
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      <div className="px-4 py-5">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-3xl">🫁</p>
            <p className="mt-2 text-sm">Bu kategoride egzersiz yok</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}