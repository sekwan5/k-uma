import React from "react";
import { Character } from "../succession";
import CoImage from "@/components/common/CoImages";

interface CharacterItemProps {
  character: Character;
  isSelectable: boolean;
  onClick: (character: Character) => void;
}

const CharacterItem = React.memo(
  ({ character, isSelectable, onClick }: CharacterItemProps) => {
    return (
      <div
        className={`character-item ${isSelectable ? "selectable" : ""}`}
        onClick={() => onClick(character)}
      >
        <div className="character-icon">
          <CoImage src={character.imageUrl} alt={character.name} lazy={false} />
        </div>
        <div className="level-badge">{character.relationScore}</div>
      </div>
    );
  },
);

CharacterItem.displayName = "CharacterItem";

export default CharacterItem;
