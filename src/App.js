import React, { useState } from "react";
import "./styles.css";

const LOGO_URL = "https://i.ibb.co/9mBvpvps/ACC.png";

// ==========================================
// 1. DỮ LIỆU & CẤU HÌNH FULL 100%
// ==========================================

const DICT = {
  vi: {
    home: "Trang chủ",
    job: "Việc làm",
    game: "Thực chiến",
    shop: "Cửa hàng",
    me: "Cá nhân",
    roadmap: "Lộ trình học tập",
    ai_promo: "Hỏi đáp nghiệp vụ cùng AI Mentor",
    job_hot: "Việc làm nổi bật",
    apply: "Ứng tuyển",
    locked: "Khóa VIP",
    locked_msg: "Bạn cần hoàn thành cấp độ trước!",
    lesson_list: "Nội dung học phần",
    video_title: "Bài giảng",
    note_ph: "Ghi chú...",
    btn_finish: "Hoàn thành",
    shop_vip: "Gói Hội Viên PRO",
    buy: "Mua ngay",
    cv: "Hồ sơ năng lực (CV)",
    cert: "Chứng chỉ",
    logout: "Đăng xuất",
    stats_gpa: "GPA",
    stats_hours: "Giờ học",
    stats_courses: "Môn xong",
    game_intro_title: "Hành trình Kế toán tập sự",
    game_intro_desc:
      "Nhập vai nhân viên kế toán tại công ty ảo. Giải quyết tình huống thực tế: Hóa đơn, Thuế, Lương để thăng hạng!",
    btn_play: "Vào ca làm việc",
  },
  en: {
    home: "Home",
    job: "Careers",
    game: "Game",
    shop: "Shop",
    me: "Profile",
    roadmap: "ACCA Roadmap",
    ai_promo: "Ask AI Mentor about Accounting",
    job_hot: "Featured Jobs",
    apply: "Apply Now",
    locked: "VIP Only",
    locked_msg: "Please finish previous level!",
    lesson_list: "Curriculum",
    video_title: "Lecture",
    note_ph: "Take notes...",
    btn_finish: "Complete",
    shop_vip: "Premium Plan",
    buy: "Buy Now",
    cv: "My CV",
    cert: "Certificates",
    logout: "Logout",
    stats_gpa: "GPA",
    stats_hours: "Hours",
    stats_courses: "Completed",
    game_intro_title: "Internship Journey",
    game_intro_desc:
      "Role-play as an Accounting Intern. Solve real-world tasks: Invoices, Tax, Payroll to rank up!",
    btn_play: "Start Shift",
  },
};

const GAME_JOURNEY = [
  {
    id: 1,
    rank: "Thực tập sinh",
    task: "Xử lý hóa đơn đầu vào & Phân loại chứng từ",
    xp: "100 XP",
    status: "active",
    icon: "🌱",
  },
  {
    id: 2,
    rank: "Kế toán viên (Junior)",
    task: "Hạch toán Lương & Bảo hiểm xã hội",
    xp: "300 XP",
    status: "locked",
    icon: "💼",
  },
  {
    id: 3,
    rank: "Kế toán Tổng hợp",
    task: "Kê khai Thuế GTGT & TNDN",
    xp: "800 XP",
    status: "locked",
    icon: "📊",
  },
  {
    id: 4,
    rank: "Kế toán trưởng (CFO)",
    task: "Lập & Phân tích Báo cáo Tài chính",
    xp: "2000 XP",
    status: "locked",
    icon: "👑",
  },
];

const ALL_SUBJECTS = {
  nlkt: {
    id: "nlkt",
    name_vi: "Nguyên lý Kế toán",
    name_en: "Accounting Principles",
    progress: 100,
    lessons: [
      {
        id: 1,
        title_vi: "Tổng quan",
        type: "video",
        status: "done",
        videoId: "bO2sE1S5_5Y",
      },
      { id: 2, title_vi: "Thực hành Định khoản", type: "game", status: "done" },
    ],
  },
  tc1: {
    id: "tc1",
    name_vi: "Kế toán Tài chính 1",
    name_en: "Financial Acc 1",
    progress: 45,
    lessons: [
      {
        id: 1,
        title_vi: "Tiền mặt",
        type: "video",
        status: "done",
        videoId: "yXh14z5Q48s",
      },
      {
        id: 2,
        title_vi: "Vật tư",
        type: "video",
        status: "done",
        videoId: "bO2sE1S5_5Y",
      },
      {
        id: 3,
        title_vi: "Game: Xử lý Hóa đơn Vật tư",
        type: "game",
        status: "active",
      },
    ],
  },
  thue_vn: {
    id: "thue_vn",
    name_vi: "Kế toán Thuế",
    name_en: "Tax Accounting",
    progress: 0,
    status: "active",
    lessons: [
      {
        id: 1,
        title_vi: "Tổng quan Thuế GTGT",
        type: "video",
        status: "active",
        videoId: "bO2sE1S5_5Y",
      },
      {
        id: 2,
        title_vi: "Mô phỏng Kê khai Thuế",
        type: "game",
        status: "locked",
      },
    ],
  },
  audit_vn: {
    id: "audit_vn",
    name_vi: "Kiểm toán Căn bản",
    name_en: "Auditing Basics",
    progress: 0,
    status: "locked",
    lessons: [],
  },
  bt: {
    id: "bt",
    name_vi: "Kinh doanh & CN (F1)",
    name_en: "Business & Tech (BT)",
    progress: 100,
    lessons: [
      {
        id: 1,
        title_vi: "Business Org",
        type: "video",
        status: "done",
        videoId: "bO2sE1S5_5Y",
      },
    ],
  },
  ma: {
    id: "ma",
    name_vi: "Kế toán Quản trị (F2)",
    name_en: "Management Acc (MA)",
    progress: 100,
    lessons: [
      {
        id: 1,
        title_vi: "Costing",
        type: "video",
        status: "done",
        videoId: "yXh14z5Q48s",
      },
    ],
  },
  fa: {
    id: "fa",
    name_vi: "Kế toán Tài chính (F3)",
    name_en: "Financial Acc (FA)",
    progress: 60,
    lessons: [
      {
        id: 1,
        title_vi: "Double Entry",
        type: "video",
        status: "done",
        videoId: "bO2sE1S5_5Y",
      },
      { id: 2, title_vi: "Trial Balance Game", type: "game", status: "active" },
    ],
  },
  tx: {
    id: "tx",
    name_vi: "Thuế Việt Nam (F6)",
    name_en: "Taxation (TX)",
    progress: 0,
    lessons: [],
  },
  aa: {
    id: "aa",
    name_vi: "Kiểm toán (F8)",
    name_en: "Audit & Assurance (AA)",
    progress: 0,
    lessons: [],
  },
  lw: {
    id: "lw",
    name_vi: "Luật Kinh doanh",
    name_en: "Corp Law",
    progress: 0,
    lessons: [],
  },
  pm: {
    id: "pm",
    name_vi: "Quản trị Hiệu quả",
    name_en: "Performance Mgt",
    progress: 0,
    lessons: [],
  },
  fr: {
    id: "fr",
    name_vi: "Lập Báo cáo TC",
    name_en: "Financial Reporting",
    progress: 0,
    lessons: [],
  },
  fm: {
    id: "fm",
    name_vi: "Quản trị Tài chính",
    name_en: "Financial Mgt",
    progress: 0,
    lessons: [],
  },
  sbl: {
    id: "sbl",
    name_vi: "Lãnh đạo Chiến lược",
    name_en: "Strategic Leader",
    progress: 0,
    lessons: [],
  },
  sbr: {
    id: "sbr",
    name_vi: "Báo cáo Chiến lược",
    name_en: "Strategic Reporting",
    progress: 0,
    lessons: [],
  },
};

