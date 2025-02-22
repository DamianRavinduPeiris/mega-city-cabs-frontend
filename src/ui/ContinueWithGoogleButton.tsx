import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { searchUser } from "../util/AuthHandler";
import UserType from "../types/UserType";
import { useNavigate } from "react-router-dom";

export default function ContinueWithGoogleButton() {
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const decodedToken = credentialResponse.credential
          ? jwtDecode<UserType>(credentialResponse.credential)
          : null;


        if (decodedToken) {
          searchUser(decodedToken, navigate);
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
