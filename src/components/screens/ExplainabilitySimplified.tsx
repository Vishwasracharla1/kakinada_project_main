import { ArrowLeft, Cpu, User, Activity, Clock, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ExplainabilitySimplifiedProps {
  onBack: () => void;
}

export function ExplainabilitySimplified({ onBack }: ExplainabilitySimplifiedProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'human'>('ai');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const aiAudit = [
    {
      id: 'AI-001',
      timestamp: '2024-12-02 10:45:23',
      detection: 'License Plate AP39Z9876',
      aiEngine: 'ANPR Engine v3.1.0',
      confidence: 96,
      inputs: ['Vehicle image', 'NH-16 camera feed', 'Lighting: Good'],
      keySignals: ['Plate region detected (98%)', 'OCR successful (96%)', 'Database match found'],
      confidenceBreakdown: [
        { factor: 'Image Quality', contribution: 35 },
        { factor: 'OCR Accuracy', contribution: 40 },
        { factor: 'Database Match', contribution: 25 },
      ],
      decision: 'Critical Alert - Stolen Vehicle',
      processingTime: 142,
      thresholds: { minConfidence: 85, escalationLevel: 'critical' },
    },
    {
      id: 'AI-002',
      timestamp: '2024-12-02 10:38:15',
      detection: 'Perimeter Intrusion',
      aiEngine: 'RakshakAI v2.3.1',
      confidence: 89,
      inputs: ['Video feed CAM-WZ-055', 'Zone: B-7 Restricted', 'Motion detected'],
      keySignals: ['Person detected (92%)', 'Zone validation (100%)', 'Duration: 12 seconds'],
      confidenceBreakdown: [
        { factor: 'Object Detection', contribution: 45 },
        { factor: 'Zone Classification', contribution: 35 },
        { factor: 'Behavior Pattern', contribution: 20 },
      ],
      decision: 'High Alert - Generate Notification',
      processingTime: 245,
      thresholds: { minConfidence: 80, escalationLevel: 'high' },
    },
  ];

  const humanAudit = [
    {
      id: 'HUM-001',
      timestamp: '2024-12-02 10:46:12',
      user: 'Operator Kumar',
      role: 'Operator',
      action: 'Viewed Alert',
      target: 'ALT-2401 - License Plate Detection',
      details: 'Opened alert from dashboard notification',
      ipAddress: '10.45.12.23',
    },
    {
      id: 'HUM-002',
      timestamp: '2024-12-02 10:47:05',
      user: 'Operator Kumar',
      role: 'Operator',
      action: 'Validated Detection',
      target: 'VL-001 - AP39Z9876',
      details: 'Confirmed plate match with stolen vehicle database',
      comments: 'Plate clearly visible in image. Database match confirmed.',
      ipAddress: '10.45.12.23',
    },
    {
      id: 'HUM-003',
      timestamp: '2024-12-02 10:48:20',
      user: 'Operator Kumar',
      role: 'Operator',
      action: 'Escalated to Supervisor',
      target: 'VL-001 - Critical Violation',
      details: 'Escalated stolen vehicle detection to Supervisor Ravi',
      escalationReason: 'Critical severity - requires supervisor approval',
      ipAddress: '10.45.12.23',
    },
    {
      id: 'HUM-004',
      timestamp: '2024-12-02 10:52:45',
      user: 'Supervisor Ravi Kumar',
      role: 'Supervisor',
      action: 'Approved Violation',
      target: 'VL-001 - AP39Z9876',
      details: 'Reviewed evidence and approved violation',
      comments: 'Verified with state database. Vehicle reported stolen on 2024-11-28. Field unit notified.',
      aiDecision: 'Critical Alert',
      humanOverride: false,
      ipAddress: '10.45.8.15',
    },
    {
      id: 'HUM-005',
      timestamp: '2024-12-02 10:15:55',
      user: 'Operator Priya',
      role: 'Operator',
      action: 'Rejected Detection',
      target: 'VL-008 - TN22AB5678',
      details: 'Marked as false positive',
      comments: 'AI detected text on billboard, not a vehicle plate. Static object.',
      aiDecision: 'Medium Alert',
      humanOverride: true,
      ipAddress: '10.45.12.24',
    },
    {
      id: 'HUM-006',
      timestamp: '2024-12-02 10:17:30',
      user: 'Supervisor Priya Sharma',
      role: 'Supervisor',
      action: 'Confirmed Override',
      target: 'VL-008 - False Positive',
      details: 'Confirmed operator rejection decision',
      comments: 'Override correct. Added to AI retraining queue.',
      aiDecision: 'Medium Alert',
      humanOverride: true,
      ipAddress: '10.45.8.16',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Explainability & Audit Trail</h1>
              <p className="text-gray-400 text-sm">Simplified AI reasoning and complete human action log</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('ai')}
          className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'ai' ? 'bg-blue-500 text-white' : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-blue-500/50'
          }`}
        >
          <Cpu className="w-4 h-4" />
          AI Decision Trail
        </button>
        <button
          onClick={() => setActiveTab('human')}
          className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'human' ? 'bg-blue-500 text-white' : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-blue-500/50'
          }`}
        >
          <User className="w-4 h-4" />
          Human Audit Trail
        </button>
      </div>

      {activeTab === 'ai' && (
        <div className="space-y-4">
          <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-black-400">
              🤖 AI Decision Trail shows how the AI arrived at each detection decision, including inputs, key signals, and confidence breakdown.
            </p>
          </div>

          {aiAudit.map((entry) => (
            <div key={entry.id} className="bg-[#0d1117] border-2 border-[#1f2937] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all">
              <div className="p-5 cursor-pointer" onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">{entry.detection}</p>
                      <p className="text-xs text-gray-500">{entry.aiEngine}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500 text-right">Timestamp</p>
                      <p className="text-white font-mono text-sm">{entry.timestamp}</p>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      {expandedEntry === entry.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500">AI Confidence</p>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500" style={{ width: `${entry.confidence}%` }} />
                        </div>
                        <span className="text-cyan-400 font-bold">{entry.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Processing Time</p>
                      <p className="text-white font-mono">{entry.processingTime}ms</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Final Decision</p>
                    <p className="text-green-400 font-medium">{entry.decision}</p>
                  </div>
                </div>
              </div>

              {expandedEntry === entry.id && (
                <div className="border-t border-[#1f2937] bg-[#0a0e1a] p-5 space-y-5">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">AI Inputs</p>
                    <div className="grid grid-cols-3 gap-2">
                      {entry.inputs.map((input, idx) => (
                        <div key={idx} className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded text-sm text-white">
                          {input}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Key Signals Detected</p>
                    <div className="space-y-2">
                      {entry.keySignals.map((signal, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-gray-300">{signal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Confidence Contribution</p>
                    <div className="space-y-3">
                      {entry.confidenceBreakdown.map((factor) => (
                        <div key={factor.factor}>
                          <div className="flex items-center justify_between mb-1">
                            <span className="text-sm text-gray-300">{factor.factor}</span>
                            <span className="text-sm text-cyan-400 font-bold">{factor.contribution}%</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${factor.contribution}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1f2937]">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Model Version</p>
                      <p className="text-white text-sm">{entry.aiEngine}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Thresholds Used</p>
                      <p className="text-white text-sm">
                        Min: {entry.thresholds.minConfidence}% • Level: {entry.thresholds.escalationLevel}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'human' && (
        <div className="space-y-4">
          <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-black-400">
              👤 Human Audit Trail shows who viewed, validated, or overrode AI decisions, with timestamps and rationale.
            </p>
          </div>

          {humanAudit.map((entry) => (
            <div
              key={entry.id}
              className={`bg-[#0d1117] border-2 rounded-xl overflow-hidden transition-all ${
                entry.humanOverride ? 'border-orange-500/50 hover:border-orange-500' : 'border-[#1f2937] hover:border-green-500/50'
              }`}
            >
              <div className={`p-5 ${entry.humanOverride ? 'bg-orange-500/5' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${entry.role === 'Supervisor' ? 'bg-gray-500/20' : 'bg-gray-500/20'}`}>
                      <User className={`w-5 h-5 ${entry.role === 'Supervisor' ? 'text-black-400' : 'text-cyan-400'}`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{entry.user}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs ${entry.role === 'Supervisor' ? 'bg-green-500/20 text-black-400' : 'bg-cyan-500/20 text-black-400'}`}>
                          {entry.role}
                        </span>
                        <span className="text-xs text-gray-500">• {entry.ipAddress}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>{entry.timestamp}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        entry.action.includes('Approved') || entry.action.includes('Validated')
                          ? 'bg-green-500/20 text-green-400'
                          : entry.action.includes('Rejected') || entry.action.includes('Override')
                          ? 'bg-red-500/20 text-red-400'
                          : entry.action.includes('Escalated')
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {entry.action.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="text-white text-sm">{entry.target}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Action Details</p>
                    <p className="text-gray-300 text-sm">{entry.details}</p>
                  </div>
                  {entry.comments && (
                    <div className="bg-[#0a0e1a] border border-[#1f2937] rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Remarks</p>
                      <p className="text-white text-sm italic">&quot;{entry.comments}&quot;</p>
                    </div>
                  )}
                  {entry.escalationReason && (
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                      <p className="text-xs text-orange-400 mb-1">Escalation Reason</p>
                      <p className="text-white text-sm">{entry.escalationReason}</p>
                    </div>
                  )}
                  {entry.humanOverride && (
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex items-start gap-2">
                      <Eye className="w-4 h-4 text-orange-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-orange-400 mb-1">Human Override Detected</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500">AI Decision: </span>
                            <span className="text-white">{entry.aiDecision}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Human Action: </span>
                            <span className="text-orange-400">{entry.action}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

