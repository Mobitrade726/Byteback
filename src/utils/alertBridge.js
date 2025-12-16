let openAlert = null;

export const registerGlobalAlert = fn => {
  openAlert = fn;
};

export const showTokenExpiredAlert = () => {
  if (openAlert) {
    openAlert({
      type: 'error',
      title: 'Session Expired',
      message: 'Your session has expired. Please login again.',
    });
  }
};
