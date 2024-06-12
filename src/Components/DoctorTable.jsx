import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // Correct import
import toast from "react-hot-toast";

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.6;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DoctorTable() {
  const [doctor, setDoctor] = useState([]);
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.userToken.token);
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setAdminId(decodedToken.user_id);
    }
  }, [token]);

  useEffect(() => {
    fetch("https://clinic-srm.uz.custom.uz/doctor-lists/")
      .then((res) => res.json())
      .then((val) => setDoctor(val));
  }, [id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

    return `${day}.${month}.${year}`;
  }
  function handLeSubmit(UserId) {
    setLoader(true);
    const usersId = {
      sender: adminId,
      doctor: UserId,
      patient: id,
      created_at: "2024-05-17T15:22:00Z",
    };

    fetch("https://clinic-srm.uz.custom.uz/add-to-patient/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersId),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Bemor muvoffaaqqiyatli biriktirildi", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Amaliyot Bajarilmadi", { position: "top-center" });
      })
      .finally(() => {
        setLoader(false);
      });
  }
  console.log(doctor);
  return (
    <div className="w-full mx-auto">
      {loader ? (
        <LoaderWrapper>
          <Spinner />
        </LoaderWrapper>
      ) : (
        <div>
          <div className="flex p-4 space-x-1 border-[2px]">
            <div className="w-full py-2.5 text-3xl leading-5 font-medium text-blue-700">
              Shifokorlar ro’yhati
            </div>
          </div>
          <div className="mt-2">
            <div className="bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60">
              <ul className="list-none space-y-4">
                {doctor.map((appointment, idx) => (
                  <li
                    key={idx}
                    onClick={() => handLeSubmit(appointment.id)}
                    className="flex flex-col md:flex-row md:justify-between justify-between items-center bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
                  >
                    <img
                      src={appointment.image}
                      alt="Doctor"
                      className="w-20 h-16 rounded-full mb-2 md:mb-0 md:mr-4"
                    />
                    <div className="flex flex-col md:flex-row md:items-center text-left md:space-x-4 w-full justify-between">
                      <div className="text-center md:text-left w-1/4">
                        <div className="font-bold text-lg">
                          {appointment.first_name} {appointment.last_name}
                        </div>
                        <div className="text-md text-gray-600">
                          {appointment.doctor_direction}
                        </div>
                      </div>
                      <div className="text-center md:text-left w-1/4">
                        <div className="font-bold text-lg">
                          {formatDate(appointment.created_at)}
                        </div>
                        <div className="text-md text-gray-600">
                          {appointment.time}
                        </div>
                      </div>
                      <div className="text-center md:text-left w-1/4">
                        <div className="text-md text-gray-600">Yashash Joyi</div>
                        <div className="font-bold text-lg">
                          {appointment.region}
                        </div>
                      </div>
                      <div className="text-center md:text-left w-1/4">
                        <div className="text-md text-gray-600">
                          Telefon Raqam
                        </div>
                        <div className="font-bold text-lg">
                          {appointment.phone_number}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorTable;
