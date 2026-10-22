import React, { useState } from 'react';

interface HRModuleProps {
  activeSubPage: string;
  onNavigateSubPage: (subPage: string) => void;
  onShowToast: (msg: string) => void;
  userRole?: string;
  userName?: string;
}

export const HRModule: React.FC<HRModuleProps> = ({
  activeSubPage,
  onNavigateSubPage,
  onShowToast,
  userRole,
  userName,
}) => {
  // Role: 'm' (HR Manager) or 'x' (HR Executive) based on logged in user
  const currentRole = userRole?.toLowerCase().includes('executive') ? 'x' : 'm';

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // Modal for eOffice confirmation
  const [eOfficeModal, setEOfficeModal] = useState<{
    show: boolean;
    title: string;
    targetId: string;
    actionName: string;
    fileNumber: string;
  }>({
    show: false,
    title: '',
    targetId: '',
    actionName: '',
    fileNumber: 'KASE/HR/2026/',
  });

  // Employee data
  const [employees, setEmployees] = useState([
    { id: 'EMP-KASE-0123', nm: 'Dr. Vinutha H M', ds: 'Senior Consultant & Manager (Curriculum)', dp: 'Curriculum Development', st: 'Active', doj: '15-Mar-2022', et: 'Contract' },
    { id: 'EMP-KASE-0124', nm: 'Shri. Subin Das S', ds: 'Manager (Operations, Strategy, IT & Admin)', dp: 'Operations & IT', st: 'Active', doj: '10-Jan-2021', et: 'Permanent' },
    { id: 'EMP-KASE-0125', nm: 'Smt. Reshmi M B', ds: 'Manager (HR and Placements)', dp: 'HR & Placements', st: 'Active', doj: '01-Apr-2022', et: 'Permanent' },
    { id: 'EMP-KASE-0126', nm: 'Shri. Anoop R', ds: 'Manager (Skill Development)', dp: 'Skill Development', st: 'Active', doj: '01-Feb-2023', et: 'Contract' },
    { id: 'EMP-KASE-0134', nm: 'Shri. Midhun M', ds: 'Senior Executive (Accounts)', dp: 'Accounts', st: 'Active', doj: '12-Jan-2024', et: 'Contract' },
    { id: 'EMP-KASE-0139', nm: 'Shri. Abhilash A J', ds: 'Executive (HR & Placements)', dp: 'HR & Placements', st: 'Active', doj: '15-Mar-2024', et: 'Contract' },
    { id: 'EMP-KASE-0142', nm: 'Shri. Harikrishnan M', ds: 'Executive (Operations, Strategy & IT)', dp: 'Operations & IT', st: 'Active', doj: '24-Mar-2024', et: 'Contract' },
    { id: 'EMP-KASE-0143', nm: 'Smt. Malavika S', ds: 'Executive (Curriculum Development)', dp: 'Curriculum Development', st: 'Active', doj: '02-Jun-2024', et: 'Contract' },
    { id: 'EMP-KASE-0144', nm: 'Smt. Nandana M', ds: 'Executive (CSS)', dp: 'CSS', st: 'Active', doj: '18-Feb-2024', et: 'Contract' },
    { id: 'EMP-KASE-0161', nm: 'Shri. Ratheesh Kumar V', ds: 'Driver', dp: 'Administration', st: 'Active', doj: '01-Aug-2020', et: 'Permanent' },
    { id: 'EMP-KASE-0164', nm: 'Shri. Sarath S', ds: 'Business Development Executive Kollam', dp: 'District Operations', st: 'Profile Incomplete', doj: '01-Oct-2026', et: 'Contract' },
  ]);

  // Leave requests
  const [leaves, setLeaves] = useState([
    { id: 'LV-2026-091', emp: 'Shri. Midhun M', ty: 'Earned Leave (EL)', fr: '20-Oct-2026', to: '22-Oct-2026', dy: '3.0', rs: 'Personal requirement', st: 'Approved by Manager' },
    { id: 'LV-2026-092', emp: 'Smt. Malavika S', ty: 'Casual Leave (CL)', fr: '23-Oct-2026', to: '23-Oct-2026', dy: '1.0', rs: 'Family function', st: 'Approved by Manager' },
    { id: 'LV-2026-093', emp: 'Smt. Nandana M', ty: 'Casual Leave (CL)', fr: '27-Oct-2026', to: '27-Oct-2026', dy: '1.0', rs: 'Personal requirement', st: 'Pending Manager Approval' },
    { id: 'LV-2026-086', emp: 'Smt. Nandana M', ty: 'Casual Leave (CL)', fr: '08-Oct-2026', to: '08-Oct-2026', dy: '1.0', rs: 'Personal requirement', st: 'Recorded' },
  ]);

  // Attendance Regularization
  const [regularizations, setRegularizations] = useState([
    { id: 'AR-2026-031', emp: 'Smt. Malavika S', dt: '13-Oct-2026', rs: 'Site visit – missed punch', st: 'With Reporting Manager' },
    { id: 'AR-2026-029', emp: 'Shri. Midhun M', dt: '09-Oct-2026', rs: 'Client meeting', st: 'Verified' },
    { id: 'AR-2026-027', emp: 'Smt. Nandana M', dt: '05-Oct-2026', rs: 'Exam centre visit', st: 'Updated' },
  ]);

  // Payroll Runs
  const [payrollRuns, setPayrollRuns] = useState([
    { id: 'PR-2026-09', pd: 'September 2026', ec: '142', gp: '57,90,000', np: '49,20,000', eo: 'KASE/HR/2026/101', st: 'Posted' },
    { id: 'PR-2026-10', pd: 'October 2026', ec: '—', gp: '—', np: '—', eo: '—', st: 'Open' },
  ]);

  // Training Nominations
  const [nominations, setNominations] = useState([
    { id: 'TN-2026-031', emp: 'Shri. Midhun M', pg: 'Data Analytics for MIS', nb: 'Shri. Aneesh R', bt: 'Batch 1', st: 'Nominated' },
    { id: 'TN-2026-032', emp: 'Smt. Malavika S', pg: 'Data Analytics for MIS', nb: 'Dr. Vinutha H M', bt: 'Batch 1', st: 'Nominated' },
    { id: 'TN-2026-028', emp: 'Smt. Nandana M', pg: 'eOffice Administration', nb: 'Smt. R K Lakshmi Priya', bt: 'Batch 1', st: 'Allocated' },
    { id: 'TN-2026-021', emp: 'Shri. Midhun M', pg: 'Tally Prime Advanced', nb: 'Shri. Aneesh R', bt: 'Batch 2', st: 'Completed' },
  ]);

  // Resignations
  const [resignations, setResignations] = useState([
    { id: 'RS-2026-007', emp: 'Shri. Sarath S', sb: '01-Oct-2026', ne: '31-Dec-2026', eo: '—', st: 'Submitted' },
    { id: 'RS-2026-005', emp: 'Shri. Arun T', sb: '15-Aug-2026', ne: '15-Nov-2026', eo: 'KASE/HR/2026/097', st: 'No Dues in Progress' },
  ]);

  // Action handlers
  const handleRecordDeductLeave = (id: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, st: 'Recorded' } : l))
    );
    onShowToast(`Leave ${id} recorded & balance deducted from employee ledger`);
  };

  const handleUpdateRegularization = (id: string) => {
    setRegularizations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, st: 'Updated' } : r))
    );
    onShowToast(`Attendance record ${id} updated from biometric sync`);
  };

  const handleConfirmEOffice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eOfficeModal.fileNumber) return;

    if (eOfficeModal.actionName === 'payroll_sanction') {
      setPayrollRuns((prev) =>
        prev.map((p) =>
          p.id === eOfficeModal.targetId
            ? { ...p, st: 'Sanctioned', eo: eOfficeModal.fileNumber }
            : p
        )
      );
      onShowToast(`Payroll run ${eOfficeModal.targetId} sanctioned under eOffice file ${eOfficeModal.fileNumber}`);
    } else if (eOfficeModal.actionName === 'accept_resignation') {
      setResignations((prev) =>
        prev.map((r) =>
          r.id === eOfficeModal.targetId
            ? { ...r, st: 'Accepted', eo: eOfficeModal.fileNumber }
            : r
        )
      );
      onShowToast(`Resignation ${eOfficeModal.targetId} approved with proceeding ${eOfficeModal.fileNumber}`);
    }

    setEOfficeModal({ show: false, title: '', targetId: '', actionName: '', fileNumber: '' });
  };

  const handlePostPayrollToFICO = (id: string) => {
    setPayrollRuns((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, st: 'Posted' } : p
      )
    );
    onShowToast(`Payroll advice ${id} posted to FICO – payslips published to ESS portal`);
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
              Signed In: <strong className="text-gray-900">{userName || (currentRole === 'm' ? 'Smt. Reshmi M B' : 'Shri. Abhilash A J')}</strong> ({userRole || (currentRole === 'm' ? 'HR Manager' : 'HR Executive')})
            </span>
          </div>
        </div>

        {/* Ribbon Action Buttons */}
        <div className="flex flex-wrap gap-2 items-center text-xs pt-1">
          <div className="flex space-x-1 border-r border-gray-300 pr-2">
            <button
              onClick={() => onShowToast('New record entry card opened in draft state')}
              className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center space-x-1"
            >
              <span className="text-green-700 font-bold">＋</span>
              <span>New</span>
            </button>
            <button
              onClick={() => onShowToast('Editing selected record')}
              className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center space-x-1"
            >
              <span className="text-[#0078d4]">✎</span>
              <span>Edit</span>
            </button>
          </div>

          <div className="flex space-x-1 border-r border-gray-300 pr-2">
            <button
              onClick={() => onShowToast('Biometric sync complete – 142 employee attendance logs verified')}
              className="px-2 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded text-[#004578] font-medium flex items-center space-x-1"
            >
              <span>▶</span>
              <span>Fetch Biometric Punches</span>
            </button>
            <button
              onClick={() => onShowToast('Appraisal forms dispatched to all eligible division heads')}
              className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-800 flex items-center space-x-1"
            >
              <span>▶</span>
              <span>Initiate Appraisal Cycle</span>
            </button>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => onShowToast('Exported active table to Microsoft Excel format (.xlsx)')}
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
        {/* VIEW 1: Role Center (Cues) */}
        {activeSubPage === 'role_center' && (
          <div className="space-y-5 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">
                  KASE ERP › HR Division › Role Center
                </div>
                <h1 className="text-lg font-bold text-gray-800">
                  {currentRole === 'm' ? 'HR Manager Role Center' : 'HR Executive Role Center'}
                </h1>
              </div>
              <div className="text-xs text-gray-600 bg-white border border-gray-300 px-3 py-1 rounded">
                Logged user: {currentRole === 'm' ? 'Smt. Reshmi M B' : 'Shri. Abhilash A J'}
              </div>
            </div>

            {/* Cues Grid: Employees */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-3">Employees</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div
                  onClick={() => onNavigateSubPage('emp')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Active Employees</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">38</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('emp')}
                  className="nav-cue nav-cue-amber bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Incomplete Profiles</span>
                  <div className="text-2xl font-bold text-[#d83b01] mt-2">03</div>
                </div>
              </div>
            </div>

            {/* Cues Grid: Leave & Attendance */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-3">Leave & Attendance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div
                  onClick={() => onNavigateSubPage('lv')}
                  className="nav-cue nav-cue-amber bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Leaves to Record</span>
                  <div className="text-2xl font-bold text-[#d83b01] mt-2">02</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('rg')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Regularizations to Update</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
              </div>
            </div>

            {/* Cues Grid: Training & Appraisal */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-3">Training & Appraisal</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div
                  onClick={() => onNavigateSubPage('tc')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Calendar Entries Open</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('tn')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Nominations to Allocate</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">02</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('ap')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Appraisals to Archive</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
              </div>
            </div>

            {/* Cues Grid: Payroll & Exit */}
            <div className="bg-white border border-gray-300 p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-3">Payroll & Exit Management</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div
                  onClick={() => onNavigateSubPage('pr')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Payroll Runs Open</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
                <div
                  onClick={() => onNavigateSubPage('rs')}
                  className="nav-cue bg-[#f8f8f8] border border-gray-300 p-3.5 cursor-pointer"
                >
                  <span className="text-xs text-gray-600 font-medium">Resignations to Accept</span>
                  <div className="text-2xl font-bold text-[#004578] mt-2">01</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Employees Master & Card */}
        {activeSubPage === 'emp' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › HR Division › Employees</div>
                <h1 className="text-lg font-bold text-gray-800">Employee Master Register</h1>
              </div>
              <span className="text-xs bg-blue-50 text-[#004578] border border-blue-200 px-3 py-1 font-semibold rounded">
                Total: {employees.length} Records
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-gray-600 font-semibold text-xs">Search:</label>
              <input
                type="text"
                placeholder="Search by name, ID, or designation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 px-3 py-1 bg-white rounded-xs text-xs w-72 focus:outline-none focus:border-[#0078d4]"
              />
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">No.</th>
                    <th className="py-2 px-3">Full Name</th>
                    <th className="py-2 px-3">Designation</th>
                    <th className="py-2 px-3">Department</th>
                    <th className="py-2 px-3">Date of Joining</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees
                    .filter(
                      (e) =>
                        !searchQuery ||
                        e.nm.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.ds.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((emp) => (
                      <tr
                        key={emp.id}
                        className={`hover:bg-blue-50/40 cursor-pointer ${
                          selectedRecordId === emp.id ? 'bg-[#cfe4f6]' : ''
                        }`}
                        onClick={() => setSelectedRecordId(emp.id)}
                      >
                        <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{emp.id}</td>
                        <td className="py-2 px-3 font-medium text-gray-900">{emp.nm}</td>
                        <td className="py-2 px-3 text-gray-700">{emp.ds}</td>
                        <td className="py-2 px-3 text-gray-600">{emp.dp}</td>
                        <td className="py-2 px-3 text-gray-600">{emp.doj}</td>
                        <td className="py-2 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                              emp.st === 'Active'
                                ? 'bg-green-100 text-green-800 border-green-300'
                                : 'bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            {emp.st}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onShowToast(`Opened Digital Service Book for ${emp.nm}`);
                            }}
                            className="text-[#0078d4] hover:underline font-medium text-[11px]"
                          >
                            Service Book ↗
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: Leave Requests */}
        {activeSubPage === 'lv' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › HR Division › Leave Requests</div>
                <h1 className="text-lg font-bold text-gray-800">Leave Requests & Sanctions</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">No.</th>
                    <th className="py-2 px-3">Employee</th>
                    <th className="py-2 px-3">Leave Type</th>
                    <th className="py-2 px-3">From</th>
                    <th className="py-2 px-3">To</th>
                    <th className="py-2 px-3">Days</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaves.map((l) => (
                    <tr key={l.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{l.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{l.emp}</td>
                      <td className="py-2 px-3 text-gray-700">{l.ty}</td>
                      <td className="py-2 px-3 text-gray-600">{l.fr}</td>
                      <td className="py-2 px-3 text-gray-600">{l.to}</td>
                      <td className="py-2 px-3 text-gray-700 font-semibold">{l.dy}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            l.st === 'Recorded'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : l.st === 'Approved by Manager'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {l.st}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {l.st === 'Approved by Manager' && currentRole === 'x' && (
                          <button
                            onClick={() => handleRecordDeductLeave(l.id)}
                            className="px-2 py-1 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px] font-medium"
                          >
                            Record & Deduct Balance
                          </button>
                        )}
                        {l.st === 'Pending Manager Approval' && currentRole === 'm' && (
                          <button
                            onClick={() => {
                              setLeaves((prev) =>
                                prev.map((x) =>
                                  x.id === l.id ? { ...x, st: 'Approved by Manager' } : x
                                )
                              );
                              onShowToast(`Leave request ${l.id} approved by Manager`);
                            }}
                            className="px-2 py-1 bg-green-700 text-white hover:bg-green-800 rounded text-[11px] font-medium"
                          >
                            Approve Leave
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

        {/* VIEW 4: Attendance Regularization */}
        {activeSubPage === 'rg' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">
                  KASE ERP › HR Division › Attendance Regularization
                </div>
                <h1 className="text-lg font-bold text-gray-800">Regularization Requests</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">No.</th>
                    <th className="py-2 px-3">Employee</th>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Reason</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {regularizations.map((r) => (
                    <tr key={r.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{r.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{r.emp}</td>
                      <td className="py-2 px-3 text-gray-600">{r.dt}</td>
                      <td className="py-2 px-3 text-gray-700">{r.rs}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            r.st === 'Updated'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : r.st === 'Verified'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {r.st}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {r.st === 'Verified' && currentRole === 'x' && (
                          <button
                            onClick={() => handleUpdateRegularization(r.id)}
                            className="px-2 py-1 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px] font-medium"
                          >
                            Update Attendance Record
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

        {/* VIEW 5: Payroll Runs */}
        {activeSubPage === 'pr' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › HR Division › Payroll Runs</div>
                <h1 className="text-lg font-bold text-gray-800">Payroll Runs & FICO Advice</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">No.</th>
                    <th className="py-2 px-3">Pay Period</th>
                    <th className="py-2 px-3">Employees</th>
                    <th className="py-2 px-3">Gross (₹)</th>
                    <th className="py-2 px-3">Net Payable (₹)</th>
                    <th className="py-2 px-3">eOffice No.</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payrollRuns.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{p.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{p.pd}</td>
                      <td className="py-2 px-3 text-gray-700">{p.ec}</td>
                      <td className="py-2 px-3 text-gray-800">{p.gp}</td>
                      <td className="py-2 px-3 text-gray-900 font-semibold">{p.np}</td>
                      <td className="py-2 px-3 font-mono text-gray-600">{p.eo}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            p.st === 'Posted'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : p.st === 'Sanctioned'
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {p.st}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right space-x-1">
                        {p.st === 'Open' && currentRole === 'x' && (
                          <button
                            onClick={() => {
                              setPayrollRuns((prev) =>
                                prev.map((item) =>
                                  item.id === p.id
                                    ? {
                                        ...item,
                                        st: 'Advice Generated',
                                        ec: '142',
                                        gp: '58,40,000',
                                        np: '49,70,000',
                                      }
                                    : item
                                )
                              );
                              onShowToast(`Payroll advice generated for ${p.pd}`);
                            }}
                            className="px-2 py-1 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px] font-medium"
                          >
                            Generate Advice
                          </button>
                        )}
                        {p.st === 'Advice Generated' && currentRole === 'm' && (
                          <button
                            onClick={() => {
                              setPayrollRuns((prev) =>
                                prev.map((item) =>
                                  item.id === p.id ? { ...item, st: 'Signed' } : item
                                )
                              );
                              onShowToast(`Payroll advice signed by HR Manager`);
                            }}
                            className="px-2 py-1 bg-blue-600 text-white hover:bg-blue-700 rounded text-[11px] font-medium"
                          >
                            Sign Advice
                          </button>
                        )}
                        {p.st === 'Signed' && currentRole === 'm' && (
                          <button
                            onClick={() =>
                              setEOfficeModal({
                                show: true,
                                title: 'Sanction Payroll with eOffice Proceeding',
                                targetId: p.id,
                                actionName: 'payroll_sanction',
                                fileNumber: 'KASE/HR/2026/102',
                              })
                            }
                            className="px-2 py-1 bg-amber-600 text-white hover:bg-amber-700 rounded text-[11px] font-medium"
                          >
                            Sanction with eOffice
                          </button>
                        )}
                        {p.st === 'Sanctioned' && currentRole === 'm' && (
                          <button
                            onClick={() => handlePostPayrollToFICO(p.id)}
                            className="px-2 py-1 bg-green-700 text-white hover:bg-green-800 rounded text-[11px] font-medium"
                          >
                            Post & Transmit to FICO
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

        {/* VIEW 6: Resignations & No Dues */}
        {activeSubPage === 'rs' && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between border-b border-gray-300 pb-2.5">
              <div>
                <div className="text-[11px] text-gray-500 mb-0.5">KASE ERP › HR Division › Resignations</div>
                <h1 className="text-lg font-bold text-gray-800">Resignation & No Dues Management</h1>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600 font-semibold">
                    <th className="py-2 px-3">No.</th>
                    <th className="py-2 px-3">Employee</th>
                    <th className="py-2 px-3">Submitted On</th>
                    <th className="py-2 px-3">Notice End Date</th>
                    <th className="py-2 px-3">eOffice Acceptance</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {resignations.map((r) => (
                    <tr key={r.id} className="hover:bg-blue-50/40">
                      <td className="py-2 px-3 font-mono text-[#0078d4] font-semibold">{r.id}</td>
                      <td className="py-2 px-3 font-medium text-gray-900">{r.emp}</td>
                      <td className="py-2 px-3 text-gray-600">{r.sb}</td>
                      <td className="py-2 px-3 text-gray-600">{r.ne}</td>
                      <td className="py-2 px-3 font-mono text-gray-600">{r.eo}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            r.st === 'No Dues Cleared'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : r.st === 'No Dues in Progress'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          {r.st}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {r.st === 'Submitted' && currentRole === 'm' && (
                          <button
                            onClick={() =>
                              setEOfficeModal({
                                show: true,
                                title: 'Accept Resignation with eOffice Proceeding',
                                targetId: r.id,
                                actionName: 'accept_resignation',
                                fileNumber: 'KASE/HR/2026/099',
                              })
                            }
                            className="px-2 py-1 bg-[#0078d4] text-white hover:bg-blue-700 rounded text-[11px] font-medium"
                          >
                            Accept Resignation
                          </button>
                        )}
                        {r.st === 'Accepted' && currentRole === 'x' && (
                          <button
                            onClick={() => {
                              setResignations((prev) =>
                                prev.map((item) =>
                                  item.id === r.id ? { ...item, st: 'No Dues in Progress' } : item
                                )
                              );
                              onShowToast(`No Dues clearance started for ${r.emp}`);
                            }}
                            className="px-2 py-1 bg-amber-600 text-white hover:bg-amber-700 rounded text-[11px] font-medium"
                          >
                            Start No Dues
                          </button>
                        )}
                        {r.st === 'No Dues in Progress' && currentRole === 'x' && (
                          <button
                            onClick={() => {
                              setResignations((prev) =>
                                prev.map((item) =>
                                  item.id === r.id ? { ...item, st: 'No Dues Cleared' } : item
                                )
                              );
                              onShowToast(`No Dues marked cleared for ${r.emp}`);
                            }}
                            className="px-2 py-1 bg-green-700 text-white hover:bg-green-800 rounded text-[11px] font-medium"
                          >
                            Mark No Dues Cleared
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

        {/* Fallback for other subpages */}
        {!['role_center', 'emp', 'lv', 'rg', 'pr', 'rs'].includes(activeSubPage) && (
          <div className="bg-white border border-gray-300 p-6 rounded-xs shadow-xs text-center">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              HR Module Section: {activeSubPage.toUpperCase()}
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

      {/* Confirmation Modal with eOffice file number */}
      {eOfficeModal.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-400 shadow-xl w-full max-w-md rounded-xs overflow-hidden">
            <div className="bg-[#004578] text-white px-5 py-3 flex justify-between items-center text-xs font-semibold">
              <span>{eOfficeModal.title}</span>
              <button
                onClick={() =>
                  setEOfficeModal({ show: false, title: '', targetId: '', actionName: '', fileNumber: '' })
                }
                className="text-white hover:text-gray-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleConfirmEOffice} className="p-5 space-y-4 text-xs">
              <p className="text-gray-700">
                Action target: <strong className="font-mono text-[#0078d4]">{eOfficeModal.targetId}</strong>
              </p>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  eOffice file / proceeding no. *
                </label>
                <input
                  type="text"
                  required
                  value={eOfficeModal.fileNumber}
                  onChange={(e) =>
                    setEOfficeModal({ ...eOfficeModal, fileNumber: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-1.5 rounded-xs font-mono"
                  placeholder="e.g. KASE/HR/2026/123"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    setEOfficeModal({ show: false, title: '', targetId: '', actionName: '', fileNumber: '' })
                  }
                  className="px-4 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-medium rounded-xs shadow-xs"
                >
                  Confirm & Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
