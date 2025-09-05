import CoTable, { CoTableColumn } from "@/components/common/CoTable/Cotable";
import { PageTitle } from "@/components/common/PageTitle";
import { useEffect } from "react";
import { api } from "../api/api";

interface ITestTable {
  no: number;
  title: string;
  file: boolean;
  author: string;
  date: string;
  views: number;
}
export default function Test() {
  // const searchFilter = useRef<IndexSignatureType>({});
  // const filterValue = useTableValue();

  const columns: CoTableColumn<ITestTable>[] = [
    {
      title: "번호",
      key: "no",
      class: "text-center",
    },
    {
      title: "제목",
      key: "title",
      class: "text-center",
    },

    {
      title: "작성자",
      key: "author",
      class: "text-center",
    },
    {
      title: "첨부파일",
      key: "file",
      class: "text-center",
      render: (row) => {
        return row.file ? "O" : "X";
      },
    },
    {
      title: "작성일",
      key: "date",
      class: "text-center",
    },
    {
      title: "조회수",
      key: "views",
      class: "text-center",
    },
  ];

  const searchKeys = [
    { id: "title", name: "제목" },
    { id: "user_name", name: "작성자" },
  ];

  useEffect(() => {
    // console.log("test");
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // api.test.list(2, 10).then((res: any) => {
    //   console.log(res);
    // });
  }, []);
  return (
    <>
      <PageTitle depth="test">
        <h2>test</h2>
      </PageTitle>
      <CoTable
        columns={columns}
        apiBase={api.test}
        searchKeys={searchKeys}
        useFilter={true}
      ></CoTable>
    </>
  );
}
