import { PageTitle } from "@/components/common/PageTitle";
import CharacterList from "@/container/characters";

export default function Characters() {
  return (
    <>
      <PageTitle depth="race">
        <h2>캐릭터 목록</h2>
      </PageTitle>
      <div className="container race">
        <CharacterList />
      </div>
    </>
  );
}
