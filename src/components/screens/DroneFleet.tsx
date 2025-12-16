import { Plane, Battery, MapPin, Radio, Wrench, Clock } from 'lucide-react';

interface DroneFleetProps {
  onNavigate: (screen: string, data?: any) => void;
}

const mockDrones = [
  { id: 'D-001', status: 'Active', battery: 87, operator: 'Pilot Ravi Kumar', gpsLock: true, altitude: 120, location: 'Sector-3', lastMission: '15 min ago', maintenance: 'OK' },
  { id: 'D-002', status: 'Charging', battery: 45, operator: 'Unassigned', gpsLock: true, altitude: 0, location: 'Base Station', lastMission: '2 hrs ago', maintenance: 'OK' },
  { id: 'D-003', status: 'Active', battery: 92, operator: 'Pilot Anjali Devi', gpsLock: true, altitude: 150, location: 'Coastal Zone', lastMission: '5 min ago', maintenance: 'OK' },
  { id: 'D-004', status: 'Standby', battery: 100, operator: 'Unassigned', gpsLock: true, altitude: 0, location: 'Base Station', lastMission: '30 min ago', maintenance: 'OK' },
  { id: 'D-005', status: 'Maintenance', battery: 0, operator: 'Unassigned', gpsLock: false, altitude: 0, location: 'Workshop', lastMission: '3 days ago', maintenance: 'Scheduled' },
  { id: 'D-006', status: 'Active', battery: 78, operator: 'Pilot Suresh Babu', gpsLock: true, altitude: 135, location: 'VIP Route', lastMission: '10 min ago', maintenance: 'OK' },
];

export function DroneFleet({ onNavigate }: DroneFleetProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10';
      case 'Charging': return 'text-yellow-400 bg-yellow-400/10';
      case 'Standby': return 'text-blue-400 bg-blue-400/10';
      case 'Maintenance': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const activeDrones = mockDrones.filter(d => d.status === 'Active').length;
  const standbyDrones = mockDrones.filter(d => d.status === 'Standby').length;
  const maintenanceDrones = mockDrones.filter(d => d.status === 'Maintenance').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1f2e] border border-[#2a3441] p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Fleet</div>
          <div className="text-white text-2xl">{mockDrones.length}</div>
        </div>
        <div className="bg-[#1a1f2e] border border-green-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Active Missions</div>
          <div className="text-green-400 text-2xl">{activeDrones}</div>
        </div>
        <div className="bg-[#1a1f2e] border border-blue-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Standby</div>
          <div className="text-blue-400 text-2xl">{standbyDrones}</div>
        </div>
        <div className="bg-[#1a1f2e] border border-red-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Maintenance</div>
          <div className="text-red-400 text-2xl">{maintenanceDrones}</div>
        </div>
      </div>

      {/* Drone Fleet Grid */}
      <div className="grid grid-cols-3 gap-4">
        {mockDrones.map((drone) => (
          <div
            key={drone.id}
            className="bg-[#1a1f2e] border border-[#2a3441] rounded p-4 hover:border-cyan-400/50 transition-all cursor-pointer"
            onClick={() => onNavigate('drone-missions', { droneId: drone.id })}
          >
            {/* Drone Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-cyan-400" />
                <span className="text-white">{drone.id}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(drone.status)}`}>
                {drone.status}
              </span>
            </div>

            {/* Drone Details Grid */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Battery className="w-4 h-4" />
                  <span>Battery</span>
                </div>
                <span className={getBatteryColor(drone.battery)}>{drone.battery}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>GPS Lock</span>
                </div>
                <span className={drone.gpsLock ? 'text-green-400' : 'text-red-400'}>
                  {drone.gpsLock ? 'Active' : 'Lost'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Radio className="w-4 h-4" />
                  <span>Operator</span>
                </div>
                <span className="text-white text-xs truncate max-w-[120px]">
                  {drone.operator}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </div>
                <span className="text-white text-xs">{drone.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Last Mission</span>
                </div>
                <span className="text-gray-400 text-xs">{drone.lastMission}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Wrench className="w-4 h-4" />
                  <span>Maintenance</span>
                </div>
                <span className={drone.maintenance === 'OK' ? 'text-green-400' : 'text-yellow-400'}>
                  {drone.maintenance}
                </span>
              </div>
            </div>

            {/* Altitude Badge (for active drones) */}
            {drone.status === 'Active' && (
              <div className="mt-3 pt-3 border-t border-[#2a3441] text-center">
                <span className="text-xs text-gray-400">Altitude: </span>
                <span className="text-cyan-400">{drone.altitude}m</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
