import { ChangeEvent } from "react";
import { convertDocxToSlate } from "../../utils/docxHelper";
import { FileInput, FileLabel } from "./styles";
import { CustomElement } from "../../types/slate";

const FileUploader = ({ onLoad }: { onLoad: (content: CustomElement[]) => void }) => {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".docx")) {
      alert("Por favor, selecione um arquivo .docx válido");
      return;
    }

    try {
      const content = await convertDocxToSlate(file);

      if (content) {
        onLoad(content);
      } else {
        throw new Error("Não foi possível ler o conteúdo do arquivo");
      }
    } catch (error) {
      console.error("Erro detalhado ao carregar arquivo:", error);
      alert("Erro ao carregar o arquivo. Certifique-se de que é um arquivo .docx válido.");
    }
  };

  return (
    <>
      <FileInput id="file-upload" type="file" accept=".docx" onChange={handleFileUpload} />
      <FileLabel htmlFor="file-upload">Escolher arquivo</FileLabel>
    </>
  );
};

export default FileUploader;
