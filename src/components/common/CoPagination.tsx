import { useTableValue, useTableActions } from "./CoTable/TableProvider";

export const CoPagination = () => {
  const tableValue = useTableValue();
  const actions = useTableActions();

  //ANCHOR - FUNCTIONS
  const movePage = (page: number) => {
    actions.setPage(page);
  };

  const renderPagination = () => {
    const page = tableValue.pagination.page;
    const totalPages = tableValue.pagination.totalPages;
    if (totalPages <= 10) {
      return (
        <>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((idx) => (
            <li
              className={`page-item ${page === idx ? "active" : ""}`}
              key={`page=${idx}`}
            >
              <a className="page-link" href="#" onClick={() => movePage(idx)}>
                {idx}
              </a>
            </li>
          ))}
        </>
      );
    }

    return (
      <>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((idx) => (
          <li
            className={`page-item ${page === idx ? "active" : ""}`}
            key={`page=${idx}`}
          >
            <a className="page-link" href="#" onClick={() => movePage(idx)}>
              {idx}
            </a>
          </li>
        ))}
        <li className="page-item disabled" key="ellipsis">
          <span className="page-link">…</span>
        </li>
        <li
          className={`page-item ${page === totalPages ? "active" : ""}`}
          key={`page=${totalPages}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => movePage(totalPages)}
          >
            {totalPages}
          </a>
        </li>
      </>
    );
  };

  const toForward = () => {
    movePage(tableValue.pagination.page - 1);
  };
  const toBackward = () => {
    movePage(tableValue.pagination.page + 1);
  };

  return (
    <nav className="table-pagination mb-3" aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${tableValue.pagination.page === 1 ? "disabled" : ""}`}
        >
          <a href="#" className="page-link" onClick={toForward}>
            &lt;
          </a>
        </li>

        {/* NOTE - Paging */}
        {tableValue.pagination.totalPages !== 0 && renderPagination()}

        {/* NOTE - 뒤로가기 */}
        <li
          className={`page-item ${tableValue.pagination.page === tableValue.pagination.totalPages ? "disabled" : ""}`}
        >
          <a href="#" className="page-link" onClick={toBackward}>
            &gt;
          </a>
        </li>
      </ul>
    </nav>
  );
};
