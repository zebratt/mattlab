import React from 'react';
import { Col, Form, Input, Radio, Row, Select } from 'infosysD';
import { FormContext } from './provider';

enum MatchRule {
  EVERY,
  ANY,
}

interface IProps {
  formName: string;
  mode?: 'config' | 'sql';
  title?: string;
  matchRule?: MatchRule;
}

const DataFilterFactory: React.FC<IProps> = ({ formName }) => {
  const [form] = Form.useForm();
  const formContext = React.useContext(FormContext);

  formContext?.registerForm(formName, form);

  return (
    <div>
      <Form form={form} name={formName}>
        <Form.Item
          label="name"
          name="username"
          rules={[{ required: true, message: 'please input your name' }]}
          hasFeedback
        >
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item
          label="age"
          name="age"
          rules={[{ required: true, message: 'please input your age' }]}
          hasFeedback
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default DataFilterFactory;
