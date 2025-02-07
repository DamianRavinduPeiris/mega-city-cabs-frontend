import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { searchUser } from "../util/AuthHandler";
import UserType from "../types/UserType";
export default function ContinueWithGoogleButton() {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const decodedToken = credentialResponse.credential
          ? jwtDecode<UserType>(credentialResponse.credential)
          : null;


        if (decodedToken) {
          searchUser(decodedToken);
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
