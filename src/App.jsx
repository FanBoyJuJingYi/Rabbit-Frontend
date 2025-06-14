import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./page/Home";
import { Toaster } from "sonner";
import Login from "./page/Login";
import Register from "./page/Register";
import Profile from "./page/Profile";
import CollectionPage from "./page/CollectionPage";

const App = () => {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
        </Route>
        <Route> {/* Admin Layout*/}</Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
