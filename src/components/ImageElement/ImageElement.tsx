import { RenderElementProps } from "slate-react";

export const ImageElement = ({ attributes, children, element }: RenderElementProps) => {
  return (
    <div {...attributes} style={{ textAlign: element.align || "left" }}>
      <div contentEditable={false}>
        <img src={element.url} alt="Imagem inserida" style={{ maxWidth: "100%", display: "block", margin: "0 auto" }} />
      </div>
      {children}
    </div>
  );
};
