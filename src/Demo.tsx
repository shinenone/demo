import React, { useState } from 'react';
import { Radio, Card, List, Table, Badge } from 'antd';
import type { TableProps, RadioChangeEvent } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './Demo.css';
import data from './data.json'
const ImageInfo = require('./image.jpg');

const DemoList: React.FC = () => {

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card size='small'>
            <div className='content'>
              <img className='image' src={ImageInfo} alt="" width={80} />
              <div className='info'>
                <div className='flex'>
                  <span className='title'>{item.prjName}</span>
                  <>
                    { item.projectStatus === 'processing' && <Badge status="processing" text="进行中" /> }
                    { item.projectStatus === 'approving' && <Badge status="error" text="审批中" /> }
                  </>
                </div>
                <div className='text'>项目经理：{item.prjManager}</div>
                <div className='text'>立项日期：{item.prjStartDate}</div>
                <div className='flex'>
                  <span className='text'>任务：{item.taskCount}完成：{item.taskDoneCount}进行：{item.taskDoingCount}</span>
                  <StarFilled style={{ color: '#facc14' }} />
                  </div>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  )
}

const DemoTable: React.FC = () => {

  const columns: TableProps<any>['columns'] = [
    {
      width: 50,
      dataIndex: 'icon',
      key: 'icon',
      render: () => (<StarFilled style={{ color: '#facc14' }} />)
    },
    {
      title: '所属品类',
      dataIndex: 'productCategory',
      key: 'productCategory',
    },
    {
      title: '项目类别',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '项目编号',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: '项目名称',
      dataIndex: 'prjName',
      key: 'prjName',
    },
    {
      title: '项目状态',
      dataIndex: 'projectStatus',
      key: 'projectStatus',
      render: (text) => (
        <>
          { text === 'processing' && <Badge status="processing" text="进行中" /> }
          { text === 'approving' && <Badge status="error" text="审批中" /> }
        </>
      ),
    },
    {
      title: '项目经理',
      dataIndex: 'prjManager',
      key: 'prjManager',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '项目计划时间',
      dataIndex: 'time',
      key: 'time',
      render: (_, record) => (<>{record.prjStartDate} ~ {record.prjEndDate}</>),
    },
  ];

  return (
    <Table pagination={false} columns={columns} dataSource={data} />
  )
}

const Demo: React.FC = () => {

  const [mode, setMode] = useState<string>('card');

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <div className='radio'>
        <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="card">卡片</Radio.Button>
          <Radio.Button value="list">列表</Radio.Button>
        </Radio.Group>
      </div>
      
      { mode === 'card' && <DemoList /> }
      { mode === 'list' && <DemoTable /> }
    </div>
  )
}

export default Demo