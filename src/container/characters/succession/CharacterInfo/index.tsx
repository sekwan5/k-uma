import React from "react";
import "./CharacterInfo.scss";

interface CharacterInfoProps {
  trackSuitability: {
    turf: number;
    dirt: number;
  };
  distanceSuitability: {
    sprint: number;
    mile: number;
    medium: number;
    long: number;
  };
  runningStyleSuitability: {
    front: number;
    pace: number;
    late: number;
    end: number;
  };
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({
  trackSuitability,
  distanceSuitability,
  runningStyleSuitability,
}) => {
  const getGradeColor = (grade: number) => {
    switch (grade) {
      case 0: // S
        return "#FF0000"; // 빨간색
      case 1: // A
        return "#FF6B35"; // 주황색
      case 2: // B
        return "#FFD93D"; // 노란색
      case 3: // C
        return "#6BCF7F"; // 초록색
      case 4: // D
        return "#4D96FF"; // 파란색
      case 5: // E
        return "#9B59B6"; // 보라색
      case 6: // F
        return "#E74C3C"; // 빨간색
      case 7: // G
        return "#7F8C8D"; // 회색
      default:
        return "#000000";
    }
  };

  const getGradeText = (grade: number) => {
    switch (grade) {
      case 0:
        return "S";
      case 1:
        return "A";
      case 2:
        return "B";
      case 3:
        return "C";
      case 4:
        return "D";
      case 5:
        return "E";
      case 6:
        return "F";
      case 7:
        return "G";
      default:
        return "?";
    }
  };

  return (
    <div className="character-info">
      <div className="info-table">
        <div className="info-row">
          <div className="info-category">경기장 적성</div>
          <div className="info-tags">
            <span className="tag">
              <span className="tag-text">잔디</span>
              <span
                className="tag-grade"
                style={{ color: getGradeColor(trackSuitability.turf) }}
              >
                {getGradeText(trackSuitability.turf)}
              </span>
            </span>
            <span className="tag">
              <span className="tag-text">더트</span>
              <span
                className="tag-grade"
                style={{ color: getGradeColor(trackSuitability.dirt) }}
              >
                {getGradeText(trackSuitability.dirt)}
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
                style={{ color: getGradeColor(distanceSuitability.sprint) }}
              >
                {getGradeText(distanceSuitability.sprint)}
              </span>
            </span>
            <span className="tag">
              <span className="tag-text">마일</span>
              <span
                className="tag-grade"
                style={{ color: getGradeColor(distanceSuitability.mile) }}
              >
                {getGradeText(distanceSuitability.mile)}
              </span>
            </span>
            <span className="tag">
              <span className="tag-text">중거리</span>
              <span
                className="tag-grade"
                style={{ color: getGradeColor(distanceSuitability.medium) }}
              >
                {getGradeText(distanceSuitability.medium)}
              </span>
            </span>
            <span className="tag">
              <span className="tag-text">장거리</span>
              <span
                className="tag-grade"
                style={{ color: getGradeColor(distanceSuitability.long) }}
              >
                {getGradeText(distanceSuitability.long)}
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
                style={{ color: getGradeColor(runningStyleSuitability.front) }}
              >
                {getGradeText(runningStyleSuitability.front)}
              </span>
            </span>
            <span className="tag">
              <span className="tag-text">선행</span>
              <span
                className="tag-grade"
                style={{
                  color: getGradeColor(runningStyleSuitability.pace),
                }}
              >
                {getGradeText(runningStyleSuitability.pace)}
              </span>
            </span>
            <span className="tag">
              <span className="tag-text">선입</span>
              <span
                className="tag-grade"
                style={{
                  color: getGradeColor(runningStyleSuitability.late),
                }}
              >
                {getGradeText(runningStyleSuitability.late)}
              </span>
            </span>
            <span className="tag">
              <span className="tag-text">추입</span>
              <span
                className="tag-grade"
                style={{ color: getGradeColor(runningStyleSuitability.end) }}
              >
                {getGradeText(runningStyleSuitability.end)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
