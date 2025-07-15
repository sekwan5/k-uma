import ToggleBox from "@/components/common/ToggleBox/index";
import SelectableTag from "@/components/race/SelectableTag";
import { SkillData } from "./hooks";

interface SkillCategoryProps {
  title: string;
  skills: SkillData[];
  selectedIds: string[];
  onSkillSelect: (ids: string[]) => void;
  groupSkillsByRarity: (skills: SkillData[]) => Record<string, SkillData[]>;
}

export default function SkillCategory({
  title,
  skills,
  selectedIds,
  onSkillSelect,
  groupSkillsByRarity,
}: SkillCategoryProps) {
  if (skills.length === 0) return null;

  return (
    <ToggleBox defaultCollapsed={true} title={title}>
      <div className="mt-2">
        {Object.entries(groupSkillsByRarity(skills)).map(
          ([rarity, skillsInRarity]) =>
            skillsInRarity.length > 0 && (
              <div key={rarity} className="mb-2">
                <h6>
                  {rarity === "inherit"
                    ? "계승"
                    : rarity === "scenario"
                      ? "시나리오"
                      : rarity === "rare"
                        ? "레어"
                        : rarity === "special"
                          ? "특수"
                          : rarity === "minus"
                            ? "디버프"
                            : "일반"}
                </h6>
                <SelectableTag
                  items={skillsInRarity.map((skill) => ({
                    id: skill.id,
                    label: skill.label,
                  }))}
                  selectedIds={selectedIds}
                  onChange={onSkillSelect}
                />
              </div>
            ),
        )}
      </div>
    </ToggleBox>
  );
}
