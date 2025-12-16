import { User, Edit, Trash2, Plus, Shield, Lock } from 'lucide-react';

export function UserManagement() {
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@kakinada.gov.in', role: 'Administrator', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Officer Kumar', email: 'kumar@kakinada.gov.in', role: 'Operator', status: 'active', lastLogin: '5 hours ago' },
    { id: 3, name: 'Officer Sharma', email: 'sharma@kakinada.gov.in', role: 'Operator', status: 'active', lastLogin: '1 day ago' },
    { id: 4, name: 'Supervisor Reddy', email: 'reddy@kakinada.gov.in', role: 'Supervisor', status: 'active', lastLogin: '3 hours ago' },
    { id: 5, name: 'Analyst Rao', email: 'rao@kakinada.gov.in', role: 'Analyst', status: 'active', lastLogin: '30 min ago' },
    { id: 6, name: 'Officer Singh', email: 'singh@kakinada.gov.in', role: 'Operator', status: 'inactive', lastLogin: '3 days ago' },
    { id: 7, name: 'Tech Support', email: 'support@kakinada.gov.in', role: 'Technical', status: 'active', lastLogin: '1 hour ago' },
    { id: 8, name: 'Officer Patel', email: 'patel@kakinada.gov.in', role: 'Operator', status: 'active', lastLogin: '6 hours ago' },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator': return 'bg-red-500/20 text-red-400';
      case 'Supervisor': return 'bg-purple-500/20 text-purple-400';
      case 'Operator': return 'bg-cyan-500/20 text-cyan-400';
      case 'Analyst': return 'bg-green-500/20 text-green-400';
      case 'Technical': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-500/20 text-green-400'
      : 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20">
            All Users
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Administrators
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Operators
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Active Only
          </button>
        </div>
        <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1f2937]">
              <th className="text-left p-4 text-xs text-gray-500 uppercase">User</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Email</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Role</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Status</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Last Login</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#1f2937] hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-white">{user.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm">{user.email}</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded text-xs ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded text-xs uppercase ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm">{user.lastLogin}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-purple-400 hover:bg-purple-500/10 rounded transition-colors">
                      <Shield className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal Preview */}
      <div className="mt-6 bg-[#0d1117] border border-[#1f2937] rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-lg">
            <User className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-white mb-2">User Management</h3>
            <p className="text-sm text-gray-400 mb-4">
              Manage user access, roles, and permissions. Click "Add User" to create a new user account or select a user to edit their details.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Manage Permissions
              </button>
              <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
