import { PageTitle } from "@/components/common/PageTitle";
import { useEffect } from "react";
import { api } from "../api/api";

export default function Test() {
  useEffect(() => {
    console.log("test");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.test.list(2, 10).then((res: any) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <PageTitle depth="test">
        <h2>test</h2>
      </PageTitle>
    </>
  );
}
