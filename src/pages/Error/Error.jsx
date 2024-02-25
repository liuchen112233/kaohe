import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const Error = () => {
    const navigate = useNavigate()
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
    />
  );
};
export default Error;
