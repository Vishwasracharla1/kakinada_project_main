import { ArrowLeft, Camera, MapPin, User, Clock, FileText, Image, CheckCircle, ArrowUpCircle, XCircle, Eye } from 'lucide-react';

interface IncidentDetailProps {
  onBack: () => void;
  userRole?: 'operator' | 'supervisor' | 'admin';
}

export function IncidentDetail({ onBack, userRole = 'operator' }: IncidentDetailProps) {
  const timelineEvents = [
    { time: '10:15', event: 'Incident Reported', type: 'create', user: 'Dispatcher' },
    { time: '10:17', event: 'Team Alpha Assigned', type: 'assign', user: 'Control Room' },
    { time: '10:20', event: 'First Responder En Route', type: 'dispatch', user: 'Team Alpha' },
    { time: '10:25', event: 'Evidence Added (3 images)', type: 'evidence', user: 'Officer Kumar' },
    { time: '10:30', event: 'Camera Feeds Tagged', type: 'camera', user: 'Operator' },
    { time: '10:35', event: 'Status Update: Under Control', type: 'update', user: 'Team Alpha' },
  ];

  const relatedCameras = [
    { id: 'CAM-NH-018', name: 'NH-16 Junction North', status: 'online' },
    { id: 'CAM-NH-019', name: 'NH-16 Junction South', status: 'online' },
    { id: 'CAM-NH-020', name: 'NH-16 East Approach', status: 'online' },
  ];

  const evidenceItems = [
    { id: 1, type: 'image', name: 'Scene Overview' },
    { id: 2, type: 'image', name: 'Vehicle Damage' },
    { id: 3, type: 'video', name: 'Camera Feed 10:15-10:30' },
    { id: 4, type: 'image', name: 'License Plates' },
  ];

  return (
    <div className="h-full bg-[#0a0e1a] flex flex-col">
      <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Incidents
        </button>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="px-4 py-2 bg-[#1a1f2e] border border-[#2a3441] text-white rounded-lg hover:bg-[#2a3441] flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          {userRole === 'admin' ? (
            <div className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Only (Admin)
            </div>
          ) : userRole === 'supervisor' ? (
            <>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Close Incident
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 flex items-center gap-2">
                Add to Evidence
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
                <ArrowUpCircle className="w-4 h-4" />
                Escalate to ACP
              </button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 flex items-center gap-2">
                Tag Evidence
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
                <ArrowUpCircle className="w-4 h-4" />
                Escalate to Supervisor
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl text-white mb-2">Traffic Accident</h2>
                <p className="text-gray-400">INC-2025-001</p>
              </div>
              <span className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg">ACTIVE</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Severity</p>
                <p className="text-red-400">HIGH</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Location</p>
                <p className="text-white">NH-16 Junction</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Assigned To</p>
                <p className="text-white">Team Alpha</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Reported</p>
                <p className="text-white">10:15 AM</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6 mb-6">
            <h3 className="text-white mb-4">Incident Timeline</h3>
            <div className="space-y-4">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    {idx < timelineEvents.length - 1 && <div className="w-0.5 h-12 bg-[#1f2937]"></div>}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white">{event.event}</p>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <p className="text-xs text-gray-500">By {event.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Evidence ({evidenceItems.length})</h3>
              <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-sm">+ Add Evidence</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {evidenceItems.map((item) => (
                <div key={item.id} className="bg-[#0a0e1a] rounded-lg p-4 hover:bg-[#0f1420] cursor-pointer transition-colors">
                  <div className="aspect-square bg-[#1a1f2e] rounded mb-2 flex items-center justify-center">
                    {item.type === 'image' ? <Image className="w-8 h-8 text-gray-600" /> : <Camera className="w-8 h-8 text-gray-600" />}
                  </div>
                  <p className="text-xs text-gray-400 text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6">
            <h3 className="text-white mb-4">Notes & Communications</h3>
            <div className="space-y-3 mb-4">
              <div className="bg-[#0a0e1a] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-white">Officer Kumar</span>
                  <span className="text-xs text-gray-500">10:25 AM</span>
                </div>
                <p className="text-sm text-gray-400">Two vehicles involved. Minor injuries reported. Ambulance requested.</p>
              </div>
              <div className="bg-[#0a0e1a] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-white">Dispatcher</span>
                  <span className="text-xs text-gray-500">10:17 AM</span>
                </div>
                <p className="text-sm text-gray-400">Team Alpha dispatched to location. ETA 5 minutes.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a note..."
                className="flex-1 px-4 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white placeholder-gray-500 outline-none focus:border-cyan-500"
              />
              <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">Send</button>
            </div>
          </div>
        </div>

        <div className="w-80 bg-[#0d1117] border-l border-[#1f2937] overflow-y-auto">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Related Camera Feeds</h3>
          </div>
          <div className="p-4 space-y-4">
            {relatedCameras.map((camera) => (
              <div key={camera.id} className="bg-[#0a0e1a] rounded-lg overflow-hidden hover:border hover:border-cyan-500 cursor-pointer">
                <div className="aspect-video bg-[#1a1f2e] flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-700" />
                </div>
                <div className="p-3">
                  <p className="text-sm text-white mb-1">{camera.id}</p>
                  <p className="text-xs text-gray-500">{camera.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400">LIVE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
