import { useState } from "react";
import FileUpload from "./components/FileUpload";
import DrugInput from "./components/DrugInput";
import ResultsDisplay from "./components/ResultsDisplay";
import { analyzeVCF } from "./services/api";
import { Activity, Beaker, ShieldCheck, Download } from "lucide-react";

export default function App() {
  const [file, setFile] = useState(null);
  const [drugs, setDrugs] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file || !drugs) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const data = await analyzeVCF(file, drugs);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please verify VCF format and drug input.");
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!results) return;

    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pharmaguard_report.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">

      {/* Header */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-800">
              Pharma<span className="text-blue-600">Vise</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-slate-400">
            <span>RIFT 2026</span>
            <span className="flex items-center gap-1 text-green-600">
              <Activity className="w-4 h-4" />
              System Online
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT PANEL */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Patient Pharmacogenomic Analysis
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Upload a VCF (v4.2) genomic file and evaluate drug-specific
                metabolic risks aligned with CPIC guidelines.
              </p>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  1. Genomic Data
                </label>
                <FileUpload setFile={setFile} selectedFile={file} />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2. Medication Selection
                </label>
                <DrugInput drugs={drugs} setDrugs={setDrugs} />
              </div>

              <button
                disabled={!file || !drugs || loading}
                onClick={handleSubmit}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2
                  ${loading
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-blue-900/10 active:scale-[0.98]"
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
                    AI Processing Genome...
                  </>
                ) : (
                  "Run Risk Assessment"
                )}
              </button>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
            </div>

            {/* Credibility Section */}
            <div className="text-xs text-slate-400 leading-relaxed">
              Powered by AI-driven variant interpretation and CPIC-aligned
              pharmacogenomic guidelines.
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7">
            {results ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Risk Assessment Report
                  </h3>
                  <button
                    onClick={downloadJSON}
                    className="flex items-center gap-2 text-sm bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <Download className="w-4 h-4" />
                    Export JSON
                  </button>
                </div>

                <ResultsDisplay results={results} />
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 text-center bg-white/50">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <Beaker className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800">
                  Awaiting Clinical Input
                </h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
                  Upload genomic data and medication details to generate
                  personalized pharmacogenomic insights.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}