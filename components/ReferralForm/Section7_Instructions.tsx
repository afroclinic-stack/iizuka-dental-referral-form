"use client";

import { Control, FieldErrors, UseFormRegister, UseFormWatch, useWatch } from "react-hook-form";
import { ReferralFormData } from "@/lib/schema";
import styles from "./ReferralForm.module.css";

interface Props {
  control: Control<ReferralFormData>;
  register: UseFormRegister<ReferralFormData>;
  watch: UseFormWatch<ReferralFormData>;
  errors: FieldErrors<ReferralFormData>;
}

export default function Section7_Instructions({ control, register }: Props) {
  const drugHoliday = useWatch({ control, name: "dentalInstructions.drugHoliday" });
  const showDrugDetail = drugHoliday === "要";

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>7. 歯科治療への依頼</h2>
      <div className={styles.sectionBody}>

      {/* 観血処置の可否 */}
      <div className={styles.field}>
        <span className={styles.label}>観血処置の可否</span>
        <div className={styles.radioGroup}>
          {(["可", "条件付き可", "要相談"] as const).map((v) => (
            <label key={v} className={styles.radioLabel}>
              <input
                type="radio"
                value={v}
                {...register("dentalInstructions.invasive")}
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      {/* 局所麻酔（アドレナリン含有）の可否 */}
      <div className={styles.field}>
        <span className={styles.label}>局所麻酔（アドレナリン含有）の可否</span>
        <div className={styles.radioGroup}>
          {(["可", "不可", "要相談"] as const).map((v) => (
            <label key={v} className={styles.radioLabel}>
              <input
                type="radio"
                value={v}
                {...register("dentalInstructions.localAnesthesia")}
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      {/* 休薬の要否 */}
      <div className={styles.field}>
        <span className={styles.label}>休薬の要否</span>
        <div className={styles.radioGroup}>
          {(["不要", "要", "主治医確認済み"] as const).map((v) => (
            <label key={v} className={styles.radioLabel}>
              <input
                type="radio"
                value={v}
                {...register("dentalInstructions.drugHoliday")}
              />
              {v}
            </label>
          ))}
        </div>
        {showDrugDetail && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>詳細：</span>
              <input
                type="text"
                className={styles.inlineInput}
                style={{ width: "360px" }}
                {...register("dentalInstructions.drugHolidayDetail")}
                placeholder="例：ワーファリン 術前5日間休薬"
              />
            </div>
          </div>
        )}
      </div>

      {/* その他特記事項 */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="specialNotes">
          その他特記事項
        </label>
        <textarea
          id="specialNotes"
          className={styles.textarea}
          rows={4}
          {...register("dentalInstructions.specialNotes")}
          placeholder="その他、歯科治療にあたって特記すべき事項を記載してください"
        />
      </div>
      </div>
    </section>
  );
}
