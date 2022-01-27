import { ReactNode, useRef, useState, useEffect } from "react";

import { Link } from "components/link";
import { Donate } from "components/donate";
import { Sitenav } from "components/sitenav";
import { Newsletter } from "components/newsletter";

import Fab from "components/fab";
import styles from "./main.module.scss";
import MobileNav from "components/mobileNav";
import useLocalStorage from "../../hooks/useLocalStorage";

type Props = {
  title?: string;
  className?: string;
  children: ReactNode;
};

export function Main(props: Props) {
  const [isMobileNavOpen, setMobileNav] = useState(false);
  const [theme, setTheme] = useLocalStorage("SITE_THEME", "light");
  const [className, setClassName] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleCLick = () => {
    setMobileNav((state) => !state);
  };
  const title = props.title ?? "useWeb3";

  useEffect(() => {
    if (props.className) setClassName(`${styles.container} ${props.className} ${theme}`);
  }, [theme]);

  return (
    <div className={className}>
      <aside className={styles.sitenav}>
        <Sitenav />
        {/* <button className={styles.darkModeButton} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button> */}

        <select name="theme_switcher" className={styles.themeSwitcher} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="pantone">Pantone</option>
          <option value="blueberry_dark">Blueberry Dark</option>
        </select>
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
