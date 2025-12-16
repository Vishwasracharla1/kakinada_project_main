import { Video, Plus, Edit, Trash2, Battery, Signal, MapPin, User } from 'lucide-react';

const mockBodycamRegistry = [
  {
    id: 'BC-001',
    model: 'Axon Body 3',
    serialNumber: 'AX-BC3-2023-001',
    purchaseDate: '2023-02-10',
    status: 'Active',
    battery: 87,
    gpsSignal: 'Strong',
    assignedOfficer: 'SI Ramesh Kumar',
    badgeNumber: 'KKD-1234',
    lastSync: '5 min ago',
    storageUsed: 64,
    storageTotal: 128
  },
  {
    id: 'BC-002',
    model: 'Axon Body 3',
    serialNumber: 'AX-BC3-2023-002',
    purchaseDate: '2023-02-10',
    status: 'Active',
    battery: 92,
    gpsSignal: 'Strong',
    assignedOfficer: 'Constable Lakshmi Devi',
    badgeNumber: 'KKD-1245',
    lastSync: '2 min ago',
    storageUsed: 42,
    storageTotal: 128
  },
  {
    id: 'BC-003',
    model: 'Axon Body 3',
    serialNumber: 'AX-BC3-2023-003',
    purchaseDate: '2023-02-10',
    status: 'Charging',
    battery: 34,
    gpsSignal: 'N/A',
    assignedOfficer: 'Unassigned',
    badgeNumber: '-',
    lastSync: '45 min ago',
    storageUsed: 18,
    storageTotal: 128
  },
  {
    id: 'BC-004',
    model: 'Axon Body 3',
    serialNumber: 'AX-BC3-2023-004',
    purchaseDate: '2023-02-10',
    status: 'Active',
    battery: 78,
    gpsSignal: 'Weak',
    assignedOfficer: 'Constable Vijay Sharma',
    badgeNumber: 'KKD-1256',
    lastSync: '8 min ago',
    storageUsed: 95,
    storageTotal: 128
  },
  {
    id: 'BC-005',
    model: 'Axon Body 3',
    serialNumber: 'AX-BC3-2023-005',
    purchaseDate: '2023-02-10',
    status: 'Active',
    battery: 45,
    gpsSignal: 'Strong',
    assignedOfficer: 'SI Priya Reddy',
    badgeNumber: 'KKD-1267',
    lastSync: '3 min ago',
    storageUsed: 78,
    storageTotal: 128
  },
  {
    id: 'BC-006',
    model: 'Axon Body 3',
    serialNumber: 'AX-BC3-2023-006',
    purchaseDate: '2023-02-10',
    status: 'Maintenance',
    battery: 0,
    gpsSignal: 'N/A',
    assignedOfficer: 'Unassigned',
    badgeNumber: '-',
    lastSync: '2 days ago',
    storageUsed: 0,
    storageTotal: 128
  }
];

export function BodycamRegistry() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10';
      case 'Charging': return 'text-yellow-400 bg-yellow-400/10';
      case 'Maintenance': return 'text-red-400 bg-red-400/10';
      case 'Offline': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'Strong': return 'text-green-400';
      case 'Weak': return 'text-yellow-400';
      case 'N/A': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl">Bodycam Registry</h2>
          <p className="text-gray-400 text-sm mt-1">{mockBodycamRegistry.length} bodycams registered</p>
        </div>
        <button className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Register New Bodycam
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1f2e] border border-[#2a3441] p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Bodycams</div>
          <div className="text-white text-2xl">{mockBodycamRegistry.length}</div>
        </div>
        <div className="bg-[#1a1f2e] border border-green-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Active</div>
          <div className="text-green-400 text-2xl">
            {mockBodycamRegistry.filter(b => b.status === 'Active').length}
          </div>
        </div>
        <div className="bg-[#1a1f2e] border border-yellow-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Charging</div>
          <div className="text-yellow-400 text-2xl">
            {mockBodycamRegistry.filter(b => b.status === 'Charging').length}
          </div>
        </div>
        <div className="bg-[#1a1f2e] border border-red-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Low Battery</div>
          <div className="text-red-400 text-2xl">
            {mockBodycamRegistry.filter(b => b.battery < 30 && b.status === 'Active').length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a1f2e] border border-[#2a3441] rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0d1117] border-b border-[#2a3441]">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Bodycam ID</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Model</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Battery</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">GPS Signal</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Assigned Officer</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Storage</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Last Sync</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a3441]">
            {mockBodycamRegistry.map((bodycam) => (
              <tr key={bodycam.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-cyan-400" />
                    <span className="text-white">{bodycam.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300 text-sm">{bodycam.model}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(bodycam.status)}`}>
                    {bodycam.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Battery className={`w-4 h-4 ${getBatteryColor(bodycam.battery)}`} />
                    <span className={`text-sm ${getBatteryColor(bodycam.battery)}`}>
                      {bodycam.battery}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Signal className={`w-4 h-4 ${getSignalColor(bodycam.gpsSignal)}`} />
                    <span className={`text-sm ${getSignalColor(bodycam.gpsSignal)}`}>
                      {bodycam.gpsSignal}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {bodycam.assignedOfficer !== 'Unassigned' && (
                      <User className="w-4 h-4 text-gray-400" />
                    )}
                    <div>
                      <div className="text-gray-300 text-sm">{bodycam.assignedOfficer}</div>
                      {bodycam.badgeNumber !== '-' && (
                        <div className="text-gray-500 text-xs">{bodycam.badgeNumber}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <span className="text-white">{bodycam.storageUsed} GB</span>
                    <span className="text-gray-500"> / {bodycam.storageTotal} GB</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1 rounded mt-1">
                    <div
                      className="bg-cyan-400 h-1 rounded"
                      style={{ width: `${(bodycam.storageUsed / bodycam.storageTotal) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-400 text-sm">{bodycam.lastSync}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-cyan-400/10 rounded transition-colors" title="Edit">
                      <Edit className="w-4 h-4 text-cyan-400" />
                    </button>
                    <button className="p-1 hover:bg-red-400/10 rounded transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
