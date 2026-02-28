import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { TEMPLATES } from "@/data/resumeBuilder.data";

interface Props {
  open: boolean;
  current: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function TemplateSwitcher({
  open,
  current,
  onSelect,
  onClose,
}: Props) {
  const { theme } = useAppSelector((s) => s.theme);
  const isDark = theme === "dark";

  const txt = isDark ? "#f1f5f9" : "#0f172a";
  const sub = isDark ? "#64748b" : "#94a3b8";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 20,
              background: isDark ? "#0e0e1c" : "#fff",
              border: `1px solid ${border}`,
              padding: 24,
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: txt,
                    marginBottom: 3,
                  }}
                >
                  Choose Template
                </h3>
                <p style={{ fontSize: 12, color: sub }}>
                  Pick a style that fits your industry
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  border: "none",
                  background: isDark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: sub,
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Templates Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 12,
              }}
            >
              {TEMPLATES.map((t) => {
                const isActive = current === t.id;
                return (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      onSelect(t.id);
                      onClose();
                    }}
                    style={{
                      borderRadius: 14,
                      border: `2px solid ${isActive ? t.accent : border}`,
                      background: isActive ? `${t.accent}10` : "transparent",
                      cursor: "pointer",
                      padding: "14px 12px",
                      textAlign: "center",
                      position: "relative",
                      transition: "all 0.2s",
                    }}
                  >
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: t.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check size={10} color="#fff" />
                      </div>
                    )}

                    {/* Mini preview */}
                    <div
                      style={{
                        height: 64,
                        borderRadius: 8,
                        background: isDark
                          ? "rgba(255,255,255,0.04)"
                          : "#f8fafc",
                        border: `1px solid ${border}`,
                        marginBottom: 10,
                        overflow: "hidden",
                        padding: 6,
                      }}
                    >
                      <div
                        style={{
                          height: 14,
                          borderRadius: 3,
                          background: t.accent,
                          marginBottom: 4,
                        }}
                      />
                      {[1, 0.7, 0.5].map((w, i) => (
                        <div
                          key={i}
                          style={{
                            height: 4,
                            borderRadius: 2,
                            background: isDark
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.08)",
                            width: `${w * 100}%`,
                            marginBottom: 3,
                          }}
                        />
                      ))}
                    </div>

                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: isActive ? t.accent : txt,
                        marginBottom: 2,
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: 10, color: sub }}>
                      {t.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
