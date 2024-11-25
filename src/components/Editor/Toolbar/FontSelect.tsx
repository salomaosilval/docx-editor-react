import { Editor, Text, Transforms } from "slate";
import { useSlate } from "slate-react";
import { StyledSelect } from "./styles";
import { FontGroup } from "../../../utils/fonts";

export const FontSelect = ({ fonts }: { fonts: FontGroup[] }) => {
  const editor = useSlate();

  const getCurrentFont = (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && n.fontFamily !== undefined,
      universal: true,
    });

    return (match?.[0] as { fontFamily?: string })?.fontFamily || "Roboto, sans-serif";
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = event.target.value;
    Transforms.setNodes(editor, { fontFamily }, { match: (n) => Text.isText(n), split: true });
  };

  return (
    <StyledSelect value={getCurrentFont(editor)} onChange={handleFontChange}>
      {fonts.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </optgroup>
      ))}
    </StyledSelect>
  );
};
