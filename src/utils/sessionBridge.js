let sessionExpiredCallback = null;

export const registerSessionExpired = callback => {
  sessionExpiredCallback = callback;
};

export const triggerSessionExpired = () => {
  if (sessionExpiredCallback) {
    sessionExpiredCallback();
  }
};
