"use client";

import React from "react";
import type { ApplicationStatus } from "./types";
import { STATUS_COLORS, STATUS_LABELS } from "./types";
import { Badge } from "@/components/dashboard/common/ui";

export * from "@/components/dashboard/common/ui";

/** Application-status-specific badge, built on the shared generic Badge. */
export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <Badge label={STATUS_LABELS[status]} color={STATUS_COLORS[status]} />;
}
