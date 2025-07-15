import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function useRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("p");
    if (redirectPath) {
      // 리다이렉트 경로가 있으면 해당 경로로 이동
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);
}
