import ReferralForm from "@/components/ReferralForm";

export default function Home() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "16px", background: "#fff", minHeight: "100vh" }}>
      {/* ヘッダー */}
      <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 12, borderBottom: "2px solid #dce6f1" }}>
        <h1 style={{ fontSize: "14pt", fontWeight: "bold", letterSpacing: "0.1em", margin: "0 0 4px" }}>
          医科→歯科　患者紹介フォーム
        </h1>
        <p style={{ fontSize: "9pt", color: "#555", margin: 0 }}>
          いいづか歯科医院（〒377-0003 群馬県渋川市八木原70-1　TEL: 0279-22-0808）
        </p>
      </div>

      <ReferralForm />

      {/* フッター */}
      <div style={{ marginTop: 32, paddingTop: 12, borderTop: "1px solid #ccc", fontSize: "8pt", color: "#666", textAlign: "center" }}>
        いいづか歯科医院　〒377-0003 群馬県渋川市八木原70-1　TEL: 0279-22-0808　FAX: 0279-22-1888
      </div>
    </div>
  );
}
