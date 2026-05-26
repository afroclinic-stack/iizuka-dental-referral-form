"use client";

import { ReferralFormData } from "@/lib/schema";

interface Props {
  data: ReferralFormData;
}

const CB = ({ v }: { v?: boolean }) => <>{v ? "☑" : "□"}</>;

function R({ sel, val }: { sel?: string | null; val: string }) {
  return (
    <span style={{ marginRight: "10pt", whiteSpace: "nowrap" as const }}>
      {sel === val ? "●" : "○"}{val}
    </span>
  );
}

function fmtDate(d?: string): string {
  if (!d) return "";
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[1]}/${m[2]}/${m[3]}` : d;
}

function calcAge(b?: string): string {
  if (!b) return "";
  const birth = new Date(b);
  if (isNaN(birth.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) age--;
  return age >= 0 ? `（${age}歳）` : "";
}

const TH: React.CSSProperties = {
  fontWeight: "bold",
  color: "#333",
  whiteSpace: "nowrap",
  verticalAlign: "top",
  paddingRight: "4pt",
  paddingTop: "2pt",
  fontSize: "7.5pt",
};

const TD: React.CSSProperties = {
  verticalAlign: "top",
  paddingBottom: "2pt",
  paddingTop: "2pt",
};

const UL: React.CSSProperties = {
  borderBottom: "0.5pt solid #777",
  display: "inline-block",
  minWidth: "60pt",
  paddingBottom: "1pt",
};

const SECTION_HEAD: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "8pt",
  backgroundColor: "#efefef",
  padding: "1.5pt 5pt",
  borderLeft: "3pt solid #666",
  display: "block",
  marginTop: "4pt",
  marginBottom: "2pt",
};

const REPLY_LINES = 8;

export default function PrintView({ data }: Props) {
  const dis = data.diseases ?? {};
  const med = data.medications ?? {};
  const lab = data.labValues ?? {};
  const ins = data.dentalInstructions ?? {};
  const purposes: string[] = Array.isArray(data.referralPurpose) ? data.referralPurpose : [];

  return (
    <div style={{
      fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'メイリオ', sans-serif",
      fontSize: "8pt",
      lineHeight: 1.5,
      color: "#000",
      backgroundColor: "#fff",
    }}>
      {/* ── タイトル ── */}
      <div style={{ textAlign: "center", marginBottom: "4pt" }}>
        <div style={{ fontSize: "13pt", fontWeight: "bold", letterSpacing: "0.15em" }}>
          医科→歯科　患者紹介状
        </div>
        <div style={{ fontSize: "7pt", color: "#444", marginTop: "1pt" }}>
          いいづか歯科医院　〒377-0003 群馬県渋川市八木原70-1　TEL: 0279-22-0808　FAX: 0279-22-1888
        </div>
      </div>

      <div style={{ borderTop: "1.5pt solid #000", paddingTop: "4pt" }}>

        {/* ── 患者基本情報 ── */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "3pt" }}>
          <tbody>
            <tr>
              <th style={{ ...TH, width: "12%" }}>患者氏名</th>
              <td style={{ ...TD, width: "30%" }}>
                <span style={{ fontSize: "10pt", fontWeight: "bold" }}>
                  {data.patientNameKanji || "─"}
                </span>
                {data.patientNameKana && (
                  <span style={{ fontSize: "7pt", color: "#555", marginLeft: "4pt" }}>
                    （{data.patientNameKana}）
                  </span>
                )}
              </td>
              <th style={{ ...TH, width: "10%", paddingLeft: "6pt" }}>生年月日</th>
              <td style={{ ...TD, width: "24%" }}>
                {fmtDate(data.birthdate)}{calcAge(data.birthdate)}
              </td>
              <th style={{ ...TH, width: "5%", paddingLeft: "6pt" }}>性別</th>
              <td style={TD}>{(data as { gender?: string }).gender || "─"}</td>
            </tr>
          </tbody>
        </table>

        {/* ── 紹介元医療機関 ── */}
        <div style={{ border: "0.5pt solid #bbb", borderRadius: "2pt", padding: "3pt 6pt", marginBottom: "3pt" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <th style={{ ...TH, width: "14%" }}>紹介元医療機関</th>
                <td style={{ ...TD, width: "36%" }}>
                  <span style={UL}>{data.clinicName || ""}</span>
                </td>
                <th style={{ ...TH, paddingLeft: "6pt", width: "8%" }}>紹介日</th>
                <td style={TD}>{fmtDate(data.referralDate) || "─"}</td>
              </tr>
              <tr>
                <th style={TH}>担当医師</th>
                <td style={TD}>
                  <span style={UL}>{data.doctorName || ""}</span>
                  {data.department && (
                    <span style={{ marginLeft: "6pt", fontSize: "7.5pt" }}>（{data.department}）</span>
                  )}
                </td>
                <th style={{ ...TH, paddingLeft: "6pt" }}>TEL / E-mail</th>
                <td style={{ ...TD, fontSize: "7.5pt" }}>
                  {data.phone || "─"}
                  {data.email && <span style={{ marginLeft: "4pt" }}>　{data.email}</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── 紹介理由 ── */}
        <div style={SECTION_HEAD}>■ 紹介理由</div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2pt" }}>
          <tbody>
            <tr>
              <th style={{ ...TH, width: "10%" }}>主病名</th>
              <td style={{ ...TD, width: "50%" }}>
                <span style={{ ...UL, minWidth: "180pt" }}>{data.mainDiagnosis || "　"}</span>
              </td>
              <th style={{ ...TH, paddingLeft: "8pt", width: "8%" }}>緊急度</th>
              <td style={TD}>
                <R sel={(data as { urgency?: string }).urgency} val="通常" />
                <R sel={(data as { urgency?: string }).urgency} val="準緊急" />
                <R sel={(data as { urgency?: string }).urgency} val="緊急" />
              </td>
            </tr>
            <tr>
              <th style={TH}>紹介目的</th>
              <td style={TD} colSpan={3}>
                {(["歯科治療前確認", "抜歯許可確認", "投薬情報共有", "その他"] as const).map((p) => (
                  <span key={p} style={{ marginRight: "12pt", whiteSpace: "nowrap" }}>
                    <CB v={purposes.includes(p)} />{p}
                  </span>
                ))}
                {purposes.includes("その他") && data.referralPurposeOther && (
                  <span style={{ fontSize: "7.5pt" }}>（{data.referralPurposeOther}）</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── 全身疾患 ＋ 服薬情報（2列）── */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "3pt" }}>
          <tbody>
            <tr>
              {/* 全身疾患 */}
              <td style={{ width: "49%", verticalAlign: "top", border: "0.5pt solid #bbb", borderRadius: "2pt", padding: "2pt 5pt" }}>
                <div style={SECTION_HEAD}>■ 全身疾患</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "7.5pt" }}>
                  <tbody>
                    <tr>
                      <td><CB v={dis.hypertension} />高血圧</td>
                      <td><CB v={dis.osteoporosis} />骨粗鬆症</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={dis.diabetes} />糖尿病
                        {dis.diabetes && (
                          <span style={{ fontSize: "7pt", marginLeft: "3pt" }}>
                            HbA1c:
                            <span style={{ ...UL, minWidth: "28pt", marginLeft: "2pt" }}>
                              {dis.diabetesHba1c || ""}
                            </span>%
                            {dis.diabetesHba1cDate && (
                              <span>（{fmtDate(dis.diabetesHba1cDate)}）</span>
                            )}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={dis.heartDisease} />心疾患
                        {dis.heartDisease && dis.heartDiseasePacemaker && (
                          <span style={{ fontSize: "7pt", marginLeft: "3pt" }}>
                            ペースメーカー:{dis.heartDiseasePacemaker}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td><CB v={dis.cerebrovascular} />脳血管疾患</td>
                      <td>
                        <CB v={dis.kidneyDisease} />腎疾患
                        {dis.kidneyDisease && dis.kidneyDiseaseDialysis && (
                          <span style={{ fontSize: "7pt" }}>　透析:{dis.kidneyDiseaseDialysis}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td><CB v={dis.liverDisease} />肝疾患</td>
                      <td>
                        <CB v={dis.bloodDisease} />血液疾患
                        {dis.bloodDisease && dis.bloodDiseaseName && (
                          <span style={{ fontSize: "7pt" }}>({dis.bloodDiseaseName})</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={dis.malignancy} />悪性腫瘍
                        {dis.malignancy && dis.malignancySite && (
                          <span style={{ fontSize: "7pt" }}>　部位:{dis.malignancySite}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={dis.drugAllergy} />薬剤アレルギー
                        {dis.drugAllergy && dis.drugAllergyName && (
                          <span style={{ fontSize: "7pt" }}>({dis.drugAllergyName})</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}><CB v={dis.latexAllergy} />ラテックスアレルギー</td>
                    </tr>
                    <tr>
                      <td><CB v={dis.hbsAntigen} />HBs抗原陽性</td>
                      <td><CB v={dis.hcvAntibody} />HCV抗体陽性</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={dis.otherInfection} />感染症その他
                        {dis.otherInfection && dis.otherInfectionName && (
                          <span style={{ fontSize: "7pt" }}>({dis.otherInfectionName})</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CB v={dis.pregnant} />妊娠中
                        {dis.pregnant && dis.pregnantWeeks && (
                          <span style={{ fontSize: "7pt" }}>{dis.pregnantWeeks}週</span>
                        )}
                      </td>
                      <td><CB v={dis.breastfeeding} />授乳中</td>
                    </tr>
                  </tbody>
                </table>
              </td>

              <td style={{ width: "2%" }} />

              {/* 服薬情報 */}
              <td style={{ width: "49%", verticalAlign: "top", border: "0.5pt solid #bbb", borderRadius: "2pt", padding: "2pt 5pt" }}>
                <div style={SECTION_HEAD}>■ 服薬情報</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "7.5pt" }}>
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <CB v={med.anticoagulant} />抗凝固薬
                        {med.anticoagulant && med.anticoagulantName && (
                          <span style={{ fontSize: "7pt" }}>({med.anticoagulantName})</span>
                        )}
                      </td>
                    </tr>
                    {med.anticoagulant && (med.anticoagulantPtinr || med.anticoagulantPtinrDate) && (
                      <tr>
                        <td colSpan={2} style={{ paddingLeft: "8pt", fontSize: "7pt" }}>
                          PT-INR:
                          <span style={{ ...UL, minWidth: "28pt", marginLeft: "2pt" }}>
                            {med.anticoagulantPtinr || ""}
                          </span>
                          {med.anticoagulantPtinrDate && (
                            <span>（{fmtDate(med.anticoagulantPtinrDate)}）</span>
                          )}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={2}>
                        <CB v={med.antiplatelet} />抗血小板薬
                        {med.antiplatelet && med.antiplateletName && (
                          <span style={{ fontSize: "7pt" }}>({med.antiplateletName})</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={med.boneResorption} />骨吸収抑制薬
                        {med.boneResorption && med.boneResorptionName && (
                          <span style={{ fontSize: "7pt" }}>({med.boneResorptionName})</span>
                        )}
                      </td>
                    </tr>
                    {med.boneResorption && (med.boneResorptionRoute || med.boneResorptionDuration) && (
                      <tr>
                        <td colSpan={2} style={{ paddingLeft: "8pt", fontSize: "7pt" }}>
                          {med.boneResorptionRoute && <span>投与経路:{med.boneResorptionRoute}　</span>}
                          {med.boneResorptionDuration && <span>投与期間:{med.boneResorptionDuration}</span>}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={2}>
                        <CB v={med.steroid} />ステロイド薬
                        {med.steroid && med.steroidName && (
                          <span style={{ fontSize: "7pt" }}>({med.steroidName})</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={med.immunosuppressant} />免疫抑制薬
                        {med.immunosuppressant && med.immunosuppressantName && (
                          <span style={{ fontSize: "7pt" }}>({med.immunosuppressantName})</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={med.antihypertensive} />降圧薬
                        {med.antihypertensive && med.antihypertensiveName && (
                          <span style={{ fontSize: "7pt" }}>({med.antihypertensiveName})</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <CB v={med.diabetesMed} />糖尿病薬
                        {med.diabetesMed && med.diabetesMedName && (
                          <span style={{ fontSize: "7pt" }}>({med.diabetesMedName})</span>
                        )}
                      </td>
                    </tr>
                    {med.otherMeds && (
                      <tr>
                        <td colSpan={2} style={{ fontSize: "7pt" }}>
                          その他服薬: {med.otherMeds}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── 検査値 ── */}
        <div style={SECTION_HEAD}>■ 検査値</div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "3pt" }}>
          <tbody>
            <tr>
              <th style={{ ...TH, width: "10%" }}>PT-INR</th>
              <td style={{ ...TD, width: "20%" }}>
                <span style={UL}>{lab.ptinr || "　　　"}</span>
                {lab.ptinrDate && (
                  <span style={{ fontSize: "7pt" }}>（{fmtDate(lab.ptinrDate)}）</span>
                )}
              </td>
              <th style={{ ...TH, paddingLeft: "6pt", width: "8%" }}>HbA1c</th>
              <td style={{ ...TD, width: "18%" }}>
                <span style={UL}>{lab.hba1c || "　　　"}</span>
                {lab.hba1cDate && (
                  <span style={{ fontSize: "7pt" }}>（{fmtDate(lab.hba1cDate)}）</span>
                )}
              </td>
              <th style={{ ...TH, paddingLeft: "6pt", width: "6%" }}>血圧</th>
              <td style={TD}>
                {lab.bpSystolic && lab.bpDiastolic
                  ? `${lab.bpSystolic} / ${lab.bpDiastolic} mmHg`
                  : "　　/　　 mmHg"}
              </td>
            </tr>
            {lab.otherLab && (
              <tr>
                <th style={TH}>その他</th>
                <td style={TD} colSpan={5}>{lab.otherLab}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ── 歯科治療への依頼 ── */}
        <div style={SECTION_HEAD}>■ 歯科治療への依頼</div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "3pt" }}>
          <tbody>
            <tr>
              <th style={{ ...TH, width: "22%" }}>観血処置の可否</th>
              <td style={TD}>
                <R sel={ins.invasive} val="可" />
                <R sel={ins.invasive} val="条件付き可" />
                <R sel={ins.invasive} val="要相談" />
              </td>
            </tr>
            <tr>
              <th style={TH}>局所麻酔（アドレ含）の可否</th>
              <td style={TD}>
                <R sel={ins.localAnesthesia} val="可" />
                <R sel={ins.localAnesthesia} val="不可" />
                <R sel={ins.localAnesthesia} val="要相談" />
              </td>
            </tr>
            <tr>
              <th style={TH}>休薬の要否</th>
              <td style={TD}>
                <R sel={ins.drugHoliday} val="不要" />
                <R sel={ins.drugHoliday} val="要" />
                <R sel={ins.drugHoliday} val="主治医確認済み" />
                {ins.drugHoliday === "要" && ins.drugHolidayDetail && (
                  <span style={{ fontSize: "7.5pt" }}>（{ins.drugHolidayDetail}）</span>
                )}
              </td>
            </tr>
            {ins.specialNotes && (
              <tr>
                <th style={TH}>特記事項</th>
                <td style={{ ...TD, fontSize: "7.5pt" }}>{ins.specialNotes}</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ── 返書欄 ── */}
        <div style={SECTION_HEAD}>■ 歯科からの処置内容・経過報告欄（返書）</div>
        {Array.from({ length: REPLY_LINES }).map((_, i) => (
          <div
            key={i}
            style={{ borderBottom: "0.5pt solid #777", height: "19pt", marginBottom: "1pt" }}
          />
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5pt", fontSize: "7.5pt" }}>
          <span>
            歯科担当医師名：
            <span style={{
              borderBottom: "0.5pt solid #555",
              display: "inline-block",
              minWidth: "130pt",
            }} />
          </span>
          <span>
            日付：
            <span style={{
              borderBottom: "0.5pt solid #555",
              display: "inline-block",
              minWidth: "90pt",
            }} />
          </span>
        </div>

      </div>
    </div>
  );
}
