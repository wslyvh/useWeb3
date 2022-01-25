import { ReactNode, useRef, useState, useEffect } from "react";
import styles from "./main.module.scss";
import { Sitenav } from "components/sitenav";
import { Link } from "components/link";
import { Newsletter } from "components/newsletter";
import Fab from "components/fab";
import MobileNav from "components/mobileNav";
import { Donate } from "components/donate";

type Props = {
  title?: string;
  className?: string;
  children: ReactNode;
};

export function Main(props: Props) {
  const [isMobileNavOpen, setMobileNav] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleCLick = () => {
    setMobileNav((state) => !state);
  };
  const title = props.title ?? "useWeb3";

  let className = `${styles.container}`;
  if (props.className) className += ` ${props.className} ${currentTheme}`;

  return (
    <div className={className}>
      <aside className={styles.sitenav}>
        <Sitenav />
        <button className={styles.darkModeButton} onClick={() => setCurrentTheme(currentTheme === "light" ? "dark" : "light")}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      </aside>
      <aside className={styles.mobileSitenav}>
        <MobileNav isOpen={isMobileNavOpen} />
      </aside>
      <main className={styles.content}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h1>{title}</h1>
          </header>

          {/* <Donate /> */}

          {props.children}

          <Newsletter className={styles.newsletter} />

          <footer className={styles.footer}>
            <p>
              Follow @ <Link href="https://twitter.com/useWeb3">useWeb3</Link>. Contribute on{" "}
              <Link href="https://github.com/wslyvh/useWeb3">Github</Link>.
            </p>
            <p>
              Created by <Link href="https://twitter.com/wslyvh">@wslyvh</Link>.
            </p>
          </footer>
          <Fab onClick={handleCLick} />
        </div>
      </main>
    </div>
  );
}
