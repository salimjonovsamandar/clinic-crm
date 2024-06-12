import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { useState } from "react";
import { Dialog } from "@mui/material";
import OutlineAdUserModal from './OutlineAdUserModal/OutlineAdUserModal'
import { useSelector } from "react-redux";
import adduserIcon from "../../src/assets/user-plus-solid.svg";


const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2rem 2rem 6.4rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout({children}) {
  const [open, setOpen] = useState(false);
  const role = useSelector((state) => state.userToken.role);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
      {children}
        </Container>
      </Main>
     {
      role == "admin" && (
        <>
         <div
        onClick={handleOpen}
        className="createBtn w-full max-w-20 text-[40px] cursor-pointer text-white h-20 rounded-full flex items-center justify-center absolute bottom-16 right-16 bg-[#0e95d8]"
      >
     <img width="25px" height="25px" src={adduserIcon} alt="" />
      </div>
      <Dialog
        size="md"
        open={open}
        className="bg-transparent shadow-none"
      >
      <OutlineAdUserModal handleClose={handleOpen}/>
      </Dialog></>
      )
     }
    </StyledAppLayout>
  );
}

export default AppLayout;
