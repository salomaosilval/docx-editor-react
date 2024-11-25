import { useState } from "react";
import Editor from "../components/Editor/Editor";
import FileUploader from "../components/FileActions/FileUploader";
import FileSaver from "../components/FileActions/FileSaver";
import { CustomElement } from "../types/slate";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import GlobalStyles from "../styles/global";
import { AppContainer, AppContent, HeaderContainer, Title } from "./styles";
import { FileActionsContainer } from "../components/FileActions/styles";

const App = () => {
  const [content, setContent] = useState<CustomElement[]>([
    {
      type: "paragraph",
      children: [{ text: "Bem vindo ao editor de texto .Docx" }],
    },
  ]);

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
          <Editor content={content} onChange={setContent} />
        </AppContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
