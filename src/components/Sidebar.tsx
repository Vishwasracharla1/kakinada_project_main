import { 
  LayoutDashboard, 
  Camera, 
  Video, 
  Car, 
  AlertTriangle, 
  FileText, 
  AlertCircle, 
  Cpu, 
  FolderOpen, 
  GitBranch, 
  BarChart3, 
  Target,
  Grid3x3,
  CheckCircle,
  Plane,
  Radio,
  Eye,
  TrendingUp,
  Users,
  Activity,
  Sun,
  Moon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {  Clock } from 'lucide-react';

import apPoliceLogo from "../assets/ap-police-logo.png";



interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  userRole: 'operator' | 'supervisor' | 'admin';
}

interface NavSection {
  title: string;
  items: Array<{
    id: string;
    label: string;
    icon: any;
    roles: string[];
  }>;
}

export function Sidebar({ activeScreen, onNavigate, userRole }: SidebarProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('kkn_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('kkn_theme', theme);
  }, [theme]);

  const navSections: NavSection[] = [
    {
      title: '',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'analytics-home', label: 'Analytics Dashboard', icon: BarChart3, roles: ['operator', 'supervisor', 'admin'] },
      ]
      
    },
    {
      title: 'Surveillance Intelligence',
      items: [
        { id: 'surveillance-grid', label: 'Live Camera Grid', icon: Camera, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'cross-camera-tracking', label: 'Multi-Camera Tracking', icon: Target, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'multi-grid-viewer', label: 'Multi-Grid Viewer', icon: Grid3x3, roles: ['operator', 'supervisor', 'admin'] },
      ]
    },
    {
      title: 'Bodycam Monitoring',
      items: [
        { id: 'bodycam-grid', label: 'Bodycam Grid', icon: Video, roles: ['operator', 'supervisor', 'admin'] },
      ]
    },
    {
      title: 'ANPR Module',
      items: [
        { id: 'anpr-home', label: 'ANPR', icon: Car, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'anpr-list', label: 'Violations List', icon: Car, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'anpr-approval', label: 'Approval / Escalations', icon: CheckCircle, roles: ['operator', 'supervisor', 'admin'] },
      ]
    },
    {
      title: 'Alerts & incidents management',
      items: [
        { id: 'alerts-home', label: 'Anomaly Alerts', icon: AlertTriangle, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'sop', label: 'AI SOP Compliance', icon: FileText, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'incidents-home', label: 'Incident Management', icon: AlertCircle, roles: ['operator', 'supervisor', 'admin'] },

      ]
    },
    {
      title: 'Drone & Aerial Operations',
      items: [
        { id: 'drone-fleet', label: 'Drone Fleet Status', icon: Plane, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'drone-missions', label: 'Live Drone Missions', icon: Radio, roles: ['operator', 'supervisor', 'admin'] },
        { id: 'drone-alerts', label: 'Drone Alerts', icon: AlertTriangle, roles: ['operator', 'supervisor', 'admin'] },
      ]
    },
   
    // {
    //   title: 'Detection Engine',
    //   items: [
    //     { id: 'detection-log', label: 'Detection Log', icon: Cpu, roles: ['supervisor', 'admin'] },
    //     { id: 'bbox-verification', label: 'Bounding Box Verify', icon: Eye, roles: ['supervisor', 'admin'] },
    //     { id: 'plate-verification', label: 'Plate Text Verify', icon: CheckCircle, roles: ['supervisor', 'admin'] },
    //   ]
    // },
    {
      title: 'Evidence Console',
      items: [
        { id: 'evidence-home', label: 'Evidence', icon: FolderOpen, roles: ['operator', 'supervisor', 'admin'] },
      ]
    },
    {
      title: 'Explainability',
      items: [
        { id: 'explainability-home', label: 'Explainability', icon: GitBranch, roles: ['supervisor', 'admin'] },
      ]
    },

    {
      title: 'Administration',
      items: [
        { id: 'admin-cameras', label: 'Camera Registry', icon: Camera, roles: ['admin'] },
        { id: 'admin-drones', label: 'Drone Registry', icon: Plane, roles: ['admin'] },
        { id: 'admin-bodycams', label: 'Bodycam Registry', icon: Video, roles: ['admin'] },
        { id: 'admin-users', label: 'User Management', icon: Users, roles: ['admin'] },
        { id: 'admin-system', label: 'System Health', icon: Activity, roles: ['admin'] },
        //{ id: 'admin-ai-models', label: 'AI Model Manager', icon: Cpu, roles: ['admin'] },
      ]
    }
  ];

  // Filter sections based on user role
  const filteredSections = navSections
    .map(section => ({
      ...section,
      items: section.items.filter(item => item.roles.includes(userRole))
    }))
    .filter(section => section.items.length > 0);

  const getRoleTitle = () => {
    switch(userRole) {
      case 'operator': return 'Control Room Operator';
      case 'supervisor': return 'Supervisor';
      case 'admin': return 'System Administrator';
    }
  };
   const [currentTime, setCurrentTime] = useState(new Date());
   useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="w-64 bg-[#0d1117] border-r border-[#1f2937] flex flex-col">
      <div className="p-6 border-b border-[#1f2937]">
        
        <div className="flex items-center gap-2">
  <img 
    src={apPoliceLogo} 
    alt="AP Police Logo" 
    className="w-12 h-13 object-contain"
  />
  <h1 className="text-cyan-400 tracking-wide">KAKINADA POLICE</h1>
</div>

        <p className="text-[10px] text-gray-500 mt-1 tracking-widest uppercase">Command & Control</p>
  
         <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {currentTime.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: false 
              })} IST
            </span>
            <div className="text-slate-200">|</div>
            <div className="text-sm text-slate-400">
            {currentTime.toLocaleDateString('en-IN', { 
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </div>
          </div>      
      </div>

    <nav className="flex-1 overflow-y-auto py-4">
        {filteredSections.map((section, sectionIndex) => (
          <div key={section.title} className={sectionIndex > 0 ? 'mt-4' : ''}>
            {section.title && (
              <p className="text-xs text-gray-500 px-6 mb-2 uppercase tracking-wider">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.id.startsWith('anpr')
                  ? activeScreen.startsWith('anpr')
                  : item.id.startsWith('alerts')
                  ? activeScreen.startsWith('alerts')
                  : item.id.startsWith('incidents')
                  ? activeScreen.startsWith('incident')
                  : item.id.startsWith('evidence')
                  ? activeScreen.startsWith('evidence')
                  : item.id.startsWith('explainability')
                  ? activeScreen.startsWith('explainability')
                  : activeScreen.startsWith(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-[#1f2937]">
        <div className="mb-3 pb-3 border-b border-[#1f2937]">
          <p className="text-xs text-gray-500">Logged in as:</p>
          <p className="text-xs text-cyan-400 mt-0.5">{getRoleTitle()}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="flex-1 text-left text-[10px] text-gray-600 border border-[#1f2937] bg-[#0a0e1a] rounded-lg px-3 py-2 hover:bg-white/5 transition-colors"
          >
            <div>
              System Status: <span className="text-green-400">ONLINE</span>
            </div>
            <div>v2.1.3 • {new Date().toLocaleDateString()}</div>
          </button>

          <button
            type="button"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            className="kkn-theme-toggle"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <span className={`kkn-theme-toggle__icon ${theme === 'light' ? 'is-active' : ''}`}>
              <Sun className="w-4 h-4" />
            </span>
            <span className={`kkn-theme-toggle__icon ${theme === 'dark' ? 'is-active' : ''}`}>
              <Moon className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}