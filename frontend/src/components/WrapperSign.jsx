export function WrapperSign({ children }) {
    return (
      <div className="bg-slate-400 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-[360px] text-center p-2 h-max px-4 shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    );
  }