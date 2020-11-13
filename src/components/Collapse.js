import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import AddReportModal from "./AddReportModal";
import Button from "./Button";

const CollapseContainer = styled.div`
    ${tw`rounded-sm`}
`

const CollapseTitleContainer = styled.div`
    ${tw`flex justify-between border border-b-0 bg-gray-100 px-10 py-3`}
`

const CollapseTitle = styled.button`
    ${tw`underline text-blue-500 hover:text-blue-700 focus:outline-none`}
`

const Collapse = () => {
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

    return (
        <CollapseContainer>
            <CollapseTitleContainer>
                <CollapseTitle onClick={toggleOpen} type="button">
                    Collapsible Group Item #1
                </CollapseTitle>
                <Button use="accent" title="通報する" onClick={openCreateModal} />
            </CollapseTitleContainer>
            <div class={isOpen ? "border border-b-0 px-10 py-6" : "hidden"}>
                Anim pariatur cliche reprehenderit, enim eiusmod high
                life accusamus terry richardson ad squid. 3 wolf moon
                officia aute, non cupidatat skateboard dolor brunch.
                Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                wolf moon tempor, sunt aliqua put a bird on it squid
                single-origin coffee nulla assumenda shoreditch et.
                Nihil anim keffiyeh helvetica, craft beer labore wes
                anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft
                beer farm-to-table, raw denim aesthetic synth nesciunt
                you probably haven't heard of them accusamus labore
                sustainable VHS.
            </div>
            <AddReportModal
                modalIsOpen={createModalIsOpen}
                closeModal={closeCreateModal}
            />
        </CollapseContainer>
    )
}

export default Collapse;