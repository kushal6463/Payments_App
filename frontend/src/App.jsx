import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";
import { DashBoard } from "./pages/DashBoard.jsx";
import { SendMoney } from "./pages/SendMoney.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/send' element={<SendMoney/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
  