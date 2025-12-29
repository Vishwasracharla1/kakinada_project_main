import { useState, useMemo } from 'react';
import { Car, MapPin, Clock, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';

interface ANPRListProps {
  onViewDetail: () => void;
  onViewApproval: () => void;
  userRole?: 'operator' | 'supervisor' | 'admin';
}

export function ANPRList({ onViewDetail, onViewApproval, userRole = 'operator' }: ANPRListProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'validated'>('all');
  
  const violations = [
    { id: 'VL-001', plate: 'MH02EK4399', confidence: 96, time: '10:23:45', location: 'NH-16 Junction', status: 'Pending', violation: 'Stolen Vehicle', severity: 'critical' },
    { id: 'VL-002', plate: 'RJ27TC0530', confidence: 89, time: '10:18:32', location: 'Gandhi Road', status: 'Validated', violation: 'Speed Limit', severity: 'medium' },
    { id: 'VL-003', plate: 'MH04DW9020', confidence: 94, time: '10:12:19', location: 'Beach Road', status: 'Pending', violation: 'Red Light', severity: 'medium' },
    { id: 'VL-004', plate: 'GJ05JH2501', confidence: 92, time: '10:05:47', location: 'Port Area', status: 'Approved', violation: 'No Entry', severity: 'high' },
    { id: 'VL-005', plate: 'HB06F9209', confidence: 87, time: '09:58:23', location: 'Main Bazaar', status: 'Pending', violation: 'Wrong Way', severity: 'medium' },
    { id: 'VL-006', plate: 'MH02EP4454', confidence: 91, time: '09:52:11', location: 'Station Road', status: 'Validated', violation: 'Overspeeding', severity: 'low' },
    { id: 'VL-007', plate: 'MH01DT1', confidence: 85, time: '09:45:56', location: 'Canal Road', status: 'Pending', violation: 'Parking Violation', severity: 'low' },
    { id: 'VL-008', plate: 'KL14RS1357', confidence: 93, time: '09:38:42', location: 'Highway Entry', status: 'Escalated', violation: 'Stolen Vehicle', severity: 'critical' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Validated':
        return CheckCircle;
      case 'Corrected':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validated':
        return 'text-green-400 bg-green-500/20';
      case 'Corrected':
        return 'text-yellow-400 bg-yellow-500/20';
      default:
        return 'text-orange-400 bg-orange-500/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-orange-400';
      default:
        return 'text-yellow-400';
    }
  };

  // Filter violations based on selected filter
  const filteredViolations = useMemo(() => {
    if (selectedFilter === 'all') {
      return violations;
    } else if (selectedFilter === 'pending') {
      // Filter for pending status (Pending, Approved statuses that need review)
      return violations.filter(v => 
        v.status === 'Pending' || v.status === 'Approved' || v.status === 'Escalated'
      );
    } else if (selectedFilter === 'validated') {
      // Filter for validated status
      return violations.filter(v => v.status === 'Validated');
    }
    return violations;
  }, [selectedFilter, violations]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === 'all'
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            All Violations
          </button>
          <button 
            onClick={() => setSelectedFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === 'pending'
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            Pending Review
          </button>
          <button 
            onClick={() => setSelectedFilter('validated')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === 'validated'
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            Validated
          </button>
        </div>

        {(userRole === 'supervisor' || userRole === 'admin') && (
          <button
            onClick={onViewApproval}
            className={`px-4 py-2 rounded-lg ${
              userRole === 'admin' ? 'bg-gray-500/20 text-gray-400 cursor-default' : 'bg-cyan-500 text-white hover:bg-cyan-600'
            }`}
            disabled={userRole === 'admin'}
          >
            Supervisor Queue (12) {userRole === 'admin' && '(View Only)'}
          </button>
        )}
      </div>

      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1f2937]">
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Violation ID</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Plate Number</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Snapshot</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Confidence</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Time</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Location</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Violation</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Status</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredViolations.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-400">
                  No violations found
                </td>
              </tr>
            ) : (
              filteredViolations.map((violation) => {
              const StatusIcon = getStatusIcon(violation.status);
              return (
                <tr
                  key={violation.id}
                  className="border-b border-[#1f2937] hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={onViewDetail}
                >
                  <td className="p-4">
                    <span className="text-gray-400 text-sm">{violation.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-white font-mono">{violation.plate}</span>
                  </td>
                  <td className="p-4">
                    <div className="w-20 h-12 bg-[#0a0e1a] rounded flex items-center justify-center">
                      <Eye className="w-6 h-6 text-gray-700" />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        violation.confidence >= 90
                          ? 'bg-green-500/20 text-green-400'
                          : violation.confidence >= 85
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-orange-500/20 text-orange-400'
                      }`}
                    >
                      {violation.confidence}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-400 text-sm">{violation.time}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-400 text-sm">{violation.location}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm ${getSeverityColor(violation.severity)}`}>{violation.violation}</span>
                  </td>
                  <td className="p-4">
                    <div className={`flex items-center justify-center gap-2 px-3 py-1 rounded ${getStatusColor(violation.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs">{violation.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
