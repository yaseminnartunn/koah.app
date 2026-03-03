import { useState, useEffect } from "react";
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { exerciseStore, progressStore } from "@/lib/localStore";

const categoryLabels = {
  nefes: "Nefes Egzersizi",
  isinma: "Isınma Hareketi",
  guclendir: "Güçlendirme",
  germe: "Germe",
};

export default function ExerciseDetail() {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setExercise(exerciseStore.get(id));
    }
    setLoading(false);
  }, []);

  const handleComplete = async () => {
    if (!exercise) return;
    setSaving(true);
    // Kısa gecikme — kullanıcıya "kaydediliyor" hissi ver
    await new Promise((r) => setTimeout(r, 600));
    progressStore.add(exercise);
    setSaving(false);
    setCompleted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0faf4] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#2ecc71] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-[#fff0f6] flex flex-col items-center justify-center gap-3">
        <p className="text-gray-500">Egzersiz bulunamadı</p>
        <Link to={createPageUrl("Exercises")} className="text-[#e91e8c] font-semibold">
          Geri Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff0f6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e91e8c] to-[#f06292] px-4 pt-10 pb-6 rounded-b-[2.5rem] relative">
        <div className="flex items-center gap-3 mb-2">
          <Link to={createPageUrl("Exercises")} className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <span className="text-white/90 text-sm">{categoryLabels[exercise.category]}</span>
        </div>
        <h1 className="text-white text-xl font-bold leading-tight">{exercise.title}</h1>
        {exercise.is_standing && (
          <div className="mt-3 flex justify-start">
            <span className="bg-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              Ayakta Yapılır
            </span>
          </div>
        )}
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Uyarı kutusu */}
        {showWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-amber-800 text-sm font-semibold mb-1">Dikkat!</p>
              <p className="text-amber-700 text-xs leading-relaxed">
                Bu hareketi yaparken baş dönerse ya da kendinizi iyi hissetmezseniz egzersizi sonlandırın.
                Bağımsız değil, her zaman sıranızda yapın.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowWarning(false)}
              className="text-amber-500 hover:text-amber-700 text-sm p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Görsel */}
        <div className="w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          {exercise.image_url ? (
            <img
              src={exercise.image_url}
              alt={exercise.title}
              className="w-full h-52 object-cover"
            />
          ) : (
            <div className="w-full h-52 bg-pink-50 flex items-center justify-center">
              <span className="text-5xl">🫁</span>
            </div>
          )}
        </div>

        {/* Süre & Zorluk */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[#e91e8c]" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">Süre</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{exercise.duration_minutes || 5} dakika</p>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 text-lg">
              💪
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">Zorluk</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5 capitalize">{exercise.difficulty || "kolay"}</p>
            </div>
          </div>
        </div>

        {/* Hakkında */}
        {exercise.description && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-2">Hakkında</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{exercise.description}</p>
          </div>
        )}

        {/* Nasıl Yapılır */}
        {exercise.instructions && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-2">Nasıl Yapılır?</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exercise.instructions}</p>
          </div>
        )}

        {/* Tamamla butonu */}
        {completed ? (
          <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-2xl p-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-700 font-semibold text-sm">Egzersiz tamamlandı! 🎉</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleComplete}
            disabled={saving}
            className="w-full bg-gradient-to-r from-[#e91e8c] to-[#f06292] text-white font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60 text-base flex items-center justify-center gap-2"
          >
            {saving ? "Kaydediliyor..." : "Son Egzersiz ✓"}
          </button>
        )}
      </div>
    </div>
  );
}