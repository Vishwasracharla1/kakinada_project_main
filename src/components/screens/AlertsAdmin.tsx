import { AlertTriangle, Cpu, TrendingUp, TrendingDown, Activity, BarChart3, PieChart } from 'lucide-react';
import { useState } from 'react';

interface AlertsAdminProps {
  onBack: () => void;
}

export function AlertsAdmin({ onBack }: AlertsAdminProps) {
  const [dateRange, setDateRange] = useState('7days');

  const aiMetrics = {
    totalAlerts: 1847,
    truePositives: 1623,
    falsePositives: 187,
    falseNegatives: 37,
    accuracy: 87.9,
    precision: 89.7,
    recall: 97.8,
    avgConfidence: 88.4,
  };

  const alertPatterns = [
    {
      pattern: 'High False Positive Rate',
      engine: 'RakshakAI',
      affectedType: 'Crowd Detection',
      occurrences: 45,
      trend: 'increasing',
      impact: 'high',
      recommendation: 'Retrain model with recent crowd footage',
    },
    {
      pattern: 'Low Confidence Detections',
      engine: 'AerialAI',
      affectedType: 'Vehicle Tracking',
      occurrences: 28,
      trend: 'stable',
      impact: 'medium',
      recommendation: 'Check drone camera calibration',
    },
    {
      pattern: 'Supervisor Override Pattern',
      engine: 'ANPR Engine',
      affectedType: 'Parking Violations',
      occurrences: 18,
      trend: 'decreasing',
      impact: 'low',
      recommendation: 'AI learning from overrides - pattern improving',
    },
  ];

  const engineHealth = [
    {
      name: 'RakshakAI',
      version: 'v2.3.1',
      status: 'operational',
      uptime: 99.7,
      avgProcessingTime: 245,
      alertsToday: 847,
      falsePositiveRate: 9.2,
      lastRetrained: '2024-11-28',
    },
    {
      name: 'ANPR Engine',
      version: 'v3.1.0',
      status: 'operational',
      uptime: 99.9,
      avgProcessingTime: 142,
      alertsToday: 624,
      falsePositiveRate: 7.8,
      lastRetrained: '2024-11-25',
    },
    {
      name: 'AerialAI',
      version: 'v1.8.2',
      status: 'warning',
      uptime: 98.2,
      avgProcessingTime: 189,
      alertsToday: 312,
      falsePositiveRate: 12.4,
      lastRetrained: '2024-11-20',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getTrendIcon = (trend: string) => (trend === 'increasing' ? TrendingUp : TrendingDown);

  const getTrendColor = (trend: string, impact: string) => {
    if (trend === 'increasing' && impact === 'high') return 'text-red-400';
    if (trend === 'decreasing') return 'text-green-400';
    return 'text-yellow-400';
  };

  const rangeLabel = () => {
    if (dateRange === '24h') return '24 Hours';
    if (dateRange === '7days') return '7 Days';
    return '30 Days';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3"
          >
            <AlertTriangle className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl">Alert Analytics – AI Performance Dashboard</h1>
              <p className="text-gray-400 text-sm">
                AI reasoning patterns, engine health, and performance metrics • Admin & AI Team Only
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg text-white text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4 mb-4">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          Overall AI Alert Performance (Last {rangeLabel()})
        </h3>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Accuracy</p>
            <p className="text-2xl text-white font-bold mb-1">{aiMetrics.accuracy}%</p>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+2.1% vs previous period</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Precision</p>
            <p className="text-2xl text-white font-bold mb-1">{aiMetrics.precision}%</p>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+1.4% vs previous period</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Recall</p>
            <p className="text-2xl text-white font-bold mb-1">{aiMetrics.recall}%</p>
            <div className="flex items-center gap-1 text-sm text-red-400">
              <TrendingDown className="w-4 h-4" />
              <span>-0.3% vs previous period</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Avg Confidence</p>
            <p className="text-2xl text-white font-bold mb-1">{aiMetrics.avgConfidence}%</p>
            <p className="text-xs text-gray-400">Across all engines</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-purple-500/30">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Total Alerts</p>
            <p className="text-xl text-white font-bold">{aiMetrics.totalAlerts}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">True Positives</p>
            <p className="text-xl text-green-400 font-bold">{aiMetrics.truePositives}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">False Positives</p>
            <p className="text-xl text-red-400 font-bold">{aiMetrics.falsePositives}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">False Negatives</p>
            <p className="text-xl text-orange-400 font-bold">{aiMetrics.falseNegatives}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-cyan-400" />
          Detected Anomaly Patterns
        </h3>

        <div className="space-y-3">
          {alertPatterns.map((pattern, idx) => {
            const TrendIcon = getTrendIcon(pattern.trend);
            return (
              <div
                key={idx}
                className={`bg-[#0d1117] border rounded-lg p-4 ${
                  pattern.impact === 'high'
                    ? 'border-red-500/30'
                    : pattern.impact === 'medium'
                    ? 'border-yellow-500/30'
                    : 'border-green-500/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium text-sm">{pattern.pattern}</h4>
                      <div className={`flex items-center gap-1 ${getTrendColor(pattern.trend, pattern.impact)}`}>
                        <TrendIcon className="w-4 h-4" />
                        <span className="text-xs uppercase">{pattern.trend}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 mb-2 text-xs">
                      <div>
                        <p className="text-xs text-gray-500">AI Engine</p>
                        <p className="text-purple-400 text-sm">{pattern.engine}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Affected Type</p>
                        <p className="text-white text-sm">{pattern.affectedType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Occurrences</p>
                        <p className="text-white text-sm font-bold">{pattern.occurrences} times</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Impact</p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            pattern.impact === 'high'
                              ? 'bg-red-500/20 text-red-400'
                              : pattern.impact === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}
                        >
                          {pattern.impact.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <p className="text-xs text-blue-400 mb-1">Recommendation:</p>
                      <p className="text-white text-sm">{pattern.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-green-400" />
          AI Engine Health Metrics
        </h3>

        <div className="space-y-3">
          {engineHealth.map((engine) => (
            <div
              key={engine.name}
              className="bg-[#0d1117] border-2 border-[#1f2937] rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
            >
              <div className="p-5 border-b border-[#1f2937] bg-gradient-to-r from-purple-500/5 to-blue-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Cpu className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-lg font-medium">{engine.name}</h4>
                      <p className="text-xs text-gray-500">Version {engine.version}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 border rounded-lg ${getStatusColor(engine.status)}`}>
                    <p className="text-xs uppercase font-bold">{engine.status}</p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-6 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Uptime</p>
                    <p className="text-white text-xl font-bold">{engine.uptime}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Processing Time</p>
                    <p className="text-white text-xl font-bold">
                      {engine.avgProcessingTime}
                      <span className="text-sm text-gray-400">ms</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Alerts Today</p>
                    <p className="text-cyan-400 text-xl font-bold">{engine.alertsToday}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">False Positive Rate</p>
                    <p
                      className={`text-xl font-bold ${
                        engine.falsePositiveRate > 10 ? 'text-red-400' : engine.falsePositiveRate > 8 ? 'text-yellow-400' : 'text-green-400'
                      }`}
                    >
                      {engine.falsePositiveRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Retrained</p>
                    <p className="text-white text-sm">{engine.lastRetrained}</p>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-500/30 text-sm">
                      View Logs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-lg p-5">
        <h4 className="text-white mb-3">Admin/AI Team Analytics Dashboard</h4>
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-400">
          <div>
            <p className="text-purple-400 mb-2">📊 Available Analytics:</p>
            <ul className="text-xs space-y-1">
              <li>• AI engine performance trends over time</li>
              <li>• Pattern detection and anomaly identification</li>
              <li>• False positive/negative analysis</li>
              <li>• Processing time and uptime monitoring</li>
              <li>• Model drift detection</li>
              <li>• Retraining recommendations</li>
            </ul>
          </div>
          <div>
            <p className="text-cyan-400 mb-2">🔍 Use Cases:</p>
            <ul className="text-xs space-y-1">
              <li>• Identify underperforming AI models</li>
              <li>• Track improvement after retraining</li>
              <li>• Optimize detection thresholds</li>
              <li>• Monitor supervisor override patterns</li>
              <li>• Generate compliance reports</li>
              <li>• Schedule preventive maintenance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

