//Components
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Play from "./components/Play";
import Users from "./components/Users";
import Profile from "./components/Profile";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import Missing from "./components/Missing";
import List from "./components/List";
import Admin from "./components/Admin";
import Editor from "./components/Editor";

import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]}
                />
              }
            >
              <Route path="users" element={<Users />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]}
                />
              }
            >
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.User, ROLES.Editor, ROLES.Admin]}
                />
              }
            >
              <Route path="play" element={<Play />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />
              }
            >
              <Route path="editor" element={<Editor />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="problems" element={<List />} />
            </Route>
          </Route>

          {/* Just changes the allowedRoles array to change the allowed roles */}

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
