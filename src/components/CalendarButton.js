import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`flex flex-col w-full`}
`;

const Btn = styled.button`
  ${tw`appearance-none block w-full text-gray-800 border border-gray-300 rounded py-3 px-4 mb-3`}
`;

const CalendarButton = ({ loading, type, title, accent = false, onClick }) => {
  return (
    <Container>
      <Btn
        type={type}
        onClick={onClick}
        className={accent ? "bg-primary" : "border border-gray-400"}
      >
        <span className={accent ? "text-white" : "text-gray-600"}>
            {title}
        </span>
      </Btn>
    </Container>
  );
};

export default CalendarButton;
