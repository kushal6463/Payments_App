import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function SendMoney() {
  const [amount, setAmount] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const friendId = queryParams.get("id");
  const friendName = queryParams.get("name");

  return (
    <div className="flex justify-center h-screen bg-slate-400">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-gray-300 shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-4">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {friendName?.[0]?.toUpperCase() || "A"}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">
                {friendName || "Friend's Name"}
              </h3>
            </div>
            <div className="space-y-4 pt-4">
              <div className="space-y-2 pl mb-2">
                <label
                  className="m-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    const input = e.target.value;
                    const parsedAmount = parseInt(input, 10);
                    setAmount(parsedAmount || 0);
                    console.log(amount) // Set to 0 if parsedAmount is NaN
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={() => {
                  axios.post(
                    "http://localhost:3000/api/v1/account/transfer",
                    {
                      amt: amount,
                      to: friendId,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                }}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
