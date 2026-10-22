import React, { useState } from 'react';
import { FunctionalModuleId, FUNCTIONAL_MODULES } from './types/modules';
import { NavHeader } from './components/NavHeader';
import { NavSidebar } from './components/NavSidebar';
import { PortalHomeWorkspace } from './components/PortalHomeWorkspace';
import { ModuleLogin, UserSession } from './components/ModuleLogin';
import { ESSModule } from './components/modules/ESSModule';
import { HRModule } from './components/modules/HRModule';
import { ITModule } from './components/modules/ITModule';
import { PlacementsModule } from './components/modules/PlacementsModule';
import { SkillDevelopmentModule } from './components/modules/SkillDevelopmentModule';
import { ProjectsModule } from './components/modules/ProjectsModule';
import { AdminModule } from './components/modules/AdminModule';
import { GlobalSearchModal } from './components/GlobalSearchModal';

export default function App() {
  // Navigation states: starts on 'home' with blank right workspace
  const [activeModule, setActiveModule] = useState<FunctionalModuleId>('home');
  const [activeSubPage, setActiveSubPage] = useState<string>('profile');

  // Authenticated sessions per module
  const [sessions, setSessions] = useState<Partial<Record<FunctionalModuleId, UserSession>>>({});

  // Module currently pending login
  const [pendingLoginModule, setPendingLoginModule] = useState<FunctionalModuleId | null>(null);

  // Global search modal
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const handleSelectModule = (modId: FunctionalModuleId, subPageId?: string) => {
    if (modId === 'home') {
      setActiveModule('home');
      setPendingLoginModule(null);
      return;
    }

    // Check if user is logged into this module
    if (!sessions[modId]) {
      // Show login page for this module
      setPendingLoginModule(modId);
      setActiveModule(modId);
    } else {
      // Already logged in
      setPendingLoginModule(null);
      setActiveModule(modId);
      if (subPageId) {
        setActiveSubPage(subPageId);
      } else {
        const def = FUNCTIONAL_MODULES.find((m) => m.id === modId);
        if (def) setActiveSubPage(def.defaultSubPage);
      }
    }
  };

  const handleLoginSuccess = (session: UserSession) => {
    setSessions((prev) => ({ ...prev, [session.moduleId]: session }));
    setPendingLoginModule(null);
    setActiveModule(session.moduleId);
    const def = FUNCTIONAL_MODULES.find((m) => m.id === session.moduleId);
    if (def) setActiveSubPage(def.defaultSubPage);
    showToast(`Signed in successfully as ${session.name} (${session.role})`);
  };

  const handleSignOut = () => {
    if (activeModule !== 'home') {
      const updated = { ...sessions };
      delete updated[activeModule];
      setSessions(updated);
      showToast('Signed out of module');
    }
    setActiveModule('home');
    setPendingLoginModule(null);
  };

  const currentSession = activeModule !== 'home' ? sessions[activeModule] || null : null;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#f3f2f1] text-[#201f1e] select-none font-sans">
      {/* 1. Top ERP Application Header */}
      <NavHeader
        activeModule={activeModule}
        activeSubPage={activeSubPage}
        currentSession={currentSession}
        onSelectModule={handleSelectModule}
        onOpenSearch={() => setSearchModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* 2. Main ERP Body (Left Navigation Pane + Right Workspace) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Pane (Shows Functional Modules on Home/unauthenticated; switches to module parts when logged in) */}
        <NavSidebar
          activeModule={activeModule}
          activeSubPage={activeSubPage}
          isLoggedIn={Boolean(activeModule !== 'home' && sessions[activeModule] && !pendingLoginModule)}
          onSelectModule={handleSelectModule}
          onSelectSubPage={(sub) => setActiveSubPage(sub)}
          onGoHome={() => handleSelectModule('home')}
        />

        {/* Right Workspace: Shows Portal News & Developments Feed on home, or login page, or module */}
        <div className="flex-1 overflow-hidden flex flex-col bg-[#faf9f8]">
          {activeModule === 'home' && <PortalHomeWorkspace />}

          {/* Module Login Page if not authenticated into selected module */}
          {activeModule !== 'home' && (!sessions[activeModule] || pendingLoginModule === activeModule) && (
            <ModuleLogin
              moduleId={activeModule}
              onSuccess={handleLoginSuccess}
              onCancel={() => {
                setActiveModule('home');
                setPendingLoginModule(null);
              }}
            />
          )}

          {/* Authenticated Functional Modules */}
          {activeModule === 'ess' && sessions.ess && !pendingLoginModule && (
            <ESSModule
              activeSubPage={activeSubPage}
              onNavigateSubPage={(sub) => setActiveSubPage(sub)}
              onShowToast={showToast}
              userRole={sessions.ess.role}
              userName={sessions.ess.name}
            />
          )}

          {activeModule === 'hr' && sessions.hr && !pendingLoginModule && (
            <HRModule
              activeSubPage={activeSubPage}
              onNavigateSubPage={(sub) => setActiveSubPage(sub)}
              onShowToast={showToast}
              userRole={sessions.hr.role}
              userName={sessions.hr.name}
            />
          )}

          {activeModule === 'it' && sessions.it && !pendingLoginModule && (
            <ITModule
              activeSubPage={activeSubPage}
              onNavigateSubPage={(sub) => setActiveSubPage(sub)}
              onShowToast={showToast}
              userRole={sessions.it.role}
              userName={sessions.it.name}
            />
          )}

          {activeModule === 'placements' && sessions.placements && !pendingLoginModule && (
            <PlacementsModule
              activeSubPage={activeSubPage}
              onNavigateSubPage={(sub) => setActiveSubPage(sub)}
              onShowToast={showToast}
              userRole={sessions.placements.role}
              userName={sessions.placements.name}
            />
          )}

          {activeModule === 'skill_development' && sessions.skill_development && !pendingLoginModule && (
            <SkillDevelopmentModule
              activeSubPage={activeSubPage}
              onNavigateSubPage={(sub) => setActiveSubPage(sub)}
              onShowToast={showToast}
              userRole={sessions.skill_development.role}
              userName={sessions.skill_development.name}
            />
          )}

          {activeModule === 'projects' && sessions.projects && !pendingLoginModule && (
            <ProjectsModule
              activeSubPage={activeSubPage}
              onNavigateSubPage={(sub) => setActiveSubPage(sub)}
              onShowToast={showToast}
              userRole={sessions.projects.role}
              userName={sessions.projects.name}
            />
          )}

          {activeModule === 'admin' && sessions.admin && !pendingLoginModule && (
            <AdminModule
              activeSubPage={activeSubPage}
              onNavigateSubPage={(sub) => setActiveSubPage(sub)}
              onShowToast={showToast}
              userRole={sessions.admin.role}
              userName={sessions.admin.name}
            />
          )}
        </div>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed right-4 bottom-4 z-50 bg-[#dff6dd] text-[#0b6a0b] border border-[#107c10] px-4 py-2.5 rounded shadow-lg text-xs font-medium flex items-center space-x-2">
          <span>✔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quick Command Search */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelect={handleSelectModule}
      />
    </div>
  );
}
