import React from 'react';
import { FunctionalModuleId, FUNCTIONAL_MODULES } from '../types/modules';

interface NavSidebarProps {
  activeModule: FunctionalModuleId;
  activeSubPage: string;
  isLoggedIn: boolean;
  onSelectModule: (mod: FunctionalModuleId) => void;
  onSelectSubPage: (subPageId: string) => void;
  onGoHome: () => void;
}

export const NavSidebar: React.FC<NavSidebarProps> = ({
  activeModule,
  activeSubPage,
  isLoggedIn,
  onSelectModule,
  onSelectSubPage,
  onGoHome,
}) => {
  const currentMod = FUNCTIONAL_MODULES.find((m) => m.id === activeModule);

  // Group sub-pages by section for the logged-in module view
  const sections: { title: string; items: { id: string; name: string }[] }[] = [];
  if (currentMod) {
    currentMod.subPages.forEach((sub) => {
      const sectionName = sub.section || currentMod.name;
      let sec = sections.find((s) => s.title === sectionName);
      if (!sec) {
        sec = { title: sectionName, items: [] };
        sections.push(sec);
      }
      sec.items.push({ id: sub.id, name: sub.name });
    });
  }

  // 1. If ON HOME (or module clicked but not yet logged in):
  // Show the Functional Modules List (Image 1)
  if (activeModule === 'home' || !isLoggedIn || !currentMod) {
    return (
      <aside className="w-60 bg-[#f3f2f1] border-r border-[#d2d0ce] flex flex-col justify-between text-xs select-none shrink-0 h-[calc(100vh-52px)] overflow-hidden">
        <div className="flex-1 overflow-y-auto py-2">
          {/* Home Button */}
          <div className="px-2 mb-2">
            <button
              onClick={onGoHome}
              className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xs transition text-xs ${
                activeModule === 'home'
                  ? 'bg-white border-l-4 border-[#0078d4] font-semibold text-[#004578] shadow-xs'
                  : 'text-gray-700 hover:bg-[#e8e6e4]'
              }`}
            >
              <span className="font-semibold text-gray-800">Home</span>
            </button>
          </div>

          {/* Section Header */}
          <div className="px-3.5 py-1 text-[11px] font-bold uppercase text-gray-600 tracking-wider border-t border-gray-300/60 pt-2.5 mb-1">
            FUNCTIONAL MODULES
          </div>

          {/* Functional Modules List */}
          <div className="space-y-1 px-2">
            {FUNCTIONAL_MODULES.map((mod) => {
              const isSelected = activeModule === mod.id;

              return (
                <button
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xs transition ${
                    isSelected
                      ? 'bg-white border-l-4 border-[#0078d4] font-semibold text-[#004578] shadow-xs'
                      : 'text-gray-800 hover:bg-[#e8e6e4]'
                  }`}
                >
                  <span className="truncate font-medium text-xs text-gray-900">
                    {mod.name}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#0078d4] shrink-0"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#d2d0ce] bg-[#ebe9e7] px-3 py-2 shrink-0 text-[11px] text-gray-500 flex items-center justify-between">
          <span>KASE ERP Portal</span>
          <span>FY 2026-27</span>
        </div>
      </aside>
    );
  }

  // 2. When LOGGED IN to a module:
  // Show the parts/menu associated with this module (Image 2)
  return (
    <aside className="w-60 bg-[#f3f2f1] border-r border-[#d2d0ce] flex flex-col justify-between text-xs select-none shrink-0 h-[calc(100vh-52px)] overflow-hidden">
      <div className="flex-1 overflow-y-auto py-2">
        {/* Back to Home / Functional Modules */}
        <div className="px-2 mb-2 pb-2 border-b border-gray-300">
          <button
            onClick={onGoHome}
            className="w-full text-left flex items-center space-x-2 px-2.5 py-1.5 rounded-xs text-gray-700 hover:bg-[#e8e6e4] transition text-xs font-semibold"
            title="Return to Functional Modules home page"
          >
            <span className="text-[#0078d4] font-bold">←</span>
            <span>Home (All Modules)</span>
          </button>
        </div>

        {/* Module Sub-pages by Section (Matching user Image 2 layout) */}
        <div className="space-y-3 px-2">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-0.5">
              <div className="px-2 py-1 text-[11px] font-bold uppercase text-gray-600 tracking-wider">
                {sec.title}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = activeSubPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectSubPage(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xs transition text-xs ${
                        isActive
                          ? 'bg-white border-l-4 border-[#0078d4] font-bold text-[#004578] shadow-xs'
                          : 'text-gray-800 hover:bg-[#e8e6e4]'
                      }`}
                    >
                      <span className="truncate block">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Active Module Indicator */}
      <div className="border-t border-[#d2d0ce] bg-[#ebe9e7] px-3 py-2 shrink-0 text-[11px] text-gray-600 flex items-center justify-between">
        <span className="font-semibold truncate">{currentMod.shortName}</span>
        <span className="text-green-700 font-bold">● Active</span>
      </div>
    </aside>
  );
};
