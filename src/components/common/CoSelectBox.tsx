import { IndexSignatureType } from "@/modules/types";
import classNames from "classnames";
import React from "react";

export interface SelectOption<V extends string | number> {
  id: V;
  name: string;
  disabled?: boolean;
}

export interface SelectBoxProps<V extends string | number>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: Array<SelectOption<V>>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  isAll?: boolean;
  optionKey?: string;
  optionValue?: string;
  linkedValue?: string;
  linkedKey?: string;
  linkName?: string;
}

function CoSelectBoxInner<V extends string | number = string>(
  {
    className,
    options,
    onChange,
    placeholder,
    disabled,
    id,
    name,
    isAll = true,
    optionKey = "id",
    optionValue = "name",
    linkedValue,
    linkedKey,
    linkName,
    ...rest
  }: SelectBoxProps<V>,
  ref: React.ForwardedRef<HTMLSelectElement>,
) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(e);
  };

  return (
    <select
      {...rest}
      className={classNames(className)}
      id={id}
      name={name}
      onChange={handleChange}
      disabled={disabled}
      aria-disabled={disabled}
      data-key={linkedKey}
      data-value={linkedValue}
      data-link-name={linkName}
      ref={ref}
    >
      {typeof placeholder === "string" && placeholder.length > 0 && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {isAll && (
        <option key={`${name}_all`} value="">
          전체
        </option>
      )}
      {options.map((option: IndexSignatureType) => {
        return (
          <option
            key={`${name}_${option[optionKey]}`}
            value={option[optionKey]}
          >
            {option[optionValue]}
          </option>
        );
      })}
    </select>
  );
}

const CoSelectBox = React.forwardRef(CoSelectBoxInner) as <
  V extends string | number = string,
>(
  props: SelectBoxProps<V> & React.RefAttributes<HTMLSelectElement>,
) => React.ReactElement;

export default CoSelectBox;
