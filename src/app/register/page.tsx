import React from "react";
import AuthLaouts from "../layout/AuthLayouts";
import FormRegister from "../fragment/FormRegister";

const page = () => {
  return (
    <>
      <AuthLaouts title="Register" description="register">
        <FormRegister />
      </AuthLaouts>
    </>
  );
};

export default page;
