export const isValidPassword = password => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])[0-9a-zA-Z]{8,}$/.test(
    password,
  );
};
