const categories = [
  { key: "all", label: "Tümü" },
  { key: "nefes", label: "Nefes" },
  { key: "isinma", label: "Isınma" },
  { key: "guclendir", label: "Güçlendir" },
  { key: "germe", label: "Germe" },
];

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            selected === cat.key
              ? "bg-gradient-to-r from-[#e91e8c] to-[#f06292] text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}