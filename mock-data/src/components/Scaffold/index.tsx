import './style.less';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouteContainer } from '@/routes';
import { Button, Input, message, Select } from 'antd';
import { createBranch, getBranches } from '@/pages/Home/api';
import { store } from '@/store';
import { Modal } from 'antd';

function useFetch() {
  const [branches, setBranches] = useState<string[]>([]);

  function fetch() {
    getBranches().then((res) => {
      setBranches(res);
    });
  }

  useEffect(() => {
    fetch();
  }, []);

  return { branches, fetch };
}

function Scaffold() {
  const { branches, fetch } = useFetch();
  const [selected, setSelected] = useState<string>('master');
  const [visible, setVisible] = useState(false);
  const [nameValue, setNameValue] = useState('');

  function onSelect(value: string) {
    setSelected(value);

    store.dispatch.loading.startLoading();
    store.dispatch.core.updateBranch(value);
    store.dispatch.core.initFileTree({
      callback: () => store.dispatch.loading.endLoading(),
    });
  }

  function onCreate() {
    setVisible(true);
    setNameValue('');
  }

  function onCancel() {
    setVisible(false);
    setNameValue('');
  }

  function onCreateConfirm() {
    createBranch(nameValue).then((res) => {
      if (res.success) {
        message.success('创建成功');
        fetch();
      } else {
        message.error(`创建失败: ${res.message}`);
      }

      setVisible(false);
    });
  }

  return (
    <div className="scaffold">
      <div className="scaffold-header">
        <div className="logo-text">Mock Data</div>
        <div className="branch-select">
          <span className="label">当前分支：</span>
          <Select style={{width: 120}} value={selected} onSelect={onSelect}>
            {branches.map((ele, idx) => (
              <Select.Option key={idx} value={ele}>
                {ele}
              </Select.Option>
            ))}
          </Select>
          <Button className="button-create" type="default" onClick={onCreate}>
            新建分支
          </Button>
        </div>
        <Modal
          title="创建分支"
          visible={visible}
          centered
          destroyOnClose
          onOk={onCreateConfirm}
          onCancel={onCancel}
        >
          <Input
            value={nameValue}
            onChange={(eve) => setNameValue(eve.target.value)}
          />
        </Modal>
      </div>
      <BrowserRouter>
        <RouteContainer />
      </BrowserRouter>
    </div>
  );
}

export default Scaffold;
