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

export default function Section4_Diseases({ control, register, errors }: Props) {
  const diseases = useWatch({ control, name: "diseases" });

  const checked = (key: keyof NonNullable<typeof diseases>): boolean => {
    return !!(diseases && diseases[key]);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>4. 全身疾患</h2>
      <div className={styles.sectionBody}>

      {/* 高血圧 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.hypertension")} />
          高血圧
        </label>
      </div>

      {/* 糖尿病 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.diabetes")} />
          糖尿病
        </label>
        {checked("diabetes") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>HbA1c値：</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="30"
                className={styles.inlineInputShort}
                {...register("diseases.diabetesHba1c")}
                placeholder="例：7.2"
              />
              <span style={{ fontSize: "9pt" }}>%</span>
              <span className={styles.conditionalLabel} style={{ marginLeft: "12px" }}>採取日：</span>
              <input
                type="date"
                className={styles.inlineInput}
                {...register("diseases.diabetesHba1cDate")}
              />
            </div>
            {errors.diseases?.diabetesHba1c && (
              <p className={styles.error}>{errors.diseases.diabetesHba1c.message}</p>
            )}
          </div>
        )}
      </div>

      {/* 心疾患 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.heartDisease")} />
          心疾患
        </label>
        {checked("heartDisease") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>ペースメーカー：</span>
              <div className={styles.radioGroup}>
                {(["あり", "なし"] as const).map((v) => (
                  <label key={v} className={styles.radioLabel}>
                    <input
                      type="radio"
                      value={v}
                      {...register("diseases.heartDiseasePacemaker")}
                    />
                    {v}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 脳血管疾患 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.cerebrovascular")} />
          脳血管疾患
        </label>
      </div>

      {/* 腎疾患 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.kidneyDisease")} />
          腎疾患
        </label>
        {checked("kidneyDisease") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>透析：</span>
              <div className={styles.radioGroup}>
                {(["あり", "なし"] as const).map((v) => (
                  <label key={v} className={styles.radioLabel}>
                    <input
                      type="radio"
                      value={v}
                      {...register("diseases.kidneyDiseaseDialysis")}
                    />
                    {v}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 肝疾患 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.liverDisease")} />
          肝疾患
        </label>
      </div>

      {/* 血液疾患 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.bloodDisease")} />
          血液疾患
        </label>
        {checked("bloodDisease") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>病名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("diseases.bloodDiseaseName")}
                placeholder="例：白血病、血小板減少症"
              />
            </div>
          </div>
        )}
      </div>

      {/* 悪性腫瘍 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.malignancy")} />
          悪性腫瘍
        </label>
        {checked("malignancy") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>部位：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("diseases.malignancySite")}
                placeholder="例：大腸、乳房"
              />
            </div>
          </div>
        )}
      </div>

      {/* 骨粗鬆症 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.osteoporosis")} />
          骨粗鬆症
        </label>
      </div>

      {/* 薬剤アレルギー */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.drugAllergy")} />
          薬剤アレルギー
        </label>
        {checked("drugAllergy") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>薬剤名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("diseases.drugAllergyName")}
                placeholder="例：ペニシリン、アスピリン"
              />
            </div>
          </div>
        )}
      </div>

      {/* ラテックスアレルギー */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.latexAllergy")} />
          ラテックスアレルギー
        </label>
      </div>

      {/* HBs抗原陽性 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.hbsAntigen")} />
          HBs抗原陽性
        </label>
      </div>

      {/* HCV抗体陽性 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.hcvAntibody")} />
          HCV抗体陽性
        </label>
      </div>

      {/* 感染症その他 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.otherInfection")} />
          感染症その他
        </label>
        {checked("otherInfection") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>感染症名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("diseases.otherInfectionName")}
                placeholder="例：MRSA、結核"
              />
            </div>
          </div>
        )}
      </div>

      {/* 妊娠中 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.pregnant")} />
          妊娠中
        </label>
        {checked("pregnant") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>妊娠週数：</span>
              <input
                type="number"
                min="1"
                max="42"
                className={styles.inlineInputShort}
                {...register("diseases.pregnantWeeks")}
                placeholder="例：12"
              />
              <span style={{ fontSize: "9pt" }}>週</span>
            </div>
          </div>
        )}
      </div>

      {/* 授乳中 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("diseases.breastfeeding")} />
          授乳中
        </label>
      </div>
      </div>
    </section>
  );
}
