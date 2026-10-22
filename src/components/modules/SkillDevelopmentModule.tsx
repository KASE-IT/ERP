import React, { useState } from 'react';

interface SkillDevelopmentModuleProps {
  activeSubPage: string;
  onNavigateSubPage: (subPage: string) => void;
  onShowToast: (msg: string) => void;
  userRole?: string;
  userName?: string;
}

export const SkillDevelopmentModule: React.FC<SkillDevelopmentModuleProps> = ({
  activeSubPage,
  onNavigateSubPage,
  onShowToast,
  userRole,
  userName,
}) => {
  const role = userRole?.toLowerCase().includes('assistant')
    ? 'assistant'
    : userRole?.toLowerCase().includes('accreditation')
    ? 'accreditation'
    : userRole?.toLowerCase().includes('coe')
    ? 'coe'
    : 'manager';

  // Schemes
  const [schemes, setSchemes] = useState([
    {
      id: 'CSS-001',
      name: 'PMKVY',
      stream: 'Central',
      fundSource: 'Centrally Sponsored Scheme',
      guidelines: 'PMKVY-guidelines.pdf',
      status: 'Published',
      applyLink: true,
      ledger: '',
    },
    {
      id: 'CSS-002',
      name: 'SANKALP',
      stream: 'Central',
      fundSource: 'Centrally Sponsored Scheme',
      guidelines: 'SANKALP-guidelines.pdf',
      status: 'Published',
      applyLink: true,
      ledger: '',
    },
    {
      id: 'STS-001',
      name: 'State Plan Skill Development Scheme',
      stream: 'State',
      fundSource: 'Plan Fund',
      guidelines: 'State-scheme-guidelines.pdf',
      status: 'Published',
      applyLink: true,
      ledger: 'PLAN-2026',
    },
    {
      id: 'STS-002',
      name: 'SC Development Fund Training',
      stream: 'State',
      fundSource: 'Other Department Fund',
      guidelines: 'SC-development-guidelines.pdf',
      status: 'Published',
      applyLink: true,
      ledger: 'SC-DEV-2026',
    },
  ]);

  // TSP Proposals
  const [proposals, setProposals] = useState([
    {
      id: 'PROP-001',
      scheme: 'PMKVY',
      tsp: 'Keltron',
      category: 'Government',
      district: 'Statewide',
      proposedTarget: 150,
      target: 150,
      level1: 'Verified',
      level2: 'Reviewed',
      status: 'Approved',
      workAward: 'WA-2026-001',
    },
    {
      id: 'PROP-002',
      scheme: 'PMKVY',
      tsp: 'Malabar Digital Skills Foundation',
      category: 'Accredited',
      district: 'Malappuram',
      proposedTarget: 100,
      target: 0,
      level1: 'Verified',
      level2: 'Pending',
      status: 'Level 2 Pending',
      workAward: '',
    },
    {
      id: 'PROP-003',
      scheme: 'State Plan Skill Development Scheme',
      tsp: 'Kerala Technical Learning Centre',
      category: 'Accredited',
      district: 'Kollam',
      proposedTarget: 80,
      target: 80,
      level1: 'Verified',
      level2: 'Reviewed',
      status: 'Approved',
      workAward: 'WA-2026-003',
    },
  ]);

  // Trainers
  const [trainers, setTrainers] = useState([
    {
      id: 'TRN-001',
      tsp: 'Keltron',
      name: 'Anil Kumar',
      trade: 'IT Support',
      totNumber: 'TOT-IT-1044',
      totValidUntil: '2027-06-30',
      status: 'Verified',
    },
    {
      id: 'TRN-002',
      tsp: 'Malabar Digital Skills Foundation',
      name: 'Meera Nair',
      trade: 'Digital Skills',
      totNumber: 'TOT-DS-2210',
      totValidUntil: '2027-01-31',
      status: 'Verified',
    },
    {
      id: 'TRN-003',
      tsp: 'Kerala Technical Learning Centre',
      name: 'Rajesh P',
      trade: 'Construction',
      totNumber: 'TOT-CT-0032',
      totValidUntil: '2026-08-31',
      status: 'Expired',
    },
  ]);

  // Batches
  const [batches, setBatches] = useState([
    {
      id: 'SKB-001',
      name: 'KTL-KLM-01',
      tsp: 'Kerala Technical Learning Centre',
      district: 'Kollam',
      trainer: 'Meera Nair',
      capacity: 25,
      candidates: 22,
      status: 'Active',
    },
    {
      id: 'SKB-002',
      name: 'KEL-IT-01',
      tsp: 'Keltron',
      district: 'Thiruvananthapuram',
      trainer: 'Anil Kumar',
      capacity: 30,
      candidates: 28,
      status: 'Pending Executive Verification',
    },
  ]);

  // DSDC Budgets
  const [dsdcBudgets, setDsdcBudgets] = useState([
    {
      id: 'DSDC-KLM',
      district: 'Kollam',
      source: 'Plan Fund 2026',
      allocated: 1000000,
      utilized: 420000,
      officer: 'District Skill Coordinator – Kollam',
    },
    {
      id: 'DSDC-MPM',
      district: 'Malappuram',
      source: 'Plan Fund 2026',
      allocated: 1200000,
      utilized: 510000,
      officer: 'District Skill Coordinator – Malappuram',
    },
    {
      id: 'DSDC-TVPM',
      district: 'Thiruvananthapuram',
      source: 'SC Development Fund',
      allocated: 800000,
      utilized: 310000,
      officer: 'District Skill Coordinator – Thiruvananthapuram',
    },
  ]);

  const handleApproveProposal = (propId: string) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === propId
          ? {
              ...p,
              status: 'Approved',
              target: p.proposedTarget,
              workAward: `WA-2026-0${Math.floor(10 + Math.random() * 50)}`,
            }
          : p
      )
    );
    onShowToast(`Proposal ${propId} approved; target allocated and Work Award issued`);
  };

  const handleToggleScheme = (schemeId: string) => {
    setSchemes((prev) =>
      prev.map((s) =>
        s.id === schemeId
          ? { ...s, status: s.status === 'Published' ? 'Draft' : 'Published' }
          : s
      )
    );
    onShowToast(`Scheme ${schemeId} publication status toggled`);
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#faf9f8] text-xs select-none">
      {/* Module Sub-Header */}
      <div className="bg-white border-b border-[#d2d0ce] px-4 py-2 flex items-center justify-between shadow-xs shrink-0">
        <div>
          <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Skill Development Division</div>
          <h1 className="text-base font-bold text-gray-800">
            {activeSubPage === 'dashboard'
              ? 'Skill Operations Dashboard'
              : activeSubPage === 'skillSchemes'
              ? 'Centrally Sponsored Schemes (PMKVY & SANKALP)'
              : activeSubPage === 'stateSchemes'
              ? 'State Schemes (Plan Fund & SC Development)'
              : activeSubPage === 'skillProposals'
              ? 'TSP Proposals & Target Allocation'
              : activeSubPage === 'skillTrainers'
              ? 'Trainer & ToT Verification'
              : activeSubPage === 'skillBatches'
              ? 'Batch Formation & Approval'
              : activeSubPage === 'dsdc'
              ? 'DSDC Operations & District Budgets'
              : 'Skill Development Operations'}
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <span className="text-[11px] text-gray-600">
            Signed In: <strong className="text-gray-900">{userName || 'Shri. Anoop R'}</strong> ({userRole || 'Manager (Skill Development)'})
          </span>

          <button
            onClick={() => onShowToast('Exported Skill Division CSV')}
            className="px-2.5 py-1 bg-white hover:bg-gray-50 border border-gray-300 rounded font-medium text-gray-700 flex items-center gap-1 shadow-xs"
          >
            <span>▦</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* VIEW 1: Dashboard */}
        {activeSubPage === 'dashboard' && (
          <div className="space-y-5 max-w-6xl">
            {/* Metric Cues */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div
                onClick={() => onNavigateSubPage('skillSchemes')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#0078d4] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Central Schemes</div>
                <div className="text-2xl font-bold text-[#004578] mt-1">02</div>
                <div className="text-[10px] text-gray-500 mt-0.5">PMKVY & SANKALP</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('stateSchemes')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#107c10] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">State Schemes</div>
                <div className="text-2xl font-bold text-green-700 mt-1">02</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Plan Fund & SC Dev</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('skillProposals')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#d83b01] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Pending Proposals</div>
                <div className="text-2xl font-bold text-[#d83b01] mt-1">01</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Level 2 review pending</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('skillBatches')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#0078d4] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Active Batches</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">01</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Training running</div>
              </div>
            </div>

            {/* Scheme Streams Visual Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                onClick={() => onNavigateSubPage('skillSchemes')}
                className="bg-white border border-gray-300 p-4 rounded-xs shadow-xs hover:border-blue-400 cursor-pointer transition"
              >
                <span className="text-[10px] font-bold text-[#0078d4] uppercase tracking-wider block mb-1">
                  Stream 1
                </span>
                <strong className="text-sm text-gray-900 block mb-1">
                  Centrally Sponsored Schemes
                </strong>
                <p className="text-gray-500 text-[11px]">
                  PMKVY, SANKALP and other central skilling programs with central fund flows.
                </p>
              </div>

              <div
                onClick={() => onNavigateSubPage('stateSchemes')}
                className="bg-white border border-gray-300 p-4 rounded-xs shadow-xs hover:border-blue-400 cursor-pointer transition"
              >
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider block mb-1">
                  Stream 2
                </span>
                <strong className="text-sm text-gray-900 block mb-1">
                  State Government Schemes
                </strong>
                <p className="text-gray-500 text-[11px]">
                  Plan Fund, SC/ST Development Funds, and dedicated state budget appropriations.
                </p>
              </div>

              <div
                onClick={() => onNavigateSubPage('dsdc')}
                className="bg-white border border-gray-300 p-4 rounded-xs shadow-xs hover:border-blue-400 cursor-pointer transition"
              >
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
                  Stream 3
                </span>
                <strong className="text-sm text-gray-900 block mb-1">
                  DSDC District Operations
                </strong>
                <p className="text-gray-500 text-[11px]">
                  District Skill Development Centres, district budget allocations and batch execution.
                </p>
              </div>
            </div>

            {/* Pending Proposals Table */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                <h3 className="text-xs font-bold uppercase text-[#004578]">Submitted TSP Proposals</h3>
                <button
                  onClick={() => onNavigateSubPage('skillProposals')}
                  className="text-[#0078d4] hover:underline text-[11px] font-medium"
                >
                  View All Proposals →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 border-b border-gray-300 font-semibold">
                      <th className="py-2 px-3">Proposal ID</th>
                      <th className="py-2 px-3">Training Service Provider</th>
                      <th className="py-2 px-3">Scheme</th>
                      <th className="py-2 px-3">Category</th>
                      <th className="py-2 px-3">Target</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {proposals.map((p) => (
                      <tr key={p.id} className="hover:bg-blue-50/40">
                        <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{p.id}</td>
                        <td className="py-2 px-3 font-medium text-gray-900">{p.tsp}</td>
                        <td className="py-2 px-3 text-gray-600">{p.scheme}</td>
                        <td className="py-2 px-3 text-gray-700">{p.category}</td>
                        <td className="py-2 px-3 font-semibold text-gray-900">{p.proposedTarget}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                              p.status === 'Approved'
                                ? 'bg-green-100 text-green-800 border-green-300'
                                : 'bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right">
                          {p.status !== 'Approved' && (
                            <button
                              onClick={() => handleApproveProposal(p.id)}
                              className="px-2 py-1 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px]"
                            >
                              Approve & Work Award
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Central Schemes */}
        {activeSubPage === 'skillSchemes' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Skill Development › Central Schemes</div>
                <h1 className="text-lg font-bold text-gray-800">Centrally Sponsored Schemes (CSS)</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Scheme ID</th>
                    <th className="py-2 px-3">Scheme Name</th>
                    <th className="py-2 px-3">Funding Stream</th>
                    <th className="py-2 px-3">Guidelines Document</th>
                    <th className="py-2 px-3">Application Link</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schemes
                    .filter((s) => s.stream === 'Central')
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-blue-50/40">
                        <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{s.id}</td>
                        <td className="py-2 px-3 font-medium text-gray-900">{s.name}</td>
                        <td className="py-2 px-3 text-gray-600">{s.fundSource}</td>
                        <td className="py-2 px-3 font-mono text-gray-600">{s.guidelines}</td>
                        <td className="py-2 px-3 text-gray-700">{s.applyLink ? 'Active' : 'Disabled'}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-800 border border-green-300">
                            {s.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => handleToggleScheme(s.id)}
                            className="text-[#0078d4] hover:underline font-medium text-[11px]"
                          >
                            Toggle Publish
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: State Schemes */}
        {activeSubPage === 'stateSchemes' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Skill Development › State Schemes</div>
                <h1 className="text-lg font-bold text-gray-800">State Plan & Departmental Schemes</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Scheme ID</th>
                    <th className="py-2 px-3">Scheme Name</th>
                    <th className="py-2 px-3">Funding Stream</th>
                    <th className="py-2 px-3">Mapped FICO Ledger</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schemes
                    .filter((s) => s.stream === 'State')
                    .map((s) => (
                      <tr key={s.id} className="hover:bg-blue-50/40">
                        <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{s.id}</td>
                        <td className="py-2 px-3 font-medium text-gray-900">{s.name}</td>
                        <td className="py-2 px-3 text-gray-600">{s.fundSource}</td>
                        <td className="py-2 px-3 font-mono font-semibold text-blue-900">{s.ledger}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-800 border border-green-300">
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 4: Trainers */}
        {activeSubPage === 'skillTrainers' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Skill Development › Trainers</div>
                <h1 className="text-lg font-bold text-gray-800">Trainer & Training of Trainers (ToT) Register</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Trainer ID</th>
                    <th className="py-2 px-3">TSP Organization</th>
                    <th className="py-2 px-3">Trainer Name</th>
                    <th className="py-2 px-3">Trade</th>
                    <th className="py-2 px-3">ToT Certificate No</th>
                    <th className="py-2 px-3">Valid Until</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {trainers.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{t.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{t.tsp}</td>
                      <td className="py-2 px-3 text-gray-800">{t.name}</td>
                      <td className="py-2 px-3 text-gray-700">{t.trade}</td>
                      <td className="py-2 px-3 font-mono text-gray-600">{t.totNumber}</td>
                      <td className="py-2 px-3 text-gray-700">{t.totValidUntil}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            t.status === 'Verified'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-red-100 text-red-800 border-red-300'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 5: DSDC District Budgets */}
        {activeSubPage === 'dsdc' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Skill Development › DSDC</div>
                <h1 className="text-lg font-bold text-gray-800">District Skill Development Centre Budgets</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Budget Ref</th>
                    <th className="py-2 px-3">District</th>
                    <th className="py-2 px-3">Budget Source</th>
                    <th className="py-2 px-3">Allocated (₹)</th>
                    <th className="py-2 px-3">Utilized (₹)</th>
                    <th className="py-2 px-3">Available Balance (₹)</th>
                    <th className="py-2 px-3">Designated Officer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dsdcBudgets.map((b) => (
                    <tr key={b.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{b.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{b.district}</td>
                      <td className="py-2 px-3 text-gray-700">{b.source}</td>
                      <td className="py-2 px-3 text-gray-900 font-semibold">
                        Rs. {b.allocated.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-gray-700">Rs. {b.utilized.toLocaleString()}</td>
                      <td className="py-2 px-3 text-green-700 font-bold">
                        Rs. {(b.allocated - b.utilized).toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-gray-600">{b.officer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Fallback */}
        {!['dashboard', 'skillSchemes', 'stateSchemes', 'skillProposals', 'skillTrainers', 'dsdc'].includes(activeSubPage) && (
          <div className="bg-white border border-gray-300 p-6 rounded-xs shadow-xs text-center">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Skill Development Section: {activeSubPage.toUpperCase()}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              All master records and workflows are active and accessible via module navigation.
            </p>
            <button
              onClick={() => onNavigateSubPage('dashboard')}
              className="px-3.5 py-1.5 bg-[#0078d4] text-white rounded text-xs font-medium"
            >
              Return to Skill Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
