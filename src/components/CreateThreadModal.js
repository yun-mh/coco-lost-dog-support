import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Edit, Trash, X } from "react-feather";
import Modal from "react-modal";
import { useFormik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import ImageUploader from "react-images-upload";
import ImageUploading from 'react-images-uploading';
import TextareaAutosize from "react-autosize-textarea";
import axios from "axios";
import { useScrollBodyLock } from "../hooks/useScrollBodyLock";
import DatePicker from "./DatePicker";
import Button from "./Button";
import Field from "./Field";
import { useMutation } from "@apollo/client";
import { CREATE_THREAD, VIEW_DOG } from "../queries/MainQuery";

Modal.setAppElement("#root");

const ModalTitle = styled.div`
  ${tw`fixed w-3/4 sm:w-1/2 flex items-center justify-center h-12 border-b font-semibold bg-white rounded-t-lg`}
`;

const CloseButton = styled.div`
  ${tw`absolute`}
  right: 10px;
`;

const ModalContainer = styled.form`
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
  data,
  modalIsOpen,
  closeModal,
  dogId
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [lostWhen, setLostWhen] = useState(new Date());
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  const [createThreadMutation] = useMutation(CREATE_THREAD);

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

  const onSubmit = async () => {
    if (formik.values.name !== "" && formik.values.breed !== "" && formik.values.age !== "" && formik.values.lostWhere !== "" && formik.values.owner !== "" && formik.values.phone !== "" && formik.values.gender !== "") {
      setLoading(true);

      let imageLocations = [];
      if (images[images.length - 1].length >= 1) {
        const formData = new FormData();
        for (let image of images[images.length - 1]) {
          formData.append("file", image);
        }
        const {
          data: { locations }
        } = await axios.post(
            "https://api-coco.herokuapp.com/api/upload",
            formData,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          );
          imageLocations = [...locations];
      }
      try {
        const {
          data: { createThread },
        } = await createThreadMutation({
          variables: {
            dogId,
            name: formik.values.name,
            breed: formik.values.breed,
            age: formik.values.age,
            gender: formik.values.gender,
            size: formik.values.size,
            weight: formik.values.weight,
            feature: formik.values.feature,
            images: [...imageLocations],
            lostWhen: formik.values.lostWhen,
            lostWhere: formik.values.lostWhere,
            owner: formik.values.owner,
            phone: formik.values.phone,
            email: formik.values.email,
          },
          refetchQueries: () => [
            { query: VIEW_DOG, variables: { id: dogId } },
          ], 
        });
        if (createThread) {
          closeModal();
          toast.success("🙂 迷子情報の初期設定を完了しました！");
        }
      } catch(e) {
        console.log(e)
        toast.error(`😢 ${e.message}`);
      } finally {
        formik.values.name = "";
        formik.values.breed = "";
        formik.values.age = 1;
        formik.values.gender = "male";
        formik.values.size = "small";
        formik.values.weight = 0.0;
        formik.values.feature = "";
        formik.values.lostWhen = "";
        formik.values.lostWhere = "";
        formik.values.owner = "";
        formik.values.phone = "";
        formik.values.email = "";
        setImages([]);
        setLostWhen(new Date());
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      breed: "",
      age: 1,
      gender: "male",
      size: "small",
      weight: 0.0,
      feature: "",
      lostWhen,
      lostWhere: "",
      owner: "",
      phone: "",
      email: "",
    },
    validate,
    onSubmit,
  });

  useEffect(() => {
    if (data !== undefined) {
      formik.values.name = data.name;
      formik.values.breed = data.breed;
      formik.values.age = moment().diff(data.birthdate, "years");
      formik.values.gender = data.gender;
      formik.values.email = data.user.email;
    }
  }, [data, formik.values])

  useEffect(() => {
    formik.values.lostWhen = lostWhen;
  }, [lostWhen, formik.values])
  
  // const onDrop = image => {
  //   setImages([...images, image]);
  // };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
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
      <ModalContainer onSubmit={formik.handleSubmit}>
        <Directions><span className="text-red-500">*</span>がついている項目は記入必須です。</Directions>

        <DivisionTitle>犬情報</DivisionTitle>  
        <DivisionContainer>
          <DivisionItem>
            <ItemLabel htmlFor="name">
              犬名(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）ココ" type="text" name="name" errors={formik.errors.name} onChange={formik.handleChange} value={formik.values.name} />
          </DivisionItem>
          <DivisionItem>
            <ItemLabel htmlFor="breed">
              犬種(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）プードル" type="text" name="breed" errors={formik.errors.breed} onChange={formik.handleChange} value={formik.values.breed} />
          </DivisionItem>
          <DivisionItem>
            <ItemLabel htmlFor="gender">
              性別(<span className="text-red-500">*</span>)
            </ItemLabel>
            <div className="relative">
              <select value={formik.values.gender} onChange={formik.handleChange} name="gender" className="block appearance-none w-full bg-gray-100 border py-3 px-4 pr-8 rounded">
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-grey-darker">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </DivisionItem>
        </DivisionContainer>

        <DivisionContainer>
          <DivisionItem>
            <ItemLabel htmlFor="age">
              年齢(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field type="number" min="0" name="age" errors={formik.errors.age} onChange={formik.handleChange} value={formik.values.age} />
          </DivisionItem>
          <DivisionItem>
            <ItemLabel htmlFor="size">
              大きさ(<span className="text-red-500">*</span>)
            </ItemLabel>
            <div className="relative">
              <select value={formik.values.size} onChange={formik.handleChange} name="size" className="block appearance-none w-full bg-gray-100 border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
                <option value="small">小型</option>
                <option value="medium">中型</option>
                <option value="big">大型</option>
              </select>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-grey-darker">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </DivisionItem>
          <DivisionItem>
            <ItemLabel htmlFor="weight">
              体重(kg)
            </ItemLabel>
            <Field type="number" min="0" step="0.5" name="weight" errors={formik.errors.weight} onChange={formik.handleChange} value={formik.values.weight} />
          </DivisionItem>
        </DivisionContainer>

        <DivisionContainer>
          <DivisionItem>
            <ItemLabel htmlFor="feature">
              特徴
            </ItemLabel>
            <TextareaAutosize
              className="appearance-none block w-full bg-gray-100 text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              name="feature"
              maxRows={3}
              onChange={formik.handleChange}
              placeholder="例）迷子になった当時の髪型、服装、首輪、鑑札など、犬を識別できる特徴があれば記入してください。"
              async={true}
            />
          </DivisionItem>
        </DivisionContainer>

        <DivisionContainer>
          <DivisionItem>
            <ItemLabel htmlFor="images">
              写真アップロード(jpg・png形式)
            </ItemLabel>
            {/* <ImageUploader
              withIcon={true}
              withPreview={true}
              onChange={onDrop}
              withLabel={false}
              buttonText="写真をアップロード"         
              imgExtension={[".jpg", ".png"]}
              fileTypeError="jpg, png形式のみアップロード可能です。"
              maxFileSize={5242880}
            /> */}
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={5}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <>
                  <div className="w-full md:flex">
                    <Button className="md:w-1/2 md:mr-3" use={"accent"} title="画像を選択" onClick={onImageUpload} />
                    <Button className="md:w-1/2" title="クリア" onClick={onImageRemoveAll} />
                    {/* <button
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button> */}
                    {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                  </div>
                  <div className="w-full flex flex-wrap justify-around items-center mt-8">
                    {imageList.map((image, index) => (
                      <div className="flex flex-col relative mx-5">
                        <div key={index} className="bg-white p-2 border">
                          <img src={image['data_url']} alt="" width="100" />
                        </div>
                        <div>  
                          <div className="cursor-pointer bg-red-400 hover:bg-red-500 text-white p-1 rounded-full flex items-center justify-center absolute top-0" style={{ right: -16, top: -16 }} onClick={() => onImageRemove(index)}>
                            <X />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </ImageUploading>
          </DivisionItem>
        </DivisionContainer>

        <Divide />

        <DivisionTitle>迷子情報</DivisionTitle>
        <DivisionContainer>
          <DivisionItem>
            <ItemLabel htmlFor="lostWhen">
              迷子になった日時(<span className="text-red-500">*</span>)
            </ItemLabel>
            <DatePicker name="lostWhen" className="bg-gray-100" birthdate={lostWhen} setBirthdate={setLostWhen} open={isDateModalVisible} toggleOpen={setIsDateModalVisible} />
          </DivisionItem>
          <DivisionItem>
            <ItemLabel htmlFor="lostWhere">
              迷子になった場所(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）愛知県名古屋市中区正木１丁目" type="text" name="lostWhere" errors={formik.errors.lostWhere} onChange={formik.handleChange} value={formik.values.lostWhere} />
          </DivisionItem>
        </DivisionContainer>

        <Divide />

        <DivisionTitle>飼い主情報</DivisionTitle>
        <DivisionContainer>
          <DivisionItem>
            <ItemLabel htmlFor="owner">
              飼い主名(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）犬山犬男" type="text" name="owner" errors={formik.errors.owner} onChange={formik.handleChange} value={formik.values.owner} />
          </DivisionItem>
          <DivisionItem>
            <ItemLabel htmlFor="phone">
              連絡先(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）070-1234-5678" type="text" name="phone" errors={formik.errors.phone} onChange={formik.handleChange} value={formik.values.phone} />
          </DivisionItem>
          <DivisionItem className="md:w-1/3 px-3">
            <ItemLabel htmlFor="email">
              メールアドレス
            </ItemLabel>
            <Field placeholder="例）inuski@yahoo.co.jp" type="email" name="email" errors={formik.errors.email} onChange={formik.handleChange} value={formik.values.email} />
          </DivisionItem>
        </DivisionContainer>

        <div className="flex justify-around mt-10 mb-5">
          <Button className={"w-32"} type={"button"} title={"キャンセル"} onClick={closeModal} />
          <Button loading={loading} className={"w-32"} type={"submit"} title={"登録"} use={"accent"} />
        </div>

      </ModalContainer>
    </Modal>
  );
};

export default CreateThreadModal;