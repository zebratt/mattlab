import { bootstrap } from '@/bootstrap';
import React from 'react';
import { Tree } from 'antd';
import './style.less';
import { DataNode } from 'rc-tree/lib/interface';

const treeData: DataNode[] = [
  {
    title: '0-0',
    key: '0-0',
    checkable: false,
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        checkable: false,
        children: [
          {
            title: (
              <div className="row">
                <span>查看</span>
                <div>
                  <a>查看权限</a>
                  &nbsp;
                  <a>配置权限</a>
                </div>
              </div>
            ),
            key: '0-0-0-0',
          },
          {
            title: (
              <div className="row">
                <span>查看</span>
                <div>
                  <a>查看权限</a>
                  &nbsp;
                  <a>配置权限</a>
                </div>
              </div>
            ),
            key: '0-0-0-1',
          },
          {
            title: (
              <div className="row">
                <span>查看</span>
                <div>
                  <a>查看权限</a>
                  &nbsp;
                  <a>配置权限</a>
                </div>
              </div>
            ),
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        checkable: false,
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
        checkable: false,
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    checkable: false,
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
    checkable: false,
  },
];

const Permission = () => {
  return (
    <div className="permission-page">
      <Tree checkable treeData={treeData} />
    </div>
  );
};

bootstrap(<Permission />);
