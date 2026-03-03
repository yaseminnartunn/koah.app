export default function StatsCard({ label, value, color, onClick = () => { } }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl p-3 text-white flex flex-col items-center justify-center gap-1 ${color}`}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs opacity-90 text-center leading-tight">{label}</span>
    </button>
  );
}