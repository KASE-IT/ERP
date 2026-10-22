import React, { useState } from 'react';
import { FunctionalModuleId, FUNCTIONAL_MODULES } from '../types/modules';

export interface UserSession {
  username: string;
  name: string;
  role: string;
  moduleId: FunctionalModuleId;
}

interface ModuleLoginProps {
  moduleId: FunctionalModuleId;
  onSuccess: (session: UserSession) => void;
  onCancel: () => void;
}

interface AccountDef {
  username: string;
  name: string;
  role: string;
  defaultPass: string;
}

const MODULE_ACCOUNTS: Record<FunctionalModuleId, AccountDef[]> = {
  home: [],
  ess: [
    {
      username: 'EMP-KASE-2116',
      name: 'Harikrishnan M.',
      role: 'Executive (Operations & IT)',
      defaultPass: 'Demo@123',
    },
  ],
  hr: [
    {
      username: 'reshmi.mb',
      name: 'Smt. Reshmi M B',
      role: 'HR Manager',
      defaultPass: 'Demo@123',
    },
    {
      username: 'abhilash.aj',
      name: 'Shri. Abhilash A J',
      role: 'HR Executive',
      defaultPass: 'Demo@123',
    },
  ],
  it: [
    {
      username: 'subin.das',
      name: 'Shri. Subin Das S',
      role: 'Manager IT',
      defaultPass: 'Demo@123',
    },
    {
      username: 'harikrishnan.m',
      name: 'Shri. Harikrishnan M',
      role: 'IT Executive',
      defaultPass: 'Demo@123',
    },
  ],
  placements: [
    {
      username: 'manager',
      name: 'Smt. Reshmi M B',
      role: 'Manager (Placements)',
      defaultPass: 'Demo@123',
    },
    {
      username: 'executive.placements',
      name: 'Shri. Amaljith A R',
      role: 'Executive (Placements)',
      defaultPass: 'Demo@123',
    },
  ],
  skill_development: [
    {
      username: 'manager',
      name: 'Shri. Anoop R',
      role: 'Manager (Skill Development)',
      defaultPass: 'Demo@123',
    },
    {
      username: 'assistant',
      name: 'Smt. R K Lakshmi Priya',
      role: 'Assistant Manager',
      defaultPass: 'Demo@123',
    },
  ],
  projects: [
    {
      username: 'manager',
      name: 'Smt. Smitha C',
      role: 'Manager in Charge (Projects)',
      defaultPass: 'Demo@123',
    },
    {
      username: 'assistant',
      name: 'Shri. Sivadutt S',
      role: 'Project Manager (Civil)',
      defaultPass: 'Demo@123',
    },
    {
      username: 'executive.accreditation',
      name: 'Shri. Anandhu Krishnan K S',
      role: 'Executive (Accreditation)',
      defaultPass: 'Demo@123',
    },
    {
      username: 'executive.coe',
      name: 'Shri. Ahmed Surjith',
      role: 'Executive (CoE)',
      defaultPass: 'Demo@123',
    },
  ],
  admin: [
    {
      username: 'admin.exec',
      name: 'Administration Executive',
      role: 'Admin Executive',
      defaultPass: 'Demo@123',
    },
    {
      username: 'admin.manager',
      name: 'Administration Manager',
      role: 'Admin Manager',
      defaultPass: 'Demo@123',
    },
  ],
};

export const ModuleLogin: React.FC<ModuleLoginProps> = ({
  moduleId,
  onSuccess,
  onCancel,
}) => {
  const currentMod = FUNCTIONAL_MODULES.find((m) => m.id === moduleId);
  const accounts = MODULE_ACCOUNTS[moduleId] || [];

  const [username, setUsername] = useState(accounts[0]?.username || '');
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState('');

  const handleSelectAccount = (acc: AccountDef) => {
    setUsername(acc.username);
    setPassword(acc.defaultPass);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const matched = accounts.find(
      (a) => a.username.toLowerCase() === cleanUser
    );

    if (matched) {
      onSuccess({
        username: matched.username,
        name: matched.name,
        role: matched.role,
        moduleId,
      });
    } else if (cleanUser) {
      onSuccess({
        username: username.trim(),
        name: username.trim(),
        role: 'Authorized User',
        moduleId,
      });
    } else {
      setError('Please enter your user name.');
    }
  };

  return (
    <div className="flex-1 h-full flex items-center justify-center p-6 bg-[#f3f2f1] select-none">
      <div className="bg-white border border-[#8a8886] shadow-xl w-full max-w-[460px] rounded-xs overflow-hidden">
        {/* Header */}
        <div className="bg-[#004578] text-white px-5 py-3 font-semibold text-sm flex items-center justify-between">
          <span>Sign in – KASE ERP · {currentMod?.name}</span>
          <button
            onClick={onCancel}
            className="text-white hover:text-gray-300 text-sm font-bold focus:outline-none"
            title="Cancel"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <p className="text-gray-600 mb-1">
            Enter your user name and password to access the {currentMod?.shortName}.
          </p>

          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-xs">
              User Name
            </label>
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="w-full border border-[#8a8886] px-3 py-2 bg-white rounded-xs focus:outline-none focus:border-[#0078d4] text-xs font-mono"
              placeholder="e.g. username"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-xs">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#8a8886] px-3 py-2 bg-white rounded-xs focus:outline-none focus:border-[#0078d4] text-xs"
              placeholder="Enter password (Demo@123)"
            />
          </div>

          {error && (
            <div className="text-red-700 font-medium text-xs bg-red-50 p-2 rounded border border-red-200">
              {error}
            </div>
          )}

          {/* Quick select demo accounts */}
          {accounts.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] text-gray-500 block mb-1">
                Demo Accounts for {currentMod?.shortName}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {accounts.map((acc) => (
                  <button
                    key={acc.username}
                    type="button"
                    onClick={() => handleSelectAccount(acc)}
                    className="text-[11px] bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded cursor-pointer transition font-mono"
                  >
                    {acc.username} ({acc.role})
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-medium rounded-xs shadow-xs"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
