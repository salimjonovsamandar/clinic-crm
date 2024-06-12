import styled from "@emotion/styled";
import BgImg from "../../../assets/bg2.png";
import registerImg from "../../../assets/image.svg";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";

const FormWrapper = styled.div`
  padding: 10px;
`;
const Input = styled.input`
  padding: 13px 10px;
  border-radius: 7px;
  border: 1px solid #e2e2ea;
  outline: #0062ff;
  ::placeholder {
    color: #84818a;
  }
  :focus {
    border: 1px solid #0062ff;
    outline: none;
  }
`;
const RegisterWrapper = styled.div`
  display: flex;
  align-self: center;

  @media screen and (max-width: 1200px) {
    .bg-img {
      display: none;
    }
    .Images {
      position: absolute;
      left: -150px;
      margin-top: 100px;
    }
    .parag {
      margin-top: 100px;
      position: absolute;
      left: 30%;
    }
    .MainWrapper {
      margin-left: auto;
      margin-right: auto;
      margin-top: 200px;
      padding: 50px 20px;
      background-color: #e2eef8;
      border-radius: 20px;
    }
    .Imageparag {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: left;
      /* padding-left: -200px; */
      /* left: -200px; */
    }
  }
  @media screen and (max-width: 900px) {
    .MainWrapper {
      width: 70%;
    }
    .form {
      width: 100%;
    }
    .input {
      width: 100%;
    }
  }
  @media screen and (max-width: 850px) {
    .MainWrapper {
      width: 70%;
    }
    .imsFamilya {
      display: flex;
      flex-direction: column;
    }
  }
  @media screen and (max-width: 600px) {
    .MainWrapper {
      width: 70%;
    }
    .form {
      width: 100%;
    }
    .input {
      width: 100%;
    }
  }
  @media screen and (max-width: 530px) {
    .MainWrapper {
      width: 70%;
    }
    .form {
      width: 100%;
    }
    .input {
      width: 100%;
    }
  }
`;
const Label = styled.label`
  /* color: #504f54; */
  color: black;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
`;
const Button = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 7px;
  border: none;
  font-size: 16px;
  color: white;
  background-color: #0062ff;
  transition: all 0.5s ease;
  :hover {
    background-color: #0748b1;
  }
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
    border: 1px solid #0062ff;
    outline: none;
  }
  & > option {
    padding: 5px;
  }
`;
const FormMainWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  .MainWrapper {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function RegisterPage() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
  const nameRef = useRef("");
  const surnameRef = useRef("");
  const birthdateRef = useRef("");
  const passwordRef = useRef("");
  const mobileRef = useRef("");

  const regions = [
    "Andijon",
    "Buxoro",
    "Farg'ona",
    "Jizzax",
    "Namangan",
    "Navoiy",
    "Qashqadaryo",
    "Qoraqalpog'iston Respublikasi",
    "Samarqand",
    "Sirdaryo",
    "Surxondaryo",
    "Toshkent viloyati",
    "Toshkent shahri",
    "Xorazm",
  ];

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const validateFormData = () => {
    if (
      nameRef.current.value.trim() === "" ||
      surnameRef.current.value.trim() === "" ||
      birthdateRef.current.value.trim() === "" ||
      passwordRef.current.value.trim() === "" ||
      mobileRef.current.value.trim() === "" ||
      selectedRegion.trim() === ""
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFormData()) {
      const dataToSend = {
        first_name: nameRef.current.value,
        last_name: surnameRef.current.value,
        phone_number: "+" + mobileRef.current.value,
        password: passwordRef.current.value,
        created_at: birthdateRef.current.value,
        region: selectedRegion,
      };
      fetch("http://clinic-srm.uz.custom.uz/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          console.log(response);
        })
        .then((responseData) => {
          console.log(responseData);
          navigate("/login");
          nameRef.current.value = "";
          surnameRef.current.value = "";
          passwordRef.current.value = "";
          birthdateRef.current.value = "";
          mobileRef.current.value = "";
        })
        .catch((error) => {
          console.error("Ma'lumotlarni olishda xatolik yuz berdi:", error);
        });
    } else {
      console.log("Ma'lumotlar noto'g'ri kiritilgan!");
    }
  };

  return (
    <RegisterWrapper>
      <div
        className="bg-img"
        style={{
          width: "50%",
          height: "100vh",
          backgroundImage: `url(${BgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionX: "center",
        }}
      ></div>
      <div
        className="Imageparag"
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          left: "3%",
          marginTop: "30px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <img
          style={{
            width: "100px",
            marginLeft: "40%",
          }}
          src={registerImg}
          className="Images"
        />
        <p
          style={{
            fontFamily: "cursive",
            color: "red",
            letterSpacing: "5px",
            fontWeight: "900",
            marginLeft: "10%",
            fontSize: "50px",
          }}
          className="parag"
        >
          CLINIVA
        </p>
      </div>

      <FormMainWrapper className="MainWrapper">
        <form
          onSubmit={handleSubmit}
          className="form"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "900",
              marginBottom: "20px",
            }}
          >
            Ro'yhatdan o'tish
          </h3>

          <div>
            <FormWrapper>
              <div
                className="imsFamilya"
                style={{ display: "flex", gap: "20px" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Label htmlFor="ism">Ismingizni kiriting</Label>
                  <Input
                    ref={nameRef}
                    className="input"
                    required
                    type="text"
                    placeholder="Ismingizni kiriting"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Label htmlFor="ism">Familyangizni kiriting</Label>
                  <Input
                    ref={surnameRef}
                    className="input"
                    required
                    type="text"
                    placeholder="Familyangizni kiriting"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Label htmlFor="ism">Tug'ilgan yilingizni kiriting</Label>
                <Input
                  ref={birthdateRef}
                  className="input"
                  required
                  type="date"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Label htmlFor="ism">Parolni kiriting</Label>
                <Input
                  ref={passwordRef}
                  className="input"
                  required
                  type="password"
                  placeholder="Parolni kiriting"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Label htmlFor="ism">Tel raqamingizni kiriting</Label>
                <Input
                  ref={mobileRef}
                  className="input"
                  required
                  type="number"
                  placeholder="+998 (XX)-XXX-XX-XX"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Label htmlFor="regionSelect">Viloyatni tanlang:</Label>
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
              </div>
              <Button type="submit" className="input">
                Kirish
              </Button>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "21px",
                  marginTop: "20px",
                }}
              >
                Ro'yhatdan o'tgan bo'lsangiz:{"  "}
                <NavLink
                  style={{ textDecoration: "none", color: "#0062ff" }}
                  to="/login"
                >
                  Kirish
                </NavLink>
              </p>
            </FormWrapper>
          </div>
        </form>
      </FormMainWrapper>
    </RegisterWrapper>
  );
}

export default RegisterPage;
