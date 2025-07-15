// export function localizeSkill(skill, wrapper, newSkillNames) {
// 	const jaName = skill.name;
// 	const localName = this.$t(`skill.${jaName}`);
// 	if (localName.startsWith("skill.")) {
// 		newSkillNames[jaName] = "";
// 	}
// 	skill.name = localName && !localName.startsWith("skill.") ? localName : jaName;

// 	const tooltipKey = `tooltip.${skill.id}`;
// 	if (this.$te(tooltipKey)) {
// 		if (wrapper) {
// 			wrapper.tooltip = this.$t(tooltipKey);
// 		} else {
// 			skill.tooltip = this.$t(tooltipKey);
// 		}
// 	}

// 	return skill;
// },
