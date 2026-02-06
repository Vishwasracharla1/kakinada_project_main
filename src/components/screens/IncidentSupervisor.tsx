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
    // Pastel chips with black text
    switch (status) {
      case 'pending_classification':
        return 'bg-red-100 border border-red-200';
      case 'pending_approval':
        return 'bg-orange-100 border border-orange-200';
      case 'under_review':
        return 'bg-blue-100 border border-blue-200';
      default:
        return 'bg-gray-100 border border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    // Subtle text colors just to hint priority
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-3">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 border border-green-200 rounded-lg">
              <Shield className="w-6 h-6 text-black/70" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-black">Incident Management – Supervisor</h1>
              <p className="text-sm text-black/60">Review, classify, approve, and close escalated incidents</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-right">
            <p className="text-xs text-black/60">Pending Classification</p>
            <p className="text-xl font-semibold text-black">
              {escalatedIncidents.filter((i) => i.status === 'pending_classification').length}
            </p>
          </div>
          <div className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg text-right">
            <p className="text-xs text-black/60">Pending Approval</p>
            <p className="text-xl font-semibold text-black">
              {escalatedIncidents.filter((i) => i.status === 'pending_approval').length}
            </p>
          </div>
          <button
            onClick={() => onNavigate('evidence-console')}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center gap-2 text-sm"
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
            className={`bg-card border rounded-xl overflow-hidden transition-all cursor-pointer ${
              selectedIncident === incident.id ? 'border-gray-800 shadow-md' : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
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
                    <p className="text-xs text-black/50 mb-2 uppercase tracking-wider">Operator Notes</p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-sm text-black italic">&quot;{incident.operatorNotes}&quot;</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-black/50 mb-1">Tagged Cameras</p>
                      <div className="space-y-1">
                        {incident.cameras.map((cam) => (
                          <button
                            key={cam}
                            className="w-full px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs hover:bg-gray-200 flex items-center gap-1 text-black"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Camera className="w-3 h-3" />
                            {cam}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-black/50 mb-1">Linked Alerts</p>
                      <p className="text-lg font-semibold text-black">{incident.linkedAlerts}</p>
                      <button 
                        className="text-xs text-black hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Alerts →
                      </button>
                    </div>
                    <div>
                      <p className="text-xs text-black/50 mb-1">Evidence Clips</p>
                      <p className="text-lg font-semibold text-black">{incident.evidenceCount}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('evidence-console');
                        }} 
                        className="text-xs text-black hover:underline"
                      >
                        Open Console →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-black/50 uppercase tracking-wider">Supervisor Actions</p>

                  {incident.status === 'pending_classification' && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                      <div>
                        <label className="text-xs text-black/50 block mb-2">Classify Incident Type *</label>
                        <select 
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black"
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
                        <label className="text-xs text-black/50 block mb-2">Severity Level *</label>
                        <select 
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black"
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
                        className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve Classification
                      </button>
                    </div>
                  )}

                  {incident.status === 'pending_approval' && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <p className="text-xs text-black/50">Suggested Classification</p>
                        <p className="font-medium capitalize text-black">{incident.suggestedClassification?.replace('_', ' ')}</p>
                      </div>
                      <button 
                        className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve & Proceed
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-black/50 mb-3">Supervisor Actions</p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs text-black/50 block mb-2">Supervisor Remarks</label>
                    <textarea
                      placeholder="Add your assessment, decision rationale, or instructions..."
                      rows={3}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-black resize-none"
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-black/50 block mb-2">Field Unit Instructions (Optional)</label>
                    <textarea
                      placeholder="Instructions for patrol units..."
                      rows={3}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-black resize-none"
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
                    className="py-2 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Evidence Timeline
                  </button>
                  <button 
                    className="py-2 bg-gray-50 text-black border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Camera className="w-4 h-4" />
                    Request Footage
                  </button>
                  <button 
                    className="py-2 bg-gray-50 text-black border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Merge className="w-4 h-4" />
                    Merge Incidents
                  </button>
                  <button 
                    className="py-2 bg-gray-50 text-black border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Lock className="w-4 h-4" />
                    Lock Evidence
                  </button>
                  <button 
                    className="py-2 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Close Incident
                  </button>
                </div>
              </div>
            </div>
            )}

            <div className="px-5 py-3 bg-white border-t border-gray-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="text-black/60">
                  Created by: <span className="text-black">{incident.createdBy}</span>
                </span>
                <span className="text-black/60">
                  Status: <span className="font-semibold text-black">{incident.status.replace(/_/g, ' ').toUpperCase()}</span>
                </span>
              </div>
              <button 
                className="text-black hover:underline"
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

      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
        <h4 className="mb-3 flex items-center gap-2 text-black">
          <Shield className="w-5 h-5 text-black/70" />
          Supervisor Role – Full Incident Management Authority
        </h4>
        <div className="grid grid-cols-2 gap-6 text-sm text-black/70">
          <div>
            <p className="mb-2 font-medium text-black">✅ Supervisor Capabilities</p>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Approve incident classification</li>
              <li>Merge related incidents</li>
              <li>Request additional footage from any camera</li>
              <li>Build evidence timeline (Evidence Console)</li>
              <li>Add final assessment notes</li>
              <li>Close incident</li>
              <li>Lock evidence for legal proceedings</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-medium text-black">📋 Standard Operating Procedure</p>
            <ul className="text-xs space-y-1 list-decimal list-inside">
              <li>Review operator notes and tagged cameras</li>
              <li>Classify incident type and severity</li>
              <li>Build evidence timeline if needed</li>
              <li>Add supervisor assessment</li>
              <li>Issue field unit instructions if required</li>
              <li>Lock evidence before closing</li>
              <li>Close incident with final remarks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

