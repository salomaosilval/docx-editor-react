import { ChangeEvent } from "react";
import { convertDocxToSlate } from "../../utils/docxHelper";
import { FileInput, FileLabel } from "./styles";

const FileUploader = ({ onLoad }: { onLoad: (content: any) => void }) => {
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Arquivo selecionado:", file.name);

    if (!file.name.endsWith(".docx")) {
      alert("Por favor, selecione um arquivo .docx válido");
      return;
    }

    try {
      console.log("Iniciando conversão do arquivo...");
      const content = await convertDocxToSlate(file);
      console.log("Conteúdo convertido:", content);

      if (content) {
        console.log("Chamando onLoad com o conteúdo");
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
