import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
export default function ContinueWithGoogleButton() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(
          credentialResponse.credential
            ? jwtDecode(credentialResponse.credential)
            : "Credential is undefined"
        );
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
