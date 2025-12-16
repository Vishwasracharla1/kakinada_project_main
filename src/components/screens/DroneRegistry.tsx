import { Plane, Plus, Edit, Trash2, Calendar, Wrench, Battery, MapPin } from 'lucide-react';

const mockDroneRegistry = [
  {
    id: 'D-001',
    model: 'DJI Matrice 300 RTK',
    serialNumber: 'DJI-M300-2023-001',
    purchaseDate: '2023-01-15',
    status: 'Active',
    lastMaintenance: '2024-10-15',
    nextMaintenance: '2025-01-15',
    flightHours: 342,
    maxFlightTime: 55,
    payload: 'RGB + Zoom Camera',
    assignedOperator: 'Pilot Ravi Kumar',
    baseStation: 'Main Command Center'
  },
  {
    id: 'D-002',
    model: 'DJI Matrice 300 RTK',
    serialNumber: 'DJI-M300-2023-002',
    purchaseDate: '2023-01-15',
    status: 'Active',
    lastMaintenance: '2024-11-01',
    nextMaintenance: '2025-02-01',
    flightHours: 298,
    maxFlightTime: 55,
    payload: 'Thermal Camera',
    assignedOperator: 'Unassigned',
    baseStation: 'Main Command Center'
  },
  {
    id: 'D-003',
    model: 'DJI Matrice 300 RTK',
    serialNumber: 'DJI-M300-2023-003',
    purchaseDate: '2023-02-20',
    status: 'Active',
    lastMaintenance: '2024-10-20',
    nextMaintenance: '2025-01-20',
    flightHours: 415,
    maxFlightTime: 55,
    payload: 'RGB + Zoom Camera',
    assignedOperator: 'Pilot Anjali Devi',
    baseStation: 'Main Command Center'
  },
  {
    id: 'D-004',
    model: 'DJI Matrice 30T',
    serialNumber: 'DJI-M30T-2023-001',
    purchaseDate: '2023-03-10',
    status: 'Active',
    lastMaintenance: '2024-11-10',
    nextMaintenance: '2025-02-10',
    flightHours: 186,
    maxFlightTime: 41,
    payload: 'Thermal + Wide Angle',
    assignedOperator: 'Unassigned',
    baseStation: 'Sub-Station Alpha'
  },
  {
    id: 'D-005',
    model: 'DJI Matrice 300 RTK',
    serialNumber: 'DJI-M300-2023-004',
    purchaseDate: '2023-01-15',
    status: 'Maintenance',
    lastMaintenance: '2024-11-20',
    nextMaintenance: '2024-12-01',
    flightHours: 521,
    maxFlightTime: 55,
    payload: 'RGB + Zoom Camera',
    assignedOperator: 'Unassigned',
    baseStation: 'Workshop'
  },
  {
    id: 'D-006',
    model: 'DJI Matrice 30T',
    serialNumber: 'DJI-M30T-2023-002',
    purchaseDate: '2023-03-10',
    status: 'Active',
    lastMaintenance: '2024-10-25',
    nextMaintenance: '2025-01-25',
    flightHours: 203,
    maxFlightTime: 41,
    payload: 'Thermal + Wide Angle',
    assignedOperator: 'Pilot Suresh Babu',
    baseStation: 'Sub-Station Beta'
  }
];

export function DroneRegistry() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10';
      case 'Maintenance': return 'text-yellow-400 bg-yellow-400/10';
      case 'Retired': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const isMaintenanceDue = (nextMaintenance: string) => {
    const next = new Date(nextMaintenance);
    const now = new Date();
    const diffDays = Math.ceil((next.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl">Drone Registry</h2>
          <p className="text-gray-400 text-sm mt-1">{mockDroneRegistry.length} drones registered</p>
        </div>
        <button className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Register New Drone
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1f2e] border border-[#2a3441] p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Drones</div>
          <div className="text-white text-2xl">{mockDroneRegistry.length}</div>
        </div>
        <div className="bg-[#1a1f2e] border border-green-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Active</div>
          <div className="text-green-400 text-2xl">
            {mockDroneRegistry.filter(d => d.status === 'Active').length}
          </div>
        </div>
        <div className="bg-[#1a1f2e] border border-yellow-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Maintenance</div>
          <div className="text-yellow-400 text-2xl">
            {mockDroneRegistry.filter(d => d.status === 'Maintenance').length}
          </div>
        </div>
        <div className="bg-[#1a1f2e] border border-orange-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Service Due</div>
          <div className="text-orange-400 text-2xl">
            {mockDroneRegistry.filter(d => isMaintenanceDue(d.nextMaintenance)).length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a1f2e] border border-[#2a3441] rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0d1117] border-b border-[#2a3441]">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Drone ID</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Model</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Serial Number</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Flight Hours</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Next Maintenance</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Operator</th>
              <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a3441]">
            {mockDroneRegistry.map((drone) => (
              <tr key={drone.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-cyan-400" />
                    <span className="text-white">{drone.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300 text-sm">{drone.model}</td>
                <td className="px-4 py-3 text-gray-400 text-sm">{drone.serialNumber}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(drone.status)}`}>
                    {drone.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-gray-400" />
                    <span className="text-white text-sm">{drone.flightHours}h</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Wrench className={`w-4 h-4 ${isMaintenanceDue(drone.nextMaintenance) ? 'text-orange-400' : 'text-gray-400'}`} />
                    <span className={`text-sm ${isMaintenanceDue(drone.nextMaintenance) ? 'text-orange-400' : 'text-gray-400'}`}>
                      {drone.nextMaintenance}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300 text-sm">
                  {drone.assignedOperator}
                </td>
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
