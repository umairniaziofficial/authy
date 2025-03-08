"use client";

type ThemeColors = {
  primary?: {
    DEFAULT: string;
    foreground: string;
  };
  [key: string]: unknown;
};

export function createTheme(colors: ThemeColors) {
  const themeClass = `theme-${Math.random().toString(36).substring(2, 9)}`;

  const style = document.createElement("style");
  style.innerHTML = `
    .${themeClass} {
      ${colors.primary ? `--primary: ${colors.primary.DEFAULT};` : ""}
      ${
        colors.primary
          ? `--primary-foreground: ${colors.primary.foreground};`
          : ""
      }
      
      /* Add other color variables as needed */
    }
  `;
  document.head.appendChild(style);

  return themeClass;
}
