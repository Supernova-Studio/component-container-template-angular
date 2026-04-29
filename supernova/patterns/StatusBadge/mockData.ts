import type { StatusConfig } from "./StatusBadge.js";

// ============================================================================
// Mock Data for Demo
// ============================================================================

export const MOCK_STATUSES: StatusConfig[] = [
  {
    id: "published",
    label: "Published",
    icon: "check_circle",
    variant: "success",
  },
  {
    id: "draft",
    label: "Draft",
    icon: "edit_note",
    variant: "default",
  },
  {
    id: "review",
    label: "In Review",
    icon: "rate_review",
    variant: "warning",
  },
  {
    id: "deprecated",
    label: "Deprecated",
    icon: "warning",
    variant: "error",
  },
  {
    id: "new",
    label: "New",
    icon: "fiber_new",
    variant: "info",
  },
];
