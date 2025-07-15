"use client";
import menus from "@/modules/menus.json";
import { setSidebar } from "@/store/appSlice";
import { useAppDispatch, useSelectorTyped } from "@/store/hooks";
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faStarAndCrescent,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

// 메뉴 ID에 따른 아이콘 매핑
const menuIcons = {
  home: faHome,
  uma: faUsers,
  race: faStarAndCrescent,
  training: faTrophy,
};

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const { sidebar } = useSelectorTyped((state) => ({
    sidebar: state.app.sidebar,
  }));

  const closeSidebar = () => {
    dispatch(setSidebar(false));
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // 메뉴 ID에 따라 아이콘 가져오기
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getIconForMenu = (menuId: string) => {
    return menuIcons[menuId as keyof typeof menuIcons] || faStarAndCrescent; // 기본 아이콘
  };

  return (
    <>
      <aside
        className={`sidebar ${sidebar ? "show" : ""} ${collapsed ? "collapsed" : ""}`}
      >
        <div className="sidebar-header">
          <i className="ico-close hide-collapsed" onClick={closeSidebar} />
        </div>
        <div className="nav-wrapper">
          <ul className="nav flex-column">
            {menus
              .filter((e) => e.sidebar === true)
              .map((menu) => {
                const isActive =
                  pathname.split("/")[1] === menu.to.split("/")[1];
                return (
                  <Fragment key={`sidebar-menu-${menu.id}`}>
                    <li className="nav-item">
                      <Link
                        to={menu.to}
                        className={`nav-link ${isActive ? "active" : ""}`}
                        onClick={closeSidebar}
                      >
                        <span className="icon-container">
                          <FontAwesomeIcon
                            icon={getIconForMenu(menu.id)}
                            size="lg"
                          />
                        </span>
                        {!collapsed && (
                          <span className="menu-title ">
                            {t(`menu.${menu.id}`, menu.title)}
                          </span>
                        )}
                      </Link>
                      {!collapsed &&
                        menu.submenus &&
                        menu.submenus.length > 0 && (
                          <ul className="nav flex-column submenu ">
                            {menu.submenus.map((submenu) => (
                              <li
                                className="nav-item"
                                key={`sidebar-submenu-${submenu.id}`}
                              >
                                <Link
                                  to={submenu.to}
                                  className={`nav-link ${pathname === submenu.to ? "active" : ""}`}
                                  onClick={closeSidebar}
                                >
                                  {t(`submenu.${submenu.id}`, submenu.title)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  </Fragment>
                );
              })}
          </ul>
        </div>
        <div
          className={`collapse-button ${collapsed ? "collapsed" : ""}`}
          onClick={toggleCollapse}
        >
          <div className="collapse-icon"></div>
        </div>
      </aside>
      <div
        className={`sidebar-backdrop fade ${sidebar ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>
    </>
  );
}
