import { WrapperSign } from "../components/WrapperSign.jsx";
import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { InputField } from "../components/InputField.jsx";
import { ButtonComponent } from "../components/ButtonComponent.jsx";
import { BottomWarning } from "../components/BottomWarning.jsx";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const navigate = useNavigate();

  return (
    <WrapperSign>
      <Heading label={"Sign In"} />
      <SubHeading label={"Enter your credentails to access your account"} />
      <InputField
        label={"Email"}
        placeholder="harry.potter@gmail.com"
      />
      <InputField
        label={"Password"}
        placeholder=""
      />
      <div className="pt-4">
        <ButtonComponent
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3000/api/v1/user/signin",
              {
                username,
                password,
              }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
          label={"Sign In"}
        />
      </div>
      <BottomWarning
        warning={"Don't have an account?"}
        buttonText={"Signin"}
        to={"/signup"}
      />
    </WrapperSign>
  );
}
