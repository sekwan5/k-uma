import * as React from "react";
// import { Schema } from "yup";
import CoSelectBox, { SelectBoxProps } from "../CoSelectBox";
import { useFormActions } from "./CoFormProvider";
import { useTableActions } from "../CoTable/TableProvider";

export default function CoFormSelect({
  className,
  isAll = true,
  options = [],
  id,
  name,
  onChange,
  optionKey,
  optionValue,
  // schema,
  ...props
}: SelectBoxProps<string | number>) {
  const filterActions = useTableActions();
  const formAction = useFormActions();

  React.useEffect(() => {
    // if (name && schema) {
    //    formAction.initValidation(name, schema);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CoSelectBox
      {...props}
      className={className}
      id={id}
      optionKey={optionKey}
      optionValue={optionValue}
      name={name}
      onChange={(e) => {
        if (filterActions !== null) filterActions.handleChange(e);
        if (formAction !== null) formAction.handleChange(e);
        if (onChange) onChange(e);
      }}
      isAll={isAll}
      options={options}
    />
  );
}
