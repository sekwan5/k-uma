import CourseChart from "./CourseChart";
import "./CourseChart.scss";
import { convertToChartData } from "./hooks";

export const CourseView = () => {
  // const trackData = courseData["10101"]; // 예시로 하나의 코스 데이터 사용
  const trackData = {
    raceTrackId: 10006,
    name: "芝3400m",
    distance: 3400,
    distanceType: 4,
    surface: 1,
    turn: 2,
    courseSetStatus: [],
    laneMax: 15000,
    finishTimeMin: 209.9,
    finishTimeMax: 214,
    corners: [
      {
        start: 292,
        length: 275,
      },
      {
        start: 567,
        length: 275,
      },
      {
        start: 1325,
        length: 250,
      },
      {
        start: 1575,
        length: 325,
      },
      {
        start: 2350,
        length: 275,
      },
      {
        start: 2625,
        length: 250,
      },
    ],
    straights: [
      {
        start: 0,
        end: 292,
      },
      {
        start: 842,
        end: 1325,
      },
      {
        start: 1900,
        end: 2350,
      },
      {
        start: 2875,
        end: 3400,
      },
    ],
    slopes: [
      {
        start: 67,
        length: 75,
        slope: 20000,
      },
      {
        start: 192,
        length: 250,
        slope: -15000,
      },
      {
        start: 892,
        length: 150,
        slope: 15000,
      },
      {
        start: 2125,
        length: 75,
        slope: 20000,
      },
      {
        start: 2250,
        length: 250,
        slope: -15000,
      },
      {
        start: 2950,
        length: 150,
        slope: 15000,
      },
    ],
  };
  const chartData = convertToChartData(trackData);

  return <CourseChart {...chartData} />;
};
