import styled from "styled-components";
import mainImg from "../assets/delete-btn.svg";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import MainTable from "./MainTable";
import { useSelector } from "react-redux";
import PatientList from "../Pages/PatientList";
import defaultImg from "../assets/default-img.svg";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Wrapper = styled.div`
  width: 100%;
  margin: 20px auto;
  box-shadow: 0px 0px 2px lightgray;
  border-radius: 10px;
  padding: 30px;
  background-color: white;
  display: flex;
  gap: 20px;
`;

const TextWrapper = styled.div`
  width: 75%;
  color: black;
  h2 {
    color: #2196f3;
    font-size: 25px;
    font-family: sans-serif;
    margin-top: 10px;
  }
  h3 {
    color: #555555;
    font-size: 30px;
    font-weight: 500;
    color: #18d018;
  }
  p {
    font-size: 18px;
    letter-spacing:2px;
    color: #555555;
    width: 80%;
  }
`;

function BemorUi() {
  const [userVal, setUserVal] = useState({});
  const token = useSelector((state) => state.userToken.token);
  const role = useSelector((state) => state.userToken.role);
  const decodedToken = jwtDecode(token);
  useEffect(() => {
    fetch(`https://clinic-srm.uz.custom.uz/users/${decodedToken.user_id}/`)
      .then((res) => res.json())
      .then((val) => setUserVal(val));
  }, [decodedToken.user_id]);
  return (
    <>
      {role == "ordinary_user" ? (
        <Wrapper>
          <div>
            <img width={350} src={defaultImg} alt="" />
          </div>
          <TextWrapper>
            <h3>Tashrif buyurganizdan mamnuzmiz</h3>
            <h2>
              {userVal.first_name} {userVal.last_name}
            </h2>
            <p>
              Fursatdan foydalanib, sizni bizning shifoxonaga xush kelibsiz va
              sog'lig'ingizni bizning shifokorlarimizga
              ishonganingiz uchun minnatdorchilik bildirmoqchimiz. Biz sizni
              sog'lomlashtirish va kasalliklarni oldini olish jarayonlariga taklif etib qolamiz, keng qamrovli tibbiy yordam ko'rsatishni
              boshlashni taklif etib qolamiz.
            </p>
          </TextWrapper>
        </Wrapper>
      ) : null}
      {(role === "admin" || role === "doctor" || role === "diagnos") && (
        <>
          <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="col-span-1 h-full sm:col-span-1 md:col-span-1 lg:col-span-1 ">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-primary-light">
                    <img src="/first.png" alt="" className="h-20 w-20" />
                  </div>
                  <h3 className="text-right text-3xl">Qon bosimi</h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-green-500 text-right">
                    110/70
                  </h3>
                </div>
                <div>
                  <p className="text-2xl font-medium text-gray-600 flex items-center">
                    <i className="material-icons text-green-500 mr-2">
                      <TrendingUpIcon />
                    </i>
                    10% O'tgan oydan yuqori
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1  sm:col-span-1 md:col-span-1 lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-8 min-h-16">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-primary-light">
                    <img src="/second.png" alt="" className="h-20 w-20" />
                  </div>
                  <h3 className="text-right text-3xl">Yurak kasalligi</h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-green-500 text-right">
                    650
                  </h3>
                </div>
                <div>
                  <p className="text-2xl font-medium text-gray-600 flex items-center">
                    <i className="material-icons text-orange mr-2">
                      <TrendingDownIcon />
                    </i>
                    7% O'tgan oydan kamroq
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-primary-light">
                    <img src="/glucose.png" alt="" className="h-20 w-20" />
                  </div>
                  <h3 className="text-right text-3xl">Qantli diabet</h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-green-500 text-right">
                    88-75
                  </h3>
                </div>
                <div>
                  <p className="text-2xl font-medium text-gray-600 flex items-center">
                    <i className="material-icons text-green-500 mr-2">
                      <TrendingUpIcon />
                    </i>
                    12% O'tgan oydan yuqori
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-primary-light">
                    <img src="/blood-count.png" alt="" className="h-20 w-20" />
                  </div>
                  <h3 className="text-right text-3xl">Qon donachalari</h3>
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-green-500 text-right">
                    9,456/mL
                  </h3>
                </div>
                <div>
                  <p className="text-2xl font-medium text-gray-600 flex items-center">
                    <i className="material-icons text-orange mr-2">
                      <TrendingDownIcon />
                    </i>
                    22% O'tgan oydan kam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {role == "diagnos" ? <PatientList /> : null}
    </>
  );
}

export default BemorUi;
