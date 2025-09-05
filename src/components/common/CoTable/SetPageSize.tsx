// Copyright © Amazon.com and Affiliates: This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties dated 2024/02/07.

import CoForm from "../Form/CoForm";
import { useTableValue, useTableActions } from "./TableProvider";

interface SetPageSizeProps {
  searchKeys: { id: string; name: string }[];
  useFilter: boolean;
}

export const SetPageSize = ({ searchKeys, useFilter }: SetPageSizeProps) => {
  const tableValue = useTableValue();
  const actions = useTableActions();

  const search = () => {
    if (tableValue.pagination.page === 1) actions.toggleRefresh();
    else actions.setPage(1);
  };

  return (
    <div className="d-flex justify-content-between">
      <CoForm>
        {useFilter && (
          <>
            <CoForm.Select
              name="search_key"
              options={searchKeys}
              isAll={false}
              linkedKey="search_key"
              linkedValue="search_string"
            />
            <CoForm.Control
              type="text"
              name="search_string"
              placeholder="검색어를 입력해 주세요."
              linkedKey="search_key"
              linkedValue="search_string"
            />
            <button onClick={search}>검색</button>
          </>
        )}
      </CoForm>
      <div className="d-flex">
        <div className="">
          {`전체 ${tableValue.pagination.totalElements.toLocaleString()}건`}
        </div>
        <div className="p-1">
          <CoForm.Select
            options={[
              { id: 10, name: "10개" },
              { id: 20, name: "20개" },
              { id: 50, name: "50개" },
              { id: 100, name: "100개" },
            ]}
            isAll={false}
            value={tableValue.pagination.size}
            onChange={(e) => actions.setSize(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
