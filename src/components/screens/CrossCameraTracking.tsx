import { MapPin, Target, Camera, Clock, AlertTriangle, Zap, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import firstClip from '../../assets/videos/1_output_h264.mp4';
import secondClip from '../../assets/videos/output_h264.mp4';

export function CrossCameraTracking() {
  const targetInfo = {
    type: 'Vehicle',
    plateNumber: 'AP 39 AB 1234',
    initialCamera: 'CAM-NZ-042',
    startTime: '14:23:15',
    confidence: 'High',
    status: 'Active Tracking'
  };

  // Only three hops in the movement chain
  const cameraHops = [
    { id: 1, camera: 'CAM-NZ-042', zone: 'North Zone', time: '14:23:15', confidence: 95 },
    { id: 2, camera: 'CAM-NZ-047', zone: 'North Zone', time: '14:24:42', confidence: 92 },
    { id: 3, camera: 'CAM-CZ-019', zone: 'Central Zone', time: '14:27:51', confidence: 88 },
  ];

  const predictedCameras = [
    { camera: 'CAM-CZ-024', zone: 'Central Zone', likelihood: 87, eta: '~30 sec', distance: '0.4 km' },
    { camera: 'CAM-EZ-003', zone: 'East Zone', likelihood: 62, eta: '~2 min', distance: '1.2 km' },
    { camera: 'CAM-CZ-031', zone: 'Central Zone', likelihood: 45, eta: '~3 min', distance: '1.8 km' },
  ];

  // Two-clip sequence for the current view
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Active hop in the movement chain (0, 1, 2)
  const [activeHopIndex, setActiveHopIndex] = useState(0);

  const handleVideoEnded = () => {
    // When first clip ends, move to second clip and second hop
    if (currentClipIndex === 0) {
      setCurrentClipIndex(1);
      setActiveHopIndex(1);
    }
    // When second clip ends we leave it as-is (sequence finished)
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (
      currentClipIndex === 1 &&
      video.duration > 0 &&
      video.currentTime / video.duration >= 0.5
    ) {
      // Halfway through second clip → third hop becomes active
      setActiveHopIndex(2);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Target Info */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Target className="w-6 h-6 text-orange-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-white text-xl">Active Target Tracking</h2>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs">LIVE</span>
              </div>
              <div className="grid grid-cols-6 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Target Type</p>
                  <p className="text-white">person</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Identifier</p>
                  <p className="text-cyan-400">suspect</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Initial Camera</p>
                  <p className="text-white">{targetInfo.initialCamera}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Started At</p>
                  <p className="text-white">{targetInfo.startTime}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Confidence</p>
                  <p className="text-green-400">{targetInfo.confidence}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Status</p>
                  <p className="text-orange-400">{targetInfo.status}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 text-sm">
              Stop Tracking
            </button>
            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-sm">
              Add to Evidence
            </button>
            <button className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded hover:bg-orange-500/30 text-sm">
              Escalate to SI
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Live Video Wall */}
        <div className="col-span-2 space-y-6">
          {/* Current Camera View */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white">Current View: CAM-CZ-019</h3>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">LIVE</span>
              </div>
              <div className="text-sm text-gray-400">Central Zone • Junction Point</div>
            </div>
            <div className="relative bg-black aspect-video overflow-hidden">
              {/* Video feed constructed from two clips */}
              <video
                ref={videoRef}
                key={currentClipIndex}
                src={currentClipIndex === 0 ? firstClip : secondClip}
                autoPlay
                muted
                onEnded={handleVideoEnded}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
              />

           


              {/* Timestamp / status footer */}
              <div className="pointer-events-none absolute bottom-4 left-4 text-xs text-white bg-black/80 px-3 py-1.5 rounded">
                <Clock className="w-3 h-3 inline mr-1" />
                14:27:51 • Tracking Duration: 4m 36s
              </div>
            </div>
          </div>

          {/* Predicted Next Cameras */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-white">Likely Next Cameras</h3>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4">
              {predictedCameras.map((pred, idx) => (
                <div key={idx} className="bg-[#0a0e1a] border border-[#1f2937] rounded-lg overflow-hidden">
                  <div className="relative bg-black aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                      <Camera className="w-8 h-8" />
                    </div>
                    <div className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded">
                      {pred.likelihood}% likely
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-white text-sm">{pred.camera}</p>
                    <p className="text-xs text-gray-500">{pred.zone}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                      <span>ETA: {pred.eta}</span>
                      <span>{pred.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Movement History & Timeline */}
        <div className="space-y-6">
          {/* Movement Chain Timeline */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                Movement Chain
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {cameraHops.map((hop, idx) => {
                const isActive = idx === activeHopIndex;
                return (
                  <div key={hop.id} className="relative">
                    {idx < cameraHops.length - 1 && (
                      <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-cyan-500/30" />
                    )}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isActive
                            ? 'bg-orange-500/20 border-2 border-orange-500 animate-pulse'
                            : 'bg-cyan-500/20 border-2 border-cyan-500'
                        }`}
                      >
                        {isActive ? (
                          <Target className="w-4 h-4 text-orange-400" />
                        ) : (
                          <Camera className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="flex-1 bg-[#0a0e1a] border border-[#1f2937] rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-white text-sm">{hop.camera}</p>
                          {isActive && (
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{hop.zone}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{hop.time}</span>
                          <span className="text-green-400">{hop.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Zone Transition Alert */}
          <div className="bg-[#0d1117] border border-yellow-500/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white text-sm mb-1">Zone Transition Detected</h4>
                <p className="text-xs text-gray-400 mb-2">
                  Target moved from North Zone to Central Zone at 14:26:18
                </p>
                <p className="text-xs text-yellow-400">
                  Auto-notification sent to CI (Central Zone)
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Statistics */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
            <h4 className="text-white text-sm mb-3">Tracking Statistics</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Cameras Tracked</span>
                <span className="text-white">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Average Confidence</span>
                <span className="text-green-400">91%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Distance Covered</span>
                <span className="text-white">2.8 km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Tracking Duration</span>
                <span className="text-white">4m 36s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Track Continuity</span>
                <span className="text-green-400">Stable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
