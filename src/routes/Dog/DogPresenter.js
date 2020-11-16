import React from "react";
import { Calendar, Meh, Smile } from "react-feather";
import moment from "moment";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom";
import Collapse from "../../components/Collapse";

const DogPresenter = ({ dogId, user, loading, data }) => {
  const history = useHistory();

  if (!loading && data === undefined) {
    history.push("/");
  }

  return (
    <>
      <Header user={user} loading={loading} data={data} />
      <div className="pt-16">
        {loading ? (
          <div className="w-full h-32 flex items-center justify-center">
            <Loader />
          </div>
        ) : data !== undefined ? (
          <>
            <div className="hidden sm:block m-3 bg-white rounded shadow">
              <div className="w-full flex items-center px-2 pt-2 pb-3">
                <div className="w-1/2 lg:w-2/3 flex items-center px-2 pt-2 pb-3">
                  <img
                    className="w-32 h-32 object-cover rounded-lg"
                    src={data.viewDog.image}
                    alt="dog"
                  />
                  <div className="ml-3 w-full flex flex-col justify-between">
                    <div className="my-1">
                      <div className="flex items-center">
                        <span className="text-xl font-semibold mr-3">
                          {data.viewDog.name}
                        </span>
                        {data.viewDog.gender === "male" ? (
                          <>
                            (
                            <span className="text-blue-500 text-base">
                              &#9794;
                            </span>
                            <span className="ml-2 text-sm">男)</span>
                          </>
                        ) : (
                          <>
                            (
                            <span className="text-red-400 text-base">
                              &#9792;
                            </span>
                            <span className="ml-2 text-sm">女)</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="my-1">
                      <span>{data.viewDog.breed}</span>
                    </div>
                    <div className="my-1">
                      <div className="flex items-center text-sm">
                        <Calendar size={14} className="mr-1" />
                        {moment(data.viewDog.birthdate).format("ll")}(
                        {moment().diff(data.viewDog.birthdate, "years")}歳)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/3 flex items-center px-2 pt-2 pb-3">
                  <div className="w-full flex flex-col justify-between h-32 my-1 border rounded text-sm p-3">
                    <div className="w-12 text-center bg-primary text-white px-1 rounded">
                      飼い主
                    </div>
                    <div className="flex items-center justify-end">
                      <div className="flex flex-col items-end mr-3">
                        <span className="font-semibold">
                          {data.viewDog.user.username}
                        </span>
                        <span>{data.viewDog.user.email}</span>
                      </div>
                      <img
                        className="w-12 h-12 object-cover rounded-lg"
                        src={data.viewDog.user.avatar}
                        alt="user"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="m-3 bg-white rounded shadow min-h-half p-5">
              <h2 className="text-2xl font-semibold mb-3 text-gray-700">
                迷子状況
              </h2>
              {!data.viewDog.isMissed ? (
                <div className="h-64 flex items-center justify-center">
                  <Smile size={40} className="text-primary mr-3" />
                  <span className="text-xl text-gray-500">
                    迷子状態ではありません。
                  </span>
                </div>
              ) : (
                data.viewDog.lostDogThreads.length > 0 ? data.viewDog.lostDogThreads.map(thread => (
                    <div key={thread.id} className="w-full my-4">
                      <Collapse dogId={dogId} thread={thread} />
                    </div>
                  )) : (
                    <div className="h-64 flex items-center justify-center">
                      <Meh size={40} className="text-primary mr-3" />
                      <span className="text-xl text-gray-500">
                        迷子情報を登録してください。
                      </span>
                    </div>
                  )
                )
              }
            </div>
          </>
        ) : (
          <div>None</div>
        )}
      </div>
    </>
  );
};

export default DogPresenter;
