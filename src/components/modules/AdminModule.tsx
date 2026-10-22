import React, { useState } from 'react';

interface AdminModuleProps {
  activeSubPage: string;
  onNavigateSubPage: (subPage: string) => void;
  onShowToast: (msg: string) => void;
  userRole?: string;
  userName?: string;
}

interface Claim {
  id: string;
  employee: string;
  empId: string;
  division: string;
  purpose: string;
  from: string;
  to: string;
  start: string;
  end: string;
  rate: number;
  travel: number;
  other: number;
  amount: number;
  sanctionRef: string;
  exPostFacto: string;
  remarks: string;
  adminRemarks: string;
  proceeding: string;
  status: string;
  created: string;
  history: [string, string, string][];
}

interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  qty: number;
  reorder: number;
  location: string;
  value: number;
}

interface StockReq {
  id: string;
  requester: string;
  empId: string;
  date: string;
  status: string;
  lines: { item: string; qty: number }[];
  notes: string;
  adminRemarks: string;
  history: [string, string, string][];
}

interface LedgerEntry {
  date: string;
  item: string;
  type: string;
  qty: number;
  ref: string;
  location?: string;
  employee?: string;
  by: string;
}

interface OutwardEntry {
  id: string;
  date: string;
  recipient: string;
  address: string;
  subject: string;
  division: string;
  mode: string;
  ref: string;
  status: string;
}

interface BoardMember {
  id: string;
  name: string;
  designation: string;
  organisation: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  status: string;
}

interface BoardMeeting {
  id: string;
  no: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  status: string;
  agendaStatus: string;
  agenda: string[];
  mom: string;
  resolutions: { no: string; text: string }[];
}

interface MoMRecord {
  id: string;
  title: string;
  meeting: string;
  date: string;
  status: string;
  file: string;
  resolutions: { no: string; text: string }[];
}

type DetailState =
  | { type: 'claim'; id: string }
  | { type: 'req'; id: string }
  | { type: 'outward'; id: string }
  | { type: 'member'; id: string }
  | { type: 'meeting'; id: string }
  | { type: 'mom'; id: string }
  | null;

