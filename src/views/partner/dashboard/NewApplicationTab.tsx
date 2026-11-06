"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaEye,
  FaFilePdf,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPaperPlane,
  FaSearch,
  FaTimes,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import { useAuth, ApiError } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import { apiFetch, resolveAssetUrl, downloadAssetFile } from "@/lib/api";
import {
  Card,
  EmptyState,
  ErrorState,
  FieldLabel,
  LoadingState,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  inputClass,
  selectClass,
} from "@/components/dashboard/common/ui";
import CoverImageUploader from "@/components/dashboard/common/CoverImageUploader";
import StudentSearchField from "@/components/dashboard/common/StudentSearchField";
import {
  PaginationControls,
  usePagination,
} from "@/components/dashboard/common/Pagination";
import type {
  Country,
  Intake,
  Program,
  StudentSearchResult,
  StudyLevel,
  University,
} from "@/views/student/dashboard/types";

const GENDERS = ["Male", "Female", "Other"] as const;
const APPLYING_AS_OPTIONS = ["Self", "Dependent", "Spouse", "Child"] as const;
const STUDY_LEVELS: StudyLevel[] = ["Foundation", "Diploma", "Bachelor", "Master"];

type Step = "universities" | "programs" | "apply";

export default function NewApplicationTab({
  onCreated,
  initialUniversity,
}: {
  onCreated: () => void;
  /** Pre-selects a university and jumps straight to the programs step — set when arriving here via a card click on the Universities tab. */
  initialUniversity?: University | null;
}) {
  const [step, setStep] = useState<Step>(
    initialUniversity ? "programs" : "universities",
  );
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(initialUniversity ?? null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedIntakeId, setSelectedIntakeId] = useState<number | null>(null);

  const goToPrograms = (university: University) => {
    setSelectedUniversity(university);
    setStep("programs");
  };

  const goToApply = (program: Program, intakeId?: number) => {
    setSelectedProgram(program);
    setSelectedIntakeId(intakeId ?? null);
    setStep("apply");
  };

  const backToUniversities = () => {
    setStep("universities");
    setSelectedUniversity(null);
    setSelectedProgram(null);
    setSelectedIntakeId(null);
  };

  const backToPrograms = () => {
    setStep("programs");
    setSelectedProgram(null);
    setSelectedIntakeId(null);
  };

  return (
    <div className="fade-in">
      <SectionHeading
        title="Add Student Application"
        subtitle="Browse a university, pick a program, then submit the application."
      />

      {step === "universities" && (
        <UniversityBrowseStep onSelect={goToPrograms} />
      )}
      {step === "programs" && selectedUniversity && (
        <ProgramBrowseStep
          university={selectedUniversity}
          onBack={backToUniversities}
          onSelect={goToApply}
        />
      )}
      {step === "apply" && selectedUniversity && selectedProgram && (
        <ApplyStep
          university={selectedUniversity}
          program={selectedProgram}
          initialIntakeId={selectedIntakeId}
          onBack={backToPrograms}
          onCreated={() => {
            onCreated();
            backToUniversities();
          }}
        />
      )}
    </div>
  );
}

