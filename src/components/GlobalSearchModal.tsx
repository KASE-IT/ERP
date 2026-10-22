import React, { useState, useEffect } from 'react';
import { FunctionalModuleId, FUNCTIONAL_MODULES } from '../types/modules';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (modId: FunctionalModuleId, subPageId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        // toggle handled outside or just focus
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Flatten searchable targets
  const allTargets: {
    title: string;
    category: string;
    modId: FunctionalModuleId;
    subPageId?: string;
  }[] = [
    {
      title: 'Home (Blank Workspace Canvas)',
      category: 'Navigation',
      modId: 'home',
    },
  ];

  FUNCTIONAL_MODULES.forEach((mod) => {
    allTargets.push({
      title: mod.name,
      category: 'Functional Module',
      modId: mod.id,
      subPageId: mod.defaultSubPage,
    });
    mod.subPages.forEach((sub) => {
      allTargets.push({
        title: `${mod.shortName} › ${sub.name}`,
        category: sub.section || mod.shortName,
        modId: mod.id,
        subPageId: sub.id,
      });
    });
  });

  const filtered = allTargets.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-start justify-center pt-20 z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-gray-400 shadow-2xl w-full max-w-xl rounded overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#004578] text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold">
          <span>Tell me what you want to do (Quick Search)</span>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-sm">
            ✕
          </button>
        </div>

        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <input
            type="text"
            autoFocus
            placeholder="Search pages, reports, and functional modules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#0078d4]"
          />
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 text-xs">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelect(item.modId, item.subPageId);
                  onClose();
                }}
                className="px-4 py-2.5 hover:bg-blue-50/70 cursor-pointer flex items-center justify-between transition"
              >
                <div>
                  <div className="font-semibold text-gray-800 text-xs">{item.title}</div>
                  <div className="text-[11px] text-gray-500">{item.category}</div>
                </div>
                <span className="text-[11px] text-[#0078d4] font-medium">Open ↗</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-xs">
              No matching pages or functional modules found.
            </div>
          )}
        </div>

        <div className="bg-gray-100 px-4 py-2 text-[11px] text-gray-500 flex justify-between border-t border-gray-200">
          <span>Press ESC to close</span>
          <span>Click to navigate</span>
        </div>
      </div>
    </div>
  );
};
