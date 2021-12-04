import { ReactNode, useRef, useState } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleCLick = () => {
    setMobileNav((state) => !state);
  };
  const title = props.title ?? "useWeb3";

  let className = `${styles.container}`;
  if (props.className) className += ` ${props.className}`;

  return (
    <div className={className}>
      <aside className={styles.sitenav}>
        <Sitenav />
      </aside>
      <aside className={styles.mobileSitenav}>
        <MobileNav isOpen={isMobileNavOpen} />
      </aside>
      <main className={styles.content}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <h1>{title}</h1>
          </header>

          <Donate />

          {props.children}

          <Newsletter className={styles.newsletter} />

          <footer className={styles.footer}>
            <p>
              Follow @ <Link href="https://twitter.com/useWeb3">useWeb3</Link>.
              Contribute on{" "}
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
