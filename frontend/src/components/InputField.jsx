export function InputField({label,placeholder,onChange}) {
    return (<div>
        <div className="text-md font-medium text-left py-2">{label}</div>
        <div><input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded-md border-slate-200" /></div>
    </div>)
}