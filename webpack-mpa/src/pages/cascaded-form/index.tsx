import React, { useRef, useState } from 'react';
import { bootstrap } from '@/bootstrap';
import FormProvider, { FormProviderRef } from './provider';
import { Col, Row, Button } from 'infosysD';
import DataFilterForm from './data-filter-factory';

const CascadedForm = () => {
  const formProvider = useRef<FormProviderRef>();
  const [formNames, setFormNames] = useState(['form1']);

  const onAdd = () => {
    setFormNames([...formNames, `form_${Date.now()}`]);
  };
  const onSubmit = () => {
    const forms = formProvider.current?.getForms();

    console.log(forms);
  };

  return (
    <div>
      <h1>cascaded form</h1>
      <FormProvider ref={formProvider}>
        {formNames.map((name, idx) => {
          return <DataFilterForm key={idx} formName={name} />;
        })}
      </FormProvider>
      <Row justify="space-around">
        <Col>
          <Button type="primary" onClick={onAdd}>
            add item
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={onSubmit}>
            submit
          </Button>
        </Col>
      </Row>
    </div>
  );
};

bootstrap(<CascadedForm />);
