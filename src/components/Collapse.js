import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import AddReportModal from "./AddReportModal";
import Button from "./Button";
import ModifyThreadModal from "./ModifyThreadModal";
import { Plus } from "react-feather";
import Poster from "./Poster";
import Timeline from "./Timeline";
import PosterModal from "./PosterModal";

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
    ${tw`bg-primary-light lg:flex p-2 md:p-5`}
`;

const InitialInfoContainer = styled.div`
    ${tw`hidden lg:block lg:w-1/2 bg-white rounded p-3 h-full`}
`;

const ReportInfoContainer = styled.div`
    ${tw`lg:w-1/2 flex flex-col`}
`;

const ReportsContainer = styled.div`
    ${tw`lg:w-full`}
`;

const Collapse = ({ user, thread, dogId, dogImg }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [createReportModalIsOpen, setCreateReportOpen] = useState(false);
    const [posterIsOpen, setPosterOpen] = useState(false);
    const [modifyThreadModalIsOpen, setModifyThreadOpen] = useState(false);

    const openModifyModal = () => {
        setModifyThreadOpen(true);
    };
  
    const closeModifyModal = () => {
        setModifyThreadOpen(false);
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }
    
    const openCreateModal = () => {
        setCreateReportOpen(true);
    };
  
    const closeCreateModal = () => {
        setCreateReportOpen(false);
    };

    const openPosterModal = () => {
        setPosterOpen(true);
    };
  
    const closePosterModal = () => {
        setPosterOpen(false);
    };

    const cameBack = () => {
        const result = window.confirm("犬がちゃんと帰還されましたか？");

        if (result) {
            // close the thread and set isClose to true
            console.log("omedetou")
        }
    }

    return (
        <CollapseContainer>
            <CollapseTitleContainer>
                <CollapseTitle onClick={toggleOpen} type="button">
                    { moment(thread.createdAt).format("ll") }に登録した迷子情報
                </CollapseTitle>
                <div className="hidden md:block">
                    <Button use="accent" title="レポート" onClick={openCreateModal} />
                </div>
                <div className="flex ml-2 my-2 md:hidden">
                    <button onClick={openCreateModal} className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-primary focus:outline-none focus:text-white hover:bg-primary-light transition duration-150 ease-in-out">
                        <Plus />
                    </button>
                </div>
            </CollapseTitleContainer>
            { isOpen && (
                <CollapseContentContainer className={isOpen ? "border border-b-0 px-10 py-6 flex" : "hidden"}>
                    <InitialInfoContainer>
                        <Poster user={user} dogId={dogId} dogImg={dogImg} thread={thread} />
                    </InitialInfoContainer>
                    <ReportInfoContainer>
                        { user !== "" && (
                            <div className="mb-2 lg:hidden">
                                <Button use="modify" title="迷子情報修正" onClick={openModifyModal} />
                            </div>
                        )}
                        { user !== "" && (
                            <div className="mb-2 lg:hidden">
                                <Button use="other" title="帰還完了設定" onClick={cameBack} />
                            </div>
                        )}
                        <div className="mb-2 lg:hidden">
                            <Button use="simple" title="詳細情報を見る" onClick={openPosterModal} />
                        </div>
                        <ReportsContainer>
                            <Timeline dogId={dogId} thread={thread} />
                        </ReportsContainer>
                    </ReportInfoContainer>
                </CollapseContentContainer>
            )}
            <PosterModal
                dogId={dogId}
                dogImg={dogImg}
                thread={thread}
                modalIsOpen={posterIsOpen}
                closeModal={closePosterModal}
            />
            <ModifyThreadModal
                data={thread}
                dogId={dogId}
                modalIsOpen={modifyThreadModalIsOpen}
                closeModal={closeModifyModal}
            />
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