import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { filteredCharacters } from "./hooks";
import { Store } from "./succession/Store";
import CharacterCard from "./CharacterCard";
import useDebounce from "@/hooks/useDebounce";

export default function CharacterList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const imgPath = import.meta.env.VITE_ASSETS_URL;

  const characters = useMemo(() => {
    return Store.charaListPublic.map((data) => ({
      id: data.id,
      name: data.name,
      keyword: data.keyword,
      imageUrl: `${imgPath}/uma_profile/${data.icon}`,
      color:
        typeof data.color === "object" && data.color !== null
          ? data.color
          : {
              primary: typeof data.color === "string" ? data.color : "#000000",
              secondary:
                typeof data.color === "string" ? data.color : "#000000",
              background:
                typeof data.color === "string" ? data.color : "#000000",
            },
    }));
  }, [imgPath]);

  const filtered = useMemo(() => {
    return filteredCharacters(characters, debouncedSearchTerm);
  }, [characters, debouncedSearchTerm]);

  const handleCharacterClick = useCallback(
    (characterId: string) => {
      navigate(`/characters/${characterId}`);
    },
    [navigate],
  );

  return (
    <div className="container characters">
      <div className="search-section mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="캐릭터 이름으로 검색... (초성 검색 가능)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="character-grid">
        {filtered.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={handleCharacterClick}
          />
        ))}
      </div>
    </div>
  );
}
