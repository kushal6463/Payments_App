export function Balance({ value }) {
  return (
    <div className="flex mt-4 pl-2 py-2">
      <div className="font-bold text-xl">Your Balance:</div>
      <div className="font-semibold ml-4 text-xl">Rs  {value}</div>
    </div>
  );
}
