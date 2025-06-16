import React, { useState, useEffect, useRef } from 'react';
import Icon from 'components/AppIcon';

const OTPVerification = ({ phoneNumber, onComplete, onBack, setErrors, isLoading }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus the OTP input field
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // OTP countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    
    // Clear errors when user starts typing
    if (setErrors) {
      setErrors({});
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' });
      return;
    }
    
    onComplete({ otp });
  };

  const handleResendOTP = () => {
    if (!canResend || isResending) return;
    
    setIsResending(true);
    
    // Simulate OTP resend API call
    setTimeout(() => {
      setTimeLeft(60);
      setCanResend(false);
      setIsResending(false);
      
      // If possible, focus on the OTP input field
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* OTP Header */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Smartphone" size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Verify Your Phone Number
        </h3>
        <p className="text-text-secondary">
          We've sent a verification code to
        </p>
        <p className="text-primary font-medium">
          +91 {phoneNumber}
        </p>
      </div>

      {/* OTP Input */}
      <form onSubmit={handleVerify}>
        <div className="mb-6">
          <label className="form-label">
            <Icon name="Lock" size={16} className="inline mr-2" /> 
            Enter 6-digit OTP
          </label>
          <input
            ref={inputRef}
            type="text"
            value={otp}
            onChange={handleOtpChange}
            className="form-input text-center text-xl tracking-widest font-mono"
            placeholder="• • • • • •"
            maxLength={6}
            disabled={isLoading}
          />
        </div>

        {/* Resend OTP */}
        <div className="text-center mb-6">
          {!canResend ? (
            <p className="text-sm text-text-secondary">
              Resend OTP in <span className="font-medium">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResending || isLoading}
              className="text-primary hover:underline text-sm font-medium disabled:text-text-secondary disabled:no-underline disabled:opacity-50"
            >
              {isResending ? 'Resending...' : 'Resend OTP'}
            </button>
          )}
        </div>

        {/* Demo Notice */}
        <div className="bg-background p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-1" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium mb-1">For demonstration purposes:</p>
              <p>Please use OTP: <span className="font-mono font-medium">123456</span></p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 btn-outline flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back</span>
          </button>
          
          <button
            type="submit"
            disabled={otp.length !== 6 || isLoading}
            className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Icon name="CheckCircle" size={20} />
                <span>Verify OTP</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-text-secondary">
          Didn't receive the OTP? Check your phone number or{' '}
          <button 
            onClick={onBack} 
            className="text-primary hover:underline"
            disabled={isLoading}
          >
            change your number
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;