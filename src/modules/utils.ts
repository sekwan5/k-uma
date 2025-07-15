type CategoryType = "type" | "job" | "grade";

export const getIconPosition = (category: CategoryType, value: string) => {
  const positions = {
    type: {
      t04: "0",
      t01: "25%",
      t03: "50%",
      t02: "75%",
      t05: "100%",
    },
    job: {
      j06: "calc(0% + 2px)",
      j05: "20%",
      j01: "40%",
      j03: "60%",
      j02: "80%",
      j04: "100%",
    },
    grade: {
      g01: "0",
      g02: "25%",
      g03: "50%",
      g04: "75%",
      g05: "100%",
    },
  } as const;

  return (
    positions[category][value as keyof (typeof positions)[CategoryType]] || "0%"
  );
};

export const typeIcon =
  "https://static.smilegatemegaport.com/live/epic7stats/assets/images/common/icon_attr.png";
export const jobIcon =
  "https://static.smilegatemegaport.com/live/epic7stats/assets/images/common/icon_job.png";
export const starIcon =
  "https://static.smilegatemegaport.com/live/epic7stats/assets/images/common/icon_grade.png";
