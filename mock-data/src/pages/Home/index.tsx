import './style.less';

import React, { useRef, useState } from 'react';
import { Button, Input, message, Modal, Space, Tree } from 'antd';
import { useSelector } from 'react-redux';

import { addFile, deleteFile, getFile, writeFile } from './api';

import type Editor from 'jsoneditor';
import type { Key } from 'antd/lib/table/interface';
import type { EditorView } from '@codemirror/basic-setup';

import { RootState, store } from '@/store';
import JSONEditor from '@/components/JSONEditor';
import CodeEditor from '@/components/CodeEditor';

function HomePage() {
  const editorRef = useRef<() => Editor>(null);
  const codeEditorRef = useRef<() => EditorView>(null);
  const [currentPath, setCurrentPath] = useState<string>('');
  const { trees, branch } = useSelector((state: RootState) => state.core);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addFilename, setAddFilename] = useState('');
  const [selectedKeys, setSelectKeys] = useState<Key[]>([]);

  function onSelect(keys: Key[]) {
    const filePath = keys?.[0];

    if (filePath) {
      const editor = editorRef.current?.();
      const codeEditor = codeEditorRef.current?.();

      try {
        store.dispatch.loading.startLoading();

        setCurrentPath(filePath as string);
        setSelectKeys([filePath]);
        getFile(filePath as string, branch).then((content) => {
          if (editor && codeEditor) {
            editor.set(content?.mocks ?? 'file not found!');
            const transaction = codeEditor.state.update({
              changes: {
                from: 0,
                to: codeEditor.state.doc.length,
                insert: content?.middleware ?? '',
              },
            });
            codeEditor.dispatch(transaction);
          }
        });
      } catch (error) {
        message.error('文件读取失败');
      } finally {
        store.dispatch.loading.endLoading();
      }
    } else {
      setCurrentPath('');
      setSelectKeys([]);
    }
  }

  function onSubmit() {
    if (!currentPath) {
      message.info('请先选择文件');
    } else {
      const editor = editorRef.current?.();
      const codeEditor = codeEditorRef.current?.();
      const data = {
        mocks: editor?.get() ?? '',
        middleware: codeEditor?.state.doc.toString() ?? '',
      };

      Modal.confirm({
        title: '确认要提交吗？',
        centered: true,
        onOk: () => {
          store.dispatch.loading.startLoading();
          writeFile(currentPath, data, branch).then((res) => {
            if (res.success) {
              message.success('修改成功');
            } else {
              message.error(`修改失败: ${res.message}`);
            }

            store.dispatch.loading.endLoading();
          });
        },
      });
    }
  }

  function onAdd() {
    setAddFilename('');
    setAddModalVisible(true);
  }

  async function onAddOk() {
    const filename = currentPath
      ? `${currentPath}-${addFilename}`
      : addFilename;

    store.dispatch.loading.startLoading();
    const res = await addFile(filename, branch);

    if (res.success) {
      message.success('添加成功');
      store.dispatch.core.initFileTree({
        callback: () => store.dispatch.loading.endLoading(),
      });
    } else {
      message.error(`添加失败: ${res.message}`);
      store.dispatch.loading.endLoading();
    }

    setAddModalVisible(false);
  }

  function onDelete() {
    if (!currentPath) {
      message.info('请先选择文件');
    } else {
      Modal.confirm({
        title: '确认要删除吗？',
        centered: true,
        onOk: async () => {
          store.dispatch.loading.startLoading();
          const res = await deleteFile(currentPath, branch);

          if (res.success) {
            message.success('删除成功');
            store.dispatch.core.initFileTree({
              callback: () => {
                store.dispatch.loading.endLoading();
              },
            });
          } else {
            message.error(`删除失败: ${res.message}`);
            store.dispatch.loading.endLoading();
          }
        },
      });
    }
  }

  function onSelectCancel(eve: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      !Array.prototype.slice
        .call((eve.target as any).classList)
        .includes('ant-tree-title')
    ) {
      setCurrentPath('');
      setSelectKeys([]);
    }
  }

  return (
    <div className="page-home">
      <div className="tree-panel">
        <div className="tree-panel-actions">
          <Space>
            <Button type="primary" size="small" onClick={onAdd}>
              添加
            </Button>
            <Button type="default" size="small" onClick={onDelete}>
              删除
            </Button>
          </Space>
        </div>
        <div className="tree-panel-body" onClick={(eve) => onSelectCancel(eve)}>
          <Tree
            showLine
            selectedKeys={selectedKeys}
            showIcon={false}
            treeData={trees}
            onSelect={onSelect}
          />
        </div>
      </div>
      <div className="type-editor-panel">
        <div className="type-editor-panel-body">
          <JSONEditor ref={editorRef} />
        </div>
        <div className="type-editor-panel-actions">
          <Button type="primary" onClick={onSubmit}>
            提交
          </Button>
        </div>
      </div>
      <div className="action-editor-panel">
        <div className="action-editor-panel-header">Middleware</div>
        <div className="action-editor-panel-body">
          <CodeEditor ref={codeEditorRef} />
        </div>
        <div className="action-editor-panel-actions">
          <Button type="primary" onClick={onSubmit}>
            提交
          </Button>
        </div>
      </div>
      <Modal
        title="路径名称"
        visible={addModalVisible}
        centered
        destroyOnClose
        onOk={onAddOk}
        onCancel={() => setAddModalVisible(false)}
      >
        <div>父级路径: {currentPath}</div>
        <br />
        <Input onChange={(ele) => setAddFilename(ele.target.value)} />
      </Modal>
    </div>
  );
}

export async function fetch() {
  store.dispatch.loading.startLoading();
  store.dispatch.core.initFileTree({
    callback: () => {
      store.dispatch.loading.endLoading();
    },
  });
}

export default HomePage;
