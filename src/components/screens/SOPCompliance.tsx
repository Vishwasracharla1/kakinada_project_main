import { useState } from 'react';
import { AlertTriangle, Cpu, Sliders, Activity } from 'lucide-react';

type Severity = 'low' | 'medium' | 'high' | 'critical';

interface ModelConfig {
  id: string;
  name: string;
  aiEngine: string;
  description: string;
  minConfidence: number;
  alertLevel: Severity;
  allowedDeviation: number;
  lastUpdated: string;
}

interface Violation {
  id: string;
  violationType: string;
  severity: Severity;
  timestamp: string;
  aiEngine: string;
  detection: string;
  camera: string;
  autoAction: string;
  expectedConfidence?: number;
  actualConfidence?: number;
  expectedTime?: string;
  actualTime?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  aiDecision?: string;
  supervisorOverride?: string;
  overrideCount?: string;
}

const getSeverityColor = (severity: Severity) => {
  switch (severity) {
    case 'critical':
      return 'border-red-500/60 bg-red-500/10 text-red-400';
    case 'high':
      return 'border-orange-500/60 bg-orange-500/10 text-orange-400';
    case 'medium':
      return 'border-yellow-500/60 bg-yellow-500/10 text-yellow-400';
    case 'low':
    default:
      return 'border-green-500/60 bg-green-500/10 text-green-400';
  }
};

