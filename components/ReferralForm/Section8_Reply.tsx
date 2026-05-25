"use client";

import styles from "./ReferralForm.module.css";

const LINE_COUNT = 10;

export default function Section8_Reply() {
  return (
    <section className={`${styles.section} ${styles.printOnly}`}>
      <h2 className={styles.sectionTitle}>8. 歯科からの処置内容・経過報告欄</h2>
      <div className={styles.sectionBody}>

      <p className={styles.replyTitle}>返書</p>

      <div className={styles.writingLines}>
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <div key={i} className={styles.writingLine} />
        ))}
      </div>

      <div className={styles.replyFooter}>
        <div className={styles.replyFooterField}>
          <span>歯科担当医師名：</span>
          <span className={styles.replyUnderline} />
        </div>
        <div className={styles.replyFooterField}>
          <span>日付：</span>
          <span className={styles.replyUnderline} style={{ minWidth: "120px" }} />
        </div>
      </div>
      </div>
    </section>
  );
}
