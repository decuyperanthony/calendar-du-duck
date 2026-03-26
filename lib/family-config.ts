/**
 * Family configuration — personalize via environment variables.
 *
 * Create a `.env.local` file (gitignored) to override defaults:
 *
 * ```env
 * NEXT_PUBLIC_PARENT_A_NAME=Papa
 * NEXT_PUBLIC_PARENT_B_NAME=Maman
 * NEXT_PUBLIC_CHILD_A_NAME=Prénom1
 * NEXT_PUBLIC_CHILD_B_NAME=Prénom2
 * ```
 */
export const familyConfig = {
  parentA: process.env.NEXT_PUBLIC_PARENT_A_NAME ?? "Parent A",
  parentB: process.env.NEXT_PUBLIC_PARENT_B_NAME ?? "Parent B",
  childA: process.env.NEXT_PUBLIC_CHILD_A_NAME ?? "Enfant 1",
  childB: process.env.NEXT_PUBLIC_CHILD_B_NAME ?? "Enfant 2",
} as const;
