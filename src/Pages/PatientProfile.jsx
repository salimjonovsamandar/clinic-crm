import { jwtDecode } from "jwt-decode";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import OutlinedInput from "../ui/OutlineInput/OutlinedInput";
import Textarea from "../ui/Textarea";
import Heading from "../ui/Heading";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Spinner from "../ui/Spinner";
import DoctorTable from "../Components/DoctorTable";
import toast from "react-hot-toast";

const Profile = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.5rem;
`;

const Label = styled.label`
  /* color: #504f54; */
  color: black;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
`;

const FileForm = styled.div`
  border: 2px dashed var(--color-grey-300);
  padding: 20px;
  margin-top: 20px;
  a {
    text-decoration: underline;
    color: var(--color-indigo-700);
  }
`;

function PatientProfile() {
  const [userVal, setUserVal] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const token = useSelector((state) => state.userToken.token);
  const role = useSelector((state) => state.userToken.role);
  const formRef = useRef();
  const shikoyat = useRef();
  const davolash = useRef();
  const tavsiya = useRef();
  const tashxis = useRef();
  const decodedToken = jwtDecode(token);
  const diagnostFileName = selectedFile?.name;
  let PatientRoleProfile = "";
  if (decodedToken.user_roles == "ordinary_user") {
    PatientRoleProfile = decodedToken.user_id;
  }

  function handleFileChange(file) {
    setSelectedFile(file);
  }
  useEffect(() => {
    fetch(`https://clinic-srm.uz.custom.uz/users/${id || PatientRoleProfile}/`)
      .then((res) => res.json())
      .then((val) => setUserVal(val));
  }, [id]);

  function submitFn(e) {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append("diagnos_file", selectedFile);
    }
    formData.append("user_id", userVal.id);
    formData.append("first_name", userVal.first_name);
    formData.append("last_name", userVal.last_name);
    formData.append("phone_number", userVal.phone_number);
    formData.append("user_roles", userVal.user_roles);
    formData.append("region", userVal.region);
    formData.append("doctor_direction", decodedToken.region);
    formData.append("complaint", shikoyat.current?.value || userVal.complaint);
    formData.append("doctor_direction", null);
    formData.append("created_at", userVal.created_at);
    formData.append(
      "recommendation",
      tavsiya.current?.value || userVal.recommendation
    );
    formData.append("diagnostik_name", davolash.current?.value);
    formData.append("diagnostik_cure", tashxis.current?.value);
    formData.append(
      "doctor_name",
      decodedToken.first_name + decodedToken.last_name
    );
    fetch(`https://clinic-srm.uz.custom.uz/users/${userVal.id}/`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Javobingiz yuborildi ", { position: "top-center" });
      })
      .catch((error) => {
        toast.error("Javobingiz yuborilmadi ", { position: "top-center" });
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Profile>
        <Heading as="h3">Bemor sahifasi</Heading>
        <form id="formR" onSubmit={(e) => submitFn(e)} ref={formRef} action="">
          <div className="flex w-full gap-12 mt-6">
            <OutlinedInput
              label="Ism"
              placeholder="Ism"
              type="text"
              value={userVal.first_name}
            />
            <OutlinedInput
              label="Familya"
              placeholder="Familya"
              type="text"
              value={userVal.last_name}
            />
          </div>
          <div className="flex w-full gap-12 mt-6">
            <OutlinedInput
              label="Telefon Raqam"
              placeholder="Telefon Raqam"
              type="text"
              value={userVal.phone_number}
            />
          </div>
          <div className="flex w-full gap-12 mt-6">
            <OutlinedInput
              label="Yashash joyi"
              placeholder="Yashash joyi"
              type="text"
              value={userVal.region}
            />
          </div>
          <div className=" w-full mt-5">
            <Label htmlFor="shikoyat">Shikoyati</Label>
            {role == "doctor" || role == "diagnos" ? (
              <Textarea
                disabled
                ref={shikoyat}
                type="text"
                id="shikoyat"
                defaultValue={userVal.complaint}
              />
            ) : (
              <Textarea
                ref={shikoyat}
                type="text"
                id="shikoyat"
                defaultValue={userVal.complaint}
              />
            )}
          </div>
          {role == "ordinary_user" ? (
            <>
              <div className="flex w-full gap-12 mt-3">
                <OutlinedInput
                  label="Aniq Tashhis"
                  placeholder="Aniq Tashhis"
                  type="text"
                  value={userVal.diagnostik_cure || ""}
                />
                <OutlinedInput
                  label="Tavsiya"
                  placeholder="Tavsiya"
                  type="text"
                  value={userVal.recommendation || ""}
                  ref={tavsiya}
                />
              </div>
              <div className="w-full mt-5">
                <Label htmlFor="davolash">Davolash</Label>
                <Textarea
                  ref={davolash}
                  type="text"
                  id="davolash"
                  value={userVal.diagnostik_name}
                />
              </div>
            </>
          ) : null}

          {role == "doctor" ? (
            <div className="flex w-full gap-12 mt-3">
              <OutlinedInput
                label="Aniq Tashhis"
                placeholder="Aniq Tashhis"
                type="text"
                defaultValue={userVal.diagnostik_cure || ""}
                ref={tashxis}
              />
              <OutlinedInput
                label="Tavsiya"
                placeholder="Tavsiya"
                type="text"
                defaultValue={userVal.recommendation}
                ref={tavsiya}
              />
            </div>
          ) : null}
          {role == "doctor" ? (
            <>
              <div className="w-full mt-5">
                <Label htmlFor="davolash">Davolash</Label>
                <Textarea
                  ref={davolash}
                  type="text"
                  id="davolash"
                  defaultValue={userVal.diagnostik_name}
                />
              </div>
              {userVal.diagnos_file && (
                <FileForm>
                  <a href={userVal.diagnos_file} target="_blank">
                    Faylni ko'rish
                  </a>
                </FileForm>
              )}
            </>
          ) : null}
          {role == "diagnos" ? (
            <div className="flex w-full gap-12 mt-3">
              <OutlinedInput
                label="Aniq Tashhis"
                placeholder="Aniq Tashhis"
                type="text"
                value={userVal.diagnostik_cure || ""}
              />
              <OutlinedInput
                label="Tavsiya"
                placeholder="Tavsiya"
                type="text"
                value={userVal.recommendation || ""}
                ref={tavsiya}
              />
            </div>
          ) : null}
          {role == "diagnos" ? (
            <FileForm>
              <FileInput
                id="avatar"
                accept="pdf/*"
                onChange={handleFileChange}
                diagnostFileName={diagnostFileName}
              />
            </FileForm>
          ) : null}

          {role == "doctor" || role == "diagnos" || role == "ordinary_user" ? (
            <div className="flex gap-3 mt-10">
              <Button>Saqlash</Button>
            </div>
          ) : null}
        </form>
      </Profile>
      {role == "admin" && <DoctorTable />}
    </>
  );
}

export default PatientProfile;
