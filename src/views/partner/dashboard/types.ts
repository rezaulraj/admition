import type { Application, Country } from "@/views/student/dashboard/types";

export type ApprovalStatus = "Pending" | "Approved" | "Rejected";

export interface AgentProfile {
  agentId: number;
  fullName: string;
  email: string;
  phone: string | null;
  nationalityId: number;
  companyName: string | null;
  isEmailVerified: boolean;
  approvalStatus: ApprovalStatus;
  registeredOn: string;
  nationality: Country;
  destinations: { countryId: number; country: Country }[];
  identityDocFilePath: string | null;
  tradeLicenseFilePath: string | null;
  ownerPhotoFilePath: string | null;
  kycReviewNote: string | null;
  businessRegistrationAddress: string | null;
  staffCount: number | null;
  contactPersonName: string | null;
  contactPersonDesignation: string | null;
  contactPersonPhone: string | null;
  contactPersonEmail: string | null;
  verificationSubmittedAt: string | null;
}

export interface AgentStats {
  applications: number;
  visaSuccess: number;
  totalCommission: number;
  commissionPaid: number;
}

export interface ApplicationFeeRow {
  applicationId: number;
  currentStatus: Application["currentStatus"];
  feeStatus: Application["feeStatus"];
  student: { fullName: string; email: string };
  university: string;
  program: string;
  applicationFee: string;
  currency: string;
}

export type AgreementStatus = "Pending" | "Submitted" | "Signed" | "Expired";

export interface AgentAgreement {
  agreementId: number;
  agentId: number;
  filePath: string;
  signedFilePath: string | null;
  status: AgreementStatus;
  signedAt: string | null;
  createdAt: string;
}

export type PayoutMethodType = "BankTransfer" | "PayPal" | "Other";

export interface PayoutMethod {
  payoutMethodId: number;
  agentId: number;
  methodType: PayoutMethodType;
  isDefault: boolean;
  accountHolderName: string;
  accountNumber: string;
  bankName: string | null;
  bankAddress: string | null;
  branch: string | null;
  swiftCode: string | null;
  ifscCode: string | null;
  beneficiaryNumber: string | null;
  beneficiaryAddress: string | null;
  notes: string | null;
}

export type PayoutStatus = "Pending" | "Approved" | "Paid";

export interface PayoutMethodSummary {
  payoutMethodId: number;
  bankName: string | null;
  accountHolderName: string;
  accountNumber: string;
}

export interface CommissionPayout {
  payoutId: number;
  applicationId: number;
  agentId: number;
  amount: string;
  currency: string;
  status: PayoutStatus;
  payoutDate: string | null;
  reference: string | null;
  application: Application;
  payoutMethod: PayoutMethodSummary | null;
}

export interface TransactionHistoryRow {
  transactionId: number;
  relatedType: string;
  relatedId: number;
  amount: string;
  currency: string;
  notes: string | null;
  transactionDate: string;
}

export type TeamMemberRole = "Manager" | "Staff";
export type TeamMemberStatus = "Active" | "Inactive";

export interface TeamMember {
  memberId: number;
  agentId: number;
  fullName: string;
  email: string;
  role: TeamMemberRole;
  status: TeamMemberStatus;
  createdAt: string;
}

export interface Certificate {
  certificateId: number;
  agentId: number;
  title: string;
  filePath: string;
  issuedAt: string;
}

export const APPROVAL_COLORS: Record<ApprovalStatus, string> = {
  Pending: "#a16207",
  Approved: "#15803d",
  Rejected: "#dc2626",
};

export const AGREEMENT_COLORS: Record<AgreementStatus, string> = {
  Pending: "#a16207",
  Submitted: "#1a5fd8",
  Signed: "#15803d",
  Expired: "#78716c",
};

export const PAYOUT_COLORS: Record<PayoutStatus, string> = {
  Pending: "#a16207",
  Approved: "#1a5fd8",
  Paid: "#15803d",
};
