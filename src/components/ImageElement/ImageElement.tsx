import { useCallback, useState } from "react";
import { Transforms } from "slate";
import { useSlateStatic } from "slate-react";
import { RenderElementProps } from "slate-react";
import { ImageContainer, ResizableImage, ResizeHandle } from "./styles";

export const ImageElement = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);

      const startX = e.pageX;
      const startWidth = Number(element.width) || 400;

      const handleMouseMove = (e: MouseEvent) => {
        const currentX = e.pageX;
        const diff = (currentX - startX) * 2;
        const newWidth = Math.max(50, Math.min(800, startWidth + diff));

        const path = editor.children.findIndex((node) => node === element);
        Transforms.setNodes(editor, { width: newWidth }, { at: [path] });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [editor, element]
  );

  return (
    <div {...attributes} style={{ textAlign: element.align || "left" }}>
      <div contentEditable={false}>
        <ImageContainer>
          <ResizableImage
            src={element.url}
            alt="Imagem inserida"
            isResizing={isResizing}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            style={{
              width: element.width || "auto",
              height: element.height || "auto",
            }}
          />
          <ResizeHandle onMouseDown={handleMouseDown} />
        </ImageContainer>
      </div>
      {children}
    </div>
  );
};
