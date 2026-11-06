export interface Country {
  countryId: number;
  countryName: string;
  countryCode: string;
  flagUrl?: string | null;
}

export interface University {
  universityId: number;
  universityName: string;
  countryId: number;
  city: string | null;
  logoUrl: string | null;
  admissionBannerUrl?: string | null;
  universityImageUrl?: string | null;
  eligibilityNotes?: string | null;
  requiredDocumentsNotes?: string | null;
  country?: Country;
  programs?: Program[];
  _count?: { programs: number };
}

export type StudyLevel = "Foundation" | "Diploma" | "Bachelor" | "Master";

export interface Intake {
  intakeId: number;
  programId: number;
  intakeName: string;
  intakeYear: number;
  applicationDeadline: string;
  seatsAvailable: number | null;
}

export interface ProgramRequirement {
  requirementId: number;
  programId: number;
  requirementType: string;
  minValue: string;
  isMandatory: boolean;
}

export interface Program {
  programId: number;
  universityId: number;
  programName: string;
  degreeLevel: StudyLevel;
  fieldOfStudy: string | null;
  durationMonths: number | null;
  tuitionFee: string;
  applicationFee: string;
  currency: string;
  admissionDetails?: string | null;
  university?: University;
  intakes?: Intake[];
  requirements?: ProgramRequirement[];
}

export interface Lead {
  leadId: number;
  universityId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredStudyLevel: StudyLevel | null;
  intakeId: number | null;
  wantsContact: boolean;
  wantsUpdates: boolean;
  createdAt: string;
  university?: University;
  intake?: Intake | null;
}

export type ArticleType = "Article" | "Guide";
export type ArticleSubmittedBy = "student" | "agent" | "admin";

export interface ArticleAuthor {
  agentId: number;
  fullName: string;
  companyName: string | null;
}

export interface Article {
  articleId: number;
  title: string;
  type: ArticleType;
  category: string | null;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  isPublished: boolean;
  submittedBy: ArticleSubmittedBy;
  agentId: number | null;
  universityId: number | null;
  publishedAt: string;
  createdAt: string;
  agent?: ArticleAuthor | null;
  university?: University | null;
}

export interface Event {
  eventId: number;
  title: string;
  description: string | null;
  location: string | null;
  startDate: string;
  endDate: string | null;
  coverImageUrl: string | null;
  registrationUrl: string | null;
  isPublished: boolean;
  createdAt: string;
}

export type ApplicationStatus =
  | "Submitted"
  | "UnderReview"
  | "OfferIssued"
  | "OfferAccepted"
  | "VisaApplied"
  | "VisaApproved"
  | "Enrolled"
  | "Rejected"
  | "Withdrawn";

export interface DocumentRecord {
  documentId: number;
  applicationId: number;
  docType: string;
  filePath: string;
  verificationStatus: "Pending" | "Verified" | "Rejected";
  uploadedAt: string;
}

export interface ApplicationStatusHistoryRecord {
  historyId: number;
  applicationId: number;
  status: ApplicationStatus;
  remarks: string | null;
  changedBy: "student" | "agent" | "admin" | null;
  changedAt: string;
}

export type FeePaymentStatus = "Unpaid" | "Pending" | "Paid";

export interface Application {
  applicationId: number;
  studentId: number;
  intakeId: number;
  agentId: number | null;
  submittedBy: "student" | "agent" | "admin";
  currentStatus: ApplicationStatus;
  appliedDate: string;
  feeStatus: FeePaymentStatus;
  feePaymentRef: string | null;
  feeReceiptUrl: string | null;
  feePaidAt: string | null;
  feeNotes: string | null;
  intake: Intake & { program: Program & { university: University } };
  documents: DocumentRecord[];
  statusHistory: ApplicationStatusHistoryRecord[];
  /** Present on the agent/admin views (narrowed to non-sensitive fields server-side). */
  student?: { studentId: number; fullName: string; email: string; phone: string | null };
  agent?: { agentId: number; fullName: string; email: string; phone: string | null; companyName: string | null } | null;
}

export interface StudentPreference {
  preferenceId: number;
  studentId: number;
  lastEducation: string | null;
  intendedStudyLevel: StudyLevel | null;
  desiredField: string | null;
  intakeName: string | null;
  intakeYear: number | null;
  tuitionBudgetUsd: string | null;
  incomeSource: string | null;
  hasEnglishTest: boolean;
  englishTestType: string | null;
  englishTestScore: string | null;
}

export interface StudentSearchResult {
  studentId: number;
  fullName: string;
  email: string;
  phone: string | null;
  passportNumber: string | null;
  dateOfBirth: string | null;
  nationality: { countryName: string };
}

export interface StudentProfile {
  studentId: number;
  fullName: string;
  email: string;
  phone: string | null;
  nationalityId: number;
  isEmailVerified: boolean;
  termsAccepted: boolean;
  registeredOn: string;
  nationality: Country;
  destinations: { countryId: number; country: Country }[];
  preference: StudentPreference | null;
}

export interface SuggestionsResponse {
  basedOnPreference: boolean;
  count: number;
  programs: Program[];
}

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  Submitted: "Submitted",
  UnderReview: "Under Review",
  OfferIssued: "Offer Issued",
  OfferAccepted: "Offer Accepted",
  VisaApplied: "Visa Applied",
  VisaApproved: "Visa Approved",
  Enrolled: "Enrolled",
  Rejected: "Rejected",
  Withdrawn: "Withdrawn",
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Submitted: "#64748b",
  UnderReview: "#a16207",
  OfferIssued: "#1a5fd8",
  OfferAccepted: "#0f766e",
  VisaApplied: "#7c3aed",
  VisaApproved: "#0e7490",
  Enrolled: "#15803d",
  Rejected: "#dc2626",
  Withdrawn: "#78716c",
};

export const FEE_STATUS_LABELS: Record<FeePaymentStatus, string> = {
  Unpaid: "Payment Pending",
  Pending: "Awaiting Confirmation",
  Paid: "Paid",
};

export const FEE_STATUS_COLORS: Record<FeePaymentStatus, string> = {
  Unpaid: "#64748b",
  Pending: "#a16207",
  Paid: "#15803d",
};

export const ACTIVE_STATUSES: ApplicationStatus[] = [
  "Submitted",
  "UnderReview",
  "OfferIssued",
  "OfferAccepted",
  "VisaApplied",
  "VisaApproved",
];
