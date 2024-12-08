export function AppBar() {
  return (
    <div className="bg-green-200 shadow-md font-semibold h-14 flex justify-between rounded-lg ">
      <div className="flex flex-col justify-center h-full ml-4">ZeePay</div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-4">Hello</div>
        <div className="flex justify-center rounded-full h-10 w-10 bg-slate-300 mt-2 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
      </div>
    </div>
  );
}
