import {  Routes, Route, HashRouter } from "react-router-dom";
import UsersPage from "../UsersPage";
import CreateUserPage from "../CreateUserPage";
import EditUserPage from "../EditUserPage";
import ViewUserPage from "../ViewUserPage";


const AppRouter = () => {
  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/create" element={<CreateUserPage />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
        <Route path="/view/:id" element={<ViewUserPage />} />

      </Routes>
    </HashRouter >
  );
};

export default AppRouter;
