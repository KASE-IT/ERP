import React, { useState } from 'react';

interface ProjectsModuleProps {
  activeSubPage: string;
  onNavigateSubPage: (subPage: string) => void;
  onShowToast: (msg: string) => void;
  userRole?: string;
  userName?: string;
}

export const ProjectsModule: React.FC<ProjectsModuleProps> = ({
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
  const [selectedCoEId, setSelectedCoEId] = useState<string | null>('COE-001');

  // CoE Registry
  const [coes, setCoes] = useState([
    {
      id: 'COE-001',
      name: 'IIIC',
      fullName: 'Indian Institute of Infrastructure and Construction',
      location: 'Chavara, Kollam',
      area: 64000,
      partner: 'IIIC Operating Partner',
      status: 'Active',
    },
    {
      id: 'COE-002',
      name: 'Espoir',
      fullName: 'Espoir Skill Development Centre',
      location: 'Kerala',
      area: 45000,
      partner: 'Espoir Consortium',
      status: 'Active',
    },
    {
      id: 'COE-003',
      name: 'NIMS CoE',
      fullName: 'NIMS Centre of Excellence',
      location: 'Kerala',
      area: 52000,
      partner: 'NIMS Healthcare Group',
      status: 'Active',
    },
    {
      id: 'COE-004',
      name: 'Biotechnology CoE',
      fullName: 'Biotechnology Centre of Excellence',
      location: 'Kerala',
      area: 38000,
      partner: 'Biotechnology Operating Partner',
      status: 'Active',
    },
  ]);

  // Space Functional Zones
  const [zones, setZones] = useState([
    {
      id: 'ZONE-001',
      coe: 'COE-001',
      name: 'Classroom Block',
      type: 'Classroom',
      area: 20000,
      utilized: 15000,
      status: 'Active',
      description: 'Teaching classrooms and instructional spaces',
    },
    {
      id: 'ZONE-002',
      coe: 'COE-001',
      name: 'Practical Training Area',
      type: 'Lab',
      area: 25000,
      utilized: 18000,
      status: 'Active',
      description: 'Practical training and workshop space',
    },
    {
      id: 'ZONE-003',
      coe: 'COE-001',
      name: 'Common Areas',
      type: 'Common',
      area: 19000,
      utilized: 8000,
      status: 'Review Required',
      description: 'Shared and common facilities',
    },
    {
      id: 'ZONE-004',
      coe: 'COE-002',
      name: 'Training Classrooms',
      type: 'Classroom',
      area: 18000,
      utilized: 12000,
      status: 'Active',
      description: 'Training rooms',
    },
  ]);

  // Applications
  const [applications, setApplications] = useState([
    {
      id: 'TSP-APP-2026-018',
      name: 'Malabar Digital Skills Foundation',
      reg: 'REG-KL-2020-12345',
      eoi: 'EOI-2026-004',
      sector: 'IT, Digital',
      submitted: '12-Oct-2026',
      legal: 'Pending',
      status: 'Under Desk Scrutiny',
    },
    {
      id: 'TSP-APP-2026-019',
      name: 'Travancore Technical Academy Pvt Ltd',
      reg: 'REG-KL-2018-56789',
      eoi: 'EOI-2026-004',
      sector: 'IT, Digital',
      submitted: '13-Oct-2026',
      legal: 'Pass',
      status: 'Needs Clarification',
    },
    {
      id: 'TSP-APP-2026-020',
      name: 'Cochin Industry Learning Centre',
      reg: 'REG-KL-2017-67890',
      eoi: 'EOI-2026-004',
      sector: 'IT, Digital',
      submitted: '15-Oct-2026',
      legal: 'Pass',
      status: 'Technically Qualified',
    },
  ]);

  // Courses
  const [courses, setCourses] = useState([
    {
      id: 'CRS-001',
      coe: 'COE-001',
      title: 'Construction Technology',
      framework: 'Partner curriculum',
      duration: '6 months',
      batch: 30,
      fee: 25000,
      status: 'Active',
      eoffice: 'KASE/PRJ/2026/081',
    },
    {
      id: 'CRS-002',
      coe: 'COE-001',
      title: 'Building Information Modelling',
      framework: 'NSQF-aligned curriculum',
      duration: '4 months',
      batch: 25,
      fee: 30000,
      status: 'Active',
      eoffice: 'KASE/PRJ/2026/085',
    },
    {
      id: 'CRS-003',
      coe: 'COE-002',
      title: 'Digital Skills',
      framework: 'NSQF-aligned curriculum',
      duration: '3 months',
      batch: 25,
      fee: 18000,
      status: 'Active',
      eoffice: 'KASE/PRJ/2026/082',
    },
  ]);

  // Civil Projects Registry
  const [projectRegistry] = useState([
    {
      id: 'PRJ-KL-2026-001',
      name: 'IIIC Chavara Campus Phase II Expansion',
      district: 'Kollam',
      estimate: 48000000,
      contractor: 'Kerala State Construction Corp',
      progress: 68,
      status: 'In Progress',
    },
    {
      id: 'PRJ-KL-2026-002',
      name: 'Centre of Excellence in EV Technology Infrastructure',
      district: 'Thiruvananthapuram',
      estimate: 16500000,
      contractor: 'Keltron Infrastructure Division',
      progress: 25,
      status: 'Tendering Completed',
    },
    {
      id: 'PRJ-KL-2026-003',
      name: 'DSDC Malappuram Modernisation & Civil Renovation',
      district: 'Malappuram',
      estimate: 7500000,
      contractor: 'Premier State Builders',
      progress: 85,
      status: 'In Progress',
    },
  ]);

  // Estimate Register
  const [estimateRegister] = useState([
    {
      id: 'EST-2026-081',
      proj: 'IIIC Chavara Campus Phase II Expansion',
      asNo: 'G.O.(Rt) No. 412/2026/LBR',
      tsNo: 'TS/KASE/2026/18',
      amount: 48000000,
      status: 'Technically Sanctioned',
    },
    {
      id: 'EST-2026-082',
      proj: 'Centre of Excellence in EV Technology Infrastructure',
      asNo: 'G.O.(Rt) No. 445/2026/LBR',
      tsNo: 'TS/KASE/2026/22',
      amount: 16500000,
      status: 'Technically Sanctioned',
    },
    {
      id: 'EST-2026-083',
      proj: 'DSDC Malappuram Renovation',
      asNo: 'G.O.(Rt) No. 450/2026/LBR',
      tsNo: 'TS/KASE/2026/25',
      amount: 7500000,
      status: 'Technically Sanctioned',
    },
  ]);

  // Tendering
  const [tenderingRegister] = useState([
    {
      id: 'TND-2026-014',
      proj: 'Centre of Excellence in EV Technology Infrastructure',
      pac: 16500000,
      mode: 'Open E-Tender',
      bids: 4,
      status: 'Technical Evaluation',
    },
    {
      id: 'TND-2026-009',
      proj: 'IIIC Chavara Campus Phase II Expansion',
      pac: 48000000,
      mode: 'Open E-Tender',
      bids: 3,
      status: 'Awarded & Agreement Executed',
    },
  ]);

  // RA Bills
  const [raBills] = useState([
    {
      id: 'RAB-2026-03',
      proj: 'IIIC Chavara Campus Phase II Expansion',
      billNo: 'RA Bill 03',
      gross: 4520000,
      net: 4068000,
      status: 'Passed for Payment',
    },
    {
      id: 'RAB-2026-02',
      proj: 'DSDC Malappuram Modernisation',
      billNo: 'Part Bill 02',
      gross: 2200000,
      net: 1980000,
      status: 'Under Scrutiny',
    },
  ]);

  // Facilities Maintenance tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-041',
      coe: 'COE-001',
      asset: 'AST-001 (HVAC – Block A)',
      defect: 'Cooling failure in Classroom A-03',
      reported: '18-Oct-2026 09:20',
      vendor: 'CoolAir Services',
      sla: 24,
      status: 'Dispatched to Vendor',
    },
    {
      id: 'TKT-042',
      coe: 'COE-001',
      asset: 'AST-002 (Passenger Lift)',
      defect: 'Lift door sensor intermittent',
      reported: '19-Oct-2026 11:00',
      vendor: 'Vertical Mobility Ltd',
      sla: 8,
      status: 'Open – Validation',
    },
  ]);

  // BAC Evaluation Score Modal state
  const [bacModal, setBacModal] = useState({
    show: false,
    appId: '',
    infra: 16,
    faculty: 17,
    placements: 25,
    industry: 26,
  });

  const handleSaveBacScores = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(bacModal.infra) + Number(bacModal.faculty) + Number(bacModal.placements) + Number(bacModal.industry);
    setApplications((prev) =>
      prev.map((a) =>
        a.id === bacModal.appId
          ? {
              ...a,
              status: total >= 60 ? 'Technically Qualified' : 'Failed Technical Evaluation',
            }
          : a
      )
    );
    onShowToast(`BAC evaluation recorded for ${bacModal.appId}: Total score ${total}/100`);
    setBacModal({ show: false, appId: '', infra: 16, faculty: 17, placements: 25, industry: 26 });
  };

  const handleLegalCheckPass = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? { ...a, legal: 'Pass', status: 'Cleared for Technical Evaluation' }
          : a
      )
    );
    onShowToast(`Legal scrutiny passed for application ${appId}`);
  };

  const handleDispatchTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status: 'Dispatched to Vendor' } : t
      )
    );
    onShowToast(`Ticket ${ticketId} dispatched to assigned vendor under SLA tracking`);
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'Resolved' } : t))
    );
    onShowToast(`Ticket ${ticketId} marked as resolved`);
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#faf9f8] text-xs select-none">
      {/* Module Sub-Header */}
      <div className="bg-white border-b border-[#d2d0ce] px-4 py-2 flex items-center justify-between shadow-xs shrink-0">
        <div>
          <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects Division</div>
          <h1 className="text-base font-bold text-gray-800">
            {activeSubPage === 'home'
              ? 'Projects Division Role Centre'
              : activeSubPage === 'applications'
              ? 'TSP Applications & Desk Scrutiny'
              : activeSubPage === 'coe'
              ? 'Centre of Excellence (CoE) Registry'
              : activeSubPage === 'space'
              ? 'Space Utilisation & Functional Zones'
              : activeSubPage === 'courses'
              ? 'Course Proposals & Running Batches'
              : activeSubPage === 'tickets'
              ? 'Maintenance Tickets & SLA Monitoring'
              : 'Projects Division Operations'}
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <span className="text-[11px] text-gray-600">
            Signed In: <strong className="text-gray-900">{userName || 'Smt. Smitha C'}</strong> ({userRole || 'Manager in Charge (Projects)'})
          </span>

          <button
            onClick={() => onShowToast('Exported Projects Division CSV record set')}
            className="px-2.5 py-1 bg-white hover:bg-gray-50 border border-gray-300 rounded font-medium text-gray-700 flex items-center gap-1 shadow-xs"
          >
            <span>▦</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* VIEW 1: Role Centre / Dashboard */}
        {(activeSubPage === 'home' || activeSubPage === 'dashboard') && (
          <div className="space-y-5 max-w-6xl">
            {/* Metric Cues */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div
                onClick={() => onNavigateSubPage('applications')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#d83b01] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Applications in Scrutiny</div>
                <div className="text-2xl font-bold text-[#d83b01] mt-1">02</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Desk scrutiny & legal check</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('coe')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#0078d4] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Active CoEs</div>
                <div className="text-2xl font-bold text-[#004578] mt-1">04</div>
                <div className="text-[10px] text-gray-500 mt-0.5">IIIC, Espoir, NIMS, Biotech</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('courses')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#107c10] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Running Courses</div>
                <div className="text-2xl font-bold text-green-700 mt-1">05</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Approved under eOffice</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('tickets')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#d83b01] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Open Maintenance Tickets</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">02</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Facility SLA tracking</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('space')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#0078d4] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Space Utilisation</div>
                <div className="text-2xl font-bold text-[#004578] mt-1">75%</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Plinth area utilization</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('applications')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#0078d4] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Technical BAC Scheduled</div>
                <div className="text-2xl font-bold text-[#004578] mt-1">01</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Expert committee eval</div>
              </div>
            </div>

            {/* Applications & Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-300 p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                  <h3 className="text-xs font-bold uppercase text-[#004578]">Accreditation Applications</h3>
                  <button
                    onClick={() => onNavigateSubPage('applications')}
                    className="text-[#0078d4] hover:underline text-[11px] font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 border-b border-gray-300">
                        <th className="py-1.5 px-2 font-semibold">Application</th>
                        <th className="py-1.5 px-2 font-semibold">TSP Name</th>
                        <th className="py-1.5 px-2 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {applications.map((a) => (
                        <tr key={a.id} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2 font-mono text-[#0078d4] font-semibold">{a.id}</td>
                          <td className="py-2 px-2 font-medium text-gray-900">{a.name}</td>
                          <td className="py-2 px-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                a.status === 'Technically Qualified'
                                  ? 'bg-green-100 text-green-800'
                                  : a.status === 'Needs Clarification'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border border-gray-300 p-4 shadow-xs">
                <h3 className="text-xs font-bold uppercase text-[#004578] mb-3 border-b border-gray-200 pb-2">
                  CoE Infrastructure Centres
                </h3>
                <div className="space-y-2">
                  {coes.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedCoEId(c.id);
                        onNavigateSubPage('coe');
                      }}
                      className="p-2.5 bg-gray-50 border border-gray-200 rounded hover:bg-blue-50 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">{c.fullName}</div>
                        <div className="text-[11px] text-gray-500">
                          {c.location} · {c.area.toLocaleString()} sq. ft. · Partner: {c.partner}
                        </div>
                      </div>
                      <span className="text-[#0078d4] font-medium text-xs">Open CoE →</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Applications & Desk Scrutiny */}
        {activeSubPage === 'applications' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › Accreditation</div>
                <h1 className="text-lg font-bold text-gray-800">TSP Applications & Scrutiny Register</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Application No</th>
                    <th className="py-2 px-3">Training Service Provider</th>
                    <th className="py-2 px-3">Target Sector</th>
                    <th className="py-2 px-3">Submitted On</th>
                    <th className="py-2 px-3">Legal Check</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{app.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{app.name}</td>
                      <td className="py-2 px-3 text-gray-700">{app.sector}</td>
                      <td className="py-2 px-3 text-gray-600">{app.submitted}</td>
                      <td className="py-2 px-3 font-semibold text-gray-800">{app.legal}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            app.status === 'Technically Qualified'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : app.status === 'Needs Clarification'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right space-x-1">
                        {app.legal === 'Pending' && (
                          <button
                            onClick={() => handleLegalCheckPass(app.id)}
                            className="px-2 py-1 bg-green-700 text-white rounded text-[11px] hover:bg-green-800"
                          >
                            Pass Legal Check
                          </button>
                        )}
                        {app.status.includes('Scrutiny') && app.legal === 'Pass' && (
                          <button
                            onClick={() =>
                              setBacModal({
                                show: true,
                                appId: app.id,
                                infra: 16,
                                faculty: 17,
                                placements: 25,
                                industry: 26,
                              })
                            }
                            className="px-2 py-1 bg-[#0078d4] text-white rounded text-[11px] hover:bg-blue-700 font-medium"
                          >
                            Score BAC
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

        {/* VIEW 3: CoE Registry */}
        {activeSubPage === 'coe' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › CoE Registry</div>
                <h1 className="text-lg font-bold text-gray-800">Centres of Excellence (CoE) Registry</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coes.map((c) => (
                <div
                  key={c.id}
                  className={`bg-white border p-4 rounded-xs shadow-xs transition ${
                    selectedCoEId === c.id ? 'border-[#0078d4] ring-2 ring-blue-100' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#0078d4]">{c.id}</span>
                      <h3 className="font-bold text-sm text-gray-900 mt-0.5">{c.fullName}</h3>
                      <div className="text-gray-600 text-xs mt-1">Location: {c.location}</div>
                      <div className="text-gray-600 text-xs">Operating Partner: {c.partner}</div>
                      <div className="text-gray-800 font-semibold text-xs mt-2">
                        Plinth Area: {c.area.toLocaleString()} sq. ft.
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-800 border border-green-300">
                      {c.status}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedCoEId(c.id);
                        onNavigateSubPage('space');
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-[11px] font-medium"
                    >
                      Space Utilisation
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCoEId(c.id);
                        onNavigateSubPage('courses');
                      }}
                      className="px-2.5 py-1 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px] font-medium"
                    >
                      Courses & Students
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: Space Utilisation */}
        {activeSubPage === 'space' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › Space Utilisation</div>
                <h1 className="text-lg font-bold text-gray-800">
                  Functional Zone Register & Plinth Area Utilisation
                </h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Zone Code</th>
                    <th className="py-2 px-3">Zone Name</th>
                    <th className="py-2 px-3">CoE Code</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Allocated Area (sq. ft.)</th>
                    <th className="py-2 px-3">Utilised Area (sq. ft.)</th>
                    <th className="py-2 px-3">Utilisation %</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {zones.map((z) => {
                    const pct = Math.round((z.utilized / z.area) * 100);
                    return (
                      <tr key={z.id} className="hover:bg-blue-50/40">
                        <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{z.id}</td>
                        <td className="py-2 px-3 font-medium text-gray-900">{z.name}</td>
                        <td className="py-2 px-3 font-mono text-gray-600">{z.coe}</td>
                        <td className="py-2 px-3 text-gray-700">{z.type}</td>
                        <td className="py-2 px-3 font-semibold text-gray-800">
                          {z.area.toLocaleString()}
                        </td>
                        <td className="py-2 px-3 text-gray-700">{z.utilized.toLocaleString()}</td>
                        <td className="py-2 px-3 font-bold text-blue-900">{pct}%</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-800 border border-green-300">
                            {z.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 5: Courses */}
        {activeSubPage === 'courses' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › Courses</div>
                <h1 className="text-lg font-bold text-gray-800">CoE Approved Courses & Running Batches</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Course Code</th>
                    <th className="py-2 px-3">CoE</th>
                    <th className="py-2 px-3">Course Title</th>
                    <th className="py-2 px-3">Curriculum Framework</th>
                    <th className="py-2 px-3">Duration</th>
                    <th className="py-2 px-3">Batch Size</th>
                    <th className="py-2 px-3">Fee (₹)</th>
                    <th className="py-2 px-3">eOffice Reference</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((c) => (
                    <tr key={c.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{c.id}</td>
                      <td className="py-2 px-3 font-mono text-gray-700">{c.coe}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{c.title}</td>
                      <td className="py-2 px-3 text-gray-600">{c.framework}</td>
                      <td className="py-2 px-3 text-gray-600">{c.duration}</td>
                      <td className="py-2 px-3 text-gray-800">{c.batch}</td>
                      <td className="py-2 px-3 font-semibold text-gray-900">Rs. {c.fee.toLocaleString()}</td>
                      <td className="py-2 px-3 font-mono text-gray-600">{c.eoffice}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-800 border border-green-300">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 6: Maintenance Tickets */}
        {activeSubPage === 'tickets' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › Maintenance</div>
                <h1 className="text-lg font-bold text-gray-800">Facilities Maintenance Tickets & SLA</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Ticket No</th>
                    <th className="py-2 px-3">CoE</th>
                    <th className="py-2 px-3">Asset</th>
                    <th className="py-2 px-3">Defect Description</th>
                    <th className="py-2 px-3">Assigned Vendor</th>
                    <th className="py-2 px-3">SLA Hours</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tickets.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{t.id}</td>
                      <td className="py-2 px-3 font-mono text-gray-700">{t.coe}</td>
                      <td className="py-2 px-3 font-medium text-gray-800">{t.asset}</td>
                      <td className="py-2 px-3 text-gray-700">{t.defect}</td>
                      <td className="py-2 px-3 text-gray-600">{t.vendor}</td>
                      <td className="py-2 px-3 font-semibold text-gray-900">{t.sla} hrs</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            t.status === 'Resolved'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : t.status === 'Dispatched to Vendor'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {t.status === 'Open – Validation' && (
                          <button
                            onClick={() => handleDispatchTicket(t.id)}
                            className="px-2 py-1 bg-[#0078d4] text-white rounded text-[11px] hover:bg-blue-700"
                          >
                            Dispatch Vendor
                          </button>
                        )}
                        {t.status === 'Dispatched to Vendor' && (
                          <button
                            onClick={() => handleResolveTicket(t.id)}
                            className="px-2 py-1 bg-green-700 text-white rounded text-[11px] hover:bg-green-800"
                          >
                            Mark Resolved
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

        {/* VIEW: Project Registry */}
        {activeSubPage === 'registry' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › Project Management</div>
                <h1 className="text-lg font-bold text-gray-800">Project Master Registry</h1>
              </div>
            </div>
            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Project Code</th>
                    <th className="py-2 px-3">Project Name</th>
                    <th className="py-2 px-3">District</th>
                    <th className="py-2 px-3">Estimated Cost (₹)</th>
                    <th className="py-2 px-3">Contractor / Agency</th>
                    <th className="py-2 px-3">Progress</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projectRegistry.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{p.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{p.name}</td>
                      <td className="py-2 px-3 text-gray-600">{p.district}</td>
                      <td className="py-2 px-3 font-semibold text-gray-800">Rs. {p.estimate.toLocaleString()}</td>
                      <td className="py-2 px-3 text-gray-700">{p.contractor}</td>
                      <td className="py-2 px-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2 inline-block mr-2 align-middle overflow-hidden">
                          <div className="bg-[#0078d4] h-2 rounded-full" style={{ width: `${p.progress}%` }}></div>
                        </div>
                        <span className="font-bold text-gray-700">{p.progress}%</span>
                      </td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-800 border border-green-300">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: Estimate Register */}
        {activeSubPage === 'estimates' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › Estimates</div>
                <h1 className="text-lg font-bold text-gray-800">Estimate Register & Technical Sanctions</h1>
              </div>
            </div>
            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Estimate No</th>
                    <th className="py-2 px-3">Project Title</th>
                    <th className="py-2 px-3">Administrative Sanction (AS)</th>
                    <th className="py-2 px-3">Technical Sanction (TS)</th>
                    <th className="py-2 px-3">Sanctioned Amount (₹)</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {estimateRegister.map((est) => (
                    <tr key={est.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{est.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{est.proj}</td>
                      <td className="py-2 px-3 font-mono text-gray-700">{est.asNo}</td>
                      <td className="py-2 px-3 font-mono text-blue-900 font-medium">{est.tsNo}</td>
                      <td className="py-2 px-3 font-semibold text-gray-900">Rs. {est.amount.toLocaleString()}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-800 border border-green-300">
                          {est.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: Pre-construction & Tendering */}
        {activeSubPage === 'tendering' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › Tendering</div>
                <h1 className="text-lg font-bold text-gray-800">Pre-construction & Tendering Pipeline</h1>
              </div>
            </div>
            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Tender Ref</th>
                    <th className="py-2 px-3">Project</th>
                    <th className="py-2 px-3">PAC Amount (₹)</th>
                    <th className="py-2 px-3">Tender Mode</th>
                    <th className="py-2 px-3">Bids Received</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tenderingRegister.map((tnd) => (
                    <tr key={tnd.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{tnd.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{tnd.proj}</td>
                      <td className="py-2 px-3 font-semibold text-gray-800">Rs. {tnd.pac.toLocaleString()}</td>
                      <td className="py-2 px-3 text-gray-600">{tnd.mode}</td>
                      <td className="py-2 px-3 font-bold text-gray-700">{tnd.bids}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                          {tnd.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: Execution & Progress */}
        {activeSubPage === 'execution' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › Execution</div>
                <h1 className="text-lg font-bold text-gray-800">Project Execution & Physical Progress Tracking</h1>
              </div>
            </div>
            <div className="space-y-3">
              {projectRegistry.map((p) => (
                <div key={p.id} className="bg-white border border-gray-300 p-4 rounded shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-xs font-semibold text-[#0078d4]">{p.id}</div>
                      <div className="font-bold text-sm text-gray-900">{p.name}</div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        District: {p.district} · Contractor: {p.contractor}
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold text-blue-800 bg-blue-100">
                      {p.progress}% Physical Progress
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 overflow-hidden">
                    <div
                      className="bg-[#0078d4] h-2.5 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
                    <span>Quality Inspection: Cleared by Project Engineer (Civil)</span>
                    <button
                      onClick={() => onShowToast(`Site inspection log opened for ${p.id}`)}
                      className="text-[#0078d4] hover:underline font-medium"
                    >
                      Inspection Logs ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: RA Bills & Payments */}
        {activeSubPage === 'bills' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Projects › RA Bills</div>
                <h1 className="text-lg font-bold text-gray-800">Running Account (RA) Bills & Payments</h1>
              </div>
            </div>
            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Bill ID</th>
                    <th className="py-2 px-3">Project Title</th>
                    <th className="py-2 px-3">Bill Number</th>
                    <th className="py-2 px-3">Gross Bill (₹)</th>
                    <th className="py-2 px-3">Net Payable (₹)</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {raBills.map((b) => (
                    <tr key={b.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{b.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{b.proj}</td>
                      <td className="py-2 px-3 font-semibold text-gray-700">{b.billNo}</td>
                      <td className="py-2 px-3 font-semibold text-gray-800">Rs. {b.gross.toLocaleString()}</td>
                      <td className="py-2 px-3 font-bold text-gray-900">Rs. {b.net.toLocaleString()}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-green-100 text-green-800 border border-green-300">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => onShowToast(`Bill ${b.id} forwarded for FICO payment processing`)}
                          className="px-2 py-1 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px]"
                        >
                          FICO Advice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Fallback */}
        {!['home', 'dashboard', 'registry', 'estimates', 'tendering', 'execution', 'bills', 'applications', 'coe', 'space', 'courses', 'tickets'].includes(activeSubPage) && (
          <div className="bg-white border border-gray-300 p-6 rounded-xs shadow-xs text-center">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Projects Division Section: {activeSubPage.toUpperCase()}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              All master records and workflows are active and accessible via module navigation.
            </p>
            <button
              onClick={() => onNavigateSubPage('home')}
              className="px-3.5 py-1.5 bg-[#0078d4] text-white rounded text-xs font-medium"
            >
              Return to Projects Role Centre
            </button>
          </div>
        )}
      </div>

      {/* BAC Evaluation Scoring Modal */}
      {bacModal.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-400 shadow-xl w-full max-w-md rounded-xs overflow-hidden">
            <div className="bg-[#004578] text-white px-5 py-3 flex justify-between items-center text-xs font-semibold">
              <span>BAC Evaluation Scoring Sheet: {bacModal.appId}</span>
              <button
                onClick={() =>
                  setBacModal({ show: false, appId: '', infra: 16, faculty: 17, placements: 25, industry: 26 })
                }
                className="text-white hover:text-gray-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveBacScores} className="p-5 space-y-4 text-xs">
              <div className="p-2.5 bg-blue-50 border border-blue-200 text-[11px] text-blue-900 rounded">
                Minimum passing cutoff is 60/100 to qualify as a Training Service Provider.
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Infrastructure (Max 20)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    required
                    value={bacModal.infra}
                    onChange={(e) => setBacModal({ ...bacModal, infra: Number(e.target.value) })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Faculty Competency (Max 20)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    required
                    value={bacModal.faculty}
                    onChange={(e) => setBacModal({ ...bacModal, faculty: Number(e.target.value) })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Past Placements (Max 30)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    required
                    value={bacModal.placements}
                    onChange={(e) => setBacModal({ ...bacModal, placements: Number(e.target.value) })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Industry Tie-ups (Max 30)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    required
                    value={bacModal.industry}
                    onChange={(e) => setBacModal({ ...bacModal, industry: Number(e.target.value) })}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                  />
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <div className="font-semibold text-gray-800">
                  Total Score: {Number(bacModal.infra) + Number(bacModal.faculty) + Number(bacModal.placements) + Number(bacModal.industry)} / 100
                </div>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() =>
                      setBacModal({ show: false, appId: '', infra: 16, faculty: 17, placements: 25, industry: 26 })
                    }
                    className="px-3 py-1.5 border border-gray-300 bg-gray-100 rounded text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-blue-700 font-medium rounded text-xs shadow-xs"
                  >
                    Save Scores
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
