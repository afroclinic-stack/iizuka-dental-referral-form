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

function calcAge(birthdate: string): string {
  if (!birthdate) return "";
  const birth = new Date(birthdate);
  if (isNaN(birth.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  if (age < 0) return "";
  return `${age}歳`;
}

export default function Section1_Patient({ control, register, errors }: Props) {
  const birthdate = useWatch({ control, name: "birthdate" });
  const age = calcAge(birthdate ?? "");

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>1. 患者基本情報</h2>
      <div className={styles.sectionBody}>

      <div className={styles.field}>
        <label className={`${styles.label} ${styles.required}`} htmlFor="patientNameKanji">
          患者氏名（漢字）
        </label>
        <input
          id="patientNameKanji"
          type="text"
          className={styles.input}
          {...register("patientNameKanji")}
          placeholder="例：山田 太郎"
        />
        {errors.patientNameKanji && (
          <p className={styles.error}>{errors.patientNameKanji.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={`${styles.label} ${styles.required}`} htmlFor="patientNameKana">
          患者氏名（ふりがな）
        </label>
        <input
          id="patientNameKana"
          type="text"
          className={styles.input}
          {...register("patientNameKana")}
          placeholder="例：やまだ たろう"
        />
        {errors.patientNameKana && (
          <p className={styles.error}>{errors.patientNameKana.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={`${styles.label} ${styles.required}`} htmlFor="birthdate">
          生年月日
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            id="birthdate"
            type="date"
            className={styles.input}
            style={{ width: "200px" }}
            {...register("birthdate")}
          />
          {age && <span className={styles.ageDisplay}>（{age}）</span>}
        </div>
        {errors.birthdate && (
          <p className={styles.error}>{errors.birthdate.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <span className={`${styles.label} ${styles.required}`}>性別</span>
        <div className={styles.radioGroup}>
          {(["男性", "女性", "その他"] as const).map((g) => (
            <label key={g} className={styles.radioLabel}>
              <input
                type="radio"
                value={g}
                {...register("gender")}
              />
              {g}
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className={styles.error}>{errors.gender.message}</p>
        )}
      </div>
      </div>
    </section>
  );
}
