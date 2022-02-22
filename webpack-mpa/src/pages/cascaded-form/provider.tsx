import React, { useImperativeHandle } from 'react';
import { FormInstance } from 'infosysD';

export type Forms = Record<string, FormInstance>;

export interface FormProviderRef {
  getForms: () => Forms;
}

export interface FormContextProps {
  registerForm: (name: string, form: FormInstance) => void;
  unregisterForm: (name: string) => void;
}

const FormContext = React.createContext<FormContextProps>({
  registerForm: () => {},
  unregisterForm: () => {},
});

const FormProvider = ({ children }, ref) => {
  const formsRef = React.useRef<Forms>({});
  const formContext = React.useContext(FormContext);

  useImperativeHandle(ref, () => ({
    getForms: () => formsRef.current,
  }));

  return (
    <FormContext.Provider
      value={{
        ...formContext,
        registerForm: (name, form) => {
          if (name) {
            formsRef.current = {
              ...formsRef.current,
              [name]: form,
            };
          }

          formContext.registerForm(name, form);
        },
        unregisterForm: (name) => {
          const newForms = { ...formsRef.current };
          delete newForms[name];
          formsRef.current = newForms;

          formContext.unregisterForm(name);
        },
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext };
export default React.forwardRef(FormProvider);
