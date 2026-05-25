"use client";

import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { ReferralFormData } from "@/lib/schema";
import styles from "./ReferralForm.module.css";

interface Props {
  control: Control<ReferralFormData>;
  register: UseFormRegister<ReferralFormData>;
  watch: UseFormWatch<ReferralFormData>;
  errors: FieldErrors<ReferralFormData>;
}

export default function Section6_LabValues({ register }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>6. 直近の検査値</h2>
      <div className={styles.sectionBody}>

      {/* PT-INR */}
      <div className={styles.field}>
        <span className={styles.label}>PT-INR</span>
        <div className={styles.conditionalRow}>
          <span className={styles.conditionalLabel}>PT-INR値：</span>
          <input
            type="number"
            step="0.1"
            min="0"
            max="20"
            className={styles.inlineInputShort}
            {...register("labValues.ptinr")}
            placeholder="例：1.5"
          />
          <span className={styles.conditionalLabel} style={{ marginLeft: "12px" }}>採取日：</span>
          <input
            type="date"
            className={styles.inlineInput}
            {...register("labValues.ptinrDate")}
          />
        </div>
      </div>

      {/* HbA1c */}
      <div className={styles.field}>
        <span className={styles.label}>HbA1c</span>
        <div className={styles.conditionalRow}>
          <span className={styles.conditionalLabel}>HbA1c値：</span>
          <input
            type="number"
            step="0.1"
            min="0"
            max="30"
            className={styles.inlineInputShort}
            {...register("labValues.hba1c")}
            placeholder="例：7.2"
          />
          <span style={{ fontSize: "9pt" }}>%</span>
          <span className={styles.conditionalLabel} style={{ marginLeft: "12px" }}>採取日：</span>
          <input
            type="date"
            className={styles.inlineInput}
            {...register("labValues.hba1cDate")}
          />
        </div>
      </div>

      {/* 血圧 */}
      <div className={styles.field}>
        <span className={styles.label}>血圧</span>
        <div className={styles.conditionalRow}>
          <span className={styles.conditionalLabel}>収縮期：</span>
          <input
            type="number"
            min="0"
            max="300"
            className={styles.inlineInputShort}
            {...register("labValues.bpSystolic")}
            placeholder="例：130"
          />
          <span style={{ fontSize: "9pt" }}>mmHg</span>
          <span className={styles.conditionalLabel} style={{ marginLeft: "12px" }}>拡張期：</span>
          <input
            type="number"
            min="0"
            max="200"
            className={styles.inlineInputShort}
            {...register("labValues.bpDiastolic")}
            placeholder="例：80"
          />
          <span style={{ fontSize: "9pt" }}>mmHg</span>
        </div>
      </div>

      {/* その他検査値 */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="otherLab">
          その他検査値
        </label>
        <textarea
          id="otherLab"
          className={styles.textarea}
          rows={3}
          {...register("labValues.otherLab")}
          placeholder="その他参考となる検査値があれば記載してください（例：血小板数、肝機能値など）"
        />
      </div>
      </div>
    </section>
  );
}
