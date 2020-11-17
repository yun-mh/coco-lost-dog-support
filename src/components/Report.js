import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import ModifyReportModal from "./ModifyReportModal";
import Button from "./Button";

const ReportContainer = styled.div`
    ${tw`bg-white rounded p-5`}
`;

const Report = ({ report, dogId }) => {
    const [modifyReportModalIsOpen, setModifyReportOpen] = useState(false);

    const openRModifyModal = () => {
        setModifyReportOpen(true);
    };
  
    const closeRModifyModal = () => {
        setModifyReportOpen(false);
    };

    console.log("report", report)

    return (
        <ReportContainer>
            <Button use="accent" title="レポート修正" onClick={openRModifyModal} />
            <ModifyReportModal
                data={report}
                dogId={dogId}
                modalIsOpen={modifyReportModalIsOpen}
                closeModal={closeRModifyModal}
            />
        </ReportContainer>
    )
};

export default Report;