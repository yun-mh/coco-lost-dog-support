import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { X } from "react-feather";
import Modal from "react-modal";
import ImageUploader from "react-images-upload";
import TextareaAutosize from "react-autosize-textarea";
import { useScrollBodyLock } from "../hooks/useScrollBodyLock";
import DatePicker from "./DatePicker";
import Button from "./Button";

Modal.setAppElement("#root");

const ModalTitle = styled.div`
  ${tw`fixed w-3/4 sm:w-1/2 flex items-center justify-center h-12 border-b font-semibold bg-white rounded-t-lg`}
`;

const CloseButton = styled.div`
  ${tw`absolute`}
  right: 10px;
`;

const ModalContainer = styled.div`
  ${tw`mt-12 p-5 flex flex-col overflow-y-auto`}
  height: calc(100% - 3rem);
`;

const Directions = styled.p`
  ${tw`mt-3 mb-5 text-gray-500 text-sm`}
`;

const DivisionTitle = styled.h2`
  ${tw`mb-3 text-gray-800`}
`;

const DivisionContainer = styled.div`
  ${tw`-mx-3 md:flex`}
`;

const DivisionItem = styled.div`
  ${tw`md:w-full px-3 mb-6 md:mb-0`}
`;

const ItemLabel = styled.label`
  ${tw`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1`}
`;

const Divide = styled.hr`
  ${tw`w-full mt-8 mb-6`}
`;

const CreateThreadModal = ({
  modalIsOpen,
  closeModal
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [birthdate, setBirthdate] = useState(new Date());
  const [pictures, setPictures] = useState([]);

  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  
  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={lock}
      onAfterClose={unlock}
      shouldFocusAfterRender
      onRequestClose={closeModal}
      className="w-3/4 sm:w-1/2 h-threequarter bg-white rounded-lg shadow"
      overlayClassName="Overlay flex justify-center items-center"
    >
      <ModalTitle>
        迷子情報の初期設定
        <CloseButton onClick={() => closeModal()}>
          <X size={30} className="text-gray-600 cursor-pointer" />
        </CloseButton>
      </ModalTitle>
      <ModalContainer>
        <Directions><span className="text-red-500">*</span>がついている項目は記入必須です。</Directions>

        <DivisionTitle>犬情報</DivisionTitle>  
        <DivisionContainer>
          <DivisionItem>
            <ItemLabel for="grid-first-name">
              犬名(<span className="text-red-500">*</span>)
            </ItemLabel>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="例）ココ" />
            {/* <p class="text-red text-xs italic">Please fill out this field.</p> */}
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-last-name">
              犬種(<span className="text-red-500">*</span>)
            </ItemLabel>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="例）プードル" />
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-last-name">
              性別(<span className="text-red-500">*</span>)
            </ItemLabel>
            <div class="relative">
              <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                <option>男</option>
                <option>女</option>
              </select>
              <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-grey-darker">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </DivisionItem>
        </DivisionContainer>

        <DivisionContainer>
          <DivisionItem>
            <ItemLabel for="grid-first-name">
              年齢(<span className="text-red-500">*</span>)
            </ItemLabel>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="number" min="0" />
            {/* <p class="text-red text-xs italic">Please fill out this field.</p> */}
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-last-name">
              大きさ(<span className="text-red-500">*</span>)
            </ItemLabel>
            <div class="relative">
              <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                <option>小型</option>
                <option>中型</option>
                <option>大型</option>
              </select>
              <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-grey-darker">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-last-name">
              体重(kg)
            </ItemLabel>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="number" min="0" step="0.5" />
          </DivisionItem>
        </DivisionContainer>

        <DivisionContainer>
          <DivisionItem>
            <ItemLabel for="grid-password">
              特徴
            </ItemLabel>
            <TextareaAutosize
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              maxRows={3}
              // value={newComment.value}
              // onChange={newComment.onChange}
              placeholder="例）迷子になった当時の髪型、服装、首輪、鑑札など、犬を識別できる特徴があれば記入してください。"
              async={true}
            />
          </DivisionItem>
        </DivisionContainer>

        <DivisionContainer>
          <DivisionItem>
            <ItemLabel for="grid-password">
              写真アップロード(jpg・png形式)
            </ItemLabel>
            <ImageUploader
              withIcon={true}
              withPreview={true}
              onChange={onDrop}
              withLabel={false}
              buttonText="写真をアップロード"         
              imgExtension={[".jpg", ".png"]}
              fileTypeError="jpg, png形式のみアップロード可能です。"
              maxFileSize={5242880}
            />
          </DivisionItem>
        </DivisionContainer>

        <Divide />

        <DivisionTitle>迷子情報</DivisionTitle>
        <DivisionContainer>
          <DivisionItem>
            <ItemLabel for="grid-last-name">
              迷子になった日時(<span className="text-red-500">*</span>)
            </ItemLabel>
            <DatePicker name="birthdate" birthdate={birthdate} setBirthdate={setBirthdate} open={isDateModalVisible} toggleOpen={setIsDateModalVisible} />
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-password">
              迷子になった場所(<span className="text-red-500">*</span>)
            </ItemLabel>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder="愛知県名古屋市中区正木１丁目" />
            <p class="text-grey-dark text-xs italic">※ 番地などおおよその住所を記入してください。</p>
          </DivisionItem>
        </DivisionContainer>

        <Divide />

        <DivisionTitle>飼い主情報</DivisionTitle>
        <DivisionContainer>
          <DivisionItem>
            <ItemLabel for="grid-first-name">
              飼い主名(<span className="text-red-500">*</span>)
            </ItemLabel>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" id="grid-first-name" type="text" placeholder="例）犬山犬男" />
            {/* <p class="text-red text-xs italic">Please fill out this field.</p> */}
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-last-name">
              連絡先(<span className="text-red-500">*</span>)
            </ItemLabel>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="例）070-1234-5678" />
          </DivisionItem>
          <DivisionItem class="md:w-1/3 px-3">
            <ItemLabel for="grid-last-name">
              メールアドレス
            </ItemLabel>
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="email" placeholder="例）inuski@yahoo.co.jp" />
          </DivisionItem>
        </DivisionContainer>

        <div className="flex justify-around mt-10 mb-5">
          <Button className={"w-32"} type={"button"} title={"キャンセル"} onClick={closeModal} />
          <Button className={"w-32"} type={"button"} title={"登録"} use={"accent"} onClick={() => {}} />
        </div>

      </ModalContainer>
    </Modal>
  );
};

export default CreateThreadModal;