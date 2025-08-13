import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import RFPApprovalPanelMJ from "./RFPApprovalFormMJ";
import { ITopContext } from "../../hooks/TopContext";
import { useUserStore } from "../userStore/useUserStore";

const LoginWrapperMJ = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userToLogin, setUserTologin] = useState({
    id: 0,
    username: "",
    password: "",
  });
  const [unauthorized, setUnauthorized] = useState(false);

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const rfpNum = searchParams.get("rfpNum");
  const approverEmail = searchParams.get("approverEmail");

  console.log("searchParams:", rfpNum);

  const {
    setuserid,
    setPop,
    setpopLabel,
    setpopTitle,
    setUserInfo,
    setModule,
    setPopLoadBol,
    setloading,
    setCanNavigate,
    userInfo,
  } = useContext(ITopContext);

  const LoginInfo = (e) => {
    const { name, value } = e.target;
    setUserTologin((prev) => ({ ...prev, [name]: value }));
  };

  const logMeIn = async () => {
    setError("");
    if (!userToLogin.username || !userToLogin.password) {
      setError("Please fill in both username and password.");
      return;
    }

    setLoading(true);
    setPopLoadBol(true);
    setloading(true);

    try {
      const res = await fetch("/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userToLogin),
      });
      const newData = await res.json();

      if (
        !Array.isArray(newData) ||
        newData.length === 0 ||
        newData[0].ID === 0
      ) {
        setpopTitle("Incorrect Credentials");
        setpopLabel("Either the email/username or password is incorrect");
        setPop(true);
        setError("Incorrect username or password.");
        setLoading(false);
        setPopLoadBol(false);
        setloading(false);
        return;
      }

      setUserInfo(newData[0]);
      setuserid(newData[0].ID);
      setModule(1);
      setLoggedIn(true);
      setCanNavigate(false);
    } catch (err) {
      setpopTitle("Connection Error");
      setpopLabel(err.message);
      setPop(true);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
      setPopLoadBol(false);
      setloading(false);
    }
  };

  const isAdmin = userInfo?.ID === 9454 || userInfo?.ID === 10481;

  const isRFPApprover = loggedIn && rfpNum && approverEmail && token;

  if (isAdmin || isRFPApprover) {
    return (
      <RFPApprovalPanelMJ
        username={userToLogin.username}
        password={userToLogin.password}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#f3f4f6]"
      aria-live="polite"
    >
      <div className="p-8 rounded shadow-md w-full max-w-sm bg-white">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold text-[#16A34A] leading-tight">
            Innovative Packaging Industry Corporation
          </h2>
        </div>

        <h3 className="text-2xl font-bold mb-6 text-center text-[#1f2937]">
          Login
        </h3>

        {unauthorized && (
          <p className="mb-4 text-center text-[#dc2626] font-semibold">
            You are not authorized to access this page.
            <br />
            Please contact your administrator.
          </p>
        )}

        {error && (
          <p className="mb-4 text-center text-[#dc2626]" role="alert">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#374151]"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={userToLogin.username}
            onChange={LoginInfo}
            className="w-full px-3 py-2 border rounded border-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            disabled={loading}
            autoComplete="username"
            aria-required="true"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#374151]"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={userToLogin.password}
            onChange={LoginInfo}
            className="w-full px-3 py-2 border rounded border-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
            disabled={loading}
            autoComplete="current-password"
            aria-required="true"
            onKeyDown={(e) => {
              if (e.key === "Enter") logMeIn();
            }}
          />
        </div>

        <button
          onClick={logMeIn}
          disabled={loading || !userToLogin.username || !userToLogin.password}
          className={`w-full text-white py-2 rounded transition font-medium ${
            loading || !userToLogin.username || !userToLogin.password
              ? "bg-[#a5d6a7] cursor-not-allowed"
              : "bg-[#16a34a] hover:bg-[#15803D]"
          }`}
          aria-busy={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginWrapperMJ;
