import React from "react";
import "./CharacterInfo.scss";
import { CharaData } from "../Store";
import { getGradeColor, getGradeText } from "../../hooks";
import CharacterHeaderFrame from "./CharacterHeaderFrame";

interface CharacterInfoProps {
  character: CharaData;
  index: number;
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ character, index }) => {
  const { aptitude } = character;

  if (!aptitude) {
    return null;
  }

  return (
    <div className="character-info">
      <div className="character-info-layout">
        <div className="header-section">
          <CharacterHeaderFrame
            characterName={character.name}
            characterIcon={`${import.meta.env.VITE_ASSETS_URL}/uma_profile/${character.icon}`}
            characterRace={`${import.meta.env.VITE_ASSETS_URL}/uma_profile/${character.icon}`}
            characterColor="#EE6DCB"
          />
        </div>
        <div className="info-section">
          <div className="info-table">
            <div className="info-row">
              <div className="info-category">경기장 적성</div>
              <div className="info-tags">
                <span className="tag">
                  <span className="tag-text">잔디</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].surface.turf),
                    }}
                  >
                    {getGradeText(aptitude[index].surface.turf)}
                  </span>
                </span>
                <span className="tag">
                  <span className="tag-text">더트</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].surface.dirt),
                    }}
                  >
                    {getGradeText(aptitude[index].surface.dirt)}
                  </span>
                </span>
              </div>
            </div>

            <div className="info-row">
              <div className="info-category">거리 적성</div>
              <div className="info-tags">
                <span className="tag">
                  <span className="tag-text">단거리</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].distance.sprint),
                    }}
                  >
                    {getGradeText(aptitude[index].distance.sprint)}
                  </span>
                </span>
                <span className="tag">
                  <span className="tag-text">마일</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].distance.mile),
                    }}
                  >
                    {getGradeText(aptitude[index].distance.mile)}
                  </span>
                </span>
                <span className="tag">
                  <span className="tag-text">중거리</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].distance.medium),
                    }}
                  >
                    {getGradeText(aptitude[index].distance.medium)}
                  </span>
                </span>
                <span className="tag">
                  <span className="tag-text">장거리</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].distance.long),
                    }}
                  >
                    {getGradeText(aptitude[index].distance.long)}
                  </span>
                </span>
              </div>
            </div>

            <div className="info-row">
              <div className="info-category">각질 적성</div>
              <div className="info-tags">
                <span className="tag">
                  <span className="tag-text">도주</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].style.front),
                    }}
                  >
                    {getGradeText(aptitude[index].style.front)}
                  </span>
                </span>
                <span className="tag">
                  <span className="tag-text">선행</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].style.pace),
                    }}
                  >
                    {getGradeText(aptitude[index].style.pace)}
                  </span>
                </span>
                <span className="tag">
                  <span className="tag-text">선입</span>
                  <span
                    className="tag-grade"
                    style={{
                      color: getGradeColor(aptitude[index].style.late),
                    }}
                  >
                    {getGradeText(aptitude[index].style.late)}
                  </span>
                </span>
                <span className="tag">
                  <span className="tag-text">추입</span>
                  <span
                    className="tag-grade"
                    style={{ color: getGradeColor(aptitude[index].style.end) }}
                  >
                    {getGradeText(aptitude[index].style.end)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
