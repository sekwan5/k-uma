import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export interface PageTitleProps extends PropsWithChildren {
  className?: string;
  border?: boolean;
  depth?: string;
}
export function PageTitle({ children, depth }: PageTitleProps) {
  return (
    <div className="page-title">
      <div className="text">
        <div className="page-path">
          <span>
            <Link to="/">Home / </Link>
            {depth && <Link to="#"> {depth} </Link>}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
