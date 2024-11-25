import WebFont from "webfontloader";

interface GoogleFontItem {
  family: string;
  variants: string[];
  category: string;
}

const GOOGLE_FONTS_API_KEY = "AIzaSyCocl0G4-ZB_EpgieajsrhsOOKDgVD5qZI";

export const fetchGoogleFonts = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}&sort=popularity`
    );
    const data = await response.json();
    return data.items.map((font: GoogleFontItem) => ({
      label: font.family,
      value: `${font.family}, ${font.category}`,
    }));
  } catch (error) {
    console.error("Erro ao carregar fontes do Google:", error);
    return [];
  }
};

export const loadGoogleFonts = (families: string[]) => {
  WebFont.load({
    google: {
      families: families,
    },
    active: () => {
      console.log("Fontes carregadas com sucesso!");
    },
    inactive: () => {
      console.error("Falha ao carregar as fontes.");
    },
  });
};

export const GOOGLE_FONTS = [
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Open Sans", value: "Open Sans, sans-serif" },
];
