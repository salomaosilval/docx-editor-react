import { useState, useEffect } from "react";
import Editor from "../components/Editor/Editor";
import FileUploader from "../components/FileActions/FileUploader";
import FileSaver from "../components/FileActions/FileSaver";
import { CustomElement } from "../types/slate";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import GlobalStyles from "../styles/global";
import { AppContainer, AppContent, HeaderContainer, Title } from "./styles";
import { FileActionsContainer } from "../components/FileActions/styles";
import { loadGoogleFonts, fetchGoogleFonts } from "../utils/fontLoader";
import { FontGroup, SYSTEM_FONTS, FontOption } from "../utils/fonts";

const App = () => {
  const [content, setContent] = useState<CustomElement[]>([
    {
      type: "paragraph",
      children: [{ text: "Bem vindo ao editor de texto .Docx" }],
    },
  ]);

  const [allFonts, setAllFonts] = useState<FontGroup[]>([
    { label: "Google Fonts", options: [] },
    { label: "Fontes do Sistema", options: SYSTEM_FONTS },
  ]);

  useEffect(() => {
    const loadFonts = async () => {
      const fonts = await fetchGoogleFonts();
      if (fonts.length > 0) {
        loadGoogleFonts(fonts.map((font: FontOption) => font.label));
        setAllFonts([
          { label: "Google Fonts", options: fonts },
          { label: "Fontes do Sistema", options: SYSTEM_FONTS },
        ]);
      }
    };

    loadFonts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <AppContent>
          <HeaderContainer>
            <Title>Editor de Texto</Title>
            <FileActionsContainer>
              <FileUploader onLoad={setContent} />
              <FileSaver content={content} />
            </FileActionsContainer>
          </HeaderContainer>
          <Editor content={content} onChange={setContent} fonts={allFonts} />
        </AppContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
