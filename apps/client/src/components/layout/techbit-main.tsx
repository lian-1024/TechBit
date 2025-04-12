import { FC, PropsWithChildren } from "react"

  


const TechBitMain: FC<PropsWithChildren> = ({ children }) => {
    return <main className="max-w-7xl mx-auto mt-20">
        {children}
    </main>
}

export default TechBitMain