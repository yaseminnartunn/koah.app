import { useState, useEffect } from "react";
import { ArrowLeft, LogOut, Award, Calendar, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { progressStore } from "@/lib/localStore";

export default function Profile() {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    setProgress(progressStore.list());
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];
  const todayCount = progress.filter((p) => p.completed_date === todayStr).length;
  const uniqueDays = new Set(progress.map((p) => p.completed_date)).size;
  const recent = progress.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#fff0f6]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e91e8c] to-[#f06292] px-4 pt-10 pb-8 rounded-b-[2.5rem] text-center relative">
        <div className="absolute left-4 top-10">
          <Link to={createPageUrl("Home")} className="p-2 bg-white/20 rounded-full inline-block">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
        </div>
        <div className="w-20 h-20 rounded-full bg-white/30 mx-auto flex items-center justify-center mb-3">
          <span className="text-3xl">🧑‍⚕️</span>
        </div>
        <h2 className="text-white text-lg font-bold">Kullanıcı</h2>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* İstatistikler */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <Activity className="w-5 h-5 text-[#e91e8c] mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-800">{todayCount}</p>
            <p className="text-xs text-gray-400">Bugün</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <Award className="w-5 h-5 text-[#e91e8c] mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-800">{progress.length}</p>
            <p className="text-xs text-gray-400">Toplam</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <Calendar className="w-5 h-5 text-[#e91e8c] mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-800">{uniqueDays}</p>
            <p className="text-xs text-gray-400">Aktif Gün</p>
          </div>
        </div>

        {/* Son Egzersizler */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Son Egzersizler</h3>
          {recent.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              Henüz egzersiz tamamlanmadı 🌱
            </p>
          ) : (
            <div className="space-y-2">
              {recent.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm">✅</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{p.exercise_title}</p>
                      <p className="text-xs text-gray-400">{p.completed_date}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#e91e8c] font-medium">{p.duration_minutes} dk</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verileri sıfırla (opsiyonel) */}
        <button
          onClick={() => {
            if (window.confirm("Tüm egzersiz geçmişi silinsin mi?")) {
              localStorage.removeItem("koah_progress");
              setProgress([]);
            }
          }}
          className="w-full flex items-center justify-center gap-2 bg-white border border-red-100 text-red-400 rounded-2xl py-3 text-sm font-semibold shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Geçmişi Sıfırla
        </button>
      </div>
    </div>
  );
}