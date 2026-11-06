import type { ApplicationStatus, Country, Program, StudentPreference, University } from "@/views/student/dashboard/types";
import type { AgentAgreement, AgentProfile, PayoutMethodSummary, PayoutStatus, TransactionHistoryRow } from "@/views/partner/dashboard/types";

export interface AdminStats {
  totalStudents: number;
  totalAgents: number;
  pendingAgents: number;
  approvedAgents: number;
  totalUniversities: number;
  totalPrograms: number;
  totalApplications: number;
  applicationsByStatus: Partial<Record<ApplicationStatus, number>>;
  pendingMeetings: number;
  commissionPaid: number;
  commissionPending: number;
}

export interface AdminStudentRow {
  studentId: number;
  fullName: string;
  email: string;
  phone: string | null;
  isEmailVerified: boolean;
  registeredOn: string;
  nationality: Country;
  preference: StudentPreference | null;
}

export type CommissionLevel = "Foundation" | "Diploma" | "Bachelor" | "Master";

export const COMMISSION_LEVELS: CommissionLevel[] = ["Foundation", "Diploma", "Bachelor", "Master"];

export const COMMISSION_LEVEL_LABELS: Record<CommissionLevel, string> = {
  Foundation: "Foundation",
  Diploma: "Diploma",
  Bachelor: "Bachelor",
  Master: "Masters",
};

export interface Commission {
  commissionId: number;
  universityId: number | null;
  programId: number | null;
  level: CommissionLevel | null;
  ratePercent: string | null;
  flatAmount: string | null;
  currency: string;
  remark: string | null;
  effectiveFrom: string;
  university?: University | null;
  program?: Program | null;
}

export interface AdminPayout {
  payoutId: number;
  applicationId: number;
  agentId: number;
  amount: string;
  currency: string;
  status: PayoutStatus;
  payoutDate: string | null;
  reference: string | null;
  payoutMethodId: number | null;
  application: {
    applicationId: number;
    student: { fullName: string; email: string };
    intake: { program: { programName: string } };
  };
  agent: { fullName: string; email: string };
  payoutMethod: PayoutMethodSummary | null;
}

export type VisaAgentSource = "International" | "Bangladesh";
export type VisaTaskStatus = "Pending" | "Done";
export type VisaCandidateGender = "Male" | "Female" | "Other";

export interface VisaAgent {
  visaAgentId: number;
  name: string;
  source: VisaAgentSource;
  colorHex: string | null;
  createdAt: string;
}

export interface VisaCandidate {
  visaCandidateId: number;
  date: string;
  visaAgentId: number;
  gender: VisaCandidateGender;
  fullName: string;
  passportNo: string;
  destination: string;
  interviewStatus: VisaTaskStatus;
  missingDocStatus: VisaTaskStatus;
  remark: string | null;
  createdAt: string;
  updatedAt: string;
  visaAgent?: VisaAgent;
}

export interface VisaBankAccount {
  visaBankAccountId: number;
  bankName: string;
  branch: string | null;
  accountNumber: string;
  accountHolderName: string | null;
  createdAt: string;
}

export interface VisaTopUpItem {
  visaTopUpItemId: number;
  visaTopUpId: number;
  visaCandidateId: number;
  amount: string;
  visaCandidate?: VisaCandidate;
}

export interface VisaTopUp {
  visaTopUpId: number;
  serial: string;
  paymentDate: string;
  bankTnxId: string;
  amount: string;
  currency: string;
  visaBankAccountId: number;
  purpose: string | null;
  receiptUrl: string;
  invoiceNumber: string | null;
  euroAmount: string | null;
  euroRate: string | null;
  createdAt: string;
  visaBankAccount?: VisaBankAccount;
  items: VisaTopUpItem[];
}

export type MeetingStatus = "Requested" | "Approved" | "Completed" | "Cancelled";

export interface Meeting {
  meetingId: number;
  studentId: number | null;
  agentId: number | null;
  scheduledAt: string;
  durationMinutes: number | null;
  meetingLink: string | null;
  status: MeetingStatus;
  student?: { fullName: string; email: string } | null;
  agent?: { fullName: string; email: string } | null;
}

export const MEETING_COLORS: Record<MeetingStatus, string> = {
  Requested: "#a16207",
  Approved: "#1a5fd8",
  Completed: "#15803d",
  Cancelled: "#78716c",
};

export type { AgentAgreement, AgentProfile, TransactionHistoryRow };
