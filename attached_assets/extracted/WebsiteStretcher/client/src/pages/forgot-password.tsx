import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLocation, Link } from "wouter";
import illustration from "@assets/generated_images/Person_listening_to_feedback_illustration_500cc096.png";

export default function ForgotPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password reset
    console.log("Password reset submitted");
    setLocation("/");
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-20 bg-gradient-to-t from-[#f6f6f8] to-white">
      <div className="w-full max-w-[1280px] bg-white rounded-[20px] overflow-hidden shadow-[6px_6px_20px_3px_rgba(219,217,221,0.15),-9px_0px_30px_0px_rgba(216,214,218,0.15)] flex flex-col md:flex-row min-h-[790px] stretch">
        
        {/* Form Section */}
        <section className="flex-1 flex flex-col items-center justify-center gap-8 p-10 md:p-20 bg-gradient-to-br from-white via-[#ebeffd] to-[#ebeffd]">
          <div className="flex flex-col items-center gap-8 w-full max-w-[480px]">
            
            {/* Icon & Header */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#3655ea1a] flex items-center justify-center">
                 {/* Flower icon placeholder using lucide/svg */}
                 <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3655ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16" stroke="#3655ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="#3655ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
              <header>
                <h1 className="font-bold text-[#1f2937] text-[32px] leading-[40px] text-center">
                  Forgot your password?
                </h1>
              </header>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[30px] w-full" noValidate>
              
              {/* Pet Name Input */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="pet-name" className="font-medium text-[#110d1b] text-sm">
                  Enter your pet's name
                </label>
                <div className="flex flex-col justify-center w-full bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden h-12 px-3 focus-within:ring-2 focus-within:ring-[#3655ea] focus-within:border-transparent transition-all">
                  <input
                    id="pet-name"
                    name="pet-name"
                    placeholder="Its name is..."
                    type="text"
                    autoComplete="off"
                    required
                    className="w-full border-none bg-transparent outline-none text-[#110d1b] text-sm placeholder:text-[#6b7280]"
                    data-testid="input-pet-name"
                  />
                </div>
              </div>

              {/* New Password Input */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="new-password" className="font-medium text-[#110d1b] text-sm">
                  New Password
                </label>
                <div className="flex items-center w-full bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden h-12 px-3 gap-2 focus-within:ring-2 focus-within:ring-[#3655ea] focus-within:border-transparent transition-all">
                  <input
                    id="new-password"
                    name="new-password"
                    placeholder="Enter new password"
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="flex-1 border-none bg-transparent outline-none text-[#110d1b] text-sm placeholder:text-[#6b7280]"
                    data-testid="input-new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Input */}
              <div className="flex flex-col items-start gap-1.5 w-full">
                <label htmlFor="confirm-new-password" className="font-medium text-[#110d1b] text-sm">
                  Confirm New Password
                </label>
                <div className="flex items-center w-full bg-white rounded-[10px] border border-[#e5e7eb] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden h-12 px-3 gap-2 focus-within:ring-2 focus-within:ring-[#3655ea] focus-within:border-transparent transition-all">
                  <input
                    id="confirm-new-password"
                    name="confirm-new-password"
                    placeholder="Repeat new password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="flex-1 border-none bg-transparent outline-none text-[#110d1b] text-sm placeholder:text-[#6b7280]"
                    data-testid="input-confirm-new-password"
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
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-[30px] w-full mt-4">
                <button
                  type="submit"
                  className="w-full h-12 flex items-center justify-center bg-[#3655ea] hover:bg-[#2845d9] active:bg-[#1e35c8] text-white font-bold text-base rounded-[10px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
                  data-testid="button-submit"
                >
                  Submit
                </button>
                
                <Link 
                  href="/" 
                  className="font-bold text-[#607afb] text-base hover:text-[#4a5fd9] hover:underline transition-colors"
                  data-testid="link-back-login"
                >
                  Back to Login
                </Link>
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
