import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import { Bell } from "react-feather";
import Report from "./Report";

const ReportContainer = styled.div`
  ${tw`lg:ml-3 bg-white rounded pb-3`}
`;

const ReportHeader = styled.h2`
  ${tw`w-full text-center text-xl py-5 font-semibold`}
`;

const TimelineContainer = styled.div`
  ${tw`bg-secondary-light bg-opacity-50 relative md:mx-5`}
`;

const InitialReportContainer = styled.div`
  ${tw`md:ml-10 mb-8 flex items-center w-full`}
`;

const InitialReportIndicator = styled.div`
  ${tw`hidden md:flex z-20 justify-center text-red-400 items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full mt-6 mb-3`}
`;

const InitialReportContentContainer = styled.div`
  ${tw`mx-2 md:ml-8 order-1 bg-white rounded-lg shadow-xl md:w-1/2 lg:w-3/4 px-2 md:px-6 py-4 mt-6 mb-3`}
`;

const InitialReportHeader = styled.h3`
  ${tw`mb-3 font-bold text-gray-800 md:text-xl`}
`;

const InitialReportFooter = styled.div`
  ${tw`text-xs md:text-sm leading-snug tracking-wide text-gray-600 text-opacity-100 text-right`}
`;

const Timeline = ({ token, thread, dogId }) => {
  return (
    <ReportContainer>
      <ReportHeader>タイムライン</ReportHeader>
      <TimelineContainer>
        <div
          className="hidden md:block border-r-2 absolute border-opacity-20 border-gray-500 border-dashed h-full"
          style={{ left: "54px" }}
        ></div>
        <InitialReportContainer>
          <InitialReportIndicator>
            <Bell size={20} />
          </InitialReportIndicator>
          <InitialReportContentContainer>
            <InitialReportHeader>
              飼い主が迷子情報を登録しました。
            </InitialReportHeader>
            <InitialReportFooter>
              {moment(thread.createdAt).format("YYYY-MM-D ah:mm:ss")}
            </InitialReportFooter>
          </InitialReportContentContainer>
        </InitialReportContainer>
        {thread.reports &&
          thread.reports.map((report) => (
            <Report
              key={report.id}
              token={token}
              report={report}
              dogId={dogId}
            />
          ))}
      </TimelineContainer>
    </ReportContainer>
  );
};

export default Timeline;
