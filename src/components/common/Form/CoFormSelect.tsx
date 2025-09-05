// import { Schema } from "yup";
import { useEffect, useRef } from "react";
import CoSelectBox, { SelectBoxProps } from "../CoSelectBox";
import { useTableActions } from "../CoTable/TableProvider";
import { useFormActions } from "./CoFormProvider";

export default function CoFormSelect({
  className,
  isAll = true,
  options = [],
  id,
  name,
  onChange,
  optionKey,
  optionValue,
  // linkedKey,
  // linkedValue,
  // schema,
  ...props
}: SelectBoxProps<string | number>) {
  const filterActions = useTableActions();
  const formAction = useFormActions();
  // const filterValue = useTableValue();

  const localRef = useRef<HTMLSelectElement>(null);
  // const initDispatchedRef = useRef(false);

  useEffect(() => {
    // if (name && schema) {
    //    formAction.initValidation(name, schema);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!name || !localRef.current) return;

  //   const linked = filterValue?.filters?.[linkedKey ?? ""] as
  //     | string
  //     | undefined;

  //   const key = optionKey ?? "id";
  //   const firstOptionRecord: Record<string, unknown> | undefined =
  //     options && options.length > 0
  //       ? (options[0] as unknown as Record<string, unknown>)
  //       : undefined;
  //   const raw = firstOptionRecord ? firstOptionRecord[key] : undefined;
  //   const firstOptionValue = raw != null ? String(raw) : "";

  //   const nextValue = linked ?? firstOptionValue;

  //   // 값이 비어있지 않으면 설정 및 change 이벤트 한 번 디스패치
  //   if (nextValue !== "") {
  //     if (localRef.current.value !== nextValue) {
  //       localRef.current.value = nextValue;
  //     }
  //     if (!initDispatchedRef.current) {
  //       const ev = new Event("change", { bubbles: true });
  //       localRef.current.dispatchEvent(ev);
  //       initDispatchedRef.current = true;
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filterValue?.filters, name, linkedKey, options, optionKey]);

  return (
    <CoSelectBox
      {...props}
      className={className}
      ref={filterActions ? localRef : undefined}
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
