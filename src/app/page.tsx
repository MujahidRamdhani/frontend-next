import React from "react";
import AuthLaouts from "./layout/AuthLayouts";
import FormLogin from "./fragment/FormLogin";

const page = () => {
  return (
    <>
      <AuthLaouts title="Login" description="login to your account">
        <FormLogin />
      </AuthLaouts>
    </>
  );
};

export default page;
