import SelectBox from "@/components/common/SelectBox/index";
import ToggleBox from "@/components/common/ToggleBox/index";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUmaStatus } from "@/store/umaStatusSlice";
import { RootState } from "@/store";
import courseData from "@/modules/data/course.json";

// 코너 정보 인터페이스
interface Corner {
  start: number;
  length: number;
}

// 직선 구간 인터페이스
interface Straight {
  start: number;
  end: number;
}

// 경사 정보 인터페이스
interface Slope {
  start: number;
  length: number;
  slope: number;
}

// 코스 데이터 인터페이스
interface Course {
  raceTrackId: number;
  name: string;
  distance: number;
  distanceType: number;
  surface: number;
  turn: number;
  courseSetStatus: number[];
  laneMax: number;
  finishTimeMin: number;
  finishTimeMax: number;
  corners: Corner[];
  straights: Straight[];
  slopes: Slope[];
}

// 경기장 데이터 인터페이스
interface TrackData {
  name: string;
  courses: { [key: string]: Course };
}

// 전체 코스 데이터 인터페이스
interface CourseDataType {
  [key: string]: TrackData;
}

export default function Track() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Redux 상태에서 경기장 관련 정보 가져오기
  const { trackId, courseId, trackCondition } = useSelector(
    (state: RootState) => state.umaStatus,
  );

  const [courseList, setCourseList] = useState<{ [key: string]: Course }>({});

  // 경기장 변경 시 해당 경기장의 코스 목록 업데이트
  useEffect(() => {
    if (trackId && (courseData as CourseDataType)[trackId]) {
      setCourseList((courseData as CourseDataType)[trackId].courses);
    } else {
      setCourseList({});
    }
  }, [trackId]);

  // 코스 이름 접미사 생성 함수
  const courseNameSuffix = (name: string) => {
    if (name.endsWith("外)")) {
      return `(O)`;
    } else if (name.endsWith("内)")) {
      return `(I)`;
    } else {
      return "";
    }
  };

  return (
    <div className="track-container">
      <ToggleBox title="경기장">
        <div className="d-flex gap-3">
          <SelectBox
            label="경기장"
            value={trackId}
            width="120px"
            options={Object.keys(courseData).map((id) => ({
              value: id,
              label: t(`course.${id}`, (courseData as CourseDataType)[id].name),
            }))}
            onChange={(value) =>
              dispatch(updateUmaStatus({ trackId: String(value) }))
            }
          />
          <SelectBox
            label="코스"
            value={courseId}
            width="170px"
            options={Object.entries(courseList).map(([id, course]) => ({
              value: id,
              label: `${t(`surface.${course.surface}`, "")}${course.distance}m${courseNameSuffix(course.name)}`,
            }))}
            onChange={(value) =>
              dispatch(updateUmaStatus({ courseId: String(value) }))
            }
          />
          <SelectBox
            label="경기장 상태"
            value={trackCondition}
            width="120px"
            options={[
              { value: "1", label: t("trackCondition.1", "양호") },
              { value: "2", label: t("trackCondition.2", "다습") },
              { value: "3", label: t("trackCondition.3", "포화") },
              { value: "4", label: t("trackCondition.4", "불량") },
            ]}
            onChange={(value) =>
              dispatch(updateUmaStatus({ trackCondition: String(value) }))
            }
          />
        </div>
      </ToggleBox>
    </div>
  );
}
