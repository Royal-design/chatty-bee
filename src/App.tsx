import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Toaster } from "sonner";
import { Login } from "./components/Login";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect } from "react";
import { checkAuthState, getUserData, getUsers } from "./redux/slice/authSlice";
import { ProfilePage } from "./pages/ProfilePage";
import { RootLayout } from "./Layouts/RootLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { ChatsPage } from "./pages/ChatsPage";
import { UsersPage } from "./pages/UsersPage";
import { PublicLayout } from "./Layouts/PublicLayout";
import { setOriginalUsers } from "./redux/slice/filterSlice";
import { ChatMessage } from "./pages/ChatMessage";
import { PrivateLayout } from "./Layouts/PrivateLayout";

function App() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthState());
    dispatch(getUsers());
    dispatch(getUserData());
  }, [dispatch]);

  useEffect(() => {
    if (users?.length) {
      dispatch(setOriginalUsers(users));
    }
  }, [users, dispatch]);
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<ChatsPage />} />
            <Route path="chats" element={<ChatsPage />} />
            <Route path="/chats/:chatId" element={<ChatMessage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
