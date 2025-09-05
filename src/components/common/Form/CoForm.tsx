/* eslint-disable @typescript-eslint/no-explicit-any */
import { IndexSignatureType } from "@/modules/types";
import classNames from "classnames";
// import PropTypes from "prop-types";
import * as React from "react";
import CoFormSelect from "./CoFormSelect";
import CoFormControl from "./CoFormControl";
// import { useFormActions } from "./CoFormProvider";
// import LcFormCheck from "./LcFormCheck";
// import LcFormControl from "./LcFormControl";
// import LcFormFloating from "./LcFormFloating";
// import LcFormGroup from "./LcFormGroup";
// import LcFormLabel from "./LcFormLabel";
// import LcFormRange from "./LcFormRange";
// import LcFormSelect from "./LcFormSelect";
// import LcFormText from "./LcFormText";
// import LcSwitch from "./LcSwitch";
// import LcFloatingLabel from "./LcFloatingLabel";
// import { LcPrefixRefForwardingComponent, AsProp } from "./helpers";
// import { IndexSignatureType } from "@/modules/types";
// import { useLcFormActions } from "./LcFormProvider";
// import { ValidationError } from "yup";
// import { ValidationError } from "yup";

export interface CoFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  validated?: boolean;
  onValidated?: (args: IndexSignatureType) => void;
}

const CoForm = React.forwardRef<HTMLFormElement, CoFormProps>(
  ({ className, validated, onSubmit, ...props }, ref) => {
    // const formAction = useFormActions();

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // if (formAction.validate) {
      //   const validation = formAction.validate();

      //   if (!(validation instanceof ValidationError) && onValidated) {
      //     onValidated(validation);
      //   }
      // }
    };

    return (
      <form
        {...props}
        ref={ref}
        className={classNames(className, validated && "was-validated")}
        onSubmit={onSubmit ? onSubmit : handleOnSubmit}
      />
    );
  },
);

export default Object.assign(CoForm, {
  Select: CoFormSelect,
  Control: CoFormControl,
});
