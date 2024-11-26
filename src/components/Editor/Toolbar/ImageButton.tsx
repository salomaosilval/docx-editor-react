import { useSlate } from "slate-react";
import { Transforms } from "slate";
import { BsImage } from "react-icons/bs";
import { ToolbarButton } from "./styles";

export const ImageButton = () => {
  const editor = useSlate();

  const insertImage = () => {
    const url = prompt("Digite a URL da imagem:");
    if (!url) return;

    const image = {
      type: "image",
      url,
      width: 50,
      height: "auto" as const,
      children: [{ text: "" }],
    };

    Transforms.insertNodes(editor, image);
  };

  return (
    <ToolbarButton onClick={insertImage}>
      <BsImage />
    </ToolbarButton>
  );
};