const ROADMAP_CONFIG = {
  vi: [
    { type: "header", title: "Năm 1-2: Nền tảng" },
    {
      id: "nlkt",
      code: "NLKT",
      t: "Nguyên lý Kế toán",
      d: "GPA 4.0 • Đã xong",
      s: "done",
    },
    {
      id: "tc1",
      code: "TC1",
      t: "Kế toán Tài chính 1",
      d: "Đang học: Chương 3",
      s: "active",
    },
    { type: "header", title: "Năm 3: Chuyên ngành" },
    {
      id: "thue_vn",
      code: "THUẾ",
      t: "Kế toán Thuế",
      d: "GTGT, TNDN, TNCN",
      s: "active",
    },
    {
      id: "audit_vn",
      code: "KIỂM",
      t: "Kiểm toán Căn bản",
      d: "Yêu cầu: Xong TC1",
      s: "locked",
    },
  ],
  en: [
    { type: "header", title: "Applied Knowledge" },
    {
      id: "bt",
      code: "BT/F1",
      t: "Business & Tech",
      d: "Completed",
      s: "done",
    },
    { id: "ma", code: "MA/F2", t: "Management Acc", d: "Completed", s: "done" },
    { id: "fa", code: "FA/F3", t: "Financial Acc", d: "Ongoing", s: "active" },
    { type: "header", title: "Applied Skills" },
    {
      id: "lw",
      code: "LW/F4",
      t: "Corp & Business Law",
      d: "Locked",
      s: "locked",
    },
    { id: "pm", code: "PM/F5", t: "Performance Mgt", d: "Locked", s: "locked" },
    {
      id: "tx",
      code: "TX/F6",
      t: "Taxation (VNM)",
      d: "Vietnam Variant",
      s: "locked",
    },
    {
      id: "fr",
      code: "FR/F7",
      t: "Financial Reporting",
      d: "Locked",
      s: "locked",
    },
    {
      id: "aa",
      code: "AA/F8",
      t: "Audit & Assurance",
      d: "Locked",
      s: "locked",
    },
    { id: "fm", code: "FM/F9", t: "Financial Mgt", d: "Locked", s: "locked" },
    { type: "header", title: "Strategic Professional" },
    { id: "sbl", code: "SBL", t: "Strategic Leader", d: "Locked", s: "locked" },
    {
      id: "sbr",
      code: "SBR",
      t: "Strategic Reporting",
      d: "Locked",
      s: "locked",
    },
  ],
};

const JOBS_DATA = [
  {
    id: 1,
    title: "Audit Assistant",
    company: "Deloitte Vietnam",
    salary: "VIP Only",
    loc: "Hanoi",
    logo: "DL",
    vip: true,
  },
  {
    id: 2,
    title: "Finance Intern",
    company: "Samsung Electronics",
    salary: "12.000.000đ",
    loc: "Bac Ninh",
    logo: "S",
    vip: false,
  },
];

const SHOP_ITEMS = [
  {
    id: 1,
    name: "Đề thi Big4 2026",
    price: 100,
    icon: "📚",
    desc: "500 câu hỏi IQ/EQ",
  },
  {
    id: 2,
    name: "Gói hỏi Mentor",
    price: 50,
    icon: "👨‍🏫",
    desc: "Giải đáp 1:1",
  },
];

const REC_DATA = {
  company: { name: "Deloitte Vietnam", credit: 500, avatar: "DL" },
  kpi: {
    views: { val: "12,540", growth: "↑ +5.2%" },
    applies: { val: "342", growth: "↑ +10.1%" },
    interview: { val: "18", growth: "Mới nhất" },
  },
  posts: [
    {
      id: 1,
      title: "Audit Assistant 2026",
      type: "Full-time",
      loc: "Hanoi",
      views: 5400,
      cvs: 120,
      status: "Active",
    },
    {
      id: 2,
      title: "Tax Intern",
      type: "Part-time",
      loc: "Hanoi",
      views: 2100,
      cvs: 45,
      status: "Active",
    },
  ],
  candidates: [
    {
      id: 1,
      name: "Nguyễn Văn A",
      gpa: "3.8",
      school: "Học viện Ngân hàng (BAV)",
      skill: "ACCA F3",
      exp: "MISA (3 tháng)",
      biScore: "85%",
      status: "pending",
    },
    {
      id: 2,
      name: "Trần Thị B",
      gpa: "3.9",
      school: "ĐH KTQD",
      skill: "Taxation",
      exp: "CLB Kế toán",
      biScore: "92%",
      status: "pending",
    },
  ],
};

