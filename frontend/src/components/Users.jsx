import { useEffect, useState } from "react";
import { ButtonComponent } from "./ButtonComponent.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users() {
  const [users, setUsers] = useState([]);
  const [filter,setFilter]=useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
      .then((response) => setUsers(response.data.user));
  }, [filter]);

  return (
    <div className="px-2">
      <div className="font-bold mt-8 text-xl pl-1">Users</div>
      <div className="my-3">
        <input
          onChange={(e)=>setFilter(e.target.value)}
          type="text"
          placeholder="Search users ..."
          className="w-full px-3 py-2 border rounded border-slate-500 bg-gray-700 text-slate-200 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  ); 
}

function User({ user }) {
  const navigate=useNavigate();

  return (
    <div className="flex justify-between p-1.5">
      <div className="flex ">
        <div className="flex justify-center rounded-full h-10 w-10 bg-slate-200 mt-1.5 ml-1">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full ml-2">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="h-full flex flex-col justify-center pt-1.5">
        <ButtonComponent onClick={(e)=>{
          navigate(`/send?id=${user._id}&name=${user.firstName}`)
        }} label={"Send Money"} />
      </div>
    </div>
  );
}
