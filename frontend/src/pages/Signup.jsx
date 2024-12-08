import { WrapperSign } from "../components/WrapperSign.jsx";
import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { InputField } from "../components/InputField.jsx";
import { ButtonComponent } from "../components/ButtonComponent.jsx";
import { BottomWarning } from "../components/BottomWarning.jsx";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  return (
    <WrapperSign>
      <Heading label={"Sign Up"} />
      <SubHeading label={"Enter your information to create an account"} />
      <InputField
        onChange={(e) => setFirstName(e.target.value)}
        label={"First Name"}
        placeholder="Harry"
      />
      <InputField
        onChange={(e) => setlastName(e.target.value)}
        label={"Last Name"}
        placeholder="Potter"
      />
      <InputField
        onChange={(e) => setUsername(e.target.value)}
        label={"Email"}
        placeholder="harry.potter@gmail.com"
      />
      <InputField
        onChange={(e) => setPassword(e.target.value)}
        label={"Password"}
        placeholder="password123"
      />
      <div className="pt-4">
        <ButtonComponent
          label={"Sign Up"}
          onClick={async() => {
            const response=await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password,
            });
            localStorage.setItem("token",response.data.token)
            navigate('/signin')
          }}
        />
      </div>
      <BottomWarning
        warning={"Already have an account?"}
        buttonText={"Signin"}
        to={"/signin"}
      />
    </WrapperSign>
  );
}
