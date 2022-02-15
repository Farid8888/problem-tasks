import React from "react";
import {
  FaUsers,
  FaCheck,
  FaRegFileAlt,
  FaBook,
  FaDesktop,
  FaWhmcs,
} from "react-icons/fa";
import { ImOffice } from "react-icons/im";
import classes from "../styles/Layout.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Layout(props) {
  const router = useRouter();
  return (
    <div className={classes.layout}>
      <nav>
        <header>
          <div className={classes.control}>
            <div>
              <FaCheck />
            </div>
            <div
              className={router.pathname === "/knowledge" ? classes.active : ""}
            >
              <Link href="/knowledge">
                <a>
                  <FaBook />
                  База знаний
                </a>
              </Link>
            </div>
            <div className={router.pathname === "/" ? classes.active : ""}>
              <Link href="/">
                <a>
                  <FaRegFileAlt />
                  Заявки
                </a>
              </Link>
            </div>
            <div
              className={router.pathname === "/employees" ? classes.active : ""}
            >
              <Link href="/employees">
                <a>
                  <FaUsers />
                  Сотрудники
                </a>
              </Link>
            </div>
            <div
              className={router.pathname === "/clients" ? classes.active : ""}
            >
              <Link href="/clients">
                <a>
                  <ImOffice />
                  Клиенты
                </a>
              </Link>
            </div>
            <div
              className={router.pathname === "/assets" ? classes.active : ""}
            >
              <Link href="/assets">
                <a>
                  <FaDesktop />
                  Активы
                </a>
              </Link>
            </div>
            <div
              className={router.pathname === "/settings" ? classes.active : ""}
            >
              <Link href="/settings">
                <a>
                  <FaWhmcs />
                  Настройки
                </a>
              </Link>
            </div>
          </div>
          <div className={classes.searchForm}>
            <form>
              <input
                type="text"
                placeholder="Search.."
                name="search"
                className={classes.inputfield}
              />
            </form>
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </div>
        </header>
        <main>{props.children}</main>
      </nav>
    </div>
  );
}
