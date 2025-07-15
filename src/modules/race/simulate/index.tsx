import { PageTitle } from "@/components/common/PageTitle";
import SimulateContent from "@/container/race/simulate";

export default function RaceSimulate() {
  return (
    <>
      <PageTitle depth="race">
        <h2>레이스 시뮬레이터</h2>
      </PageTitle>
      <div className="container race">
        <SimulateContent />
      </div>
    </>
  );
}
