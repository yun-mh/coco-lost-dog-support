import React, { useState } from "react";
import { Calendar, Info, PenTool, X } from "react-feather";
import moment from "moment";
import Loader from "./Loader";

const Header = ({ user, loading, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
      setIsOpen(!isOpen);
  }

  return (
    <nav className="fixed w-full mx-auto bg-white">
        <div className="max-w-7xl container  px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    { loading && data === undefined && (
                      <Loader size={36} />  
                    )}
                    { !loading && data && (
                        <button onClick={toggleOpen} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                            { !isOpen ? <Info /> : <X />}
                        </button>
                    ) }
                </div>
            
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-end">
                        <img className="block h-8 w-auto" src={require("../assets/images/logo.png").default} alt="logo" />
                        <span className="ml-3 hidden sm:block font-bold text-xl text-gray-600 antialiased">COCO迷子サポート</span>
                    </div>
                </div>
            
                { user && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="flex hidden md:block">
                            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                                記事作成
                            </a>
                        </div>
                        <div className="flex md:hidden">
                            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
                                <PenTool />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className={ isOpen ? "block sm:hidden" : "hidden sm:hidden"}>
            { data && data.viewDog && (
                <>
                    <div className="w-full flex items-center px-2 pt-2 pb-3">
                        <img className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg" src={data.viewDog.image} alt="dog" />
                        <div className="ml-3 w-full flex flex-col justify-between">
                            <div className="my-1">
                                <div className="flex items-center">
                                    <span className="text-xl font-semibold mr-3">{ data.viewDog.name }</span>
                                    {data.viewDog.gender === "male" ? (
                                        <>(<span className="text-blue-500 text-base">&#9794;</span><span className="ml-2 text-sm">男)</span></>
                                    ) : (
                                        <>(<span className="text-red-400 text-base">&#9792;</span><span className="ml-2 text-sm">女)</span></>
                                    )}
                                </div>
                            </div>
                            <div className="my-1">
                                <span>{data.viewDog.breed}</span>
                            </div>
                            <div className="my-1">
                                <div className="flex items-center text-sm">
                                    <Calendar size={14} className="mr-1" />
                                    {moment(data.viewDog.birthdate).format("ll")}
                                    ({moment().diff(data.viewDog.birthdate, "years")}歳)
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center px-2 pt-2 pb-3 shadow">
                        <div className="w-full my-1 border rounded text-sm p-2 relative">
                            <div className="absolute bg-primary text-white px-1 rounded">飼い主</div>
                            <div className="flex items-center justify-end">
                                <div className="flex flex-col items-end mr-3">
                                    <span className="font-semibold">
                                        {data.viewDog.user.username}
                                    </span>
                                    <span>
                                    {data.viewDog.user.email}
                                    </span>
                                </div>
                                <img className="w-12 h-12 object-cover rounded-lg" src={data.viewDog.user.avatar} alt="user" />
                            </div>
                        </div>    
                    </div>
                </>
            )}
        </div>
    </nav>
  )
};

export default Header;