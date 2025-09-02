import React from "react";
import "./CharacterHeaderFrame.scss";

interface CharacterHeaderFrameProps {
  characterName: string;
  characterIcon: string;
  characterRace: string;
  characterColor: string;
}

const CharacterHeaderFrame: React.FC<CharacterHeaderFrameProps> = ({
  characterName,
  characterIcon,
  characterRace,
  characterColor,
}) => {
  return (
    <div className="character-header">
      <div className="header-container">
        <div className="header-content">
          <div
            className="left-section"
            style={{ backgroundColor: characterColor }}
          >
            <div className="name-container">
              <div className="character-name" style={{ color: characterColor }}>
                {characterName}
              </div>
            </div>
            <div className="icon-container">
              <div
                className="character-icon"
                style={{
                  backgroundImage: `url(${characterIcon})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          </div>

          <div className="right-section">
            <div className="character-race-image">
              <div
                className="race-bg"
                style={{
                  backgroundImage: `url(${characterRace})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterHeaderFrame;
