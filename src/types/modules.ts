export type FunctionalModuleId =
  | 'home'
  | 'ess'
  | 'hr'
  | 'it'
  | 'placements'
  | 'skill_development'
  | 'projects'
  | 'admin';

export interface ModuleDefinition {
  id: FunctionalModuleId;
  name: string;
  shortName: string;
  navCategory: string;
  description: string;
  defaultSubPage: string;
  subPages: { id: string; name: string; section?: string }[];
}

export const FUNCTIONAL_MODULES: ModuleDefinition[] = [
  {
    id: 'admin',
    name: 'Administration Division',
    shortName: 'Administration',
    navCategory: 'General Administration',
    description: 'T.A./D.A. claims verification, digital D.A. register, stock requisitions, stationery inventory, outward dispatch register, and Board of Directors meetings & agenda collaboration.',
    defaultSubPage: 'home',
    subPages: [
      { id: 'home', name: 'Administration Dashboard', section: 'Overview' },
      { id: 'claims', name: 'T.A./D.A. Claims', section: 'T.A. / D.A. Management' },
      { id: 'daRegister', name: 'Digital D.A. Register', section: 'T.A. / D.A. Management' },
      { id: 'requisitions', name: 'Stock Requisitions', section: 'Stock & Stationery' },
      { id: 'inventory', name: 'Inventory Ledger', section: 'Stock & Stationery' },
      { id: 'outward', name: 'Outward Register', section: 'Document Management' },
      { id: 'members', name: 'Board Members', section: 'Board of Directors' },
      { id: 'meetings', name: 'Meetings & Agenda', section: 'Board of Directors' },
      { id: 'agenda', name: 'Agenda Collaboration', section: 'Board of Directors' },
      { id: 'mom', name: 'MoM & Resolutions', section: 'Board of Directors' },
    ],
  },
  {
    id: 'ess',
    name: 'Employee Self-Service (ESS)',
    shortName: 'ESS Portal',
    navCategory: 'Self Service',
    description: 'Personal profile, service records, leave requisitions, biometric logs, and monthly payslips.',
    defaultSubPage: 'profile',
    subPages: [
      { id: 'profile', name: 'Profile & Service Record', section: 'ESS Modules' },
      { id: 'leave', name: 'Leave & Comp-Off', section: 'ESS Modules' },
      { id: 'attendance', name: 'Punch-In / Out Logs', section: 'ESS Modules' },
      { id: 'payslip', name: 'Monthly Payslips', section: 'ESS Modules' },
    ],
  },
  {
    id: 'hr',
    name: 'HR Division (Human Resources)',
    shortName: 'HR Division',
    navCategory: 'Human Resources',
    description: 'Employee master, digital service books, leave sanctioning, appraisals, payroll advice, and exit clearances.',
    defaultSubPage: 'role_center',
    subPages: [
      { id: 'role_center', name: 'Role Center (Cues)', section: 'Overview' },
      { id: 'emp', name: 'Employee Master & Service Book', section: 'Employee Management' },
      { id: 'lv', name: 'Leave Requests', section: 'Leave & Attendance' },
      { id: 'rg', name: 'Attendance Regularization', section: 'Leave & Attendance' },
      { id: 'lt', name: 'Leave Types Configuration', section: 'Leave & Attendance' },
      { id: 'tc', name: 'Training Calendar', section: 'Capacity Building' },
      { id: 'tn', name: 'Training Nominations', section: 'Capacity Building' },
      { id: 'ap', name: 'Appraisal Sheets', section: 'Performance' },
      { id: 'sp', name: 'Salary Structures', section: 'Payroll' },
      { id: 'pr', name: 'Payroll Runs & FICO Advice', section: 'Payroll' },
      { id: 'rs', name: 'Resignations & No Dues', section: 'Exit Management' },
      { id: 'fn', name: 'FnF Settlements', section: 'Exit Management' },
    ],
  },
  {
    id: 'it',
    name: 'IT Division (Systems & Infrastructure)',
    shortName: 'IT Division',
    navCategory: 'Information Technology',
    description: 'Hardware asset inventory, software licenses, helpdesk ticketing triage, IT procurements, and AMC contracts.',
    defaultSubPage: 'role_center',
    subPages: [
      { id: 'role_center', name: 'Role Center (Cues)', section: 'Overview' },
      { id: 'ast', name: 'IT Asset Register', section: 'Asset Inventory' },
      { id: 'sw', name: 'Software Licenses', section: 'Asset Inventory' },
      { id: 'tk', name: 'Helpdesk Tickets', section: 'Helpdesk & Incidents' },
      { id: 'pr', name: 'IT Procurements & FICO', section: 'Procurement' },
      { id: 'amc', name: 'AMC Management & Expiry', section: 'Maintenance' },
    ],
  },
  {
    id: 'placements',
    name: 'Placements Division',
    shortName: 'Placements',
    navCategory: 'Placement Cell',
    description: 'Talent pool scrutiny, employer verification, vacancy matching, placement drives, admit cards, and retention tracking.',
    defaultSubPage: 'dashboard',
    subPages: [
      { id: 'dashboard', name: 'Dashboard', section: 'Placement Management' },
      { id: 'talent', name: 'Talent Pool', section: 'Placement Management' },
      { id: 'employers', name: 'Employer Register', section: 'Placement Management' },
      { id: 'vacancies', name: 'Vacancies & Matching', section: 'Placement Management' },
      { id: 'drives', name: 'Placement Drives', section: 'Placement Management' },
      { id: 'interviews', name: 'Interview Pipeline', section: 'Placement Management' },
      { id: 'verification', name: 'Employment Verification', section: 'Verification & Payments' },
      { id: 'retention', name: 'Retention Milestones', section: 'Verification & Payments' },
      { id: 'fico', name: 'FICO & eOffice', section: 'Verification & Payments' },
      { id: 'reports', name: 'Reports & Audit', section: 'Verification & Payments' },
    ],
  },
  {
    id: 'skill_development',
    name: 'Skill Development Division',
    shortName: 'Skill Development',
    navCategory: 'Skilling Operations',
    description: 'Centrally sponsored & state skill schemes, TSP proposals, trainer ToT, candidate mobilisation, batches, assessments, and DSDC.',
    defaultSubPage: 'dashboard',
    subPages: [
      { id: 'dashboard', name: 'Dashboard', section: 'Overview' },
      { id: 'skillDashboard', name: 'Skill Development Dashboard', section: 'Skill Development' },
      { id: 'skillSchemes', name: 'Centrally Sponsored Schemes', section: 'Skill Development' },
      { id: 'stateSchemes', name: 'State Schemes', section: 'Skill Development' },
      { id: 'skillProposals', name: 'TSP Proposals & Targets', section: 'Skill Development' },
      { id: 'skillTrainers', name: 'Trainer & ToT Verification', section: 'Skill Development' },
      { id: 'skillCandidates', name: 'Candidate Registry & Mobilisation', section: 'Skill Development' },
      { id: 'skillBatches', name: 'Batch Requests & Approval', section: 'Skill Development' },
      { id: 'skillAttendance', name: 'Attendance & Dropouts', section: 'Skill Development' },
      { id: 'skillAssessment', name: 'Assessment & Certification', section: 'Skill Development' },
      { id: 'skillPlacement', name: 'OJT & Placements', section: 'Skill Development' },
      { id: 'skillMilestones', name: 'Milestone Payments / FICO', section: 'Skill Development' },
      { id: 'dsdc', name: 'DSDC Operations & Budgets', section: 'Skill Development' },
      { id: 'stateLedgers', name: 'State Budget Ledger Mapping', section: 'Skill Development' },
      { id: 'reports', name: 'Reports & Audit', section: 'Reports' },
    ],
  },
  {
    id: 'projects',
    name: 'Projects Division',
    shortName: 'Projects Division',
    navCategory: 'Projects & Infrastructure',
    description: 'Civil and infrastructure project tracking, Centres of Excellence, space utilisation, accreditation, and facilities.',
    defaultSubPage: 'dashboard',
    subPages: [
      { id: 'dashboard', name: 'Dashboard', section: 'Project Management' },
      { id: 'registry', name: 'Project Registry', section: 'Project Management' },
      { id: 'estimates', name: 'Estimate Register', section: 'Project Management' },
      { id: 'tendering', name: 'Pre-construction & Tendering', section: 'Project Management' },
      { id: 'execution', name: 'Execution & Progress', section: 'Project Management' },
      { id: 'bills', name: 'RA Bills & Payments', section: 'Project Management' },
      { id: 'coe', name: 'CoE Registry', section: 'Centres of Excellence' },
      { id: 'space', name: 'Space Utilisation', section: 'Centres of Excellence' },
      { id: 'courses', name: 'Course Proposals & Students', section: 'Centres of Excellence' },
      { id: 'contracts', name: 'Partner Contracts', section: 'Centres of Excellence' },
      { id: 'revenue', name: 'Revenue & Settlements', section: 'Centres of Excellence' },
      { id: 'eoi', name: 'Expressions of Interest', section: 'Accreditation' },
      { id: 'applications', name: 'TSP Applications', section: 'Accreditation' },
      { id: 'bac', name: 'Technical Evaluation & BAC', section: 'Accreditation' },
      { id: 'assets', name: 'Assets & AMC', section: 'Facilities & AMC' },
      { id: 'tickets', name: 'Maintenance Tickets', section: 'Facilities & AMC' },
      { id: 'sla', name: 'SLA & Penalties', section: 'Facilities & AMC' },
      { id: 'reports', name: 'Reports & Audit', section: 'Reports' },
    ],
  },
];
