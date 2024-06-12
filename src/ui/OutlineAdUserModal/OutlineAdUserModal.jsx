import { useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button/Button";
import OutlinedInput from "../OutlineInput/OutlinedInput";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "../Spinner";

const MainWrapper = styled.div`
  position: relative;
  padding: 8px;
  .btn-part {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const ModalWrapper = styled.div`
  background-color: aqua;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  & > #textarea:focus {
    border: 1px solid #0e95d8;
    outline: none;
  }
  & > #textarea::placeholder {
    color: #84818a;
  }
`;

const ModalHeading = styled.h2`
  color: rgba(23, 23, 37, 1);
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0.10000000149011612px;
  text-align: center;
`;

const Select = styled.select`
  width: 100%;
  padding: 13px 8px;
  border-radius: 7px;
  border: 1px solid #e2e2ea;
  color: black;
  outline: #0062ff;
  transition: all 0.5s ease;
  :focus {
    border: 1px solid #0e95d8;
    outline: none;
  }
  & > option {
    padding: 5px;
  }
`;

function OutlineAdUserModal({ handleClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    password: false,
    selectedRegion: false,
    description: false,
  });

  const regions = [
    "Toshkent",
    "Farg'ona",
    "Andijon",
    "Namangan",
    "Qoraqolpag'iston",
    "Samarqand",
    "Qashqadaryo",
    "Surxondaryo",
    "Xorazim",
    "Sirdaryo",
    "Jizzah",
    "Navoiy",
    "Buxoro",
  ];

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  function validationFunction() {
    const newErrors = { ...errors };
    let isValid = true;

    if (!firstName.trim().length) {
      newErrors.firstName = true;
      isValid = false;
    } else {
      newErrors.firstName = false;
    }

    if (!selectedRegion.trim().length) {
      newErrors.selectedRegion = true;
      isValid = false;
    } else {
      newErrors.selectedRegion = false;
    }

    if (!lastName.trim().length) {
      newErrors.lastName = true;
      isValid = false;
    } else {
      newErrors.lastName = false;
    }

    if (!description.trim().length) {
      newErrors.description = true;
      isValid = false;
    } else {
      newErrors.description = false;
    }

    if (!(phoneNumber.trim().length > 5)) {
      newErrors.phoneNumber = true;
      isValid = false;
    } else {
      newErrors.phoneNumber = false;
    }

    if (!(password.trim().length > 4)) {
      newErrors.password = true;
      isValid = false;
    } else {
      newErrors.password = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleAddUser() {
    if (validationFunction()) {
      setLoader(true);
      const dataToSend = {
        first_name: firstName,
        last_name: lastName,
        phone_number: "+998" + phoneNumber,
        password: password,
        complaint: description,
        region: selectedRegion,
      };
      console.log(dataToSend, "159");
      fetch("https://clinic-srm.uz.custom.uz/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Bad Request");
          }
          return res.json();
        })
        .then((responseData) => {
          console.log(responseData);
          handleClose();
          setLoader(false);
          toast.success("Bemor muvaffaqiyatli qo'shildi");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          setLoader(false);
          toast.error("Ro'yhatdan o'tishda xatolik yuz berdi.");
        });
    } else {
      toast.error("Barcha ma'lumotlarni to'ldiring");
      console.log("Form validation failed");
    }
  }

  return (
    <MainWrapper>
      <>
        {loader ? (
          <div
            style={{
              width: "600px",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </div>
        ) : (
          <ModalWrapper>
            <ModalHeading>Bemor qo&apos;shish</ModalHeading>
            <form>
              <div
                style={{ display: "flex", gap: "15px", marginBottom: "10px" }}
              >
                <OutlinedInput
                  label="Ism"
                  placeholder="Ism"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  isError={errors.firstName}
                />
                <OutlinedInput
                  label="Familya"
                  placeholder="Familya"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  isError={errors.lastName}
                />
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <OutlinedInput
                  label="Telefon Raqam"
                  placeholder="Namuna: 91 123 45 67"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  isError={errors.phoneNumber}
                />
                <Select
                  className="input"
                  id="regionSelect"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <option value="">Viloyatni tanlang...</option>
                  {regions.map((region, index) => (
                    <option
                      key={index}
                      style={{
                        display: "flex",
                        paddingTop: "10px",
                        height: "10px",
                      }}
                      value={region}
                    >
                      {region}
                    </option>
                  ))}
                </Select>
                <label
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "20px",
                    textAlign: "left",
                    marginBottom: "-10px",
                  }}
                  htmlFor="textarea"
                >
                  Shikoyati
                </label>
                <textarea
                  style={{
                    display: "flex",
                    fontSize: "14px",
                    padding: "10px",
                    border: errors.description
                      ? "1px solid red"
                      : "1px solid #EBEAED",
                    borderRadius: "7px",
                    resize: "none",
                    height: "130px",
                  }}
                  name=""
                  id="textarea"
                  placeholder="Shikoyati"
                  cols="50"
                  rows="10"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <OutlinedInput
                  label="Parol"
                  placeholder="Parol"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isError={errors.password}
                />
              </div>
            </form>
            <div className="btn-part">
              <div>
                <Button
                  onClick={handleClose}
                  width="130px"
                  bgColor="#FF0000"
                  value="Ortga"
                />
              </div>
              <div>
                <Button
                  onClick={handleAddUser}
                  width="130px"
                  bgColor="#0E95D8"
                  value="Qo'shish"
                />
              </div>
            </div>
          </ModalWrapper>
        )}
        <Toaster />
      </>
    </MainWrapper>
  );
}

export default OutlineAdUserModal;
