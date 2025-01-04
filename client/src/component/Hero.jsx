import Leftlayout from "./Leftlayout"
import Rightlayout from "./Rightlayout"

const Hero = () => {
    return (
        <>

            <div className="bg-gray-600  h-[100vh] flex items-center justify-center">
                <div className="border flex">
                    <Leftlayout />

                    <Rightlayout />
                </div>
            </div>
        </>
    )
}

export default Hero
