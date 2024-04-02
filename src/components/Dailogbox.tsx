import React from "react";

function Dailogbox({ massage,onDailog }: { massage: string,onDailog:any }) {
  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)]">
      <div style={
        {
            transform:"translate(-50%, -50%)"
        }
      } className="flex justify-center absolute top-[50%] left-[50%]">
        <div className="bg-white w-96 flex py-5 px-2 items-center justify-center flex-col h-96">

        <h3 className=" text-4xl text-center my-3">{massage}</h3>
        <div className=" flex items-center">
          <button onClick={()=>onDailog(true)} className="bg-red-600 px-3 py-2 text-white rounded-sm mx-5">yes</button>
          <button onClick={()=>onDailog(false)} className="bg-black px-3 py-2 text-white rounded-sm mx-5">No</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dailogbox;
