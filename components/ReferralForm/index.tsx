"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { referralSchema, ReferralFormData } from "@/lib/schema";
import styles from "./ReferralForm.module.css";

import Section1_Patient from "./Section1_Patient";
import Section2_Clinic from "./Section2_Clinic";
import Section3_Reason from "./Section3_Reason";
import Section4_Diseases from "./Section4_Diseases";
import Section5_Medications from "./Section5_Medications";
import Section6_LabValues from "./Section6_LabValues";
import Section7_Instructions from "./Section7_Instructions";
import Section8_Reply from "./Section8_Reply";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ReferralForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferralFormData>({
    resolver: standardSchemaResolver(referralSchema),
    defaultValues: {
      patientNameKanji: "",
      patientNameKana: "",
      birthdate: "",
      clinicName: "",
      doctorName: "",
      department: "",
      phone: "",
      email: "",
      referralDate: "",
      mainDiagnosis: "",
      referralPurpose: [],
      referralPurposeOther: "",
      diseases: {
        hypertension: false,
        diabetes: false,
        diabetesHba1c: "",
        diabetesHba1cDate: "",
        heartDisease: false,
        heartDiseasePacemaker: "",
        cerebrovascular: false,
        kidneyDisease: false,
        kidneyDiseaseDialysis: "",
        liverDisease: false,
        bloodDisease: false,
        bloodDiseaseName: "",
        malignancy: false,
        malignancySite: "",
        osteoporosis: false,
        drugAllergy: false,
        drugAllergyName: "",
        latexAllergy: false,
        hbsAntigen: false,
        hcvAntibody: false,
        otherInfection: false,
        otherInfectionName: "",
        pregnant: false,
        pregnantWeeks: "",
        breastfeeding: false,
      },
      medications: {
        anticoagulant: false,
        anticoagulantName: "",
        anticoagulantPtinr: "",
        anticoagulantPtinrDate: "",
        antiplatelet: false,
        antiplateletName: "",
        boneResorption: false,
        boneResorptionName: "",
        boneResorptionRoute: "",
        boneResorptionDuration: "",
        steroid: false,
        steroidName: "",
        immunosuppressant: false,
        immunosuppressantName: "",
        antihypertensive: false,
        antihypertensiveName: "",
        diabetesMed: false,
        diabetesMedName: "",
        otherMeds: "",
      },
      labValues: {
        ptinr: "",
        ptinrDate: "",
        hba1c: "",
        hba1cDate: "",
        bpSystolic: "",
        bpDiastolic: "",
        otherLab: "",
      },
      dentalInstructions: {
        invasive: "",
        localAnesthesia: "",
        drugHoliday: "",
        drugHolidayDetail: "",
        specialNotes: "",
      },
      _honeypot: "",
    },
  });

  const sectionProps = { control, register, watch, errors };

  const onSubmit = async (data: ReferralFormData) => {
    const confirmed = window.confirm(
      "紹介フォームを送信します。\n内容を確認の上、送信してよろしいですか？"
    );
    if (!confirmed) return;

    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({})) as { error?: string };
        const msg = json.error ?? `送信に失敗しました（HTTP ${res.status}）。`;
        setErrorMessage(msg);
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
    } catch {
      setErrorMessage(
        "ネットワークエラーが発生しました。インターネット接続を確認の上、再度お試しください。"
      );
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className={styles.successBox}>
        <h2 style={{ fontSize: "16pt", marginBottom: "12px" }}>送信が完了しました</h2>
        <p style={{ fontSize: "10pt", color: "#333" }}>
          紹介フォームを送信しました。担当医のメールアドレスに控えが届きます。
        </p>
        <p style={{ fontSize: "9.5pt", color: "#555", marginTop: "8px" }}>
          ご不明な点がございましたら、歯科医院までお問い合わせください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot（スパム対策） */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="_honeypot">Leave this field blank</label>
        <input
          id="_honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("_honeypot")}
        />
      </div>

      <Section1_Patient {...sectionProps} />
      <Section2_Clinic {...sectionProps} />
      <Section3_Reason {...sectionProps} />
      <Section4_Diseases {...sectionProps} />
      <Section5_Medications {...sectionProps} />
      <Section6_LabValues {...sectionProps} />
      <Section7_Instructions {...sectionProps} />
      <Section8_Reply />

      {submitStatus === "error" && errorMessage && (
        <div className={styles.errorBox} role="alert">
          {errorMessage}
        </div>
      )}

      <div className={`${styles.buttonRow} ${styles.noPrint}`}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={submitStatus === "submitting"}
        >
          {submitStatus === "submitting" ? "送信中..." : "送信する"}
        </button>

        <button
          type="button"
          className={styles.printBtn}
          onClick={() => window.print()}
          disabled={submitStatus === "submitting"}
        >
          印刷
        </button>

        {submitStatus === "submitting" && (
          <span className={styles.loadingText}>送信中です。しばらくお待ちください...</span>
        )}
      </div>
    </form>
  );
}
