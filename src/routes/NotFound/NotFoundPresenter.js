import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
    ${tw`min-h-screen flex flex-col items-center justify-center`}
`;

const NotFoundPresenter = () => {
    return (
        <Container>
            <div className="w-48 h-48 md:w-80 md:h-80">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 546.62 546.62">
                    <defs></defs>
                    <g id="Layer_4" data-name="Layer 4" fill="#76c6bc">
                        <path id="tail" fill="#76c6bc" class="cls-1" d="M373.07,367.89c0,17-7.7,30.74-17.2,30.74a9.25,9.25,0,0,1-2.81-.42,26.4,26.4,0,0,1-1.78,4.35c-3.87,7.55-10.44,11.92-14.66,9.75s-4.5-10.06-.62-17.61a23.39,23.39,0,0,1,6.33-7.88,47.77,47.77,0,0,1-3.66-18.93c0-17,7.71-30.74,17.2-30.74S373.07,350.91,373.07,367.89Z"/><polygon class="cls-1" points="281.46 233.11 212.69 428.25 350.24 428.25 281.46 233.11"/><rect class="cls-1" x="284.73" y="375.01" width="29.6" height="48.29"/><rect class="cls-1" x="248.6" y="375.01" width="29.59" height="48.29"/><rect class="cls-1" x="248.6" y="273.95" width="63.64" height="101.06"/><ellipse class="cls-1" cx="281.46" cy="375.01" rx="34.68" ry="17.12"/><path class="cls-1" d="M377.93,242.91,369.8,279l-14.67,18.42L350,303.82c-.05.05-.09.12-.14.18l-2.22,2.8h0l-2.42,3-.8.46c-.24,0-.44,0-.64-.05a24.66,24.66,0,0,1-3.32,2.08,26,26,0,0,1-8.77,2.85,26.48,26.48,0,0,1-17.38-3.56,36.64,36.64,0,0,1-2.05,4.23,20,20,0,0,1-1,1.71,35.9,35.9,0,0,1-9.44,9.91,28.76,28.76,0,0,1-5.59-2.76c-.42-.27-.83-.54-1.22-.81a19.09,19.09,0,0,1-3,2,39,39,0,0,1-6.7-11.44,40,40,0,0,1-3.59,14,21.09,21.09,0,0,1-5.67-1l-.25.31a30,30,0,0,1-5.12,4.7,35.41,35.41,0,0,1-14.3-8.46,28.11,28.11,0,0,1-7.75,4.71l-.95.37a28.4,28.4,0,0,1-5.66,1.4,27.3,27.3,0,0,1-3.7.26l-5.56-1.17-2.48-.56-.78-.15-3-.63-2-.42-.2-.14h0l-2-1.37-11.85-8.16L192,305.39l-18.26-32.11L172.91,237l4.72-9.69a0,0,0,0,0,0,0q5.23-7.08,11.24-14.27l.05,0c.88-1.07,1.79-2.13,2.71-3.22a18.67,18.67,0,0,1-3.59-3.74l0,0,1.55-3.21,8.05-6.69a.68.68,0,0,0,0-.07l4.89-4.08L221,176.53l40.64-13.64,42.88,1.23,22.87,9.69,2.57,1.08,12.21,5.16,3.78,4.07h0a20.2,20.2,0,0,1-3.74,6.5q3.38,2.37,6.6,4.76c7.4,5.49,14.21,11.09,20.47,16.73Z"/><polygon class="cls-1" points="206.2 274.05 216.2 260.22 215.8 243.15 230.81 235.03 237.85 219.48 254.9 218.68 267.99 207.72 283.7 214.39 300.25 210.2 311.51 223.03 328.24 226.44 332.82 242.88 346.41 253.21 206.2 274.05"/><path class="cls-1" d="M354.42,285.4l-.09-.54c-.22-1.46-.47-2.91-.78-4.32s-.57-2.61-.95-3.88a72.34,72.34,0,0,0-10.46-22.81c-.49-.72-1-1.39-1.47-2.07q-1.55-2.09-3.2-4.05c-1.3-1.52-2.64-3-4.05-4.38,0,0,0,0,0,0a.07.07,0,0,1-.05,0l0,0s0,0,0,0l0,0a6.39,6.39,0,0,0-.48-.44,74,74,0,0,0-116.57,17.31l0,0a2.2,2.2,0,0,0-.27.47s0,.05,0,.07a0,0,0,0,0,0,0l0,0s0,0,0,0l0,0a0,0,0,0,1,0,0h0a0,0,0,0,1,0,0s0,0,0,0a.06.06,0,0,0,0,0,76.07,76.07,0,0,0-3.93,8.72l-.3.82c-.36,1-.7,2-1,3v0a73.34,73.34,0,0,0-3.13,29c.12,1.41.29,2.78.51,4.17a72.68,72.68,0,0,0,2.64,11.49c.12.39.25.82.39,1.2s.32,1,.52,1.48l0,.07,0,.06a66.25,66.25,0,0,0,3.15,7.38c2.87-.62,5.48-1.32,7.75-2l2,1.37.2.14,2,.42a27.7,27.7,0,0,0,11.79,2.51,27.3,27.3,0,0,0,3.7-.26,28.4,28.4,0,0,0,5.66-1.4l.95-.37a28.11,28.11,0,0,0,7.75-4.71,35.41,35.41,0,0,0,14.3,8.46c.78.26,1.58.46,2.39.66.2-.23.41-.47.61-.72s.22-.27.32-.41a23.57,23.57,0,0,0,7,1.37,53.76,53.76,0,0,0,4.27-18.3,54.73,54.73,0,0,0,8.43,15.08,21.84,21.84,0,0,0,3.67-2.57c.49.37,1,.73,1.51,1.09a6.12,6.12,0,0,1,.57.37,27.75,27.75,0,0,0,2.34-1.54,35.9,35.9,0,0,0,9.44-9.91,20,20,0,0,0,1-1.71,36.64,36.64,0,0,0,2.05-4.23,26.48,26.48,0,0,0,17.38,3.56,26,26,0,0,0,8.77-2.85,24.66,24.66,0,0,0,3.32-2.08c.2,0,.4,0,.64.05,2.64.12,5.77.17,9.28,0a74.13,74.13,0,0,0,1.37-10.71s0,0,0-.07c0-.54,0-1.09.05-1.64,0-.17,0-.33,0-.49A77.45,77.45,0,0,0,354.42,285.4Z"/><path class="cls-1" d="M422.17,273.18a85.25,85.25,0,0,1-64.87,39.53c-3.48.33-6.62.44-9.26.45h-.66c-1.49,0-2.84-.06-4-.11,0-.23,0-.47,0-.71a367.53,367.53,0,0,0-.76-43.49c-.11-1.35-.22-2.72-.36-4.09-.2-2.49-.44-5-.73-7.59,0-.74-.15-1.5-.23-2.27,0-.16,0-.32-.05-.49-.11-.84-.19-1.72-.33-2.59-.17-1.35-.34-2.7-.52-4.08,0-.49-.12-1-.2-1.47q-1-7.77-2.53-15.89c-1.86-10.36-4.09-20.13-6.51-29.29-.14-.51-.28-1-.41-1.54-2.1-7.77-4.32-15-6.59-21.84-.08-.27-.18-.52-.25-.78.95.58,1.91,1.15,2.88,1.75,5.52,3.31,10.8,6.72,15.81,10.17.88.59,1.74,1.2,2.59,1.79q3.38,2.37,6.6,4.76c7.4,5.49,14.2,11.09,20.47,16.73a251.27,251.27,0,0,1,47.14,56.5C420.38,270.13,421.29,271.65,422.17,273.18Z"/><path class="cls-1" d="M225,327.47l-.62.18h0c-1.52.46-3.37,1-5.48,1.48-.14,0-.29.08-.43.1-2.33.56-5,1.06-7.89,1.5A87.78,87.78,0,0,1,137.63,309c.46-1.67.93-3.36,1.44-5,6.85-23.07,18.48-49.35,38.56-76.64a0,0,0,0,0,0,0q5.23-7.08,11.24-14.27l.05,0c.88-1.07,1.79-2.13,2.71-3.22.51-.57,1-1.15,1.52-1.74q4.54-5.16,9.52-10.36s0,0,.06-.05c1.7-1.78,3.46-3.57,5.25-5.35,0,.52-.07,1.07-.1,1.61-.37,6.68-.59,13.76-.59,21.21v1.61c0,9.53.45,19.63,1.37,30.23.68,7.8,1.59,15.34,2.66,22.57.13.86.27,1.71.4,2.55.19,1.17.38,2.36.58,3.51.71,4.43,1.52,8.71,2.39,12.88A361.75,361.75,0,0,0,225,327.47Z"/><path class="cls-1" d="M354.33,286.79l.08.55A26.44,26.44,0,0,1,350,305.75l-.15.2a22.85,22.85,0,0,1-2.21,2.78s0,0,0,0a25.39,25.39,0,0,1-3.87,3.45,26.61,26.61,0,0,1-29.47,1.36,35.86,35.86,0,0,1-12.51,15.85c-.76.55-1.55,1.06-2.34,1.54A35.78,35.78,0,0,1,273,335c-.81-.19-1.6-.4-2.39-.66a35.59,35.59,0,0,1-14.3-8.46A27.87,27.87,0,0,1,242,332.4a27.19,27.19,0,0,1-3.7.26,27.73,27.73,0,0,1-11.79-2.51,29.3,29.3,0,0,1-3.73-2.06,28,28,0,0,1,28.85-47.88,35.5,35.5,0,0,1,17.52-13.57,35,35,0,0,1,7.07-1.74,36.2,36.2,0,0,1,6.71-.31H283a35.57,35.57,0,0,1,23.53,10.53,26.62,26.62,0,0,1,47.83,11.68Z"/><polygon class="cls-1" points="283.57 272.59 271.97 274.31 270.02 285.88 280.42 291.31 288.8 283.09 283.57 272.59"/><path class="cls-1" d="M346,184.13a20.2,20.2,0,0,1-3.74,6.5,28.33,28.33,0,0,1-14.44,8.91,32.2,32.2,0,0,1-14.29.66A31.92,31.92,0,0,1,301,211.12,38.91,38.91,0,0,1,288.5,215a38.42,38.42,0,0,1-19.08-2c-5.1,6.57-13.58,11.5-23.67,12.9a38.55,38.55,0,0,1-10.83,0c-8.92-1.17-16.58-5.37-21-11.48-.52.1-1.08.2-1.61.27a29,29,0,0,1-5,.29,25.82,25.82,0,0,1-15.66-5.32,18.67,18.67,0,0,1-3.59-3.74,16.09,16.09,0,0,1-2.91-7.19,17.61,17.61,0,0,1,4.6-14,18.81,18.81,0,0,1-1.06-4.16c-1.75-12.46,9-24.38,24.32-27.34,2.88-6.92,10.45-12.48,19.91-13.81a27.41,27.41,0,0,1,17.5,3.14,34.52,34.52,0,0,1,20.45,0,30.08,30.08,0,0,1,16.64-7.75c12-1.68,22.94,3.35,27.14,11.69,8.11,1.36,14.53,6.47,15.9,13.39,8.65,2.31,15.15,8.38,16.23,16.25A17.2,17.2,0,0,1,346,184.13Z"/>
                        <ellipse fill="#76c6bc" class="cls-1" cx="255.32" cy="428.25" rx="23.64" ry="15.37"/>
                        <ellipse class="cls-1" fill="#76c6bc" cx="308.41" cy="428.25" rx="23.64" ry="15.37"/>
                        <text fill="orange" fontSize="100" fontFamily="Helvetica" class="cls-2" transform="translate(353.17 152.91) rotate(25.82)">?</text>
                    </g>
                </svg>
            </div>
            <h2 className="ml-5 font-semibold text-lg md:text-3xl text-gray-600">
                お探しのページは見つかりません。
            </h2>
        </Container>
    );
}

export default NotFoundPresenter;