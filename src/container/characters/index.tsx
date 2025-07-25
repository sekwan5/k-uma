import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { characterData } from "@/modules/data/characters";

export default function CharacterList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const imgPath = import.meta.env.VITE_ASSETS_URL;

  // characterData를 Character 배열로 변환
  const characters = useMemo(() => {
    return Object.entries(characterData).map(([id, data]) => {
      // color가 객체인지 문자열인지 확인
      const colorObj =
        typeof data.color === "object" && data.color !== null
          ? data.color
          : {
              primary: typeof data.color === "string" ? data.color : "#000000",
              secondary:
                typeof data.color === "string" ? data.color : "#000000",
              background:
                typeof data.color === "string" ? data.color : "#000000",
            };

      return {
        id,
        name: data.name,
        imageUrl: `${imgPath}/uma_profile/${data.icon}`,
        color: colorObj,
      };
    });
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCharacterClick = (characterId: string) => {
    navigate(`/characters/${characterId}`);
  };

  return (
    <div className="container characters">
      <div className="search-section mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="캐릭터 이름으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="character-grid">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            style={{
              borderColor: character.color.primary,
              background: character.color.primary,
            }}
            onClick={() => handleCharacterClick(character.id)}
            role="button"
            tabIndex={0}
          >
            <div className="card-link">
              <div className="icon-wrapper">
                <div className="icon-container">
                  <div className="icon-box">
                    <div className="icon-content">
                      <div
                        className="img-wrapper"
                        style={{ transform: "translateY(-6px)" }}
                      >
                        <div className="img-container">
                          <img
                            src={character.imageUrl}
                            alt={character.name}
                            width="192"
                            height="192"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="left-border"
                  style={{ backgroundColor: character.color.secondary }}
                />
                <div
                  className="right-border"
                  style={{ backgroundColor: character.color.primary }}
                />
              </div>
              <div
                className="name-plate"
                style={{ backgroundColor: character.color.background }}
              >
                {character.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