function UniversityBrowseStep({
  onSelect,
}: {
  onSelect: (university: University) => void;
}) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [universities, setUniversities] = useState<University[] | null>(null);
  const [error, setError] = useState("");
  const [countryId, setCountryId] = useState("");
  const [search, setSearch] = useState("");

  const load = () => {
    setError("");
    setUniversities(null);
    const params = new URLSearchParams();
    if (countryId) params.set("countryId", countryId);
    if (search) params.set("search", search);
    apiFetch<University[]>(`/universities?${params.toString()}`)
      .then(setUniversities)
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : "Failed to load universities.",
        ),
      );
  };

  useEffect(() => {
    apiFetch<Country[]>("/countries")
      .then(setCountries)
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    load();
  }, [countryId, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    totalItems,
    pageItems,
  } = usePagination(universities ?? []);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2 relative">
            <FaSearch
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0B1E3D]/30"
              size={13}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search universities…"
              className={`${inputClass} pl-9`}
            />
          </div>
          <select
            className={selectClass}
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}>
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c.countryId} value={c.countryId}>
                {c.countryName}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {universities === null && !error && (
        <LoadingState label="Loading universities…" />
      )}
      {error && <ErrorState message={error} onRetry={load} />}
      {universities && universities.length === 0 && (
        <EmptyState title="No universities match your filters" />
      )}

      {universities && universities.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((u) => (
              <button
                key={u.universityId}
                onClick={() => onSelect(u)}
                className="group text-left">
                <div className="overflow-hidden rounded-2xl border border-[#0B1E3D]/8 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#1E3A8A]/25 group-hover:shadow-xl group-hover:shadow-[#1E3A8A]/10">
                  <div className="relative h-32 w-full overflow-hidden bg-linear-to-br from-[#1E3A8A]/12 via-[#1E3A8A]/6 to-transparent">
                    {u.universityImageUrl ? (
                      <Image
                        src={resolveAssetUrl(u.universityImageUrl)!}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#1E3A8A]/15">
                        <FaUniversity size={34} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                    <span className="absolute -bottom-6 left-4 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[3px] border-white bg-white text-[#1E3A8A] shadow-md">
                      {u.logoUrl ? (
                        <Image
                          src={resolveAssetUrl(u.logoUrl)!}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <FaUniversity size={18} />
                      )}
                    </span>
                  </div>
                  <div className="px-4 pb-4 pt-8">
                    <p className="truncate text-[15px] font-extrabold text-[#0B1E3D] transition-colors group-hover:text-[#1E3A8A]">
                      {u.universityName}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#0B1E3D]/50">
                      <FaMapMarkerAlt size={10} className="text-[#1E3A8A]/50" />
                      {u.city ? `${u.city}, ` : ""}
                      {u.country?.countryName}
                    </p>
                    <div className="mt-3.5 flex items-center justify-between border-t border-[#0B1E3D]/6 pt-3">
                      {u._count ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E3A8A]/8 px-2.5 py-1 text-[11px] font-bold text-[#1E3A8A]">
                          <FaGraduationCap size={10} />
                          {u._count.programs} programs
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E3A8A]/40 transition-all group-hover:gap-1.5 group-hover:text-[#1E3A8A]">
                        View
                        <HiArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </div>
  );
}

function ProgramBrowseStep({
  university,
  onBack,
  onSelect,
}: {
  university: University;
  onBack: () => void;
  onSelect: (program: Program, intakeId?: number) => void;
}) {
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [error, setError] = useState("");

  const load = () => {
    setError("");
    setPrograms(null);
    apiFetch<Program[]>(`/programs?universityId=${university.universityId}`)
      .then(setPrograms)
      .catch((err) =>
        setError(
          err instanceof ApiError ? err.message : "Failed to load programs.",
        ),
      );
  };

  useEffect(() => {
    load();
  }, [university.universityId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#1E3A8A] hover:underline">
        <FaArrowLeft size={10} />
        All universities
      </button>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-3 p-5">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
            {university.logoUrl ? (
              <Image
                src={resolveAssetUrl(university.logoUrl)!}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <FaUniversity size={18} />
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-[#0B1E3D]">
              {university.universityName}
            </p>
            <p className="truncate text-xs font-medium text-[#0B1E3D]/50">
              {university.city ? `${university.city}, ` : ""}
              {university.country?.countryName}
            </p>
          </div>
        </div>
      </Card>

      {programs === null && !error && (
        <LoadingState label="Loading programs…" />
      )}
      {error && <ErrorState message={error} onRetry={load} />}
      {programs && programs.length === 0 && (
        <EmptyState title="This university has no programs yet" />
      )}

      {programs && programs.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {programs.map((p) => (
            <ProgramCard key={p.programId} program={p} university={university} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProgramCard({
  program,
  university,
  onSelect,
}: {
  program: Program;
  university: University;
  onSelect: (program: Program, intakeId?: number) => void;
}) {
  const intakes = program.intakes ?? [];
  const [intakeId, setIntakeId] = useState(intakes[0] ? String(intakes[0].intakeId) : "");
  const [downloading, setDownloading] = useState(false);

  const bannerIsPdf = Boolean(
    university.admissionBannerUrl && /\.pdf$/i.test(university.admissionBannerUrl),
  );
  const bannerUrl = university.admissionBannerUrl || university.universityImageUrl;

  const handleViewBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bannerUrl) return;
    window.open(resolveAssetUrl(bannerUrl)!, "_blank", "noopener,noreferrer");
  };

  const handleDownloadBanner = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bannerUrl) return;
    setDownloading(true);
    try {
      await downloadAssetFile(resolveAssetUrl(bannerUrl)!, university.universityName);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#0B1E3D]/8 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3 bg-linear-to-r from-[#1E3A8A] to-[#1E3A8A]/80 px-4 py-3">
        <p className="truncate text-sm font-extrabold text-white">{program.programName}</p>
        <button
          onClick={() => onSelect(program, intakeId ? Number(intakeId) : undefined)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#1E3A8A] transition hover:bg-white/90">
          <FaPaperPlane size={11} />
          Apply
        </button>
      </div>

      <div className="flex items-stretch gap-4 p-4">
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs font-semibold text-[#0B1E3D]/70">
            <span className="inline-flex items-center gap-1.5">
              <FaMapMarkerAlt className="shrink-0 text-[#1E3A8A]/50" size={11} />
              <span className="truncate">
                {university.city ? `${university.city}, ` : ""}
                {university.country?.countryName}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaClock className="shrink-0 text-[#1E3A8A]/50" size={11} />
              {program.durationMonths ? `${program.durationMonths} months` : program.degreeLevel}
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-[#0B1E3D]">
              <FaMoneyBillWave className="shrink-0 text-[#1E3A8A]/50" size={11} />
              {program.currency} {Number(program.tuitionFee).toLocaleString()}/yr
            </span>
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <FaCalendarAlt className="shrink-0 text-[#1E3A8A]/50" size={11} />
              {intakes.length > 0 ? (
                <select
                  value={intakeId}
                  onChange={(e) => setIntakeId(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="min-w-0 rounded-md border border-[#0B1E3D]/12 bg-gray-50/60 px-1.5 py-1 text-[11px] font-bold text-[#0B1E3D] focus:border-[#1E3A8A] focus:outline-none">
                  {intakes.map((i) => (
                    <option key={i.intakeId} value={i.intakeId}>
                      {i.intakeName} {i.intakeYear}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-[#0B1E3D]/40">No open intakes</span>
              )}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2.5 border-t border-[#0B1E3D]/6 pt-3">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-[#1E3A8A]/8 text-[#1E3A8A]">
              {university.logoUrl || university.universityImageUrl ? (
                <Image
                  src={resolveAssetUrl(university.logoUrl || university.universityImageUrl)!}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <FaUniversity className="absolute inset-0 m-auto" size={14} />
              )}
            </span>
            <p className="truncate text-xs font-bold text-[#0B1E3D]/70">{university.universityName}</p>
          </div>
        </div>

        {bannerUrl && (
          <span className="relative hidden h-auto w-32 shrink-0 overflow-hidden rounded-xl bg-[#1E3A8A]/8 sm:block">
            {!bannerIsPdf ? (
              <Image src={resolveAssetUrl(bannerUrl)!} alt="" fill sizes="128px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[#1E3A8A]/30">
                <FaFilePdf size={28} />
              </div>
            )}
            {university.admissionBannerUrl && (
              <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
                <button
                  onClick={handleViewBanner}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-white/90 text-[#0B1E3D]/70 shadow-sm transition hover:bg-white hover:text-[#1E3A8A]"
                  aria-label="View admission banner"
                  title="View admission banner">
                  <FaEye size={11} />
                </button>
                <button
                  onClick={handleDownloadBanner}
                  disabled={downloading}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-white/90 text-[#0B1E3D]/70 shadow-sm transition hover:bg-white hover:text-[#1E3A8A] disabled:opacity-50"
                  aria-label="Download admission banner"
                  title="Download admission banner">
                  <FaDownload size={10} />
                </button>
              </div>
            )}
          </span>
        )}
      </div>
    </div>
  );
}

function ApplyStep({
  university,
  program,
  initialIntakeId,
  onBack,
  onCreated,
}: {
  university: University;
  program: Program;
  /** Pre-selects the intake picked on the program card's inline dropdown, if any. */
  initialIntakeId?: number | null;
  onBack: () => void;
  onCreated: () => void;
}) {
  const { authFetch } = useAuth();
  const { showToast } = useToast();

  const [countries, setCountries] = useState<Country[]>([]);
  const [intakeId, setIntakeId] = useState(initialIntakeId ? String(initialIntakeId) : "");

  // ---- apply for an already-registered student, instead of registering a new one below ----
  const [selectedStudent, setSelectedStudent] =
    useState<StudentSearchResult | null>(null);
  const [applyingExisting, setApplyingExisting] = useState(false);
  const [existingSuccess, setExistingSuccess] = useState(false);

  // ---- applicant identity (mandatory) ----
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationalityId, setNationalityId] = useState("");
  const [city, setCity] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // ---- optional ----
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [gender, setGender] = useState<(typeof GENDERS)[number] | "">("");
  const [applyingAs, setApplyingAs] = useState<
    (typeof APPLYING_AS_OPTIONS)[number] | ""
  >("");
  const [lastAcademicLevel, setLastAcademicLevel] = useState<StudyLevel | "">(
    "",
  );
  const [academicInstituteName, setAcademicInstituteName] = useState("");
  const [academicSubject, setAcademicSubject] = useState("");
  const [academicResult, setAcademicResult] = useState("");
  const [academicPassingYear, setAcademicPassingYear] = useState("");
  const [englishTestType, setEnglishTestType] = useState("");
  const [englishOverallScore, setEnglishOverallScore] = useState("");
  const [englishReadingScore, setEnglishReadingScore] = useState("");
  const [englishWritingScore, setEnglishWritingScore] = useState("");
  const [englishListeningScore, setEnglishListeningScore] = useState("");
  const [englishSpeakingScore, setEnglishSpeakingScore] = useState("");
  const [englishTestExpiryDate, setEnglishTestExpiryDate] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    email: string;
    studentId: number;
    devOtpCode?: string;
  } | null>(null);
  const [formStep, setFormStep] = useState<"form" | "review">("form");
  const [redirectSeconds, setRedirectSeconds] = useState(4);

  const availableIntakes: Intake[] = program.intakes ?? [];
  const selectedIntake = availableIntakes.find(
    (i) => String(i.intakeId) === intakeId,
  );
  const selectedNationality = countries.find(
    (c) => String(c.countryId) === nationalityId,
  );

  useEffect(() => {
    apiFetch<Country[]>("/countries")
      .then(setCountries)
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    if (!success) return;
    if (redirectSeconds <= 0) {
      onCreated();
      return;
    }
    const timer = setTimeout(() => setRedirectSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [success, redirectSeconds, onCreated]);

  const handleApplyExisting = async () => {
    if (!selectedStudent) return;
    if (!intakeId) {
      showToast("Please select an intake to apply to.", "error");
      return;
    }
    setApplyingExisting(true);
    try {
      await authFetch("/applications", {
        method: "POST",
        body: {
          studentId: selectedStudent.studentId,
          intakeId: Number(intakeId),
        },
      });
      setExistingSuccess(true);
      showToast("Application submitted for the existing student.", "success");
      setTimeout(onCreated, 1200);
    } catch (err) {
      showToast(
        err instanceof ApiError
          ? err.message
          : "Could not submit this application.",
        "error",
      );
    } finally {
      setApplyingExisting(false);
    }
  };

  const missingRequiredField =
    !firstName ||
    !lastName ||
    !dateOfBirth ||
    !nationalityId ||
    !city ||
    !passportNumber ||
    !email ||
    !phone;

  const handleReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!intakeId) {
      showToast("Please select an intake to apply to.", "error");
      return;
    }
    if (missingRequiredField) {
      showToast(
        "Please fill in every required field before submitting.",
        "error",
      );
      return;
    }
    setFormStep("review");
  };

  const handleConfirmSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await authFetch<{
        studentId: number;
        email: string;
        devOtpCode?: string;
      }>("/applications/register-student", {
        method: "POST",
        body: {
          intakeId: Number(intakeId),
          firstName,
          middleName: middleName || undefined,
          lastName,
          dateOfBirth,
          nationalityId: Number(nationalityId),
          city,
          passportNumber,
          email,
          phone,
          postalCode: postalCode || undefined,
          address: address || undefined,
          profilePictureUrl: profilePictureUrl || undefined,
          gender: gender || undefined,
          applyingAs: applyingAs || undefined,
          lastAcademicLevel: lastAcademicLevel || undefined,
          academicInstituteName: academicInstituteName || undefined,
          academicSubject: academicSubject || undefined,
          academicResult: academicResult || undefined,
          academicPassingYear: academicPassingYear
            ? Number(academicPassingYear)
            : undefined,
          englishTestType: englishTestType || undefined,
          englishOverallScore: englishOverallScore || undefined,
          englishReadingScore: englishReadingScore || undefined,
          englishWritingScore: englishWritingScore || undefined,
          englishListeningScore: englishListeningScore || undefined,
          englishSpeakingScore: englishSpeakingScore || undefined,
          englishTestExpiryDate: englishTestExpiryDate || undefined,
        },
      });
      setSuccess({
        email: result.email,
        studentId: result.studentId,
        devOtpCode: result.devOtpCode,
      });
      showToast("Student registered and application submitted.", "success");
    } catch (err) {
      showToast(
        err instanceof ApiError
          ? err.message
          : "Could not submit this application.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (formStep === "review") {
    const identityRows: [string, string][] = [
      [
        "Full name",
        [firstName, middleName, lastName].filter(Boolean).join(" "),
      ],
      ["Date of birth", dateOfBirth],
      ["Country", selectedNationality?.countryName ?? "—"],
      ["City", city],
      ["Postal code", postalCode || "—"],
      ["Address", address || "—"],
      ["Gender", gender || "—"],
      ["Passport number", passportNumber],
      ["Email address", email],
      ["Mobile number", phone],
      ["Applying as", applyingAs || "—"],
    ];
    const academicRows: [string, string][] = [
      ["Last academic level", lastAcademicLevel || "—"],
      ["Institute name", academicInstituteName || "—"],
      ["Subject / course", academicSubject || "—"],
      ["Result", academicResult || "—"],
      ["Passing year", academicPassingYear || "—"],
    ];
    const englishRows: [string, string][] = [
      ["Test type", englishTestType || "—"],
      ["Expiry date", englishTestExpiryDate || "—"],
      ["Overall", englishOverallScore || "—"],
      ["Reading", englishReadingScore || "—"],
      ["Writing", englishWritingScore || "—"],
      ["Listening", englishListeningScore || "—"],
      ["Speaking", englishSpeakingScore || "—"],
    ];
    const hasAcademicInfo = academicRows.some(([, v]) => v !== "—");
    const hasEnglishInfo = englishRows.some(([, v]) => v !== "—");

    return (
      <div className="space-y-4">
        <button
          onClick={() => setFormStep("form")}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#1E3A8A] hover:underline">
          <FaArrowLeft size={10} />
          Back to edit
        </button>

        <Card>
          <div className="flex items-start gap-3 rounded-xl bg-[#1E3A8A]/5 px-4 py-3">
            <FaGraduationCap
              className="mt-0.5 shrink-0 text-[#1E3A8A]"
              size={16}
            />
            <div className="text-xs font-medium text-[#0B1E3D]/70">
              <p className="text-sm font-bold text-[#0B1E3D]">
                {program.programName}
              </p>
              <p className="mt-0.5">
                {university.universityName}
                {university.country
                  ? `, ${university.country.countryName}`
                  : ""}
              </p>
              <p className="mt-0.5">
                {selectedIntake
                  ? `${selectedIntake.intakeName} ${selectedIntake.intakeYear}`
                  : "Intake not selected"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
            Review applicant details
          </h3>
          <p className="mb-4 text-xs font-medium text-[#0B1E3D]/50">
            Please double-check everything below before submitting — this
            creates the student&apos;s account and files the application.
          </p>
          <ReviewGrid rows={identityRows} />

          {hasAcademicInfo && (
            <>
              <h4 className="mb-3 mt-6 border-t border-[#0B1E3D]/8 pt-5 text-xs font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/50">
                Academic history
              </h4>
              <ReviewGrid rows={academicRows} />
            </>
          )}

          {hasEnglishInfo && (
            <>
              <h4 className="mb-3 mt-6 border-t border-[#0B1E3D]/8 pt-5 text-xs font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/50">
                English proficiency
              </h4>
              <ReviewGrid rows={englishRows} />
            </>
          )}

          <div className="mt-6 flex gap-3 border-t border-[#0B1E3D]/8 pt-5">
            <PrimaryButton onClick={handleConfirmSubmit} disabled={submitting}>
              {submitting ? "Submitting…" : "Confirm & Submit"}
            </PrimaryButton>
            <SecondaryButton
              onClick={() => setFormStep("form")}
              disabled={submitting}>
              Edit details
            </SecondaryButton>
          </div>
        </Card>
      </div>
    );
  }

  if (existingSuccess) {
    return (
      <div className="space-y-4">
        <Card>
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <FaCheckCircle className="text-emerald-500" size={28} />
            <p className="text-sm font-bold text-[#0B1E3D]">
              Application submitted!
            </p>
            <p className="max-w-sm text-xs font-medium text-[#0B1E3D]/50">
              Taking you to Applications…
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-4">
        <Card>
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <FaCheckCircle className="text-emerald-500" size={28} />
            <p className="text-sm font-bold text-[#0B1E3D]">
              Student registered and application submitted!
            </p>
            <p className="max-w-sm text-xs font-medium text-[#0B1E3D]/50">
              An account was created for{" "}
              <span className="font-bold text-[#0B1E3D]">{success.email}</span>.
              They need to verify their email and set a password at{" "}
              <Link
                href={`/auth/activate?studentId=${success.studentId}`}
                className="font-bold text-[#1a5fd8] hover:underline">
                /auth/activate
              </Link>{" "}
              before they can log in.
            </p>
            {success.devOtpCode && (
              <p className="mt-1 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs font-semibold text-amber-800">
                Dev mode — no email provider configured. Verification code:{" "}
                <span className="font-mono tracking-widest">
                  {success.devOtpCode}
                </span>{" "}
                (student ID {success.studentId})
              </p>
            )}
            <p className="mt-1 text-[11px] font-medium text-[#0B1E3D]/40">
              Taking you to Applications in {redirectSeconds}s…
            </p>
            <PrimaryButton onClick={onCreated} className="mt-2">
              Go to Applications now
            </PrimaryButton>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#1E3A8A] hover:underline">
        <FaArrowLeft size={10} />
        Back to programs
      </button>

      <Card>
        <div className="flex items-start gap-3 rounded-xl bg-[#1E3A8A]/5 px-4 py-3">
          <FaGraduationCap
            className="mt-0.5 shrink-0 text-[#1E3A8A]"
            size={16}
          />
          <div className="text-xs font-medium text-[#0B1E3D]/70">
            <p className="text-sm font-bold text-[#0B1E3D]">
              {program.programName}
            </p>
            <p className="mt-0.5">
              {university.universityName}
              {university.country ? `, ${university.country.countryName}` : ""}
            </p>
            <p className="mt-0.5">
              {program.durationMonths
                ? `${program.durationMonths} months · `
                : ""}
              Tuition {program.currency}{" "}
              {Number(program.tuitionFee).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-2">
          <FieldLabel>Intake</FieldLabel>
          <select
            className={selectClass}
            value={intakeId}
            onChange={(e) => setIntakeId(e.target.value)}>
            <option value="">
              {availableIntakes.length === 0
                ? "No open intakes for this program"
                : "Select an intake"}
            </option>
            {availableIntakes.map((i) => (
              <option key={i.intakeId} value={i.intakeId}>
                {i.intakeName} {i.intakeYear} · deadline{" "}
                {new Date(i.applicationDeadline).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
        {availableIntakes.length === 0 && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
            <FaCalendarAlt size={11} />
            This program has no open intakes right now — check back later or
            pick another program.
          </p>
        )}
      </Card>

      <Card>
        <h3 className="mb-1 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
          Apply for an existing student
        </h3>
        <p className="mb-4 text-xs font-medium text-[#0B1E3D]/50">
          Search by student ID, passport number, or name — if they already have
          an account on the portal, apply for them directly instead of
          registering a duplicate below.
        </p>
        {selectedStudent ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-[#1E3A8A]/25 bg-[#1E3A8A]/5 px-3.5 py-2.5">
            <span className="flex min-w-0 items-center gap-2.5">
              <FaUserGraduate className="shrink-0 text-[#1E3A8A]" size={14} />
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-[#0B1E3D]">
                  {selectedStudent.fullName}
                </span>
                <span className="block truncate text-[11px] font-medium text-[#0B1E3D]/50">
                  ID {selectedStudent.studentId} · {selectedStudent.email}
                </span>
              </span>
            </span>
            <div className="flex shrink-0 items-center gap-2">
              <PrimaryButton
                onClick={handleApplyExisting}
                disabled={applyingExisting || !intakeId}>
                {applyingExisting ? "Submitting…" : "Apply now"}
              </PrimaryButton>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="text-[#0B1E3D]/40 hover:text-[#0B1E3D]"
                aria-label="Clear selected student">
                <FaTimes size={13} />
              </button>
            </div>
          </div>
        ) : (
          <StudentSearchField onSelect={setSelectedStudent} />
        )}
      </Card>

      <div className="flex items-center gap-3 px-1">
        <div className="h-px flex-1 bg-[#0B1E3D]/8" />
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0B1E3D]/35">
          Or register a new student
        </span>
        <div className="h-px flex-1 bg-[#0B1E3D]/8" />
      </div>

      <Card>
        <form onSubmit={handleReview} className="space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
              Register a New Student
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <FieldLabel>First name *</FieldLabel>
                <input
                  className={inputClass}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel>Middle name</FieldLabel>
                <input
                  className={inputClass}
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Last name *</FieldLabel>
                <input
                  className={inputClass}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel>Date of birth *</FieldLabel>
                <input
                  type="date"
                  className={inputClass}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel>Country *</FieldLabel>
                <select
                  className={selectClass}
                  value={nationalityId}
                  onChange={(e) => setNationalityId(e.target.value)}
                  required>
                  <option value="">Select</option>
                  {countries.map((c) => (
                    <option key={c.countryId} value={c.countryId}>
                      {c.countryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>City *</FieldLabel>
                <input
                  className={inputClass}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel>Postal code</FieldLabel>
                <input
                  className={inputClass}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel>Full address</FieldLabel>
                <input
                  className={inputClass}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Permanent address"
                />
              </div>
              <div>
                <FieldLabel>Gender</FieldLabel>
                <div className="flex h-[42px] items-center gap-4">
                  {GENDERS.map((g) => (
                    <label
                      key={g}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0B1E3D]/70">
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="accent-[#1E3A8A]"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Passport number *</FieldLabel>
                <input
                  className={inputClass}
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel>Email address *</FieldLabel>
                <input
                  type="email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel>Mobile number *</FieldLabel>
                <input
                  className={inputClass}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel>Applying as</FieldLabel>
                <select
                  className={selectClass}
                  value={applyingAs}
                  onChange={(e) =>
                    setApplyingAs(e.target.value as typeof applyingAs)
                  }>
                  <option value="">Select any</option>
                  {APPLYING_AS_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3">
                <CoverImageUploader
                  value={profilePictureUrl}
                  onChange={setProfilePictureUrl}
                  label="Profile picture"
                  endpoint="/students/profile-picture"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-[#0B1E3D]/8 pt-5">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
              Academic history{" "}
              <span className="normal-case font-medium text-[#0B1E3D]/35">
                (optional)
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <FieldLabel>Last academic level</FieldLabel>
                <select
                  className={selectClass}
                  value={lastAcademicLevel}
                  onChange={(e) =>
                    setLastAcademicLevel(e.target.value as StudyLevel | "")
                  }>
                  <option value="">Select any</option>
                  {STUDY_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <FieldLabel>Institute name</FieldLabel>
                <input
                  className={inputClass}
                  value={academicInstituteName}
                  onChange={(e) => setAcademicInstituteName(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Subject / course</FieldLabel>
                <input
                  className={inputClass}
                  value={academicSubject}
                  onChange={(e) => setAcademicSubject(e.target.value)}
                  placeholder="e.g. BSc in CSE"
                />
              </div>
              <div>
                <FieldLabel>Result</FieldLabel>
                <input
                  className={inputClass}
                  value={academicResult}
                  onChange={(e) => setAcademicResult(e.target.value)}
                  placeholder="e.g. 3.60"
                />
              </div>
              <div>
                <FieldLabel>Passing year</FieldLabel>
                <input
                  type="number"
                  className={inputClass}
                  value={academicPassingYear}
                  onChange={(e) => setAcademicPassingYear(e.target.value)}
                  placeholder="e.g. 2024"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-[#0B1E3D]/8 pt-5">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.06em] text-[#0B1E3D]/60">
              English proficiency{" "}
              <span className="normal-case font-medium text-[#0B1E3D]/35">
                (optional)
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <FieldLabel>Test type</FieldLabel>
                <input
                  className={inputClass}
                  value={englishTestType}
                  onChange={(e) => setEnglishTestType(e.target.value)}
                  placeholder="e.g. IELTS, PTE, TOEFL"
                />
              </div>
              <div>
                <FieldLabel>Expiry date</FieldLabel>
                <input
                  type="date"
                  className={inputClass}
                  value={englishTestExpiryDate}
                  onChange={(e) => setEnglishTestExpiryDate(e.target.value)}
                />
              </div>
              <div />
              <div>
                <FieldLabel>Overall</FieldLabel>
                <input
                  className={inputClass}
                  value={englishOverallScore}
                  onChange={(e) => setEnglishOverallScore(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Reading</FieldLabel>
                <input
                  className={inputClass}
                  value={englishReadingScore}
                  onChange={(e) => setEnglishReadingScore(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Writing</FieldLabel>
                <input
                  className={inputClass}
                  value={englishWritingScore}
                  onChange={(e) => setEnglishWritingScore(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Listening</FieldLabel>
                <input
                  className={inputClass}
                  value={englishListeningScore}
                  onChange={(e) => setEnglishListeningScore(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Speaking</FieldLabel>
                <input
                  className={inputClass}
                  value={englishSpeakingScore}
                  onChange={(e) => setEnglishSpeakingScore(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 border-t border-[#0B1E3D]/8 pt-5">
            <PrimaryButton
              type="submit"
              disabled={!intakeId || missingRequiredField}>
              Review application
            </PrimaryButton>
            <SecondaryButton type="button" onClick={onBack}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
}

function ReviewGrid({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-baseline justify-between gap-3 rounded-lg bg-gray-50/70 px-3.5 py-2.5">
          <dt className="text-xs font-bold uppercase tracking-[0.05em] text-[#0B1E3D]/45">
            {label}
          </dt>
          <dd className="truncate text-right text-sm font-semibold text-[#0B1E3D]">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
