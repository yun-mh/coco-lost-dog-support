import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ButtonLoader from "./ButtonLoader";

const Container = styled.div`
  ${tw`flex flex-col my-2`}
`;

const Btn = styled.button`
  ${tw`px-5 h-10 rounded-lg focus:outline-none active:bg-primary-light flex items-center justify-center`}
`;

const Button = ({ className, loading = false, type, title, use = "standard", onClick }) => {
  return (
    <Container className={className}>
      <Btn
        type={type}
        onClick={onClick}
        className={use === "accent" ? "bg-primary" : use === "standard" ? "border border-gray-600" : "bg-red-500"}
      >
        {loading ? (
          <ButtonLoader />
        ) : (
          <span className={use === "standard" ? "text-gray-600" : "text-white"}>
            {title}
          </span>
        )}
      </Btn>
    </Container>
  );
};

export default Button;
