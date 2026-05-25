import ReferralForm from "@/components/ReferralForm";

export default function Home() {
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 16px 40px" }}>

      {/* ヘッダー */}
      <div style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(75,68,60,0.08)",
        padding: "28px 32px",
        marginBottom: 24,
        borderTop: "4px solid #C4860A",
      }}>
        <p style={{ fontSize: 11, color: "#9A8A83", margin: "0 0 6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          いいづか歯科医院
        </p>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#4B443C", margin: "0 0 6px", letterSpacing: "0.05em" }}>
          医科→歯科　患者紹介フォーム
        </h1>
        <p style={{ fontSize: 13, color: "#9A8A83", margin: 0 }}>
          〒377-0003 群馬県渋川市八木原70-1　TEL: 0279-22-0808
        </p>
      </div>

      <ReferralForm />

      {/* フッター */}
      <div style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px solid #DDD5CB",
        fontSize: 12,
        color: "#9A8A83",
        textAlign: "center",
      }}>
        いいづか歯科医院　〒377-0003 群馬県渋川市八木原70-1　TEL: 0279-22-0808　FAX: 0279-22-1888
      </div>

    </div>
  );
}
