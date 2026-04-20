import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({ email, password });
    navigate("/");
  };

  if (loading) {
    return <main>Loading...</main>;
  }

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

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="w-full max-w-md p-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,26,25,0.7), rgba(23,22,21,0.9))",
          backdropFilter: "blur(14px)",
          border: "1px solid var(--color-border-soft)",
          borderRadius: "18px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        }}
      >
        {/* Heading */}
        <p
          className="text-[11px] tracking-[0.22em] uppercase mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          Welcome back
        </p>

        <h1
          className="text-[52px] leading-[1.05] mb-8"
          style={{
            color: "var(--color-primary)",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Sign in.
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-8">
            <label
              className="block text-[11px] uppercase mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none placeholder:opacity-60"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Password */}
          <div className="mb-10 relative">
            <label
              className="block text-[11px] uppercase mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pr-10 outline-none placeholder:opacity-60"
              style={inputBase}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-[60%] -translate-y-1/2 p-1 transition-all duration-200"
              style={{ color: "var(--color-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-secondary)")
              }
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Button */}
          <button
            className="w-full py-4 uppercase text-[11px] tracking-[0.22em] transition-all duration-200"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-bg)",
              borderRadius: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Continue
          </button>
        </form>

        {/* Footer */}
        <div
          className="mt-8 pt-6"
          style={{ borderTop: "1px solid var(--color-border-soft)" }}
        >
          <p style={{ color: "var(--color-secondary)" }}>
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--color-primary)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
