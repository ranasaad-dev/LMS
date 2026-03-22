import "./Input.css";
export default function Input ({t, n, v, p, o}){
    return (
        <input className="inputComponent" type={t} name={n} placeholder={p} value={v} onChange={o} />

    )
}