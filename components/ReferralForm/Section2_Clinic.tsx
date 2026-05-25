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

function todayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Section2_Clinic({ register, errors }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>2. 紹介元医療機関情報</h2>

      <div className={styles.field}>
        <label className={`${styles.label} ${styles.required}`} htmlFor="clinicName">
          医療機関名
        </label>
        <input
          id="clinicName"
          type="text"
          className={styles.input}
          {...register("clinicName")}
          placeholder="例：○○病院 内科"
        />
        {errors.clinicName && (
          <p className={styles.error}>{errors.clinicName.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={`${styles.label} ${styles.required}`} htmlFor="doctorName">
          担当医師名
        </label>
        <input
          id="doctorName"
          type="text"
          className={styles.input}
          {...register("doctorName")}
          placeholder="例：田中 一郎"
        />
        {errors.doctorName && (
          <p className={styles.error}>{errors.doctorName.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="department">
          診療科
        </label>
        <input
          id="department"
          type="text"
          className={styles.input}
          {...register("department")}
          placeholder="例：内科、循環器科"
        />
      </div>

      <div className={styles.twoCol}>
        <div className={styles.field}>
          <label className={`${styles.label} ${styles.required}`} htmlFor="phone">
            電話番号
          </label>
          <input
            id="phone"
            type="tel"
            className={styles.input}
            {...register("phone")}
            placeholder="例：03-1234-5678"
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={`${styles.label} ${styles.required}`} htmlFor="email">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            {...register("email")}
            placeholder="例：doctor@hospital.jp"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="referralDate">
          作成日
        </label>
        <input
          id="referralDate"
          type="date"
          className={styles.input}
          style={{ width: "200px" }}
          defaultValue={todayString()}
          {...register("referralDate")}
        />
      </div>
    </section>
  );
}
