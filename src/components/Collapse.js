import React, { useState } from "react";
import styled from "styled-components";

const Collapse = () => {
    const [isOpen, setIsOpen] = useState();

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div class="rounded-sm">
            <div class="border border-b-0 bg-gray-100 px-10 py-6" id="headingOne">
                <button onClick={toggleOpen} class="underline text-blue-500 hover:text-blue-700 focus:outline-none" type="button">
                    Collapsible Group Item #1
                </button>
            </div>
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
        </div>
    )
}

export default Collapse;