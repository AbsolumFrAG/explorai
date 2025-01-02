import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import NoUserProtectedRoute from "./components/protected-routes/ProtectedRoute";
import UserProtectedRoute from "./components/protected-routes/UserProtectedRoute";
import Navbar from "./components/ui/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { ItineraryProvider } from "./context/ItineraryContext";
import { LoadingProvider } from "./context/LoadingContext";
import "./i18n";
import NotFound from "./pages/404/index";
import AuthWrapper from "./pages/auth/auth/AuthWrapper";
import Account from "./pages/auth/index";
import Blog from "./pages/blog/index";
import Home from "./pages/home/index";
import Planner from "./pages/planner/index";
import SharedItinerary from "./pages/planner/SharedItinerary";

const App: FC = () => {
  return (
    <div className="App">
      <ItineraryProvider>
        <AuthContextProvider>
          <Navbar />
          <LoadingProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/planner/shared/:shareId" element={<SharedItinerary />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/account" element={<NoUserProtectedRoute component={Account} />} />
              <Route path="/sign" element={<UserProtectedRoute component={AuthWrapper} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LoadingProvider>
        </AuthContextProvider>
      </ItineraryProvider>
    </div>
  );
};

export default App;