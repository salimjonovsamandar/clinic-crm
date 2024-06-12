import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
} from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useSelector } from "react-redux";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const role = useSelector((state) => state.userToken.role);
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/">
            <HiOutlineHome />
            <span>Asosiy Sahifa</span>
          </StyledNavLink>
        </li>
        {role == "admin" && (
          <>
            <li>
              <StyledNavLink to="/patients">
                <FaHospitalUser />
                <span>Bemorlar</span>
              </StyledNavLink>
            </li>
            <li>
              {/* //   <StyledNavLink to="/patientProfile"> */}
              <StyledNavLink to="/doctors">
                <FaUserDoctor />
                <span>Shifokorlar</span>
              </StyledNavLink>
            </li>
          </>
        )}
        {role && role == "ordinary_user" && (
          <>
            <li>
              <StyledNavLink to="/profile">
                <ImProfile />
                <span>Bemor sahifasi</span>
              </StyledNavLink>
            </li>
          </>
        )}
        {role && role == "doctor" && (
          <>
            <li>
              <StyledNavLink to="/patients">
                <FaHospitalUser />
                <span>Bemorlar</span>
              </StyledNavLink>
            </li>
          </>
        )}
        {/* {role && role == "diagnos" && (
          <>
            <li>
              <StyledNavLink to="/patients">
              <FaHospitalUser />
                <span>Bemorlar</span>
              </StyledNavLink>
            </li>
          </>
        )} */}
      </NavList>
    </nav>
  );
}

export default MainNav;
