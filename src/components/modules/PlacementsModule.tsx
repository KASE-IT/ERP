import React, { useState } from 'react';

interface PlacementsModuleProps {
  activeSubPage: string;
  onNavigateSubPage: (subPage: string) => void;
  onShowToast: (msg: string) => void;
  userRole?: string;
  userName?: string;
}

export const PlacementsModule: React.FC<PlacementsModuleProps> = ({
  activeSubPage,
  onNavigateSubPage,
  onShowToast,
  userRole,
  userName,
}) => {
  // Role based on login
  const role = userRole?.toLowerCase().includes('executive') ? 'executive' : 'manager';

  // Candidate Data
  const [candidates, setCandidates] = useState([
    {
      id: 'CAN-26001',
      name: 'Anjana S',
      district: 'Thiruvananthapuram',
      qualification: 'Diploma',
      skill: 'Electric Vehicle Service',
      scheme: 'State Skill Programme',
      batch: 'BATCH-104',
      certificate: 'CERT-26001',
      certified: true,
      phone: '98XXXX2101',
      visibility: 'Visible to verified employers',
      status: 'Available',
      employer: '',
      salary: 0,
    },
    {
      id: 'CAN-26002',
      name: 'Rahul P',
      district: 'Kozhikode',
      qualification: 'ITI',
      skill: 'Industrial Automation',
      scheme: 'PMKVY',
      batch: 'BATCH-103',
      certificate: 'CERT-26002',
      certified: true,
      phone: '97XXXX3202',
      visibility: 'Visible to verified employers',
      status: 'Available',
      employer: '',
      salary: 0,
    },
    {
      id: 'CAN-26003',
      name: 'Meera K',
      district: 'Ernakulam',
      qualification: 'Degree',
      skill: 'Digital Marketing',
      scheme: 'State Skill Programme',
      batch: 'BATCH-101',
      certificate: 'CERT-26003',
      certified: true,
      phone: '96XXXX4303',
      visibility: 'Visible to verified employers',
      status: 'Interviewing',
      employer: 'Kerala Digital Services',
      salary: 0,
    },
    {
      id: 'CAN-26004',
      name: 'Nikhil R',
      district: 'Thrissur',
      qualification: 'ITI',
      skill: 'Electrical Maintenance',
      scheme: 'PMKVY',
      batch: 'BATCH-102',
      certificate: 'CERT-26004',
      certified: true,
      phone: '95XXXX5404',
      visibility: 'Visible to verified employers',
      status: 'Placed',
      employer: 'Malabar Engineering Works',
      salary: 18500,
      placedAt: '05-Sep-2026',
      proof: 'Appointment_Nikhil.pdf',
      proofStatus: 'Verified',
      sanctionStatus: 'Sanctioned',
    },
    {
      id: 'CAN-26005',
      name: 'Fathima M',
      district: 'Malappuram',
      qualification: 'Plus Two',
      skill: 'Customer Relationship Management',
      scheme: 'State Skill Programme',
      batch: 'BATCH-105',
      certificate: 'CERT-26005',
      certified: true,
      phone: '94XXXX6505',
      visibility: 'Visible to verified employers',
      status: 'Available',
      employer: '',
      salary: 0,
    },
  ]);

  // Employer Data
  const [employers, setEmployers] = useState([
    {
      id: 'EMP-1001',
      name: 'Malabar Engineering Works',
      sector: 'Engineering',
      district: 'Thrissur',
      contact: 'Placement Desk',
      email: 'hr@example.com',
      phone: '0484-0000000',
      status: 'Verified',
    },
    {
      id: 'EMP-1002',
      name: 'Kerala Digital Services',
      sector: 'IT & Digital',
      district: 'Ernakulam',
      contact: 'HR Team',
      email: 'careers@example.com',
      phone: '0484-1111111',
      status: 'Verified',
    },
    {
      id: 'EMP-1003',
      name: 'Coastal Automation LLP',
      sector: 'Manufacturing',
      district: 'Alappuzha',
      contact: 'Recruitment Officer',
      email: 'recruit@example.com',
      phone: '0477-2222222',
      status: 'Pending Verification',
    },
  ]);

  // Vacancies
  const [jobs, setJobs] = useState([
    {
      id: 'JOB-2001',
      title: 'Electrical Maintenance Technician',
      employer: 'Malabar Engineering Works',
      district: 'Thrissur',
      skill: 'Electrical Maintenance',
      positions: 4,
      salary: 18500,
      status: 'Open',
    },
    {
      id: 'JOB-2002',
      title: 'Digital Marketing Associate',
      employer: 'Kerala Digital Services',
      district: 'Ernakulam',
      skill: 'Digital Marketing',
      positions: 3,
      salary: 22000,
      status: 'Open',
    },
    {
      id: 'JOB-2003',
      title: 'Automation Trainee',
      employer: 'Coastal Automation LLP',
      district: 'Alappuzha',
      skill: 'Industrial Automation',
      positions: 2,
      salary: 20000,
      status: 'Draft',
    },
  ]);

  // Drives
  const [drives, setDrives] = useState([
    {
      id: 'DRV-3001',
      title: 'Electrical Maintenance Recruitment Drive',
      employer: 'Malabar Engineering Works',
      vacancy: 'Electrical Maintenance Technician',
      date: '28-Oct-2026',
      mode: 'Hybrid',
      candidatesCount: 2,
      status: 'Scheduled',
    },
    {
      id: 'DRV-3002',
      title: 'Digital Services Interview Day',
      employer: 'Kerala Digital Services',
      vacancy: 'Digital Marketing Associate',
      date: '04-Nov-2026',
      mode: 'Online',
      candidatesCount: 1,
      status: 'Scheduled',
    },
  ]);

  // Admit card modal state
  const [admitCardPreview, setAdmitCardPreview] = useState<{
    show: boolean;
    candidateName: string;
    candidateId: string;
    driveTitle: string;
    date: string;
  }>({
    show: false,
    candidateName: '',
    candidateId: '',
    driveTitle: '',
    date: '',
  });

  // Matching candidates modal
  const [matchingCandidates, setMatchingCandidates] = useState<{
    show: boolean;
    jobTitle: string;
    skill: string;
    matches: typeof candidates;
  }>({
    show: false,
    jobTitle: '',
    skill: '',
    matches: [],
  });

  const handleShowMatches = (job: typeof jobs[0]) => {
    const matched = candidates.filter((c) =>
      c.skill.toLowerCase().includes(job.skill.toLowerCase())
    );
    setMatchingCandidates({
      show: true,
      jobTitle: job.title,
      skill: job.skill,
      matches: matched,
    });
  };

  const handleVerifyEmployer = (empId: string) => {
    setEmployers((prev) =>
      prev.map((e) => (e.id === empId ? { ...e, status: 'Verified' } : e))
    );
    onShowToast(`Employer ${empId} successfully verified in state registry`);
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#faf9f8] text-xs select-none">
      {/* Module Sub-Header */}
      <div className="bg-white border-b border-[#d2d0ce] px-4 py-2 flex items-center justify-between shadow-xs shrink-0">
        <div>
          <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Placements Division</div>
          <h1 className="text-base font-bold text-gray-800">
            {activeSubPage === 'dashboard'
              ? 'Placements Dashboard'
              : activeSubPage === 'talent'
              ? 'Talent Pool Register'
              : activeSubPage === 'employers'
              ? 'Employer Register & Verification'
              : activeSubPage === 'vacancies'
              ? 'Vacancies & Skill Matching'
              : activeSubPage === 'drives'
              ? 'Placement Drives & Admit Cards'
              : activeSubPage === 'retention'
              ? 'Retention Milestones (30/60/90 Days)'
              : 'Placement Operations'}
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <span className="text-[11px] text-gray-600">
            Signed In: <strong className="text-gray-900">{userName || (role === 'manager' ? 'Smt. Reshmi M B' : 'Shri. Amaljith A R')}</strong> ({userRole || (role === 'manager' ? 'Manager (Placements)' : 'Executive (Placements)')})
          </span>

          <button
            onClick={() => onShowToast('Exported CSV record set to downloads')}
            className="px-2.5 py-1 bg-white hover:bg-gray-50 border border-gray-300 rounded font-medium text-gray-700 flex items-center gap-1 shadow-xs"
          >
            <span>▦</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* VIEW 1: Dashboard */}
        {activeSubPage === 'dashboard' && (
          <div className="space-y-5 max-w-6xl">
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div
                onClick={() => onNavigateSubPage('talent')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#0078d4] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Certified Candidates</div>
                <div className="text-2xl font-bold text-[#004578] mt-1">05</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Eligible for talent pool</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('talent')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#107c10] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Placed Candidates</div>
                <div className="text-2xl font-bold text-green-700 mt-1">01</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Under retention monitoring</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('verification')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#d83b01] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Employment Proof Pending</div>
                <div className="text-2xl font-bold text-[#d83b01] mt-1">01</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Scrutiny verification needed</div>
              </div>

              <div
                onClick={() => onNavigateSubPage('employers')}
                className="bg-white border border-[#d2d0ce] border-t-4 border-t-[#0078d4] p-3.5 shadow-xs cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="text-[11px] text-gray-500 font-medium">Employers to Verify</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">01</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Registration scrutiny</div>
              </div>
            </div>

            {/* Placement Activity & Pending Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-300 p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                  <h3 className="text-xs font-bold uppercase text-[#004578]">Recent Candidate Activity</h3>
                  <button
                    onClick={() => onNavigateSubPage('talent')}
                    className="text-[#0078d4] hover:underline text-[11px] font-medium"
                  >
                    Open Talent Pool →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 border-b border-gray-300">
                        <th className="py-1.5 px-2 font-semibold">Candidate</th>
                        <th className="py-1.5 px-2 font-semibold">Skill</th>
                        <th className="py-1.5 px-2 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {candidates.slice(0, 4).map((c) => (
                        <tr key={c.id} className="hover:bg-blue-50/40">
                          <td className="py-2 px-2 font-medium text-gray-900">{c.name}</td>
                          <td className="py-2 px-2 text-gray-600">{c.skill}</td>
                          <td className="py-2 px-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                c.status === 'Placed'
                                  ? 'bg-green-100 text-green-800'
                                  : c.status === 'Interviewing'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border border-gray-300 p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                  <h3 className="text-xs font-bold uppercase text-[#004578]">Pending Approvals & Scrutiny</h3>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-amber-900">Coastal Automation LLP</div>
                      <div className="text-[11px] text-amber-700">Employer registration scrutiny awaiting decision</div>
                    </div>
                    <button
                      onClick={() => handleVerifyEmployer('EMP-1003')}
                      className="px-2 py-1 bg-[#0078d4] text-white rounded text-[11px] font-medium"
                    >
                      Verify
                    </button>
                  </div>

                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-blue-900">Nikhil R (CAN-26004)</div>
                      <div className="text-[11px] text-blue-700">30-Day Retention Milestone salary slip review</div>
                    </div>
                    <button
                      onClick={() => onNavigateSubPage('retention')}
                      className="px-2 py-1 bg-white border border-blue-300 text-[#004578] rounded text-[11px] font-medium hover:bg-blue-100"
                    >
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Placement Drives */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                <h3 className="text-xs font-bold uppercase text-[#004578]">Scheduled Placement Drives</h3>
                <button
                  onClick={() => onNavigateSubPage('drives')}
                  className="text-[#0078d4] hover:underline text-[11px] font-medium"
                >
                  View All Drives →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 border-b border-gray-300 font-semibold">
                      <th className="py-2 px-3">Drive Title</th>
                      <th className="py-2 px-3">Employer</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Mode</th>
                      <th className="py-2 px-3">Candidates</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {drives.map((d) => (
                      <tr key={d.id} className="hover:bg-blue-50/40">
                        <td className="py-2 px-3 font-medium text-gray-900">{d.title}</td>
                        <td className="py-2 px-3 text-gray-700">{d.employer}</td>
                        <td className="py-2 px-3 text-gray-600">{d.date}</td>
                        <td className="py-2 px-3 text-gray-600">{d.mode}</td>
                        <td className="py-2 px-3 text-gray-800 font-semibold">{d.candidatesCount}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Talent Pool */}
        {activeSubPage === 'talent' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Placements › Talent Pool</div>
                <h1 className="text-lg font-bold text-gray-800">Certified Candidate Talent Pool</h1>
              </div>
              <button
                onClick={() => onShowToast('Candidate registration modal opened')}
                className="px-3 py-1.5 bg-[#0078d4] text-white rounded text-xs font-medium hover:bg-blue-700"
              >
                ＋ Add Candidate Record
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Candidate ID</th>
                    <th className="py-2 px-3">Full Name</th>
                    <th className="py-2 px-3">District</th>
                    <th className="py-2 px-3">Skill / Trade</th>
                    <th className="py-2 px-3">Certificate Ref</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {candidates.map((c) => (
                    <tr key={c.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{c.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{c.name}</td>
                      <td className="py-2 px-3 text-gray-600">{c.district}</td>
                      <td className="py-2 px-3 text-gray-800">{c.skill}</td>
                      <td className="py-2 px-3 font-mono text-gray-600">{c.certificate}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            c.status === 'Placed'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : c.status === 'Interviewing'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => onShowToast(`Candidate dossier viewed for ${c.name}`)}
                          className="text-[#0078d4] hover:underline font-medium text-[11px]"
                        >
                          View Details ↗
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: Employer Register */}
        {activeSubPage === 'employers' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Placements › Employers</div>
                <h1 className="text-lg font-bold text-gray-800">Employer Register & Scrutiny</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Employer ID</th>
                    <th className="py-2 px-3">Organisation Name</th>
                    <th className="py-2 px-3">Sector</th>
                    <th className="py-2 px-3">District</th>
                    <th className="py-2 px-3">Contact Person</th>
                    <th className="py-2 px-3">Verification</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employers.map((e) => (
                    <tr key={e.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{e.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{e.name}</td>
                      <td className="py-2 px-3 text-gray-700">{e.sector}</td>
                      <td className="py-2 px-3 text-gray-600">{e.district}</td>
                      <td className="py-2 px-3 text-gray-600">{e.contact}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            e.status === 'Verified'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {e.status !== 'Verified' && (
                          <button
                            onClick={() => handleVerifyEmployer(e.id)}
                            className="px-2 py-1 bg-green-700 text-white rounded text-[11px] hover:bg-green-800 font-medium"
                          >
                            Mark Verified
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

        {/* VIEW 4: Vacancies & Matching */}
        {activeSubPage === 'vacancies' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Placements › Vacancies</div>
                <h1 className="text-lg font-bold text-gray-800">Vacancies & Candidate Matching</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Vacancy ID</th>
                    <th className="py-2 px-3">Job Title</th>
                    <th className="py-2 px-3">Employer</th>
                    <th className="py-2 px-3">District</th>
                    <th className="py-2 px-3">Required Skill</th>
                    <th className="py-2 px-3">Monthly Pay (₹)</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{j.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{j.title}</td>
                      <td className="py-2 px-3 text-gray-700">{j.employer}</td>
                      <td className="py-2 px-3 text-gray-600">{j.district}</td>
                      <td className="py-2 px-3 text-gray-800 font-medium">{j.skill}</td>
                      <td className="py-2 px-3 font-semibold text-gray-900">
                        {j.salary ? `Rs. ${j.salary.toLocaleString()}` : '—'}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            j.status === 'Open'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {j.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => handleShowMatches(j)}
                          className="px-2 py-1 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px] font-medium"
                        >
                          Find Matches 🔍
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 5: Placement Drives & Admit Cards */}
        {activeSubPage === 'drives' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › Placements › Drives</div>
                <h1 className="text-lg font-bold text-gray-800">Placement Drives & Admit Card Generation</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">Drive ID</th>
                    <th className="py-2 px-3">Title</th>
                    <th className="py-2 px-3">Employer</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Mode</th>
                    <th className="py-2 px-3">Candidates</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Admit Card</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {drives.map((d) => (
                    <tr key={d.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{d.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{d.title}</td>
                      <td className="py-2 px-3 text-gray-700">{d.employer}</td>
                      <td className="py-2 px-3 text-gray-600">{d.date}</td>
                      <td className="py-2 px-3 text-gray-600">{d.mode}</td>
                      <td className="py-2 px-3 font-semibold text-gray-900">{d.candidatesCount}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                          {d.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() =>
                            setAdmitCardPreview({
                              show: true,
                              candidateName: 'Nikhil R',
                              candidateId: 'CAN-26004',
                              driveTitle: d.title,
                              date: d.date,
                            })
                          }
                          className="text-[#0078d4] hover:underline font-medium text-[11px]"
                        >
                          Preview Admit Card 📇
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
        {!['dashboard', 'talent', 'employers', 'vacancies', 'drives'].includes(activeSubPage) && (
          <div className="bg-white border border-gray-300 p-6 rounded-xs shadow-xs text-center">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              Placements Section: {activeSubPage.toUpperCase()}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              All master records and workflows are active and accessible via module navigation.
            </p>
            <button
              onClick={() => onNavigateSubPage('dashboard')}
              className="px-3.5 py-1.5 bg-[#0078d4] text-white rounded text-xs font-medium"
            >
              Return to Placements Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Matching Candidates Modal */}
      {matchingCandidates.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-400 shadow-xl w-full max-w-xl rounded-xs overflow-hidden">
            <div className="bg-[#004578] text-white px-5 py-3 flex justify-between items-center text-xs font-semibold">
              <span>Matching Candidates for: {matchingCandidates.jobTitle}</span>
              <button
                onClick={() => setMatchingCandidates({ show: false, jobTitle: '', skill: '', matches: [] })}
                className="text-white hover:text-gray-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div className="p-2.5 bg-blue-50 border border-blue-200 text-[11px] text-blue-900 rounded">
                Matched on required skill competency: <strong>{matchingCandidates.skill}</strong>
              </div>
              <div className="overflow-x-auto border border-gray-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 border-b border-gray-300">
                      <th className="py-2 px-3">Candidate ID</th>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">District</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {matchingCandidates.matches.length > 0 ? (
                      matchingCandidates.matches.map((c) => (
                        <tr key={c.id}>
                          <td className="py-2 px-3 font-mono text-[#0078d4]">{c.id}</td>
                          <td className="py-2 px-3 font-medium text-gray-900">{c.name}</td>
                          <td className="py-2 px-3 text-gray-600">{c.district}</td>
                          <td className="py-2 px-3">{c.status}</td>
                          <td className="py-2 px-3 text-right">
                            <button
                              onClick={() => {
                                onShowToast(`Candidate ${c.name} invited to interview pipeline`);
                                setMatchingCandidates({ show: false, jobTitle: '', skill: '', matches: [] });
                              }}
                              className="px-2 py-0.5 bg-[#0078d4] text-white rounded text-[11px]"
                            >
                              Invite to Drive
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                          No certified candidates match this criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setMatchingCandidates({ show: false, jobTitle: '', skill: '', matches: [] })}
                  className="px-4 py-1.5 border border-gray-300 bg-gray-100 rounded text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admit Card Preview Modal */}
      {admitCardPreview.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-400 shadow-xl w-full max-w-md rounded-xs overflow-hidden">
            <div className="bg-[#004578] text-white px-5 py-3 flex justify-between items-center text-xs font-semibold">
              <span>KASE ERP – Candidate Admit Card Preview</span>
              <button
                onClick={() =>
                  setAdmitCardPreview({ show: false, candidateName: '', candidateId: '', driveTitle: '', date: '' })
                }
                className="text-white hover:text-gray-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs bg-gray-50">
              <div className="border border-gray-300 p-4 bg-white rounded shadow-inner space-y-2">
                <div className="text-center pb-2 border-b border-gray-200">
                  <div className="font-bold text-[#004578] text-sm">
                    KERALA ACADEMY FOR SKILLS EXCELLENCE
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase">
                    Official Placement Drive Admit Card
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-500 block">Candidate Name:</span>
                    <strong className="text-gray-800">{admitCardPreview.candidateName}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Candidate ID:</span>
                    <strong className="font-mono text-[#0078d4]">{admitCardPreview.candidateId}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Drive:</span>
                    <span className="text-gray-800">{admitCardPreview.driveTitle}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Date & Venue:</span>
                    <span className="text-gray-800">{admitCardPreview.date} (KASE HQ)</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200 text-center font-mono text-[10px] text-gray-400">
                  REF: AC-2026-DRV-KASE-VERIFIED
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() =>
                    setAdmitCardPreview({ show: false, candidateName: '', candidateId: '', driveTitle: '', date: '' })
                  }
                  className="px-3 py-1.5 border border-gray-300 bg-white rounded text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-3 py-1.5 bg-[#0078d4] text-white rounded text-xs font-medium"
                >
                  Print Admit Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
