interface ErrorCode {
  code: string;
  message: {
    en: string;
    ar: string;
  };
  fields?: Record<string, any>;
}

export const ErrorCodes: Record<string, ErrorCode> = {
  UNEXPECTED_ERROR: {
    code: 'UNEXPECTED_ERROR',
    message: {
      en: 'Unexpected error , try again later',
      ar: 'حدثت مشكلة غير متوقعة , برجاء المحاولة لاحقا',
    },
  },
  INVALID_PARAMS: {
    code: 'INVALID_PARAMS',
    message: {
      en: 'Invalid parameters',
      ar: 'مدخلات غير صالحة',
    },
    fields: {},
  },
  NO_DATA_FOUND: {
    code: 'NO_DATA_FOUND',
    message: {
      en: 'No data found',
      ar: 'غير موجود',
    },
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: {
      en: 'Unauthorized',
      ar: 'غير مصرح',
    },
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: {
      en: 'Forbidden',
      ar: 'ممنوع',
    },
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: {
      en: 'Not found',
      ar: 'غير موجود',
    },
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: {
      en: 'Internal server error',
      ar: 'خطأ داخلي في الخادم',
    },
  },
};
