export const GOOGLE_FONTS = [
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Lora", value: "Lora, serif" },
  { label: "Open Sans", value: "Open Sans, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Playfair Display", value: "Playfair Display, serif" },
] as const;

export type GoogleFont = (typeof GOOGLE_FONTS)[number]["value"];
