import Empty from "../assets/empty.svg"
import { Link } from "react-router-dom"

interface EmptyRegistersProps {
    title: string
    linkLabel: string
    linkHref: string
}

export function EmptyRegisters({title, linkHref, linkLabel} : EmptyRegistersProps){

    return(
        <>
            <img src={Empty} alt="" className="h-1/3 w-1/3" />
            <div className="flex flex-col items-center gap-1/2">
                <span className="text-lg">{title}</span>
                <Link to={linkHref} className=" font-bold text-green-500 underline">{linkLabel}</Link>
            </div>
        </>
    )
    
}