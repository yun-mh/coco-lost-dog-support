import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import Button from "./Button";
import ModifyThreadModal from "./ModifyThreadModal";

const InfoTitle = styled.div`
    ${tw`md:text-center font-bold text-gray-700 text-base md:text-3xl py-4 md:py-2 bg-secondary-light relative`}
`;

const ImageContainer = styled.div`
    ${tw``}
`;

const Image = styled.div`
  background-image: url(${({ url }) => url});
  ${tw`w-full h-quarter md:h-half bg-cover bg-center`}
`;

const Divide = styled.hr`
  ${tw`w-full my-3`}
`;

const LostInfo = styled.p`
    ${tw`text-center text-base md:text-xl mb-3`}
`;

const DogInfoRow = styled.div`
    ${tw`md:flex p-1`}
`;

const DogInfoItem = styled.div`
    ${tw`md:w-full`}
`;

const DogInfoItemHeader = styled.span`
    ${tw``}
`;

const DogInfoItemContent = styled.span`
    ${tw`text-blue-700 font-semibold text-base md:text-xl`}
`;

const OwnerInfoRow = styled.div`
    ${tw`md:flex p-1`}
`;

const OwnerInfoItem = styled.div`
    ${tw`md:w-full`}
`;

const OwnerInfoItemHeader = styled.span`
    ${tw`text-base`}
`;

const OwnerInfoItemContent = styled.span`
    ${tw`text-blue-700 font-semibold text-base md:text-xl`}
`;

const Footer = styled.p`
    ${tw`bg-secondary-light text-base md:text-lg text-center py-1 mt-2`}
`;

const Poster = ({ user, dogId, dogImg, thread }) => {
    const [subValue, setSubValue] = useState(0);
    const [modifyThreadModalIsOpen, setModifyThreadOpen] = useState(false);

    const openModifyModal = () => {
        setModifyThreadOpen(true);
    };
  
    const closeModifyModal = () => {
        setModifyThreadOpen(false);
    };

    const onChangeSub = (subValue) => {
        setSubValue(subValue);
    };

    return (
        <div className="border-4 border-secondary-light rounded-lg">
            <InfoTitle>
                犬を探しています
                {!thread.isClosed && user !== "" && (
                    <div className="text-base absolute top-0 right-0 hidden sm:block">
                        <Button use="accent" title="修正" onClick={openModifyModal} />
                    </div>
                )}
            </InfoTitle>
            <ImageContainer>
                <Carousel value={subValue} onChange={onChangeSub}>
                    {thread.images.length > 0 ? (
                        thread.images.map((image) => <Image key={image.id} url={image.url} />)
                    ) : (
                        <Image url={dogImg} />
                    )}
                </Carousel>
                <Dots value={subValue} onChange={onChangeSub} number={thread.images.length || 1} />
            </ImageContainer>

            <LostInfo>
                <span className="font-semibold mr-2">{ moment(thread.lostWhen).format("ll") }</span>
                <span className="font-semibold text-blue-700 mr-2">{ thread.lostWhere }</span>
                <span>付近で行方不明</span>
            </LostInfo>

            <Divide />

            <DogInfoRow>
                <DogInfoItem>
                    <DogInfoItemHeader>名前: </DogInfoItemHeader>
                    <DogInfoItemContent>{thread.name}</DogInfoItemContent>
                </DogInfoItem>
                <DogInfoItem>
                    <DogInfoItemHeader>犬種: </DogInfoItemHeader>
                    <DogInfoItemContent>{thread.breed}</DogInfoItemContent>
                </DogInfoItem>
            </DogInfoRow>
            <DogInfoRow>
                <DogInfoItem>
                    <DogInfoItemHeader>性別: </DogInfoItemHeader>
                    <DogInfoItemContent>{thread.gender === "male" ? "男" : "女"}</DogInfoItemContent>
                </DogInfoItem>
                <DogInfoItem>
                    <DogInfoItemHeader>年齢: </DogInfoItemHeader>
                    <DogInfoItemContent>{thread.age}歳</DogInfoItemContent>
                </DogInfoItem>
            </DogInfoRow>
            <DogInfoRow>
                <DogInfoItem>
                    <DogInfoItemHeader>サイズ: </DogInfoItemHeader>
                    <DogInfoItemContent>{thread.size === "small" ? "小型" : thread.size === "medium" ? "中型" : "大型"}</DogInfoItemContent>
                </DogInfoItem>
                <DogInfoItem>
                    <DogInfoItemHeader>体重: </DogInfoItemHeader>
                    <DogInfoItemContent>{thread.weight} kg</DogInfoItemContent>
                </DogInfoItem>
            </DogInfoRow>
            <DogInfoRow>
                <DogInfoItem>
                    <DogInfoItemHeader>特徴: </DogInfoItemHeader>
                    <DogInfoItemContent>{thread.feature}</DogInfoItemContent>
                </DogInfoItem>
            </DogInfoRow>

            <Divide />

            <OwnerInfoRow>
                <OwnerInfoItem>
                    <OwnerInfoItemHeader>飼い主名: </OwnerInfoItemHeader>
                    <OwnerInfoItemContent>{thread.owner}</OwnerInfoItemContent>
                </OwnerInfoItem>
                <OwnerInfoItem>
                    <OwnerInfoItemHeader>連絡先: </OwnerInfoItemHeader>
                    <OwnerInfoItemContent>{thread.phone}</OwnerInfoItemContent>
                </OwnerInfoItem>
            </OwnerInfoRow>
            <OwnerInfoRow>
                <OwnerInfoItem>
                    <OwnerInfoItemHeader>メールアドレス: </OwnerInfoItemHeader>
                    <OwnerInfoItemContent>{thread.email}</OwnerInfoItemContent>
                </OwnerInfoItem>
            </OwnerInfoRow>

            <Footer>見つけた方はレポートしてください！</Footer>

            <ModifyThreadModal
                data={thread}
                dogId={dogId}
                modalIsOpen={modifyThreadModalIsOpen}
                closeModal={closeModifyModal}
            />
        </div>
    )
}

export default Poster;