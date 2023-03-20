import Image from "next/image"
import logo from "../public/logo.svg"

const Screen = () => {

    return (
        <div className="absolute flex justify-center items-center border-5 border-black w-screen h-screen bg-white z-50">
            <div className="p-20">
                <div className="m-auto w-fit">
                    <Image src={logo} width={150} alt="GCT"/>
                </div>
                <div className="text-3xl fond-bold text-center my-10">
                    GCTERP
                </div>
                <div className="h-2 w-[300px] bg-white border rounded-full shadow">
                    <div className="progress-bar h-2 bg-blue-500 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default Screen