export function SOPCompliance() {
  const [activeTab, setActiveTab] = useState<'config' | 'violations'>('config');

  const models: ModelConfig[] = [
    {
      id: 'AI-SOP-001',
      name: 'RakshakAI ANPR Engine',
      aiEngine: 'RKSH-ANPR-v2.3',
      description:
        'Detects and reads vehicle plates in real time across city cameras. Flags unregistered, suspicious, or blacklist matches and feeds into ANPR workflows.',
      minConfidence: 85,
      alertLevel: 'high',
      allowedDeviation: 5,
      lastUpdated: '2024-12-10 14:30 IST',
    },
    {
      id: 'AI-SOP-002',
      name: 'Intrusion Detection Model',
      aiEngine: 'RKSH-INTRUSION-v1.8',
      description:
        'Monitors perimeters and restricted zones for human or vehicle intrusions, tailgating, and fence climbing behaviours.',
      minConfidence: 90,
      alertLevel: 'medium',
      allowedDeviation: 3,
      lastUpdated: '2024-12-09 11:20 IST',
    },
  ];

  const violations: Violation[] = [
    {
      id: 'AI-VIOL-013',
      violationType: 'Low Confidence Detection Escalated by Supervisor',
      severity: 'high',
      timestamp: '2025-12-15 09:42:18 IST',
      aiEngine: 'Crowd Aggression Detector v4.0',
      detection: 'Group violence / mob aggression',
      camera: 'CAM-AZ-005 • RTC Bus Stand',
      autoAction: 'Alert pushed to operator with medium priority',
      expectedConfidence: 82,
      actualConfidence: 57,
      expectedBehavior: 'Auto-flag only when confidence ≥ 80% with 3+ aggression cues',
      actualBehavior: 'Alert triggered with low confidence and only 1 aggression cue',
      aiDecision: 'Marked as potential mob conflict',
      supervisorOverride: 'Reclassified as false positive and suppressed',
      overrideCount: '7 similar overrides in last 24 hours for this model + camera pair',
    },
    {
      id: 'AI-VIOL-017',
      violationType: 'Late Processing Beyond SOP Time Window',
      severity: 'critical',
      timestamp: '2025-12-15 08:21:03 IST',
      aiEngine: 'Weapon Detection Engine v2.8',
      detection: 'Suspected weapon brandish',
      camera: 'CAM-BZ-012 • Cinema Road Junction',
      autoAction: 'High priority alert + snapshot sent to control room',
      expectedTime: '< 500ms',
      actualTime: '1.9s',
      expectedBehavior: 'Sub-second detection and alert for weapon-like objects',
      actualBehavior: 'Detection delayed, alert reached operator after incident escalation',
      aiDecision: 'Probable weapon detected in right hand of subject',
      supervisorOverride: 'Marked as SOP breach and escalated to AI review board',
      overrideCount: '3 critical latency breaches in last 6 hours',
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button className="text-xs text-gray-400 hover:text-gray-200">
            {'< Back to Admin'}
          </button>
          <div>
            <p className="text-lg text-white font-medium">AI SOP Compliance</p>
            <p className="text-xs text-gray-400">
              Configure AI model behavior standards and monitor violations and overrides.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            <span>3 Models Compliant</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>4 Active Violations</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1f2937] pb-2">
        <button
          className={`px-4 py-2 text-sm rounded-t-lg border-b-2 ${
            activeTab === 'config'
              ? 'border-purple-400 text-purple-300 bg-purple-500/10'
              : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
          }`}
          onClick={() => setActiveTab('config')}
        >
          Model SOP Configuration
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-t-lg border-b-2 ${
            activeTab === 'violations'
              ? 'border-red-400 text-red-300 bg-red-500/10'
              : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
          }`}
          onClick={() => setActiveTab('violations')}
        >
          Violations & Overrides
        </button>
      </div>

      {/* Model configuration tab */}
      {activeTab === 'config' && (
        <div className="space-y-4">
          {models.map((model) => (
            <div
              key={model.id}
              className="bg-[#0d1117] border border-[#1f2937] rounded-xl overflow-hidden"
            >
              <div className="p-5 border-b border-[#1f2937] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/40">
                    <Sliders className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{model.name}</p>
                    <p className="text-xs text-gray-400">
                      {model.id} • {model.aiEngine}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 max-w-2xl">{model.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
                    COMPLIANT
                  </div>
                  <button className="px-3 py-1 rounded-full bg-slate-800 text-gray-200 border border-slate-600 hover:bg-slate-700 flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    <span>Configure</span>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-5">
                <div className="grid grid-cols-4 gap-6">
                  {/* Minimum confidence */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Minimum Confidence</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm flex items-center justify-between">
                        <span className="font-mono text-sm">≥ {model.minConfidence}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Detections below this are flagged.
                    </p>
                  </div>

                  {/* Alert level (read-only for now) */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">
                      Alert Escalation Threshold
                    </label>
                    <select
                      value={model.alertLevel}
                      disabled
                      className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm cursor-not-allowed opacity-80"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Alerts at this level escalate to supervisor.
                    </p>
                  </div>

                  {/* Allowed deviation */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">
                      Allowed Deviation Range
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">±</span>
                      <input
                        type="number"
                        value={model.allowedDeviation}
                        readOnly
                        className="flex-1 px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Acceptable confidence variance from expected baseline.
                    </p>
                  </div>

                  {/* Last updated */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Last SOP Update</label>
                    <div className="px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg">
                      <p className="text-white text-sm font-mono">{model.lastUpdated}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Last time this model&apos;s SOP configuration was modified.
                    </p>
                  </div>
                </div>

                {/* Advanced metrics */}
                <div className="mt-4 pt-4 border-t border-[#1f2937]">
                  <div className="flex items-center justify-between text-sm text-gray-400 flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <span>Expected Processing Time:</span>
                      <span className="text-white font-mono">{'< 500ms'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Max False Positive Rate:</span>
                      <span className="text-white font-mono">{'< 5%'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Retraining Trigger:</span>
                      <span className="text-white">10 supervisor overrides / day</span>
                    </div>
                    <button className="text-sm text-purple-400 hover:text-purple-300">
                      View Model History →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Violations tab */}
      {activeTab === 'violations' && (
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-white font-medium mb-1">AI SOP Violations Log</p>
                <p className="text-sm text-gray-400">
                  AI models that failed to meet defined standards. Includes low confidence
                  detections, late processing, over-sensitivity, and supervisor override patterns
                  indicating model drift.
                </p>
              </div>
            </div>
          </div>

          {violations.map((violation) => (
            <div
              key={violation.id}
              className="bg-[#0d1117] border-2 border-[#1f2937] rounded-xl overflow-hidden hover:border-red-500/50 transition-all"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="text-white font-medium">{violation.violationType}</p>
                      <p className="text-xs text-gray-500">Violation ID: {violation.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-3 py-1 border rounded-lg ${getSeverityColor(
                        violation.severity
                      )}`}
                    >
                      <p className="text-xs uppercase font-bold">{violation.severity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Timestamp</p>
                      <p className="text-white font-mono text-sm">{violation.timestamp}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">AI Engine</p>
                    <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded">
                      <p className="text-purple-400 text-sm font-medium">{violation.aiEngine}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Detection Type</p>
                    <p className="text-white text-sm">{violation.detection}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Camera/Device</p>
                    <p className="text-cyan-400 text-sm">{violation.camera}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Auto Action Taken</p>
                    <p className="text-orange-400 text-sm">{violation.autoAction}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">System Response</p>
                    <button className="text-sm text-cyan-400 hover:text-cyan-300">
                      View Logs →
                    </button>
                  </div>
                </div>

                {/* Violation details */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 text-sm">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Violation Details
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {violation.expectedConfidence !== undefined &&
                      violation.actualConfidence !== undefined && (
                        <>
                          <div>
                            <p className="text-xs text-gray-500">Expected Confidence</p>
                            <p className="text-white font-mono">
                              ≥ {violation.expectedConfidence}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Actual Confidence</p>
                            <p className="text-red-400 font-mono font-bold">
                              {violation.actualConfidence}%
                            </p>
                          </div>
                        </>
                      )}

                    {violation.expectedTime && violation.actualTime && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">Expected Processing Time</p>
                          <p className="text-white font-mono">{violation.expectedTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Actual Processing Time</p>
                          <p className="text-red-400 font-mono font-bold">
                            {violation.actualTime}
                          </p>
                        </div>
                      </>
                    )}

                    {violation.expectedBehavior && violation.actualBehavior && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">Expected Behavior</p>
                          <p className="text-white text-sm">{violation.expectedBehavior}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Actual Behavior</p>
                          <p className="text-red-400 text-sm font-bold">
                            {violation.actualBehavior}
                          </p>
                        </div>
                      </>
                    )}

                    {violation.aiDecision && violation.supervisorOverride && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">AI Decision</p>
                          <p className="text-white text-sm">{violation.aiDecision}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Supervisor Override</p>
                          <p className="text-orange-400 text-sm font-bold">
                            {violation.supervisorOverride}
                          </p>
                        </div>
                      </>
                    )}

                    {violation.overrideCount && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Override Pattern</p>
                        <p className="text-red-400 text-sm font-bold">
                          {violation.overrideCount}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-[#0a0e1a] border-t border-[#1f2937] flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Recommended Action:{' '}
                  <span className="text-yellow-400">Schedule model retraining</span>
                </span>
                <button className="px-4 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded text-xs hover:bg-purple-500/30">
                  Add to Retraining Queue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
