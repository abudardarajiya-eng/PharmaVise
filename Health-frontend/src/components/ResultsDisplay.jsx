import { Activity, AlertCircle, CheckCircle2, Info, FileJson, Dna, ClipboardList } from "lucide-react";
import RiskBadge from "./RiskBadge";
import JsonViewer from "./JsonViewer";

export default function ResultsDisplay({ results }) {
  if (!results) return null;

  // Handle both array and single object responses safely
  const resultsArray = Array.isArray(results) ? results : [results];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Activity className="text-blue-600 w-5 h-5" />
          Clinical Analysis Results
        </h2>
        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
          {resultsArray.length} Drug(s) Evaluated
        </span>
      </div>

      {resultsArray.map((result, index) => (
        <div key={index} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          
          {/* Header Section */}
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Medication</p>
              <h3 className="text-2xl font-bold text-slate-900">{result.drug}</h3>
            </div>
            <RiskBadge label={result.risk_assessment.risk_label} />
          </div>

          <div className="p-8 space-y-8">
            {/* Genomics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Dna size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-900/60 uppercase tracking-wide">Pharmacogenomic Profile</p>
                  <p className="text-lg font-bold text-blue-900">{result.pharmacogenomic_profile.primary_gene}</p>
                  <p className="text-sm text-blue-700 font-medium italic">{result.pharmacogenomic_profile.phenotype}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <div className="bg-emerald-600 p-2 rounded-lg text-white">
                  <ClipboardList size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-900/60 uppercase tracking-wide">Guideline Confidence</p>
                  <p className="text-lg font-bold text-emerald-900">{(result.risk_assessment.confidence_score * 100).toFixed(0)}%</p>
                  <p className="text-sm text-emerald-700 font-medium italic">CPIC Level A Alignment</p>
                </div>
              </div>
            </div>

            {/* Recommendation Section */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-tighter">
                <AlertCircle size={16} className="text-blue-600" />
                Clinical Recommendation
              </h4>
              <div className="p-5 rounded-2xl bg-slate-900 text-slate-50 font-medium leading-relaxed">
                {result.clinical_recommendation.dose_adjustment || "Standard dosing recommended based on genotype."}
              </div>
            </div>

            {/* AI Explanation Section */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-tighter">
                <Info size={16} className="text-blue-600" />
                Biological Mechanism (XAI)
              </h4>
              <div className="relative pl-6 border-l-2 border-slate-200">
                <p className="text-slate-600 leading-relaxed text-sm italic">
                  "{result.llm_generated_explanation.summary}"
                </p>
              </div>
            </div>

            {/* Raw Data Toggle */}
            <div className="pt-4 border-t border-slate-100">
               <JsonViewer data={result} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}