import React, { useState, useEffect, useRef } from 'react';
import Icon from 'components/AppIcon';

const OTPVerification = ({ phoneNumber, onComplete, onBack, setErrors }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // Mock OTP for testing
  const mockOTP = '123456';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpValue = otp.join('')) => {
    if (otpValue.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otpValue === mockOTP) {
      onComplete({ otp: otpValue, phoneVerified: true });
    } else {
      setError('Invalid OTP. Please try again or use 123456 for testing.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }

    setIsVerifying(false);
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setTimeLeft(120);
    setOtp(['', '', '', '', '', '']);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Smartphone" size={32} color="#4a7c59" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Verify Your Mobile Number
        </h3>
        <p className="text-text-secondary">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-primary font-medium">
          +91 {phoneNumber}
        </p>
      </div>

      {/* OTP Input */}
      <div>
        <label className="form-label text-center block mb-4">
          Enter Verification Code
        </label>
        <div className="flex justify-center space-x-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-md transition-smooth focus:ring-2 focus:ring-primary focus:ring-offset-1 ${error ? 'border-error' : 'border-border focus:border-primary'}`}
              maxLength={1}
              disabled={isVerifying}
            />
          ))}
        </div>

        {error && (
          <div className="text-center mb-4">
            <p className="text-sm text-error flex items-center justify-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {error}
            </p>
          </div>
        )}

        {/* Testing Info */}
        <div className="bg-accent bg-opacity-30 rounded-md p-3 mb-4">
          <p className="text-sm text-text-secondary text-center">
            <Icon name="Info" size={14} className="inline mr-1" />
            For testing purposes, use OTP: <span className="font-mono font-semibold">123456</span>
          </p>
        </div>
      </div>

      {/* Timer and Resend */}
      <div className="text-center">
        {!canResend ? (
          <p className="text-sm text-text-secondary">
            Resend OTP in <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
          </p>
        ) : (
          <button
            onClick={handleResendOTP}
            className="text-sm text-primary hover:underline font-medium"
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 btn-outline flex items-center justify-center space-x-2"
          disabled={isVerifying}
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Back</span>
        </button>

        <button
          onClick={() => handleVerify()}
          disabled={isVerifying || otp.some(digit => digit === '')}
          className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <Icon name="CheckCircle" size={20} />
              <span>Verify</span>
            </>
          )}
        </button>
      </div>

      {/* Help Text */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-text-secondary mb-2">
          Didn't receive the code?
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <button className="text-primary hover:underline">
            Check spam folder
          </button>
          <span className="text-border">|</span>
          <button className="text-primary hover:underline">
            Contact support
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;