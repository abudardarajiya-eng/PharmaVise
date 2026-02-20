export default function RiskBadge({ label }) {
  // Define styles for each risk category
  const variants = {
    Safe: {
      container: "bg-emerald-50 text-emerald-700 border-emerald-100",
      dot: "bg-emerald-500",
    },
    "Adjust Dosage": {
      container: "bg-amber-50 text-amber-700 border-amber-100",
      dot: "bg-amber-500",
    },
    Toxic: {
      container: "bg-red-50 text-red-700 border-red-100",
      dot: "bg-red-500",
    },
    Ineffective: {
      container: "bg-rose-50 text-rose-700 border-rose-100",
      dot: "bg-rose-500",
    },
    Unknown: {
      container: "bg-slate-50 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
    },
  };

  // Fallback to 'Unknown' if label doesn't match
  const style = variants[label] || variants["Unknown"];

  return (
    <div className={`
      flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase
      transition-all duration-300 shadow-sm
      ${style.container}
    `}>
      {/* A small "status dot" adds a professional touch */}
      <span className={`w-2 h-2 rounded-full animate-pulse ${style.dot}`} />
      {label}
    </div>
  );
}