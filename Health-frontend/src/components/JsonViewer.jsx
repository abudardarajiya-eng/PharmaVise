import { useState } from "react";
import { FileJson, Copy, Check, Download } from "lucide-react";

export default function JsonViewer({ data }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `PharmaGuard_Report_${data.patient_id || "export"}.json`;
    link.click();
  };

  return (
    <div className="mt-6 border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
          <FileJson size={14} /> RAW SYSTEM OUTPUT
        </span>
        <div className="flex gap-2">
          <button 
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-white rounded transition-colors text-slate-600"
            title="Copy JSON"
          >
            {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
          </button>
          <button 
            onClick={downloadJson}
            className="p-1.5 hover:bg-white rounded transition-colors text-slate-600"
            title="Download JSON"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
      <div className="p-4 max-h-60 overflow-y-auto">
        <pre className="text-[11px] font-mono text-slate-700 leading-relaxed">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}