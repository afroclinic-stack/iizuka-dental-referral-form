import { ReferralFormData } from "@/lib/schema";

function calcAge(birthdate: string): number {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) age--;
  return age;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr><th style="background:#f2f2f2;padding:4px 10px;text-align:left;white-space:nowrap;font-weight:bold;border:1px solid #ccc">${label}</th><td style="padding:4px 10px;border:1px solid #ccc">${value}</td></tr>`;
}

function section(title: string, content: string): string {
  if (!content.trim()) return "";
  return `
    <h3 style="background:#dce6f1;padding:6px 10px;margin:16px 0 4px;font-size:12pt">${title}</h3>
    <table style="width:100%;border-collapse:collapse;font-size:10pt">${content}</table>
  `;
}

export function buildNotificationHtml(data: ReferralFormData): string {
  const now = new Date();
  const nowStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const d = data.diseases;
  const diseaseList = [
    d.hypertension && "高血圧",
    d.diabetes && `糖尿病（HbA1c: ${d.diabetesHba1c || "—"}%　採取日: ${formatDate(d.diabetesHba1cDate || "")}）`,
    d.heartDisease && `心疾患（ペースメーカー: ${d.heartDiseasePacemaker || "—"}）`,
    d.cerebrovascular && "脳血管疾患",
    d.kidneyDisease && `腎疾患（透析: ${d.kidneyDiseaseDialysis || "—"}）`,
    d.liverDisease && "肝疾患",
    d.bloodDisease && `血液疾患（${d.bloodDiseaseName || ""}）`,
    d.malignancy && `悪性腫瘍（部位: ${d.malignancySite || ""}）`,
    d.osteoporosis && "骨粗鬆症",
    d.drugAllergy && `薬剤アレルギー（${d.drugAllergyName || ""}）`,
    d.latexAllergy && "ラテックスアレルギー",
    d.hbsAntigen && "HBs抗原陽性",
    d.hcvAntibody && "HCV抗体陽性",
    d.otherInfection && `感染症・その他（${d.otherInfectionName || ""}）`,
    d.pregnant && `妊娠中（${d.pregnantWeeks || ""}週）`,
    d.breastfeeding && "授乳中",
  ].filter(Boolean).join("<br>");

  const m = data.medications;
  const medList = [
    m.anticoagulant && `抗凝固薬（${m.anticoagulantName || ""}　PT-INR: ${m.anticoagulantPtinr || "—"}　採取日: ${formatDate(m.anticoagulantPtinrDate || "")}）`,
    m.antiplatelet && `抗血小板薬（${m.antiplateletName || ""}）`,
    m.boneResorption && `骨吸収抑制薬（${m.boneResorptionName || ""}　投与経路: ${m.boneResorptionRoute || ""}　投与期間: ${m.boneResorptionDuration || ""}）`,
    m.steroid && `ステロイド薬（${m.steroidName || ""}）`,
    m.immunosuppressant && `免疫抑制薬（${m.immunosuppressantName || ""}）`,
    m.antihypertensive && `降圧薬（${m.antihypertensiveName || ""}）`,
    m.diabetesMed && `糖尿病薬（${m.diabetesMedName || ""}）`,
    m.otherMeds && `その他薬剤: ${m.otherMeds}`,
  ].filter(Boolean).join("<br>");

  const lv = data.labValues;
  const di = data.dentalInstructions;

  const purposes = data.referralPurpose.map((p) =>
    p === "その他" && data.referralPurposeOther ? `その他（${data.referralPurposeOther}）` : p
  ).join("、");

  return `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><title>患者紹介通知</title></head>
