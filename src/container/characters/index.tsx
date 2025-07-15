import { useState } from "react";
import specialWeekIcon from "./specialweek_icon.png";

interface Character {
  id: string;
  name: string;
  imageUrl: string;
  rarity: number;
  color: {
    primary: string;
    secondary: string;
    background: string;
  };
}

export default function CharacterList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters] = useState<Character[]>([
    {
      id: "1001",
      name: "스페셜 위크",
      imageUrl: specialWeekIcon,
      rarity: 3,
      color: {
        primary: "#EE6DCB",
        secondary: "#FFDEF9",
        background: "rgb(286, 256, 281)",
      },
    },
    // ... 더 많은 캐릭터 데이터
  ]);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
          >
            <a className="card-link">
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
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
