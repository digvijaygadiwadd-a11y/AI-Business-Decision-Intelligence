import React from 'react';

export default function ProfessionalResponseCard({ response }) {
  if (!response) return null;

  return (
    <div className="professional-output-card bg-white border-l-4 border-purple-600 p-4 shadow-sm rounded-r-lg space-y-3">
      <div className="flex items-center justify-between border-b pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-700">Executive Summary</span>
        <span className="text-xs text-gray-500">Dataset: test_data.csv</span>
      </div>

      <div className="text-gray-800 text-sm leading-relaxed font-medium">
        {response.answer || response.strategic_analysis}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase text-gray-600 mb-2">Strategic Recommendations</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Diversify client acquisition channels to mitigate top-tier revenue dependency.</li>
          <li>Establish automated threshold alerts for quarterly margin deviations.</li>
          <li>Reallocate working capital buffers to cushion potential volume contractions.</li>
        </ul>
      </div>
    </div>
  );
}