<body style="font-family:'MS Mincho',serif;font-size:10pt;color:#000;max-width:600px;margin:0 auto">
  <div style="background:#2c5282;color:#fff;padding:12px 16px">
    <strong>いいづか歯科医院　患者紹介フォーム</strong>
  </div>
  <p style="margin:16px 0 8px">新しい患者紹介フォームが届きました。</p>
  <p style="margin:4px 0;color:#666">受信日時: ${nowStr}</p>

  ${section("■ 患者基本情報", [
    row("患者氏名", `${data.patientNameKanji}（${data.patientNameKana}）`),
    row("生年月日", `${formatDate(data.birthdate)}（${calcAge(data.birthdate)}歳）`),
    row("性別", data.gender),
  ].join(""))}

  ${section("■ 紹介元医療機関情報", [
    row("医療機関名", data.clinicName),
    row("担当医師名", `${data.doctorName}${data.department ? `（${data.department}）` : ""}`),
    row("電話番号", data.phone),
    row("メールアドレス", data.email),
    row("紹介日", data.referralDate ? formatDate(data.referralDate) : "—"),
  ].join(""))}

  ${section("■ 紹介理由・緊急度", [
    row("主病名", data.mainDiagnosis),
    row("紹介目的", purposes),
    row("緊急度", data.urgency),
  ].join(""))}

  ${diseaseList ? section("■ 全身疾患", row("疾患", diseaseList)) : ""}
  ${medList ? section("■ 服薬情報", row("薬剤", medList)) : ""}

  ${section("■ 直近の検査値", [
    lv.ptinr ? row("PT-INR", `${lv.ptinr}（${formatDate(lv.ptinrDate || "")}）`) : "",
    lv.hba1c ? row("HbA1c", `${lv.hba1c}%（${formatDate(lv.hba1cDate || "")}）`) : "",
    (lv.bpSystolic || lv.bpDiastolic) ? row("血圧", `${lv.bpSystolic || "—"}/${lv.bpDiastolic || "—"} mmHg`) : "",
    lv.otherLab ? row("その他", lv.otherLab) : "",
  ].join(""))}

  ${section("■ 歯科治療への依頼", [
    row("観血処置", di.invasive),
    row("局所麻酔（アドレナリン含有）", di.localAnesthesia),
    row("休薬", di.drugHoliday === "要" ? `要（${di.drugHolidayDetail || ""}）` : di.drugHoliday),
    row("特記事項", di.specialNotes?.replace(/\n/g, "<br>")),
  ].join(""))}

  <hr style="margin:24px 0;border:none;border-top:1px solid #ccc">
  <p style="font-size:8pt;color:#666">
    ※ このメールへの返信は紹介元医院（${data.email}）に届きます。
  </p>
</body>
</html>`;
}

export function buildConfirmationHtml(data: ReferralFormData): string {
  const now = new Date();
  const nowStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><title>送信控え</title></head>
<body style="font-family:'MS Mincho',serif;font-size:10pt;color:#000;max-width:600px;margin:0 auto">
  <div style="background:#2c5282;color:#fff;padding:12px 16px">
    <strong>患者紹介フォーム　送信控え</strong>
  </div>
  <p style="margin:16px 0 8px">${data.clinicName}　${data.doctorName} 先生</p>
  <p style="margin:4px 0">患者紹介フォームの送信が完了しました。</p>
  <p style="margin:4px 0;color:#666">送信日時: ${nowStr}</p>
  <p style="margin:4px 0">患者様: <strong>${data.patientNameKanji}（${data.patientNameKana}）</strong> 様</p>

  <hr style="margin:16px 0">
  <p>いいづか歯科医院にて内容を確認のうえ、ご連絡申し上げます。</p>

  <div style="background:#f8f8f8;padding:12px;margin:16px 0;font-size:9pt">
    <strong>いいづか歯科医院</strong><br>
    〒377-0003　群馬県渋川市八木原70-1<br>
    TEL: 0279-22-0808　FAX: 0279-22-1888
  </div>

  <p style="font-size:8pt;color:#666">
    ※ このメールは自動送信です。返信はお受けできません。<br>
    ※ お問い合わせは上記電話番号へお願いいたします。
  </p>
</body>
</html>`;
}
