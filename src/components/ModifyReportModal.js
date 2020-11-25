import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Compass, X } from "react-feather";
import Modal from "react-modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import TextareaAutosize from "react-autosize-textarea";
import { useMutation } from "@apollo/client";
import bcrypt from "bcryptjs";
import { useScrollBodyLock } from "../hooks/useScrollBodyLock";
import DatePicker from "./DatePicker";
import Button from "./Button";
import Field from "./Field";
import ButtonLoader from "./ButtonLoader";
import { MODIFY_REPORT, VIEW_DOG } from "../queries/MainQuery";
import MapComponent from "./MapComponent";

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

const ModalContainerWithoutForm = styled.div`
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

const Authentication = ({ authenticate, errors, pwd, setPwd }) => {
  return (
    <div className="h-full flex flex-col justify-center">
      <DivisionTitle>
        修正するためのパスワードを入力してください。
      </DivisionTitle>
      <DivisionContainer>
        <DivisionItem className="w-full">
          <Field
            placeholder="レポート作成時に登録したパスワード"
            type="password"
            name="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            errors={errors}
          />
        </DivisionItem>
      </DivisionContainer>
      <Button type="button" use="accent" title="認証" onClick={authenticate} />
    </div>
  );
};

const Content = ({
  loading,
  reportFormik,
  when,
  setWhen,
  isDateModalVisible,
  setIsDateModalVisible,
  getCurrentLocation,
  compassLoading,
  locationErr,
  plotCurrentLocationOnMap,
  mapOn,
  lat,
  lon,
  closeModal,
}) => {
  return (
    <>
      <Directions>
        <span className="text-red-500">*</span>がついている項目は記入必須です。
      </Directions>

      <DivisionTitle>通報内容</DivisionTitle>
      <DivisionContainer>
        <DivisionItem className="w-full">
          <ItemLabel htmlFor="reportType">
            対応タイプ(<span className="text-red-500">*</span>)
          </ItemLabel>
          <div className="relative">
            <select
              value={reportFormik.values.reportType}
              onChange={reportFormik.handleChange}
              className="block appearance-none w-full bg-gray-100 border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
              name="reportType"
            >
              <option value="findOnly">発見のみ</option>
              <option value="beingWith">犬を直接保護中</option>
              <option value="otherPlaces">他の所に預けた</option>
            </select>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-grey-darker">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </DivisionItem>

        <DivisionItem className="w-full">
          <ItemLabel htmlFor="when">
            発見日時(<span className="text-red-500">*</span>)
          </ItemLabel>
          <DatePicker
            name="when"
            className="bg-gray-100"
            birthdate={when}
            setBirthdate={setWhen}
            open={isDateModalVisible}
            toggleOpen={setIsDateModalVisible}
          />
        </DivisionItem>
      </DivisionContainer>

      <DivisionContainer>
        <DivisionItem className="w-full">
          <ItemLabel htmlFor="location">
            発見場所(<span className="text-red-500">*</span>)
          </ItemLabel>
          <div className="flex">
            <Field
              hasError={false}
              placeholder="例）愛知県名古屋市中区正木１丁目"
              type="text"
              name="location"
              errors={reportFormik.errors.location}
              onChange={reportFormik.handleChange}
              value={reportFormik.values.location}
            />
            <CompassButton onClick={getCurrentLocation}>
              {!compassLoading ? (
                <Compass className="text-gray-700" />
              ) : (
                <ButtonLoader />
              )}
            </CompassButton>
          </div>
          {reportFormik.errors.location !== undefined && (
            <p className="text-sm text-red-500 italic mb-2">
              {reportFormik.errors.location}
            </p>
          )}
          {locationErr && (
            <p className="text-sm text-red-500 italic mb-2">
              位置情報取得に失敗しました。
            </p>
          )}
          <Button
            type="button"
            title="設定"
            onClick={plotCurrentLocationOnMap}
          />
        </DivisionItem>
      </DivisionContainer>

      {mapOn && (
        <DivisionContainer>
          <MapComponent lat={lat} lng={lon} />
        </DivisionContainer>
      )}

      <Divide />

      <DivisionTitle>通報者情報</DivisionTitle>
      <DivisionContainer>
        <DivisionItem className="w-full">
          <ItemLabel htmlFor="name">
            通報者名(<span className="text-red-500">*</span>)
          </ItemLabel>
          <Field
            placeholder="例）犬山犬男"
            type="text"
            name="name"
            errors={reportFormik.errors.name}
            onChange={reportFormik.handleChange}
            value={reportFormik.values.name}
          />
        </DivisionItem>
        <DivisionItem className="w-full">
          <ItemLabel htmlFor="phone">
            連絡先(<span className="text-red-500">*</span>)
          </ItemLabel>
          <Field
            placeholder="例）070-1234-5678"
            type="text"
            name="phone"
            errors={reportFormik.errors.phone}
            onChange={reportFormik.handleChange}
            value={reportFormik.values.phone}
          />
        </DivisionItem>
      </DivisionContainer>

      <DivisionContainer>
        <DivisionItem className="w-full">
          <ItemLabel htmlFor="memo">メモ</ItemLabel>
          <TextareaAutosize
            className="appearance-none block w-full bg-gray-100 text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            name="memo"
            maxRows={3}
            value={reportFormik.values.memo}
            onChange={reportFormik.handleChange}
            placeholder="例）飼い主に残したい特記事項があれば書いてください。"
            async={true}
          />
        </DivisionItem>
      </DivisionContainer>

      <div className="flex justify-around mt-10 mb-5">
        <Button
          className={"w-32"}
          type={"button"}
          title={"キャンセル"}
          onClick={closeModal}
        />
        <Button
          loading={loading}
          className={"w-32"}
          type={"submit"}
          title={"登録"}
          use={"accent"}
        />
      </div>
    </>
  );
};

const ModifyReportModal = ({ data, token, dogId, modalIsOpen, closeModal }) => {
  const { lock, unlock } = useScrollBodyLock();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState(undefined);
  const [when, setWhen] = useState(data.when);
  const [loading, setLoading] = useState(false);
  const [compassLoading, setCompassLoading] = useState(false);
  const [mapOn, setMapOn] = useState(false);
  const [lat, setLat] = useState(35.6803997);
  const [lon, setLon] = useState(139.4606805);
  const [locationErr, setLocationErr] = useState(false);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  const [modifyReportMutation] = useMutation(MODIFY_REPORT);

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
    if (
      reportFormik.values.location !== "" &&
      reportFormik.values.name !== "" &&
      reportFormik.values.phone !== ""
    ) {
      setLoading(true);
      try {
        const {
          data: { modifyReport },
        } = await modifyReportMutation({
          variables: {
            reportId: data.id,
            reportType: reportFormik.values.reportType,
            location: reportFormik.values.location,
            when: reportFormik.values.when,
            name: reportFormik.values.name,
            phone: reportFormik.values.phone,
            memo: reportFormik.values.memo,
            token,
          },
          refetchQueries: () => [{ query: VIEW_DOG, variables: { id: dogId } }],
        });
        if (modifyReport) {
          closeModal();
          toast.success("😄 レポートを修正しました！");
        }
      } catch (e) {
        toast.error(`😢 ${e.message}`);
      } finally {
        setLat();
        setLon();
        setWhen(new Date());
        setMapOn(false);
        setLoading(false);
      }
    }
  };

  const reportFormik = useFormik({
    initialValues: {
      reportType: data.reportType,
      location: data.location,
      when,
      name: data.name,
      phone: data.phone,
      memo: data.memo,
    },
    validate,
    onSubmit,
  });

  useEffect(() => {
    reportFormik.values.when = when;
  }, [when, reportFormik.values]);

  const authenticate = async () => {
    if (await bcrypt.compare(pwd, data.password)) {
      setIsAuthenticated(true);
    } else {
      setErrors("パスワードをもう一度確認してください。");
    }
  };

  const getCurrentLocation = () => {
    async function success(position) {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=ja`
      );
      const resData = await res.json();
      const address = resData.results[0].formatted_address.split(" ")[1];

      reportFormik.values.location = address;
      setCompassLoading(false);
    }

    function error() {
      setCompassLoading(false);
      setLocationErr(true);
    }

    setLocationErr(false);

    if (navigator.geolocation) {
      setCompassLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const plotCurrentLocationOnMap = async () => {
    setMapOn(true);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${reportFormik.values.location}components=country:JP&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const resData = await res.json();
      const {
        geometry: {
          location: { lat, lng },
        },
      } = resData.results[0];
      setLat(lat);
      setLon(lng);
    } catch (e) {
      console.log(e);
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
        レポート修正
        <CloseButton onClick={() => closeModal()}>
          <X size={30} className="text-gray-600 cursor-pointer" />
        </CloseButton>
      </ModalTitle>
      {isAuthenticated ? (
        <ModalContainer onSubmit={reportFormik.handleSubmit}>
          <Content
            loading={loading}
            reportFormik={reportFormik}
            when={when}
            setWhen={setWhen}
            isDateModalVisible={isDateModalVisible}
            setIsDateModalVisible={setIsDateModalVisible}
            closeModal={closeModal}
            getCurrentLocation={getCurrentLocation}
            compassLoading={compassLoading}
            locationErr={locationErr}
            plotCurrentLocationOnMap={plotCurrentLocationOnMap}
            mapOn={mapOn}
            lat={lat}
            lon={lon}
          />
        </ModalContainer>
      ) : (
        <ModalContainerWithoutForm>
          <Authentication
            authenticate={authenticate}
            pwd={pwd}
            setPwd={setPwd}
            errors={errors}
          />
        </ModalContainerWithoutForm>
      )}
    </Modal>
  );
};

export default ModifyReportModal;
