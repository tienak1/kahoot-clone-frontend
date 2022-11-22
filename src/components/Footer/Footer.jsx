import styles from "./Footer.module.css";

function Footer() {
  const isLanguageEnglish = true;
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-row"]}>
          <div className={styles["footer-column"]}>
            <h4>{isLanguageEnglish ? "About" : "O nas"}</h4>
            <ul>
              <li>
                <a href="/">{isLanguageEnglish ? "Company" : "Firma"}</a>
              </li>
              <li>
                <a href="/">{isLanguageEnglish ? "Service" : "Usługi"}</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">{isLanguageEnglish ? "Contact" : "Kontakt"}</a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h4>{isLanguageEnglish ? "Application" : "Aplikacja"}</h4>
            <ul>
              <li>
                <a href="/">{isLanguageEnglish ? "At home" : "W domu"}</a>
              </li>
              <li>
                <a href="/">{isLanguageEnglish ? "At school" : "W szkole"}</a>
              </li>
              <li>
                <a href="/">{isLanguageEnglish ? "At work" : "W pracy"}</a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h4>{isLanguageEnglish ? "Terms and conditions" : "Regulamin"}</h4>
            <ul>
              <li>
                <a href="/">
                  {isLanguageEnglish ? "Terms and conditions" : "Regulamin"}
                </a>
              </li>
              <li>
                <a href="/">
                  {isLanguageEnglish
                    ? "Privacy Policy"
                    : "Polityka prywatności"}
                </a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h4>{isLanguageEnglish ? "Follow us" : "Śledź nas"}</h4>
            <div className={styles["footer-social-links"]}>
              <a href="/">FacebookIcon</a>
              <a href="/">TwitterIcon</a>
              <a href="/">InstagramIcon</a>
              <a href="/">LinkedInIcon</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
