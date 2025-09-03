/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import * as React from "react";

import { ApiBase } from "@/modules/api/base";
import { IndexSignatureType } from "@/modules/types";
import { useTableActions, useTableValue } from "./TableProvider";
import { api } from "@/modules/api/api";
import { TableCheckbox } from "./TableCheckbox";

export interface CoTableColumn<T = any> {
  title: string;
  key: string;
  sort?: boolean;
  class?: string;
  render?: (val: T) => React.ReactNode;
}

export interface CoTableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  columns?: CoTableColumn[];
  data?: IndexSignatureType[];
  apiBase?: ApiBase<any>;
  getRowData?: (
    val: IndexSignatureType,
    flag: string,
    key?: string,
  ) => void | unknown;
  getCheckedData?: (val: IndexSignatureType[]) => void | unknown;
  isRowClick?: boolean;
  isCheckBox?: boolean;
  reload?: boolean;
  isPagination?: boolean;
  getFilter?(): IndexSignatureType;
  url?: string;
}

const CoTable = React.forwardRef<HTMLTableElement, CoTableProps>(
  (
    {
      className,
      columns,
      data,
      apiBase,
      getRowData,
      getCheckedData,
      isRowClick = false,
      isCheckBox = false,
      reload = false,
      isPagination = true,
      getFilter,
      url,
      ...props
    },
    ref,
  ) => {
    const classes = classNames(className);

    const tableValue = useTableValue();
    const actions = useTableActions();

    React.useEffect(() => {
      if (data !== undefined) {
        actions.setRows(data);
      } else {
        load();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      tableValue.pagination.page,
      tableValue.pagination.size,
      data,
      tableValue.refresh,
      reload,
    ]);

    const checkboxdata = (val: IndexSignatureType[]) => {
      if (!getCheckedData) return;
      getCheckedData(val);
    };

    const [isAllCheck, setIsAllCheck] = React.useState<boolean>(false);

    const checkBoxHandler = (
      e: React.ChangeEvent<HTMLInputElement>,
      val: IndexSignatureType,
      flag: string,
    ) => {
      let updatedRows;
      if (flag === "all") {
        const isChecked = e.target.checked || false;
        setIsAllCheck(isChecked);
        updatedRows = tableValue.rows.map((row) => ({
          ...row,
          isSelected: isChecked,
        }));
      } else if (flag === "child") {
        updatedRows = tableValue.rows.map((row) =>
          row === val ? { ...row, isSelected: !row.isSelected } : row,
        );
      }
      actions.setRowsOnly(updatedRows as IndexSignatureType[]);
    };

    React.useEffect(() => {
      if (!isCheckBox) return;
      const checkedCount = tableValue.rows.filter(
        (item) => item.isSelected === true,
      ).length;
      checkboxdata(tableValue.rows.filter((item) => item.isSelected === true));
      if (
        tableValue.rows.length === 0 ||
        tableValue.rows.length !== checkedCount
      ) {
        setIsAllCheck(false);
      }
      if (
        tableValue.rows.length !== 0 &&
        tableValue.rows.length === checkedCount
      ) {
        setIsAllCheck(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableValue.rows]);

    const load = () => {
      if (apiBase) {
        const pagination = tableValue.pagination;

        const { validate, filters } = actions.validateFilter();

        if (validate) {
          apiBase
            .list(
              pagination.page,
              pagination.size,
              getFilter ? getFilter() : filters,
            )
            .then((res) => {
              const list = res.list;
              actions.setRows(list, res.count);
            })
            .catch(() => {
              actions.setRows([], 0);
            });
        }
      } else if (url) {
        const pagination = tableValue.pagination;

        const { validate, filters } = actions.validateFilter();

        if (validate) {
          api.client
            .request({
              url: url,
              params: {
                skip: (pagination.page - 1) * pagination.size,
                limit: pagination.size,
                ...(getFilter ? getFilter() : filters),
              },
            })
            .then((res) => {
              const list = res.data["list"] ?? [];
              actions.setRows(list, res.data["count"] ?? 0);
            })
            .catch(() => {
              actions.setRows([], 0);
            });
        }
      }
    };

    const table = (
      <>
        <table {...props} className={classes} ref={ref}>
          <thead>
            <tr>
              {isCheckBox && (
                <th
                  scope="col"
                  key={`table-column-checkBox`}
                  style={{ width: 35 }}
                >
                  <TableCheckbox
                    name={"checkbox"}
                    onChange={(e) => {
                      checkBoxHandler(e, {}, "all");
                    }}
                    checked={isAllCheck}
                  ></TableCheckbox>
                </th>
              )}
              {columns?.map(function (column, index) {
                return (
                  <th
                    scope="col"
                    key={`table-column-${index}`}
                    className="text-center"
                  >
                    {column.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableValue.rows.map((object, index) => {
              return (
                <tr
                  key={`table-row-${index}`}
                  style={{ cursor: `${isRowClick ? "pointer" : "auto"}` }}
                  onClick={(
                    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
                  ) => {
                    const element = event.target as HTMLElement;

                    if (element.tagName === "TD" && isRowClick && getRowData) {
                      getRowData(object, "get");
                    }
                  }}
                >
                  {isCheckBox && (
                    <th scope="row" key={`table-checkBox`}>
                      <TableCheckbox
                        name={"checkbox"}
                        onChange={(e) => {
                          checkBoxHandler(e, object, "child");
                        }}
                        checked={object.isSelected as boolean}
                      ></TableCheckbox>
                    </th>
                  )}
                  {columns?.map((column, index) => {
                    const key = `table-data-${index}-${column.key}`;
                    if (column.render) {
                      return (
                        <td key={key} className={column.class ?? ""}>
                          {column.render(object)}
                        </td>
                      );
                    } else {
                      return (
                        <td key={key} className={column.class ?? ""}>
                          {object[column.key]}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {isPagination && <></>}
      </>
    );

    return table;
  },
);

export default CoTable;
