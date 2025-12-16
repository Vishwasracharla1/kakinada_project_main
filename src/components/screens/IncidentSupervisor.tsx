import { ArrowLeft, Shield, CheckCircle, XCircle, Merge, FileText, Lock, Eye, Camera, AlertTriangle, Clock, User } from 'lucide-react';
import { useState } from 'react';

interface IncidentSupervisorProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function IncidentSupervisor({ onBack, onNavigate }: IncidentSupervisorProps) {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const escalatedIncidents = [
    {
      id: 'INC-2024-1156',
      title: 'Suspicious Activity - NH-16 Junction',
      createdBy: 'Operator Kumar',
      createdAt: '2024-12-02 09:15:23',
      priority: 'high',
      status: 'pending_classification',
      cameras: ['CAM-NZ-042', 'CAM-NZ-045'],
      operatorNotes:
        'Two individuals seen loitering near restricted zone for 15+ minutes. One appeared to be taking photographs of security infrastructure.',
      suggestedClassification: null,
      evidenceCount: 0,
      linkedAlerts: 2,
    },
    {
      id: 'INC-2024-1153',
      title: 'Vehicle Theft Attempt - Parking Area',
      createdBy: 'Operator Priya',
      createdAt: '2024-12-02 08:42:11',
      priority: 'high',
      status: 'pending_approval',
      cameras: ['CAM-SZ-018', 'CAM-SZ-020'],
      operatorNotes:
        'Individual attempting to break into vehicle AP05C1234. Vehicle alarm triggered. Suspect fled on motorcycle.',
      suggestedClassification: 'theft_attempt',
      evidenceCount: 3,
      linkedAlerts: 1,
    },
    {
      id: 'INC-2024-1148',
      title: 'Perimeter Breach - Industrial Area',
      createdBy: 'Operator Ravi',
      createdAt: '2024-12-01 16:23:45',
      priority: 'medium',
      status: 'under_review',
      cameras: ['CAM-WZ-055'],
      operatorNotes:
        'Fence section B-7 breach detected. Person entered restricted zone. Identity unclear from footage.',
      suggestedClassification: 'trespassing',
      evidenceCount: 2,
      linkedAlerts: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_classification':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'pending_approval':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'under_review':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-orange-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Incident Management – Supervisor</h1>
              <p className="text-gray-400 text-sm">Review, classify, approve, and close escalated incidents</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-xs text-gray-400">Pending Classification</p>
            <p className="text-red-400 text-xl font-bold">
              {escalatedIncidents.filter((i) => i.status === 'pending_classification').length}
            </p>
          </div>
          <div className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg">
            <p className="text-xs text-gray-400">Pending Approval</p>
            <p className="text-orange-400 text-xl font-bold">
              {escalatedIncidents.filter((i) => i.status === 'pending_approval').length}
            </p>
          </div>
          <button
            onClick={() => onNavigate('evidence-console')}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Evidence Console
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {escalatedIncidents.map((incident) => (
          <div
            key={incident.id}
            className={`bg-[#0d1117] border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${
              selectedIncident === incident.id ? 'border-green-500' : 'border-[#1f2937] hover:border-green-500/50'
            }`}
            onClick={() => setSelectedIncident(selectedIncident === incident.id ? null : incident.id)}
          >
            <div
              className={`p-5 border-b border-[#1f2937] ${
                incident.status === 'pending_classification'
                  ? 'bg-red-500/5'
                  : incident.status === 'pending_approval'
                  ? 'bg-orange-500/5'
                  : 'bg-cyan-500/5'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`px-3 py-1 border rounded-lg ${getStatusColor(incident.status)}`}>
                      <p className="text-xs uppercase font-bold">{incident.status.replace(/_/g, ' ')}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${getPriorityColor(incident.priority)}`}>
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs uppercase font-bold">{incident.priority} PRIORITY</span>
                    </div>
                  </div>
                  <h3 className="text-white text-xl font-medium mb-1">{incident.title}</h3>
                  <p className="text-xs text-gray-500">Incident ID: {incident.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-white font-mono text-sm">{incident.createdAt}</p>
                  <p className="text-xs text-gray-400 mt-1">by {incident.createdBy}</p>
                </div>
              </div>
            </div>

            {selectedIncident === incident.id && (
            <div className="p-5">
              <div className="grid grid-cols-3 gap-6 mb-5">
                <div className="col-span-2 space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Operator Notes</p>
                    <div className="bg-[#0a0e1a] border border-[#1f2937] rounded-lg p-4">
                      <p className="text-white text-sm italic">&quot;{incident.operatorNotes}&quot;</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tagged Cameras</p>
                      <div className="space-y-1">
                        {incident.cameras.map((cam) => (
                          <button
                            key={cam}
                            className="w-full px-2 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded text-xs hover:bg-cyan-500/30 flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Camera className="w-3 h-3" />
                            {cam}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Linked Alerts</p>
                      <p className="text-orange-400 text-lg font-bold">{incident.linkedAlerts}</p>
                      <button 
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Alerts →
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Evidence Clips</p>
                      <p className="text-cyan-400 text-lg font-bold">{incident.evidenceCount}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('evidence-console');
                        }} 
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        Open Console →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Supervisor Actions</p>

                  {incident.status === 'pending_classification' && (
                    <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/30 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 block mb-2">Classify Incident Type *</label>
                        <select 
                          className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => e.stopPropagation()}
                        >
                          <option value="">Select classification...</option>
                          <option value="theft">Theft</option>
                          <option value="trespassing">Trespassing</option>
                          <option value="vandalism">Vandalism</option>
                          <option value="suspicious">Suspicious Activity</option>
                          <option value="emergency">Emergency</option>
                          <option value="false_alarm">False Alarm</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-2">Severity Level *</label>
                        <select 
                          className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => e.stopPropagation()}
                        >
                          <option value="">Select severity...</option>
                          <option value="critical">Critical</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <button 
                        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve Classification
                      </button>
                    </div>
                  )}

                  {incident.status === 'pending_approval' && (
                    <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/30 rounded-lg p-4 space-y-3">
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3">
                        <p className="text-xs text-gray-500">Suggested Classification</p>
                        <p className="text-white font-medium capitalize">{incident.suggestedClassification?.replace('_', ' ')}</p>
                      </div>
                      <button 
                        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve & Proceed
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-[#1f2937] pt-4">
                <p className="text-xs text-gray-500 mb-3">Supervisor Actions</p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Supervisor Remarks</label>
                    <textarea
                      placeholder="Add your assessment, decision rationale, or instructions..."
                      rows={3}
                      className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm resize-none"
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Field Unit Instructions (Optional)</label>
                    <textarea
                      placeholder="Instructions for patrol units..."
                      rows={3}
                      className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm resize-none"
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('evidence-console');
                    }} 
                    className="py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Evidence Timeline
                  </button>
                  <button 
                    className="py-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 flex items-center justify-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Camera className="w-4 h-4" />
                    Request Footage
                  </button>
                  <button 
                    className="py-2 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-500/30 flex items-center justify-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Merge className="w-4 h-4" />
                    Merge Incidents
                  </button>
                  <button 
                    className="py-2 bg-orange-500/20 text-orange-400 border border-orange-500/50 rounded-lg hover:bg-orange-500/30 flex items-center justify-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Lock className="w-4 h-4" />
                    Lock Evidence
                  </button>
                  <button 
                    className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Close Incident
                  </button>
                </div>
              </div>
            </div>
            )}

            <div className="px-5 py-3 bg-[#0a0e1a] border-t border-[#1f2937] flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="text-gray-500">
                  Created by: <span className="text-white">{incident.createdBy}</span>
                </span>
                <span className="text-gray-500">
                  Status: <span className="text-orange-400">{incident.status.replace(/_/g, ' ').toUpperCase()}</span>
                </span>
              </div>
              <button 
                className="text-cyan-400 hover:text-cyan-300"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle view full history
                }}
              >
                View Full History →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-5">
        <h4 className="text-white mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          Supervisor Role – Full Incident Management Authority
        </h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-green-400 mb-2">✅ Supervisor Capabilities:</p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Approve incident classification</li>
              <li>• Merge related incidents</li>
              <li>• Request additional footage from any camera</li>
              <li>• Build evidence timeline (Evidence Console)</li>
              <li>• Add final assessment notes</li>
              <li>• Close incident</li>
              <li>• Lock evidence for legal proceedings</li>
            </ul>
          </div>
          <div>
            <p className="text-sm text-cyan-400 mb-2">📋 Standard Operating Procedure:</p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>1. Review operator notes and tagged cameras</li>
              <li>2. Classify incident type and severity</li>
              <li>3. Build evidence timeline if needed</li>
              <li>4. Add supervisor assessment</li>
              <li>5. Issue field unit instructions if required</li>
              <li>6. Lock evidence before closing</li>
              <li>7. Close incident with final remarks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

