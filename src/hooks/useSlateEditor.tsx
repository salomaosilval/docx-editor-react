import { useMemo } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";

const useSlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return editor;
};

export default useSlateEditor;
