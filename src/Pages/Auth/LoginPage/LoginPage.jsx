import styled from "@emotion/styled";
import BgImg from "../../../assets/bg1.png";
import registerImg from "../../../assets/image.svg";
import Button from "@mui/joy/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRole, setToken } from "../../../store/userToken";
import Spinner from "../../../ui/Spinner";
import toast from "react-hot-toast";
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
      display: block;
      left: 10%;
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
      justify-content: left;
      left: -120px;
    }
  }

  @media screen and (max-width: 900px) {
    .MainWrapper {
      width: 80%;
    }
  }
  @media screen and (max-width: 600px) {
    .MainWrapper {
      width: 80%;
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
      width: 80%;
    }
    .form {
      width: 80%;
    }
    .input {
      width: 80%;
    }
  }
`;
const Label = styled.label`
  color: black;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
`;
const Btn = styled.button`
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

const FormMainWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("+998");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoader(true);
    const user = {
      phone_number: phoneNumber,
      password: password,
    };
    fetch("https://clinic-srm.uz.custom.uz/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access_token) {
          dispatch(setToken(data.access_token));
          dispatch(setRole(data.roles));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(data.access_token)
          );
          localStorage.setItem("role", JSON.stringify(data.roles));
          console.log(data);
          navigate("/");
          setLoader(false);
        }
      })
      .catch((err) => {
        toast.error("Login sahifadagi hatolik",{position:"top-center"})
        console.log(err);
        setLoader(false);
      });
  }

  const handleButtonClick = (userType) => {
    if (userType === "admin") {
      setPhoneNumber("+998882042620");
      setPassword("12345");
    } else if (userType === "doctor") {
      setPhoneNumber("+998911537574");
      setPassword("12345");
    } else if (userType === "ordinary_user") {
      setPhoneNumber("+998931654529");
      setPassword("12345");
    }else if (userType === "diagnos") {
      setPhoneNumber("+998941213399");
      setPassword("12345");
    }
  };


  return (
    <>
      {loader ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
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
              marginTop: "50px",
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
            >
              CLINIVA
            </p>
          </div>

          <FormMainWrapper className="MainWrapper">
            <form
              className="form"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  fontWeight: "900",
                  marginBottom: "20px",
                }}
              >
                XUSH KELIBSIZ
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: "10px",
                }}
              >
                <Button
                  variant="soft"
                  style={{ fontSize: "18px", padding: "10px 25px" }}
                  size="lg"
                  color="primary"
                  onClick={() => handleButtonClick("admin")}
                >
                  Admin
                </Button>
                <Button
                  variant="soft"
                  style={{ fontSize: "18px", padding: "10px 25px" }}
                  size="lg"
                  color="success"
                  onClick={() => handleButtonClick("doctor")}
                >
                  Shifokor
                </Button>
                <Button
                  variant="soft"
                  size="lg"
                  style={{ fontSize: "18px", padding: "10px 25px" }}
                  color="danger"
                  onClick={() => handleButtonClick("ordinary_user")}
                >
                  Bemor
                </Button>
                <Button
                  variant="soft"
                  size="lg"
                  style={{ fontSize: "18px", padding: "10px 25px" }}
                  color="warning"
                  onClick={() => handleButtonClick("diagnos")}
                >
                  Diagnostika bo’limi
                </Button>
              </div>
              <div>
                <FormWrapper>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "20px",
                    }}
                  >
                    <Label htmlFor="ism">Telefon raqamingizni kiriting</Label>
                    <Input
                      className="input"
                      required
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                    <Label htmlFor="ism">Parolni kiriting</Label>

                    <Input
                      className="input"
                      required
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Parolni kiriting"
                    />
                  </div>
                  <label
                    htmlFor="checkbox"
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "21px",
                      marginTop: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      id="checkbox"
                      style={{ width: "15px" }}
                      type="checkbox"
                    />{" "}
                    Parolni saqlash
                  </label>

                  <Btn
                    className="input"
                    disabled={loader}
                    onClick={handleLogin}
                  >
                    Kirish
                  </Btn>

                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "21px",
                      marginTop: "20px",
                    }}
                  >
                    Ro&apos;yhatdan o&apos;tmagan bo&apos;lsangiz:{"  "}
                    <NavLink
                      style={{ textDecoration: "none", color: "#0062ff" }}
                      to="/register"
                    >
                      Ro&apos;yhatdan o&apos;tish
                    </NavLink>
                  </p>
                </FormWrapper>
              </div>
            </form>
          </FormMainWrapper>
        </RegisterWrapper>
      )}
    </>
  );
}

export default LoginPage;
