import useGetSocket from "../hooks/useGetSocket";
import Chatboard from "./Chatboard"

const Rightlayout = () => {
  useGetSocket();

  return (
    <>
      <div className="m-2">
        <div className="w-full h-full">
          <Chatboard />
        </div>
      </div>
    </>
  )
}

export default Rightlayout
