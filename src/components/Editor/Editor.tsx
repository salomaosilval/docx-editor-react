import { useState, useEffect, useMemo } from "react";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { createEditor, Descendant } from "slate";
import { processPlaceholders } from "../../utils/placeholder";
import { Toolbar } from "./Toolbar/Toolbar";
import { EditorContainer, EditorContent, EditorWrapper } from "./styles";
import { CustomElement } from "../../types/slate";

interface EditorProps {
  content?: CustomElement[];
  onChange?: (value: CustomElement[]) => void;
}

const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "Bem vindo ao editor de texto do Docx Editor." }],
    },
  ]);

  useEffect(() => {
    if (content) {
      console.log("Editor recebendo novo conteúdo:", content);
      editor.children = content as Descendant[];
      editor.onChange();
      setValue(content as Descendant[]);
    }
  }, [content, editor]);

  const handleChange = (newValue: Descendant[]) => {
    setValue(newValue);
    onChange?.(newValue as CustomElement[]);
  };

  const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    let processedText = children;
    if (typeof children === "string") {
      processedText = processPlaceholders(children);
    }

    if (leaf.bold) {
      processedText = <strong>{processedText}</strong>;
    }
    if (leaf.italic) {
      processedText = <em>{processedText}</em>;
    }
    if (leaf.underline) {
      processedText = <u>{processedText}</u>;
    }

    return <span {...attributes}>{processedText}</span>;
  };

  return (
    <EditorWrapper>
      <EditorContainer>
        <Slate editor={editor} value={value} onChange={handleChange}>
          <Toolbar />
          <EditorContent>
            <Editable renderLeaf={renderLeaf} />
          </EditorContent>
        </Slate>
      </EditorContainer>
    </EditorWrapper>
  );
};

export default Editor;
