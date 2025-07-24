import { PageTitle } from "@/components/common/PageTitle";
import Succession from "@/container/characters/succession";

export default function CharactersDetail() {
  return (
    <>
      <PageTitle depth="race">
        <h2>캐릭터 목록</h2>
      </PageTitle>
      <Succession />
    </>
  );
}
