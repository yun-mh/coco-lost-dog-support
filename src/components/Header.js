import React, { useState } from "react";
import styled from "styled-components";
import { Calendar, Info, PenTool, X } from "react-feather";
import tw from "twin.macro";
import moment from "moment";
import Loader from "./Loader";

const NavContainer = styled.nav`
  ${tw`fixed w-full mx-auto bg-white`}
`;

const NavBar = styled.div`
  ${tw`max-w-6xl container  px-2 sm:px-6 lg:px-8`}
`;

const NavBarContainer = styled.div`
  ${tw`relative flex items-center justify-between h-16`}
`;

const MenuBtnContainer = styled.div`
  ${tw`absolute inset-y-0 left-0 flex items-center sm:hidden`}
`;

const Title = styled.div`
  ${tw`flex-1 flex items-center justify-center sm:items-stretch sm:justify-start`}
`;

const TitleContainer = styled.div`
  ${tw`flex flex-shrink-0 items-end`}
`;

const TitleText = styled.span`
  ${tw`ml-3 hidden sm:block font-bold text-xl text-gray-600 antialiased`}
`;

const MobileMenu = styled.div`
  ${tw`sm:hidden`}
`;

const MenuList = styled.div``;

const MenuItemContainer = styled.div`
  ${tw`w-full flex items-center px-2 pt-2 pb-3`}
`;

const ItemRow = styled.div`
  ${tw`my-1`}
`;

const FlexContainer = styled.div`
  ${tw`flex items-center`}
`;

const FlexColContainer = styled.div`
  ${tw`flex flex-col`}
`;

const Image = styled.img`
  ${tw`object-cover rounded-lg`}
`;

const Name = styled.span`
  ${tw`font-semibold`}
`;

const GenderSymbol = styled.span`
  ${tw`text-base`}
`;

const Gender = styled.span`
  ${tw`ml-2 text-sm`}
`;

const Header = ({ user, loading, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavContainer>
      <NavBar>
        <NavBarContainer>
          <MenuBtnContainer>
            {loading && data === undefined && <Loader size={36} />}
            {!loading && data && (
              <button
                onClick={toggleOpen}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              >
                {!isOpen ? <Info /> : <X />}
              </button>
            )}
          </MenuBtnContainer>

          <Title>
            <TitleContainer>
              <img
                className="block h-8 w-auto"
                src={require("../assets/images/logo.png").default}
                alt="logo"
              />
              <TitleText>COCO迷子サポート</TitleText>
            </TitleContainer>
          </Title>

          {user && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="flex hidden md:block">
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  記事作成
                </a>
              </div>
              <div className="flex md:hidden">
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                >
                  <PenTool />
                </a>
              </div>
            </div>
          )}
        </NavBarContainer>
      </NavBar>

      <MobileMenu className={isOpen ? "block" : "hidden"}>
        {data && data.viewDog && (
          <MenuList>
            <MenuItemContainer>
              <Image
                className="w-32 h-32 sm:w-48 sm:h-48"
                src={data.viewDog.image}
                alt="dog"
              />
              <FlexColContainer className="ml-3 w-full justify-between">
                <ItemRow>
                  <FlexContainer>
                    <Name className="text-xl mr-3">{data.viewDog.name}</Name>
                    {data.viewDog.gender === "male" ? (
                      <>
                        (
                        <GenderSymbol className="text-blue-500">
                          &#9794;
                        </GenderSymbol>
                        <Gender>男)</Gender>
                      </>
                    ) : (
                      <>
                        (
                        <GenderSymbol className="text-red-400">
                          &#9792;
                        </GenderSymbol>
                        <Gender>女)</Gender>
                      </>
                    )}
                  </FlexContainer>
                </ItemRow>
                <ItemRow>
                  <span>{data.viewDog.breed}</span>
                </ItemRow>
                <ItemRow>
                  <FlexContainer className="text-sm">
                    <Calendar size={14} className="mr-1" />
                    {moment(data.viewDog.birthdate).format("ll")}(
                    {moment().diff(data.viewDog.birthdate, "years")}歳)
                  </FlexContainer>
                </ItemRow>
              </FlexColContainer>
            </MenuItemContainer>
            <MenuItemContainer className="shadow">
              <div className="w-full my-1 border rounded text-sm p-2 relative">
                <div className="absolute bg-primary text-white px-1 rounded">
                  飼い主
                </div>
                <FlexContainer className="justify-end">
                  <FlexColContainer className="items-end mr-3">
                    <Name>{data.viewDog.user.username}</Name>
                    <span>{data.viewDog.user.email}</span>
                  </FlexColContainer>
                  <Image
                    className="w-12 h-12"
                    src={data.viewDog.user.avatar}
                    alt="user"
                  />
                </FlexContainer>
              </div>
            </MenuItemContainer>
          </MenuList>
        )}
      </MobileMenu>
    </NavContainer>
  );
};

export default Header;
