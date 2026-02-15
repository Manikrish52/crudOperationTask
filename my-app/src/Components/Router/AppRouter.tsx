import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersPage from "../UsersPage";
import CreateUserPage from "../CreateUserPage";
import EditUserPage from "../EditUserPage";
import ViewUserPage from "../ViewUserPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/create" element={<CreateUserPage />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
        <Route path="/view/:id" element={<ViewUserPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
