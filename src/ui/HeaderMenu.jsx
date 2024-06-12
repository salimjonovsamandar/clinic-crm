import styled from "styled-components";
// import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { IoMdExit } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";


const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  li {
    cursor: pointer;
  }
`;

function HeaderMenu() {
  const [user, setUser] = useState()
  const token = useSelector((state) => state.userToken.token);
  const decodedToken = jwtDecode(token);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://clinic-srm.uz.custom.uz/users/${decodedToken.user_id}/`)
  .then(res => res.json())
  .then(val => setUser(val))
  },[decodedToken.user_id])
function handleLogout () {
  localStorage.clear()
  navigate('/login')
}
// console.log(user);
  return (
    <StyledHeaderMenu>
      <li className="flex items-center gap-x-2">
        <small className="border rounded-full p-[3px] bg-gray-700 text-[25px] text-white">
        <FaRegUser />
        </small>
        <p className="text-[20px]">{user?.first_name}</p>
      </li>
      <li className="border-red-200 border p-1 flex items-center text-[20px]" onClick={handleLogout}>
        Chiqish
        <IoMdExit />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
