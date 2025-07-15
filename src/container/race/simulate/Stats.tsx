import { useDispatch } from "react-redux";
import InputBox from "@/components/common/RaceInputBox/InputBox";
import SelectBox from "@/components/common/SelectBox/index";
import ToggleBox from "@/components/common/ToggleBox/index";
import {
  STYLE_LIST,
  RANK_LIST,
  ConditionLabel,
  Condition,
  Style,
  FitRank,
} from "./constans";
import { RootState, useAppSelector } from "@/store";
import { updateUmaStatus } from "@/store/umaStatusSlice";
import { useTranslation } from "react-i18next";

export default function Stats() {
  const dispatch = useDispatch();
  const umaStatus = useAppSelector((state: RootState) => state.umaStatus);
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStatusChange = (field: keyof typeof umaStatus, value: any) => {
    dispatch(updateUmaStatus({ [field]: value }));
  };

  return (
    <div className="stats-container">
      <ToggleBox title={t("stats.title", "스테이터스")}>
        <div className="d-flex gap-3">
          <InputBox
            className="stats-input"
            label={t("stats.speed", "스피드")}
            width={100}
            value={umaStatus.speed.toString()}
            onChange={(e) =>
              handleStatusChange("speed", Number(e.target.value))
            }
          />
          <InputBox
            className="stats-input"
            label={t("stats.stamina", "스태미너")}
            width={100}
            value={umaStatus.stamina.toString()}
            onChange={(e) =>
              handleStatusChange("stamina", Number(e.target.value))
            }
          />
          <InputBox
            className="stats-input"
            label={t("stats.power", "파워")}
            width={100}
            value={umaStatus.power.toString()}
            onChange={(e) =>
              handleStatusChange("power", Number(e.target.value))
            }
          />
          <InputBox
            className="stats-input"
            label={t("stats.guts", "근성")}
            width={100}
            value={umaStatus.guts.toString()}
            onChange={(e) => handleStatusChange("guts", Number(e.target.value))}
          />
          <InputBox
            className="stats-input"
            label={t("stats.intelligence", "지능")}
            width={100}
            value={umaStatus.intelligence.toString()}
            onChange={(e) =>
              handleStatusChange("intelligence", Number(e.target.value))
            }
          />
        </div>
        <div className="d-flex gap-3 mt-2">
          <SelectBox
            label={t("stats.style", "각질")}
            value={umaStatus.style.toString()}
            width="120px"
            options={STYLE_LIST.map((item) => ({
              ...item,
              label: t(`style.${item.value}`, item.label),
            }))}
            onChange={(value) =>
              handleStatusChange("style", Number(value) as Style)
            }
          />
          <SelectBox
            label={t("stats.distanceFit", "거리 적성")}
            value={umaStatus.distanceFit}
            width="120px"
            options={RANK_LIST.map((rank) => ({ value: rank, label: rank }))}
            onChange={(value) =>
              handleStatusChange("distanceFit", value as FitRank)
            }
          />
          <SelectBox
            label={t("stats.surfaceFit", "경기장 적성")}
            value={umaStatus.surfaceFit}
            width="120px"
            options={RANK_LIST.map((rank) => ({ value: rank, label: rank }))}
            onChange={(value) =>
              handleStatusChange("surfaceFit", value as FitRank)
            }
          />
          <SelectBox
            label={t("stats.styleFit", "각질 적성")}
            value={umaStatus.styleFit}
            width="120px"
            options={RANK_LIST.map((rank) => ({ value: rank, label: rank }))}
            onChange={(value) =>
              handleStatusChange("styleFit", value as FitRank)
            }
          />
          <SelectBox
            label={t("stats.condition", "컨디션")}
            value={umaStatus.condition.toString()}
            width="120px"
            options={[
              {
                value: Condition.BEST.toString(),
                label: t(
                  `condition.${Condition.BEST}`,
                  ConditionLabel[Condition.BEST],
                ),
              },
              {
                value: Condition.GOOD.toString(),
                label: t(
                  `condition.${Condition.GOOD}`,
                  ConditionLabel[Condition.GOOD],
                ),
              },
              {
                value: Condition.NORMAL.toString(),
                label: t(
                  `condition.${Condition.NORMAL}`,
                  ConditionLabel[Condition.NORMAL],
                ),
              },
              {
                value: Condition.BAD.toString(),
                label: t(
                  `condition.${Condition.BAD}`,
                  ConditionLabel[Condition.BAD],
                ),
              },
              {
                value: Condition.WORST.toString(),
                label: t(
                  `condition.${Condition.WORST}`,
                  ConditionLabel[Condition.WORST],
                ),
              },
            ]}
            onChange={(value) =>
              handleStatusChange("condition", Number(value) as Condition)
            }
          />
        </div>
      </ToggleBox>
    </div>
  );
}