// ==========================================
// 2. COMPONENTS ĐẤU TRƯỜNG & GAME AI
// ==========================================

const TournamentScreen = ({ onBack, userSchool }) => {
  const leaderboard = [
    { rank: 1, name: "Lê Thị Bình", class: "K6 Kế toán A", score: 4500 },
    { rank: 2, name: "Trần T. Thúy Ngà", class: "K26 Ngân hàng", score: 4200 },
    { rank: 3, name: "Lê Thị Hiên", class: "K6 Kế toán A", score: 3950 },
  ];

  return (
    <div
      className="screen tour-screen animate-scale-up"
      style={{ background: "#f8f9fa", minHeight: "100vh" }}
    >
      <div
        className="nav-header glass"
        style={{
          background: "#0f172a",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 20px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          ⬅ Quay lại
        </button>
        <span style={{ fontWeight: "bold" }}>Đấu trường Học thuật</span>
        <div style={{ width: 60 }}></div>
      </div>

      <div className="tour-hero-banner">
        <div className="tour-sponsor">
          Đơn vị tổ chức: Liên chi Hội SV Khoa Kế toán - Kiểm toán
        </div>
        <h2 style={{ marginBottom: "10px" }}>
          OLYMPIC KẾ TOÁN {userSchool ? "2026" : "BAV 2026"}
        </h2>
        <div className="live-status">🔴 ĐANG DIỄN RA (Còn 45:12)</div>
      </div>

      <div className="tour-body-content">
        <h3
          className="section-title"
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            fontSize: "1.1rem",
            color: "#1e293b",
          }}
        >
          Nhiệm vụ Vòng Bán Kết
        </h3>
        <div className="tour-task-card">
          <div
            className="task-icon"
            style={{ fontSize: "3rem", marginBottom: "10px" }}
          >
            🗂️
          </div>
          <div className="task-info">
            <h4 style={{ marginBottom: "5px" }}>
              Bộ chứng từ Công ty Sản xuất Alpha
            </h4>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#64748b",
                marginBottom: "15px",
              }}
            >
              50 nghiệp vụ phát sinh trong tháng 3/2026
            </p>
          </div>
          <button
            className="btn-tour-join"
            onClick={() => alert("Bắt đầu tính giờ!")}
          >
            Vào thi ngay
          </button>
        </div>

        <h3
          className="section-title"
          style={{
            marginTop: "30px",
            marginBottom: "10px",
            fontSize: "1.1rem",
            color: "#1e293b",
          }}
        >
          🏆 Bảng xếp hạng Live
        </h3>
        <div className="live-leaderboard">
          {leaderboard.map((user, idx) => (
            <div key={idx} className={`lb-row ${idx === 0 ? "top-1" : ""}`}>
              <div className="lb-rank">#{user.rank}</div>
              <div className="lb-name">
                <b>{user.name}</b>
                <small>{user.class}</small>
              </div>
              <div className="lb-score">{user.score} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MÀN HÌNH GAME CÓ AI RULE-BASED (CHUẨN THÔNG TƯ 99)
// ==========================================
const GameScreen = ({ onBack, T }) => {
  const [step, setStep] = useState(1);
  const [docIdx, setDocIdx] = useState(0);
  const [entryIdx, setEntryIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [entry, setEntry] = useState({ dr: "", cr: "" });

  const docs = [
    {
      id: 1,
      title: "Hóa đơn siêu thị",
      desc: "Mua bánh, sữa bồi dưỡng cho tình nguyện viên sự kiện hiến máu 'Trái tim hồng'. Kế toán trưởng đã duyệt chi.",
      valid: true,
    },
    {
      id: 2,
      title: "Hóa đơn in ấn Backdrop",
      desc: "In phông bạt sự kiện. Chết dở, nhà in ghi nhầm tên tiếng Anh thành 'BAV Spring Vibes 2026' rồi!",
      valid: false,
      reason:
        "Sai tên sự kiện trên hóa đơn! Tên chuẩn phải là 'BAV Spring Moments 2026'.",
    },
    {
      id: 3,
      title: "Hóa đơn mua quà tặng",
      desc: "Mua cúp lưu niệm cho 3 giải Hạng mục A, 3 giải Hạng mục B. Đầy đủ chữ ký, mộc đỏ.",
      valid: true,
    },
    {
      id: 4,
      title: "Giấy đề nghị thanh toán",
      desc: "Tiền taxi đi lại của Ban tổ chức, nhưng kẹp kèm toàn là... biên lai ăn phở, không có cuống vé taxi.",
      valid: false,
      reason: "Chứng từ gốc không hợp lệ, không chứng minh được nghiệp vụ.",
    },
    {
      id: 5,
      title: "Hóa đơn VAT #089",
      desc: "Mua văn phòng phẩm cho hoạt động của BAB Academic Club. MST công ty chính xác, ngày tháng hợp lệ.",
      valid: true,
    },
  ];

  // KIẾN THỨC KẾ TOÁN ÁP DỤNG THÔNG TƯ 99/2025/TT-BTC
  const entries = [
    {
      q: "Nghiệp vụ 1: Rút tiền từ tài khoản ngân hàng về nhập quỹ tiền mặt để chuẩn bị chi sự kiện.",
      dr: "111",
      cr: "112",
      rule: "Theo TT 99/2025/TT-BTC (hiệu lực 2026), TK 112 chuẩn hóa tên gọi là 'Tiền gửi không kỳ hạn'. Rút tiền nhập quỹ làm tăng Tiền mặt (Nợ 111) và giảm Tiền gửi (Có 112).",
    },
    {
      q: "Nghiệp vụ 2: Xuất quỹ tiền mặt 2.000.000đ tạm ứng cho nhân viên đi mua đồ dùng sự kiện.",
      dr: "141",
      cr: "111",
      rule: "Căn cứ hệ thống tài khoản TT 99/2025/TT-BTC, khoản tạm ứng cho người lao động thực hiện nhiệm vụ được ghi nhận tăng phải thu nội bộ. Ghi Nợ 141 / Có 111.",
    },
    {
      q: "Nghiệp vụ 3: Khách hàng thanh toán tiền nợ kỳ trước bằng hình thức chuyển khoản ngân hàng.",
      dr: "112",
      cr: "131",
      rule: "Theo nguyên tắc kế toán của TT 99/2025/TT-BTC, khi thu hồi được nợ, tài sản (Tiền gửi không kỳ hạn) tăng và Khoản phải thu giảm. Ghi Nợ 112 / Có 131.",
    },
  ];

  const handleSort = (isUserAccepting) => {
    const currentDoc = docs[docIdx];
    if (isUserAccepting === currentDoc.valid) {
      setScore((s) => s + 50);
      setFeedback("✅ Chuẩn luôn! Sếp ưng. (+50 XP)");
    } else {
      setFeedback(
        `❌ Ầu nâu! ${
          currentDoc.valid
            ? "Hóa đơn đẹp thế này mà lại chê à?"
            : `Bắt lỗi sai rồi: ${currentDoc.reason}`
        }`
      );
    }

    setTimeout(() => {
      setFeedback("");
      if (docIdx < docs.length - 1) setDocIdx(docIdx + 1);
      else setStep(2);
    }, 2500);
  };

  const handleSubmitEntry = () => {
    const currentTask = entries[entryIdx];

    // Khắc phục lỗi gõ nhầm dấu cách của người dùng
    const userDr = entry.dr.trim();
    const userCr = entry.cr.trim();

    if (userDr === currentTask.dr && userCr === currentTask.cr) {
      setScore((s) => s + 100);
      setFeedback("✅ Định khoản chính xác! (+100 XP)");
      setTimeout(() => {
        setFeedback("");
        if (entryIdx < entries.length - 1) {
          setEntryIdx(entryIdx + 1);
          setEntry({ dr: "", cr: "" });
        } else setStep(3);
      }, 1500);
    } else {
      setFeedback(
        `❌ AI Phát hiện lỗi: Hạch toán sai bản chất. \n💡 Giải thích: ${currentTask.rule}`
      );
      setTimeout(() => setFeedback(""), 5000); // Tăng thời gian hiển thị Luật để dễ đọc
    }
  };

  return (
    <div
      className="screen game-screen animate-scale-up"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <div
        className="nav-header glass"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", fontWeight: "bold" }}
        >
          ⬅ Thoát ca làm
        </button>
        <span style={{ fontWeight: "bold" }}>
          {step === 1
            ? "Phân loại chứng từ"
            : step === 2
            ? "Nhập liệu phần mềm"
            : "Báo cáo ngày"}
        </span>
        <div style={{ width: 24 }}></div>
      </div>

      <div className="game-board-interactive">
        <div className="game-status-bar">
          <span className="xp-text">🌟 XP: {score}</span>
          <span className="step-text">
            {step === 1
              ? `Chứng từ: ${docIdx + 1}/${docs.length}`
              : step === 2
              ? `Nghiệp vụ: ${entryIdx + 1}/${entries.length}`
              : "Hoàn thành"}
          </span>
        </div>

        {feedback && <div className="feedback-toast anim-fade">{feedback}</div>}

        {step === 1 && (
          // Thêm thuộc tính key để ép React tải lại, trị dứt điểm lỗi của Google Dịch
          <div className="task-container anim-up" key={`doc-${docIdx}`}>
            <h3 className="task-instruction">
              Kiểm tra chứng từ này có hợp lệ không?
            </h3>
            <div className="document-card">
              <div className="doc-stamp">HỒ SƠ {docIdx + 1}</div>
              <h2 className="doc-title">{docs[docIdx].title}</h2>
              <p className="doc-desc">{docs[docIdx].desc}</p>
              <div className="doc-footer">Phòng Kế toán - AccQuest Corp</div>
            </div>
            <div className="game-actions">
              <button className="btn-reject" onClick={() => handleSort(false)}>
                ❌ Trả lại
              </button>
              <button className="btn-accept" onClick={() => handleSort(true)}>
                ✅ Kẹp File
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          // Thuộc tính key={`task-${entryIdx}`} là vũ khí bí mật giúp câu hỏi luôn được làm mới
          <div className="task-container anim-up" key={`task-${entryIdx}`}>
            <h3 className="task-instruction">Hạch toán lên phần mềm</h3>
            <div className="document-card mini">
              <b>Yêu cầu:</b> {entries[entryIdx].q}
            </div>
            <div className="acc-form-interactive">
              <div className="input-group">
                <label>Nợ TK (Dr):</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 111"
                  value={entry.dr}
                  onChange={(e) => setEntry({ ...entry, dr: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Có TK (Cr):</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 112"
                  value={entry.cr}
                  onChange={(e) => setEntry({ ...entry, cr: e.target.value })}
                />
              </div>
            </div>
            <button className="btn-submit-entry" onClick={handleSubmitEntry}>
              💾 Lưu bút toán
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="task-container anim-up result-screen">
            <div className="trophy-icon">🏆</div>
            <h2>Nghiệm thu xuất sắc!</h2>
            <p>Sổ sách đã cân, chứng từ đã gọn. Tắt máy đi về thôi!</p>
            <div className="final-score">Tổng XP nhận được: {score}</div>
            <button className="btn-primary" onClick={onBack}>
              Quay lại sảnh chính
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// CÁC COMPONENT PHỤ TRỢ
// ==========================================
const VideoScreen = ({ lesson, onBack, lang, T }) => (
  <div
    className="screen video-screen"
    style={{ minHeight: "100vh", background: "white" }}
  >
    <div
      className="nav-header glass"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
      }}
    >
      <button onClick={onBack} style={{ background: "none", border: "none" }}>
        ⬅
      </button>
      <span style={{ fontWeight: "bold" }}>{T.video_title}</span>
      <div style={{ width: 24 }} />
    </div>
    <div className="video-frame">
      <iframe
        width="100%"
        height="250"
        src={`https://www.youtube.com/embed/${lesson.videoId}`}
        title="yt"
        frameBorder="0"
        allowFullScreen
      />
    </div>
    <div className="content-pad" style={{ padding: "20px" }}>
      <h3>{lang === "vi" ? lesson.title_vi : lesson.title_en}</h3>
      <div className="note-box" style={{ marginTop: "15px" }}>
        <textarea
          placeholder={T.note_ph}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        ></textarea>
      </div>
      <button className="btn-primary" onClick={onBack}>
        {T.btn_finish}
      </button>
    </div>
  </div>
);

const AIChat = ({ onBack, lang }) => {
  const [msg, setMsg] = useState([
    {
      s: "bot",
      t: lang === "vi" ? "Chào bạn! AccBot đây." : "Hello! AccBot here.",
    },
  ]);
  const [txt, setTxt] = useState("");
  return (
    <div
      className="screen chat-screen"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f8f9fa",
      }}
    >
      <div
        className="nav-header glass"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <button onClick={onBack} style={{ background: "none", border: "none" }}>
          ⬅
        </button>
        <span style={{ fontWeight: "bold" }}>AI Mentor</span>
        <div style={{ width: 24 }} />
      </div>
      <div
        className="chat-body"
        style={{ flex: 1, padding: "20px", overflowY: "auto" }}
      >
        {msg.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "10px",
              textAlign: m.s === "user" ? "right" : "left",
            }}
          >
            <span
              style={{
                background: m.s === "user" ? "#3b82f6" : "#e2e8f0",
                color: m.s === "user" ? "white" : "black",
                padding: "10px 15px",
                borderRadius: "15px",
                display: "inline-block",
              }}
            >
              {m.t}
            </span>
          </div>
        ))}
      </div>
      <div
        className="chat-footer"
        style={{
          padding: "15px",
          background: "white",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
        />
        <button
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "20px",
          }}
          onClick={() => {
            setMsg([
              ...msg,
              { s: "user", t: txt },
              { s: "bot", t: "Hạch toán vào TK 642." },
            ]);
            setTxt("");
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

const GameJourney = ({ onPlayGame, T }) => (
  <div className="anim-fade">
    <div
      className="game-intro-card"
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        textAlign: "center",
      }}
    >
      <h3>🚀 {T.game_intro_title}</h3>
      <p style={{ fontSize: "0.9rem", color: "#64748b", marginTop: "10px" }}>
        {T.game_intro_desc}
      </p>
    </div>
    <div className="journey-path">
      {GAME_JOURNEY.map((lvl, idx) => (
        <div key={lvl.id} className="journey-node-wrapper">
          {idx > 0 && <div className={`journey-line ${lvl.status}`}></div>}
          <div
            className={`journey-node ${lvl.status}`}
            onClick={() =>
              lvl.status === "active" ? onPlayGame() : alert(T.locked_msg)
            }
          >
            <div className="node-icon">{lvl.icon}</div>
            <div className="node-info">
              <h4>{lvl.rank}</h4>
              <p>{lvl.task}</p>
              <span className="xp-badge">{lvl.xp}</span>
            </div>
            <div className="node-action">
              {lvl.status === "active" ? (
                <button className="btn-play-sm">▶ {T.btn_play}</button>
              ) : (
                "🔒"
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SubjectDetail = ({ id, lang, onBack, onPlay, T }) => {
  const data = ALL_SUBJECTS[id] || ALL_SUBJECTS["nlkt"];
  return (
    <div
      className="screen subject-screen"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <div
        className="nav-header glass"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <button onClick={onBack} style={{ background: "none", border: "none" }}>
          ⬅
        </button>
        <span style={{ fontWeight: "bold" }}>
          {lang === "vi" ? data.name_vi : data.name_en}
        </span>
        <div style={{ width: 24 }} />
      </div>
      <div className="subject-hero-card">
        <div className="hero-left">
          <div className="subject-code">
            {data.id.substring(0, 2).toUpperCase()}
          </div>
        </div>
        <div className="hero-right">
          <h2>{lang === "vi" ? data.name_vi : data.name_en}</h2>
          <div className="progress-bar-sm">
            <div className="fill" style={{ width: `${data.progress}%` }}></div>
          </div>
          <small>{data.progress}%</small>
        </div>
      </div>
      <div className="lesson-list-container">
        <div className="section-label">{T.lesson_list}</div>
        {data.lessons.map((l, i) => (
          <div
            key={i}
            className={`lesson-card-item ${l.status}`}
            onClick={() =>
              l.status === "locked" ? alert(T.locked_msg) : onPlay(l)
            }
          >
            <div className="lesson-icon-box">
              {l.type === "video" ? "📺" : "🎮"}
            </div>
            <div className="lesson-info">
              <h4>{lang === "vi" ? l.title_vi : l.title_en}</h4>
              <span className="lesson-tag">{l.type.toUpperCase()}</span>
            </div>
            <div className="lesson-status">
              {l.status === "done" ? "✅" : l.status === "active" ? "▶️" : "🔒"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. STUDENT APP CHÍNH
// ==========================================
const StudentApp = ({ onLogout, userSchool }) => {
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useState("vi");
  const [selSub, setSelSub] = useState(null);
  const [play, setPlay] = useState(null);
  const [ai, setAi] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [user, setUser] = useState({
    name: "Lê Thị Bình",
    gems: 250,
    vip: false,
  });
  const T = DICT[lang];

  if (ai) return <AIChat onBack={() => setAi(false)} lang={lang} />;
  if (showTour)
    return (
      <TournamentScreen
        onBack={() => setShowTour(false)}
        userSchool={userSchool}
      />
    );
  if (play === "game") return <GameScreen onBack={() => setPlay(null)} T={T} />;
  if (play && typeof play === "object")
    return (
      <VideoScreen
        lesson={play}
        onBack={() => setPlay(null)}
        lang={lang}
        T={T}
      />
    );
  if (selSub)
    return (
      <SubjectDetail
        id={selSub}
        lang={lang}
        onBack={() => setSelSub(null)}
        onPlay={(l) => (l.type === "video" ? setPlay(l) : setPlay("game"))}
        T={T}
      />
    );

  const roadmapItems = ROADMAP_CONFIG[lang];

  return (
    <div className="app-shell">
      <div className="header glass">
        <div className="user">
          <div className="avt">👤</div>
          <div>
            <b>{user.name}</b>
            {user.vip && <span className="badge-pro">PRO</span>}
          </div>
        </div>
        <div className="wallet">💎 {user.gems}</div>
      </div>
      <div className="scroll-content">
        {tab === "home" && (
          <div className="anim-fade">
            <div className="brand-area">
              <img
                src={LOGO_URL}
                className="logo-center"
                alt="AccQuest"
                style={{
                  width: "120px",
                  margin: "0 auto 20px",
                  display: "block",
                }}
              />
            </div>
            <div className="lang-switch">
              <div
                className={`lang-opt ${lang === "vi" ? "active" : ""}`}
                onClick={() => setLang("vi")}
              >
                🇻🇳 Đại học
              </div>
              <div
                className={`lang-opt ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                🇬🇧 ACCA
              </div>
            </div>

            {/* THẺ ĐẤU TRƯỜNG B2B */}
            <div
              className="b2b-tournament-card anim-up"
              onClick={() => setShowTour(true)}
            >
              <div className="tour-header">
                <span className="tour-badge">
                  🏢 Đối tác: {userSchool || "Học viện Ngân hàng (BAV)"}
                </span>
                <span className="tour-live">🔴 LIVE</span>
              </div>
              <div className="tour-body">
                <h4>
                  Đấu trường: Olympic Kế toán {userSchool ? "2026" : "BAV 2026"}
                </h4>
                <p>
                  Không gian thi đấu ảo độc quyền của trường. Hiện có 1,240 sinh
                  viên đang tham gia.
                </p>
                <button className="btn-tour-join">Vào phòng thi ➔</button>
              </div>
            </div>

            <div className="streak-card" onClick={() => setAi(true)}>
              <div className="icon">🤖</div>
              <div className="text">
                <strong>AI Mentor</strong>
                <p>{T.ai_promo}</p>
              </div>
            </div>

            <h3 className="section-title">{T.roadmap}</h3>
            <div className="roadmap-list">
              {roadmapItems.map((item, idx) =>
                item.type === "header" ? (
                  <div key={idx} className="roadmap-header-divider">
                    {item.title}
                  </div>
                ) : (
                  <div
                    key={item.id}
                    className={`roadmap-card ${item.s}`}
                    onClick={() => setSelSub(item.id)}
                  >
                    <div className="card-left">{item.code}</div>
                    <div className="card-mid">
                      <h4>{item.t}</h4>
                      <p>{item.d}</p>
                    </div>
                    <div className="card-right">
                      {item.s === "done"
                        ? "✅"
                        : item.s === "active"
                        ? "▶️"
                        : "🔒"}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
        {tab === "game" && (
          <GameJourney onPlayGame={() => setPlay("game")} T={T} />
        )}
        {tab === "job" && (
          <div className="anim-fade">
            <h3 className="section-title">{T.job_hot}</h3>
            {JOBS_DATA.map((j) => (
              <div key={j.id} className="job-item">
                <div
                  className="j-logo"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    marginRight: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {j.logo}
                </div>
                <div className="j-info" style={{ flex: 1 }}>
                  <b>{j.title}</b>
                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "0.85rem",
                      color: "#64748b",
                    }}
                  >
                    {j.company}
                  </p>
                  <small>
                    📍 {j.loc} • {j.vip && !user.vip ? "VIP" : j.salary}
                  </small>
                </div>
                <button
                  className={`btn-apply ${j.vip ? "vip" : ""}`}
                  onClick={() =>
                    j.vip && !user.vip
                      ? setUser({ ...user, vip: true })
                      : alert("Applied!")
                  }
                >
                  {j.vip && !user.vip ? "🔒" : T.apply}
                </button>
              </div>
            ))}
          </div>
        )}
        {tab === "shop" && (
          <div className="anim-fade">
            <h3 className="section-title">{T.shop}</h3>
            <div
              className="shop-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              {SHOP_ITEMS.map((i) => (
                <div
                  key={i.id}
                  className="shop-item"
                  style={{ flexDirection: "column", textAlign: "center" }}
                >
                  <div
                    className="icon"
                    style={{ fontSize: "2rem", marginBottom: "10px" }}
                  >
                    {i.icon}
                  </div>
                  <b>{i.name}</b>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#64748b",
                      margin: "5px 0 10px",
                    }}
                  >
                    {i.desc}
                  </p>
                  <button
                    className="btn-buy"
                    style={{
                      background: "#fef3c7",
                      color: "#d97706",
                      border: "none",
                      padding: "5px 15px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {i.price} 💎
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "me" && (
          <div className="animate-fade-in profile-view">
            <div className="profile-header-lg">
              <div className="avt-lg">👤</div>
              <h3>{user.name}</h3>
              <p>
                {lang === "vi"
                  ? `Sinh viên K6 Kế toán A • ${userSchool || "BAB"}`
                  : `Student • ${userSchool || "Banking Academy"}`}
              </p>
            </div>

            <div className="stats-grid">
              <div className="stat-box">
                <b>3.8</b>
                <small>{T.stats_gpa}</small>
              </div>
              <div className="stat-box">
                <b>120</b>
                <small>{T.stats_hours}</small>
              </div>
              <div className="stat-box">
                <b>5</b>
                <small>{T.stats_courses}</small>
              </div>
            </div>

            {/* BỔ SUNG TÍNH NĂNG BI DASHBOARD (SKILL-BASED) */}
            <div
              className="bi-dashboard anim-up"
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "30px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                textAlign: "left",
              }}
            >
              <h4
                style={{
                  color: "#1e293b",
                  marginBottom: "5px",
                  fontSize: "1.1rem",
                }}
              >
                📊 Báo cáo Năng lực BI
              </h4>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#64748b",
                  marginBottom: "20px",
                }}
              >
                Dữ liệu được AI phân tích từ kết quả thực chiến game.
              </p>

              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  <span>Xử lý Chứng từ sống</span>
                  <span style={{ color: "#10b981" }}>90%</span>
                </div>
                <div
                  style={{
                    background: "#e2e8f0",
                    height: "8px",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      background: "#10b981",
                      height: "100%",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  <span>Hạch toán Kế toán</span>
                  <span style={{ color: "#3b82f6" }}>85%</span>
                </div>
                <div
                  style={{
                    background: "#e2e8f0",
                    height: "8px",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "85%",
                      background: "#3b82f6",
                      height: "100%",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  <span>Kê khai Thuế</span>
                  <span style={{ color: "#f59e0b" }}>60%</span>
                </div>
                <div
                  style={{
                    background: "#e2e8f0",
                    height: "8px",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "60%",
                      background: "#f59e0b",
                      height: "100%",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="profile-menu">
              <div className="p-item">📄 {T.cv}</div>
              <div className="p-item">🏆 {T.cert}</div>
              <div className="p-item danger" onClick={onLogout}>
                🚪 {T.logout}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bottom-nav glass">
        {["home", "game", "job", "shop", "me"].map((k) => (
          <div
            key={k}
            className={`nav-item ${tab === k ? "active" : ""}`}
            onClick={() => setTab(k)}
          >
            <div className="ni-icon">
              {k === "home"
                ? "🏠"
                : k === "game"
                ? "🎮"
                : k === "job"
                ? "💼"
                : k === "shop"
                ? "🛒"
                : "👤"}
            </div>
            <span>{DICT.vi[k] || DICT.en[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. RECRUITER APP B2B
// ==========================================
const RecruiterApp = ({ onLogout }) => {
  const [tab, setTab] = useState("dash");
  const [cands, setCands] = useState(REC_DATA.candidates);

  const handle = (id, newStatus) =>
    setCands(cands.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));

  return (
    <div className="b2b-layout">
      <div className="b2b-sidebar">
        <div className="b2b-logo">
          <span className="b2b-logo-icon">A</span> AccQuest B2B
        </div>
        <div className="b2b-nav">
          <div
            className={`b2b-nav-item ${tab === "dash" ? "active" : ""}`}
            onClick={() => setTab("dash")}
          >
            <span className="icon">📊</span> Dashboard
          </div>
          <div
            className={`b2b-nav-item ${tab === "jobs" ? "active" : ""}`}
            onClick={() => setTab("jobs")}
          >
            <span className="icon">📰</span> Jobs
          </div>
          <div
            className={`b2b-nav-item ${tab === "cands" ? "active" : ""}`}
            onClick={() => setTab("cands")}
          >
            <span className="icon">👥</span> Candidates
          </div>
          <div
            className={`b2b-nav-item ${tab === "profile" ? "active" : ""}`}
            onClick={() => setTab("profile")}
          >
            <span className="icon">🏢</span> Profile
          </div>
        </div>
        <div className="b2b-nav-bottom">
          <div className="b2b-nav-item" onClick={onLogout}>
            <span className="icon">🚪</span> Logout
          </div>
        </div>
      </div>

      <div className="b2b-main">
        <div className="b2b-topbar">
          <div className="b2b-company-info">
            <h2 className="b2b-company-name">{REC_DATA.company.name} Portal</h2>
            <span className="b2b-badge-partner">Partner</span>
          </div>
          <div className="b2b-top-actions">
            <span className="icon-btn">🔔</span>
            <span className="icon-btn">🔍</span>
            <div className="b2b-avatar">👤</div>
          </div>
        </div>

        <div className="b2b-content-area">
          {tab === "dash" && (
            <div className="anim-fade">
              <div className="b2b-kpi-grid">
                <div className="b2b-kpi-card">
                  <span className="kpi-icon-mini">📈</span>
                  <div className="kpi-value">{REC_DATA.kpi.views.val}</div>
                  <div className="kpi-label">Lượt xem tin</div>
                  <div className="kpi-growth success">
                    {REC_DATA.kpi.views.growth}
                  </div>
                </div>
                <div className="b2b-kpi-card">
                  <span className="kpi-icon-mini">📄</span>
                  <div className="kpi-value">{REC_DATA.kpi.applies.val}</div>
                  <div className="kpi-label">Lượt ứng tuyển</div>
                  <div className="kpi-growth success">
                    {REC_DATA.kpi.applies.growth}
                  </div>
                </div>
                <div className="b2b-kpi-card">
                  <span className="kpi-icon-mini">📅</span>
                  <div className="kpi-value">{REC_DATA.kpi.interview.val}</div>
                  <div className="kpi-label">Lượt mời PV</div>
                  <div className="kpi-growth neutral">
                    {REC_DATA.kpi.interview.growth}
                  </div>
                </div>
              </div>
              <div className="b2b-section-box">
                <h3 className="b2b-section-title">Ứng viên mới nhất</h3>
                <div className="b2b-cand-list">
                  {cands.slice(0, 2).map((c) => (
                    <div key={c.id} className="b2b-cand-row">
                      <div className="cand-info-group">
                        <div className="cand-avatar">🧑‍💼</div>
                        <div className="cand-details">
                          <h4>{c.name}</h4>
                          <p>
                            {c.school}{" "}
                            <span className="cand-skill-tag">{c.skill}</span>
                          </p>
                        </div>
                      </div>
                      <div className="cand-action-group">
                        {c.status === "pending" ? (
                          <>
                            <button
                              className="btn-b2b-reject"
                              onClick={() => handle(c.id, "rejected")}
                            >
                              ❌ Loại
                            </button>
                            <button
                              className="btn-b2b-interview"
                              onClick={() => handle(c.id, "interview")}
                            >
                              📅 Mời PV
                            </button>
                          </>
                        ) : (
                          <span className={`b2b-status-badge ${c.status}`}>
                            {c.status === "interview" ? "Đã mời PV" : "Đã loại"}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === "jobs" && (
            <div className="anim-fade b2b-section-box">
              <h3 className="b2b-section-title">Quản lý Tin tuyển dụng</h3>
              <div className="b2b-job-list">
                {REC_DATA.posts.map((p) => (
                  <div key={p.id} className="b2b-job-row">
                    <div>
                      <h4>{p.title}</h4>
                      <p>
                        {p.type} • {p.loc}
                      </p>
                      <small>
                        👀 {p.views} views | 📄 {p.cvs} CVs
                      </small>
                    </div>
                    <span className="b2b-status-badge active">{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "cands" && (
            <div className="anim-fade b2b-section-box">
              <h3 className="b2b-section-title">Tất cả Ứng viên</h3>
              <div className="b2b-cand-list">
                {cands.map((c) => (
                  <div key={c.id} className="b2b-cand-row">
                    <div className="cand-info-group">
                      <div className="cand-avatar">🧑‍💼</div>
                      <div className="cand-details">
                        <h4>{c.name}</h4>
                        <p>
                          {c.school} • GPA: {c.gpa}{" "}
                          <span className="cand-skill-tag">{c.skill}</span>
                        </p>
                        <small
                          style={{
                            color: "gray",
                            display: "block",
                            marginTop: "5px",
                          }}
                        >
                          Kinh nghiệm: {c.exp}{" "}
                          <b style={{ color: "#3b82f6", marginLeft: "10px" }}>
                            📊 Hệ thống BI: Phù hợp {c.biScore}
                          </b>
                        </small>
                      </div>
                    </div>
                    <div className="cand-action-group">
                      {c.status === "pending" ? (
                        <>
                          <button
                            className="btn-b2b-reject"
                            onClick={() => handle(c.id, "rejected")}
                          >
                            ❌ Loại
                          </button>
                          <button
                            className="btn-b2b-interview"
                            onClick={() => handle(c.id, "interview")}
                          >
                            📅 Mời PV
                          </button>
                        </>
                      ) : (
                        <span className={`b2b-status-badge ${c.status}`}>
                          {c.status === "interview" ? "Đã mời PV" : "Đã loại"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "profile" && (
            <div className="anim-fade b2b-section-box">
              <h3 className="b2b-section-title">Hồ sơ Doanh nghiệp</h3>
              <div className="b2b-profile-card">
                <div
                  className="cand-avatar"
                  style={{ width: 60, height: 60, fontSize: "2rem" }}
                >
                  🏢
                </div>
                <div>
                  <h2>{REC_DATA.company.name}</h2>
                  <p>
                    Số dư Kim cương:{" "}
                    <strong>{REC_DATA.company.credit} 💎</strong>
                  </p>
                  <button
                    className="btn-b2b-interview"
                    style={{ marginTop: 10 }}
                  >
                    Chỉnh sửa hồ sơ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. LOGIN CHÍNH (CÓ BƯỚC CHỌN TRƯỜNG)
// ==========================================
const Login = ({ onLogin }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [step, setStep] = useState("role");
  const [school, setSchool] = useState("Học viện Ngân hàng (BAV)");

  return (
    <div className="login-bg">
      <div className="login-card anim-up">
        <img src={LOGO_URL} width="100" alt="Logo" />
        <h2>AccQuest</h2>
        <p className="login-tag">Học Kế toán qua Game thực chiến</p>

        {step === "role" && (
          <div className="login-btns anim-fade">
            <button className="btn-role" onClick={() => setStep("school")}>
              🎓 Sinh viên
            </button>
            <button className="btn-role rec" onClick={() => onLogin("rec")}>
              🏢 Nhà tuyển dụng
            </button>
          </div>
        )}

        {step === "school" && (
          <div className="school-select-step anim-fade">
            <h4 style={{ marginBottom: "15px", color: "#1e293b" }}>
              Bạn đang học trường nào?
            </h4>
            <select
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "15px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                outline: "none",
              }}
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            >
              <option value="Học viện Ngân hàng (BAV)">
                Học viện Ngân hàng (BAV)
              </option>
              <option value="ĐH Kinh tế Quốc dân (NEU)">
                ĐH Kinh tế Quốc dân (NEU)
              </option>
              <option value="ĐH Ngoại thương (FTU)">
                ĐH Ngoại thương (FTU)
              </option>
              <option value="ĐH Kinh tế TP.HCM (UEH)">
                ĐH Kinh tế TP.HCM (UEH)
              </option>
              <option value="Khác...">Trường khác...</option>
            </select>
            <button
              className="btn-role"
              style={{ width: "100%" }}
              onClick={() => onLogin("stu", school)}
            >
              🚀 Bắt đầu trải nghiệm
            </button>
            <p
              style={{
                marginTop: "15px",
                fontSize: "0.85rem",
                color: "#64748b",
                cursor: "pointer",
              }}
              onClick={() => setStep("role")}
            >
              ⬅ Quay lại chọn vai trò
            </p>
          </div>
        )}

        {step === "role" && (
          <p className="info-link" onClick={() => setShowInfo(!showInfo)}>
            ℹ️ Về dự án AccQuest
          </p>
        )}

        {showInfo && step === "role" && (
          <div className="info-box anim-fade">
            <p>
              <b>AccQuest</b> là nền tảng Web-app kết hợp <b>Gamification</b>{" "}
              giúp sinh viên trải nghiệm công việc thực tế.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [role, setRole] = useState(null);
  const [userSchool, setUserSchool] = useState("");

  const handleLogin = (selectedRole, schoolName = "") => {
    setRole(selectedRole);
    if (schoolName) setUserSchool(schoolName);
  };

  return (
    <div className="App">
      {!role ? (
        <Login onLogin={handleLogin} />
      ) : role === "stu" ? (
        <StudentApp userSchool={userSchool} onLogout={() => setRole(null)} />
      ) : (
        <RecruiterApp onLogout={() => setRole(null)} />
      )}
    </div>
  );
}
