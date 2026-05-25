import ReferralForm from "@/components/ReferralForm";

export default function Home() {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px 40px" }}>

      {/* ヘッダー */}
      <div style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
        padding: "24px 28px",
        marginBottom: 20,
        borderLeft: "4px solid #72C4BC",
      }}>
        <p style={{ fontSize: 11, color: "#888", margin: "0 0 4px", letterSpacing: "0.08em" }}>
          いいづか歯科医院
        </p>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", margin: "0 0 4px" }}>
          医科→歯科　患者紹介フォーム
        </h1>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>
          〒377-0003 群馬県渋川市八木原70-1　TEL: 0279-22-0808
        </p>
      </div>

      <ReferralForm />

      {/* フッター */}
      <div style={{
        marginTop: 28,
        paddingTop: 14,
        borderTop: "1px solid #DCDCDC",
        fontSize: 11,
        color: "#AAA",
        textAlign: "center",
      }}>
        いいづか歯科医院　〒377-0003 群馬県渋川市八木原70-1　TEL: 0279-22-0808　FAX: 0279-22-1888
      </div>

    </div>
  );
}
