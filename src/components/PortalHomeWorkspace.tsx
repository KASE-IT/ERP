import React, { useState } from 'react';

export interface InternalUpdate {
  id: string;
  refNo: string;
  category: 'Circular' | 'Event' | 'Order' | 'Notice';
  title: string;
  date: string;
  division: string;
  signatory: string;
  synopsis: string;
  content: string;
  priority: 'Normal' | 'Important' | 'Urgent';
}

export interface ExternalUpdate {
  id: string;
  stream: 'Centrally Sponsored' | 'State Scheme' | 'CoE Infrastructure' | 'Placement Drive';
  partner: string;
  title: string;
  date: string;
  location: string;
  metric?: string;
  synopsis: string;
  content: string;
  status: 'Launched' | 'Ongoing' | 'Milestone Reached' | 'Upcoming';
}

export const PortalHomeWorkspace: React.FC = () => {
  // Filters
  const [internalCategory, setInternalCategory] = useState<string>('All');
  const [externalStream, setExternalStream] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active detail modal item
  const [selectedItem, setSelectedItem] = useState<
    | { type: 'internal'; data: InternalUpdate }
    | { type: 'external'; data: ExternalUpdate }
    | null
  >(null);

  // 1. Internal News & Circulars Data
  const [internalNews] = useState<InternalUpdate[]>([
    {
      id: 'INT-2026-042',
      refNo: 'KASE/ADMIN/CIR/2026/184',
      category: 'Circular',
      title: 'Annual Performance Appraisal Cycles & Self-Appraisal Submission Guidelines',
      date: '20-Oct-2026',
      division: 'HR Division',
      signatory: 'Smt. Reshmi M B, HR Manager',
      priority: 'Urgent',
      synopsis: 'All division executives and contract staff are instructed to submit their annual self-appraisal dossier through the HR module before November 10, 2026.',
      content: `In accordance with Section 14 of the KASE Service Regulations 2024, all regular, deputation, and contract personnel deployed across Head Office and District Skill Centres are hereby notified that the Annual Performance Appraisal review for FY 2026–27 has commenced.

Key Instructions:
1. All staff members must complete self-appraisal submissions via the ERP HR portal under 'Appraisal Sheets' by 10-Nov-2026.
2. Division heads (Managers in charge) shall complete reporting and scoring within 14 calendar days following submission.
3. Supporting achievement documents for milestones achieved during the period must be uploaded in PDF format.

Failure to adhere to the deadline may delay annual increment processing and contract renewals.`,
    },
    {
      id: 'INT-2026-041',
      refNo: 'KASE/IT/SEC/2026/091',
      category: 'Notice',
      title: 'Mandatory Implementation of Multi-Factor Authentication for ERP and eOffice Access',
      date: '18-Oct-2026',
      division: 'IT Division',
      signatory: 'Shri. Subin Das S, Manager IT',
      priority: 'Important',
      synopsis: 'Enhanced cybersecurity guidelines issued by Kerala State IT Mission require all administrative logins to enable 2FA credentials before month-end.',
      content: `Pursuant to the Cyber Security Audit recommendations issued by CERT-K and the Kerala State IT Mission (KSITM), all enterprise systems hosted at the State Data Centre (SDC) must enforce secondary verification protocols.

Timeline & Action:
- Phase 1: High-privilege administrative accounts (Finance, HR, Projects) must link authenticator keys by 25-Oct-2026.
- Phase 2: All general employee ESS logins will mandate OTP verification starting 01-Nov-2026.
- IT Helpdesk is conducting daily desk-side verification from 10:00 AM to 12:30 PM at the 3rd floor IT Control Room.`,
    },
    {
      id: 'INT-2026-040',
      refNo: 'KASE/MD/ORD/2026/310',
      category: 'Order',
      title: 'Constitution of Technical Scrutiny Committee for Centre of Excellence Space Allocation',
      date: '15-Oct-2026',
      division: 'Managing Director Office',
      signatory: 'Managing Director, KASE',
      priority: 'Normal',
      synopsis: 'A dedicated four-member committee has been constituted to evaluate industrial partner applications for remaining infrastructure floor space at the Angamaly Skilling Park.',
      content: `Sanction is hereby accorded for the constitution of an Internal Technical Scrutiny Committee to evaluate Expression of Interest (EoI) submissions received for occupying incubation space at the Angamaly International Skill Park.

Committee Composition:
1. Smt. Smitha C, Manager in Charge (Projects) – Chairperson & Convener
2. Shri. Subin Das S, Manager IT – Member
3. Shri. Sivadutt S, Project Manager (Civil) – Member
4. Shri. Ahmed Surjith, Executive (CoE) – Member

The committee shall convene its first meeting on 28-Oct-2026 and present its recommendation memo to the Board of Directors.`,
    },
    {
      id: 'INT-2026-039',
      refNo: 'KASE/SD/TRG/2026/112',
      category: 'Event',
      title: 'State-Level Workshop on Green Hydrogen Skilling Framework & Curriculum Standards',
      date: '12-Oct-2026',
      division: 'Skill Development Division',
      signatory: 'Shri. Anoop R, Manager (Skill Development)',
      priority: 'Normal',
      synopsis: 'A 2-day national seminar and hands-on curriculum harmonization workshop hosted at Mascot Hotel, Thiruvananthapuram for accredited Training Service Providers.',
      content: `The Skill Development Division, in collaboration with the National Skill Development Corporation (NSDC) and the Energy Management Centre (EMC) Kerala, is organizing a state-wide stakeholder workshop.

Event Highlights:
- Dates: 04-Nov-2026 & 05-Nov-2026 (9:30 AM – 5:00 PM)
- Venue: Symphony Hall, Mascot Hotel, Thiruvananthapuram
- Target Participants: Registered TSPs, sector skill council representatives, and vocational training coordinators.
- Focus Areas: Green Hydrogen electrolyser maintenance, fuel cell technology training, and safety certification.`,
    },
    {
      id: 'INT-2026-038',
      refNo: 'KASE/ADMIN/NOT/2026/077',
      category: 'Notice',
      title: 'Quarterly Physical Verification of Store Stationery & Capital IT Assets',
      date: '08-Oct-2026',
      division: 'Administration Division',
      signatory: 'Administration Manager, KASE',
      priority: 'Normal',
      synopsis: 'Central Store inventory audit and physical verification of laptops, desktop portals, and office furniture will be conducted from October 22 to 24.',
      content: `Notice is hereby issued that the third quarter physical verification of inventory assets will be conducted across all divisions as per Financial Code guidelines.

All division custodians are requested to verify their physical registers against the Digital Inventory Ledger in the ERP. Kindly ensure that all gate-passes and movement registers are updated.`,
    },
  ]);

  // 2. External News, Projects & Skilling Developments Data
  const [externalNews] = useState<ExternalUpdate[]>([
    {
      id: 'EXT-2026-081',
      stream: 'Centrally Sponsored',
      partner: 'Keltron & NSDC',
      title: 'Launch of PMKVY 4.0 First Batch Rollout for Drone Servicing & Autonomous Systems',
      date: '21-Oct-2026',
      location: 'Kozhikode & Malappuram',
      metric: '120 Candidates Enrolled',
      status: 'Launched',
      synopsis: 'Training mobilization successfully completed for 120 rural youths in agricultural drone operations and precision avionics maintenance under PMKVY Special Projects.',
      content: `The first state-level batch of the Prime Minister Kaushal Vikas Yojana (PMKVY 4.0) dedicated to precision drone mechanics has officially commenced training operations across two accredited centres in Kozhikode and Malappuram.

Key Project Parameters:
- Total Sanctioned Seats: 120 (4 batches of 30 candidates each)
- Assessment Body: Aerospace and Aviation Sector Skill Council (AASSC)
- Training Partner: Kerala State Electronics Development Corporation (Keltron)
- Curriculum Duration: 400 hours including 120 hours of mandatory field flight simulation.
- Stipend & Kit: Government-provided toolkits and safety kits dispatched to all centres.`,
    },
    {
      id: 'EXT-2026-080',
      stream: 'CoE Infrastructure',
      partner: 'Department of Labour & Skills',
      title: 'Centres of Excellence in Oil & Gas and Precision Fabrication Reaches 85% Civil Completion',
      date: '19-Oct-2026',
      location: 'Chavara, Kollam',
      metric: '85% Physical Progress',
      status: 'Milestone Reached',
      synopsis: 'Heavy machinery installation and high-pressure underwater welding simulation tanks successfully installed at the Chavara skill campus.',
      content: `Civil and structural works for the state-of-the-art Centre of Excellence (CoE) in Offshore Oil & Gas Fabrication at Chavara have achieved the 85% completion milestone as certified by the Superintending Engineer, KASE Projects Division.

Status Summary:
- Workshop Hall A (Underwater Welding): Civil tanks completed; specialized hydro-testing equipment cleared customs.
- Electrical & Substation: 11kV transformer installed and energized by KSEB.
- RA Bill Status: Bill No. 06 processed and verified under FICO ledger.
- Anticipated Inauguration: Q4 FY 2026–27.`,
    },
    {
      id: 'EXT-2026-079',
      stream: 'Placement Drive',
      partner: 'Confederation of Indian Industry (CII)',
      title: 'Mega Job Fair 2026: 45 Global & Domestic Employers Register 1,800+ Technical Vacancies',
      date: '16-Oct-2026',
      location: 'Ernakulam Town Hall',
      metric: '1,800+ Openings Registered',
      status: 'Upcoming',
      synopsis: 'Pre-screening of 3,400 registered candidates completed via the KASE Talent Pool portal; interviews scheduled for November 14 & 15.',
      content: `The Placements Division of KASE, in joint partnership with the Confederation of Indian Industry (CII) and District Employment Exchanges, has announced the registration results for the upcoming Mega Job Fair 2026.

Employer Highlights:
- Participating Sectors: Automotive Engineering, Precision CNC, Healthcare Logistics, Renewable Energy, and Cloud Infrastructure.
- Screening Progress: 3,420 candidates shortlisted through automated ERP skill-matching filters.
- Admit Cards: Hall tickets with QR-code interview slotting will be generated via candidate ESS portals on 01-Nov-2026.`,
    },
    {
      id: 'EXT-2026-078',
      stream: 'State Scheme',
      partner: 'Kerala Technical Learning Centre',
      title: 'Sanction Accorded for SC/ST Special Skill Empowerment Initiative across 5 Districts',
      date: '14-Oct-2026',
      location: 'Wayanad, Idukki, Palakkad',
      metric: 'Rs. 2.45 Cr Budget Sanctioned',
      status: 'Ongoing',
      synopsis: 'State Plan fund allocation cleared for 480 youth from tribal and scheduled caste settlements with residential stipend and assured employment linkage.',
      content: `Government of Kerala through the Scheduled Castes & Scheduled Tribes Development Department has accorded administrative sanction for a comprehensive skill upliftment scheme managed by KASE.

Scheme Architecture:
- Approved Courses: Advanced Solar PV Installation, Industrial Automation, Heavy Commercial Vehicle Operations, and Nursing Assistant.
- Accommodation: Fully residential training with complimentary boarding and monthly conveyance allowance.
- Milestone Tracking: Integrated with State Treasury Ledger mapping 'SC-DEV-2026' in the ERP.`,
    },
    {
      id: 'EXT-2026-077',
      stream: 'CoE Infrastructure',
      partner: 'Chamber of German Industries (AHK India)',
      title: 'Indo-German Dual Vocational Training Partnership Signed for Mechatronics & Tool Design',
      date: '10-Oct-2026',
      location: 'Trivandrum International Skilling Centre',
      metric: 'DIHK German Certification',
      status: 'Ongoing',
      synopsis: 'Bilateral agreement formalises German DIHK accreditation for student trainees, offering direct apprenticeship pathways in automotive clusters.',
      content: `KASE has signed an umbrella memorandum of understanding with the Indo-German Chamber of Commerce (AHK India) to implement dual-system vocational education in Kerala.

Curriculum Highlights:
- International Certification: Successful trainees receive internationally recognized AHK-DIHK Level 2 Certifications.
- Industrial Immersion: 60% practical on-the-job training in manufacturing plants, 40% institutional classroom instruction at KASE CoE.
- First Cohort: Scheduled to begin induction in December 2026.`,
    },
  ]);

  // Filtering Logic
  const filteredInternal = internalNews.filter((item) => {
    if (internalCategory !== 'All' && item.category !== internalCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.refNo.toLowerCase().includes(q) ||
      item.division.toLowerCase().includes(q) ||
      item.synopsis.toLowerCase().includes(q)
    );
  });

  const filteredExternal = externalNews.filter((item) => {
    if (externalStream !== 'All' && item.stream !== externalStream) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.partner.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.synopsis.toLowerCase().includes(q)
    );
  });

  const getPriorityBadge = (priority: InternalUpdate['priority']) => {
    if (priority === 'Urgent') {
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100/80 px-2 py-0.5 rounded">
          Urgent
        </span>
      );
    }
    if (priority === 'Important') {
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
          Important
        </span>
      );
    }
    return (
      <span className="text-[10px] font-medium uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
        Notice
      </span>
    );
  };

  const getStatusBadge = (status: ExternalUpdate['status']) => {
    if (status === 'Launched') {
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
          Launched
        </span>
      );
    }
    if (status === 'Milestone Reached') {
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
          Milestone Reached
        </span>
      );
    }
    if (status === 'Upcoming') {
      return (
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
          Upcoming
        </span>
      );
    }
    return (
      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
        Ongoing
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f3f2f1] text-[#201f1e] overflow-hidden select-none font-sans">
      {/* Top Banner / Search bar */}
      <div className="bg-white px-5 py-3 border-b border-[#d2d0ce] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <h2 className="text-base font-semibold text-[#004578] m-0 leading-tight">
            Kerala Academy for Skills Excellence (KASE) · State Portal News & Operations Feed
          </h2>
          <p className="text-[11px] text-gray-500 m-0 mt-0.5">
            Internal organizational circulars, official government orders, training batch milestones, and sector skilling intelligence.
          </p>
        </div>

        {/* Global Live Search input across feeds */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search circulars, news or projects…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#0078d4] focus:bg-white shadow-inner transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-600 text-xs font-bold"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Side-by-Side News Canvas */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full items-start">
          
          {/* ========================================================================= */}
          {/* BLOCK 1 (LEFT COLUMN): INTERNAL DEVELOPMENTS & ORGANIZATIONAL NOTICES    */}
          {/* ========================================================================= */}
          <section className="bg-white border border-[#d2d0ce] rounded shadow-xs flex flex-col h-full max-h-[calc(100vh-140px)] overflow-hidden">
            {/* Block 1 Header */}
            <div className="p-3.5 bg-gray-50 border-b border-[#d2d0ce] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0078d4] shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#004578] m-0">
                  Internal Developments & Circulars
                </h3>
                <span className="text-[11px] text-gray-400 font-mono">
                  ({filteredInternal.length})
                </span>
              </div>

              {/* Category Segmented Tabs */}
              <div className="flex items-center space-x-1 bg-white p-0.5 rounded border border-gray-300 text-[11px]">
                {['All', 'Circular', 'Notice', 'Order', 'Event'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setInternalCategory(cat)}
                    className={`px-2 py-0.5 rounded transition cursor-pointer font-medium ${
                      internalCategory === cat
                        ? 'bg-[#004578] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Block 1 Feed List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 divide-y divide-gray-100">
              {filteredInternal.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs">
                  No internal notices match the selected filter.
                </div>
              ) : (
                filteredInternal.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => setSelectedItem({ type: 'internal', data: item })}
                    className="pt-3 first:pt-0 group cursor-pointer transition hover:bg-blue-50/40 p-2.5 rounded"
                  >
                    {/* Metadata line: date · division · refNo */}
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                      <div className="flex items-center space-x-1.5 truncate">
                        <span className="font-semibold text-gray-700">{item.division}</span>
                        <span>·</span>
                        <span>{item.date}</span>
                        <span>·</span>
                        <span className="font-mono text-gray-400 truncate">{item.refNo}</span>
                      </div>
                      <div className="shrink-0 ml-2">
                        {getPriorityBadge(item.priority)}
                      </div>
                    </div>

                    {/* Headline */}
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#0078d4] transition leading-snug m-0 mb-1">
                      {item.title}
                    </h4>

                    {/* Synopsis */}
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed m-0 mb-2">
                      {item.synopsis}
                    </p>

                    {/* Footer / Trigger */}
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-100/60">
                      <span className="text-gray-400 text-[10px]">
                        Issued by: {item.signatory}
                      </span>
                      <span className="text-[#0078d4] font-semibold flex items-center space-x-0.5 group-hover:underline">
                        <span>Read Notice</span>
                        <span>›</span>
                      </span>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Block 1 Footer */}
            <div className="px-3.5 py-2 bg-gray-50 border-t border-gray-200 text-[11px] text-gray-500 flex items-center justify-between shrink-0">
              <span>Authentic state circulars verified by MD Secretariat</span>
              <span>Updated Today</span>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* BLOCK 2 (RIGHT COLUMN): EXTERNAL SKILLING NEWS & PROJECT MILESTONES       */}
          {/* ========================================================================= */}
          <section className="bg-white border border-[#d2d0ce] rounded shadow-xs flex flex-col h-full max-h-[calc(100vh-140px)] overflow-hidden">
            {/* Block 2 Header */}
            <div className="p-3.5 bg-gray-50 border-b border-[#d2d0ce] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#107c10] shrink-0" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#004578] m-0">
                  External News & Project Milestones
                </h3>
                <span className="text-[11px] text-gray-400 font-mono">
                  ({filteredExternal.length})
                </span>
              </div>

              {/* Stream Segmented Tabs */}
              <div className="flex items-center space-x-1 bg-white p-0.5 rounded border border-gray-300 text-[11px]">
                {['All', 'Centrally Sponsored', 'State Scheme', 'CoE Infrastructure', 'Placement Drive'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setExternalStream(st)}
                    className={`px-2 py-0.5 rounded transition cursor-pointer font-medium truncate max-w-[120px] ${
                      externalStream === st
                        ? 'bg-[#004578] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {st === 'Centrally Sponsored'
                      ? 'Central'
                      : st === 'CoE Infrastructure'
                      ? 'CoE'
                      : st === 'Placement Drive'
                      ? 'Placements'
                      : st === 'State Scheme'
                      ? 'State'
                      : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Block 2 Feed List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 divide-y divide-gray-100">
              {filteredExternal.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs">
                  No external project milestones match the selected filter.
                </div>
              ) : (
                filteredExternal.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => setSelectedItem({ type: 'external', data: item })}
                    className="pt-3 first:pt-0 group cursor-pointer transition hover:bg-green-50/40 p-2.5 rounded"
                  >
                    {/* Metadata line: stream · partner · date */}
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                      <div className="flex items-center space-x-1.5 truncate">
                        <span className="font-semibold text-gray-700">{item.stream}</span>
                        <span>·</span>
                        <span>{item.partner}</span>
                        <span>·</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="shrink-0 ml-2">
                        {getStatusBadge(item.status)}
                      </div>
                    </div>

                    {/* Headline */}
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#107c10] transition leading-snug m-0 mb-1">
                      {item.title}
                    </h4>

                    {/* Location & Key Metric Highlight */}
                    <div className="flex items-center space-x-2 text-[11px] text-gray-500 mb-1.5">
                      <span>📍 {item.location}</span>
                      {item.metric && (
                        <>
                          <span>·</span>
                          <span className="font-semibold text-[#004578] bg-blue-50 px-1.5 py-0.2 rounded">
                            {item.metric}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Synopsis */}
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed m-0 mb-2">
                      {item.synopsis}
                    </p>

                    {/* Footer / Trigger */}
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-100/60">
                      <span className="text-gray-400 text-[10px]">
                        State Skilling Mission · {item.partner}
                      </span>
                      <span className="text-[#107c10] font-semibold flex items-center space-x-0.5 group-hover:underline">
                        <span>Read Progress Brief</span>
                        <span>›</span>
                      </span>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Block 2 Footer */}
            <div className="px-3.5 py-2 bg-gray-50 border-t border-gray-200 text-[11px] text-gray-500 flex items-center justify-between shrink-0">
              <span>National & State Skilling Ecosystem Announcements</span>
              <span>FY 2026–27</span>
            </div>
          </section>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL DOCUMENT / NOTIFICATION MODAL PREVIEW                                */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-400 w-full max-w-2xl max-h-[85vh] rounded shadow-2xl flex flex-col overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="bg-[#004578] text-white px-5 py-3 font-semibold text-sm flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <span>
                  {selectedItem.type === 'internal'
                    ? 'Official Circular & Administrative Notice'
                    : 'Project Milestone & Sector Brief'}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-white hover:text-gray-300 font-bold text-base focus:outline-none cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              {selectedItem.type === 'internal' ? (
                <>
                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-gray-500 font-bold">
                        {selectedItem.data.refNo}
                      </span>
                      {getPriorityBadge(selectedItem.data.priority)}
                    </div>
                    <h3 className="text-sm font-bold text-[#004578] leading-snug m-0 mb-1">
                      {selectedItem.data.title}
                    </h3>
                    <div className="text-[11px] text-gray-500 flex items-center space-x-2">
                      <span>Issuing Division: <b>{selectedItem.data.division}</b></span>
                      <span>·</span>
                      <span>Published: {selectedItem.data.date}</span>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-line text-gray-800 leading-relaxed font-sans text-xs">
                    {selectedItem.data.content}
                  </div>

                  <div className="pt-2 text-right text-gray-600 text-[11px]">
                    <span className="block font-semibold">{selectedItem.data.signatory}</span>
                    <span className="text-gray-400">Kerala Academy for Skills Excellence (KASE)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-gray-600">
                        {selectedItem.data.stream} · {selectedItem.data.partner}
                      </span>
                      {getStatusBadge(selectedItem.data.status)}
                    </div>
                    <h3 className="text-sm font-bold text-[#107c10] leading-snug m-0 mb-1">
                      {selectedItem.data.title}
                    </h3>
                    <div className="text-[11px] text-gray-500 flex items-center space-x-2">
                      <span>Location: <b>{selectedItem.data.location}</b></span>
                      <span>·</span>
                      <span>Reported Date: {selectedItem.data.date}</span>
                      {selectedItem.data.metric && (
                        <>
                          <span>·</span>
                          <span className="font-bold text-[#004578]">{selectedItem.data.metric}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-line text-gray-800 leading-relaxed font-sans text-xs">
                    {selectedItem.data.content}
                  </div>

                  <div className="pt-2 text-right text-gray-600 text-[11px]">
                    <span className="block font-semibold">Program Coordination Desk</span>
                    <span className="text-gray-400">State Skill Mission Operations · KASE</span>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-gray-100 border-t border-gray-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-gray-500">
                Official record verified under KASE ERP portal records.
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-1.5 bg-[#004578] text-white hover:bg-[#003861] font-semibold text-xs rounded cursor-pointer shadow-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
