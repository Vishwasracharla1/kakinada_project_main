import { Plane, MapPin, Gauge, Wind, Radio, Camera, Thermometer, Eye } from 'lucide-react';
import { useRef, useEffect } from 'react';

// Import drone videos
import droneVideo1 from '../../assets/videos/29594-376565656.mp4';
import droneVideo2 from '../../assets/videos/103308-662114654_small.mp4';
import droneVideo3 from '../../assets/videos/103723-664328178.mp4';

interface DroneMissionsProps {
  onNavigate: (screen: string, data?: any) => void;
}

interface Mission {
  id: string;
  droneId: string;
  operator: string;
  mission: string;
  status: string;
  altitude: number;
  speed: number;
  heading: string;
  battery: number;
  gps: { lat: number; lng: number };
  cameraMode: string;
  detections: string[];
  duration: string;
}

interface MissionCardProps {
  mission: Mission;
  videoSource: string;
  getStatusColor: (status: string) => string;
  getBatteryColor: (battery: number) => string;
}

function MissionCard({ mission, videoSource, getStatusColor, getBatteryColor }: MissionCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = videoSource;
      video.play().catch(err => console.error('Video play error:', err));
    }
  }, [videoSource]);

  return (
    <div className="bg-[#1a1f2e] border border-[#2a3441] rounded p-4 hover:border-cyan-400/50 transition-all">
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Video Feed */}
        <div className="col-span-1">
          <div className="bg-black aspect-video rounded border border-[#2a3441] relative overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 text-xs bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 z-10">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE
            </div>
            <div className="absolute top-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded z-10">
              {mission.cameraMode}
            </div>
            <div className="absolute bottom-2 left-2 text-xs text-white bg-black/70 px-2 py-1 rounded z-10">
              {mission.droneId} • {mission.duration}
            </div>
          </div>

          {/* Camera Controls */}
          <div className="mt-2 flex gap-2">
            <button className="flex-1 px-3 py-2 bg-[#2a3441] text-gray-300 rounded text-xs hover:bg-[#3a4451] transition-colors">
              RGB
            </button>
            <button className="flex-1 px-3 py-2 bg-[#2a3441] text-gray-300 rounded text-xs hover:bg-[#3a4451] transition-colors">
              Zoom
            </button>
            <button className="flex-1 px-3 py-2 bg-[#2a3441] text-gray-300 rounded text-xs hover:bg-[#3a4451] transition-colors">
              Thermal
            </button>
          </div>
        </div>

        {/* Middle: Telemetry */}
        <div className="col-span-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Mission ID</span>
            <span className="text-white">{mission.id}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Status</span>
            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(mission.status)}`}>
              {mission.status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Drone ID
            </span>
            <span className="text-cyan-400">{mission.droneId}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Operator
            </span>
            <span className="text-white text-xs">{mission.operator}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mission
            </span>
            <span className="text-white text-xs">{mission.mission}</span>
          </div>

          <div className="border-t border-[#2a3441] pt-3 mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                Altitude
              </span>
              <span className="text-cyan-400">{mission.altitude}m</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <Wind className="w-4 h-4" />
                Speed
              </span>
              <span className="text-white">{mission.speed} km/h</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Heading</span>
              <span className="text-white">{mission.heading}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Battery</span>
              <span className={getBatteryColor(mission.battery)}>{mission.battery}%</span>
            </div>
          </div>
        </div>

        {/* Right: Map & AI Detections */}
        <div className="col-span-1 space-y-3">
          {/* GPS Map */}
          <div className="bg-black aspect-square rounded border border-[#2a3441] flex items-center justify-center relative">
            <MapPin className="w-12 h-12 text-cyan-400" />
            <div className="absolute top-2 left-2 text-xs text-white bg-black/70 px-2 py-1 rounded">
              GPS: {mission.gps.lat.toFixed(4)}, {mission.gps.lng.toFixed(4)}
            </div>
          </div>

          {/* AI Detections */}
          <div className="bg-[#0d1117] border border-yellow-400/30 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm">AI Detections</span>
            </div>
            <div className="space-y-1">
              {mission.detections.map((detection, idx) => (
                <div key={idx} className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
                  • {detection}
                </div>
              ))}
            </div>
          </div>

          {/* Mission Controls */}
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-yellow-500/20 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-500/30 transition-colors text-sm">
              Return to Home
            </button>
            <button className="w-full px-3 py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors text-sm">
              Capture Snapshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockMissions = [
  {
    id: 'M-2024-001',
    droneId: 'D-001',
    operator: 'Pilot Ravi Kumar',
    mission: 'VIP Route Monitoring',
    status: 'Active',
    altitude: 120,
    speed: 28,
    heading: 'NE',
    battery: 87,
    gps: { lat: 16.9891, lng: 82.2475 },
    cameraMode: 'RGB',
    detections: ['Vehicle Congestion', 'Crowd Density: Medium'],
    duration: '00:18:42'
  },
  {
    id: 'M-2024-002',
    droneId: 'D-003',
    operator: 'Pilot Anjali Devi',
    mission: 'Coastal Surveillance',
    status: 'Active',
    altitude: 150,
    speed: 22,
    heading: 'E',
    battery: 92,
    gps: { lat: 16.9850, lng: 82.2520 },
    cameraMode: 'Thermal',
    detections: ['Human Cluster Detected'],
    duration: '00:12:15'
  },
  {
    id: 'M-2024-003',
    droneId: 'D-006',
    operator: 'Pilot Suresh Babu',
    mission: 'Traffic Hotspot Monitoring',
    status: 'Active',
    altitude: 135,
    speed: 25,
    heading: 'SW',
    battery: 78,
    gps: { lat: 16.9920, lng: 82.2440 },
    cameraMode: 'Zoom',
    detections: ['Traffic Jam', 'Vehicle Count: 47'],
    duration: '00:25:30'
  }
];

export function DroneMissions({ onNavigate }: DroneMissionsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10';
      case 'RTH': return 'text-yellow-400 bg-yellow-400/10';
      case 'Completed': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl">Live Drone Missions</h2>
          <p className="text-gray-400 text-sm mt-1">{mockMissions.length} active mission(s)</p>
        </div>
        <button className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors">
          Launch New Mission
        </button>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 gap-4">
        {mockMissions.map((mission, index) => {
          // Assign videos to missions: first mission gets video1, second gets video2, third gets video3
          const videoSources = [droneVideo1, droneVideo2, droneVideo3];
          return (
            <MissionCard
              key={mission.id}
              mission={mission}
              videoSource={videoSources[index]}
              getStatusColor={getStatusColor}
              getBatteryColor={getBatteryColor}
            />
          );
        })}
      </div>
    </div>
  );
}
