import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

// screens…
import { Dashboard } from './components/screens/Dashboard';
import { LiveGrid, Camera } from './components/screens/LiveGrid';
import { MultiGrid } from './components/screens/MultiGrid';
import { CameraDetail } from './components/screens/CameraDetail';
import { BodycamGrid } from './components/screens/BodycamGrid';
import { BodycamDetail } from './components/screens/BodycamDetail';
import { ANPRHome } from './components/screens/ANPRHome';
import { ANPRList } from './components/screens/ANPRList';
import { ANPRDetail } from './components/screens/ANPRDetail';
import { ANPRApproval } from './components/screens/ANPRApproval';
import { ANPROperator } from './components/screens/ANPROperator';
import { ANPRSupervisorQueue } from './components/screens/ANPRSupervisorQueue';
import { Alerts } from './components/screens/Alerts';
import { AlertsHome } from './components/screens/AlertsHome';
import { AlertsOperator } from './components/screens/AlertsOperator';
import { AlertsSupervisor } from './components/screens/AlertsSupervisor';
import { AlertsAdmin } from './components/screens/AlertsAdmin';
import { SOPCompliance } from './components/screens/SOPCompliance';
import { IncidentsHome } from './components/screens/IncidentsHome';
import { IncidentsList } from './components/screens/IncidentsList';
import { IncidentDetail } from './components/screens/IncidentDetail';
import { IncidentOperator } from './components/screens/IncidentOperator';
import { IncidentSupervisor } from './components/screens/IncidentSupervisor';
import { DetectionLog } from './components/screens/DetectionLog';
import { BoundingBox } from './components/screens/BoundingBox';
import { PlateCorrection } from './components/screens/PlateCorrection';
import { EvidenceTimeline } from './components/screens/EvidenceTimeline';
import { EvidenceConsole } from './components/screens/EvidenceConsole';
import { EvidenceHome } from './components/screens/EvidenceHome';
import { EvidenceExport } from './components/screens/EvidenceExport';
import { EvidenceSync } from './components/screens/EvidenceSync';
import { FootageLibrary } from './components/screens/FootageLibrary';
import { EvidenceLibrary } from './components/screens/EvidenceLibrary';
import { ExplainabilityDAG } from './components/screens/ExplainabilityDAG';
import { ExplainabilityLogs } from './components/screens/ExplainabilityLogs';
import { ExplainabilityHome } from './components/screens/ExplainabilityHome';
import { ExplainabilitySimplified } from './components/screens/ExplainabilitySimplified';
import { AnalyticsHome } from './components/screens/AnalyticsHome';
import { CameraHealth } from './components/screens/CameraHealth';
import { ViolationTrends } from './components/screens/ViolationTrends';
import { CameraRegistry } from './components/screens/CameraRegistry';
import { UserManagement } from './components/screens/UserManagement';
import { CrossCameraTracking } from './components/screens/CrossCameraTracking';
import { DroneFleet } from './components/screens/DroneFleet';
import { DroneMissions } from './components/screens/DroneMissions';
import { DroneAlerts } from './components/screens/DroneAlerts';
import { DroneRegistry } from './components/screens/DroneRegistry';
import { BodycamRegistry } from './components/screens/BodycamRegistry';
import { SystemHealth } from './components/screens/SystemHealth';
import { AIModelManager } from './components/screens/AIModelManager';

// NEW — user type
interface UserSession {
  id: string;
  username: string;
  name: string;
  role: 'operator' | 'supervisor' | 'admin';
}

