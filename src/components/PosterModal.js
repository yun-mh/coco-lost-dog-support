import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { X } from "react-feather";
import moment from "moment";
import Modal from "react-modal";
import { useScrollBodyLock } from "../hooks/useScrollBodyLock";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

Modal.setAppElement("#root");

const ModalTitle = styled.div`
  ${tw`fixed w-4/5 flex items-center justify-center h-12 border-b font-semibold bg-white rounded-t-lg`}
`;

const CloseButton = styled.div`
  ${tw`absolute`}
  right: 10px;
`;

const ModalContainer = styled.form`
  ${tw`mt-12 p-2 flex flex-col overflow-y-auto text-sm`}
  height: calc(100% - 3rem);
`;

const InfoTitle = styled.div`
    ${tw`text-center pl-3 font-bold text-gray-700 text-base py-4 md:py-2 bg-secondary-light relative`}
`;

const ImageContainer = styled.div`
    ${tw``}
`;

const Image = styled.div`
  background-image: url(${({ url }) => url});
  ${tw`w-full h-quarter md:h-half bg-cover`}
`;

const Divide = styled.hr`
    ${tw`w-full my-3`}
`;

const LostInfo = styled.p`
    ${tw`text-center mb-3`}
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
    ${tw`text-blue-700 font-semibold text-sm`}
`;

const OwnerInfoRow = styled.div`
    ${tw`md:flex p-1`}
`;

const OwnerInfoItem = styled.div`
    ${tw`md:w-full`}
`;

const OwnerInfoItemHeader = styled.span`
    ${tw`text-sm`}
`;

const OwnerInfoItemContent = styled.span`
    ${tw`text-blue-700 font-semibold text-sm`}
`;

const Footer = styled.p`
    ${tw`bg-secondary-light text-sm text-center py-1 mt-2`}
`;

const PosterModal = ({
  dogImg,
  thread,
  modalIsOpen,
  closeModal
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [subValue, setSubValue] = useState(0);

  const onChangeSub = (subValue) => {
    setSubValue(subValue);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={lock}
      onAfterClose={unlock}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      className="w-4/5 h-threequarter bg-white rounded-lg shadow"
      overlayClassName="Overlay flex justify-center items-center"
    >
      <ModalTitle>
        迷子情報
        <CloseButton onClick={() => closeModal()}>
          <X size={30} className="text-gray-600 cursor-pointer" />
        </CloseButton>
      </ModalTitle>
      <ModalContainer>
      <div className="border-4 border-secondary-light rounded-lg">
            <InfoTitle>
                犬を探しています
            </InfoTitle>
            <ImageContainer>
                <Carousel value={subValue} onChange={onChangeSub}>
                    {thread.images ? (
                        thread.images.map((image) => <Image key={image.id} url={image.url} />)
                    ) : (
                        <Image url={dogImg.url} />
                    )}
                </Carousel>
                <Dots value={subValue} onChange={onChangeSub} number={thread.images.length} />
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
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default PosterModal;