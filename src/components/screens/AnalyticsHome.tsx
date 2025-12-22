import { TrendingUp, Camera, AlertTriangle, Clock } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

function isLightTheme() {
  return document?.documentElement?.dataset?.theme === 'light';
}

interface AnalyticsHomeProps {
  onViewCameraHealth: () => void;
  onViewViolations: () => void;
}

export function AnalyticsHome({ onViewCameraHealth, onViewViolations }: AnalyticsHomeProps) {
  const uptimeData = [
    { day: 'Mon', uptime: 99.2 },
    { day: 'Tue', uptime: 98.8 },
    { day: 'Wed', uptime: 99.5 },
    { day: 'Thu', uptime: 99.1 },
    { day: 'Fri', uptime: 98.9 },
    { day: 'Sat', uptime: 99.3 },
    { day: 'Sun', uptime: 99.6 },
  ];

  const incidentData = [
    { month: 'Jan', incidents: 45 },
    { month: 'Feb', incidents: 52 },
    { month: 'Mar', incidents: 48 },
    { month: 'Apr', incidents: 61 },
    { month: 'May', incidents: 55 },
    { month: 'Jun', incidents: 67 },
  ];

  const violationData = [
    { type: 'Speeding', value: 145 },
    { type: 'Red Light', value: 89 },
    { type: 'Wrong Way', value: 34 },
    { type: 'Parking', value: 67 },
    { type: 'Other', value: 28 },
  ];

  const responseData = [
    { hour: '00:00', time: 4.2 },
    { hour: '04:00', time: 3.8 },
    { hour: '08:00', time: 5.1 },
    { hour: '12:00', time: 6.3 },
    { hour: '16:00', time: 5.7 },
    { hour: '20:00', time: 4.9 },
  ];

  const COLORS = ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

  const gridColor = isLightTheme() ? '#e5e7eb' : '#1f2937';
  const axisText = isLightTheme() ? '#6b7280' : '#9ca3af';
  const tooltipBg = isLightTheme() ? 'rgba(17,24,39,0.92)' : 'rgba(13,17,23,0.96)';

  const uptimeOption = {
    grid: { left: 40, right: 16, top: 18, bottom: 28 },
    xAxis: {
      type: 'category',
      data: uptimeData.map((d) => d.day),
      axisLine: { lineStyle: { color: gridColor } },
      axisLabel: { color: axisText },
    },
    yAxis: {
      type: 'value',
      min: 98,
      max: 100,
      axisLine: { lineStyle: { color: gridColor } },
      splitLine: { lineStyle: { color: gridColor, type: 'dashed', opacity: 0.8 } },
      axisLabel: { color: axisText },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      textStyle: { color: '#e5e7eb' },
    },
    series: [
      {
        type: 'line',
        data: uptimeData.map((d) => d.uptime),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#06b6d4' },
        itemStyle: { color: '#06b6d4' },
        areaStyle: { color: 'rgba(6,182,212,0.12)' },
      },
    ],
  };

  const incidentOption = {
    grid: { left: 40, right: 16, top: 18, bottom: 28 },
    xAxis: {
      type: 'category',
      data: incidentData.map((d) => d.month),
      axisLine: { lineStyle: { color: gridColor } },
      axisLabel: { color: axisText },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: gridColor } },
      splitLine: { lineStyle: { color: gridColor, type: 'dashed', opacity: 0.8 } },
      axisLabel: { color: axisText },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      textStyle: { color: '#e5e7eb' },
    },
    series: [
      {
        type: 'bar',
        data: incidentData.map((d) => d.incidents),
        itemStyle: { color: '#8b5cf6', borderRadius: [8, 8, 2, 2] },
        barWidth: 34,
      },
    ],
  };

  const violationOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      textStyle: { color: '#e5e7eb' },
    },
    series: [
      {
        type: 'pie',
        radius: ['58%', '82%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: isLightTheme() ? '#ffffff' : '#0d1117', borderWidth: 2 },
        label: { show: false },
        emphasis: { scale: true, scaleSize: 6 },
        data: violationData.map((v, idx) => ({
          name: v.type,
          value: v.value,
          itemStyle: { color: COLORS[idx % COLORS.length] },
        })),
      },
    ],
  };

  const responseOption = {
    grid: { left: 46, right: 16, top: 18, bottom: 28 },
    xAxis: {
      type: 'category',
      data: responseData.map((d) => d.hour),
      axisLine: { lineStyle: { color: gridColor } },
      axisLabel: { color: axisText },
    },
    yAxis: {
      type: 'value',
      name: 'Minutes',
      nameTextStyle: { color: axisText, padding: [0, 0, 0, 10] },
      axisLine: { lineStyle: { color: gridColor } },
      splitLine: { lineStyle: { color: gridColor, type: 'dashed', opacity: 0.8 } },
      axisLabel: { color: axisText },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: tooltipBg,
      borderColor: gridColor,
      textStyle: { color: '#e5e7eb' },
    },
    series: [
      {
        type: 'line',
        data: responseData.map((d) => d.time),
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { width: 3, color: '#10b981' },
        itemStyle: { color: '#10b981' },
        areaStyle: { color: 'rgba(16,185,129,0.10)' },
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Top Metrics — aligned with ANPR card style */}
      <div className="grid grid-cols-4 gap-4">
        {/* Avg Camera Uptime */}
        <div className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-cyan-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Avg Camera Uptime</p>
          <p className="text-2xl font-semibold text-foreground">99.2%</p>
        </div>

        {/* Total Incidents */}
        <div className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Incidents</p>
          <p className="text-2xl font-semibold text-foreground">328</p>
        </div>

        {/* Avg Response Time */}
        <div className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
          <p className="text-2xl font-semibold text-foreground">5.2m</p>
        </div>

        {/* AI Accuracy */}
        <div className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Camera className="w-5 h-5 text-purple-400" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">AI Accuracy</p>
          <p className="text-2xl font-semibold text-foreground">91.8%</p>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Camera Health Card */}
        <button
          type="button"
          onClick={onViewCameraHealth}
          className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition text-left flex items-center justify-between group"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-400 mb-1">
              Camera Health
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              View detailed camera uptime & status
            </h3>
            <p className="text-sm text-muted-foreground">
              Zone-wise availability, offline trends, and health insights.
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20">
            <Camera className="w-6 h-6 text-emerald-400" />
          </div>
        </button>

        {/* Violation Trends Card */}
        <button
          type="button"
          onClick={onViewViolations}
          className="bg-card rounded-xl p-6 card-shadow hover-elevate smooth-transition text-left flex items-center justify-between group"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-purple-400 mb-1">
              Violation Trends
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Explore ANPR & anomaly trend analytics
            </h3>
            <p className="text-sm text-muted-foreground">
              Pattern analysis by time, type, and hotspot locations.
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20">
            <AlertTriangle className="w-6 h-6 text-purple-400" />
          </div>
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Camera Uptime */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
            <h3 className="text-white">Camera Uptime (7 Days)</h3>
            <button onClick={onViewCameraHealth} className="text-xs text-cyan-400 hover:text-cyan-300">
              View Details →
            </button>
          </div>
          <div className="p-6">
            <ReactECharts option={uptimeOption} style={{ height: 250, width: '100%' }} />
          </div>
        </div>

        {/* Incident Trends */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Incident Trends (6 Months)</h3>
          </div>
          <div className="p-6">
            <ReactECharts option={incidentOption} style={{ height: 250, width: '100%' }} />
          </div>
        </div>

        {/* Violation Types */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
            <h3 className="text-white">Violation Distribution</h3>
            <button onClick={onViewViolations} className="text-xs text-cyan-400 hover:text-cyan-300">
              View Details →
            </button>
          </div>
          <div className="p-6 flex items-center">
            <div className="w-1/2">
              <ReactECharts option={violationOption} style={{ height: 250, width: '100%' }} />
            </div>
            <div className="flex-1 space-y-2">
              {violationData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-gray-400">{item.type}</span>
                  </div>
                  <span className="text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response Times */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Response Times (24h)</h3>
          </div>
          <div className="p-6">
            <ReactECharts option={responseOption} style={{ height: 250, width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
