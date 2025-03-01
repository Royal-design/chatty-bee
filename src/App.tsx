import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./components/Register";
import { Toaster } from "sonner";
import { Login } from "./components/Login";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useEffect } from "react";
import { checkAuthState, getUserData, getUsers } from "./redux/slice/authSlice";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProfileLayout } from "./Layouts/ProfileLayout";
import { RootLayout } from "./Layouts/RootLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { ChatsPage } from "./pages/ChatsPage";
import { UsersPage } from "./pages/UsersPage";
import { PublicLayout } from "./Layouts/PublicLayout";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(checkAuthState());
    dispatch(getUsers());
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// Public Routes (Login & Register)
// <Route path="/login" element={<Login />} />
// <Route path="/register" element={<Register />} />

// {/* Protected Routes (Require Authentication) */}
// <Route path="/" element={user ? <RootLayout /> : <Login />}>
//   <Route index element={<ChatPage />} />
//   <Route path="profile" element={<ProfileLayout />}>
//     <Route index element={<ProfilePage />} />
//   </Route>
// </Route>

// {/* Catch-All Route for 404 Error Page */}
// <Route path="*" element={<ErrorPage />} />
