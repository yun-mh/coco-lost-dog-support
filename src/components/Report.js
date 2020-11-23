import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import moment from "moment";
import ModifyReportModal from "./ModifyReportModal";
import Button from "./Button";
import { Anchor, Eye, LogIn } from "react-feather";
import MapComponent from "./MapComponent";

const ReportContainer = styled.div`
    ${tw`md:ml-10 mb-8 flex items-center w-full`}
`;

const ReportIndicator = styled.div`
    ${tw`hidden z-20 md:flex items-center justify-center text-red-400 order-1 bg-white shadow-xl w-8 h-8 rounded-full mb-3`}
`;

const ReportContentContainer = styled.div`
    ${tw`mx-2 md:ml-8 order-1 bg-white rounded-lg shadow-xl md:w-1/2 lg:w-3/4 px-2 md:px-6 py-4 mb-3`}
`;

const ReportHeader = styled.h3`
    ${tw`mb-3 font-bold text-gray-800 md:text-xl`}
`;

const ReportDetail = styled.div`
    ${tw`text-sm md:text-base`}
`;

const ReportFooter = styled.div`
    ${tw`text-xs md:text-sm leading-snug tracking-wide text-gray-600 text-opacity-100 text-right mt-2`}
`;

const Report = ({ report, dogId }) => {
    const [lat, setLat] = useState(35.6803997);
    const [lng, setLng] = useState(139.4606805);
    const [modifyReportModalIsOpen, setModifyReportOpen] = useState(false);

    const getCoordinates = async () => {
        try {
            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${report.location}components=country:JP&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
            const resData = await res.json();
            const { geometry: { location: { lat, lng }} } = resData.results[0];
            setLat(lat);
            setLng(lng);
        } catch(e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCoordinates();
    })

    const openRModifyModal = () => {
        setModifyReportOpen(true);
    };
  
    const closeRModifyModal = () => {
        setModifyReportOpen(false);
    };

    return (
        <ReportContainer>
            <ReportIndicator>
                { report.reportType === "findOnly" ? (
                    <Eye size={20} className="text-blue-500" />
                ) : report.reportType === "beingWith" ? (
                    <Anchor size={20} className="text-green-500" />
                ) : (
                    <LogIn size={20} className="text-orange-500" />
                ) }
            </ReportIndicator>
            <ReportContentContainer>
                <ReportHeader>
                    <span className="text-blue-600 font-semibold">{ report.name }</span>さんがレポートしました。
                </ReportHeader>
                <ReportDetail>
                    <div>
                        あなたの犬は、<span className="text-blue-600">{ moment(report.when).format('YYYY年MM月D日ah時mm分') }</span>基準、
                        <span className="text-blue-600 font-semibold">{ report.location }</span>
                        { report.reportType === "findOnly" ? "で発見しました！" : report.reportType === "beingWith" ? "で自分と一緒にいます！" : "で発見され、他の所に預けました！" }
                    </div>
                    <MapComponent lat={lat} lng={lng} />
                    <div>
                        <div>通報した人の情報</div>
                        <div className="text-gray-600">名前：<span className="font-semibold text-blue-600">{ report.name }</span></div>
                        <div className="text-gray-600">連絡先：<span className="font-semibold text-blue-600">{ report.phone }</span></div>
                        <div className="text-gray-600">メモ：<span className="font-semibold text-blue-600">{ report.memo }</span></div>
                    </div>
                </ReportDetail>
                <ReportFooter>{ moment(report.createdAt).format('YYYY-MM-D ah:mm:ss') }</ReportFooter>
                <Button type="button" use="accent" title="レポート修正" onClick={openRModifyModal} />
            </ReportContentContainer>

            <ModifyReportModal
                data={report}
                dogId={dogId}
                modalIsOpen={modifyReportModalIsOpen}
                closeModal={closeRModifyModal}
            />
        </ReportContainer>
    )
};

export default Report;