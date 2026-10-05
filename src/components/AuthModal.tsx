import React, { useState } from 'react';
import { X, CheckCircle2, Lock, Mail, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E3EB] bg-[#F7F9FC]">
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 fill-current text-[#131722]"
              viewBox="0 0 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 22H7V11h7v11zm11-16h-7v22h7V6zm11 8h-7v14h7V14zM0 27h3.5c1.9 0 3.5-1.6 3.5-3.5S5.4 20 3.5 20H0v7z" />
            </svg>
            <span className="font-bold text-base text-[#131722]">Welcome to TradingView</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787B86] hover:text-[#131722] hover:bg-[#E0E3EB] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#E8F5EE] text-[#089981] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#131722]">Welcome aboard!</h3>
            <p className="text-sm text-[#787B86]">
              Your account is ready with $100,000 in paper trading funds and real-time world market feeds.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-[#131722]">Start charting for free</h3>
              <p className="text-xs text-[#787B86]">
                Join 60M+ traders exploring global markets, technical indicators & paper trading.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setSuccess(true);
                  setTimeout(() => {
                    setSuccess(false);
                    onClose();
                  }, 1200);
                }}
                className="w-full py-2.5 px-4 border border-[#E0E3EB] hover:bg-[#F0F3FA] rounded-xl text-sm font-semibold text-[#131722] flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSuccess(true);
                  setTimeout(() => {
                    setSuccess(false);
                    onClose();
                  }, 1200);
                }}
                className="w-full py-2.5 px-4 border border-[#E0E3EB] hover:bg-[#F0F3FA] rounded-xl text-sm font-semibold text-[#131722] flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.08 1.74-.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E0E3EB] w-full" />
              <span className="bg-white px-2 text-[11px] text-[#787B86] uppercase absolute">Or</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-[#F0F3FA] rounded-xl px-3.5 py-2.5 text-sm text-[#131722] outline-none focus:ring-2 focus:ring-[#2962FF]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-sm text-white btn-gradient transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>Sign Up Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[11px] text-center text-[#787B86]">
              By signing up, you agree to TradingView's Terms of Service and Privacy Policy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
