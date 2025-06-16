// API constants
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://rashtriya-kishan-manch-api.onrender.com' 
  : 'http://localhost:5001';

// Status constants for member applications
export const MEMBER_STATUS = {
  PENDING: 'Pending',
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected'
};

// Document types
export const DOCUMENT_TYPES = {
  AADHAAR: 'Aadhaar',
  PAN: 'PAN',
  RATION_CARD: 'Ration Card',
  OTHER: 'Other',
  NONE: 'Not Provided'
}; 