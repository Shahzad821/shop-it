import { Route, Routes } from "react-router-dom";
import Navabar from "./components/header";
import Footer from "./components/footer";

import Search from "./components/search";
import { Toaster } from "react-hot-toast";

import ScrollToTop from "./components/scroll";
import UserRoute from "./components/route/userRoute";
import UseAdminRoute from "./components/route/adminRoute";
import NotFound from "./components/NoFound";

const App = () => {
  const userRoute = UserRoute();
  const adminRoute = UseAdminRoute();
  return (
    <>
      <ScrollToTop />
      <Navabar />
      <Search />

      <div className="container mx-auto px-4">
        <Routes>
          {userRoute}
          {adminRoute}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
};

export default App;
