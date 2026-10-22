import React from 'react';
import { FunctionalModuleId, FUNCTIONAL_MODULES } from '../types/modules';
import { UserSession } from './ModuleLogin';

interface NavHeaderProps {
  activeModule: FunctionalModuleId;
  activeSubPage: string;
  currentSession: UserSession | null;
  onSelectModule: (mod: FunctionalModuleId, subPage?: string) => void;
  onOpenSearch: () => void;
  onSignOut: () => void;
}

export const NavHeader: React.FC<NavHeaderProps> = ({
  activeModule,
  activeSubPage,
  currentSession,
  onSelectModule,
  onOpenSearch,
  onSignOut,
}) => {
  const currentMod = FUNCTIONAL_MODULES.find((m) => m.id === activeModule);
  const currentSubPageObj = currentMod?.subPages.find((s) => s.id === activeSubPage);

  return (
    <header className="bg-[#004578] text-white h-13 px-4 flex items-center justify-between shadow-sm z-30 select-none shrink-0 border-b border-[#003861]">
      {/* Brand & Module Indicator */}
      <div className="flex items-center space-x-3">
        {/* KASE Logo / Emblem */}
        <button
          onClick={() => onSelectModule('home')}
          className="flex items-center space-x-2 text-left group focus:outline-none"
          title="Return to Home (Blank Workspace)"
        >
          {/* KASE Official Logo */}
          <img
            src="https://drive.google.com/thumbnail?id=1ZPt4G_Eb2YvHfqR7PO3zg4dulEMZB0ym&sz=w200"
            alt="KASE Logo"
            className="h-9 w-auto bg-white px-1.5 py-0.5 rounded-xs object-contain shrink-0"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallback) {
                target.dataset.fallback = 'true';
                target.src = 'https://drive.google.com/uc?export=view&id=1ZPt4G_Eb2YvHfqR7PO3zg4dulEMZB0ym';
              }
            }}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-wide leading-none flex items-center gap-1.5">
              <span>KASE ERP</span>
              <span className="text-blue-300 font-normal">|</span>
              <span className="text-blue-100 font-medium text-xs">
                {activeModule === 'home' ? 'Portal' : currentMod?.name}
              </span>
            </span>
            {activeModule !== 'home' && currentSubPageObj && (
              <span className="text-[11px] text-blue-200/90 leading-tight">
                {currentSubPageObj.name}
              </span>
            )}
          </div>
        </button>

        {/* Home Reset Quick Button */}
        <button
          onClick={() => onSelectModule('home')}
          className={`text-xs px-2.5 py-1 rounded border transition flex items-center gap-1 ml-2 ${
            activeModule === 'home'
              ? 'bg-blue-700/80 border-blue-400 text-white font-medium'
              : 'bg-[#003861] border-blue-400/40 text-blue-200 hover:text-white hover:bg-blue-700/50'
          }`}
          title="Go to Home"
        >
          <span>⌂</span>
          <span>Home</span>
        </button>
      </div>

      {/* Global Command Search & User Credentials */}
      <div className="flex items-center space-x-3 text-xs">
        {/* 'Tell me what you want to do' search box */}
        <div className="relative">
          <input
            type="text"
            readOnly
            onClick={onOpenSearch}
            placeholder="Tell me what you want to do… (Ctrl+F)"
            className="w-56 md:w-64 bg-white/95 text-gray-800 placeholder-gray-500 rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 cursor-pointer shadow-inner"
          />
          <span className="absolute right-2 top-1 text-gray-400 text-[10px] pointer-events-none">
            🔍
          </span>
        </div>

        {/* Fiscal Year Badge */}
        <span className="hidden sm:inline-block bg-[#106ebe] px-2.5 py-0.5 rounded border border-blue-400/30 font-medium text-[11px]">
          FY 2026-27
        </span>

        {/* User Session Profile & Sign Out */}
        {currentSession ? (
          <div className="flex items-center space-x-2 pl-2 border-l border-blue-400/30">
            <div className="w-7 h-7 rounded-full bg-blue-200 text-[#004578] font-bold flex items-center justify-center text-xs shadow-xs">
              {currentSession.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden lg:flex flex-col text-left text-[11px] leading-tight">
              <span className="font-semibold text-white">
                {currentSession.name}
              </span>
              <span className="text-blue-200/80 text-[10px]">
                {currentSession.role} ({currentSession.username})
              </span>
            </div>
            <button
              onClick={onSignOut}
              className="ml-1 text-[11px] bg-transparent hover:bg-white/10 text-white border border-blue-300/80 px-2.5 py-0.5 rounded font-medium transition cursor-pointer"
              title="Sign out of this module"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="text-[11px] text-blue-200 pl-2 border-l border-blue-400/30">
            {activeModule === 'home' ? 'Not signed in' : 'Authentication Required'}
          </div>
        )}
      </div>
    </header>
  );
};
