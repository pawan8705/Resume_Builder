/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
} from "lucide-react";
import { ResumeData } from "@/types/resume.types";
import { TEMPLATES } from "@/data/resumeBuilder.data";

interface Props {
  data: ResumeData;
  template: string;
}

/* ─── Shared section divider ─── */
function Divider({
  accent,
  style,
}: {
  accent: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        height: 1,
        background: `${accent}30`,
        margin: "8px 0 6px",
        ...style,
      }}
    />
  );
}

/* ─── MODERN template ─── */
function ModernTemplate({
  data,
  accent,
}: {
  data: ResumeData;
  accent: string;
}) {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 9,
        lineHeight: 1.5,
        color: "#1e293b",
        background: "#fff",
      }}
    >
      {/* Header with gradient */}
      <div
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
          padding: "22px 24px 18px",
          color: "#fff",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "-0.5px",
            marginBottom: 3,
          }}
        >
          {data.personal.name || "Your Name"}
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 500,
            opacity: 0.88,
            marginBottom: 10,
            letterSpacing: "0.3px",
          }}
        >
          {data.personal.title || "Professional Title"}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 14px",
            fontSize: 7.5,
            opacity: 0.9,
          }}
        >
          {data.personal.email && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Mail size={7} /> {data.personal.email}
            </span>
          )}
          {data.personal.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Phone size={7} /> {data.personal.phone}
            </span>
          )}
          {data.personal.location && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MapPin size={7} /> {data.personal.location}
            </span>
          )}
          {data.personal.linkedin && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Linkedin size={7} /> {data.personal.linkedin}
            </span>
          )}
          {data.personal.github && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Github size={7} /> {data.personal.github}
            </span>
          )}
          {data.personal.website && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Globe size={7} /> {data.personal.website}
            </span>
          )}
        </div>
      </div>
      <div style={{ padding: "14px 24px" }}>
        {data.personal.summary && (
          <>
            <SecHeader title="Summary" accent={accent} />
            <p
              style={{
                fontSize: 8,
                color: "#475569",
                lineHeight: 1.7,
                margin: "0 0 12px",
              }}
            >
              {data.personal.summary}
            </p>
          </>
        )}
        {data.experience.length > 0 && (
          <>
            <SecHeader title="Experience" accent={accent} />
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                  >
                    {e.role}
                  </span>
                  <span style={{ fontSize: 7, color: "#94a3b8" }}>
                    {e.start}
                    {e.start ? " — " : ""}
                    {e.current ? "Present" : e.end}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 7.5,
                    color: accent,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {e.company}
                </div>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 5,
                      fontSize: 7.5,
                      color: "#475569",
                      marginBottom: 2,
                      lineHeight: 1.55,
                    }}
                  >
                    <span style={{ color: accent, flexShrink: 0 }}>▸</span>
                    {b}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        <TwoCol
          left={
            <>
              {data.education.length > 0 && (
                <>
                  <SecHeader title="Education" accent={accent} />
                  {data.education.map((e) => (
                    <div key={e.id} style={{ marginBottom: 7 }}>
                      <div
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {e.school}
                      </div>
                      <div style={{ fontSize: 7.5, color: "#475569" }}>
                        {e.degree}
                        {e.field ? `, ${e.field}` : ""}
                        {e.gpa ? ` · GPA: ${e.gpa}` : ""}
                      </div>
                      <div style={{ fontSize: 7, color: "#94a3b8" }}>
                        {e.start}
                        {e.start && e.end ? " — " : ""}
                        {e.end}
                      </div>
                    </div>
                  ))}
                </>
              )}
              {data.certificates.length > 0 && (
                <>
                  <SecHeader title="Certifications" accent={accent} />
                  {data.certificates.map((c) => (
                    <div key={c.id} style={{ marginBottom: 5 }}>
                      <div
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {c.name}
                      </div>
                      <div style={{ fontSize: 7.5, color: "#64748b" }}>
                        {c.issuer}
                        {c.date ? ` · ${c.date}` : ""}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          }
          right={
            <>
              {data.skills.length > 0 && (
                <>
                  <SecHeader title="Skills" accent={accent} />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                      marginBottom: 12,
                    }}
                  >
                    {data.skills.map((s) => (
                      <span
                        key={s.id}
                        style={{
                          padding: "2px 8px",
                          borderRadius: 999,
                          background: `${accent}15`,
                          color: accent,
                          fontSize: 7.5,
                          fontWeight: 600,
                          border: `1px solid ${accent}25`,
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {data.projects.length > 0 && (
                <>
                  <SecHeader title="Projects" accent={accent} />
                  {data.projects.map((p) => (
                    <div key={p.id} style={{ marginBottom: 7 }}>
                      <div
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {p.name}
                      </div>
                      {p.description && (
                        <div
                          style={{
                            fontSize: 7.5,
                            color: "#475569",
                            marginBottom: 2,
                          }}
                        >
                          {p.description}
                        </div>
                      )}
                      {p.tech && (
                        <div style={{ fontSize: 7, color: accent }}>
                          🛠 {p.tech}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          }
        />
      </div>
    </div>
  );
}

/* ─── MINIMAL template ─── */
function MinimalTemplate({
  data,
  accent,
}: {
  data: ResumeData;
  accent: string;
}) {
  return (
    <div
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 9,
        lineHeight: 1.6,
        color: "#1a1a1a",
        background: "#fff",
      }}
    >
      <div
        style={{
          padding: "28px 28px 16px",
          borderBottom: `2px solid ${accent}`,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            color: "#0f172a",
            marginBottom: 2,
          }}
        >
          {data.personal.name || "Your Name"}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#475569",
            marginBottom: 8,
            fontStyle: "italic",
          }}
        >
          {data.personal.title || "Professional Title"}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3px 16px",
            fontSize: 7.5,
            color: "#64748b",
          }}
        >
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
          {data.personal.website && <span>{data.personal.website}</span>}
        </div>
      </div>
      <div style={{ padding: "16px 28px" }}>
        {data.personal.summary && (
          <>
            <MinSecHeader title="Profile" accent={accent} />
            <p
              style={{
                fontSize: 8,
                color: "#374151",
                lineHeight: 1.8,
                margin: "0 0 12px",
                fontStyle: "italic",
              }}
            >
              {data.personal.summary}
            </p>
          </>
        )}
        {data.experience.length > 0 && (
          <>
            <MinSecHeader title="Experience" accent={accent} />
            {data.experience.map((e) => (
              <div
                key={e.id}
                style={{
                  marginBottom: 10,
                  paddingLeft: 12,
                  borderLeft: `2px solid ${accent}25`,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                  >
                    {e.role}{" "}
                    <span style={{ fontWeight: 400, color: "#475569" }}>
                      at {e.company}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 7,
                      color: "#94a3b8",
                      fontStyle: "italic",
                    }}
                  >
                    {e.start}
                    {e.start ? " – " : ""}
                    {e.current ? "Present" : e.end}
                  </span>
                </div>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 7.5,
                      color: "#374151",
                      marginTop: 2,
                      paddingLeft: 8,
                    }}
                  >
                    — {b}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        {data.education.length > 0 && (
          <>
            <MinSecHeader title="Education" accent={accent} />
            {data.education.map((e) => (
              <div key={e.id} style={{ marginBottom: 6 }}>
                <div
                  style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                >
                  {e.degree}
                  {e.field ? `, ${e.field}` : ""}
                </div>
                <div style={{ fontSize: 7.5, color: "#475569" }}>
                  {e.school}
                  {e.gpa ? ` — GPA: ${e.gpa}` : ""}
                </div>
                <div
                  style={{ fontSize: 7, color: "#94a3b8", fontStyle: "italic" }}
                >
                  {e.start}
                  {e.start && e.end ? " – " : ""}
                  {e.end}
                </div>
              </div>
            ))}
          </>
        )}
        {data.skills.length > 0 && (
          <>
            <MinSecHeader title="Skills" accent={accent} />
            <p style={{ fontSize: 8, color: "#374151", lineHeight: 1.8 }}>
              {data.skills.map((s) => s.name).join(" · ")}
            </p>
          </>
        )}
        {data.projects.length > 0 && (
          <>
            <MinSecHeader title="Projects" accent={accent} />
            {data.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 6 }}>
                <div
                  style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                >
                  {p.name}
                </div>
                {p.description && (
                  <div style={{ fontSize: 7.5, color: "#374151" }}>
                    {p.description}
                  </div>
                )}
                {p.tech && (
                  <div
                    style={{
                      fontSize: 7,
                      color: "#94a3b8",
                      fontStyle: "italic",
                    }}
                  >
                    {p.tech}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        {data.certificates.length > 0 && (
          <>
            <MinSecHeader title="Certifications" accent={accent} />
            {data.certificates.map((c) => (
              <div key={c.id} style={{ marginBottom: 5 }}>
                <span
                  style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                >
                  {c.name}
                </span>
                <span style={{ fontSize: 7.5, color: "#64748b" }}>
                  {" "}
                  — {c.issuer}
                  {c.date ? ` (${c.date})` : ""}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── CLASSIC template ─── */
function ClassicTemplate({
  data,
  accent,
}: {
  data: ResumeData;
  accent: string;
}) {
  return (
    <div
      style={{
        fontFamily: "'Times New Roman', serif",
        fontSize: 9,
        lineHeight: 1.5,
        color: "#1a1a2e",
        background: "#fff",
      }}
    >
      {/* Centered header */}
      <div
        style={{
          textAlign: "center",
          padding: "22px 28px 14px",
          borderBottom: `3px double ${accent}`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#0f172a",
            marginBottom: 4,
          }}
        >
          {data.personal.name || "YOUR NAME"}
        </div>
        <div
          style={{
            fontSize: 9.5,
            color: accent,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {data.personal.title || "Professional Title"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "3px 16px",
            fontSize: 7.5,
            color: "#475569",
          }}
        >
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>|</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>|</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
          {data.personal.linkedin && <span>|</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
      </div>
      <div style={{ padding: "14px 28px" }}>
        {data.personal.summary && (
          <>
            <ClassicHeader title="Objective" accent={accent} />
            <p
              style={{
                fontSize: 8,
                color: "#374151",
                lineHeight: 1.75,
                margin: "0 0 10px",
                textAlign: "justify",
              }}
            >
              {data.personal.summary}
            </p>
          </>
        )}
        {data.experience.length > 0 && (
          <>
            <ClassicHeader title="Professional Experience" accent={accent} />
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 10 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 8.5,
                        fontWeight: 700,
                        color: "#0f172a",
                        textTransform: "uppercase",
                      }}
                    >
                      {e.company}
                    </span>
                    <span style={{ fontSize: 8, color: "#475569" }}>
                      {" "}
                      — {e.role}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 7.5,
                      color: "#64748b",
                      fontStyle: "italic",
                    }}
                  >
                    {e.start}
                    {e.start ? " to " : ""}
                    {e.current ? "Present" : e.end}
                  </span>
                </div>
                <ul style={{ margin: "4px 0 0 14px", padding: 0 }}>
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 7.5,
                        color: "#374151",
                        marginBottom: 2,
                        lineHeight: 1.6,
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        {data.education.length > 0 && (
          <>
            <ClassicHeader title="Education" accent={accent} />
            {data.education.map((e) => (
              <div key={e.id} style={{ marginBottom: 6 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 8.5,
                        fontWeight: 700,
                        color: "#0f172a",
                        textTransform: "uppercase",
                      }}
                    >
                      {e.school}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 7.5,
                      color: "#64748b",
                      fontStyle: "italic",
                    }}
                  >
                    {e.start}
                    {e.start && e.end ? " — " : ""}
                    {e.end}
                  </span>
                </div>
                <div style={{ fontSize: 7.5, color: "#475569" }}>
                  {e.degree}
                  {e.field ? `, ${e.field}` : ""}
                  {e.gpa ? ` | GPA: ${e.gpa}` : ""}
                </div>
              </div>
            ))}
          </>
        )}
        {data.skills.length > 0 && (
          <>
            <ClassicHeader title="Skills" accent={accent} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
              {data.skills.map((s) => (
                <span key={s.id} style={{ fontSize: 7.5, color: "#374151" }}>
                  • {s.name}
                </span>
              ))}
            </div>
          </>
        )}
        {data.projects.length > 0 && (
          <>
            <ClassicHeader title="Projects" accent={accent} />
            {data.projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 6 }}>
                <span
                  style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                >
                  {p.name}:{" "}
                </span>
                {p.description && (
                  <span style={{ fontSize: 7.5, color: "#374151" }}>
                    {p.description}
                  </span>
                )}
                {p.tech && (
                  <span style={{ fontSize: 7, color: "#64748b" }}>
                    {" "}
                    [{p.tech}]
                  </span>
                )}
              </div>
            ))}
          </>
        )}
        {data.certificates.length > 0 && (
          <>
            <ClassicHeader title="Certifications" accent={accent} />
            {data.certificates.map((c) => (
              <div key={c.id} style={{ marginBottom: 4 }}>
                <span
                  style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                >
                  {c.name}
                </span>
                <span style={{ fontSize: 7.5, color: "#64748b" }}>
                  , {c.issuer}
                  {c.date ? ` (${c.date})` : ""}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── CREATIVE template ─── */
function CreativeTemplate({
  data,
  accent,
}: {
  data: ResumeData;
  accent: string;
}) {
  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 9,
        lineHeight: 1.5,
        color: "#1e293b",
        background: "#fff",
        display: "grid",
        gridTemplateColumns: "38% 62%",
        minHeight: "100%",
      }}
    >
      {/* Left sidebar */}
      <div style={{ background: accent, padding: "24px 18px", color: "#fff" }}>
        {/* Avatar circle */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 900,
            marginBottom: 12,
          }}
        >
          {(data.personal.name || "?")[0]}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: "-0.3px",
            marginBottom: 2,
            lineHeight: 1.2,
          }}
        >
          {data.personal.name || "Your Name"}
        </div>
        <div
          style={{
            fontSize: 8.5,
            opacity: 0.85,
            marginBottom: 14,
            fontWeight: 500,
          }}
        >
          {data.personal.title || "Title"}
        </div>

        {/* Contact */}
        <div style={{ fontSize: 8, marginBottom: 14 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              opacity: 0.7,
              marginBottom: 6,
            }}
          >
            Contact
          </div>
          {data.personal.email && (
            <div
              style={{ marginBottom: 3, opacity: 0.9, wordBreak: "break-all" }}
            >
              {data.personal.email}
            </div>
          )}
          {data.personal.phone && (
            <div style={{ marginBottom: 3, opacity: 0.9 }}>
              {data.personal.phone}
            </div>
          )}
          {data.personal.location && (
            <div style={{ marginBottom: 3, opacity: 0.9 }}>
              {data.personal.location}
            </div>
          )}
          {data.personal.linkedin && (
            <div
              style={{ marginBottom: 3, opacity: 0.9, wordBreak: "break-all" }}
            >
              {data.personal.linkedin}
            </div>
          )}
          {data.personal.github && (
            <div
              style={{ marginBottom: 3, opacity: 0.9, wordBreak: "break-all" }}
            >
              {data.personal.github}
            </div>
          )}
          {data.personal.website && (
            <div
              style={{ marginBottom: 3, opacity: 0.9, wordBreak: "break-all" }}
            >
              {data.personal.website}
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                opacity: 0.7,
                marginBottom: 8,
              }}
            >
              Skills
            </div>
            {data.skills.map((s) => (
              <div key={s.id} style={{ marginBottom: 6 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                    fontSize: 7.5,
                    fontWeight: 600,
                  }}
                >
                  <span>{s.name}</span>
                  <span style={{ opacity: 0.7 }}>{s.level}%</span>
                </div>
                <div
                  style={{
                    height: 3,
                    background: "rgba(255,255,255,0.25)",
                    borderRadius: 999,
                  }}
                >
                  <div
                    style={{
                      width: `${s.level}%`,
                      height: "100%",
                      background: "rgba(255,255,255,0.85)",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certs */}
        {data.certificates.length > 0 && (
          <div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                opacity: 0.7,
                marginBottom: 6,
              }}
            >
              Certifications
            </div>
            {data.certificates.map((c) => (
              <div key={c.id} style={{ marginBottom: 5 }}>
                <div style={{ fontSize: 7.5, fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 7, opacity: 0.75 }}>
                  {c.issuer}
                  {c.date ? ` · ${c.date}` : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right content */}
      <div style={{ padding: "24px 20px" }}>
        {data.personal.summary && (
          <div
            style={{
              marginBottom: 14,
              padding: "10px 12px",
              background: `${accent}08`,
              borderLeft: `3px solid ${accent}`,
              borderRadius: "0 8px 8px 0",
            }}
          >
            <p
              style={{
                fontSize: 8,
                color: "#374151",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {data.personal.summary}
            </p>
          </div>
        )}
        {data.experience.length > 0 && (
          <>
            <CrtvHeader title="Experience" accent={accent} />
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{ fontSize: 8.5, fontWeight: 800, color: "#0f172a" }}
                  >
                    {e.role}
                  </span>
                  <span style={{ fontSize: 7, color: accent, fontWeight: 600 }}>
                    {e.start}
                    {e.start ? " – " : ""}
                    {e.current ? "Now" : e.end}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 7.5,
                    color: accent,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {e.company}
                </div>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 5,
                      fontSize: 7.5,
                      color: "#475569",
                      marginBottom: 2,
                    }}
                  >
                    <span style={{ color: accent }}>→</span>
                    {b}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        {data.education.length > 0 && (
          <>
            <CrtvHeader title="Education" accent={accent} />
            {data.education.map((e) => (
              <div key={e.id} style={{ marginBottom: 7 }}>
                <div
                  style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                >
                  {e.school}
                </div>
                <div style={{ fontSize: 7.5, color: "#475569" }}>
                  {e.degree}
                  {e.field ? `, ${e.field}` : ""}
                  {e.gpa ? ` · GPA ${e.gpa}` : ""}
                </div>
                <div style={{ fontSize: 7, color: "#94a3b8" }}>
                  {e.start}
                  {e.start && e.end ? " – " : ""}
                  {e.end}
                </div>
              </div>
            ))}
          </>
        )}
        {data.projects.length > 0 && (
          <>
            <CrtvHeader title="Projects" accent={accent} />
            {data.projects.map((p) => (
              <div
                key={p.id}
                style={{
                  marginBottom: 7,
                  padding: "6px 8px",
                  background: `${accent}06`,
                  borderRadius: 6,
                }}
              >
                <div
                  style={{ fontSize: 8.5, fontWeight: 700, color: "#0f172a" }}
                >
                  {p.name}
                </div>
                {p.description && (
                  <div
                    style={{ fontSize: 7.5, color: "#475569", marginBottom: 2 }}
                  >
                    {p.description}
                  </div>
                )}
                {p.tech && (
                  <div style={{ fontSize: 7, color: accent, fontWeight: 600 }}>
                    🛠 {p.tech}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── EXECUTIVE template ─── */
function ExecutiveTemplate({
  data,
  accent,
}: {
  data: ResumeData;
  accent: string;
}) {
  const dark = "#1c1c2e";
  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        fontSize: 9,
        lineHeight: 1.6,
        color: "#1a1a2e",
        background: "#fff",
      }}
    >
      {/* Dark executive header */}
      <div
        style={{ background: dark, padding: "26px 28px 20px", color: "#fff" }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "1px",
            marginBottom: 4,
            color: "#fff",
          }}
        >
          {data.personal.name || "Your Name"}
        </div>
        <div
          style={{
            fontSize: 11,
            color: accent,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 12,
            fontWeight: 500,
          }}
        >
          {data.personal.title || "Executive Title"}
        </div>
        <div
          style={{ height: 1, background: `${accent}60`, marginBottom: 12 }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 20px",
            fontSize: 7.5,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          {data.personal.email && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Mail size={7} /> {data.personal.email}
            </span>
          )}
          {data.personal.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Phone size={7} /> {data.personal.phone}
            </span>
          )}
          {data.personal.location && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <MapPin size={7} /> {data.personal.location}
            </span>
          )}
          {data.personal.linkedin && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Linkedin size={7} /> {data.personal.linkedin}
            </span>
          )}
          {data.personal.github && (
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Github size={7} /> {data.personal.github}
            </span>
          )}
        </div>
      </div>
      <div style={{ padding: "16px 28px" }}>
        {data.personal.summary && (
          <>
            <ExecHeader title="Executive Summary" accent={accent} dark={dark} />
            <p
              style={{
                fontSize: 8.5,
                color: "#374151",
                lineHeight: 1.9,
                margin: "0 0 14px",
                borderLeft: `3px solid ${accent}`,
                paddingLeft: 10,
                fontStyle: "italic",
              }}
            >
              {data.personal.summary}
            </p>
          </>
        )}
        {data.experience.length > 0 && (
          <>
            <ExecHeader
              title="Professional Experience"
              accent={accent}
              dark={dark}
            />
            {data.experience.map((e) => (
              <div key={e.id} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: dark,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {e.role}
                  </span>
                  <span
                    style={{
                      fontSize: 7.5,
                      color: "#64748b",
                      fontStyle: "italic",
                    }}
                  >
                    {e.start}
                    {e.start ? " – " : ""}
                    {e.current ? "Present" : e.end}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: accent,
                    fontWeight: 600,
                    marginBottom: 5,
                    letterSpacing: "0.3px",
                  }}
                >
                  {e.company}
                </div>
                {e.bullets.filter(Boolean).map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 6,
                      fontSize: 8,
                      color: "#374151",
                      marginBottom: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{ color: accent, flexShrink: 0, fontWeight: 700 }}
                    >
                      ■
                    </span>
                    {b}
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <div>
            {data.education.length > 0 && (
              <>
                <ExecHeader title="Education" accent={accent} dark={dark} />
                {data.education.map((e) => (
                  <div key={e.id} style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        fontSize: 8.5,
                        fontWeight: 700,
                        color: dark,
                        textTransform: "uppercase",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {e.school}
                    </div>
                    <div style={{ fontSize: 7.5, color: "#475569" }}>
                      {e.degree}
                      {e.field ? `, ${e.field}` : ""}
                    </div>
                    <div style={{ fontSize: 7, color: "#94a3b8" }}>
                      {e.start}
                      {e.start && e.end ? " – " : ""}
                      {e.end}
                      {e.gpa ? ` · GPA ${e.gpa}` : ""}
                    </div>
                  </div>
                ))}
              </>
            )}
            {data.certificates.length > 0 && (
              <>
                <ExecHeader
                  title="Certifications"
                  accent={accent}
                  dark={dark}
                />
                {data.certificates.map((c) => (
                  <div key={c.id} style={{ marginBottom: 5 }}>
                    <div
                      style={{ fontSize: 8.5, fontWeight: 700, color: dark }}
                    >
                      {c.name}
                    </div>
                    <div style={{ fontSize: 7.5, color: "#64748b" }}>
                      {c.issuer}
                      {c.date ? ` · ${c.date}` : ""}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div>
            {data.skills.length > 0 && (
              <>
                <ExecHeader
                  title="Core Competencies"
                  accent={accent}
                  dark={dark}
                />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {data.skills.map((s) => (
                    <span
                      key={s.id}
                      style={{
                        padding: "2px 8px",
                        borderRadius: 3,
                        background: `${accent}12`,
                        color: accent,
                        fontSize: 7.5,
                        fontWeight: 600,
                        border: `1px solid ${accent}30`,
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </>
            )}
            {data.projects.length > 0 && (
              <>
                <ExecHeader title="Key Projects" accent={accent} dark={dark} />
                {data.projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: 6 }}>
                    <div
                      style={{ fontSize: 8.5, fontWeight: 700, color: dark }}
                    >
                      {p.name}
                    </div>
                    {p.description && (
                      <div style={{ fontSize: 7.5, color: "#475569" }}>
                        {p.description}
                      </div>
                    )}
                    {p.tech && (
                      <div style={{ fontSize: 7, color: accent }}>{p.tech}</div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */
function SecHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 6,
        marginTop: 2,
      }}
    >
      <span
        style={{
          fontSize: 8,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: accent,
        }}
      >
        {title}
      </span>
      <div style={{ flex: 1, height: 1, background: `${accent}30` }} />
    </div>
  );
}
function MinSecHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div
      style={{
        fontSize: 9,
        fontWeight: 700,
        color: accent,
        textTransform: "uppercase",
        letterSpacing: "2px",
        margin: "10px 0 5px",
        paddingBottom: 3,
        borderBottom: `1px solid ${accent}40`,
      }}
    >
      {title}
    </div>
  );
}
function ClassicHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div
      style={{
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "2px",
        color: "#0f172a",
        margin: "10px 0 5px",
        borderBottom: `2px solid ${accent}`,
        paddingBottom: 2,
      }}
    >
      {title}
    </div>
  );
}
function CrtvHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 6,
        marginTop: 2,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          background: accent,
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 9,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "#0f172a",
        }}
      >
        {title}
      </span>
      <div style={{ flex: 1, height: 1, background: `${accent}25` }} />
    </div>
  );
}
function ExecHeader({
  title,
  accent,
  dark,
}: {
  title: string;
  accent: string;
  dark: string;
}) {
  return (
    <div
      style={{
        fontSize: 8.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "2px",
        color: dark,
        margin: "12px 0 6px",
        paddingBottom: 3,
        borderBottom: `1px solid ${accent}50`,
      }}
    >
      {title}
    </div>
  );
}
function TwoCol({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        marginTop: 4,
      }}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

/* ─── MAIN EXPORT ─── */
export default function LivePreview({ data, template }: Props) {
  const tmpl = TEMPLATES.find((t) => t.id === template) || TEMPLATES[0];
  const accent = tmpl.accent;

  if (template === "minimal")
    return <MinimalTemplate data={data} accent={accent} />;
  if (template === "classic")
    return <ClassicTemplate data={data} accent={accent} />;
  if (template === "creative")
    return <CreativeTemplate data={data} accent={accent} />;
  if (template === "executive")
    return <ExecutiveTemplate data={data} accent={accent} />;
  return <ModernTemplate data={data} accent={accent} />;
}
