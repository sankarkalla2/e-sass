"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Wrapper from "./wrappter";
import { redirect, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/actions/verify-email";
import Success from "./success";
import Error from "./error";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");
  const [isLoading, startTransition] = useTransition();

  const verifyToken = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!verifyToken) {
      setError("Token not found");
      return;
    }

    startTransition(() => {
      verifyEmail(verifyToken).then((data) => {
        setSucces(data.success!);
        setError(data.error!);
      });
    });
    console.log("something");
  }, [verifyToken, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <Wrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      authDescription="verify you email"
    >
      {isLoading && (
        <Button className="w-full py-2" variant="outline" disabled={isLoading}>
          <Loader className="animate-spin" />
        </Button>
      )}
      {success && <Success message={success} />}
      {error && <Error message={error} />}
    </Wrapper>
  );
};

export default VerifyEmailForm;
