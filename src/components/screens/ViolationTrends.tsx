import { ArrowLeft, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ViolationTrendsProps {
  onBack: () => void;
}

export function ViolationTrends({ onBack }: ViolationTrendsProps) {
  const dailyData = [
    { date: 'Mon', speeding: 28, redLight: 15, parking: 12, other: 8 },
    { date: 'Tue', speeding: 32, redLight: 18, parking: 14, other: 9 },
    { date: 'Wed', speeding: 25, redLight: 12, parking: 16, other: 7 },
    { date: 'Thu', speeding: 30, redLight: 20, parking: 13, other: 11 },
    { date: 'Fri', speeding: 35, redLight: 22, parking: 18, other: 12 },
    { date: 'Sat', speeding: 42, redLight: 25, parking: 22, other: 15 },
    { date: 'Sun', speeding: 38, redLight: 21, parking: 20, other: 13 },
  ];

  const monthlyTrend = [
    { month: 'Jan', total: 245 },
    { month: 'Feb', total: 289 },
    { month: 'Mar', total: 267 },
    { month: 'Apr', total: 312 },
    { month: 'May', total: 298 },
    { month: 'Jun', total: 363 },
  ];

  const hotspots = [
    { location: 'NH-16 Junction', violations: 145, trend: 12, type: 'up' },
    { location: 'Beach Road', violations: 89, trend: -5, type: 'down' },
    { location: 'Gandhi Road', violations: 78, trend: 8, type: 'up' },
    { location: 'Port Area', violations: 67, trend: -2, type: 'down' },
    { location: 'Market Square', violations: 54, trend: 15, type: 'up' },
    { location: 'Station Road', violations: 43, trend: 3, type: 'up' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Analytics
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Daily Violations */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Daily Violations (Last 7 Days)</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #1f2937', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="speeding" stackId="a" fill="#06b6d4" name="Speeding" />
                <Bar dataKey="redLight" stackId="a" fill="#8b5cf6" name="Red Light" />
                <Bar dataKey="parking" stackId="a" fill="#f59e0b" name="Parking" />
                <Bar dataKey="other" stackId="a" fill="#10b981" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Monthly Trend (6 Months)</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #1f2937', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="total" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Hotspots */}
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#1f2937]">
          <h3 className="text-white">Top Violation Hotspots</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {hotspots.map((hotspot, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-[#0a0e1a] rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-cyan-500/10 rounded-lg">
                  <span className="text-xl text-cyan-400">#{idx + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-white">{hotspot.location}</span>
                  </div>
                  <p className="text-sm text-gray-500">Total Violations: <span className="text-white">{hotspot.violations}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  {hotspot.type === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-red-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-green-400" />
                  )}
                  <span className={`${hotspot.type === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                    {Math.abs(hotspot.trend)}%
                  </span>
                </div>
                <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">This Week</p>
          <p className="text-2xl text-white mb-1">363</p>
          <p className="text-xs text-red-400">↑ 18% from last week</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">This Month</p>
          <p className="text-2xl text-white mb-1">1,476</p>
          <p className="text-xs text-green-400">↓ 5% from last month</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Peak Hour</p>
          <p className="text-2xl text-white mb-1">6-8 PM</p>
          <p className="text-xs text-gray-500">42% of violations</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Most Common</p>
          <p className="text-2xl text-cyan-400 mb-1">Speeding</p>
          <p className="text-xs text-gray-500">38% of all violations</p>
        </div>
      </div>
    </div>
  );
}
