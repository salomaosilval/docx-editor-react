import { saveSlateToDocx } from "../../utils/docxHelper";
import { FileButton } from "./styles";
import { CustomElement } from "../../types/slate";

const FileSaver = ({ content }: { content?: CustomElement[] }) => {
  const handleSave = async () => {
    if (!content) {
      alert("Não há conteúdo para salvar!");
      return;
    }

    try {
      await saveSlateToDocx(content);
    } catch (error) {
      console.error("Erro ao salvar arquivo:", error);
      alert("Erro ao salvar o arquivo!");
    }
  };

  return <FileButton onClick={handleSave}>Salvar como .Docx</FileButton>;
};

export default FileSaver;
