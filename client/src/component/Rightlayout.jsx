import useGetAllTheMessage from "../hooks/useGetAllTheMessage";
import useGetSocket from "../hooks/useGetSocket";
import Chatboard from "./Chatboard"

const Rightlayout = () => {
  useGetSocket();
  useGetAllTheMessage();

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
