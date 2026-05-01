import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview.js";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState(null);
  const [errors, setErrors] = useState({
    jobDescription: false,
    resume: false,
  });
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const jobCharCount = jobDescription.length;

  // ── Same input style pattern as Login ──────────────────
  const inputBase = {
    background: "transparent",
    color: "var(--color-primary)",
    borderBottom: "1px solid var(--color-border)",
    transition: "all 0.25s ease",
  };

  const handleFocus = (e) => {
    e.target.style.borderBottom = "1px solid var(--color-accent)";
    e.target.style.boxShadow = "0 6px 20px var(--color-glow)";
  };

  const handleBlur = (e) => {
    e.target.style.borderBottom = "1px solid var(--color-border)";
    e.target.style.boxShadow = "none";
  };

  const validate = () => {
    const resumeFile = resumeInputRef.current?.files[0];
    const newErrors = {
      jobDescription: !jobDescription.trim(),
      resume: !resumeFile,
    };
    setErrors(newErrors);
    return !newErrors.jobDescription && !newErrors.resume;
  };

  const handleGenerateReport = async () => {
    if (!validate()) return;
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : null);
    if (file) setErrors((prev) => ({ ...prev, resume: false }));
  };

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-bg)" }}
      >
        <p
          className="text-[11px] tracking-[0.15em] uppercase"
          style={{ color: "var(--color-secondary)" }}
        >
          Generating your interview plan…
        </p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center px-6 pt-16 pb-12 gap-10"
      style={{ background: "var(--color-bg)" }}
    >
      {/* ── Page Header ───────────────────────────────────── */}
      <header className="text-center max-w-[560px]">
        <p
          className="text-[11px] tracking-[0.22em] uppercase mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          AI-Powered Preparation
        </p>
        <h1
          className="text-[clamp(2.6rem,6vw,4rem)] leading-[1.05] font-normal mb-4"
          style={{
            color: "var(--color-primary)",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Build your strategy.
        </h1>
        <p
          className="text-[0.9rem] leading-[1.7]"
          style={{ color: "var(--color-secondary)" }}
        >
          Paste the job description and share your profile — we'll craft a
          personalised interview plan in ~30 seconds.
        </p>
      </header>

      {/* ── Main Card ─────────────────────────────────────── */}
      <div
        className="w-full max-w-[900px] overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,26,25,0.7), rgba(23,22,21,0.9))",
          backdropFilter: "blur(14px)",
          border: "1px solid var(--color-border-soft)",
          borderRadius: "18px",
          boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
        }}
      >
        {/* Body: two columns */}
        <div className="flex min-h-[480px] flex-wrap">
          {/* ── Left Panel — Job Description ── */}
          <div
            className="flex-[1_1_300px] p-8 pb-6 flex flex-col gap-4"
            style={{ borderRight: "1px solid var(--color-border-soft)" }}
          >
            {/* Panel heading */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[0.7rem] tracking-[0.18em] uppercase"
                style={{ color: "var(--color-accent)" }}
              >
                01
              </span>
              <h2
                className="text-[0.95rem] font-medium flex-1 m-0"
                style={{ color: "var(--color-primary)" }}
              >
                Target Role
              </h2>
              <span
                className="text-[0.65rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded"
                style={{
                  background: "rgba(214,195,163,0.1)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(214,195,163,0.2)",
                }}
              >
                Required
              </span>
            </div>

            <label
              className="block text-[11px] tracking-[0.18em] uppercase mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Job Description
            </label>

            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder={`Paste the full job description…\ne.g. "Senior Frontend Engineer at Google — React, TypeScript, system design…"`}
              maxLength={5000}
              rows={12}
              className="w-full outline-none resize-none px-1 py-2 placeholder:opacity-60"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <p
              className="text-[0.72rem] text-right -mt-2"
              style={{ color: "var(--color-secondary)" }}
            >
              {jobCharCount} / 5000
            </p>
          </div>

          {/* ── Right Panel — Profile ── */}
          <div className="flex-[1_1_300px] p-8 pb-6 flex flex-col gap-5">
            {/* Panel heading */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[0.7rem] tracking-[0.18em] uppercase"
                style={{ color: "var(--color-accent)" }}
              >
                02
              </span>
              <h2
                className="text-[0.95rem] font-medium m-0"
                style={{ color: "var(--color-primary)" }}
              >
                Your Profile
              </h2>
            </div>

            {/* Upload Resume */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label
                  className="text-[11px] tracking-[0.18em] uppercase m-0"
                  style={{ color: "var(--color-primary)" }}
                >
                  Resume
                </label>
                <span
                  className="text-[0.65rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(214,195,163,0.1)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(214,195,163,0.2)",
                  }}
                >
                  Required
                </span>
              </div>

              <label
                htmlFor="resume"
                className="flex flex-col items-center justify-center gap-1.5 py-5 px-4 rounded-[10px] cursor-pointer transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1.5px dashed ${errors.resume ? "#c77e7e" : fileName ? "var(--color-accent)" : "var(--color-border)"}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.background = "rgba(214,195,163,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = errors.resume
                    ? "#c77e7e"
                    : fileName
                      ? "var(--color-accent)"
                      : "var(--color-border)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                </svg>
                <p
                  className="m-0 text-[0.82rem] font-medium"
                  style={{
                    color: fileName
                      ? "var(--color-accent-strong)"
                      : "var(--color-primary)",
                  }}
                >
                  {fileName || "Click to upload or drag & drop"}
                </p>
                <p
                  className="m-0 text-[0.72rem]"
                  style={{ color: "var(--color-secondary)" }}
                >
                  PDF or DOCX · Max 5MB
                </p>
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                />
              </label>

              {errors.resume && (
                <p className="text-[0.72rem] mt-1" style={{ color: "#c77e7e" }}>
                  Resume is required.
                </p>
              )}
            </div>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{ background: "var(--color-border-soft)" }}
              />
              <span
                className="text-[0.7rem] tracking-[0.12em] uppercase"
                style={{ color: "var(--color-secondary)" }}
              >
                or
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "var(--color-border-soft)" }}
              />
            </div>

            {/* Self Description */}
            <div>
              <label
                className="block text-[11px] tracking-[0.18em] uppercase mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                Quick Self-Description
              </label>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                rows={4}
                placeholder="Briefly describe your experience, key skills, and years of experience…"
                className="w-full outline-none resize-none px-1 py-2 placeholder:opacity-60"
                style={inputBase}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Info note */}
            <div
              className="flex items-start gap-2 px-4 py-3 rounded-lg"
              style={{
                background: "rgba(74,110,196,0.06)",
                border: "1px solid rgba(74,110,196,0.18)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#4a6ec4"
                className="shrink-0 mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line
                  x1="12"
                  y1="8"
                  x2="12"
                  y2="12"
                  stroke="#0E0D0C"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="16"
                  x2="12.01"
                  y2="16"
                  stroke="#0E0D0C"
                  strokeWidth="2"
                />
              </svg>
              <p
                className="m-0 text-[0.78rem] leading-[1.55]"
                style={{ color: "#8ab4f8" }}
              >
                A{" "}
                <strong style={{ color: "var(--color-primary)" }}>
                  Resume
                </strong>{" "}
                is required.{" "}
                <strong style={{ color: "var(--color-primary)" }}>
                  Self-Description
                </strong>{" "}
                is optional but adds more context.
              </p>
            </div>
          </div>
        </div>

        {/* ── Card Footer ──────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-8 py-[1.1rem] flex-wrap gap-4"
          style={{ borderTop: "1px solid var(--color-border-soft)" }}
        >
          <p
            className="text-[0.75rem] m-0 tracking-[0.05em]"
            style={{ color: "var(--color-secondary)" }}
          >
            AI-Powered Strategy Generation · ~30 seconds
          </p>
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-7 py-3.5 text-[11px] font-semibold tracking-[0.22em] uppercase border-none cursor-pointer transition-all duration-200"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-bg)",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            Generate My Plan
          </button>
        </div>
      </div>

      {/* ── Recent Reports ────────────────────────────────── */}
      {reports.length > 0 && (
        <section className="w-full max-w-[900px]">
          <p
            className="text-[11px] tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            Recent Plans
          </p>
          <div className="flex gap-3 flex-wrap">
            {reports.map((report) => (
              <div
                key={report._id}
                onClick={() => navigate(`/interview/${report._id}`)}
                className="flex-[1_1_220px] px-6 py-5 flex flex-col gap-1.5 cursor-pointer transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(28,26,25,0.7), rgba(23,22,21,0.9))",
                  border: "1px solid var(--color-border-soft)",
                  borderRadius: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(214,195,163,0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--color-border-soft)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h3
                  className="text-[0.9rem] font-medium m-0"
                  style={{ color: "var(--color-primary)" }}
                >
                  {report.title || "Untitled Position"}
                </h3>
                <p
                  className="text-[0.75rem] m-0"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleDateString()
                    : "No Date"}
                </p>
                <p
                  className="text-[0.75rem] font-semibold m-0"
                  style={{
                    color:
                      report.matchScore >= 80
                        ? "#7ec77e"
                        : report.matchScore >= 60
                          ? "var(--color-accent)"
                          : "#c77e7e",
                  }}
                >
                  Match: {report.matchScore}%
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Page Footer ───────────────────────────────────── */}
      <footer className="flex gap-6 mt-2">
        {["Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-[0.75rem] no-underline transition-colors duration-200 tracking-[0.04em]"
            style={{ color: "var(--color-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-secondary)")
            }
          >
            {item}
          </a>
        ))}
      </footer>
    </main>
  );
};

export default Home;
