import classNames from "classnames";
import * as React from "react";
import { useTableActions } from "../CoTable/TableProvider";
import { useFormActions } from "./CoFormProvider";

type LcFormControlElement = HTMLInputElement;

export interface LcFormControlProps {
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<LcFormControlElement>) => void;
  onFocus?: (e: React.FocusEvent<LcFormControlElement>) => void;
  name?: string;
  plaintext?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  type?: string;
}

const LcFormControl = React.forwardRef<
  LcFormControlElement,
  LcFormControlProps
>(
  (
    {
      type,
      id,
      className,
      onChange,
      onFocus,
      name,
      readOnly,
      disabled,
      ...props
    },
    ref,
  ) => {
    const filterActions = useTableActions();
    const formAction = useFormActions();

    React.useEffect(() => {
      // if (name && schema) {
      //   formAction.initValidation(name, schema);
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <input
        {...props}
        ref={ref}
        type={type}
        readOnly={readOnly}
        id={id}
        name={name}
        onChange={(e: React.ChangeEvent<LcFormControlElement>) => {
          if (filterActions !== null) filterActions.handleChange(e);
          if (formAction !== null) formAction.handleChange(e);
          if (onChange) onChange(e);
        }}
        onFocus={onFocus}
        disabled={disabled}
        className={classNames(className)}
      />
    );
  },
);

export default Object.assign(LcFormControl);
