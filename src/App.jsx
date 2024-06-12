import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import RegisterPage from "../src/Pages/Auth/RegisterPage/RegisterPage";
import LoginPage from "../src/Pages/Auth/LoginPage/LoginPage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "./store/userToken";
import PatientList from "./Pages/PatientList";
import PatientProfile from "./Pages/PatientProfile";
import BemorTable from "./Pages/BemorTable";
import HomePatient from "./Pages/HomePatient";
import BemorUi from "./Components/BemorUi";
import MainTable from "./Components/MainTable";

import DoctorTable from "./Components/DoctorTable";

import DoctorPatient from "./Pages/DoctorPatient";

function App() {
  const token = useSelector((state) => state.userToken.token);
  const role = useSelector((state) => state.userToken.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = useLocation()
  function fetchUserRole() {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.user_roles;
      const currentTime = Date.now() / 1000;
      dispatch(setRole(userRole));
      if (decodedToken.exp < currentTime) {
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("accessToken") && pathname.pathname != "/register") {
      navigate("/login");
    }
    fetchUserRole();

  }, [navigate, token]);

  function ProtectedRoute({
    children,
    redirectTo = "/login",
    isAuthentication,
  }) {
    useEffect(() => {
      if (!isAuthentication) {
        navigate(redirectTo);
      }
    }, [isAuthentication, navigate, redirectTo]);

    return children;
  }

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {token !== null && role == "admin" && (
          <>
           <Route
            path="/"
            element={
              <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                <AppLayout>
                  <HomePatient />
                </AppLayout>
              </ProtectedRoute>
            }
          />
            <Route
              path="/patients"
              element={
                <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                  <AppLayout>
                    <PatientList />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients/:id"
              element={
                <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                  <AppLayout>
                  <PatientProfile />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
           <Route
            path="/doctors"
            element={
              <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                <AppLayout>
                <MainTable />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          </>
        )}
        {token !== null && role == "ordinary_user" && (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                  <AppLayout>
                    <BemorUi />
                   <MainTable/>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                  <AppLayout>
                    <PatientProfile />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </>
        )}
        {token !== null && role == "doctor" && (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                  <AppLayout>
                    <BemorUi/>
                    <BemorTable />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                  <AppLayout>
                    <DoctorPatient />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients/:id"
              element={
                <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                  <AppLayout>
                  <PatientProfile />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </>
        )}
        {token !== null && role == "diagnos" && (
          <>
           <Route
            path="/"
            element={
              <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                <AppLayout>
                  <BemorUi />
                </AppLayout>
              </ProtectedRoute>
            }
            />
           <Route
              path="/patients/:id"
              element={
                <ProtectedRoute isAuthentication={!!token} redirectTo="/login">
                  <AppLayout>
                  <PatientProfile />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
