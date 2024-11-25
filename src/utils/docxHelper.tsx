import { Document, Packer, Paragraph, TextRun } from "docx";
import { Text } from "slate";
import mammoth from "mammoth";

interface CustomElement {
  type: string;
  children: (CustomElement | Text)[];
}

export const convertDocxToSlate = async (file: File): Promise<any> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;

    if (!html) {
      throw new Error("O arquivo está vazio ou corrompido");
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const blocks: any[] = [];

    doc.body.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const text = element.textContent?.trim();

        if (text) {
          const block = {
            type: "paragraph",
            children: [{ text }],
          };
          blocks.push(block);
        }
      }
    });

    return blocks.length ? blocks : [{ type: "paragraph", children: [{ text: "" }] }];
  } catch (error) {
    console.error("Erro detalhado na conversão:", error);
    throw error;
  }
};

export const saveSlateToDocx = async (content: CustomElement[]): Promise<void> => {
  const paragraphs = content.map((node) => {
    const runs = node.children.map((child) => {
      if (!Text.isText(child)) return new TextRun({ text: "" });

      return new TextRun({
        text: child.text,
        bold: child.bold || false,
        italics: child.italic || false,
        underline: child.underline ? { type: "single" } : undefined,
      });
    });

    return new Paragraph({ children: runs });
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "documento.docx";
  link.click();
  URL.revokeObjectURL(url);
};
