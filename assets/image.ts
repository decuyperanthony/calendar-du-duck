const placeholders = {
  "planning-child-a": "/images/planning-child-a.svg",
  "planning-child-b": "/images/planning-child-b.svg",
  "parent-a": "/images/parent-a.svg",
  "parent-b": "/images/parent-b.svg",
  "leo-lucky-logo": "/icons/leo-lucky-logo.svg",
};

export const images = {
  "planning-child-a":
    process.env.NEXT_PUBLIC_IMAGE_PLANNING_CHILD_A ??
    placeholders["planning-child-a"],
  "planning-child-b":
    process.env.NEXT_PUBLIC_IMAGE_PLANNING_CHILD_B ??
    placeholders["planning-child-b"],
  "parent-a":
    process.env.NEXT_PUBLIC_IMAGE_PARENT_A ?? placeholders["parent-a"],
  "parent-b":
    process.env.NEXT_PUBLIC_IMAGE_PARENT_B ?? placeholders["parent-b"],
  "leo-lucky-logo": placeholders["leo-lucky-logo"],
};

export type image = keyof typeof images;
