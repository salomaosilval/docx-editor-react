import { useSlate } from "slate-react";
import { Editor, Transforms, Text, Node } from "slate";
import { ToolbarContainer, ToolbarButton } from "./styles";

type Format = "bold" | "italic" | "underline";

export const Toolbar = () => {
  const editor = useSlate();

  const toggleFormat = (editor: Editor, format: Format) => {
    const isActive = isFormatActive(editor, format);
    Transforms.setNodes(editor, { [format]: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  };

  const isFormatActive = (editor: Editor, format: Format) => {
    const [match] = Editor.nodes(editor, {
      match: (n: Node) => Text.isText(n) && n[format] === true,
      universal: true,
    });
    return !!match;
  };

  return (
    <ToolbarContainer>
      <ToolbarButton onClick={() => toggleFormat(editor, "bold")} active={isFormatActive(editor, "bold")}>
        B
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleFormat(editor, "italic")} active={isFormatActive(editor, "italic")}>
        I
      </ToolbarButton>
      <ToolbarButton onClick={() => toggleFormat(editor, "underline")} active={isFormatActive(editor, "underline")}>
        U
      </ToolbarButton>
    </ToolbarContainer>
  );
};
