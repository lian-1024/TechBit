import { FC, PropsWithChildren } from "react"



const TechBitMain: FC<PropsWithChildren> = ({ children }) => {
    return <main>
        {children}
    </main>
}

export default TechBitMain