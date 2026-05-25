import { z } from "zod";

export const referralSchema = z.object({
  // セクション1: 患者基本情報
  patientNameKanji: z.string().min(1, "患者氏名（漢字）は必須です"),
  patientNameKana: z.string().min(1, "患者氏名（ふりがな）は必須です"),
  birthdate: z.string().min(1, "生年月日は必須です").refine((v) => !isNaN(Date.parse(v)), "有効な日付を入力してください"),
  gender: z.enum(["男性", "女性", "その他"], { error: "性別を選択してください" }),

  // セクション2: 紹介元医療機関情報
  clinicName: z.string().min(1, "医療機関名は必須です"),
  doctorName: z.string().min(1, "担当医師名は必須です"),
  department: z.string().optional(),
  phone: z.string().min(1, "電話番号は必須です").regex(/^[\d\-+() ]+$/, "電話番号の形式が正しくありません"),
  email: z.string().min(1, "メールアドレスは必須です").email("メールアドレスの形式が正しくありません"),
  referralDate: z.string().optional(),

  // セクション3: 紹介理由
  mainDiagnosis: z.string().optional(),
  referralPurpose: z.array(z.string()).min(1, "紹介目的を1つ以上選択してください"),
  referralPurposeOther: z.string().optional(),
  urgency: z.enum(["通常", "準緊急", "緊急"], { error: "緊急度を選択してください" }),

  // セクション4: 全身疾患
  diseases: z.object({
    hypertension: z.boolean().default(false),
    diabetes: z.boolean().default(false),
    diabetesHba1c: z.string().optional(),
    diabetesHba1cDate: z.string().optional(),
    heartDisease: z.boolean().default(false),
    heartDiseasePacemaker: z.enum(["あり", "なし", ""]).optional(),
    cerebrovascular: z.boolean().default(false),
    kidneyDisease: z.boolean().default(false),
    kidneyDiseaseDialysis: z.enum(["あり", "なし", ""]).optional(),
    liverDisease: z.boolean().default(false),
    bloodDisease: z.boolean().default(false),
    bloodDiseaseName: z.string().optional(),
    malignancy: z.boolean().default(false),
    malignancySite: z.string().optional(),
    osteoporosis: z.boolean().default(false),
    drugAllergy: z.boolean().default(false),
    drugAllergyName: z.string().optional(),
    latexAllergy: z.boolean().default(false),
    hbsAntigen: z.boolean().default(false),
    hcvAntibody: z.boolean().default(false),
    otherInfection: z.boolean().default(false),
    otherInfectionName: z.string().optional(),
    pregnant: z.boolean().default(false),
    pregnantWeeks: z.string().optional(),
    breastfeeding: z.boolean().default(false),
  }),

  // セクション5: 服薬情報
  medications: z.object({
    anticoagulant: z.boolean().default(false),
    anticoagulantName: z.string().optional(),
    anticoagulantPtinr: z.string().optional(),
    anticoagulantPtinrDate: z.string().optional(),
    antiplatelet: z.boolean().default(false),
    antiplateletName: z.string().optional(),
    boneResorption: z.boolean().default(false),
    boneResorptionName: z.string().optional(),
    boneResorptionRoute: z.string().optional(),
    boneResorptionDuration: z.string().optional(),
    steroid: z.boolean().default(false),
    steroidName: z.string().optional(),
    immunosuppressant: z.boolean().default(false),
    immunosuppressantName: z.string().optional(),
    antihypertensive: z.boolean().default(false),
    antihypertensiveName: z.string().optional(),
    diabetesMed: z.boolean().default(false),
    diabetesMedName: z.string().optional(),
    otherMeds: z.string().optional(),
  }),

  // セクション6: 検査値
  labValues: z.object({
    ptinr: z.string().optional(),
    ptinrDate: z.string().optional(),
    hba1c: z.string().optional(),
    hba1cDate: z.string().optional(),
    bpSystolic: z.string().optional(),
    bpDiastolic: z.string().optional(),
    otherLab: z.string().optional(),
  }),

  // セクション7: 歯科治療への依頼
  dentalInstructions: z.object({
    invasive: z.enum(["可", "条件付き可", "要相談", ""]).optional(),
    localAnesthesia: z.enum(["可", "不可", "要相談", ""]).optional(),
    drugHoliday: z.enum(["不要", "要", "確認済み", ""]).optional(),
    drugHolidayDetail: z.string().optional(),
    specialNotes: z.string().optional(),
  }),

  // Honeypot（スパム対策）
  _honeypot: z.string().max(0, "").optional(),
});

export type ReferralFormData = z.infer<typeof referralSchema>;
