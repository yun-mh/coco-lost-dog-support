import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ButtonLoader from "./ButtonLoader";

const Container = styled.div`
  ${tw`flex flex-col my-2`}
`;

const Btn = styled.button`
  ${tw`px-5 h-10 rounded-lg focus:outline-none flex items-center justify-center shadow`}
`;

const Button = ({ className, loading = false, type, title, use = "standard", onClick }) => {
  return (
    <Container className={className}>
      <Btn
        type={type}
        onClick={onClick}
        className={use === "accent" ? "bg-primary hover:bg-primary-light" : use === "standard" ? "border border-gray-600" : use === "simple" ? "bg-blue-400 hover:bg-blue-500" : use === "modify" ? "bg-secondary hover:bg-secondary-light" : "bg-red-400 hover:bg-red-500"}
      >
        {loading ? (
          <ButtonLoader />
        ) : (
          <span className={use === "standard" || use === "modify" ? "text-gray-600" : "text-white"}>
            {title}
          </span>
        )}
      </Btn>
    </Container>
  );
};

export default Button;