export const AdminModule: React.FC<AdminModuleProps> = ({
  activeSubPage,
  onNavigateSubPage,
  onShowToast,
  userRole,
  userName,
}) => {
  // Determine role: Administration Executive or Administration Manager
  const isManager = userRole?.toLowerCase().includes('manager') || false;
  const roleName = isManager ? 'Administration Manager' : 'Administration Executive';
  const roleShort = isManager ? 'Admin Manager' : 'Admin Executive';
  const roleKey = isManager ? 'manager' : 'exec';

  const dateToday = () =>
    new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const money = (n: number) => 'Rs. ' + Number(n || 0).toLocaleString('en-IN');

  // Active detail view state
  const [detail, setDetail] = useState<DetailState>(null);

  // Common Search & Filter inputs
  const [listSearch, setListSearch] = useState('');
  const [claimStatusFilter, setClaimStatusFilter] = useState('');

  // 1. T.A./D.A. Claims Data
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: 'TA-2026-018',
      employee: 'Smt. Nandana M',
      empId: 'EMP-KASE-0144',
      division: 'CSS',
      purpose: 'Official meeting at District Skill Centre',
      from: 'Thiruvananthapuram',
      to: 'Kollam',
      start: '2026-10-12',
      end: '2026-10-12',
      rate: 900,
      travel: 1240,
      other: 0,
      amount: 2140,
      sanctionRef: 'KASE/ADMIN/2026/092',
      exPostFacto: '',
      remarks: 'Journey completed as sanctioned.',
      adminRemarks: '',
      proceeding: '',
      status: 'Submitted',
      created: '16-Oct-2026',
      history: [['16-Oct-2026', 'Employee ESS', 'T.A./D.A. claim submitted with journey sanction.']],
    },
    {
      id: 'TA-2026-017',
      employee: 'Shri. Harikrishnan M',
      empId: 'EMP-KASE-0142',
      division: 'Operations, Strategy & IT',
      purpose: 'Network assessment visit',
      from: 'Thiruvananthapuram',
      to: 'Kozhikode',
      start: '2026-10-05',
      end: '2026-10-06',
      rate: 900,
      travel: 2850,
      other: 400,
      amount: 5950,
      sanctionRef: '',
      exPostFacto:
        'Urgent technical visit was undertaken to restore connectivity at the district office. Prior written sanction could not be obtained.',
      remarks: 'Ex-post facto brief attached.',
      adminRemarks: '',
      proceeding: '',
      status: 'Verified – Pending Manager Approval',
      created: '08-Oct-2026',
      history: [
        ['08-Oct-2026', 'Employee ESS', 'Claim submitted with ex-post facto justification.'],
        ['10-Oct-2026', 'Administration Executive', 'Claim verified and sent to Administration Manager for approval.'],
      ],
    },
    {
      id: 'TA-2026-016',
      employee: 'Smt. Malavika S',
      empId: 'EMP-KASE-0143',
      division: 'Curriculum Development',
      purpose: 'Course review meeting',
      from: 'Thiruvananthapuram',
      to: 'Thrissur',
      start: '2026-09-25',
      end: '2026-09-25',
      rate: 900,
      travel: 980,
      other: 0,
      amount: 1880,
      sanctionRef: 'KASE/ADMIN/2026/071',
      exPostFacto: '',
      remarks: 'Claim verified and approved.',
      adminRemarks: '',
      proceeding: 'KASE/MD/2026/301',
      status: 'Approved – ESS & FICO',
      created: '29-Sep-2026',
      history: [
        ['29-Sep-2026', 'Employee ESS', 'Claim submitted.'],
        ['01-Oct-2026', 'Administration Executive', 'Claim verified.'],
        ['03-Oct-2026', 'Administration Manager', 'Approved and reflected in Employee ESS and Finance / FICO.'],
      ],
    },
    {
      id: 'TA-2026-015',
      employee: 'Shri. Midhun M',
      empId: 'EMP-KASE-0134',
      division: 'Accounts',
      purpose: 'Official meeting',
      from: 'Thiruvananthapuram',
      to: 'Ernakulam',
      start: '2026-09-11',
      end: '2026-09-11',
      rate: 900,
      travel: 1150,
      other: 0,
      amount: 2050,
      sanctionRef: 'KASE/ADMIN/2026/064',
      exPostFacto: '',
      remarks: 'Approved claim proceeding uploaded; payment being processed.',
      adminRemarks: '',
      proceeding: 'KASE/MD/2026/289',
      status: 'Finance Processing',
      created: '15-Sep-2026',
      history: [
        ['15-Sep-2026', 'Employee ESS', 'Claim submitted.'],
        ['17-Sep-2026', 'Administration Executive', 'Verified and moved to D.A. Register.'],
        ['19-Sep-2026', 'Administration Manager', 'Approved and routed to Finance / FICO.'],
      ],
    },
    {
      id: 'TA-2026-014',
      employee: 'Smt. Reshmi M B',
      empId: 'EMP-KASE-0125',
      division: 'HR and Placements',
      purpose: 'Employer consultation',
      from: 'Thiruvananthapuram',
      to: 'Palakkad',
      start: '2026-08-21',
      end: '2026-08-22',
      rate: 900,
      travel: 2180,
      other: 500,
      amount: 4480,
      sanctionRef: 'KASE/ADMIN/2026/051',
      exPostFacto: '',
      remarks: 'Payment completed.',
      adminRemarks: '',
      proceeding: 'KASE/MD/2026/260',
      status: 'Paid',
      created: '25-Aug-2026',
      history: [
        ['25-Aug-2026', 'Employee ESS', 'Claim submitted.'],
        ['28-Aug-2026', 'Administration Executive', 'Verified.'],
        ['30-Aug-2026', 'Administration Manager', 'Approved and synced to ESS/FICO.'],
        ['03-Sep-2026', 'Finance', 'Payment processed.'],
      ],
    },
    {
      id: 'TA-2026-019',
      employee: 'Shri. Abhilash A J',
      empId: 'EMP-KASE-0139',
      division: 'HR & Placements',
      purpose: 'District office visit',
      from: 'Thiruvananthapuram',
      to: 'Kottayam',
      start: '2026-10-15',
      end: '2026-10-15',
      rate: 900,
      travel: 760,
      other: 0,
      amount: 1660,
      sanctionRef: '',
      exPostFacto: '',
      remarks: 'Journey sanction or ex-post facto brief is required.',
      adminRemarks: '',
      proceeding: '',
      status: 'Returned for Correction',
      created: '16-Oct-2026',
      history: [['16-Oct-2026', 'Administration Executive', 'Returned for correction.']],
    },
  ]);

  // 2. Inventory Items Data
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'STK-001', name: 'A4 Copier Paper – Ream', unit: 'Ream', qty: 124, reorder: 30, location: 'Central Store', value: 285 },
    { id: 'STK-002', name: 'Blue Ballpoint Pens', unit: 'Nos.', qty: 86, reorder: 40, location: 'Central Store', value: 12 },
    { id: 'STK-003', name: 'Office File Cover – Green', unit: 'Nos.', qty: 210, reorder: 50, location: 'Central Store', value: 18 },
    { id: 'STK-004', name: 'Laser Printer Toner Cartridge', unit: 'Nos.', qty: 12, reorder: 6, location: 'IT / Admin Store', value: 2850 },
    { id: 'STK-005', name: 'Official Envelopes – A4', unit: 'Pack', qty: 175, reorder: 40, location: 'Central Store', value: 95 },
    { id: 'STK-006', name: 'Stapler Pins – Box', unit: 'Box', qty: 28, reorder: 30, location: 'Central Store', value: 22 },
  ]);

  // 3. Stock Requisitions Data
  const [reqs, setReqs] = useState<StockReq[]>([
    {
      id: 'SR-2026-021',
      requester: 'Smt. Nandana M',
      empId: 'EMP-KASE-0144',
      date: '16-Oct-2026',
      status: 'Submitted from ESS',
      lines: [
        { item: 'STK-001', qty: 12 },
        { item: 'STK-002', qty: 20 },
        { item: 'STK-003', qty: 15 },
      ],
      notes: 'Stationery required for official work.',
      adminRemarks: '',
      history: [['16-Oct-2026', 'Employee ESS', 'Stock request submitted.']],
    },
    {
      id: 'SR-2026-020',
      requester: 'Shri. Harikrishnan M',
      empId: 'EMP-KASE-0142',
      date: '14-Oct-2026',
      status: 'Recommended by Administration Executive',
      lines: [
        { item: 'STK-001', qty: 20 },
        { item: 'STK-004', qty: 2 },
      ],
      notes: 'Office and network support.',
      adminRemarks: 'Required for operational support.',
      history: [
        ['14-Oct-2026', 'Employee ESS', 'Stock request submitted.'],
        ['15-Oct-2026', 'Administration Executive', 'Allocation recommended. Remarks: Required for operational support.'],
      ],
    },
    {
      id: 'SR-2026-019',
      requester: 'Shri. Midhun M',
      empId: 'EMP-KASE-0134',
      date: '10-Oct-2026',
      status: 'Approved by Administration Manager',
      lines: [
        { item: 'STK-001', qty: 8 },
        { item: 'STK-005', qty: 10 },
      ],
      notes: 'Quarterly requirement.',
      adminRemarks: '',
      history: [
        ['10-Oct-2026', 'Employee ESS', 'Stock request submitted.'],
        ['11-Oct-2026', 'Administration Executive', 'Recommended.'],
        ['12-Oct-2026', 'Administration Manager', 'Approved allocation.'],
      ],
    },
    {
      id: 'SR-2026-018',
      requester: 'Shri. Anoop R',
      empId: 'EMP-KASE-0126',
      date: '06-Oct-2026',
      status: 'Issued',
      lines: [
        { item: 'STK-002', qty: 10 },
        { item: 'STK-003', qty: 25 },
      ],
      notes: 'Routine stationery issue.',
      adminRemarks: '',
      history: [
        ['06-Oct-2026', 'Employee ESS', 'Stock request submitted.'],
        ['07-Oct-2026', 'Administration Manager', 'Approved.'],
        ['08-Oct-2026', 'Administration Executive', 'Stock issued and ledger updated.'],
      ],
    },
  ]);

  // 4. Inventory Movement Ledger Data
  const [ledger, setLedger] = useState<LedgerEntry[]>([
    { date: '17-Oct-2026', item: 'A4 Copier Paper – Ream', type: 'Stock Inflow', qty: 40, ref: 'GRN-2026-044', location: 'Central Store', by: 'Administration Executive' },
    { date: '16-Oct-2026', item: 'Blue Ballpoint Pens', type: 'Distribution', qty: -12, ref: 'SR-2026-018', employee: 'Shri. Anoop R', by: 'Administration Executive' },
    { date: '15-Oct-2026', item: 'Laser Printer Toner Cartridge', type: 'Distribution', qty: -2, ref: 'SR-2026-016', employee: 'Shri. Harikrishnan M', by: 'Administration Executive' },
    { date: '10-Oct-2026', item: 'Official Envelopes – A4', type: 'Stock Inflow', qty: 50, ref: 'GRN-2026-039', location: 'Central Store', by: 'Administration Executive' },
  ]);

  // 5. Outward Register Data
  const [outward, setOutward] = useState<OutwardEntry[]>([
    { id: 'OUT-2026-184', date: '17-Oct-2026', recipient: 'Director, Employment', address: 'Thiruvananthapuram', subject: 'Forwarding of quarterly skill development report', division: 'Skill Development', mode: 'Email + Special Messenger', ref: 'KASE/SD/2026/184', status: 'Dispatched' },
    { id: 'OUT-2026-183', date: '16-Oct-2026', recipient: 'The Principal Secretary, Labour & Skills Department', address: 'Government Secretariat, Thiruvananthapuram', subject: 'Submission of project progress statement', division: 'Projects', mode: 'eOffice / Email', ref: 'KASE/PROJ/2026/261', status: 'Dispatched' },
    { id: 'OUT-2026-182', date: '15-Oct-2026', recipient: 'Kerala State IT Mission', address: 'Thiruvananthapuram', subject: 'Request for technical coordination meeting', division: 'Operations, Strategy & IT', mode: 'Email', ref: 'KASE/IT/2026/151', status: 'Ready for Dispatch' },
  ]);

  // 6. Board Members Data
  const [members, setMembers] = useState<BoardMember[]>([
    { id: 'BM-001', name: 'Board Member A', designation: 'Chairperson', organisation: 'Government of Kerala', email: 'chairperson@example.invalid', phone: '—', from: '2024-06-01', to: '2027-05-31', status: 'Active' },
    { id: 'BM-002', name: 'Board Member B', designation: 'Member', organisation: 'Government Nominee', email: 'member.b@example.invalid', phone: '—', from: '2024-06-01', to: '2027-05-31', status: 'Active' },
    { id: 'BM-003', name: 'Board Member C', designation: 'Member', organisation: 'Industry Representative', email: 'member.c@example.invalid', phone: '—', from: '2025-01-15', to: '2028-01-14', status: 'Active' },
    { id: 'BM-004', name: 'Former Board Member D', designation: 'Former Member', organisation: 'Former Nominee', email: 'former.d@example.invalid', phone: '—', from: '2021-06-01', to: '2024-05-31', status: 'Former' },
  ]);

  // 7. Board Meetings Data
  const [meetings, setMeetings] = useState<BoardMeeting[]>([
    {
      id: 'BM-2026-042',
      no: '42',
      title: '42nd Meeting of the Board of Directors',
      date: '2026-11-12',
      time: '11:00',
      venue: 'KASE Head Office, Thiruvananthapuram',
      status: 'Scheduled',
      agendaStatus: 'Draft',
      agenda: ['Confirmation of minutes of the previous meeting', 'Review of ongoing skill park projects', 'Consideration of revised annual action plan'],
      mom: '',
      resolutions: [],
    },
    {
      id: 'BM-2026-041',
      no: '41',
      title: '41st Meeting of the Board of Directors',
      date: '2026-08-18',
      time: '11:30',
      venue: 'KASE Head Office',
      status: 'Completed',
      agendaStatus: 'Finalised',
      agenda: ['Approval of previous minutes', 'Review of project expenditure'],
      mom: 'MoM-BM-2026-041.pdf',
      resolutions: [
        { no: '41/1', text: 'The minutes of the previous meeting were confirmed.' },
        { no: '41/2', text: 'The project progress statement was noted.' },
      ],
    },
  ]);

  // 8. Minutes of Meetings & Resolutions
  const [momRecords] = useState<MoMRecord[]>([
    {
      id: 'MOM-2026-041',
      title: 'Minutes – 41st Board Meeting',
      meeting: 'BM-2026-041',
      date: '18-Aug-2026',
      status: 'Finalised',
      file: 'MoM-BM-2026-041.pdf',
      resolutions: [
        { no: '41/1', text: 'The minutes of the previous meeting were confirmed.' },
        { no: '41/2', text: 'The project progress statement was noted.' },
      ],
    },
  ]);

  // Selected meeting in Agenda Collaboration
  const [agendaMeetingId, setAgendaMeetingId] = useState('BM-2026-042');

  // Modal Dialogs State
  const [modalType, setModalType] = useState<
    'remarks' | 'stockInflow' | 'outward' | 'member' | 'meeting' | null
  >(null);

  // Mandatory Remarks Modal payload
  const [pendingRemarksAction, setPendingRemarksAction] = useState<{
    targetType: 'claim' | 'req';
    id: string;
    action: string;
    title: string;
    instruction: string;
  } | null>(null);
  const [actionRemarksText, setActionRemarksText] = useState('');
  const [actionRemarksError, setActionRemarksError] = useState('');

  // Stock Inflow Modal form state
  const [inflowItem, setInflowItem] = useState('STK-001');
  const [inflowQty, setInflowQty] = useState(1);
  const [inflowRef, setInflowRef] = useState('');
  const [inflowLoc, setInflowLoc] = useState('Central Store');

  // New Outward Modal form state
  const [outwardRecipient, setOutwardRecipient] = useState('');
  const [outwardAddress, setOutwardAddress] = useState('');
  const [outwardDate, setOutwardDate] = useState(new Date().toISOString().slice(0, 10));
  const [outwardSubject, setOutwardSubject] = useState('');
  const [outwardDivision, setOutwardDivision] = useState('Administration');
  const [outwardMode, setOutwardMode] = useState('Email');
  const [outwardRef, setOutwardRef] = useState('');

  // New Member Modal form state
  const [memName, setMemName] = useState('');
  const [memDes, setMemDes] = useState('');
  const [memOrg, setMemOrg] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [memPhone, setMemPhone] = useState('');
  const [memFrom, setMemFrom] = useState('');
  const [memTo, setMemTo] = useState('');

  // New Meeting Modal form state
  const [mtNo, setMtNo] = useState('43');
  const [mtTitle, setMtTitle] = useState('Meeting of the Board of Directors');
  const [mtDate, setMtDate] = useState('');
  const [mtTime, setMtTime] = useState('11:00');
  const [mtVenue, setMtVenue] = useState('KASE Head Office, Thiruvananthapuram');

  const itemById = (id: string) =>
    inventory.find((i) => i.id === id) || { id, name: id, unit: 'Nos.', qty: 0, reorder: 0, location: '', value: 0 };

  const badge = (s: string) => {
    let c = 'bg-[#fff4ce] text-[#835b00]'; // default amber/pending
    if (/Approved|Paid|Dispatched|Issued|Active|Finalised|Completed/.test(s)) {
      c = 'bg-[#dff6dd] text-[#0b6a0b]';
    } else if (/Returned|Correction|Rejected|Urgent|Reorder/.test(s)) {
      c = 'bg-[#fde7e9] text-[#a4262c]';
    } else if (/Verified|Processing|Recommended|Scheduled|Submitted|Draft|Awaiting/.test(s)) {
      c = 'bg-[#fff4ce] text-[#835b00]';
    } else {
      c = 'bg-[#deecf9] text-[#004578]';
    }
    return <span className={`inline-block px-2 py-0.5 font-semibold text-[11px] whitespace-nowrap rounded ${c}`}>{s}</span>;
  };

  // Claim Workflow Actions
  const handleClaimVerify = (id: string) => {
    const c = claims.find((x) => x.id === id);
    if (!c) return;
    if (!c.sanctionRef && !c.exPostFacto) {
      onShowToast('A journey sanction reference or ex-post facto justification is required.');
      return;
    }
    setClaims((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Verified – Pending Manager Approval',
              history: [...item.history, [dateToday(), roleName, 'Claim verified and sent to Administration Manager for approval.']],
            }
          : item
      )
    );
    onShowToast('Claim verified and sent to Administration Manager.');
  };

  const handleClaimApprove = (id: string) => {
    setClaims((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Approved – ESS & FICO',
              history: [
                ...item.history,
                [dateToday(), roleName, 'Claim approved. The approved claim is reflected in Employee ESS and Finance / FICO.'],
              ],
            }
          : item
      )
    );
    onShowToast('Claim approved and reflected in ESS & FICO.');
  };

  const handleClaimReturn = (id: string) => {
    setPendingRemarksAction({
      targetType: 'claim',
      id,
      action: 'return',
      title: 'Return Claim to Employee ESS',
      instruction: 'Specify the corrections, missing information or supporting documents required from the employee.',
    });
    setActionRemarksText('');
    setActionRemarksError('');
    setModalType('remarks');
  };

  // Stock Req Workflow Actions
  const handleReqRecommend = (id: string) => {
    setPendingRemarksAction({
      targetType: 'req',
      id,
      action: 'recommend',
      title: 'Recommend Stock Allocation',
      instruction: 'Record the basis for recommending allocation from available company stock.',
    });
    setActionRemarksText('');
    setActionRemarksError('');
    setModalType('remarks');
  };

  const handleReqApprove = (id: string) => {
    setClaims((prev) => prev); // trigger
    setReqs((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Approved by Administration Manager',
              history: [...r.history, [dateToday(), roleName, 'Stock allocation approved by Administration Manager.']],
            }
          : r
      )
    );
    onShowToast('Stock request approved.');
  };

  const handleReqReturn = (id: string) => {
    setPendingRemarksAction({
      targetType: 'req',
      id,
      action: 'return',
      title: 'Return Stock Request',
      instruction: 'Specify why the request is being returned and what must be corrected or clarified.',
    });
    setActionRemarksText('');
    setActionRemarksError('');
    setModalType('remarks');
  };

  const handleReqIssue = (id: string) => {
    const r = reqs.find((x) => x.id === id);
    if (!r) return;
    for (const l of r.lines) {
      if (itemById(l.item).qty < l.qty) {
        onShowToast(`Insufficient available stock for ${itemById(l.item).name}.`);
        return;
      }
    }

    // Deduct stock and record in ledger
    setInventory((prev) =>
      prev.map((inv) => {
        const line = r.lines.find((l) => l.item === inv.id);
        if (line) {
          return { ...inv, qty: inv.qty - Number(line.qty) };
        }
        return inv;
      })
    );

    const newLedgerEntries: LedgerEntry[] = r.lines.map((l) => ({
      date: dateToday(),
      item: itemById(l.item).name,
      type: 'Distribution',
      qty: -Number(l.qty),
      ref: r.id,
      employee: r.requester,
      by: roleName,
    }));

    setLedger((prev) => [...newLedgerEntries, ...prev]);

    setReqs((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Issued',
              history: [...item.history, [dateToday(), roleName, 'Stock issued to employee; inventory ledger updated.']],
            }
          : item
      )
    );
    onShowToast('Stock issued to employee; inventory ledger updated.');
  };

  // Submit Remarks Modal
  const submitActionRemarks = () => {
    const rem = actionRemarksText.trim();
    if (!rem) {
      setActionRemarksError('Remarks are required to continue.');
      return;
    }
    if (!pendingRemarksAction) return;

    if (pendingRemarksAction.targetType === 'claim') {
      const { id } = pendingRemarksAction;
      setClaims((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: 'Returned for Correction',
                adminRemarks: rem,
                history: [...c.history, [dateToday(), roleName, 'Claim returned to Employee ESS. Remarks: ' + rem]],
              }
            : c
        )
      );
      onShowToast('Claim returned for correction.');
    } else {
      const { id, action } = pendingRemarksAction;
      if (action === 'recommend') {
        const r = reqs.find((x) => x.id === id);
        if (r) {
          for (const l of r.lines) {
            if (itemById(l.item).qty < l.qty) {
              onShowToast('Insufficient stock for ' + itemById(l.item).name + '.');
              return;
            }
          }
        }
        setReqs((prev) =>
          prev.map((req) =>
            req.id === id
              ? {
                  ...req,
                  status: 'Recommended by Administration Executive',
                  adminRemarks: rem,
                  history: [...req.history, [dateToday(), roleName, 'Allocation recommended. Remarks: ' + rem]],
                }
              : req
          )
        );
        onShowToast('Stock request recommended to Manager.');
      } else if (action === 'return') {
        setReqs((prev) =>
          prev.map((req) =>
            req.id === id
              ? {
                  ...req,
                  status: 'Returned to Employee ESS',
                  adminRemarks: rem,
                  history: [...req.history, [dateToday(), roleName, 'Stock request returned to employee. Remarks: ' + rem]],
                }
              : req
          )
        );
        onShowToast('Stock request returned to employee.');
      }
    }

    setModalType(null);
    setPendingRemarksAction(null);
  };

  // Submit Stock Inflow
  const handleSaveStockInflow = () => {
    const item = itemById(inflowItem);
    const qty = Number(inflowQty);
    const ref = inflowRef.trim() || 'GRN-' + Date.now();
    const loc = inflowLoc.trim() || item.location;

    if (qty < 1) {
      onShowToast('Quantity must be greater than zero.');
      return;
    }

    setInventory((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty, location: loc } : i))
    );

    setLedger((prev) => [
      {
        date: dateToday(),
        item: item.name,
        type: 'Stock Inflow',
        qty,
        ref,
        location: loc,
        by: roleName,
      },
      ...prev,
    ]);

    setModalType(null);
    onShowToast('Stock inflow recorded and ledger updated.');
  };

  // Submit New Outward
  const handleSaveOutward = () => {
    const rec = outwardRecipient.trim();
    const sub = outwardSubject.trim();
    if (!rec || !sub) {
      onShowToast('Recipient and subject are required.');
      return;
    }
    const newId = 'OUT-2026-' + String(185 + outward.length - 3).padStart(3, '0');
    setOutward((prev) => [
      {
        id: newId,
        date: outwardDate || dateToday(),
        recipient: rec,
        address: outwardAddress,
        subject: sub,
        division: outwardDivision,
        mode: outwardMode,
        ref: outwardRef,
        status: 'Ready for Dispatch',
      },
      ...prev,
    ]);
    setModalType(null);
    setOutwardRecipient('');
    setOutwardAddress('');
    setOutwardSubject('');
    setOutwardRef('');
    onShowToast('Outward register entry created.');
  };

  // Submit New Board Member
  const handleSaveMember = () => {
    const name = memName.trim();
    if (!name) {
      onShowToast('Enter the member name.');
      return;
    }
    const newId = 'BM-' + String(members.length + 1).padStart(3, '0');
    setMembers((prev) => [
      {
        id: newId,
        name,
        designation: memDes,
        organisation: memOrg,
        email: memEmail,
        phone: memPhone,
        from: memFrom,
        to: memTo,
        status: 'Active',
      },
      ...prev,
    ]);
    setModalType(null);
    setMemName('');
    setMemDes('');
    setMemOrg('');
    setMemEmail('');
    setMemPhone('');
    onShowToast('Board Member profile saved.');
  };

  // Submit New Meeting
  const handleSaveMeeting = () => {
    const title = mtTitle.trim();
    const date = mtDate;
    if (!title || !date) {
      onShowToast('Meeting title and date are required.');
      return;
    }
    const newId = 'BM-2026-' + String(43 + meetings.length - 2).padStart(3, '0');
    const newMeeting: BoardMeeting = {
      id: newId,
      no: mtNo,
      title,
      date,
      time: mtTime,
      venue: mtVenue,
      status: 'Scheduled',
      agendaStatus: 'Draft',
      agenda: [],
      mom: '',
      resolutions: [],
    };
    setMeetings((prev) => [newMeeting, ...prev]);
    setAgendaMeetingId(newId);
    setModalType(null);
    onShowToast('Meeting scheduled.');
  };

  // Agenda Collaboration
  const currentAgendaMeeting = meetings.find((m) => m.id === agendaMeetingId) || meetings[0];
  const isAgendaFinalised = currentAgendaMeeting?.agendaStatus === 'Finalised';

  const handleUpdateAgendaItem = (index: number, val: string) => {
    if (isAgendaFinalised) return;
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === agendaMeetingId
          ? {
              ...m,
              agenda: m.agenda.map((a, i) => (i === index ? val : a)),
            }
          : m
      )
    );
  };

  const handleAddAgendaItem = () => {
    if (isAgendaFinalised) {
      onShowToast('This agenda is finalised and cannot be edited.');
      return;
    }
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === agendaMeetingId
          ? { ...m, agenda: [...m.agenda, 'New agenda item'] }
          : m
      )
    );
    onShowToast('Agenda item added.');
  };

  const handleFinaliseAgenda = () => {
    if (isAgendaFinalised) {
      onShowToast('This agenda is already finalised and locked.');
      return;
    }
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === agendaMeetingId ? { ...m, agendaStatus: 'Finalised' } : m
      )
    );
    onShowToast('Agenda finalised. Editing is now locked.');
  };

  const handleDistributeAgenda = () => {
    if (!isAgendaFinalised) {
      onShowToast('Finalise the agenda before distributing it.');
      return;
    }
    onShowToast('Agenda distribution simulated to Board Portal members.');
  };

  // Export CSV
  const handleExportCSV = (filename = 'KASE-Administration-Register.csv') => {
    const tableEl = document.querySelector('#admin-content-area table');
    if (!tableEl) {
      onShowToast('No table data to export.');
      return;
    }
    const rows = Array.from(tableEl.querySelectorAll('tr')).map((tr) =>
      Array.from(tr.children)
        .map((td) => '"' + (td.textContent || '').replace(/"/g, '""') + '"')
        .join(',')
    ).join('\r\n');

    const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Register exported as CSV.');
  };

  // Subpage titles
  const titles: Record<string, string> = {
    home: 'Administration Dashboard',
    claims: 'T.A./D.A. Claims',
    daRegister: 'Digital D.A. Register',
    requisitions: 'Stock Requisitions',
    inventory: 'Inventory Ledger',
    outward: 'Outward Register',
    members: 'Board Members',
    meetings: 'Meetings & Agenda',
    agenda: 'Agenda Collaboration',
    mom: 'MoM & Resolutions',
  };

  const currentTitle = detail
    ? detail.type === 'claim'
      ? 'T.A./D.A. Claim'
      : detail.type === 'req'
      ? 'Employee Stock Request'
      : detail.type === 'outward'
      ? 'Outward Communication'
      : detail.type === 'member'
      ? 'Board Member'
      : detail.type === 'meeting'
      ? 'Board Meeting'
      : 'Minutes of Meeting'
    : titles[activeSubPage] || 'Administration';

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f3f2f1] text-[#201f1e] overflow-hidden select-none font-sans">
      {/* 1. Module Breadcrumb & Title Bar */}
      <div className="bg-white px-4 py-2 border-b border-[#d2d0ce] min-h-[50px] flex items-center justify-between shrink-0">
        <div>
          <div className="text-[11px] text-[#605e5c]">
            KASE ERP › Administration › {currentTitle}
          </div>
          <h1 className="text-lg font-semibold m-0 text-[#201f1e] leading-tight">
            {currentTitle}
          </h1>
          <div className="text-[11px] text-[#605e5c]">
            {detail ? 'Record details and permitted actions' : 'Kerala Academy for Skills Excellence'}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-[#deecf9] text-[#004578] font-semibold px-2.5 py-1 rounded border border-[#c7e0f4]">
            {roleShort} ({userName || (isManager ? 'admin.manager' : 'admin.exec')})
          </span>
        </div>
      </div>

      {/* 2. Office Ribbon Action Bar */}
      <div className="bg-[#faf9f8] border-b border-[#d2d0ce] px-3 py-1 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1">
          <span className="text-[#0078d4] font-bold text-[11px] px-2 py-1 border-b-2 border-[#0078d4] inline-block">
            HOME ACTIONS
          </span>

          <div className="h-4 w-px bg-gray-300 mx-2" />

          {/* Contextual Ribbon Action Buttons */}
          <div className="flex items-center space-x-1">
            {detail ? (
              <button
                onClick={() => setDetail(null)}
                className="px-2.5 py-1 text-xs text-gray-700 hover:bg-[#e1dfdd] rounded border border-transparent flex items-center space-x-1 cursor-pointer transition font-medium"
              >
                <span className="text-[#0078d4] font-bold">←</span>
                <span>Back to Register</span>
              </button>
            ) : null}

            {activeSubPage === 'claims' || activeSubPage === 'daRegister' ? (
              <button
                onClick={() => handleExportCSV('KASE-TADA-Claims-Register.csv')}
                className="px-2.5 py-1 text-xs text-gray-700 hover:bg-[#e1dfdd] rounded border border-transparent flex items-center space-x-1 cursor-pointer transition"
              >
                <span className="text-[#0078d4]">▦</span>
                <span>Export Register</span>
              </button>
            ) : null}

            {activeSubPage === 'inventory' ? (
              <button
                onClick={() => {
                  setInflowItem('STK-001');
                  setInflowQty(1);
                  setInflowRef('');
                  setModalType('stockInflow');
                }}
                className="px-2.5 py-1 text-xs text-white bg-[#0078d4] hover:bg-[#106ebe] rounded border border-[#0078d4] flex items-center space-x-1 cursor-pointer transition font-medium"
              >
                <span>＋</span>
                <span>Record Stock Inflow</span>
              </button>
            ) : null}

            {activeSubPage === 'outward' ? (
              <button
                onClick={() => setModalType('outward')}
                className="px-2.5 py-1 text-xs text-white bg-[#0078d4] hover:bg-[#106ebe] rounded border border-[#0078d4] flex items-center space-x-1 cursor-pointer transition font-medium"
              >
                <span>＋</span>
                <span>New Outward</span>
              </button>
            ) : null}

            {activeSubPage === 'members' ? (
              <button
                onClick={() => setModalType('member')}
                className="px-2.5 py-1 text-xs text-white bg-[#0078d4] hover:bg-[#106ebe] rounded border border-[#0078d4] flex items-center space-x-1 cursor-pointer transition font-medium"
              >
                <span>＋</span>
                <span>New Member</span>
              </button>
            ) : null}

            {activeSubPage === 'meetings' ? (
              <button
                onClick={() => {
                  setMtNo(String(43 + meetings.length - 2));
                  setMtTitle('Meeting of the Board of Directors');
                  setMtDate('');
                  setModalType('meeting');
                }}
                className="px-2.5 py-1 text-xs text-white bg-[#0078d4] hover:bg-[#106ebe] rounded border border-[#0078d4] flex items-center space-x-1 cursor-pointer transition font-medium"
              >
                <span>＋</span>
                <span>Schedule Meeting</span>
              </button>
            ) : null}

            {activeSubPage === 'agenda' && !isAgendaFinalised ? (
              <button
                onClick={() => onShowToast('Agenda draft saved.')}
                className="px-2.5 py-1 text-xs text-white bg-[#0078d4] hover:bg-[#106ebe] rounded border border-[#0078d4] flex items-center space-x-1 cursor-pointer transition font-medium"
              >
                <span>✓</span>
                <span>Save Agenda</span>
              </button>
            ) : null}

            <button
              onClick={() => {
                setListSearch('');
                onShowToast('View refreshed.');
              }}
              className="px-2.5 py-1 text-xs text-gray-700 hover:bg-[#e1dfdd] rounded border border-transparent flex items-center space-x-1 cursor-pointer transition"
            >
              <span className="text-[#0078d4]">↻</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="text-[11px] text-gray-500 font-medium">
          System date: {dateToday()}
        </div>
      </div>

      {/* 3. Main Workspace Area */}
      <div id="admin-content-area" className="flex-1 overflow-auto p-4">
        {/* DETAIL VIEWS */}
        {detail?.type === 'claim' && (
          (() => {
            const c = claims.find((x) => x.id === detail.id);
            if (!c) return <div className="p-6 bg-white border border-gray-300">Claim not found.</div>;

            const canExecVerify = roleKey === 'exec' && (c.status === 'Submitted' || c.status === 'Returned for Correction');
            const canManagerApprove = roleKey === 'manager' && c.status === 'Verified – Pending Manager Approval';

            return (
              <div className="space-y-3 max-w-4xl">
                <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <h3 className="text-sm font-semibold text-[#004578]">T.A./D.A. Claim Details</h3>
                    {badge(c.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Claim Reference</label>
                      <input disabled value={c.id} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-bold text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Employee</label>
                      <input disabled value={`${c.employee} · ${c.empId}`} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Division</label>
                      <input disabled value={c.division} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Purpose of Journey</label>
                      <input disabled value={c.purpose} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Route</label>
                      <input disabled value={`${c.from} → ${c.to}`} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Period</label>
                      <input disabled value={`${c.start} to ${c.end}`} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">D.A. Rate / Day</label>
                      <input disabled value={money(c.rate)} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Travel & Other Expenses</label>
                      <input disabled value={money(c.travel + c.other)} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Total Claim Amount</label>
                      <input disabled value={money(c.amount)} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-bold text-[#004578] rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Journey Sanction Reference</label>
                      <input disabled value={c.sanctionRef || 'Not provided'} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">eOffice Proceeding Reference</label>
                      <input disabled value={c.proceeding || 'Not uploaded'} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Submitted On</label>
                      <input disabled value={c.created} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[11px] text-gray-500 block mb-0.5">Ex-post Facto Justification</label>
                      <textarea disabled value={c.exPostFacto || 'Not applicable / not provided'} className="w-full bg-[#f3f2f1] border border-gray-300 p-2 text-gray-800 rounded min-h-[50px]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[11px] text-gray-500 block mb-0.5">Employee Remarks</label>
                      <textarea disabled value={c.remarks || '—'} className="w-full bg-[#f3f2f1] border border-gray-300 p-2 text-gray-800 rounded min-h-[40px]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[11px] text-gray-500 block mb-0.5">Latest Administrative Remarks</label>
                      <textarea disabled value={c.adminRemarks || 'No administrative remarks recorded.'} className="w-full bg-[#f3f2f1] border border-gray-300 p-2 text-gray-800 rounded min-h-[40px]" />
                    </div>
                  </div>
                </div>

                {/* Workflow Actions */}
                {(canExecVerify || canManagerApprove) && (
                  <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#004578] m-0">Permitted Administrative Actions</h4>
                      <p className="text-[11px] text-gray-500 m-0">
                        {canExecVerify
                          ? 'As Administration Executive, verify journey details and forward to Manager or return for correction.'
                          : 'As Administration Manager, approve claim for FICO/ESS or return to employee.'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {canExecVerify && (
                        <>
                          <button
                            onClick={() => handleClaimVerify(c.id)}
                            className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] text-xs font-semibold rounded shadow-xs cursor-pointer"
                          >
                            Verify & Send to Manager
                          </button>
                          <button
                            onClick={() => handleClaimReturn(c.id)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded border border-gray-300 cursor-pointer"
                          >
                            Return to Employee ESS
                          </button>
                        </>
                      )}

                      {canManagerApprove && (
                        <>
                          <button
                            onClick={() => handleClaimApprove(c.id)}
                            className="px-4 py-1.5 bg-[#107c10] text-white hover:bg-[#0b6a0b] text-xs font-semibold rounded shadow-xs cursor-pointer"
                          >
                            Approve Claim
                          </button>
                          <button
                            onClick={() => handleClaimReturn(c.id)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded border border-gray-300 cursor-pointer"
                          >
                            Return for Correction
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Record History */}
                <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs">
                  <h4 className="text-xs font-bold text-[#004578] mb-2">Record History & Audit Trail</h4>
                  <div className="border-l-2 border-[#c8e0f4] ml-2 pl-3 space-y-2 text-xs">
                    {c.history.map((h, i) => (
                      <div key={i} className="relative pb-1">
                        <div className="absolute -left-[18px] top-1 w-2 h-2 rounded-full bg-[#0078d4]" />
                        <span className="font-semibold text-gray-800">{h[0]} · {h[1]}</span>
                        <p className="text-gray-600 m-0 mt-0.5">{h[2]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {/* DETAIL: STOCK REQUISITION */}
        {detail?.type === 'req' && (
          (() => {
            const r = reqs.find((x) => x.id === detail.id);
            if (!r) return <div className="p-6 bg-white border border-gray-300">Request not found.</div>;

            const canExecRecommend = roleKey === 'exec' && r.status === 'Submitted from ESS';
            const canManagerApprove = roleKey === 'manager' && r.status === 'Recommended by Administration Executive';
            const canExecIssue = roleKey === 'exec' && r.status === 'Approved by Administration Manager';

            return (
              <div className="space-y-3 max-w-4xl">
                <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
                    <h3 className="text-sm font-semibold text-[#004578]">Employee Stock Request Details</h3>
                    {badge(r.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Request Reference</label>
                      <input disabled value={r.id} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-bold text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Requested By</label>
                      <input disabled value={`${r.requester} · ${r.empId}`} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Request Date</label>
                      <input disabled value={r.date} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-0.5">Current Status</label>
                      <input disabled value={r.status} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[11px] text-gray-500 block mb-0.5">Purpose / Notes</label>
                      <textarea disabled value={r.notes || '—'} className="w-full bg-[#f3f2f1] border border-gray-300 p-2 text-gray-800 rounded min-h-[40px]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[11px] text-gray-500 block mb-0.5">Latest Administrative Remarks</label>
                      <textarea disabled value={r.adminRemarks || 'No administrative remarks recorded.'} className="w-full bg-[#f3f2f1] border border-gray-300 p-2 text-gray-800 rounded min-h-[40px]" />
                    </div>
                  </div>
                </div>

                {/* Requested Items Table */}
                <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-hidden">
                  <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 font-semibold text-xs text-[#004578]">
                    Requested Stationery & Consumable Items
                  </div>
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                        <th className="p-2">Item Code</th>
                        <th className="p-2">Description</th>
                        <th className="p-2 text-right">Available in Store</th>
                        <th className="p-2 text-right">Requested Qty</th>
                        <th className="p-2">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {r.lines.map((line, idx) => {
                        const itm = itemById(line.item);
                        const hasStock = itm.qty >= line.qty;
                        return (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="p-2 font-mono font-bold text-[#004578]">{itm.id}</td>
                            <td className="p-2 font-medium">{itm.name}</td>
                            <td className={`p-2 text-right font-bold ${hasStock ? 'text-green-700' : 'text-red-700'}`}>
                              {itm.qty}
                            </td>
                            <td className="p-2 text-right font-bold text-gray-900">{line.qty}</td>
                            <td className="p-2 text-gray-600">{itm.unit}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Workflow Actions */}
                {(canExecRecommend || canManagerApprove || canExecIssue) && (
                  <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#004578] m-0">Permitted Administrative Actions</h4>
                      <p className="text-[11px] text-gray-500 m-0">
                        {canExecRecommend
                          ? 'Review store availability and recommend allocation to Administration Manager.'
                          : canManagerApprove
                          ? 'Authorise allocation of stock items to the requester.'
                          : 'Issue stationery from Central Store and automatically debit ledger.'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {canExecRecommend && (
                        <>
                          <button
                            onClick={() => handleReqRecommend(r.id)}
                            className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] text-xs font-semibold rounded shadow-xs cursor-pointer"
                          >
                            Recommend Allocation
                          </button>
                          <button
                            onClick={() => handleReqReturn(r.id)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded border border-gray-300 cursor-pointer"
                          >
                            Return to Employee
                          </button>
                        </>
                      )}

                      {canManagerApprove && (
                        <>
                          <button
                            onClick={() => handleReqApprove(r.id)}
                            className="px-4 py-1.5 bg-[#107c10] text-white hover:bg-[#0b6a0b] text-xs font-semibold rounded shadow-xs cursor-pointer"
                          >
                            Approve Allocation
                          </button>
                          <button
                            onClick={() => handleReqReturn(r.id)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded border border-gray-300 cursor-pointer"
                          >
                            Return for Review
                          </button>
                        </>
                      )}

                      {canExecIssue && (
                        <button
                          onClick={() => handleReqIssue(r.id)}
                          className="px-4 py-1.5 bg-[#107c10] text-white hover:bg-[#0b6a0b] text-xs font-semibold rounded shadow-xs cursor-pointer"
                        >
                          Issue Stock & Update Ledger
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Record History */}
                <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs">
                  <h4 className="text-xs font-bold text-[#004578] mb-2">Request History</h4>
                  <div className="border-l-2 border-[#c8e0f4] ml-2 pl-3 space-y-2 text-xs">
                    {r.history.map((h, i) => (
                      <div key={i} className="relative pb-1">
                        <div className="absolute -left-[18px] top-1 w-2 h-2 rounded-full bg-[#0078d4]" />
                        <span className="font-semibold text-gray-800">{h[0]} · {h[1]}</span>
                        <p className="text-gray-600 m-0 mt-0.5">{h[2]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {/* DETAIL: OUTWARD */}
        {detail?.type === 'outward' && (
          (() => {
            const o = outward.find((x) => x.id === detail.id);
            if (!o) return <div className="p-6 bg-white border border-gray-300">Outward record not found.</div>;
            return (
              <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs max-w-3xl space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-sm font-semibold text-[#004578]">Outward Communication Details</h3>
                  {badge(o.status)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Register Reference</label>
                    <input disabled value={o.id} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-bold text-gray-800 rounded font-mono" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Dispatch Date</label>
                    <input disabled value={o.date} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Recipient</label>
                    <input disabled value={o.recipient} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Address</label>
                    <input disabled value={o.address || '—'} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Dispatching Division</label>
                    <input disabled value={o.division} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Dispatch Mode</label>
                    <input disabled value={o.mode} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[11px] text-gray-500 block mb-0.5">Official Reference</label>
                    <input disabled value={o.ref} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-mono text-gray-800 rounded" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[11px] text-gray-500 block mb-0.5">Subject</label>
                    <textarea disabled value={o.subject} className="w-full bg-[#f3f2f1] border border-gray-300 p-2 text-gray-800 rounded min-h-[60px]" />
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {/* DETAIL: BOARD MEMBER */}
        {detail?.type === 'member' && (
          (() => {
            const m = members.find((x) => x.id === detail.id);
            if (!m) return <div className="p-6 bg-white border border-gray-300">Member not found.</div>;
            return (
              <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs max-w-3xl space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-sm font-semibold text-[#004578]">Board Member Profile</h3>
                  {badge(m.status)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Member ID</label>
                    <input disabled value={m.id} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-mono text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Full Name</label>
                    <input disabled value={m.name} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-bold text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Designation</label>
                    <input disabled value={m.designation} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Organisation</label>
                    <input disabled value={m.organisation} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Official Email</label>
                    <input disabled value={m.email} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Contact Number</label>
                    <input disabled value={m.phone} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Tenure Start</label>
                    <input disabled value={m.from} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Tenure End</label>
                    <input disabled value={m.to} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {/* DETAIL: BOARD MEETING */}
        {detail?.type === 'meeting' && (
          (() => {
            const m = meetings.find((x) => x.id === detail.id);
            if (!m) return <div className="p-6 bg-white border border-gray-300">Meeting not found.</div>;
            return (
              <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs max-w-3xl space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-sm font-semibold text-[#004578]">{m.title}</h3>
                  <div className="flex space-x-2">{badge(m.agendaStatus)}{badge(m.status)}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Meeting Reference</label>
                    <input disabled value={m.id} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-mono text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Meeting Number</label>
                    <input disabled value={`#${m.no}`} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-bold text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Date & Time</label>
                    <input disabled value={`${m.date} at ${m.time}`} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Venue</label>
                    <input disabled value={m.venue} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#004578] mb-2">Agenda Points</h4>
                  <div className="space-y-1 text-xs">
                    {m.agenda.map((a, i) => (
                      <div key={i} className="p-2 bg-gray-50 border border-gray-200 rounded">
                        <span className="font-bold text-[#0078d4] mr-2">{i + 1}.</span> {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setAgendaMeetingId(m.id);
                      setDetail(null);
                      onNavigateSubPage('agenda');
                    }}
                    className="px-3 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] text-xs font-semibold rounded cursor-pointer"
                  >
                    Open in Agenda Workspace
                  </button>
                  {m.mom && (
                    <button
                      onClick={() => {
                        setDetail(null);
                        onNavigateSubPage('mom');
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded border border-gray-300 cursor-pointer"
                    >
                      Open Minutes Repository
                    </button>
                  )}
                </div>
              </div>
            );
          })()
        )}

        {/* DETAIL: MOM */}
        {detail?.type === 'mom' && (
          (() => {
            const m = momRecords.find((x) => x.id === detail.id);
            if (!m) return <div className="p-6 bg-white border border-gray-300">Record not found.</div>;
            return (
              <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs max-w-3xl space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <h3 className="text-sm font-semibold text-[#004578]">{m.title}</h3>
                  {badge(m.status)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Repository ID</label>
                    <input disabled value={m.id} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-mono text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Meeting Reference</label>
                    <input disabled value={m.meeting} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 font-bold text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Meeting Date</label>
                    <input disabled value={m.date} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded" />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Official Document</label>
                    <input disabled value={m.file} className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 text-gray-800 rounded font-mono" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#004578] mb-2">Confirmed Board Resolutions</h4>
                  <div className="space-y-2 text-xs">
                    {m.resolutions.map((r, i) => (
                      <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded">
                        <span className="font-bold text-[#0078d4] block mb-1">Resolution {r.no}:</span>
                        <p className="m-0 text-gray-800 leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()
        )}

        {/* SUBPAGE 1: HOME / DASHBOARD */}
        {!detail && activeSubPage === 'home' && (
          <div className="space-y-4">
            {/* Metric Cues */}
            {(() => {
              const submittedClaims = claims.filter((c) => c.status === 'Submitted').length;
              const pendingClaims = claims.filter((c) => c.status === 'Verified – Pending Manager Approval').length;
              const approvedClaims = claims.filter((c) => ['Approved – ESS & FICO', 'Finance Processing', 'Paid'].includes(c.status)).length;
              const submittedReqs = reqs.filter((r) => r.status === 'Submitted from ESS').length;
              const recommendedReqs = reqs.filter((r) => r.status === 'Recommended by Administration Executive').length;
              const lowStock = inventory.filter((i) => i.qty <= i.reorder).length;

              const cues = isManager
                ? [
                    { label: 'Claims awaiting approval', val: pendingClaims, page: 'daRegister', alert: pendingClaims > 0 },
                    { label: 'Stock requests for approval', val: recommendedReqs, page: 'requisitions', alert: recommendedReqs > 0 },
                    { label: 'Claims in ESS / FICO', val: approvedClaims, page: 'claims', alert: false },
                    { label: 'Low-stock items', val: lowStock, page: 'inventory', alert: lowStock > 0 },
                  ]
                : [
                    { label: 'ESS claims to verify', val: submittedClaims, page: 'claims', alert: submittedClaims > 0 },
                    { label: 'Stock requests to recommend', val: submittedReqs, page: 'requisitions', alert: submittedReqs > 0 },
                    { label: 'Claims in ESS / FICO', val: approvedClaims, page: 'claims', alert: false },
                    { label: 'Low-stock items', val: lowStock, page: 'inventory', alert: lowStock > 0 },
                  ];

              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {cues.map((cue, idx) => (
                    <div
                      key={idx}
                      onClick={() => onNavigateSubPage(cue.page)}
                      className={`bg-white border border-[#d2d0ce] p-3 rounded shadow-xs cursor-pointer hover:bg-blue-50/40 transition min-h-[78px] flex flex-col justify-between ${
                        cue.alert ? 'border-t-4 border-t-[#d83b01]' : 'border-t-4 border-t-[#0078d4]'
                      }`}
                    >
                      <span className="text-[11px] text-[#605e5c] font-medium leading-tight">{cue.label}</span>
                      <div className="flex items-baseline justify-between mt-2">
                        <span className={`text-2xl font-bold ${cue.alert ? 'text-[#d83b01]' : 'text-[#004578]'}`}>
                          {cue.val}
                        </span>
                        <span className="text-[10px] text-gray-400">Open register ›</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Split layout: Queue on Left, Quick links on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                {/* Work Queue */}
                <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-hidden">
                  <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#004578] m-0">
                      {isManager ? 'Manager Approval Queue' : 'Administration Executive Work Queue'}
                    </h3>
                    <span className="text-[11px] text-gray-500">Pending items requiring action</span>
                  </div>

                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                        <th className="p-2">Reference</th>
                        <th className="p-2">Work Item</th>
                        <th className="p-2">Employee / Requester</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {claims
                        .filter((c) => (isManager ? c.status === 'Verified – Pending Manager Approval' : c.status === 'Submitted'))
                        .map((c) => (
                          <tr
                            key={c.id}
                            onClick={() => setDetail({ type: 'claim', id: c.id })}
                            className="border-b border-gray-100 hover:bg-[#f3f9fd] cursor-pointer"
                          >
                            <td className="p-2 font-mono font-bold text-[#004578]">{c.id}</td>
                            <td className="p-2 truncate max-w-[200px]">{c.purpose}</td>
                            <td className="p-2">{c.employee}</td>
                            <td className="p-2">{badge(c.status)}</td>
                          </tr>
                        ))}

                      {reqs
                        .filter((r) =>
                          isManager ? r.status === 'Recommended by Administration Executive' : r.status === 'Submitted from ESS'
                        )
                        .map((r) => (
                          <tr
                            key={r.id}
                            onClick={() => setDetail({ type: 'req', id: r.id })}
                            className="border-b border-gray-100 hover:bg-[#f3f9fd] cursor-pointer"
                          >
                            <td className="p-2 font-mono font-bold text-[#004578]">{r.id}</td>
                            <td className="p-2">Employee stock request ({r.lines.length} items)</td>
                            <td className="p-2">{r.requester}</td>
                            <td className="p-2">{badge(r.status)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Board Meetings summary */}
                <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs">
                  <h3 className="text-xs font-bold text-[#004578] mb-3">Upcoming Board of Directors Meetings</h3>
                  <div className="space-y-2 text-xs">
                    {meetings.map((m) => (
                      <div key={m.id} className="p-2.5 bg-gray-50 border border-gray-200 rounded flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">{m.title}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            📅 {m.date} at {m.time} · 📍 {m.venue}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {badge(m.agendaStatus)}
                          <button
                            onClick={() => {
                              setAgendaMeetingId(m.id);
                              onNavigateSubPage('agenda');
                            }}
                            className="text-[11px] bg-white border border-gray-300 hover:bg-gray-100 text-[#0078d4] font-medium px-2 py-1 rounded cursor-pointer"
                          >
                            Agenda Workspace
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Quick Access Links */}
              <div className="space-y-4">
                <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs">
                  <h3 className="text-xs font-bold text-[#004578] mb-3">Quick Navigation</h3>
                  <div className="space-y-2 text-xs">
                    {[
                      { name: 'T.A./D.A. Claims', id: 'claims', icon: '◫' },
                      { name: 'Digital D.A. Register', id: 'daRegister', icon: '▤' },
                      { name: 'Stock Requisitions', id: 'requisitions', icon: '☷' },
                      { name: 'Inventory Ledger', id: 'inventory', icon: '▥' },
                      { name: 'Outward Register', id: 'outward', icon: '↗' },
                      { name: 'Board Members', id: 'members', icon: '♙' },
                      { name: 'Agenda Collaboration', id: 'agenda', icon: '✎' },
                      { name: 'MoM & Resolutions', id: 'mom', icon: '▤' },
                    ].map((link, idx) => (
                      <div
                        key={idx}
                        onClick={() => onNavigateSubPage(link.id)}
                        className="flex items-center justify-between p-2 rounded hover:bg-blue-50/50 cursor-pointer border border-transparent hover:border-blue-200 transition"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-[#0078d4] font-bold text-sm">{link.icon}</span>
                          <span className="font-medium text-gray-800">{link.name}</span>
                        </div>
                        <span className="text-[#0078d4] text-[11px]">Open ›</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-4 leading-relaxed pt-2 border-t border-gray-200">
                    T.A./D.A. claims and stock requests originate in Employee ESS. This module handles administrative verification, approvals, store ledger deductions, and governance meetings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBPAGE 2 & 3: T.A./D.A. CLAIMS & DIGITAL D.A. REGISTER */}
        {!detail && (activeSubPage === 'claims' || activeSubPage === 'daRegister') && (
          <div className="space-y-3">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2.5 rounded border border-[#d2d0ce] text-xs">
              <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-600">Search</label>
                <input
                  type="text"
                  placeholder="Claim ID, employee or purpose…"
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  className="w-64 border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#0078d4]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-600">Status</label>
                <select
                  value={claimStatusFilter}
                  onChange={(e) => setClaimStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-xs bg-white"
                >
                  <option value="">All statuses</option>
                  {Array.from(new Set(claims.map((c) => c.status))).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Claims Table */}
            <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                    <th className="p-2">Claim ID</th>
                    <th className="p-2">Employee</th>
                    <th className="p-2">Purpose of Journey</th>
                    <th className="p-2">Route & Dates</th>
                    <th className="p-2 text-right">Claim Amount</th>
                    <th className="p-2">Submitted</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claims
                    .filter((c) => {
                      if (activeSubPage === 'daRegister') {
                        if (!['Verified – Pending Manager Approval', 'Approved – ESS & FICO', 'Finance Processing', 'Paid'].includes(c.status)) {
                          return false;
                        }
                      }
                      if (claimStatusFilter && c.status !== claimStatusFilter) return false;
                      if (!listSearch) return true;
                      const q = listSearch.toLowerCase();
                      return (
                        c.id.toLowerCase().includes(q) ||
                        c.employee.toLowerCase().includes(q) ||
                        c.purpose.toLowerCase().includes(q) ||
                        c.division.toLowerCase().includes(q)
                      );
                    })
                    .map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => setDetail({ type: 'claim', id: c.id })}
                        className="border-b border-gray-100 hover:bg-[#f3f9fd] cursor-pointer"
                      >
                        <td className="p-2 font-mono font-bold text-[#0078d4]">{c.id}</td>
                        <td className="p-2">
                          <span className="font-semibold text-gray-900">{c.employee}</span>
                          <span className="block text-[11px] text-gray-500">{c.division}</span>
                        </td>
                        <td className="p-2 text-gray-800">{c.purpose}</td>
                        <td className="p-2 text-gray-600">
                          <div>{c.from} → {c.to}</div>
                          <span className="text-[10px] text-gray-400">{c.start} to {c.end}</span>
                        </td>
                        <td className="p-2 text-right font-bold text-gray-900">{money(c.amount)}</td>
                        <td className="p-2 text-gray-600">{c.created}</td>
                        <td className="p-2">{badge(c.status)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-gray-500 italic">
              Claims are submitted by staff through Employee Self-Service (ESS). New claims cannot be created directly within this administrative audit register.
            </p>
          </div>
        )}

        {/* SUBPAGE 4: STOCK REQUISITIONS */}
        {!detail && activeSubPage === 'requisitions' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-2.5 rounded border border-[#d2d0ce] text-xs">
              <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-600">Search</label>
                <input
                  type="text"
                  placeholder="Request ID, employee or stock item…"
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  className="w-64 border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#0078d4]"
                />
              </div>
              <span className="text-gray-500">{reqs.length} total request(s)</span>
            </div>

            <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                    <th className="p-2">Request ID</th>
                    <th className="p-2">Requested By</th>
                    <th className="p-2">Items & Quantities</th>
                    <th className="p-2">Request Date</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reqs
                    .filter((r) => {
                      if (!listSearch) return true;
                      const q = listSearch.toLowerCase();
                      return (
                        r.id.toLowerCase().includes(q) ||
                        r.requester.toLowerCase().includes(q) ||
                        r.empId.toLowerCase().includes(q) ||
                        r.lines.some((l) => itemById(l.item).name.toLowerCase().includes(q))
                      );
                    })
                    .map((r) => (
                      <tr
                        key={r.id}
                        onClick={() => setDetail({ type: 'req', id: r.id })}
                        className="border-b border-gray-100 hover:bg-[#f3f9fd] cursor-pointer"
                      >
                        <td className="p-2 font-mono font-bold text-[#0078d4]">{r.id}</td>
                        <td className="p-2">
                          <span className="font-semibold text-gray-900">{r.requester}</span>
                          <span className="block text-[11px] text-gray-500">{r.empId}</span>
                        </td>
                        <td className="p-2">
                          {r.lines.map((l, idx) => (
                            <span key={idx} className="block text-[11px] text-gray-700">
                              {itemById(l.item).name} × <b className="text-gray-900">{l.qty}</b>
                            </span>
                          ))}
                        </td>
                        <td className="p-2 text-gray-600">{r.date}</td>
                        <td className="p-2">{badge(r.status)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-gray-500 italic">
              Employee requests are processed individually against available company stock. Allocation is recommended by Administration Executive, approved by Administration Manager, and debited upon physical issue.
            </p>
          </div>
        )}

        {/* SUBPAGE 5: INVENTORY LEDGER */}
        {!detail && activeSubPage === 'inventory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-2.5 rounded border border-[#d2d0ce] text-xs">
              <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-600">Search Item</label>
                <input
                  type="text"
                  placeholder="Item code or description…"
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  className="w-64 border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#0078d4]"
                />
              </div>
              <button
                onClick={() => setModalType('stockInflow')}
                className="px-3 py-1 bg-[#0078d4] text-white hover:bg-[#106ebe] text-xs font-semibold rounded cursor-pointer"
              >
                ＋ Record Stock Inflow
              </button>
            </div>

            {/* Current Stock Levels Table */}
            <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-x-auto">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 font-semibold text-xs text-[#004578]">
                Central Store & Division Stock Registers
              </div>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                    <th className="p-2">Item Code</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Unit</th>
                    <th className="p-2 text-right">Available Qty</th>
                    <th className="p-2 text-right">Reorder Level</th>
                    <th className="p-2">Storage Location</th>
                    <th className="p-2 text-right">Unit Value</th>
                    <th className="p-2">Stock Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory
                    .filter((i) => {
                      if (!listSearch) return true;
                      const q = listSearch.toLowerCase();
                      return i.id.toLowerCase().includes(q) || i.name.toLowerCase().includes(q);
                    })
                    .map((itm) => (
                      <tr key={itm.id} className="border-b border-gray-100 hover:bg-[#f3f9fd]">
                        <td className="p-2 font-mono font-bold text-[#0078d4]">{itm.id}</td>
                        <td className="p-2 font-medium text-gray-900">{itm.name}</td>
                        <td className="p-2 text-gray-600">{itm.unit}</td>
                        <td className="p-2 text-right font-bold text-gray-900">{itm.qty}</td>
                        <td className="p-2 text-right text-gray-500">{itm.reorder}</td>
                        <td className="p-2 text-gray-600">{itm.location}</td>
                        <td className="p-2 text-right text-gray-800">{money(itm.value)}</td>
                        <td className="p-2">
                          {itm.qty <= itm.reorder ? badge('Reorder Required') : badge('In Stock')}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Movement Ledger */}
            <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-x-auto">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 font-semibold text-xs text-[#004578]">
                Inventory Movement & Transaction History
              </div>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                    <th className="p-2">Date</th>
                    <th className="p-2">Item</th>
                    <th className="p-2">Movement Type</th>
                    <th className="p-2 text-right">Quantity</th>
                    <th className="p-2">Reference</th>
                    <th className="p-2">Recipient / Location</th>
                    <th className="p-2">Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.map((lg, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="p-2 font-mono text-gray-600">{lg.date}</td>
                      <td className="p-2 font-medium">{lg.item}</td>
                      <td className="p-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            lg.type === 'Stock Inflow'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {lg.type}
                        </span>
                      </td>
                      <td className={`p-2 text-right font-bold ${lg.qty > 0 ? 'text-green-700' : 'text-blue-700'}`}>
                        {lg.qty > 0 ? '+' : ''}{lg.qty}
                      </td>
                      <td className="p-2 font-mono text-gray-600">{lg.ref}</td>
                      <td className="p-2 text-gray-700">{lg.employee || lg.location || '—'}</td>
                      <td className="p-2 text-gray-500">{lg.by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBPAGE 6: OUTWARD REGISTER */}
        {!detail && activeSubPage === 'outward' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-2.5 rounded border border-[#d2d0ce] text-xs">
              <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-600">Search</label>
                <input
                  type="text"
                  placeholder="Register number, recipient or subject…"
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  className="w-64 border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#0078d4]"
                />
              </div>
              <button
                onClick={() => setModalType('outward')}
                className="px-3 py-1 bg-[#0078d4] text-white hover:bg-[#106ebe] text-xs font-semibold rounded cursor-pointer"
              >
                ＋ New Outward
              </button>
            </div>

            <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                    <th className="p-2">Register No.</th>
                    <th className="p-2">Dispatch Date</th>
                    <th className="p-2">Recipient</th>
                    <th className="p-2">Subject</th>
                    <th className="p-2">Division</th>
                    <th className="p-2">Mode</th>
                    <th className="p-2">Reference</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {outward
                    .filter((o) => {
                      if (!listSearch) return true;
                      const q = listSearch.toLowerCase();
                      return (
                        o.id.toLowerCase().includes(q) ||
                        o.recipient.toLowerCase().includes(q) ||
                        o.subject.toLowerCase().includes(q) ||
                        o.ref.toLowerCase().includes(q)
                      );
                    })
                    .map((o) => (
                      <tr
                        key={o.id}
                        onClick={() => setDetail({ type: 'outward', id: o.id })}
                        className="border-b border-gray-100 hover:bg-[#f3f9fd] cursor-pointer"
                      >
                        <td className="p-2 font-mono font-bold text-[#0078d4]">{o.id}</td>
                        <td className="p-2 text-gray-600">{o.date}</td>
                        <td className="p-2">
                          <span className="font-semibold text-gray-900">{o.recipient}</span>
                          <span className="block text-[11px] text-gray-500">{o.address}</span>
                        </td>
                        <td className="p-2 text-gray-800 max-w-[240px] truncate">{o.subject}</td>
                        <td className="p-2 text-gray-600">{o.division}</td>
                        <td className="p-2 text-gray-600">{o.mode}</td>
                        <td className="p-2 font-mono text-gray-600">{o.ref}</td>
                        <td className="p-2">{badge(o.status)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBPAGE 7: BOARD MEMBERS */}
        {!detail && activeSubPage === 'members' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-2.5 rounded border border-[#d2d0ce] text-xs">
              <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-600">Search</label>
                <input
                  type="text"
                  placeholder="Member name, organisation or ID…"
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  className="w-64 border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#0078d4]"
                />
              </div>
              <button
                onClick={() => setModalType('member')}
                className="px-3 py-1 bg-[#0078d4] text-white hover:bg-[#106ebe] text-xs font-semibold rounded cursor-pointer"
              >
                ＋ New Member
              </button>
            </div>

            <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                    <th className="p-2">Member ID</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Designation</th>
                    <th className="p-2">Organisation</th>
                    <th className="p-2">Tenure</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {members
                    .filter((m) => {
                      if (!listSearch) return true;
                      const q = listSearch.toLowerCase();
                      return (
                        m.id.toLowerCase().includes(q) ||
                        m.name.toLowerCase().includes(q) ||
                        m.organisation.toLowerCase().includes(q)
                      );
                    })
                    .map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => setDetail({ type: 'member', id: m.id })}
                        className="border-b border-gray-100 hover:bg-[#f3f9fd] cursor-pointer"
                      >
                        <td className="p-2 font-mono font-bold text-[#0078d4]">{m.id}</td>
                        <td className="p-2 font-semibold text-gray-900">{m.name}</td>
                        <td className="p-2 text-gray-800">{m.designation}</td>
                        <td className="p-2 text-gray-600">{m.organisation}</td>
                        <td className="p-2 text-gray-600">{m.from} – {m.to}</td>
                        <td className="p-2 font-mono text-gray-600">{m.email}</td>
                        <td className="p-2">{badge(m.status)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBPAGE 8: MEETINGS & AGENDA */}
        {!detail && activeSubPage === 'meetings' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-2.5 rounded border border-[#d2d0ce] text-xs">
              <div className="flex items-center space-x-2">
                <label className="font-semibold text-gray-600">Search</label>
                <input
                  type="text"
                  placeholder="Meeting number, title or date…"
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  className="w-64 border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#0078d4]"
                />
              </div>
              <button
                onClick={() => setModalType('meeting')}
                className="px-3 py-1 bg-[#0078d4] text-white hover:bg-[#106ebe] text-xs font-semibold rounded cursor-pointer"
              >
                ＋ Schedule Meeting
              </button>
            </div>

            <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                    <th className="p-2">Reference</th>
                    <th className="p-2">Meeting Title</th>
                    <th className="p-2">Date & Time</th>
                    <th className="p-2">Venue</th>
                    <th className="p-2">Agenda Status</th>
                    <th className="p-2">Meeting Status</th>
                    <th className="p-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings
                    .filter((m) => {
                      if (!listSearch) return true;
                      const q = listSearch.toLowerCase();
                      return m.id.toLowerCase().includes(q) || m.title.toLowerCase().includes(q) || m.date.includes(q);
                    })
                    .map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => setDetail({ type: 'meeting', id: m.id })}
                        className="border-b border-gray-100 hover:bg-[#f3f9fd] cursor-pointer"
                      >
                        <td className="p-2 font-mono font-bold text-[#0078d4]">{m.id}</td>
                        <td className="p-2 font-semibold text-gray-900">{m.title}</td>
                        <td className="p-2 text-gray-600">{m.date} · {m.time}</td>
                        <td className="p-2 text-gray-600">{m.venue}</td>
                        <td className="p-2">{badge(m.agendaStatus)}</td>
                        <td className="p-2">{badge(m.status)}</td>
                        <td className="p-2 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              setAgendaMeetingId(m.id);
                              onNavigateSubPage('agenda');
                            }}
                            className="px-2.5 py-1 text-xs bg-white hover:bg-gray-100 text-[#0078d4] border border-gray-300 rounded font-medium cursor-pointer"
                          >
                            Open Agenda
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBPAGE 9: AGENDA COLLABORATION WORKSPACE */}
        {!detail && activeSubPage === 'agenda' && (
          <div className="bg-white border border-[#d2d0ce] p-4 rounded shadow-xs max-w-4xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h3 className="text-sm font-semibold text-[#004578]">Agenda Collaboration Workspace</h3>
              {badge(currentAgendaMeeting?.agendaStatus || 'Draft')}
            </div>

            {isAgendaFinalised ? (
              <div className="bg-[#f3f2f1] border border-[#d2d0ce] border-l-4 border-l-[#107c10] p-3 text-xs text-gray-700">
                <b className="text-green-800">✓ Agenda Finalised</b>
                <p className="m-0 mt-0.5">This agenda is locked and cannot be edited, amended or extended.</p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 m-0">
                This agenda is a working draft. Collaborate, edit, and click Save or Finalise once approved by the Chairperson.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] text-gray-500 block mb-0.5 font-semibold">Select Board Meeting</label>
                <select
                  value={agendaMeetingId}
                  onChange={(e) => setAgendaMeetingId(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded bg-white text-xs"
                >
                  {meetings.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title} ({m.date}) – {m.agendaStatus}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-gray-500 block mb-0.5 font-semibold">Agenda Status</label>
                <input
                  disabled
                  value={currentAgendaMeeting?.agendaStatus || ''}
                  className="w-full bg-[#f3f2f1] border border-gray-300 p-1.5 rounded text-xs font-bold text-gray-700"
                />
              </div>
            </div>

            {/* Agenda Items list */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-[#004578] block">Agenda Items</label>
              {currentAgendaMeeting?.agenda.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 border-b border-gray-100 pb-2">
                  <span className="font-bold text-[#0078d4] text-sm pt-2 w-6 shrink-0">{idx + 1}.</span>
                  <textarea
                    disabled={isAgendaFinalised}
                    value={item}
                    onChange={(e) => handleUpdateAgendaItem(idx, e.target.value)}
                    className="flex-1 border border-gray-300 rounded p-2 text-xs text-gray-800 disabled:bg-[#f3f2f1] disabled:text-gray-600 disabled:cursor-not-allowed min-h-[50px] focus:outline-none focus:border-[#0078d4]"
                  />
                </div>
              ))}
            </div>

            {/* Agenda Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                {!isAgendaFinalised && (
                  <>
                    <button
                      onClick={handleAddAgendaItem}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded border border-gray-300 cursor-pointer"
                    >
                      ＋ Add Agenda Item
                    </button>
                    <button
                      onClick={handleFinaliseAgenda}
                      className="px-4 py-1.5 bg-[#0078d4] hover:bg-[#106ebe] text-white text-xs font-semibold rounded cursor-pointer shadow-xs"
                    >
                      Finalise Agenda
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={handleDistributeAgenda}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded border border-gray-300 cursor-pointer"
              >
                Distribute to Board Portal
              </button>
            </div>
          </div>
        )}

        {/* SUBPAGE 10: MOM & RESOLUTIONS */}
        {!detail && activeSubPage === 'mom' && (
          <div className="space-y-3">
            <div className="bg-white border border-[#d2d0ce] rounded shadow-xs overflow-x-auto">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 font-semibold text-xs text-[#004578]">
                Final Minutes of Meetings & Board Resolutions Repository
              </div>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f3f2f1] text-[#605e5c] border-b border-[#d2d0ce] text-left">
                    <th className="p-2">Repository ID</th>
                    <th className="p-2">Meeting</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Document</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {momRecords.map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => setDetail({ type: 'mom', id: m.id })}
                      className="border-b border-gray-100 hover:bg-[#f3f9fd] cursor-pointer"
                    >
                      <td className="p-2 font-mono font-bold text-[#0078d4]">{m.id}</td>
                      <td className="p-2 font-semibold text-gray-900">{m.title}</td>
                      <td className="p-2 text-gray-600">{m.date}</td>
                      <td className="p-2 font-mono text-gray-600">{m.file}</td>
                      <td className="p-2">{badge(m.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4. Mandatory Remarks Dialog Modal */}
      {modalType === 'remarks' && pendingRemarksAction && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-400 w-full max-w-lg rounded shadow-2xl overflow-hidden text-xs">
            <div className="bg-[#004578] text-white px-4 py-2.5 font-semibold text-sm flex items-center justify-between">
              <span>{pendingRemarksAction.title}</span>
              <button
                onClick={() => setModalType(null)}
                className="text-white hover:text-gray-300 font-bold focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-gray-600 m-0">{pendingRemarksAction.instruction}</p>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Administrative Remarks <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={4}
                  autoFocus
                  required
                  placeholder="Enter remarks and reasons..."
                  value={actionRemarksText}
                  onChange={(e) => {
                    setActionRemarksText(e.target.value);
                    setActionRemarksError('');
                  }}
                  className="w-full border border-gray-400 p-2 rounded focus:outline-none focus:border-[#0078d4]"
                />
                {actionRemarksError && (
                  <span className="text-red-700 font-medium text-[11px] block mt-1">
                    {actionRemarksError}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-3 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitActionRemarks}
                  className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-semibold rounded cursor-pointer shadow-xs"
                >
                  Confirm Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Stock Inflow Modal */}
      {modalType === 'stockInflow' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-400 w-full max-w-md rounded shadow-2xl overflow-hidden text-xs">
            <div className="bg-[#004578] text-white px-4 py-2.5 font-semibold text-sm flex items-center justify-between">
              <span>Record Company Stock Purchase / Inflow</span>
              <button
                onClick={() => setModalType(null)}
                className="text-white hover:text-gray-300 font-bold focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Stock Item</label>
                <select
                  value={inflowItem}
                  onChange={(e) => setInflowItem(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded bg-white text-xs"
                >
                  {inventory.map((itm) => (
                    <option key={itm.id} value={itm.id}>
                      {itm.name} ({itm.id})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Quantity Received</label>
                <input
                  type="number"
                  min={1}
                  value={inflowQty}
                  onChange={(e) => setInflowQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Purchase / GRN Reference</label>
                <input
                  type="text"
                  placeholder="e.g. GRN-2026-045"
                  value={inflowRef}
                  onChange={(e) => setInflowRef(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Storage Location</label>
                <input
                  type="text"
                  value={inflowLoc}
                  onChange={(e) => setInflowLoc(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-3 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveStockInflow}
                  className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-semibold rounded cursor-pointer shadow-xs"
                >
                  Record Stock Inflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. New Outward Modal */}
      {modalType === 'outward' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-400 w-full max-w-lg rounded shadow-2xl overflow-hidden text-xs">
            <div className="bg-[#004578] text-white px-4 py-2.5 font-semibold text-sm flex items-center justify-between">
              <span>New Outward Register Entry</span>
              <button
                onClick={() => setModalType(null)}
                className="text-white hover:text-gray-300 font-bold focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Recipient *</label>
                <input
                  type="text"
                  required
                  placeholder="Official recipient name / department"
                  value={outwardRecipient}
                  onChange={(e) => setOutwardRecipient(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Postal address or city"
                  value={outwardAddress}
                  onChange={(e) => setOutwardAddress(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Dispatch Date</label>
                  <input
                    type="date"
                    value={outwardDate}
                    onChange={(e) => setOutwardDate(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Dispatching Division</label>
                  <input
                    type="text"
                    value={outwardDivision}
                    onChange={(e) => setOutwardDivision(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Subject *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Subject of communication"
                  value={outwardSubject}
                  onChange={(e) => setOutwardSubject(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Dispatch Mode</label>
                  <select
                    value={outwardMode}
                    onChange={(e) => setOutwardMode(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded bg-white text-xs"
                  >
                    <option>Email</option>
                    <option>eOffice / Email</option>
                    <option>Registered Post</option>
                    <option>Special Messenger</option>
                    <option>Email + Special Messenger</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Official Reference</label>
                  <input
                    type="text"
                    placeholder="e.g. KASE/ADMIN/2026/185"
                    value={outwardRef}
                    onChange={(e) => setOutwardRef(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs font-mono"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-3 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveOutward}
                  className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-semibold rounded cursor-pointer shadow-xs"
                >
                  Save Register Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. New Member Modal */}
      {modalType === 'member' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-400 w-full max-w-md rounded shadow-2xl overflow-hidden text-xs">
            <div className="bg-[#004578] text-white px-4 py-2.5 font-semibold text-sm flex items-center justify-between">
              <span>New Board Member</span>
              <button
                onClick={() => setModalType(null)}
                className="text-white hover:text-gray-300 font-bold focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={memName}
                  onChange={(e) => setMemName(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Designation</label>
                <input
                  type="text"
                  placeholder="Chairperson / Member / Nominee"
                  value={memDes}
                  onChange={(e) => setMemDes(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Organisation</label>
                <input
                  type="text"
                  placeholder="e.g. Government of Kerala / Industry"
                  value={memOrg}
                  onChange={(e) => setMemOrg(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={memEmail}
                    onChange={(e) => setMemEmail(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={memPhone}
                    onChange={(e) => setMemPhone(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Tenure Start</label>
                  <input
                    type="date"
                    value={memFrom}
                    onChange={(e) => setMemFrom(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Tenure End</label>
                  <input
                    type="date"
                    value={memTo}
                    onChange={(e) => setMemTo(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-3 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveMember}
                  className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-semibold rounded cursor-pointer shadow-xs"
                >
                  Save Board Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Schedule Meeting Modal */}
      {modalType === 'meeting' && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-400 w-full max-w-md rounded shadow-2xl overflow-hidden text-xs">
            <div className="bg-[#004578] text-white px-4 py-2.5 font-semibold text-sm flex items-center justify-between">
              <span>Schedule Board Meeting</span>
              <button
                onClick={() => setModalType(null)}
                className="text-white hover:text-gray-300 font-bold focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Meeting Number</label>
                  <input
                    type="text"
                    value={mtNo}
                    onChange={(e) => setMtNo(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Time</label>
                  <input
                    type="time"
                    value={mtTime}
                    onChange={(e) => setMtTime(e.target.value)}
                    className="w-full border border-gray-300 p-1.5 rounded text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Meeting Title *</label>
                <input
                  type="text"
                  required
                  value={mtTitle}
                  onChange={(e) => setMtTitle(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={mtDate}
                  onChange={(e) => setMtDate(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Venue / Video Link</label>
                <input
                  type="text"
                  value={mtVenue}
                  onChange={(e) => setMtVenue(e.target.value)}
                  className="w-full border border-gray-300 p-1.5 rounded text-xs"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-3 py-1.5 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveMeeting}
                  className="px-4 py-1.5 bg-[#0078d4] text-white hover:bg-[#106ebe] font-semibold rounded cursor-pointer shadow-xs"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
