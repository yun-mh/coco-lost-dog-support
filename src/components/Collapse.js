import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import AddReportModal from "./AddReportModal";
import Button from "./Button";
import ModifyThreadModal from "./ModifyThreadModal";
import Report from "./Report";
import { Bell } from "react-feather";
import Poster from "./Poster";
import Timeline from "./Timeline";

const CollapseContainer = styled.div`
    ${tw`w-full rounded-sm`}
`;

const CollapseTitleContainer = styled.div`
    ${tw`flex justify-between border bg-gray-100 px-10 py-3`}
`;

const CollapseTitle = styled.button`
    ${tw`underline text-blue-500 hover:text-blue-700 focus:outline-none`}
`;

const CollapseContentContainer = styled.div`
    ${tw`bg-primary-light lg:flex p-5`}
`;

const InitialInfoContainer = styled.div`
    ${tw`hidden lg:block lg:w-1/2 bg-white rounded p-3 h-full`}
`;

const ReportsContainer = styled.div`
    ${tw`lg:w-1/2`}
`;

const Collapse = ({ user, thread, dogId, dogImg }) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log(isOpen)
   
    const [createReportModalIsOpen, setCreateReportOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }
    
    const openCreateModal = () => {
        setCreateReportOpen(true);
    };
  
    const closeCreateModal = () => {
        setCreateReportOpen(false);
    };

    console.log("thread", thread)

    return (
        <CollapseContainer>
            <CollapseTitleContainer>
                <CollapseTitle onClick={toggleOpen} type="button">
                    { moment(thread.createdAt).format("ll") }に登録した迷子情報
                </CollapseTitle>
                <Button use="accent" title="通報する" onClick={openCreateModal} />
            </CollapseTitleContainer>
            { isOpen && (
                <CollapseContentContainer className={isOpen ? "border border-b-0 px-10 py-6 flex" : "hidden"}>
                    <InitialInfoContainer>
                        <Poster dogId={dogId} dogImg={dogImg} thread={thread} />
                    </InitialInfoContainer>
                    <ReportsContainer>
                        <Timeline dogId={dogId} thread={thread} />
                    </ReportsContainer>
                </CollapseContentContainer>
            )}
            <AddReportModal
                threadId={thread.id}
                dogId={dogId}
                modalIsOpen={createReportModalIsOpen}
                closeModal={closeCreateModal}
            />
        </CollapseContainer>
    )
}

export default Collapse;