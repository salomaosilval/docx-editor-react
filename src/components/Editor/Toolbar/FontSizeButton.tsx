import { Editor, Text, Transforms } from "slate";
import { useSlate } from "slate-react";
import { ToolbarButton } from "./styles";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { useState, useEffect } from "react";

const FontSizeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const FontSizeInput = styled.input`
  width: 40px;
  height: 35px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0 4px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FontSizeButton = () => {
  const editor = useSlate();
  const [fontSize, setFontSize] = useState("16");

  const getCurrentFontSize = (editor: Editor) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && n.fontSize !== undefined,
      universal: true,
    });

    return (match?.[0] as { fontSize?: number })?.fontSize || 16;
  };

  useEffect(() => {
    setFontSize(getCurrentFontSize(editor).toString());
  }, [editor]);

  const changeFontSize = (newSize: number) => {
    if (newSize >= 8 && newSize <= 72) {
      Transforms.setNodes(editor, { fontSize: newSize }, { match: (n) => Text.isText(n), split: true });
      setFontSize(newSize.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFontSize(value);
  };

  const handleInputBlur = () => {
    const size = parseInt(fontSize) || 16;
    changeFontSize(size);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputBlur();
    }
  };

  return (
    <FontSizeContainer>
      <ToolbarButton onClick={() => changeFontSize(parseInt(fontSize) - 1)} title="Diminuir fonte">
        <AiOutlineMinus />
      </ToolbarButton>

      <FontSizeInput
        value={fontSize}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        title="Tamanho da fonte"
      />

      <ToolbarButton onClick={() => changeFontSize(parseInt(fontSize) + 1)} title="Aumentar fonte">
        <AiOutlinePlus />
      </ToolbarButton>
    </FontSizeContainer>
  );
};
