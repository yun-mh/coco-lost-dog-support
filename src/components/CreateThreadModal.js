import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { X } from "react-feather";
import Modal from "react-modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import ImageUploader from "react-images-upload";
import TextareaAutosize from "react-autosize-textarea";
import { useScrollBodyLock } from "../hooks/useScrollBodyLock";
import DatePicker from "./DatePicker";
import Button from "./Button";
import Field from "./Field";

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

  const [lostWhen, setLostWhen] = useState(new Date());
  const [images, setImages] = useState([]);

  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "犬の名前を入力してください。";
    }
    if (!values.breed) {
      errors.breed = "犬種を入力してください。";
    }
    if (!values.age) {
      errors.age = "犬の年齢を入力してください。";
    }
    if (!values.lostWhere) {
      errors.lostWhere = "迷子になった場所のおおよその住所を入力してください。";
    }
    if (!values.owner) {
      errors.owner = "飼い主の名前を入力してください。";
    }
    if (!values.phone) {
      errors.phone = "連絡先を入力してください。";
    }

    return errors;
  };

  // const onSubmit = async () => {
  //   if (formik.values.name === nameP && formik.values.breed === breedP && formik.values.birthdate === birthdateP && formik.values.gender === genderP && formik.values.image === undefined) {
  //     closeModal();
  //     return;
  //   }

  //   if (formik.values.name !== "" && formik.values.breed !== "") {
  //     setLoading(true);

  //     let location = "";
  //     if (image !== undefined) {
  //       const formData = new FormData();
  //       formData.append("file", image);
  //       const {
  //         data: { locations },
  //       } = await axios.post(
  //         "https://api-coco.herokuapp.com/api/upload",
  //         formData,
  //         {
  //           headers: {
  //             "content-type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       location = locations[0];
  //     }

  //     try {
  //       const {
  //         data: { editDog },
  //       } = await modifyDogMutation({
  //         variables: {
  //           id: dogId,
  //           image: location !== "" ? location : avatar,
  //           name: formik.values.name,
  //           breed: formik.values.breed,
  //           gender: formik.values.gender,
  //           birthdate: formik.values.birthdate,
  //           action: "EDIT",
  //         },
  //       });
  //       if (editDog) {
  //         closeModal();
  //         toast.success("😄 情報を修正しました！");
  //       }
  //     } catch (e) {
  //       toast.error(`😢 ${e.message}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      name,
      breed,
      gender,
      age,
      size,
      weight,
      feature,
      images,
      lostWhen,
      lostWhere,
      owner,
      phone,
      email
    },
    validate,
    onSubmit,
  });
  
  useEffect(() => {
    formik.values.lostWhen = lostWhen;
  }, [lostWhen, formik.values.lostWhen])
  
  const onDrop = image => {
    setImages([...images, image]);
  };

  useEffect(() => {
    formik.values.images = images;
  }, [images, formik.values.images])

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
            <Field placeholder="例）ココ" type="text" name="name" errors="" onChange={formik.handleChange} value={formik.values.} />
            {/* <p class="text-red text-xs italic">Please fill out this field.</p> */}
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-last-name">
              犬種(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）プードル" type="text" name="breed" errors="" onChange={formik.handleChange} value={formik.values.} />
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
            <Field type="number" min="0" name="age" errors="" onChange={formik.handleChange} value={formik.values.} />
            {/* <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="number" min="0" /> */}
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
            <Field type="number" min="0" step="0.5" name="weight" errors="" onChange={formik.handleChange} value={formik.values.} />
            {/* <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="number" min="0" step="0.5" /> */}
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
            <DatePicker name="lostWhen" birthdate={lostWhen} setBirthdate={setLostWhen} open={isDateModalVisible} toggleOpen={setIsDateModalVisible} />
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-password">
              迷子になった場所(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）愛知県名古屋市中区正木１丁目" type="text" name="lostWhere" errors="" onChange={formik.handleChange} value={formik.values.} />
            {/* <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder="" /> */}
          </DivisionItem>
        </DivisionContainer>

        <Divide />

        <DivisionTitle>飼い主情報</DivisionTitle>
        <DivisionContainer>
          <DivisionItem>
            <ItemLabel for="grid-first-name">
              飼い主名(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）犬山犬男" type="text" name="owner" errors="" onChange={formik.handleChange} value={formik.values.} />

            {/* <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" id="grid-first-name" type="text" placeholder="例）" /> */}
          </DivisionItem>
          <DivisionItem>
            <ItemLabel for="grid-last-name">
              連絡先(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）070-1234-5678" type="text" name="phone" errors="" onChange={formik.handleChange} value={formik.values.} />
            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="" />
          </DivisionItem>
          <DivisionItem class="md:w-1/3 px-3">
            <ItemLabel for="grid-last-name">
              メールアドレス
            </ItemLabel>
            <Field placeholder="例）inuski@yahoo.co.jp" type="email" name="email" errors="" onChange={formik.handleChange} value={formik.values.} />
            {/* <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="email" placeholder="例）inuski@yahoo.co.jp" /> */}
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