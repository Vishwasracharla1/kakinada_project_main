import { AlertTriangle, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface AlertsHomeProps {
  onNavigate: (screen: string) => void;
  userRole: 'operator' | 'supervisor' | 'admin';
}

export function AlertsHome({ onNavigate, userRole }: AlertsHomeProps) {
  const stats = [
    { label: 'Active Alerts', value: '12', change: '-5', icon: AlertTriangle },
    { label: 'Pending Review', value: '8', change: '+2', icon: Clock },
    { label: 'Resolved Today', value: '47', change: '+12', icon: CheckCircle },
    { label: 'False Positives', value: '15', change: '-3', icon: XCircle },
  ];

  const getQuickActions = () => {
    if (userRole === 'operator') {
      return [
        {
          id: 'alerts-operator',
          title: 'Validation Queue',
          description: 'Quick validation and escalation',
          icon: Clock,
          count: '8 pending',
          gradient: 'from-cyan-500/20 to-cyan-600/20',
        },
      ];
    } else if (userRole === 'supervisor') {
      return [
        {
          id: 'alerts-supervisor',
          title: 'Supervisor Review',
          description: 'Approve or override AI decisions',
          icon: AlertTriangle,
          count: '5 escalated',
          gradient: 'from-green-500/20 to-green-600/20',
        },
      ];
    }
    return [
      {
        id: 'alerts-admin',
        title: 'AI Analytics',
        description: 'Performance metrics and patterns',
        icon: TrendingUp,
        count: 'View insights',
        gradient: 'from-purple-500/20 to-purple-600/20',
      },
    ];
  };

  const quickActions = getQuickActions();

  return (
    <div className="h-full bg-background overflow-auto">
      <div className="max-w-[1600px] mx-auto p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Alerts</h1>
          <p className="text-muted-foreground mt-1">AI anomaly detection and alert management</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-xl p-6 card-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">{stat.change}</span>
                    </div>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition text-left"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                <p className="text-xs text-muted-foreground mt-3">{action.count}</p>
              </button>
            );
          })}

          <button className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition text-left">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-semibold">All Alerts</h3>
            <p className="text-sm text-muted-foreground mt-1">Complete alert history</p>
            <p className="text-xs text-muted-foreground mt-3">View all</p>
          </button>

          <button className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition text-left">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="font-semibold">Alert Trends</h3>
            <p className="text-sm text-muted-foreground mt-1">Analytics and patterns</p>
            <p className="text-xs text-muted-foreground mt-3">View insights</p>
          </button>
        </div>

        <div className="bg-card rounded-xl card-shadow overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-semibold">Recent Alerts</h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { type: 'Intrusion', location: 'Zone B-7', severity: 'critical', confidence: 94, time: '2 min ago' },
              { type: 'Crowd Gathering', location: 'City Center', severity: 'high', confidence: 88, time: '5 min ago' },
              { type: 'Abandoned Object', location: 'Railway Station', severity: 'medium', confidence: 76, time: '8 min ago' },
              { type: 'Loitering', location: 'Market Area', severity: 'low', confidence: 82, time: '12 min ago' },
            ].map((alert, idx) => {
              const getSeverityColor = (severity: string) => {
                switch (severity) {
                  case 'critical':
                    return '#FF453A';
                  case 'high':
                    return '#FF9F0A';
                  case 'medium':
                    return '#FFD60A';
                  case 'low':
                    return '#30D158';
                  default:
                    return '#98989D';
                }
              };
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (userRole === 'operator') onNavigate('alerts-operator');
                    else if (userRole === 'supervisor') onNavigate('alerts-supervisor');
                    else onNavigate('alerts-admin');
                  }}
                  className="w-full p-6 hover:bg-accent smooth-transition text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${getSeverityColor(alert.severity)}15` }}
                      >
                        <AlertTriangle className="h-6 w-6" style={{ color: getSeverityColor(alert.severity) }} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{alert.type}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{alert.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">AI Confidence</p>
                        <p className="font-semibold mt-1">{alert.confidence}%</p>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${getSeverityColor(alert.severity)}15`,
                          color: getSeverityColor(alert.severity),
                        }}
                      >
                        {alert.severity}
                      </span>
                      <span className="text-sm text-muted-foreground w-20 text-right">{alert.time}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

