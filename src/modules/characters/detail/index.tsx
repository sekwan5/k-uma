import { PageTitle } from "@/components/common/PageTitle";
import Succession from "@/container/characters/succession/index";

interface CharactersDetailProps {
  id: string;
}

export default function CharactersDetail({ id }: CharactersDetailProps) {
  return (
    <>
      <PageTitle depth="race">
        <h2>캐릭터 목록</h2>
      </PageTitle>
      <Succession characterId={id} />
    </>
  );
}
