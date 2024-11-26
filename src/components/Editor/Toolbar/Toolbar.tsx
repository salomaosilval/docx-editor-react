import { useSlate } from "slate-react";
import { Editor, Transforms, Text, Element } from "slate";
import { ToolbarContainer, ToolbarButton } from "./styles";
import { FontSelect } from "./FontSelect";
import { FontGroup } from "../../../utils/fonts";
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from "react-icons/ai";
import { ImageButton } from "./ImageButton";
import { FontSizeButton } from "./FontSizeButton";
import { ColorButton } from "./ColorButton";

type Format = "bold" | "italic" | "underline";
type Alignment = "left" | "center" | "right";

export const Toolbar = ({ fonts }: { fonts: FontGroup[] }) => {
  const editor = useSlate();

  const toggleFormat = (editor: Editor, format: Format) => {
    const isActive = isFormatActive(editor, format);
    Transforms.setNodes(editor, { [format]: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  };

  const toggleAlign = (editor: Editor, align: Alignment) => {
    const isActive = isAlignActive(editor, align);
    Transforms.setNodes(editor, { align: isActive ? undefined : align }, { match: (n) => Element.isElement(n) });
  };

  const isFormatActive = (editor: Editor, format: Format) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && n[format] === true,
      universal: true,
    });
    return !!match;
  };

  const isAlignActive = (editor: Editor, align: Alignment) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Element.isElement(n) && n.align === align,
    });
    return !!match;
  };

  return (
    <ToolbarContainer>
      <FontSelect fonts={fonts} />
      <FontSizeButton />
      <ColorButton />
      <ToolbarButton onClick={() => toggleFormat(editor, "bold")} active={isFormatActive(editor, "bold")}>
        B
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleFormat(editor, "italic")} active={isFormatActive(editor, "italic")}>
        I
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleFormat(editor, "underline")} active={isFormatActive(editor, "underline")}>
        U
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleAlign(editor, "left")} active={isAlignActive(editor, "left")}>
        <AiOutlineAlignLeft />
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleAlign(editor, "center")} active={isAlignActive(editor, "center")}>
        <AiOutlineAlignCenter />
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleAlign(editor, "right")} active={isAlignActive(editor, "right")}>
        <AiOutlineAlignRight />
      </ToolbarButton>
      <ImageButton />
    </ToolbarContainer>
  );
};
