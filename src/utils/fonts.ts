import { GOOGLE_FONTS } from "./fontLoader";

export const SYSTEM_FONTS = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Helvetica", value: "Helvetica, sans-serif" },
  { label: "Times New Roman", value: "Times New Roman, serif" },
  { label: "Times", value: "Times, serif" },
  { label: "Courier New", value: "Courier New, monospace" },
  { label: "Courier", value: "Courier, monospace" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Palatino", value: "Palatino, serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Bookman", value: "Bookman, serif" },
  { label: "Comic Sans MS", value: "Comic Sans MS, cursive" },
  { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
  { label: "Impact", value: "Impact, sans-serif" },
];

export const ALL_FONTS = [
  { label: "Google Fonts", options: GOOGLE_FONTS },
  {
    label: "Fontes do Sistema",
    options: SYSTEM_FONTS,
  },
];

export type FontOption = {
  label: string;
  value: string;
};

export type FontGroup = {
  label: string;
  options: FontOption[];
};
