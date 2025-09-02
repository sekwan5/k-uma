import { useEffect, useMemo, useState } from "react";
import { PlusIcon, MinusIcon } from "../../../components/common/icons";
import { TreePositions } from "./types";
import { Store } from "./Store";

interface SuccessionResultProps {
  selectedPositions: TreePositions;
  characterId: string;
}

export default function SuccessionResult({
  selectedPositions,
  characterId,
}: SuccessionResultProps) {
  // △ ○ ◎
  const [finalScore, setFinalScore] = useState(0);
  const [g1Bonus, setG1Bonus] = useState(0);

  // 총 상성점수 계산
  const totalCompatibilityScore = useMemo(() => {
    return Store.calcTotalCompatibility(
      characterId,
      selectedPositions.parent1.main?.id || null,
      selectedPositions.parent2.main?.id || null,
      selectedPositions.parent1.child1?.id || null,
      selectedPositions.parent1.child2?.id || null,
      selectedPositions.parent2.child1?.id || null,
      selectedPositions.parent2.child2?.id || null,
    );
  }, [selectedPositions, characterId]);

  useEffect(() => {
    setFinalScore(totalCompatibilityScore + g1Bonus);
  }, [totalCompatibilityScore, g1Bonus]);

  const getScoreIcon = (score: number) => {
    if (score <= 0) return "-";
    if (score <= 50) return "△";
    if (score <= 150) return "○";
    return "◎";
  };

  const getScoreMessage = (score: number) => {
    if (score <= 0) return `△ 까지 ${1 - score}pt`;
    if (score <= 50) return ` ○ 까지 ${51 - score}pt`;
    if (score <= 150) return `◎ 까지 ${151 - score}pt`;
    return "짱친!";
  };

  const onG1BonusIncrement = (amount: number) => {
    setG1Bonus((prev) => {
      const newG1Bonus = prev + amount;
      if (newG1Bonus < 0) return 0;
      return newG1Bonus;
    });
  };

  const onG1BonusChange = (value: number) => {
    setG1Bonus(value);
  };

  return (
    <div className="succession-result">
      <div className="score-container">
        <div className="score-icon" grid-area="icon">
          <span>{getScoreIcon(finalScore)}</span>
        </div>
        <div className="score-point" grid-area="point">
          <span className="score-value">{finalScore}</span>
          <span className="score-unit">pt</span>
        </div>
        <div className="score-title">
          <span>종합평가</span>
        </div>
        <div className="score-assist">
          <span>{getScoreMessage(finalScore)}</span>
        </div>

        <div className="g1-bonus-control">
          <div className="g1-bonus-content">
            <div className="g1-bonus-header">
              <div className="g1-bonus-label">
                <div className="g1-bonus-label-content">
                  G1 보너스 점수
                  <div></div>
                </div>
                <a className="info-button" href="/announcements/5">
                  <div aria-hidden="true" className="info-button-body">
                    <div className="information-icon">
                      <div className="information-icon-header"></div>
                      <div className="information-icon-body"></div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="g1-bonus-input">
              <div className="g1-bonus-input-grid">
                <button
                  className="bonus-btn large"
                  onClick={() => onG1BonusIncrement(-15)}
                >
                  <span>-15</span>
                </button>
                <button
                  className="bonus-btn small"
                  onClick={() => onG1BonusIncrement(-3)}
                >
                  <span>
                    <MinusIcon size="16px" />
                  </span>
                </button>
                <div className="bonus-input">
                  <input
                    min="0"
                    max="999"
                    type="number"
                    value={g1Bonus}
                    onChange={(e) => onG1BonusChange(Number(e.target.value))}
                  />
                </div>
                <button
                  className="bonus-btn small"
                  onClick={() => onG1BonusIncrement(3)}
                >
                  <span>
                    <PlusIcon size="16px" />
                  </span>
                </button>
                <button
                  className="bonus-btn large"
                  onClick={() => onG1BonusIncrement(15)}
                >
                  <span>+15</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
