import { AlertTriangle, Users, Car, Flame, MapPin, Clock, Eye } from 'lucide-react';

interface DroneAlertsProps {
  onNavigate: (screen: string, data?: any) => void;
}

const mockAlerts = [
  {
    id: 'DA-2024-0012',
    droneId: 'D-001',
    type: 'Crowd Surge',
    severity: 'High',
    location: 'Beach Road Junction',
    timestamp: '2 min ago',
    confidence: 94,
    description: 'Sudden crowd gathering detected - 150+ people',
    status: 'Active',
    aiModel: 'AerialAI'
  },
  {
    id: 'DA-2024-0011',
    droneId: 'D-003',
    type: 'Vehicle Congestion',
    severity: 'Medium',
    location: 'NH-16 Bypass',
    timestamp: '5 min ago',
    confidence: 87,
    description: 'Heavy traffic buildup - 45+ vehicles stationary',
    status: 'Active',
    aiModel: 'AerialAI'
  },
  {
    id: 'DA-2024-0010',
    droneId: 'D-006',
    type: 'Fire/Smoke',
    severity: 'Critical',
    location: 'Industrial Area Sector-2',
    timestamp: '8 min ago',
    confidence: 91,
    description: 'Thermal anomaly detected - possible fire',
    status: 'Escalated',
    aiModel: 'AerialAI'
  },
  {
    id: 'DA-2024-0009',
    droneId: 'D-001',
    type: 'Human Clustering',
    severity: 'Low',
    location: 'Market Square',
    timestamp: '12 min ago',
    confidence: 78,
    description: 'Irregular human clustering pattern',
    status: 'Reviewed',
    aiModel: 'AerialAI'
  },
  {
    id: 'DA-2024-0008',
    droneId: 'D-003',
    type: 'Perimeter Intrusion',
    severity: 'High',
    location: 'Restricted Zone-7',
    timestamp: '18 min ago',
    confidence: 96,
    description: 'Unauthorized entry detected in restricted area',
    status: 'Active',
    aiModel: 'AerialAI'
  },
  {
    id: 'DA-2024-0007',
    droneId: 'D-006',
    type: 'Crowd Surge',
    severity: 'Medium',
    location: 'Railway Station Approach',
    timestamp: '25 min ago',
    confidence: 82,
    description: 'Moderate crowd density increase',
    status: 'Acknowledged',
    aiModel: 'AerialAI'
  }
];

export function DroneAlerts({ onNavigate }: DroneAlertsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-400 bg-red-400/10 border-red-400';
      case 'High': return 'text-orange-400 bg-orange-400/10 border-orange-400';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400';
      case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-red-400 bg-red-400/10';
      case 'Escalated': return 'text-orange-400 bg-orange-400/10';
      case 'Acknowledged': return 'text-yellow-400 bg-yellow-400/10';
      case 'Reviewed': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Crowd Surge': return Users;
      case 'Vehicle Congestion': return Car;
      case 'Fire/Smoke': return Flame;
      case 'Human Clustering': return Users;
      case 'Perimeter Intrusion': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const criticalCount = mockAlerts.filter(a => a.severity === 'Critical').length;
  const highCount = mockAlerts.filter(a => a.severity === 'High').length;
  const activeCount = mockAlerts.filter(a => a.status === 'Active').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1f2e] border border-[#2a3441] p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Alerts</div>
          <div className="text-white text-2xl">{mockAlerts.length}</div>
        </div>
        <div className="bg-[#1a1f2e] border border-red-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Critical</div>
          <div className="text-red-400 text-2xl">{criticalCount}</div>
        </div>
        <div className="bg-[#1a1f2e] border border-orange-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">High Priority</div>
          <div className="text-orange-400 text-2xl">{highCount}</div>
        </div>
        <div className="bg-[#1a1f2e] border border-yellow-400/30 p-4 rounded">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Active</div>
          <div className="text-yellow-400 text-2xl">{activeCount}</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-4">
        <select className="px-4 py-2 bg-[#1a1f2e] border border-[#2a3441] text-white rounded">
          <option>All Severities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="px-4 py-2 bg-[#1a1f2e] border border-[#2a3441] text-white rounded">
          <option>All Types</option>
          <option>Crowd Surge</option>
          <option>Vehicle Congestion</option>
          <option>Fire/Smoke</option>
          <option>Human Clustering</option>
          <option>Perimeter Intrusion</option>
        </select>
        <select className="px-4 py-2 bg-[#1a1f2e] border border-[#2a3441] text-white rounded">
          <option>All Status</option>
          <option>Active</option>
          <option>Escalated</option>
          <option>Acknowledged</option>
          <option>Reviewed</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {mockAlerts.map((alert) => {
          const TypeIcon = getTypeIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`bg-[#1a1f2e] border rounded p-4 hover:border-cyan-400/50 transition-all cursor-pointer ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                {/* Left: Alert Info */}
                <div className="flex gap-4 flex-1">
                  <div className={`w-12 h-12 rounded flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white">{alert.type}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">{alert.description}</p>

                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-cyan-400">Alert ID:</span>
                        <span>{alert.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>Drone: </span>
                        <span className="text-cyan-400">{alert.droneId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Confidence & Actions */}
                <div className="text-right space-y-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Confidence</div>
                    <div className="text-white text-xl">{alert.confidence}%</div>
                    <div className="text-xs text-gray-500">{alert.aiModel}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('drone-missions', { alertId: alert.id });
                      }}
                      className="px-3 py-1 bg-cyan-500/20 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors text-xs flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      View Feed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
