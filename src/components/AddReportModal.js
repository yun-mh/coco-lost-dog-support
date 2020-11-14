import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Compass, X } from "react-feather";
import Modal from "react-modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import ImageUploader from "react-images-upload";
import TextareaAutosize from "react-autosize-textarea";
import { useScrollBodyLock } from "../hooks/useScrollBodyLock";
import DatePicker from "./DatePicker";
import Button from "./Button";
import Field from "./Field";
import ButtonLoader from "./ButtonLoader";

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
  ${tw`px-3 mb-6 md:mb-0`}
`;

const ItemLabel = styled.label`
  ${tw`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1`}
`;

const CompassButton = styled.div`
  ${tw`flex items-center justify-center ml-3 w-24 h-auto bg-secondary hover:bg-secondary-light mb-1 rounded cursor-pointer`}
`;

const Divide = styled.hr`
  ${tw`w-full mt-8 mb-6`}
`;

const AddReportModal = ({
  modalIsOpen,
  closeModal
}) => {
  const { lock, unlock } = useScrollBodyLock();

  const [when, setWhen] = useState(new Date());

  const [compassLoading, setCompassLoading] = useState(false);
  const [lat, setLat] = useState(false);
  const [lon, setLon] = useState(false);
  const [locationErr, setLocationErr] = useState(false);

  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.reportType) {
      errors.reportType = "対応タイプを選んでください。";
    }
    if (!values.location) {
      errors.location = "発見場所を記入してください。";
    }
    if (!values.when) {
      errors.when = "発見日時を入力してください。";
    }
    if (!values.name) {
      errors.name = "発見者の名前を記入してください。";
    }
    if (!values.phone) {
      errors.phone = "発見者の連絡先を入力してください。";
    }

    return errors;
  };

  const onSubmit = async () => {
    // if (formik.values.name === nameP && formik.values.breed === breedP && formik.values.birthdate === birthdateP && formik.values.gender === genderP && formik.values.image === undefined) {
    //   closeModal();
    //   return;
    // }

    if (formik.values.location !== "" && formik.values.name !== "" && formik.values.phone !== "") {
      // setLoading(true);

      console.log("hey!")
      // let location = "";
      // if (image !== undefined) {
      //   const formData = new FormData();
      //   formData.append("file", image);
      //   const {
      //     data: { locations },
      //   } = await axios.post(
      //     "https://api-coco.herokuapp.com/api/upload",
      //     formData,
      //     {
      //       headers: {
      //         "content-type": "multipart/form-data",
      //       },
      //     }
      //   );
      //   location = locations[0];
      // }

      // try {
      //   const {
      //     data: { editDog },
      //   } = await modifyDogMutation({
      //     variables: {
      //       id: dogId,
      //       image: location !== "" ? location : avatar,
      //       name: formik.values.name,
      //       breed: formik.values.breed,
      //       gender: formik.values.gender,
      //       birthdate: formik.values.birthdate,
      //       action: "EDIT",
      //     },
      //   });
      //   if (editDog) {
      //     closeModal();
      //     toast.success("😄 情報を修正しました！");
      //   }
      // } catch (e) {
      //   toast.error(`😢 ${e.message}`);
      // } finally {
      //   setLoading(false);
      // }
    }
  };

  const formik = useFormik({
    initialValues: {
      reportType: "",
      location: "",
      when: "",
      name: "",
      phone: "",
      email: "",
    },
    validate,
    onSubmit,
  });
  
  useEffect(() => {
    formik.values.when = when;
  }, [when, formik.values.when])

  const getCurrentLocation = () => {
    async function success(position) {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitudee}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ja`
      );
      const resData = await res.json();
      const address = resData.results[0].formatted_address.split(" ")[1];
      
      formik.values.location = address;

      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      setCompassLoading(false);
    }

    function error() {
      setLocationErr(true);
    }

    setLocationErr(false);

    if(navigator.geolocation) {
      setCompassLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const plotCurrentLocationOnMap = () => {
    if (lat !== null && lon !== null) {

    } else {

    }
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

        <DivisionTitle>通報内容</DivisionTitle>
        <DivisionContainer>
          <DivisionItem className="w-full">
            <ItemLabel htmlFor="reportType">
              対応タイプ(<span className="text-red-500">*</span>)
            </ItemLabel>
            <div class="relative">
              <select class="block appearance-none w-full bg-gray-100 border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" name="reportType">
                <option>発見のみ</option>
                <option>犬を直接保護中</option>
                <option>他の所に預けた</option>
              </select>
              <div class="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-grey-darker">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </DivisionItem>

          <DivisionItem className="w-full">
            <ItemLabel htmlFor="when">
              発見日時(<span className="text-red-500">*</span>)
            </ItemLabel>
            <DatePicker name="when" className="bg-gray-100" birthdate={when} setBirthdate={setWhen} open={isDateModalVisible} toggleOpen={setIsDateModalVisible} />
          </DivisionItem>
        </DivisionContainer>

        <DivisionContainer>
          <DivisionItem className="w-full">
            <ItemLabel htmlFor="location">
              発見場所(<span className="text-red-500">*</span>)
            </ItemLabel>
            <div className="flex">
              <Field hasError={false} placeholder="例）愛知県名古屋市中区正木１丁目" type="text" name="location" errors={formik.errors.location} onChange={formik.handleChange} value={formik.values.location} />
              <CompassButton onClick={getCurrentLocation} >
                { !compassLoading ? <Compass className="text-gray-700" /> : <ButtonLoader />}
              </CompassButton>
            </div>
            { formik.errors.location !== undefined && <p className="text-sm text-red-500 italic mb-2">{formik.errors.location}</p> }
            { locationErr && <p className="text-sm text-red-500 italic mb-2">位置情報取得に失敗しました。</p> }
            <Button title="設定" onClick={() => {}} />
          </DivisionItem>
        </DivisionContainer>

        <Divide />

        <DivisionTitle>通報者情報</DivisionTitle>
        <DivisionContainer>
          <DivisionItem className="w-full">
            <ItemLabel htmlFor="name">
            　通報者名(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）犬山犬男" type="text" name="name" errors={formik.errors.name} onChange={formik.handleChange} value={formik.values.name} />
          </DivisionItem>
          <DivisionItem className="w-full">
            <ItemLabel htmlFor="phone">
              連絡先(<span className="text-red-500">*</span>)
            </ItemLabel>
            <Field placeholder="例）070-1234-5678" type="text" name="phone" errors={formik.errors.phone} onChange={formik.handleChange} value={formik.values.phone} />
          </DivisionItem>
          
        </DivisionContainer>

        <div className="flex justify-around mt-10 mb-5">
          <Button className={"w-32"} type={"button"} title={"キャンセル"} onClick={closeModal} />
          <Button className={"w-32"} type={"submit"} title={"登録"} use={"accent"} />
        </div>

      </ModalContainer>
    </Modal>
  );
};

export default AddReportModal;