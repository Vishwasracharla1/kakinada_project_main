import { Camera, Edit, Activity, Plus, Download } from 'lucide-react';

export function CameraRegistry() {
  const cameras = [
    { id: 'CAM-NZ-042', zone: 'North Zone', type: 'PTZ', ip: '192.168.1.42', health: 85, status: 'online', location: 'Main Entrance' },
    { id: 'CAM-SZ-018', zone: 'South Zone', type: 'Fixed', ip: '192.168.1.18', health: 95, status: 'online', location: 'Beach Road' },
    { id: 'CAM-EZ-031', zone: 'East Zone', type: 'Dome', ip: '192.168.1.31', health: 92, status: 'online', location: 'Market Square' },
    { id: 'CAM-CZ-007', zone: 'Central Zone', type: 'PTZ', ip: '192.168.1.07', health: 45, status: 'offline', location: 'Station Area' },
    { id: 'CAM-WZ-055', zone: 'West Zone', type: 'Fixed', ip: '192.168.1.55', health: 98, status: 'online', location: 'Port Area' },
    { id: 'CAM-NZ-023', zone: 'North Zone', type: 'Dome', ip: '192.168.1.23', health: 88, status: 'online', location: 'NH-16 Junction' },
    { id: 'CAM-SZ-041', zone: 'South Zone', type: 'PTZ', ip: '192.168.1.41', health: 90, status: 'degraded', location: 'Gandhi Road' },
    { id: 'CAM-EZ-015', zone: 'East Zone', type: 'Fixed', ip: '192.168.1.15', health: 87, status: 'online', location: 'Park Area' },
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500/20 text-green-400';
      case 'degraded': return 'bg-yellow-500/20 text-yellow-400';
      case 'offline': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20">
            All Cameras
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Online
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Offline
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Degraded
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Camera
          </button>
        </div>
      </div>

      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1f2937]">
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Camera ID</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Location</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Zone</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Type</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">IP Address</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Health Score</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Status</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cameras.map((camera) => (
              <tr key={camera.id} className="border-b border-[#1f2937] hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span className="text-white text-sm">{camera.id}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm">{camera.location}</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm">{camera.zone}</span>
                </td>
                <td className="p-4">
                  <span className="text-white text-sm">{camera.type}</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm font-mono">{camera.ip}</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`text-lg ${getHealthColor(camera.health)}`}>{camera.health}</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded text-xs uppercase ${getStatusColor(camera.status)}`}>
                    {camera.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-purple-400 hover:bg-purple-500/10 rounded transition-colors">
                      <Activity className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Total Cameras</p>
          <p className="text-2xl text-white">218</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Online</p>
          <p className="text-2xl text-green-400">208</p>
          <p className="text-xs text-gray-500 mt-1">95.4%</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Degraded</p>
          <p className="text-2xl text-yellow-400">4</p>
          <p className="text-xs text-gray-500 mt-1">1.8%</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Offline</p>
          <p className="text-2xl text-red-400">6</p>
          <p className="text-xs text-gray-500 mt-1">2.8%</p>
        </div>
      </div>
    </div>
  );
}
