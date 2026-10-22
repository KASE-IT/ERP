import React, { useState } from 'react';

interface ITModuleProps {
  activeSubPage: string;
  onNavigateSubPage: (subPage: string) => void;
  onShowToast: (msg: string) => void;
  userRole?: string;
  userName?: string;
}

export const ITModule: React.FC<ITModuleProps> = ({
  activeSubPage,
  onNavigateSubPage,
  onShowToast,
  userRole,
  userName,
}) => {
  // Role: 'm' (Manager IT) or 'x' (IT Executive) based on logged in user
  const currentRole = userRole?.toLowerCase().includes('executive') ? 'x' : 'm';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  // Asset register
  const [assets, setAssets] = useState([
    {
      id: 'KASE-IT-0412',
      nm: 'Dell Latitude 5440 Notebook',
      ct: 'Managed Laptop',
      sn: 'DL5440-9821X',
      emp: 'Shri. Harikrishnan M (EMP-KASE-0142)',
      dp: 'Operations, Strategy & IT',
      amc: 'AMC Active',
      st: 'Assigned',
    },
    {
      id: 'KASE-IT-0413',
      nm: 'Dell Latitude 5440 Notebook',
      ct: 'Managed Laptop',
      sn: 'DL5440-9801A',
      emp: 'Dr. Vinutha H M (EMP-KASE-0123)',
      dp: 'Curriculum Development',
      amc: 'AMC Active',
      st: 'Assigned',
    },
    {
      id: 'KASE-IT-0414',
      nm: 'HP EliteBook 640 G10 Notebook',
      ct: 'Managed Laptop',
      sn: 'HP640-7710B',
      emp: 'Smt. Reshmi M B (EMP-KASE-0125)',
      dp: 'HR and Placements',
      amc: 'AMC Expiring Soon',
      st: 'Assigned',
    },
    {
      id: 'KASE-IT-0415',
      nm: 'HP EliteBook 640 G10 Notebook',
      ct: 'Managed Laptop',
      sn: 'HP640-7741K',
      emp: 'Smt. Nandana M (EMP-KASE-0144)',
      dp: 'CSS',
      amc: 'AMC Expiring Soon',
      st: 'Under Repair',
    },
    {
      id: 'KASE-IT-0416',
      nm: 'OptiPlex 7010 Desktop Portal',
      ct: 'Desktop Portal',
      sn: 'OP7010-3319M',
      emp: 'Shri. Midhun M (EMP-KASE-0134)',
      dp: 'Accounts',
      amc: 'AMC Active',
      st: 'Assigned',
    },
    {
      id: 'KASE-IT-0420',
      nm: 'ThinkPad L14 Gen 4 Managed Laptop',
      ct: 'Managed Laptop',
      sn: 'LNV-L14-8835R',
      emp: '— Unassigned (In Stock) —',
      dp: 'IT Stock Room',
      amc: 'Under Warranty',
      st: 'In Stock',
    },
  ]);

  // Helpdesk tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-2026-041',
      emp: 'Smt. Nandana M',
      ast: 'KASE-IT-0415 (HP640-7741K)',
      sb: 'Laptop battery swelling & sudden shutdown',
      pr: 'Urgent',
      as: 'Shri. Harikrishnan M',
      st: 'In Progress',
    },
    {
      id: 'TKT-2026-042',
      emp: 'Shri. Midhun M',
      ast: 'KASE-IT-0416 (OP7010-3319M)',
      sb: 'FICO virtual account connector timeout on Desktop',
      pr: 'High',
      as: 'Shri. Harikrishnan M',
      st: 'Require More Information',
    },
    {
      id: 'TKT-2026-043',
      emp: 'Smt. Malavika S',
      ast: 'KASE-IT-0417 (LGT-MX-5520P)',
      sb: 'Wireless mouse receiver intermittent lag',
      pr: 'Low',
      as: 'Shri. Harikrishnan M',
      st: 'Open',
    },
    {
      id: 'TKT-2026-039',
      emp: 'Shri. Sidharth Sajan',
      ast: 'None – Portal / Access Only',
      sb: 'eOffice Digital Signature (DSC) Java signer error',
      pr: 'Medium',
      as: 'Shri. Harikrishnan M',
      st: 'Resolved',
    },
  ]);

  // Procurements
  const [procurements, setProcurements] = useState([
    {
      id: 'PR-IT-2026-014',
      ti: 'Procurement of 10 Managed Laptops for District Skill Coordinators',
      bh: 'IT-CAPEX-2026',
      l1: 'Keltron IT Division',
      am: '6,45,000',
      eo: '—',
      st: 'Delivered & Invoice Uploaded',
    },
    {
      id: 'PR-IT-2026-013',
      ti: 'HQ Dedicated Internet Leased Line & Firewall Upgrade',
      bh: 'IT-NET-2026',
      l1: 'BSNL Enterprise Broadband',
      am: '2,28,000',
      eo: 'KASE/IT/2026/119',
      st: 'eOffice Sanctioned',
    },
    {
      id: 'PR-IT-2026-015',
      ti: 'Biometric & Smart Card Readers for Exam Centres',
      bh: 'IT-CAPEX-2026',
      l1: 'SecureID Systems',
      am: '1,68,000',
      eo: '—',
      st: 'L1 Evaluated',
    },
  ]);

  // AMC Contracts
  const [amcs, setAmcs] = useState([
    {
      id: 'AMC-2026-007',
      sc: 'HP EliteBook & Dell Notebook Fleet (41 Units)',
      vn: 'Keltron IT Division',
      ex: '04-Nov-2026',
      al: 'Alert Triggered (< 30 days)',
      am: '1,14,000',
      st: 'Expiring Soon (Alert)',
    },
    {
      id: 'AMC-2026-008',
      sc: 'HQ Server Room APC 3kVA Online UPS & Battery Bank',
      vn: 'PowerGrid Solutions Kerala',
      ex: '31-Oct-2026',
      al: 'Alert Triggered (< 30 days)',
      am: '36,500',
      st: 'WCC & Invoice Verified',
    },
    {
      id: 'AMC-2026-005',
      sc: 'OptiPlex Desktop Portals & Printers Comprehensive AMC',
      vn: 'TechnoSource India Pvt Ltd',
      ex: '09-Mar-2027',
      al: 'Normal (> 60 days)',
      am: '1,92,000',
      st: 'Active',
    },
  ]);

  // Action handlers
  const handleMapAssetToEmployee = (assetId: string) => {
    setAssets((prev) =>
      prev.map((a) =>
        a.id === assetId
          ? {
              ...a,
              st: 'Assigned',
              emp: 'Shri. Moses Thikko R (EMP-KASE-0155)',
              dp: 'District Skill Coordinator',
            }
          : a
      )
    );
    onShowToast(`Asset ${assetId} mapped to employee and dynamically synced to ESS portal`);
  };

  const handleReturnToStock = (assetId: string) => {
    setAssets((prev) =>
      prev.map((a) =>
        a.id === assetId
          ? {
              ...a,
              st: 'In Stock',
              emp: '— Unassigned (In Stock) —',
              dp: 'IT Stock Room',
            }
          : a
      )
    );
    onShowToast(`Asset ${assetId} unmapped from employee and returned to IT Stock Room`);
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, st: 'Resolved' } : t))
    );
    onShowToast(`Ticket ${ticketId} resolved and logged to chronological device repair history`);
  };

  const handlePushProcurementToFICO = (procId: string) => {
    setProcurements((prev) =>
      prev.map((p) => (p.id === procId ? { ...p, st: 'Disbursed via FICO' } : p))
    );
    onShowToast(`Procurement invoice for ${procId} verified and pushed to FICO virtual payout account`);
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#faf9f8] text-xs select-none">
      {/* Command Ribbon */}
      <div className="bg-[#faf9f8] border-b border-[#d2d0ce] px-3 py-1 shadow-xs shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-[#0078d4] border-b-2 border-[#0078d4] pb-0.5 px-1 uppercase tracking-wider">
              HOME
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-[11px] text-gray-700 font-medium">
              Signed In: <strong className="text-gray-900">{userName || (currentRole === 'm' ? 'Shri. Subin Das S' : 'Shri. Harikrishnan M')}</strong> ({userRole || (currentRole === 'm' ? 'Manager IT' : 'IT Executive')})
            </span>
          </div>
        </div>

        {/* Ribbon Actions */}
        <div className="flex flex-wrap gap-2 items-center text-xs pt-1">
          <div className="flex space-x-1 border-r border-gray-300 pr-2">
            <button
              onClick={() => onShowToast('New asset / ticket card initialized')}
              className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center space-x-1"
            >
              <span className="text-green-700 font-bold">＋</span>
              <span>New</span>
            </button>
            <button
              onClick={() => onShowToast('Editing selected IT record')}
              className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center space-x-1"
            >
              <span className="text-[#0078d4]">✎</span>
              <span>Edit</span>
            </button>
          </div>

          <div className="flex space-x-1 border-r border-gray-300 pr-2">
            <button
              onClick={() => onShowToast('AMC scan complete – 2 contracts expiring within 30 days flagged to Manager IT')}
              className="px-2 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded text-[#004578] font-medium flex items-center space-x-1"
            >
              <span>▶</span>
              <span>Run AMC Expiry Scan</span>
            </button>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => onShowToast('Exported IT Division records to Excel')}
              className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center space-x-1"
            >
              <span className="text-emerald-700 font-bold">▦</span>
              <span>Export to Excel</span>
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
                onShowToast('Filter cleared');
              }}
              className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-600 hover:text-gray-900"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* VIEW 1: Role Center */}
        {activeSubPage === 'role_center' && (
          <div className="space-y-5 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › IT Division › Role Center</div>
                <h1 className="text-lg font-bold text-gray-800">
                  {currentRole === 'm' ? 'Manager IT Role Center' : 'IT Executive Role Center'}
                </h1>
              </div>
              <div className="text-xs text-gray-600 bg-white border border-gray-300 px-3 py-1 rounded">
                Logged user: {currentRole === 'm' ? 'Shri. Subin Das S' : 'Shri. Harikrishnan M'}
              </div>
            </div>

            {/* Asset Cues */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-3">
                Asset Inventory & Dynamic ESS Mapping
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div
                  onClick={() => onNavigateSubPage('ast')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Assigned Assets (On ESS)</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">08</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('ast')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Assets In Stock</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('ast')}
                  className="nav-cue nav-cue-amber bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Assets Under Repair</span>
                  <div className="text-2xl font-bold text-[#d83b01] mt-2">01</div>
                </div>
              </div>
            </div>

            {/* Helpdesk Cues */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-3">
                Helpdesk & Incident Queue
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div
                  onClick={() => onNavigateSubPage('tk')}
                  className="nav-cue nav-cue-amber bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Open Support Tickets</span>
                  <div className="text-2xl font-bold text-[#d83b01] mt-2">02</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('tk')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Tickets In Progress</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('tk')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Require More Information</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
              </div>
            </div>

            {/* Procurement & AMC Cues */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-3">
                IT Procurement & AMC Lifecycle
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div
                  onClick={() => onNavigateSubPage('pr')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Awaiting eOffice Sanction</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('amc')}
                  className="nav-cue nav-cue-amber bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">AMC Expiring Soon (&lt; 30d)</span>
                  <div className="text-2xl font-bold text-[#d83b01] mt-2">02</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('amc')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Active AMC Contracts</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: IT Asset Register */}
        {activeSubPage === 'ast' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › IT Division › Asset Register</div>
                <h1 className="text-lg font-bold text-gray-800">IT Asset Register & Dynamic ESS Sync</h1>
              </div>
              <span className="text-xs bg-blue-50 text-[#004578] border border-blue-200 px-3 py-1 font-semibold rounded">
                Total Assets: {assets.length}
              </span>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Asset Tag</th>
                    <th className="py-2 px-3">Asset Name</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3">Serial / Model</th>
                    <th className="py-2 px-3">Mapped Employee (ESS)</th>
                    <th className="py-2 px-3">AMC Status</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assets.map((ast) => (
                    <tr
                      key={ast.id}
                      className={`hover:bg-blue-50/40 cursor-pointer ${
                        selectedAssetId === ast.id ? 'bg-[#cfe4f6]' : ''
                      }`}
                      onClick={() => setSelectedAssetId(ast.id)}
                    >
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{ast.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{ast.nm}</td>
                      <td className="py-2 px-3 text-gray-600">{ast.ct}</td>
                      <td className="py-2 px-3 font-mono text-gray-600">{ast.sn}</td>
                      <td className="py-2 px-3 font-medium text-[#004578]">{ast.emp}</td>
                      <td className="py-2 px-3 text-gray-700">{ast.amc}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            ast.st === 'Assigned'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : ast.st === 'In Stock'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {ast.st}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right space-x-1">
                        {ast.st === 'In Stock' ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMapAssetToEmployee(ast.id);
                            }}
                            className="px-2 py-0.5 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px]"
                          >
                            Map & Sync ESS
                          </button>
                        ) : ast.st === 'Assigned' ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReturnToStock(ast.id);
                            }}
                            className="px-2 py-0.5 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded text-[11px]"
                          >
                            Return to Stock
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: Helpdesk Tickets */}
        {activeSubPage === 'tk' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › IT Division › Helpdesk</div>
                <h1 className="text-lg font-bold text-gray-800">Support Ticket Queue & Triage</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Ticket ID</th>
                    <th className="py-2 px-3">Raised By</th>
                    <th className="py-2 px-3">Linked Asset</th>
                    <th className="py-2 px-3">Issue Subject</th>
                    <th className="py-2 px-3">Priority</th>
                    <th className="py-2 px-3">Assigned To</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tickets.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{t.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{t.emp}</td>
                      <td className="py-2 px-3 font-mono text-gray-600">{t.ast}</td>
                      <td className="py-2 px-3 text-gray-800">{t.sb}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            t.pr === 'Urgent'
                              ? 'bg-red-100 text-red-800 border border-red-300'
                              : t.pr === 'High'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {t.pr}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-gray-700">{t.as}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            t.st === 'Resolved'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : t.st === 'In Progress'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {t.st}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {t.st !== 'Resolved' && (
                          <button
                            onClick={() => handleResolveTicket(t.id)}
                            className="px-2 py-1 bg-green-700 text-white hover:bg-green-800 rounded text-[11px] font-medium"
                          >
                            Resolve & Log
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 4: IT Procurements */}
        {activeSubPage === 'pr' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › IT Division › Procurement</div>
                <h1 className="text-lg font-bold text-gray-800">IT Procurements & FICO Billing</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Proc. No</th>
                    <th className="py-2 px-3">Procurement Title</th>
                    <th className="py-2 px-3">Budget Head</th>
                    <th className="py-2 px-3">Selected L1 Vendor</th>
                    <th className="py-2 px-3">L1 Amount (₹)</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {procurements.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{p.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{p.ti}</td>
                      <td className="py-2 px-3 text-gray-700">{p.bh}</td>
                      <td className="py-2 px-3 font-medium text-blue-900">{p.l1}</td>
                      <td className="py-2 px-3 font-semibold text-gray-900">{p.am}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            p.st === 'Disbursed via FICO'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : p.st === 'eOffice Sanctioned'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {p.st}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {p.st === 'eOffice Sanctioned' && (
                          <button
                            onClick={() => handlePushProcurementToFICO(p.id)}
                            className="px-2 py-1 bg-green-700 text-white hover:bg-green-800 rounded text-[11px] font-medium"
                          >
                            Push to FICO
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 5: AMC Management */}
        {activeSubPage === 'amc' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › IT Division › AMC Management</div>
                <h1 className="text-lg font-bold text-gray-800">Annual Maintenance Contracts (AMC)</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">AMC No</th>
                    <th className="py-2 px-3">Asset Scope</th>
                    <th className="py-2 px-3">Vendor</th>
                    <th className="py-2 px-3">Expiry Date</th>
                    <th className="py-2 px-3">Alert Status</th>
                    <th className="py-2 px-3">Annual Cost (₹)</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {amcs.map((a) => (
                    <tr key={a.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{a.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{a.sc}</td>
                      <td className="py-2 px-3 text-gray-700">{a.vn}</td>
                      <td className="py-2 px-3 text-gray-800">{a.ex}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            a.al.includes('Alert')
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {a.al}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-semibold text-gray-900">{a.am}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            a.st === 'Active'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {a.st}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Fallback */}
        {!['role_center', 'ast', 'tk', 'pr', 'amc'].includes(activeSubPage) && (
          <div className="bg-white border border-gray-300 p-6 rounded-xs shadow-xs text-center">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              IT Module Section: {activeSubPage.toUpperCase()}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              All master records and workflows are active and accessible via module navigation.
            </p>
            <button
              onClick={() => onNavigateSubPage('role_center')}
              className="px-3.5 py-1.5 bg-[#0078d4] text-white rounded text-xs font-medium"
            >
              Return to Role Center
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
