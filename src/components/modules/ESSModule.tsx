import React, { useState } from 'react';

interface ESSModuleProps {
  activeSubPage: string;
  onNavigateSubPage: (subPage: string) => void;
  onShowToast: (msg: string) => void;
  userRole?: string;
  userName?: string;
}

export const ESSModule: React.FC<ESSModuleProps> = ({
  activeSubPage,
  onNavigateSubPage,
  onShowToast,
  userRole,
  userName,
}) => {
  // Modal states
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showCompOffModal, setShowCompOffModal] = useState(false);

  // Form states
  const [leaveType, setLeaveType] = useState('Casual Leave (CL)');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  const [compDate, setCompDate] = useState('');
  const [compDays, setCompDays] = useState('1.0');
  const [compReason, setCompReason] = useState('');

  // Requisitions table data
  const [leaveHistory, setLeaveHistory] = useState([
    {
      reqNo: 'LV-2026-089',
      category: 'Comp-Off Credit Request',
      period: '11-Oct-2026 (Sunday)',
      days: '1.0',
      reason: 'IndiaSkills 2026 Duty',
      status: 'Pending Approval',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      reqNo: 'LV-2026-074',
      category: 'Casual Leave (CL)',
      period: '24-Sep-2026 to 25-Sep-2026',
      days: '2.0',
      reason: 'Personal Requirement',
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800 border-green-300',
    },
  ]);

  const [selectedPayslipMonth, setSelectedPayslipMonth] = useState('September 2026');

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveFrom || !leaveTo || !leaveReason) return;
    const newReq = {
      reqNo: `LV-2026-0${Math.floor(80 + Math.random() * 20)}`,
      category: leaveType,
      period: `${leaveFrom} to ${leaveTo}`,
      days: '1.0',
      reason: leaveReason,
      status: 'Submitted to HR',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
    };
    setLeaveHistory([newReq, ...leaveHistory]);
    setShowLeaveModal(false);
    setLeaveReason('');
    onShowToast(`Leave requisition submitted to HR Division (${newReq.reqNo})`);
  };

  const handleApplyCompOff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compDate || !compReason) return;
    const newReq = {
      reqNo: `CO-2026-0${Math.floor(20 + Math.random() * 30)}`,
      category: 'Comp-Off Credit Request',
      period: compDate,
      days: compDays,
      reason: compReason,
      status: 'Pending Approval',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
    };
    setLeaveHistory([newReq, ...leaveHistory]);
    setShowCompOffModal(false);
    setCompReason('');
    onShowToast(`Comp-Off request submitted for verification (${newReq.reqNo})`);
  };

  const handleDownloadPayslip = (period: string) => {
    onShowToast(`✔ Generating official KASE Payslip PDF for ${period} from ERP Payroll Ledger...`);
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#faf9f8] p-6 text-sm">
      {/* Subpage 1: Profile & Service Record */}
      {activeSubPage === 'profile' && (
        <section className="space-y-6 max-w-5xl">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">
                KASE ERP › Employee Self-Service › Profile & Service Record
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                Employee Profile & Service Details
              </h1>
            </div>
            <div className="text-xs bg-blue-50 border border-blue-200 text-[#004578] px-3 py-1 font-semibold rounded">
              Status: Active Employee
            </div>
          </div>

          {/* Top Profile Photo & Primary Badge */}
          <div className="bg-white border border-gray-300 p-5 shadow-xs flex items-center space-x-5">
            <div className="w-24 h-24 rounded border border-gray-300 bg-[#004578] text-white flex flex-col items-center justify-center font-bold text-xl shrink-0">
              <span>PHOTO</span>
              <span className="text-[10px] font-normal text-blue-200 mt-0.5">HR Verified</span>
            </div>
            <div className="text-sm space-y-0.5 flex-1">
              <div className="font-bold text-lg text-gray-900">Harikrishnan M.</div>
              <div className="text-[#0078d4] font-mono font-semibold">
                Employee ID: EMP-KASE-2116
              </div>
              <div className="text-gray-600">
                Executive - Operations & IT | KASE Headquarters
              </div>
              <div className="text-xs text-green-700 font-medium pt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span>
                Active Service
              </div>
            </div>
          </div>

          {/* Personal Profile Details & Service Record Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Personal Profile Details */}
            <div className="bg-white border border-gray-300 p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-4 border-b border-gray-200 pb-2 tracking-wide">
                1. Personal Profile Details
              </h3>
              <div className="space-y-3.5 text-sm">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Full Official Name</label>
                  <input
                    type="text"
                    value="Harikrishnan M."
                    disabled
                    className="readonly-field w-full px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Date of Birth</label>
                    <input
                      type="text"
                      value="14-May-1995"
                      disabled
                      className="readonly-field w-full px-3 py-1.5 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Blood Group</label>
                    <input
                      type="text"
                      value="O+ve"
                      disabled
                      className="readonly-field w-full px-3 py-1.5 rounded-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Official Email</label>
                  <input
                    type="text"
                    value="employee@kase.in"
                    disabled
                    className="readonly-field w-full px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Registered Mobile</label>
                  <input
                    type="text"
                    value="+91 98470 XXXXX"
                    disabled
                    className="readonly-field w-full px-3 py-1.5 rounded-xs"
                  />
                </div>
              </div>
            </div>

            {/* 2. Service Record & History */}
            <div className="bg-white border border-gray-300 p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-[#004578] mb-4 border-b border-gray-200 pb-2 tracking-wide">
                2. Service Record & History
              </h3>
              <div className="space-y-3.5 text-sm">
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Date of Joining</label>
                    <input
                      type="text"
                      value="24-Mar-2024"
                      disabled
                      className="readonly-field w-full px-3 py-1.5 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Employment Type</label>
                    <input
                      type="text"
                      value="Contract"
                      disabled
                      className="readonly-field w-full px-3 py-1.5 rounded-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Division / Department</label>
                  <input
                    type="text"
                    value="Operations, Strategy & IT (KASE HQ)"
                    disabled
                    className="readonly-field w-full px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Reporting Officer</label>
                  <input
                    type="text"
                    value="Manager Operations, Strategy and IT"
                    disabled
                    className="readonly-field w-full px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                    Service Milestones (HR Logged):
                  </label>
                  <div className="bg-[#f3f2f1] border border-gray-200 p-2.5 space-y-1.5 text-xs text-gray-700 rounded-xs">
                    <div>
                      <strong>01-Apr-2026:</strong> Annual Appraisal & Role Renewal
                    </div>
                    <div>
                      <strong>15-Jul-2025:</strong> Additional Charge - Executive IT (from June 2024)
                    </div>
                    <div>
                      <strong>24-Mar-2024:</strong> Initial Appointment at KASE HQ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Subpage 2: Leave & Comp-Off Management */}
      {activeSubPage === 'leave' && (
        <section className="space-y-6 max-w-6xl">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">
                KASE ERP › Employee Self-Service › Leave & Comp-Off
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                Leave Management & Comp-Off Requests
              </h1>
            </div>
            <div className="space-x-2.5">
              <button
                onClick={() => setShowLeaveModal(true)}
                className="px-3.5 py-1.5 text-xs bg-[#0078d4] text-white hover:bg-[#106ebe] rounded-xs font-medium shadow-xs"
              >
                + Apply Leave (CL / EL)
              </button>
              <button
                onClick={() => setShowCompOffModal(true)}
                className="px-3.5 py-1.5 text-xs bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 rounded-xs font-medium shadow-xs"
              >
                + Request Comp-Off Approval
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-300 p-5 shadow-xs">
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Current Leave Balances
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Click any cue tile or use the buttons above to submit a leave or Comp-Off requisition
              </p>
            </div>

            {/* 4 Stat Cue Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Leave */}
              <div className="nav-cue bg-[#f8f8f8] border border-gray-300 p-4 flex flex-col justify-between">
                <span className="text-xs text-gray-600 font-medium">Total Leave Available</span>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-3xl font-bold text-[#004578]">24.5</span>
                  <span className="text-xs text-gray-500 font-medium">Days (CL + EL)</span>
                </div>
              </div>

              {/* Casual Leave (CL) */}
              <div
                onClick={() => {
                  setLeaveType('Casual Leave (CL)');
                  setShowLeaveModal(true);
                }}
                className="nav-cue nav-cue-green bg-[#f8f8f8] border border-gray-300 p-4 flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 font-medium">Casual Leave (CL)</span>
                  <span className="text-[11px] text-[#0078d4] underline group-hover:text-blue-800">
                    Apply →
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-3xl font-bold text-gray-800">08.0</span>
                  <span className="text-xs text-gray-500">of 12 Days Left</span>
                </div>
              </div>

              {/* Earned Leave (EL) */}
              <div
                onClick={() => {
                  setLeaveType('Earned Leave (EL)');
                  setShowLeaveModal(true);
                }}
                className="nav-cue bg-[#f8f8f8] border border-gray-300 p-4 flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 font-medium">Earned Leave (EL)</span>
                  <span className="text-[11px] text-[#0078d4] underline group-hover:text-blue-800">
                    Apply →
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-3xl font-bold text-gray-800">16.5</span>
                  <span className="text-xs text-gray-500">Accrued Balance</span>
                </div>
              </div>

              {/* Compensatory Off (Comp-Off) */}
              <div
                onClick={() => setShowCompOffModal(true)}
                className="nav-cue nav-cue-amber bg-[#f8f8f8] border border-gray-300 p-4 flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 font-medium">Comp-Off Requests</span>
                  <span className="text-[11px] text-[#0078d4] underline group-hover:text-blue-800">
                    + Request →
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-3xl font-bold text-[#d83b01]">01</span>
                  <span className="text-xs text-amber-700 font-medium">Pending Approval</span>
                </div>
              </div>
            </div>

            {/* Recent Leave / Comp-Off Applications Sub-Table */}
            <div className="mt-6 border-t border-gray-200 pt-5">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                Recent Leave & Comp-Off Requisitions
              </div>
              <div className="overflow-x-auto border border-gray-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300 text-gray-600">
                      <th className="py-2 px-3 font-semibold">Req. No</th>
                      <th className="py-2 px-3 font-semibold">Category</th>
                      <th className="py-2 px-3 font-semibold">Period / Worked Date</th>
                      <th className="py-2 px-3 font-semibold">Days</th>
                      <th className="py-2 px-3 font-semibold">Reason</th>
                      <th className="py-2 px-3 font-semibold">HR / Reporting Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {leaveHistory.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/40">
                        <td className="py-2.5 px-3 font-mono font-semibold text-[#0078d4]">
                          {row.reqNo}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-gray-800">{row.category}</td>
                        <td className="py-2.5 px-3 text-gray-600">{row.period}</td>
                        <td className="py-2.5 px-3 text-gray-700">{row.days}</td>
                        <td className="py-2.5 px-3 text-gray-600">{row.reason}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${row.statusColor}`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Subpage 3: Attendance (Punch-In / Punch-Out Logs) */}
      {activeSubPage === 'attendance' && (
        <section className="space-y-6 max-w-5xl">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">
                KASE ERP › Employee Self-Service › Punch-In / Out Logs
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                Attendance: Punch-In & Punch-Out Details
              </h1>
            </div>
            <div className="text-xs text-gray-600 bg-gray-100 border border-gray-300 px-3 py-1 rounded">
              Biometric Terminal Sync: <strong className="text-gray-900">Today, 09:42 AM</strong>
            </div>
          </div>

          <div className="bg-white border border-gray-300 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  Biometric Punch Register
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Synced directly from KASE headquarters biometric attendance terminal
                </p>
              </div>
              <span className="text-xs bg-gray-100 border border-gray-300 px-3 py-1 text-gray-700 font-semibold rounded">
                Month: October 2026
              </span>
            </div>

            <div className="overflow-x-auto border border-gray-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-gray-600">
                    <th className="py-2.5 px-3.5 font-semibold">Date</th>
                    <th className="py-2.5 px-3.5 font-semibold">Punch-In</th>
                    <th className="py-2.5 px-3.5 font-semibold">Punch-Out</th>
                    <th className="py-2.5 px-3.5 font-semibold">Effective Hrs</th>
                    <th className="py-2.5 px-3.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="bg-blue-50/40">
                    <td className="py-2.5 px-3.5 font-medium text-gray-900">17-Oct-2026 (Today)</td>
                    <td className="py-2.5 px-3.5 font-mono text-green-700 font-bold">09:42 AM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-400">-- : --</td>
                    <td className="py-2.5 px-3.5 font-mono text-blue-700 font-medium">Active</td>
                    <td className="py-2.5 px-3.5">
                      <span className="text-[11px] bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded font-semibold border border-blue-200">
                        In Office
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 text-gray-800">16-Oct-2026</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">09:51 AM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">05:44 PM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">07h 53m</td>
                    <td className="py-2.5 px-3.5">
                      <span className="text-[11px] bg-green-100 text-green-800 px-2.5 py-0.5 rounded font-semibold border border-green-200">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 text-gray-800">15-Oct-2026</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">09:48 AM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">06:02 PM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">08h 14m</td>
                    <td className="py-2.5 px-3.5">
                      <span className="text-[11px] bg-green-100 text-green-800 px-2.5 py-0.5 rounded font-semibold border border-green-200">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 text-gray-800">14-Oct-2026</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">09:55 AM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">05:35 PM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">07h 40m</td>
                    <td className="py-2.5 px-3.5">
                      <span className="text-[11px] bg-green-100 text-green-800 px-2.5 py-0.5 rounded font-semibold border border-green-200">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 text-gray-800">11-Oct-2026 (Sun)</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">10:05 AM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">04:50 PM</td>
                    <td className="py-2.5 px-3.5 font-mono text-gray-700">06h 45m</td>
                    <td className="py-2.5 px-3.5">
                      <span className="text-[11px] bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded font-semibold border border-purple-200">
                        Holiday Duty
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Subpage 4: Monthly Payslips */}
      {activeSubPage === 'payslip' && (
        <section className="space-y-6 max-w-4xl">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">
                KASE ERP › Employee Self-Service › Monthly Payslips
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Monthly Payslip Download</h1>
            </div>
            <span className="text-xs bg-blue-50 text-[#004578] border border-blue-200 px-3 py-1 font-semibold rounded">
              PDF Verified
            </span>
          </div>

          <div className="bg-white border border-gray-300 p-5 shadow-xs space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Select Pay Period to Download:
              </label>
              <div className="flex space-x-2.5 max-w-lg">
                <select
                  value={selectedPayslipMonth}
                  onChange={(e) => setSelectedPayslipMonth(e.target.value)}
                  className="flex-1 text-xs border border-gray-300 px-3 py-2 bg-white rounded-xs focus:outline-none focus:border-[#0078d4]"
                >
                  <option value="September 2026">September 2026 (Disbursed)</option>
                  <option value="August 2026">August 2026 (Disbursed)</option>
                  <option value="July 2026">July 2026 (Disbursed)</option>
                  <option value="June 2026">June 2026 (Disbursed)</option>
                </select>
                <button
                  onClick={() => handleDownloadPayslip(selectedPayslipMonth)}
                  className="px-4 py-2 bg-[#0078d4] text-white text-xs font-medium hover:bg-[#106ebe] rounded-xs shadow-xs"
                >
                  ⬇ Download PDF
                </button>
              </div>
            </div>

            <div className="border border-gray-200 divide-y divide-gray-200 text-xs rounded-xs">
              {[
                { period: 'September 2026', days: 30, ref: 'PS-2026-09' },
                { period: 'August 2026', days: 31, ref: 'PS-2026-08' },
                { period: 'July 2026', days: 31, ref: 'PS-2026-07' },
                { period: 'June 2026', days: 30, ref: 'PS-2026-06' },
              ].map((item) => (
                <div
                  key={item.ref}
                  className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{item.period}</div>
                    <div className="text-gray-500 text-[11px] mt-0.5">
                      Paid Days: {item.days} | Document Ref: {item.ref} | Status: Disbursed via FICO
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadPayslip(item.period)}
                    className="text-[#0078d4] hover:underline font-medium text-xs flex items-center gap-1"
                  >
                    <span>⬇</span> Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MODAL 1: APPLY FOR LEAVE */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-400 shadow-xl w-full max-w-lg rounded-xs overflow-hidden">
            <div className="bg-[#004578] text-white px-5 py-3 flex justify-between items-center text-xs font-semibold">
              <span>New Leave Requisition (CL / EL)</span>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="text-white hover:text-gray-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleApplyLeave} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Leave Type *</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-3 py-1.5 bg-white rounded-xs"
                >
                  <option value="Casual Leave (CL)">Casual Leave (CL) — Available: 8.0 Days</option>
                  <option value="Earned Leave (EL)">Earned Leave (EL) — Available: 16.5 Days</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">From Date *</label>
                  <input
                    type="date"
                    required
                    value={leaveFrom}
                    onChange={(e) => setLeaveFrom(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">To Date *</label>
                  <input
                    type="date"
                    required
                    value={leaveTo}
                    onChange={(e) => setLeaveTo(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Reason for Leave *</label>
                <textarea
                  rows={2}
                  required
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Enter official reason for leave request..."
                  className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2.5 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-medium rounded-xs shadow-xs"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SUBMIT COMPENSATORY OFF (COMP-OFF) */}
      {showCompOffModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-400 shadow-xl w-full max-w-lg rounded-xs overflow-hidden">
            <div className="bg-[#004578] text-white px-5 py-3 flex justify-between items-center text-xs font-semibold">
              <span>Submit Compensatory Off (Comp-Off) for Approval</span>
              <button
                onClick={() => setShowCompOffModal(false)}
                className="text-white hover:text-gray-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleApplyCompOff} className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-200 text-[11px] text-blue-900 rounded-xs">
                Comp-Off requests are routed to your Reporting Officer and HR for verification
                against Holiday/Weekend Punch-In logs.
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Holiday / Date Worked *
                  </label>
                  <input
                    type="date"
                    required
                    value={compDate}
                    onChange={(e) => setCompDate(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Credit Days Requested *
                  </label>
                  <select
                    value={compDays}
                    onChange={(e) => setCompDays(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-1.5 bg-white rounded-xs"
                  >
                    <option value="1.0">1.0 Day (Full Day)</option>
                    <option value="0.5">0.5 Day (Half Day)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Official Duty / Assignment Details *
                </label>
                <textarea
                  rows={2}
                  required
                  value={compReason}
                  onChange={(e) => setCompReason(e.target.value)}
                  placeholder="E.g., Weekend deployment for IndiaSkills / Exam center inspection..."
                  className="w-full border border-gray-300 px-3 py-1.5 rounded-xs"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2.5 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCompOffModal(false)}
                  className="px-4 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-medium rounded-xs shadow-xs"
                >
                  Send for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
