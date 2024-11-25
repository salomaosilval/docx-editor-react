import { saveSlateToDocx } from "../../utils/docxHelper";
import { FileButton } from "./styles";

const FileSaver = ({ content }: { content: any }) => {
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
