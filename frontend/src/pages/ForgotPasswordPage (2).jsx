import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, ShieldCheck, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const { setCurrentPage, showToast } = useApp();

  // Workflow steps: 1 = Email Input, 2 = OTP & New Password Input, 3 = Success Confirmation
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes countdown

  useEffect(() => {
    let interval = null;
    if (step === 2 && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timerSeconds]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.forgotPassword(email);
      setIsLoading(false);

      if (res.success) {
        showToast(`OTP Code sent to ${email}`);
        setStep(2);
        setTimerSeconds(600);
      } else {
        showToast(res.message || 'Failed to send OTP code');
      }
    } catch (err) {
      setIsLoading(false);
      showToast('Error connecting to backend authentication service');
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await api.forgotPassword(email);
      setIsLoading(false);
      if (res.success) {
        showToast('New OTP Code sent to your email!');
        setTimerSeconds(600);
      } else {
        showToast(res.message || 'Could not resend OTP code');
      }
    } catch (err) {
      setIsLoading(false);
      showToast('Error resending OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length < 4) {
      showToast('Please enter the verification OTP code sent to your email');
      return;
    }
    if (!newPassword || newPassword.length < 4) {
      showToast('Password must be at least 4 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.resetPassword(email, otp, newPassword);
      setIsLoading(false);

      if (res.success) {
        showToast('Password reset successfully!');
        setStep(3);
      } else {
        showToast(res.message || 'Invalid or expired OTP code');
      }
    } catch (err) {
      setIsLoading(false);
      showToast('Error resetting password');
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Top Back Navigation Bar */}
      <div style={{ width: '100%', maxWidth: '440px', marginBottom: '1rem' }}>
        <button 
          onClick={() => setCurrentPage('auth')} 
          className="btn btn-secondary"
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.825rem', minHeight: '36px' }}
        >
          <ArrowLeft size={16} /> Back to Sign In
        </button>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(186, 12, 47, 0.12)',
            border: '1px solid var(--border-active)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem auto'
          }}>
            {step === 3 ? (
              <CheckCircle2 size={28} color="#10B981" />
            ) : step === 2 ? (
              <ShieldCheck size={28} color="hsl(var(--hue-primary), 85%, 50%)" />
            ) : (
              <KeyRound size={28} color="hsl(var(--hue-primary), 85%, 50%)" />
            )}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.2rem' }}>
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Enter Verification OTP'}
            {step === 3 && 'Password Reset Complete!'}
          </h2>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {step === 1 && 'Enter your registered email to receive a 6-digit OTP code.'}
            {step === 2 && `We sent a security code to ${email}`}
            {step === 3 && 'Your password has been updated. You can now log in.'}
          </p>
        </div>

        {/* STEP 1: Request Email OTP */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="tatukulaedukondalu@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.65rem 0.65rem 2.2rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isLoading}
              style={{ padding: '0.75rem', fontSize: '0.875rem', minHeight: '44px', width: '100%' }}
            >
              {isLoading ? 'Sending OTP Code...' : 'Send OTP Code'}
            </button>
          </form>
        )}

        {/* STEP 2: Enter OTP & New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Countdown timer alert */}
            <div style={{
              background: 'rgba(186, 12, 47, 0.08)',
              border: '1px solid var(--border-active)',
              borderRadius: 'var(--radius-md)',
              padding: '0.65rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.78rem'
            }}>
              <span>OTP Expires in: <strong style={{ color: 'hsl(var(--hue-primary), 85%, 50%)' }}>{formatTimer(timerSeconds)}</strong></span>
              <button 
                type="button" 
                onClick={handleResendOtp} 
                className="btn btn-secondary" 
                style={{ padding: '0.2rem 0.55rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <RefreshCw size={12} /> Resend OTP
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>6-Digit OTP Code</label>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-active)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  letterSpacing: '4px',
                  textAlign: 'center',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 2.4rem 0.65rem 2.2rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.65rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.2rem'
                  }}
                  title={showNewPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showNewPassword ? <Eye size={16} color="hsl(var(--hue-primary), 85%, 50%)" /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 2.4rem 0.65rem 2.2rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.65rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.2rem'
                  }}
                  title={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showConfirmPassword ? <Eye size={16} color="hsl(var(--hue-primary), 85%, 50%)" /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isLoading}
              style={{ padding: '0.75rem', fontSize: '0.875rem', minHeight: '44px', width: '100%', marginTop: '0.4rem' }}
            >
              {isLoading ? 'Verifying & Updating...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* STEP 3: Success Confirmation State */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              fontSize: '0.85rem',
              color: '#10B981',
              fontWeight: 700
            }}>
              Your password has been successfully reset! You can now log into your account using your new credentials.
            </div>

            <button 
              onClick={() => setCurrentPage('auth')} 
              className="btn btn-primary"
              style={{ padding: '0.75rem', fontSize: '0.875rem', width: '100%', minHeight: '44px' }}
            >
              Proceed to Sign In
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
