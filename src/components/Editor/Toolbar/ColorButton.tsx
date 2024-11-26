import { useSlate } from "slate-react";
import { Editor, Text, Transforms } from "slate";
import ColorPicker from "./ColorPicker/ColorPicker";

export const ColorButton = () => {
  const editor = useSlate();

  const getCurrentColor = (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && n.color !== undefined,
      universal: true,
    });

    return (match?.[0] as { color?: string })?.color || "#000000";
  };

  const handleColorChange = (color: string) => {
    Transforms.setNodes(editor, { color }, { match: (n) => Text.isText(n), split: true });
  };

  return <ColorPicker color={getCurrentColor(editor)} onChange={handleColorChange} />;
};
