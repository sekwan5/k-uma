import { Outlet } from "react-router-dom";
import { ContentsContainer, Header, Sidebar } from "@/components/layout";
import ScrollToTop from "@/components/common/ScrollToTop";

export function Component() {
  return (
    <>
      <Header />
      <div className="smodWrap smodWrap-m">
        <ScrollToTop />
        <Sidebar />
        <ContentsContainer>
          <Outlet />
        </ContentsContainer>
      </div>
    </>
  );
}
