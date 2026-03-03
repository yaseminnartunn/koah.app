import { Clock, ChevronRight } from "lucide-react";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";

const categoryLabels = {
  nefes: "Nefes",
  isinma: "Isınma",
  guclendir: "Güçlendir",
  germe: "Germe",
};

const difficultyColors = {
  kolay: "bg-green-100 text-green-700",
  orta: "bg-yellow-100 text-yellow-700",
  zor: "bg-red-100 text-red-700",
};

// Resim yoksa rastgele pembe kutucuklar
const PINK_BOXES = ['#fce4ec', '#f8bbd9', '#f06292', '#e91e8c', '#f48fb1', '#ec407a'];
const ImagePlaceholder = ({ id }) => {
  const seed = id ? [...id].reduce((a, c) => a + c.charCodeAt(0), 0) : 0;
  return (
    <div className="w-full h-44 flex flex-wrap gap-1 p-2 bg-pink-50" aria-hidden>
      {[...Array(12)].map((_, i) => {
        const color = PINK_BOXES[(seed + i) % PINK_BOXES.length];
        const w = 30 + ((seed + i * 3) % 40);
        const h = 25 + ((seed + i * 5) % 35);
        return (
          <div
            key={i}
            className="rounded-md flex-shrink-0"
            style={{ width: w + '%', height: h, backgroundColor: color }}
          />
        );
      })}
    </div>
  );
};

export default function ExerciseCard({ exercise }) {
  return (
    <Link
      to={createPageUrl(`ExerciseDetail?id=${exercise.id}`)}
      className="block bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Resim alanı – etiketler resmin üzerinde, alt köşelerde */}
      <div className="relative w-full h-44 overflow-hidden rounded-t-2xl bg-gray-100">
        {exercise.image_url ? (
          <img
            src={exercise.image_url}
            alt={exercise.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImagePlaceholder id={exercise.id} />
        )}
        {/* Resmin üzerinde: sol alt pembe "Nefes", sağ alt gri "Ayakta" */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end pointer-events-none">
          <span className="bg-gradient-to-r from-[#e91e8c] to-[#f06292] text-white text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
            {categoryLabels[exercise.category] || exercise.category}
          </span>
          {exercise.is_standing && (
            <span className="bg-white/90 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
              Ayakta
            </span>
          )}
        </div>
      </div>
      {/* Metin alanı */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-base mb-1.5">{exercise.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{exercise.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">{exercise.duration_minutes || 5} dk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${difficultyColors[exercise.difficulty]}`}>
              {exercise.difficulty}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
}