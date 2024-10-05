import { ReactNode } from "react"
import IcWarning from "./icons/IcWarning"

interface AlertProps {
    title: string
    children: ReactNode
    className?: string
}

export default function Alert({ children, title, className }: AlertProps) {
    return <div className={`border rounded-lg border-gray-200 p-5 flex flex-row gap-3 ${className ?? ''}`}>
        <IcWarning className="size-5 text-orange-400"/>
        <div className="flex-1 flex flex-col gap-1">
            <p className="font-semibold text-md">{title}</p>
            {children}
        </div>
    </div>
}