import "./CourseChart.scss";
import { ICourseSection, IPhaseSection, IPositionSection } from "./hooks";

interface SlopeSection {
  gradient: number;
  distance: number;
  width: number;
}

interface CourseChartProps {
  courseSections: ICourseSection[];
  slopeSections: SlopeSection[];
  totalDistance: number;
  courseName: string;
  surface: string;
  direction: string;
  phaseSection: IPhaseSection[];
  positionSection: IPositionSection[];
}

export default function CourseChart(props: CourseChartProps) {
  const {
    courseSections,
    phaseSection,
    totalDistance,
    courseName,
    surface,
    direction,
    positionSection,
  } = props;
  return (
    <div className="course-chart">
      {/* 코스 섹션 */}
      <div className="course">
        {courseSections.map((section, index) => (
          <div
            className={`course-section ${section.type} ${
              section.type === "corner" && index % 2 === 1 ? "corner-even" : ""
            }`}
            key={index}
            style={{ width: `${section.width}%` }}
          >
            <div className="label">{section.label}</div>
            {index > 0 && (
              <div className="distance-marker">
                <div className="distance-label">{section.distance}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 구간 표시 (초반/중반/종반) */}
      <div className="phase">
        <div
          className="phase-opening"
          style={{ width: `${phaseSection[0].width}%` }}
        >
          <div className="label">초반</div>
        </div>
        <div
          className="phase-middle"
          style={{ width: `${phaseSection[1].width}%` }}
        >
          <div className="label">중반</div>
          <div className="distance-marker">
            <div className="distance-label">
              {phaseSection[1].start.toLocaleString()}
            </div>
          </div>
        </div>
        <div
          className="phase-final"
          style={{ width: `${phaseSection[2].width}%` }}
        >
          <div className="label">종반</div>
          <div className="distance-marker">
            <div className="distance-label">
              {phaseSection[2].start.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* 포지션 구간 */}
      <div className="phase">
        <div
          className="phase-opening"
          style={{ width: `${positionSection[0].width}%` }}
        >
          <div className="label">프지션 킵</div>
        </div>
        <div
          className="phase-middle"
          style={{ width: `${positionSection[1].width}%` }}
        >
          <div className="label"></div>
          <div className="distance-marker">
            <div className="distance-label">
              {positionSection[1].start.toLocaleString()}
            </div>
          </div>
        </div>
        <div
          className="phase-final"
          style={{ width: `${positionSection[2].width}%` }}
        >
          <div className="label">라스트 스퍼트</div>
          <div className="distance-marker">
            <div className="distance-label">
              {positionSection[2].start.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* X축 */}
      <div className="axis-x">
        <div className="bars">
          {[...Array(13)].map((_, i) => (
            <div className="bar" key={i} />
          ))}
        </div>
        <div className="labels">
          {[0, 533, 1067, 1600, 2133, 2667, 3200].map((distance) => (
            <div className="label" key={distance}>
              <div>{distance.toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="start">START</div>
        <div className="goal">GOAL</div>
        <div className="title">
          {courseName} {totalDistance}m ({surface}) {direction}
        </div>
      </div>
    </div>
  );
}
