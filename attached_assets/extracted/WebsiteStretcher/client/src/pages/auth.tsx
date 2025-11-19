import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLocation, Link } from "wouter";
import illustration from "@assets/generated_images/Person_listening_to_feedback_illustration_500cc096.png";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect to analytics
    console.log("Login submitted");
    setLocation("/analytics");
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-20 bg-gradient-to-t from-[#f6f6f8] to-white">
      <div className="w-full max-w-[1280px] bg-white rounded-[20px] overflow-hidden shadow-[6px_6px_20px_3px_rgba(219,217,221,0.15),-9px_0px_30px_0px_rgba(216,214,218,0.15)] flex flex-col md:flex-row min-h-[790px] stretch">
        {/* Login Section */}
        <section className="flex-1 flex flex-col items-center justify-center gap-[86px] p-10 md:p-20 bg-gradient-to-br from-white via-[#ebeffd] to-[#ebeffd]">
          <div className="flex flex-col items-center gap-[30px] w-full max-w-[480px]">
            {/* Logo & Header */}
            <div className="flex items-center gap-4">
              {/* Placeholder for logo.svg */}
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                EF
              </div>
              <header>
                <h1 className="font-bold text-[#1f2937] text-[32px] leading-[23px]">
                  Emotional Flow
                </h1>
              </header>
            </div>

            {/* Welcome Text */}
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-bold text-[#1f2937] text-[48px] leading-[1.2] text-center">
                Welcome!
              </h2>
              <p className="font-normal text-[#6b7280] text-[18px] leading-[23px]">
                Ready to track your mood today?
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-[30px] w-full"
              noValidate
            >
              {/* Email Input */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label
                  htmlFor="email-input"
                  className="font-medium text-[#1f2937] text-sm"
                >
                  Email address
                </label>
                <div className="flex flex-col justify-center w-full bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden h-12 px-3 focus-within:ring-2 focus-within:ring-[#3655ea] focus-within:border-transparent transition-all">
                  <input
                    id="email-input"
                    name="email"
                    placeholder="your@mail.com"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full border-none bg-transparent outline-none text-[#6b7280] text-sm placeholder:text-[#6b7280]"
                    data-testid="input-email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label
                  htmlFor="password-input"
                  className="font-medium text-[#1f2937] text-sm"
                >
                  Password
                </label>
                <div className="flex items-center w-full bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden h-12 px-3 gap-2 focus-within:ring-2 focus-within:ring-[#3655ea] focus-within:border-transparent transition-all">
                  <input
                    id="password-input"
                    name="password"
                    placeholder="your_password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="flex-1 border-none bg-transparent outline-none text-[#6b7280] text-sm placeholder:text-[#6b7280]"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Toggle password visibility"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-[30px] w-full">
                <button
                  type="submit"
                  className="w-full h-12 flex items-center justify-center bg-[#3655ea] hover:bg-[#2845d9] active:bg-[#1e35c8] text-white font-bold text-base rounded-[10px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                  data-testid="button-login"
                >
                  Login
                </button>

                <div className="flex w-full items-center justify-between px-4">
                  <Link
                    href="/forgot-password"
                    className="font-bold text-[#607afb] text-base hover:text-[#4a5fd9] hover:underline transition-colors"
                    data-testid="link-forgot-password"
                  >
                    Forgot password?
                  </Link>
                  <p className="font-normal text-[#1f2937] text-base flex gap-1">
                    Don't have an account?
                    <Link
                      href="/signup"
                      className="font-bold text-[#607afb] hover:text-[#4a5fd9] hover:underline transition-colors"
                      data-testid="link-signup"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Illustration Section */}
        <aside
          className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#3655ea1a] relative overflow-hidden"
          aria-label="Decorative illustration"
        >
          <img
            src={illustration}
            alt="Person listening to feedback illustration"
            className="w-[90%] max-w-[565px] object-contain drop-shadow-xl"
          />
        </aside>
      </div>
    </main>
  );
}
