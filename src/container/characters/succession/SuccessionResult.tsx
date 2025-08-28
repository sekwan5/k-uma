import { useEffect, useState } from "react";
import { PlusIcon, MinusIcon } from "../../../components/common/icons";

interface SuccessionResultProps {
  totalCompatibilityScore: number;
  giBonus: number;
  onGiBonusChange: (value: number) => void;
  onGiBonusIncrement: (amount: number) => void;
}

export default function SuccessionResult({
  totalCompatibilityScore,
  giBonus,
  onGiBonusChange,
  onGiBonusIncrement,
}: SuccessionResultProps) {
  // △ ○ ◎
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    setFinalScore(totalCompatibilityScore + giBonus);
  }, [totalCompatibilityScore, giBonus]);

  const getScoreIcon = (score: number) => {
    if (score <= 0) return "-";
    if (score <= 50) return "△";
    if (score <= 150) return "○";
    return "◎";
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
          <span>궁합 확실!</span>
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
                  onClick={() => onGiBonusIncrement(-15)}
                >
                  <span>-15</span>
                </button>
                <button
                  className="bonus-btn small"
                  onClick={() => onGiBonusIncrement(-1)}
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
                    value={giBonus}
                    onChange={(e) => onGiBonusChange(Number(e.target.value))}
                  />
                </div>
                <button
                  className="bonus-btn small"
                  onClick={() => onGiBonusIncrement(1)}
                >
                  <span>
                    <PlusIcon size="16px" />
                  </span>
                </button>
                <button
                  className="bonus-btn large"
                  onClick={() => onGiBonusIncrement(15)}
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
