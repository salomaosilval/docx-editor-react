import { useState, useEffect, useMemo, CSSProperties } from "react";
import { Slate, Editable, withReact, RenderLeafProps, RenderElementProps } from "slate-react";
import { createEditor, Descendant } from "slate";
import { processPlaceholders } from "../../utils/placeholder";
import { Toolbar } from "./Toolbar/Toolbar";
import { EditorContainer, EditorContent, EditorWrapper } from "./styles";
import { CustomElement } from "../../types/slate";
import { FontGroup } from "../../utils/fonts";
import { ImageElement } from "../ImageElement/ImageElement";

interface EditorProps {
  content?: CustomElement[];
  onChange?: (value: CustomElement[]) => void;
  fonts: FontGroup[];
}

const Editor = ({ content, onChange, fonts }: EditorProps) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "Bem vindo ao editor de texto do Docx Editor." }],
    },
  ]);

  useEffect(() => {
    if (content) {
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

    const style: CSSProperties = {
      fontFamily: leaf.fontFamily,
      fontSize: leaf.fontSize ? `${leaf.fontSize}px` : undefined,
    };

    if (leaf.bold) {
      processedText = <strong>{processedText}</strong>;
    }
    if (leaf.italic) {
      processedText = <em>{processedText}</em>;
    }
    if (leaf.underline) {
      processedText = <u>{processedText}</u>;
    }

    return (
      <span style={style} {...attributes}>
        {processedText}
      </span>
    );
  };

  const renderElement = ({ attributes, children, element }: RenderElementProps) => {
    if (element.type === "image") {
      return <ImageElement attributes={attributes} children={children} element={element} />;
    }

    const style: CSSProperties = {
      textAlign: element.align || "left",
    };

    return (
      <div style={style} {...attributes}>
        {children}
      </div>
    );
  };

  return (
    <EditorWrapper>
      <EditorContainer>
        <Slate editor={editor} value={value} onChange={handleChange}>
          <Toolbar fonts={fonts} />
          <EditorContent>
            <Editable renderLeaf={renderLeaf} renderElement={renderElement} />
          </EditorContent>
        </Slate>
      </EditorContainer>
    </EditorWrapper>
  );
};

export default Editor;
