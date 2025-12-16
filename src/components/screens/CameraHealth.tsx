import { ArrowLeft, Camera, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CameraHealthProps {
  onBack: () => void;
}

export function CameraHealth({ onBack }: CameraHealthProps) {
  const statusData = [
    { name: 'Online', value: 208, color: '#10b981' },
    { name: 'Degraded', value: 4, color: '#f59e0b' },
    { name: 'Offline', value: 6, color: '#ef4444' },
  ];

  const offlineDuration = [
    { camera: 'CAM-NZ-042', hours: 12.5 },
    { camera: 'CAM-SZ-018', hours: 8.2 },
    { camera: 'CAM-EZ-031', hours: 6.8 },
    { camera: 'CAM-CZ-007', hours: 4.1 },
    { camera: 'CAM-WZ-055', hours: 2.3 },
    { camera: 'CAM-NZ-023', hours: 1.8 },
  ];

  const uptimeTrend = [
    { week: 'Week 1', uptime: 98.5 },
    { week: 'Week 2', uptime: 99.1 },
    { week: 'Week 3', uptime: 98.8 },
    { week: 'Week 4', uptime: 99.2 },
  ];

  const cameraList = [
    { id: 'CAM-NZ-042', zone: 'North Zone', health: 85, uptime: 98.2, status: 'degraded' },
    { id: 'CAM-SZ-018', zone: 'South Zone', health: 95, uptime: 99.5, status: 'online' },
    { id: 'CAM-EZ-031', zone: 'East Zone', health: 92, uptime: 99.1, status: 'online' },
    { id: 'CAM-CZ-007', zone: 'Central Zone', health: 45, uptime: 87.3, status: 'offline' },
    { id: 'CAM-WZ-055', zone: 'West Zone', health: 98, uptime: 99.8, status: 'online' },
    { id: 'CAM-NZ-023', zone: 'North Zone', health: 88, uptime: 98.9, status: 'online' },
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
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Analytics
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Status Distribution */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Camera Status</h3>
          </div>
          <div className="p-6 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #1f2937', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="p-4 space-y-2 border-t border-[#1f2937]">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Uptime Trend */}
        <div className="col-span-2 bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Uptime Trend (4 Weeks)</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={uptimeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[97, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #1f2937', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="uptime" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Offline Duration */}
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-[#1f2937]">
          <h3 className="text-white">Offline Duration (Last 30 Days)</h3>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={offlineDuration}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="camera" stroke="#6b7280" />
              <YAxis stroke="#6b7280" label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #1f2937', borderRadius: '8px' }} />
              <Bar dataKey="hours" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Camera Health List */}
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#1f2937]">
          <h3 className="text-white">Camera Health Details</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1f2937]">
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Camera ID</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Zone</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Health Score</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Uptime</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Status</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cameraList.map((camera) => (
              <tr key={camera.id} className="border-b border-[#1f2937] hover:bg-white/5">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span className="text-white text-sm">{camera.id}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm">{camera.zone}</span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-lg ${getHealthColor(camera.health)}`}>{camera.health}</span>
                    {camera.health >= 90 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : camera.health < 70 ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : null}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-white text-sm">{camera.uptime}%</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded text-xs uppercase ${getStatusColor(camera.status)}`}>
                    {camera.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-xs">
                    Diagnose
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
