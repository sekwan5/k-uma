/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { IndexSignatureType } from "@/modules/types";
// import * as yup from "yup";
// import { InferType, Schema, ValidationError } from "yup";

interface FormValueContextType {
  value: IndexSignatureType;
  schema: IndexSignatureType;
  valid: IndexSignatureType;
  message: IndexSignatureType;
}

interface FormActionContextType {
  // initValidation: (name: string, schema: Schema) => void;
  setValue: (name: string, value: string) => void;
  // validate: (
  //   schema?: IndexSignatureType,
  //   value?: IndexSignatureType,
  // ) => InferType<Schema> | ValidationError;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
}

const FormValueContext = React.createContext<FormValueContextType>({
  value: {},
  schema: {},
  valid: {},
  message: {},
});

const FormActionContext = React.createContext<FormActionContextType>({
  // initValidation: () => {},
  setValue: () => {},
  // validate: () => {
  //   return {};
  // },
  handleChange: () => {},
});

const FormProvider = ({
  defaultValue,
  children,
}: {
  defaultValue?: IndexSignatureType;
  children: React.ReactNode;
}) => {
  const [values, setValues] = React.useState<FormValueContextType>({
    value: defaultValue ?? {},
    schema: {},
    valid: {},
    message: {},
  });

  React.useEffect(() => {
    if (defaultValue) {
      setValues((prev) => ({
        ...prev,
        value: defaultValue,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const actions = React.useMemo(
    () => ({
      // initValidation(name: string, schema: Schema) {
      //   setValues((prev) => ({
      //     ...prev,
      //     schema: {
      //       ...prev.schema,
      //       [name]: schema,
      //     },
      //   }));
      // },
      setValue(name: string, value: string) {
        setValues((prev) => ({
          ...prev,
          value: {
            ...prev.value,
            [name]: value,
          },
        }));
      },
      // validate(schema?: IndexSignatureType, value?: IndexSignatureType) {
      //   console.log(`*********************************`);
      //   console.log(`scheme`, schema);
      //   console.log(`value`, value);
      //   try {
      //     const result = yup
      //       .object()
      //       .shape({ ...values.schema, ...schema })
      //       .validateSync(
      //         { ...values.value, ...value },
      //         {
      //           abortEarly: false,
      //         },
      //       );

      //     setValues((prev) => ({
      //       ...prev,
      //       valid: {},
      //       message: {},
      //     }));

      //     return result;
      //   } catch (err) {
      //     const error = err as ValidationError;

      //     const valid: IndexSignatureType = {};
      //     const message: IndexSignatureType = {};
      //     error.inner.forEach((e) => {
      //       if (e.path && e.message) {
      //         valid[e.path] = false;
      //         message[e.path] = e.message;
      //       }
      //     });

      //     setValues((prev) => ({
      //       ...prev,
      //       valid: valid,
      //       message: message,
      //     }));

      //     return error;
      //   }
      // },
      handleChange(
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) {
        const { name } = event.target;
        const value = event.target.value;

        if (!name) return;

        this.setValue(name, value);
      },
    }),
    [values],
  );

  return (
    <FormActionContext.Provider value={actions}>
      <FormValueContext.Provider value={values}>
        {children}
      </FormValueContext.Provider>
    </FormActionContext.Provider>
  );
};

export const useFormValue = (): FormValueContextType => {
  const value = React.useContext(FormValueContext);
  if (value === undefined) {
    throw new Error("useFormValue should be used within FormProvider");
  }
  return value;
};

export const useFormActions = (): FormActionContextType => {
  const value = React.useContext(FormActionContext);
  if (value === undefined) {
    throw new Error("useFormActions should be used within FormProvider");
  }
  return value;
};

export default FormProvider;