export default function App() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [gridSize, setGridSize] = useState<'2x2' | '3x3' | '4x4'>('4x4');
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  // handle login from LoginPage
  const handleLogin = (userData: { role: string; username: string; name: string }) => {
    // Convert LoginPage user data to UserSession (generate an id)
    setUser({
      id: userData.username, // Use username as id for now
      username: userData.username,
      name: userData.name,
      role: userData.role as 'operator' | 'supervisor' | 'admin',
    });
  };

  // render screens
  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard userRole={user!.role} />;

      case 'surveillance-grid':
        return <LiveGrid onViewCamera={(camera) => { setSelectedCamera(camera); setActiveScreen('camera-detail'); }} />;

      case 'surveillance-multigrid-2x2':
        return <MultiGrid size="2x2" />;

      case 'surveillance-multigrid-3x3':
        return <MultiGrid size="3x3" />;

      case 'surveillance-multigrid-4x4':
        return <MultiGrid size="4x4" />;

      case 'camera-detail':
        return <CameraDetail camera={selectedCamera} onBack={() => setActiveScreen('surveillance-grid')} />;

      case 'bodycam-grid':
        return <BodycamGrid onViewOfficer={() => setActiveScreen('bodycam-detail')} />;

      case 'bodycam-detail':
        return <BodycamDetail onBack={() => setActiveScreen('bodycam-grid')} />;

      case 'anpr-home':
        return <ANPRHome onNavigate={setActiveScreen} userRole={user!.role} />;

      case 'anpr-list':
        return (
          <ANPRList
            userRole={user!.role}
            onViewDetail={() => setActiveScreen('anpr-detail')}
            onViewApproval={() => setActiveScreen('anpr-approval')}
          />
        );

      case 'anpr-detail':
        return <ANPRDetail onBack={() => setActiveScreen('anpr-list')} />;

      case 'anpr-approval':
        return (
          <ANPRApproval
            onBack={() => setActiveScreen('anpr-list')}
            onNavigate={setActiveScreen}
            userRole={user!.role}
          />
        );

      case 'anpr-operator':
        return <ANPROperator onBack={() => setActiveScreen('anpr-home')} />;

      case 'anpr-supervisor-queue':
        return <ANPRSupervisorQueue onBack={() => setActiveScreen('anpr-home')} />;

      case 'alerts':
        return <Alerts userRole={user!.role} onNavigate={setActiveScreen} />;

      case 'alerts-home':
        return <AlertsHome onNavigate={setActiveScreen} userRole={user!.role} />;

      case 'alerts-operator':
        return (
          <AlertsOperator
            onBack={() => setActiveScreen('alerts-home')}
            onViewCamera={() => setActiveScreen('camera-detail')}
            onCreateIncident={() => setActiveScreen('incidents-list')}
          />
        );

      case 'alerts-supervisor':
        return (
          <AlertsSupervisor
            onBack={() => setActiveScreen('alerts-home')}
            onViewCamera={() => setActiveScreen('camera-detail')}
            onNavigate={setActiveScreen}
          />
        );

      case 'alerts-admin':
        return <AlertsAdmin onBack={() => setActiveScreen('alerts-home')} />;

      case 'sop':
        return <SOPCompliance />;

      case 'incidents-list':
        return <IncidentsList onViewDetail={() => setActiveScreen('incident-detail')} userRole={user!.role} onNavigate={setActiveScreen} />;

      case 'incidents-home':
        return <IncidentsHome onNavigate={setActiveScreen} userRole={user!.role} />;

      case 'incident-operator':
        return <IncidentOperator onBack={() => setActiveScreen('incidents-home')} onNavigate={setActiveScreen} startMode="list" />;

      case 'incident-operator-create':
        return <IncidentOperator onBack={() => setActiveScreen('incidents-home')} onNavigate={setActiveScreen} startMode="create" />;

      case 'incident-supervisor':
        return <IncidentSupervisor onBack={() => setActiveScreen('incidents-home')} onNavigate={setActiveScreen} />;

      case 'incident-detail':
        return <IncidentDetail userRole={user!.role} onBack={() => setActiveScreen('incidents-home')} />;

      case 'detection-log':
        return <DetectionLog onViewBoundingBox={() => setActiveScreen('detection-boundingbox')} onViewCorrection={() => setActiveScreen('plate-correction')} />;

      case 'detection-boundingbox':
        return <BoundingBox onBack={() => setActiveScreen('detection-log')} />;

      case 'plate-correction':
        return <PlateCorrection onBack={() => setActiveScreen('detection-log')} />;

      case 'evidence-home':
        return <EvidenceHome onNavigate={setActiveScreen} userRole={user!.role} />;

      case 'evidence-console':
        return <EvidenceConsole onBack={() => setActiveScreen('evidence-home')} userRole={user!.role} />;

      case 'evidence-export':
        return <EvidenceExport onNavigate={setActiveScreen} />;

      case 'footage-library':
        return <FootageLibrary onNavigate={setActiveScreen} />;

      case 'evidence-library':
        return <EvidenceLibrary onNavigate={setActiveScreen} />;

      case 'evidence-timeline':
        return <EvidenceTimeline onViewSync={() => setActiveScreen('evidence-console')} onNavigate={setActiveScreen} />;

      case 'evidence-sync':
        return <EvidenceSync onBack={() => setActiveScreen('evidence-timeline')} />;

      case 'explainability-home':
        return <ExplainabilityHome onNavigate={setActiveScreen} />;

      case 'explainability-simplified':
        return <ExplainabilitySimplified onBack={() => setActiveScreen('explainability-home')} />;

      case 'explainability-dag':
        return <ExplainabilityDAG onNavigate={setActiveScreen} />;

      case 'explainability-logs':
        return <ExplainabilityLogs onNavigate={setActiveScreen} />;

      case 'analytics-home':
        return <AnalyticsHome onViewCameraHealth={() => setActiveScreen('analytics-camera-health')} onViewViolations={() => setActiveScreen('analytics-violations')} />;

      case 'analytics-camera-health':
        return <CameraHealth onBack={() => setActiveScreen('analytics-home')} />;

      case 'analytics-violations':
        return <ViolationTrends onBack={() => setActiveScreen('analytics-home')} />;

      case 'admin-cameras':
        return <CameraRegistry />;

      case 'admin-users':
        return <UserManagement />;

      case 'cross-camera-tracking':
        return <CrossCameraTracking />;

      case 'drone-fleet':
        return <DroneFleet onNavigate={setActiveScreen} />;

      case 'drone-missions':
        return <DroneMissions onNavigate={setActiveScreen} />;

      case 'drone-alerts':
        return <DroneAlerts onNavigate={setActiveScreen} />;

      case 'admin-drones':
        return <DroneRegistry />;

      case 'admin-bodycams':
        return <BodycamRegistry />;

      case 'admin-system':
        return <SystemHealth />;

      case 'admin-ai-models':
        return <AIModelManager />;

      case 'multi-grid-viewer':
        return <MultiGrid size={gridSize} />;

      default:
        return <Dashboard userRole={user!.role} />;
    }
  };

  // show login screen if not logged in
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#0a0e1a] text-white overflow-hidden">
      <Sidebar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        userRole={user.role}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          activeScreen={activeScreen}
          gridSize={gridSize}
          onGridSizeChange={setGridSize}
          onNavigate={setActiveScreen}
          userRole={user.role}
          username={user.username}
          name={user.name}
          userId={user.id}
          onLogout={() => setUser(null)}
        />

        <main className="flex-1 overflow-auto">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}
