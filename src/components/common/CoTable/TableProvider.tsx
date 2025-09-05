import * as React from "react";
import { IndexSignatureType } from "@/modules/types";

interface TablePagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface TableValueContextType {
  rows: IndexSignatureType[];
  filters: IndexSignatureType;
  links: IndexSignatureType;
  linkNames: IndexSignatureType;
  pagination: TablePagination;
  refresh: boolean;
  initialized: boolean;
}

type TableFilterFormElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface TableActionContextType {
  setValue: (value: IndexSignatureType) => void;
  setRows: (rows: IndexSignatureType[], totalElements?: number) => void;
  setRowsOnly: (rows: IndexSignatureType[]) => void;
  setPage: (page: number) => void;
  setFilter: (key: string, value: string) => void;
  setSize: (value: number) => void;
  setLink: (key: string, value: string) => void;
  setLinkName: (key: string, value: string) => void;
  resetFilter: () => void;
  handleChange: (event: React.ChangeEvent<TableFilterFormElement>) => void;
  toggleRefresh: () => void;
  validateFilter: () => { validate: boolean; filters: IndexSignatureType };
}

const TableValueContext = React.createContext<TableValueContextType>({
  rows: [],
  filters: {},
  links: {},
  linkNames: {},
  pagination: {
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  },
  refresh: false,
  initialized: true,
});

const TableActionContext = React.createContext<TableActionContextType>({
  setValue: () => {},
  setRows: () => {},
  setRowsOnly: () => {},
  setPage: () => {},
  setFilter: () => {},
  setSize: () => {},
  setLink: () => {},
  setLinkName: () => {},
  resetFilter: () => {},
  handleChange: () => {},
  toggleRefresh: () => {},
  validateFilter: () => {
    return { validate: false, filters: {} };
  },
});

const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [values, setValues] = React.useState<TableValueContextType>({
    rows: [],
    filters: {},
    links: {},
    linkNames: {},
    pagination: {
      page: 1,
      size: 10,
      totalElements: 0,
      totalPages: 0,
    },
    refresh: false,
    initialized: true,
  });

  const actions = React.useMemo(
    () => ({
      setValue(value: IndexSignatureType) {
        setValues((prev) => ({
          ...prev,
          ...value,
        }));
      },
      setRows(rows: IndexSignatureType[], totalElements: number = -1) {
        setValues((prev) => ({
          ...prev,
          rows: rows,
          pagination: {
            ...prev.pagination,
            totalElements: totalElements < 0 ? rows.length : totalElements,
            totalPages:
              totalElements < 0
                ? 1
                : Math.ceil(totalElements / prev.pagination.size),
          },
        }));
      },
      setRowsOnly(rows: IndexSignatureType[]) {
        setValues((prev) => ({
          ...prev,
          rows: rows,
        }));
      },
      setPage(page: number) {
        setValues((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            page: page,
          },
        }));
      },
      setFilter(key: string, value: string) {
        setValues((prev) => {
          const filters = prev.filters ?? {};
          if (value !== "") {
            filters[key] = value;
          } else {
            delete filters[key];
          }
          return {
            ...prev,
            filters: filters,
          };
        });
      },
      setSize(value: number) {
        setValues((prev) => {
          const a = {
            ...prev,
            pagination: {
              ...prev.pagination,
              size: value,
            },
          };
          return a;
        });
      },
      setLink(key: string, value: string) {
        setValues((prev) => {
          const links = prev.links ?? {};
          if (key && value) {
            links[key] = value;
          }
          return {
            ...prev,
            links: links,
          };
        });
      },
      setLinkName(key: string, value: string) {
        setValues((prev) => {
          const linkNames = prev.linkNames ?? {};
          if (key && value) {
            linkNames[key] = value;
          }
          return {
            ...prev,
            linkNames: linkNames,
          };
        });
      },
      resetFilter() {
        setValues((prev) => ({
          ...prev,
          filters: {},
          links: {},
          linkNames: {},
        }));
      },
      handleChange(
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) {
        const { name } = event.target;
        const value = event.target.value;
        const datasetKey = event.target.dataset.key;
        const datasetValue = event.target.dataset.value;

        if (!name) return;

        if (
          event.target.type === "checkbox" &&
          event.target.dataset.multiple === "true"
        ) {
          const element = event.target as HTMLInputElement;
          let filterValues = values.filters[name] ?? [];

          if (element.checked && !filterValues.includes(value)) {
            filterValues.push(value);
          } else if (!element.checked && filterValues.includes(value)) {
            filterValues = filterValues.filter((e: string) => e !== value);
          }
          this.setFilter(name, filterValues);
        } else {
          if (datasetKey) {
            this.setLink(datasetKey, name);
            this.setLinkName(
              datasetKey,
              event.target.dataset.linkName ?? "검색어 타입",
            );
          } else if (datasetValue) {
            this.setLink(name, datasetValue);
            this.setLinkName(
              datasetValue,
              event.target.dataset.linkName ?? "검색어",
            );
          }

          this.setFilter(name, value);
        }
      },
      toggleRefresh() {
        setValues((prev) => ({
          ...prev,
          refresh: !prev.refresh,
        }));
      },
      validateFilter() {
        const filters = structuredClone(values.filters);
        const links = values.links;
        const linkNames = values.linkNames;

        console.log("filters", filters);
        console.log("links", links);
        console.log("linkNames", linkNames);

        let validate = true;
        Object.keys(links).forEach((key) => {
          if (!filters[key]) {
            if (!filters[links[key]] || filters[links[key]] == "") {
              // 키필드가 없을때 값필드가 없거나 공백이면 그냥 통과
              return false;
            }
            //키필드 체크
            console.log(`${linkNames[key]}를 선택해 주세요.`);
            validate = false;
            return false;
          } else if (!filters[links[key]]) {
            if (!filters[key] || filters[key] == "") {
              //값필드가 없을때 키필드가 없거나 공백이면 그냥 통과
              return false;
            }
            //값 필드 체크
            console.log(`${linkNames[links[key]]}를 입력해 주세요.`);
            validate = false;
            return false;
          } else {
            filters[filters[key]] = filters[links[key]];
            delete filters[key];
            delete filters[links[key]];
          }
        });
        return { validate, filters };
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values],
  );

  return (
    <TableActionContext.Provider value={actions}>
      <TableValueContext.Provider value={values}>
        {children}
      </TableValueContext.Provider>
    </TableActionContext.Provider>
  );
};

export const useTableValue = (): TableValueContextType => {
  const value = React.useContext(TableValueContext);
  if (value === undefined) {
    throw new Error("useTableValue should be used within TableProvider");
  }
  return value;
};

export const useTableActions = (): TableActionContextType => {
  const value = React.useContext(TableActionContext);
  if (value === undefined) {
    throw new Error("useTableActions should be used within TableProvider");
  }
  return value;
};

export default TableProvider;
