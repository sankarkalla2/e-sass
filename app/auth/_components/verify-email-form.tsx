"use client";

import Wrapper from "./wrappter";

const VerifyEmailForm = () => {
  return (
    <Wrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      authDescription="verify you email"
    >
      verify email
    </Wrapper>
  );
};

export default VerifyEmailForm;
