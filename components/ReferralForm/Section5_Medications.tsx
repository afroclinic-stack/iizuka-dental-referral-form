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

export default function Section5_Medications({ control, register }: Props) {
  const meds = useWatch({ control, name: "medications" });

  const checked = (key: keyof NonNullable<typeof meds>): boolean => {
    return !!(meds && meds[key]);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>5. 服薬情報</h2>

      {/* 抗凝固薬 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("medications.anticoagulant")} />
          抗凝固薬
        </label>
        {checked("anticoagulant") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>薬剤名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("medications.anticoagulantName")}
                placeholder="例：ワーファリン、エリキュース"
              />
            </div>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>PT-INR値：</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="20"
                className={styles.inlineInputShort}
                {...register("medications.anticoagulantPtinr")}
                placeholder="例：2.1"
              />
              <span className={styles.conditionalLabel} style={{ marginLeft: "12px" }}>採取日：</span>
              <input
                type="date"
                className={styles.inlineInput}
                {...register("medications.anticoagulantPtinrDate")}
              />
            </div>
          </div>
        )}
      </div>

      {/* 抗血小板薬 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("medications.antiplatelet")} />
          抗血小板薬
        </label>
        {checked("antiplatelet") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>薬剤名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("medications.antiplateletName")}
                placeholder="例：バイアスピリン、プラビックス"
              />
            </div>
          </div>
        )}
      </div>

      {/* 骨吸収抑制薬 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("medications.boneResorption")} />
          骨吸収抑制薬
        </label>
        {checked("boneResorption") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>薬剤名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("medications.boneResorptionName")}
                placeholder="例：ビスフォスフォネート、デノスマブ"
              />
            </div>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>投与経路：</span>
              <input
                type="text"
                className={styles.inlineInputShort}
                {...register("medications.boneResorptionRoute")}
                placeholder="例：経口、静脈"
              />
              <span className={styles.conditionalLabel} style={{ marginLeft: "12px" }}>投与期間：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("medications.boneResorptionDuration")}
                placeholder="例：3年"
              />
            </div>
          </div>
        )}
      </div>

      {/* ステロイド薬 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("medications.steroid")} />
          ステロイド薬
        </label>
        {checked("steroid") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>薬剤名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("medications.steroidName")}
                placeholder="例：プレドニゾロン"
              />
            </div>
          </div>
        )}
      </div>

      {/* 免疫抑制薬 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("medications.immunosuppressant")} />
          免疫抑制薬
        </label>
        {checked("immunosuppressant") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>薬剤名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("medications.immunosuppressantName")}
                placeholder="例：タクロリムス、シクロスポリン"
              />
            </div>
          </div>
        )}
      </div>

      {/* 降圧薬 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("medications.antihypertensive")} />
          降圧薬
        </label>
        {checked("antihypertensive") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>薬剤名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("medications.antihypertensiveName")}
                placeholder="例：アムロジピン、ARB"
              />
            </div>
          </div>
        )}
      </div>

      {/* 糖尿病薬 */}
      <div className={styles.field}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("medications.diabetesMed")} />
          糖尿病薬
        </label>
        {checked("diabetesMed") && (
          <div className={styles.conditionalBlock}>
            <div className={styles.conditionalRow}>
              <span className={styles.conditionalLabel}>薬剤名：</span>
              <input
                type="text"
                className={styles.inlineInput}
                {...register("medications.diabetesMedName")}
                placeholder="例：メトホルミン、インスリン"
              />
            </div>
          </div>
        )}
      </div>

      {/* その他特記薬剤 */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="otherMeds">
          その他特記薬剤
        </label>
        <textarea
          id="otherMeds"
          className={styles.textarea}
          rows={3}
          {...register("medications.otherMeds")}
          placeholder="その他特記すべき薬剤があれば記載してください"
        />
      </div>
    </section>
  );
}
