// import HeroDtlTab from "@/components/hero/heroDtl/HeroDtlTab";
import CoImage from "@/components/common/CoImages";
import { CourseView } from "@/components/course";

export default function HomeContent() {
  return (
    <>
      <div className="container home">
        <div className="adfit-wrap d-flex justify-content-center">
          <script
            type="text/javascript"
            src="https://t1.daumcdn.net/kas/static/ba.min.js"
            async
          ></script>
        </div>
        <div className="update-info">
          {/* <HeroDtlTab tabs={["UPDATE"]} activeTab={"UPDATE"} /> */}
          <div className="update-content">
            <CourseView />
          </div>
        </div>

        <div className="notice-wrap">
          {/* <HeroDtlTab tabs={["NOTICE"]} activeTab={"NOTICE"} /> */}
          <div className="notice d-flex justify-content-center align-items-center ">
            <div>
              <p>Epic7GG(에픽지지) Discord 서버가 개설되었습니다. </p>
              <p>
                버그또는 오타제보, 새로은 기능이나 기존 기능에 대한 개선사항을
                요청해주세요.
              </p>
            </div>
            <a
              href="https://discord.gg/CNZE82hpF8"
              target="_blank"
              rel="noopener noreferrer"
              className="discord-link"
            >
              <div className="discord-btn">
                <CoImage src="/images/discord.svg" alt="discord" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
