import CoImage from "../common/CoImages";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/appSlice";
import { Link } from "react-router-dom";

export function Header() {
  // const navigate = useNavigate();
  // const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  // const handleClick = (to: string) => {
  //   navigate(to);
  // };

  return (
    <div className="fixArea">
      <div className="top-area d-flex">
        <div className="ico-menu-wrap">
          <div onClick={() => dispatch(toggleSidebar())}>
            <svg
              className="ico ico-menu color-black"
              xmlns="https://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g data-name="menu">
                <path
                  d="M0 0h18"
                  transform="translate(3 7)"
                  style={{
                    stroke: "#101010",
                    strokeLinecap: "round",
                    strokeWidth: "1.5px",
                    fill: "none",
                  }}
                />
                <path
                  data-name="Vector"
                  d="M0 0h18"
                  transform="translate(3 12)"
                  style={{
                    stroke: "#101010",
                    strokeLinecap: "round",
                    strokeWidth: "1.5px",
                    fill: "none",
                  }}
                />
                <path
                  data-name="Vector"
                  d="M0 0h18"
                  transform="translate(3 17)"
                  style={{
                    stroke: "#101010",
                    strokeLinecap: "round",
                    strokeWidth: "1.5px",
                    fill: "none",
                  }}
                />
              </g>
            </svg>
          </div>
        </div>
        <Link to="/" className="logo-wrap wd-100">
          <CoImage
            className="logo"
            src="/images/c2111_s.png" // public 폴더를 기준으로 한 경로
            alt="Example Image"
            width={35} // 원하는 이미지의 너비
            height={35} // 원하는 이미지의 높이
          />
          <span>K-UMA Tools</span>
          <div style={{ display: "none" }}>K-UMA Tools</div>
        </Link>
      </div>
    </div>
  );
}
