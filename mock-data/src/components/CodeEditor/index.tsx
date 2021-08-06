import './style.less'
import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';

interface CodeEditorProps {}

function CodeEditor(
  _props: CodeEditorProps,
  ref: ForwardedRef<() => EditorView>,
) {
  const container = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (container.current) {
      let state = EditorState.create({
        doc: '',
        extensions: [basicSetup, javascript()],
      });

      editorRef.current = new EditorView({ state, parent: container.current });
    }

    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => () => editorRef.current!);

  return <div className="code-editor-container" ref={container}></div>;
}

export default forwardRef<() => EditorView, CodeEditorProps>(CodeEditor);
