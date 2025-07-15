import Skills from "./Skills";
import Stats from "./Stats";
import Track from "./Track";
export default function SimulateContent() {
  return (
    <div className="d-flex flex-column gap-2">
      <Stats />
      <Track />
      <Skills />
    </div>
  );
}
