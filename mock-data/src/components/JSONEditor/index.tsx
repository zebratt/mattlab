import './style.less';

import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import Editor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

interface JSONEditorProps {
  options?: JSONEditorOptions;
}

const JSONEditor = (
  props: JSONEditorProps,
  ref: ForwardedRef<() => Editor>,
) => {
  const editorWrapper = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<Editor | null>(null);

  useEffect(() => {
    if (editorWrapper.current) {
      editorInstance.current = new Editor(editorWrapper.current, {
        mode: 'code',
        ...props.options,
      });
      return () => {
        editorInstance.current?.destroy();
      };
    }
  }, []);

  useImperativeHandle(ref, () => () => editorInstance.current!);

  return <div ref={editorWrapper} className="json-editor-wrapper"></div>;
};

export default forwardRef<() => Editor, JSONEditorProps>(JSONEditor);
