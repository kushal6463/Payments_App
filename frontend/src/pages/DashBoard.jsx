import { AppBar } from "../components/AppBar.jsx";
import { Balance } from "../components/Balance.jsx";
import { Users } from "../components/Users.jsx";

export function DashBoard() {
  return (
    <div className="min-h-screen bg-slate-400 pt-6">
      <div className="m-4 mt-0">
        <AppBar />
        <Balance value={1000} />
        <Users />
      </div>
    </div>
  );
}
