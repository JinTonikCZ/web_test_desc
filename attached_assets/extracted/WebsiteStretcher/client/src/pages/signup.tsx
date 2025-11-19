import { useState } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useLocation, Link } from "wouter";
import illustration from "@assets/generated_images/Person_listening_to_feedback_illustration_500cc096.png";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup
    console.log("Signup submitted");
    setLocation("/");
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-20 bg-gradient-to-t from-[#f6f6f8] to-white">
      <div className="w-full max-w-[1280px] bg-white rounded-[20px] overflow-hidden shadow-[6px_6px_20px_3px_rgba(219,217,221,0.15),-9px_0px_30px_0px_rgba(216,214,218,0.15)] flex flex-col md:flex-row min-h-[790px] stretch">
        
        {/* Signup Section */}
        <section className="flex-1 flex flex-col items-center justify-center gap-8 p-10 md:p-20 bg-gradient-to-br from-white via-[#ebeffd] to-[#ebeffd]">
          <div className="flex flex-col items-center gap-6 w-full max-w-[480px]">
            
            {/* Header */}
            <div className="flex flex-col items-center gap-4">
              <header>
                <h1 className="font-bold text-[#1f2937] text-[32px] leading-[23px]">
                  Create Account
                </h1>
              </header>
              <p className="font-normal text-[#6b7280] text-[18px] leading-[23px]">
                Join us to track your mood
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full" noValidate>
              
              {/* Email Input */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="email-input" className="font-medium text-[#1f2937] text-sm">
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
                <label htmlFor="password-input" className="font-medium text-[#1f2937] text-sm">
                  Password
                </label>
                <div className="flex items-center w-full bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden h-12 px-3 gap-2 focus-within:ring-2 focus-within:ring-[#3655ea] focus-within:border-transparent transition-all">
                  <input
                    id="password-input"
                    name="password"
                    placeholder="your_password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="flex-1 border-none bg-transparent outline-none text-[#6b7280] text-sm placeholder:text-[#6b7280]"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Password Validation */}
              <div className="flex w-full items-center justify-between gap-4 px-1">
                 <div className="flex items-center gap-2 text-[#6b7280] text-sm">
                    <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        <Check size={10} className="opacity-0" />
                    </div>
                    <span>8+ chars</span>
                 </div>
                 <div className="flex items-center gap-2 text-[#6b7280] text-sm">
                    <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        <Check size={10} className="opacity-0" />
                    </div>
                    <span>Number</span>
                 </div>
                 <div className="flex items-center gap-2 text-[#6b7280] text-sm">
                    <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        <Check size={10} className="opacity-0" />
                    </div>
                    <span>Symbol</span>
                 </div>
              </div>

              {/* Confirm Password Input */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="confirm-password" className="font-medium text-[#1f2937] text-sm">
                  Confirm Password
                </label>
                <div className="flex items-center w-full bg-white rounded-[10px] border border-[#ef4444] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden h-12 px-3 gap-2 focus-within:ring-2 focus-within:ring-[#ef4444] focus-within:border-transparent transition-all">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="flex-1 border-none bg-transparent outline-none text-[#6b7280] text-sm placeholder:text-[#6b7280]"
                    data-testid="input-confirm-password"
                  />
                   <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <span className="text-[#ef4444] text-sm font-normal" role="alert">Passwords do not match</span>
              </div>

              {/* Pet Name Input */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="pet-name" className="font-medium text-[#1f2937] text-sm">
                  Enter your pet's name
                </label>
                <div className="flex flex-col justify-center w-full bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden h-12 px-3 focus-within:ring-2 focus-within:ring-[#3655ea] focus-within:border-transparent transition-all">
                  <input
                    id="pet-name"
                    name="pet-name"
                    placeholder="It's name is"
                    type="text"
                    className="w-full border-none bg-transparent outline-none text-[#6b7280] text-sm placeholder:text-[#6b7280]"
                    data-testid="input-pet-name"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-[16px] w-full mt-2">
                <button
                  type="submit"
                  className="w-full h-12 flex items-center justify-center bg-[#3655ea] hover:bg-[#2845d9] active:bg-[#1e35c8] text-white font-bold text-base rounded-[10px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                  data-testid="button-signup"
                >
                  Sign up
                </button>
                
                <div className="flex w-full items-center justify-center">
                  <p className="font-normal text-[#1f2937] text-base flex gap-1">
                    Already have an account?
                    <Link 
                      href="/" 
                      className="font-bold text-[#607afb] hover:text-[#4a5fd9] hover:underline transition-colors"
                      data-testid="link-login"
                    >
                      Log in
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
