import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, Eye, Clock, Shield } from 'lucide-react';

interface ANPRSupervisorQueueProps {
  onBack: () => void;
}

export function ANPRSupervisorQueue({ onBack }: ANPRSupervisorQueueProps) {
  const escalatedViolations = [
    {
      id: 'VL-001',
      plate: 'AP39Z9876',
      confidence: 96,
      time: '10:23:45',
      location: 'NH-16 Junction',
      violation: 'Stolen Vehicle Match',
      severity: 'critical',
      escalatedBy: 'Operator Kumar',
      escalatedTime: '10:25:12',
      reason: 'Vehicle in national stolen database',
      operatorNotes: 'Plate matches stolen vehicle report #ST-2024-1156. Immediate action recommended.',
    },
    {
      id: 'VL-008',
      plate: 'KL14RS1357',
      confidence: 93,
      time: '09:38:42',
      location: 'Highway Entry',
      violation: 'Wanted Vehicle',
      severity: 'critical',
      escalatedBy: 'Operator Priya',
      escalatedTime: '09:40:15',
      reason: 'Associated with pending court case',
      operatorNotes: 'Vehicle registered in pending investigation case.',
    },
    {
      id: 'VL-012',
      plate: 'AP16ZZ8910',
      confidence: 88,
      time: '09:15:22',
      location: 'Port Area Gate',
      violation: 'Unauthorized Entry - Restricted Zone',
      severity: 'high',
      escalatedBy: 'Operator Ravi',
      escalatedTime: '09:17:45',
      reason: 'No valid port access permit',
      operatorNotes: 'Vehicle entered restricted port area without proper authorization.',
    },
    {
      id: 'VL-015',
      plate: 'TN09AB4567',
      confidence: 91,
      time: '08:52:18',
      location: 'Beach Road',
      violation: 'Repeated Red Light Violation',
      severity: 'high',
      escalatedBy: 'Operator Kumar',
      escalatedTime: '08:55:30',
      reason: '3rd violation in 2 hours',
      operatorNotes: 'Same vehicle detected violating traffic signals at 3 different junctions within 2 hours.',
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to ANPR List
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Supervisor Escalation Queue</h1>
              <p className="text-gray-400 text-sm">
                Critical & high-severity violations requiring immediate supervisor decision
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-xs text-gray-400">Critical Pending</p>
            <p className="text-red-400 text-xl">2</p>
          </div>
          <div className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg">
            <p className="text-xs text-gray-400">High Priority</p>
            <p className="text-orange-400 text-xl">2</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {escalatedViolations.map((violation) => (
          <div
            key={violation.id}
            className={`bg-[#0d1117] border-2 rounded-xl overflow-hidden transition-all ${
              violation.severity === 'critical' ? 'border-red-500/50 hover:border-red-500' : 'border-orange-500/50 hover:border-orange-500'
            }`}
          >
            <div
              className={`p-4 border-b border-[#1f2937] ${
                violation.severity === 'critical' ? 'bg-gradient-to-r from-red-500/10 to-red-500/5' : 'bg-gradient-to-r from-orange-500/10 to-orange-500/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AlertTriangle
                    className={`w-6 h-6 ${violation.severity === 'critical' ? 'text-red-400' : 'text-orange-400'}`}
                  />
                  <div>
                    <p className="text-white text-lg">{violation.violation}</p>
                    <p className="text-xs text-gray-500">Violation ID: {violation.id}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 border-2 rounded-lg ${getSeverityBadge(violation.severity)}`}>
                  <p className="text-xs uppercase tracking-wider">{violation.severity}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4">
              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Vehicle Snapshot</p>
                <div className="h-48 bg-[#0a0e1a] border border-[#1f2937] rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Eye className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-white font-mono text-xl tracking-wider">{violation.plate}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">AI Confidence</span>
                    <span className="text-cyan-400 font-semibold">{violation.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Detection Time</span>
                    <span className="text-white font-mono">{violation.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="text-white">{violation.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Escalation Information</p>
                <div className="bg-[#0a0e1a] border border-[#1f2937] rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Escalated By</p>
                    <p className="text-white">{violation.escalatedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Escalation Time</p>
                    <p className="text-white font-mono">{violation.escalatedTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Escalation Reason</p>
                    <p className="text-orange-400">{violation.reason}</p>
                  </div>
                  <div className="pt-3 border-t border-[#1f2937]">
                    <p className="text-xs text-gray-500 mb-2">Operator Notes</p>
                    <p className="text-sm text-gray-300 italic">"{violation.operatorNotes}"</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Supervisor Decision</p>
                <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-[#1f2937] rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Decision</label>
                    <select className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm">
                      <option>Select Action</option>
                      <option>Approve Violation</option>
                      <option>Reject - False Positive</option>
                      <option>Escalate to ACP</option>
                      <option>Request Field Verification</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Supervisor Remarks (Mandatory)</label>
                    <textarea
                      className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm resize-none"
                      rows={4}
                      placeholder="Add your decision rationale and any additional observations..."
                    />
                  </div>
                  <div className="pt-3 border-t border-[#1f2937] space-y-2">
                    <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approve & Process
                    </button>
                    <button className="w-full py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Reject Violation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-[#0a0e1a] border-t border-[#1f2937] flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Pending for: {Math.floor((Date.now() - new Date().setHours(9, 40, 0)) / 60000)} minutes</span>
                </div>
              </div>
              <button className="text-cyan-400 hover:text-cyan-300">View Full Vehicle History →</button>
            </div>
          </div>
        ))}
      </div>

      {escalatedViolations.length === 0 && (
        <div className="text-center py-16">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-white text-lg">No Escalated Violations</p>
          <p className="text-gray-500 text-sm mt-2">All critical violations have been processed</p>
        </div>
      )}
    </div>
  );
}

