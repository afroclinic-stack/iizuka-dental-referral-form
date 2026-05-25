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

const PURPOSE_OPTIONS = [
  { value: "歯科治療前確認", label: "歯科治療前確認" },
  { value: "抜歯許可確認", label: "抜歯許可確認" },
  { value: "投薬情報共有", label: "投薬情報共有" },
  { value: "その他", label: "その他" },
] as const;

export default function Section3_Reason({ control, register, errors }: Props) {
  const selectedPurpose = useWatch({ control, name: "referralPurpose" }) ?? [];
  const showOther = Array.isArray(selectedPurpose) && selectedPurpose.includes("その他");

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>3. 紹介理由</h2>
      <div className={styles.sectionBody}>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="mainDiagnosis">
          主病名
        </label>
        <input
          id="mainDiagnosis"
          type="text"
          className={styles.input}
          {...register("mainDiagnosis")}
          placeholder="例：2型糖尿病、高血圧症"
        />
      </div>

      <div className={styles.field}>
        <span className={`${styles.label} ${styles.required}`}>紹介目的（複数選択可）</span>
        <div className={styles.checkboxGroup}>
          {PURPOSE_OPTIONS.map(({ value, label }) => (
            <label key={value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={value}
                {...register("referralPurpose")}
              />
              {label}
            </label>
          ))}
        </div>
        {showOther && (
          <div className={styles.conditionalBlock} style={{ marginTop: "8px" }}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>その他内容：</span>
              <input
                type="text"
                className={styles.inlineInput}
                style={{ width: "300px" }}
                {...register("referralPurposeOther")}
                placeholder="内容を入力してください"
              />
            </div>
          </div>
        )}
        {errors.referralPurpose && (
          <p className={styles.error}>{errors.referralPurpose.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <span className={`${styles.label} ${styles.required}`}>緊急度</span>
        <div className={styles.radioGroup}>
          {(["通常", "準緊急", "緊急"] as const).map((u) => (
            <label key={u} className={styles.radioLabel}>
              <input
                type="radio"
                value={u}
                {...register("urgency")}
              />
              {u}
            </label>
          ))}
        </div>
        {errors.urgency && (
          <p className={styles.error}>{errors.urgency.message}</p>
        )}
      </div>
      </div>
    </section>
  );
}
