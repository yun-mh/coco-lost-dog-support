import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import AddReportModal from "./AddReportModal";
import Button from "./Button";

const CollapseContainer = styled.div`
    ${tw`rounded-sm`}
`;

const CollapseTitleContainer = styled.div`
    ${tw`flex justify-between border bg-gray-100 px-10 py-3`}
`;

const CollapseTitle = styled.button`
    ${tw`underline text-blue-500 hover:text-blue-700 focus:outline-none`}
`;

const CollapseContentContainer = styled.div`
    ${tw`bg-primary-light`}
`;

const InitialInfoContainer = styled.div`
    ${tw`bg-white rounded`}
`;

const Collapse = ({ thread, dogId }) => {
    const [isOpen, setIsOpen] = useState();
    const [createModalIsOpen, setCreateIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }
    
    const openCreateModal = () => {
      setCreateIsOpen(true);
    };
  
    const closeCreateModal = () => {
      setCreateIsOpen(false);
    };

    console.log(thread)

    return (
        <CollapseContainer>
            <CollapseTitleContainer>
                <CollapseTitle onClick={toggleOpen} type="button">
                    { moment(thread.createdAt).format("ll") }に登録した迷子情報
                </CollapseTitle>
                <Button use="accent" title="通報する" onClick={openCreateModal} />
            </CollapseTitleContainer>
            <CollapseContentContainer className={isOpen ? "border border-b-0 px-10 py-6" : "hidden"}>
                <InitialInfoContainer>
                    <div>
                        {/* {thread.images} */}
                        {thread.name}
                        {thread.gender}
                        {thread.breed}
                    </div>
                    <div>
                        {thread.lostWhen}
                        {thread.lostWhere}
                        {thread.breed}
                        {thread.age}
                        {thread.age}
                        {thread.age}
                    </div>
                </InitialInfoContainer>
            </CollapseContentContainer>
            <AddReportModal
                threadId={thread.id}
                dogId={dogId}
                modalIsOpen={createModalIsOpen}
                closeModal={closeCreateModal}
            />
        </CollapseContainer>
    )
}

export default Collapse;