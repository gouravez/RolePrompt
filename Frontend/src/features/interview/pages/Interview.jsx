import React, { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

// ── QuestionCard ──────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-lg overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: "var(--color-surface-2)",
        border: `1px solid ${open ? "var(--color-accent)" : "var(--color-border)"}`,
        boxShadow: open ? "0 0 0 1px var(--color-glow)" : "none",
      }}
    >
      <div
        className="flex items-start gap-3 px-4 py-3 cursor-pointer select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="shrink-0 text-[0.65rem] font-bold px-[0.4rem] py-[0.15rem] rounded mt-[2px]"
          style={{
            color: "var(--color-accent-strong)",
            backgroundColor: "rgba(214,195,163,0.08)",
            border: "1px solid rgba(214,195,163,0.2)",
          }}
        >
          Q{index + 1}
        </span>

        <p
          className="flex-1 m-0 text-sm font-medium leading-relaxed"
          style={{ color: "var(--color-primary)" }}
        >
          {item.question}
        </p>

        <span
          className="shrink-0 mt-[2px] flex items-center transition-transform duration-200"
          style={{
            color: open ? "var(--color-accent)" : "var(--color-secondary)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {open && (
        <div
          className="px-4 pb-4 pt-3 flex flex-col gap-3"
          style={{
            borderTop: "1px solid var(--color-border)",
            animation: "fadeSlideIn 0.2s ease both",
          }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-[0.65rem] font-bold uppercase tracking-widest px-2 py-[0.15rem] rounded w-fit"
              style={{
                color: "#c4b5fd",
                backgroundColor: "rgba(196,181,253,0.08)",
                border: "1px solid rgba(196,181,253,0.18)",
              }}
            >
              Intention
            </span>
            <p
              className="m-0 text-[0.83rem] leading-relaxed"
              style={{ color: "var(--color-secondary)" }}
            >
              {item.intention}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span
              className="text-[0.65rem] font-bold uppercase tracking-widest px-2 py-[0.15rem] rounded w-fit"
              style={{
                color: "#6ee7b7",
                backgroundColor: "rgba(110,231,183,0.08)",
                border: "1px solid rgba(110,231,183,0.18)",
              }}
            >
              Model Answer
            </span>
            <p
              className="m-0 text-[0.83rem] leading-relaxed"
              style={{ color: "var(--color-secondary)" }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── RoadMapDay ────────────────────────────────────────────────────────────────
const RoadMapDay = ({ day }) => (
  <div className="flex flex-col gap-2 py-3 pl-14 pr-2 relative">
    <span
      className="absolute left-[21px] top-[1.1rem] w-[13px] h-[13px] rounded-full border-2"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-accent)",
        boxShadow: "0 0 8px var(--color-glow)",
      }}
    />

    <div className="flex items-center gap-2">
      <span
        className="text-[0.65rem] font-bold px-2 py-[0.1rem] rounded-full"
        style={{
          color: "var(--color-accent-strong)",
          backgroundColor: "rgba(214,195,163,0.08)",
          border: "1px solid rgba(214,195,163,0.2)",
        }}
      >
        Day {day.day}
      </span>
      <h3
        className="m-0 text-[0.95rem] font-semibold"
        style={{ color: "var(--color-primary)" }}
      >
        {day.focus}
      </h3>
    </div>

    <ul className="m-0 p-0 list-none flex flex-col gap-[0.35rem]">
      {day.tasks.map((task, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-[0.84rem] leading-relaxed"
          style={{ color: "var(--color-secondary)" }}
        >
          <span
            className="shrink-0 w-[5px] h-[5px] rounded-full mt-2"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

// ── SectionHeader ─────────────────────────────────────────────────────────────
const SectionHeader = ({ title, count }) => (
  <div
    className="flex items-baseline gap-3 mb-6 pb-4"
    style={{ borderBottom: "1px solid var(--color-border)" }}
  >
    <h2
      className="m-0 text-[1.05rem] font-bold"
      style={{ color: "var(--color-primary)" }}
    >
      {title}
    </h2>
    <span
      className="text-[0.75rem] px-3 py-[0.15rem] rounded-full"
      style={{
        color: "var(--color-secondary)",
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
      }}
    >
      {count}
    </span>
  </div>
);

// ── Interview ─────────────────────────────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, loading, getResumePdf, getReportById } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  const scoreColor =
    report?.matchScore >= 80
      ? "#6ee7b7"
      : report?.matchScore >= 60
        ? "#fbbf24"
        : "#f87171";

  const skillPalette = {
    high: {
      color: "#f87171",
      bg: "rgba(248,113,113,0.08)",
      border: "rgba(248,113,113,0.22)",
    },
    medium: {
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.08)",
      border: "rgba(251,191,36,0.22)",
    },
    low: {
      color: "#6ee7b7",
      bg: "rgba(110,231,183,0.08)",
      border: "rgba(110,231,183,0.22)",
    },
  };

  if (loading || !report) {
    return (
      <main
        className="w-full min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-primary)",
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{
              borderColor: "var(--color-accent)",
              borderTopColor: "transparent",
            }}
          />
          <p
            className="text-sm m-0"
            style={{ color: "var(--color-secondary)" }}
          >
            Loading your interview plan…
          </p>
        </div>
      </main>
    );
  }

  return (
    <div
      className="w-full min-h-screen flex items-stretch p-5 box-border"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-primary)",
      }}
    >
      <div
        className="flex w-full max-w-[1280px] mx-auto rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* ── Left Nav ── */}
        <nav
          className="w-[220px] shrink-0 flex flex-col justify-between p-6"
          style={{ borderRight: "1px solid var(--color-border)" }}
        >
          <div className="flex flex-col gap-1">
            <p
              className="text-[0.68rem] font-semibold uppercase tracking-widest px-3 mb-2 m-0"
              style={{ color: "var(--color-secondary)" }}
            >
              Sections
            </p>

            {NAV_ITEMS.map((item) => {
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className="flex items-center gap-2 w-full px-3 py-[0.6rem] rounded-lg text-left text-sm font-medium transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: active
                      ? "rgba(214,195,163,0.07)"
                      : "transparent",
                    color: active
                      ? "var(--color-accent-strong)"
                      : "var(--color-secondary)",
                    border: active
                      ? "1px solid rgba(214,195,163,0.15)"
                      : "1px solid transparent",
                    boxShadow: active ? "0 0 12px var(--color-glow)" : "none",
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    className="shrink-0 flex items-center"
                    style={{
                      color: active
                        ? "var(--color-accent)"
                        : "var(--color-secondary)",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Download Resume */}
          <button
            onClick={() => getResumePdf(interviewId)}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-150"
            style={{
              backgroundColor: "rgba(214,195,163,0.08)",
              color: "var(--color-accent-strong)",
              border: "1px solid rgba(214,195,163,0.18)",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(214,195,163,0.15)";
              e.currentTarget.style.boxShadow = "0 0 16px var(--color-glow)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(214,195,163,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg
              height="0.8rem"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Download Resume
          </button>
        </nav>

        {/* ── Center Content ── */}
        <main
          className="flex-1 px-8 py-7 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 2.5rem)", paddingBottom: "5rem" }}
        >
          {activeNav === "technical" && (
            <section style={{ animation: "fadeSlideIn 0.2s ease both" }}>
              <SectionHeader
                title="Technical Questions"
                count={`${report.technicalQuestions.length} questions`}
              />
              <div className="flex flex-col gap-3">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section style={{ animation: "fadeSlideIn 0.2s ease both" }}>
              <SectionHeader
                title="Behavioral Questions"
                count={`${report.behavioralQuestions.length} questions`}
              />
              <div className="flex flex-col gap-3">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section style={{ animation: "fadeSlideIn 0.2s ease both" }}>
              <SectionHeader
                title="Preparation Road Map"
                count={`${report.preparationPlan.length}-day plan`}
              />
              <div className="relative flex flex-col">
                <div
                  className="absolute left-[28px] top-0 bottom-0 w-[2px] rounded pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, var(--color-accent), rgba(214,195,163,0.04))",
                  }}
                />
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── Right Sidebar ── */}
        <aside
          className="w-[240px] shrink-0 p-6 flex flex-col gap-5"
          style={{ borderLeft: "1px solid var(--color-border)" }}
        >
          {/* Match Score */}
          <div className="flex flex-col gap-3">
            <p
              className="m-0 text-[0.7rem] font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-secondary)" }}
            >
              Match Score
            </p>
            <div className="flex justify-center">
              <div
                className="w-[88px] h-[88px] rounded-full flex flex-col items-center justify-center border-[3px]"
                style={{
                  borderColor: scoreColor,
                  boxShadow: `0 0 20px ${scoreColor}40`,
                }}
              >
                <span
                  className="text-[1.6rem] font-extrabold leading-none"
                  style={{ color: "var(--color-primary)" }}
                >
                  {report.matchScore}
                </span>
                <span
                  className="text-[0.7rem] -mt-[2px]"
                  style={{ color: "var(--color-secondary)" }}
                >
                  %
                </span>
              </div>
            </div>
            <p
              className="m-0 text-[0.73rem] text-center"
              style={{ color: scoreColor }}
            >
              {report.matchScore >= 80
                ? "Strong match for this role"
                : report.matchScore >= 60
                  ? "Decent match for this role"
                  : "Needs improvement"}
            </p>
          </div>

          <div
            className="h-px"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          {/* Skill Gaps */}
          <div className="flex flex-col gap-3">
            <p
              className="m-0 text-[0.7rem] font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-secondary)" }}
            >
              Skill Gaps
            </p>
            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => {
                const p = skillPalette[gap.severity] ?? skillPalette.medium;
                return (
                  <span
                    key={i}
                    className="text-[0.75rem] font-medium px-3 py-[0.3rem] rounded-md"
                    style={{
                      color: p.color,
                      backgroundColor: p.bg,
                      border: `1px solid ${p.border}`,
                    }}
                  >
                    {gap.skill}
                  </span>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
