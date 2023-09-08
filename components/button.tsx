import React from "react";

type ButtonProps = {
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode | string;
  htmlType?: "submit" | "button";
};

const Button: React.FC<ButtonProps> = ({
  loading,
  onClick,
  children,
  htmlType = "submit",
}) => {
  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 relative ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      {loading ? <>Loading...</> : children}
    </button>
  );
};

export default Button;
