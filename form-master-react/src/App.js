import "./App.css"
import FormOperation from "pages/form-operation/FormOperation";
import ErrorBoundary from "component/error-boundary/ErrorBoundary"
import Login from "pages/login/Login";
import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";
import { AuthContextProvider } from "context/authentication/auth-context";
import Guest from "pages/guest/Guest"
import Admin from "pages/admin/Admin";
import HumanResource from "pages/human-resource/HumanResource";
import DashBoardPage from "pages/dashboard/DashBoardPage";
import Home from "pages/homepage/Home";

function App() {

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/">
              <Route index element={<Home/>}></Route>
              <Route path="/dashboard" element={<DashBoardPage/>}></Route>
              <Route path="/form" element={<FormOperation />}></Route>
              <Route path="/guest" element={<Guest/>}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/human-resource" element={<HumanResource />}></Route>
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
