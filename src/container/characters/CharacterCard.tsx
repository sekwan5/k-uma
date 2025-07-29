import React from "react";
import { Character } from "./succession";

interface CharacterCardProps {
  character: Character;
  onClick: (id: string) => void;
}

const CharacterCard = React.memo(
  ({ character, onClick }: CharacterCardProps) => {
    return (
      <div
        className="character-card"
        style={{
          borderColor: character.color?.primary,
          background: character.color?.primary,
        }}
        onClick={() => onClick(character.id)}
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
              style={{ backgroundColor: character.color?.secondary }}
            />
            <div
              className="right-border"
              style={{ backgroundColor: character.color?.primary }}
            />
          </div>
          <div
            className="name-plate"
            style={{ backgroundColor: character.color?.background }}
          >
            {character.name}
          </div>
        </div>
      </div>
    );
  },
);

CharacterCard.displayName = "CharacterCard";

export default CharacterCard;
