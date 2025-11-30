import React from "react";
import { useState, useEffect } from "react";

const Task = ({ title, desc, status, width }) => {
  const [borderColor, setBorderColor] = useState();

  useEffect(() => {
    if (status === "To Do") setBorderColor("yellow");
    else if (status === "In Progress") setBorderColor("#268ad1");
    else if (status === "Done") setBorderColor("#d91e94")
  }, [status]);

  return (
    <div
      className="lg:w-[18.5rem] w-[8rem] h-[10rem] lg:h-[13rem] rounded-2xl bg-[#1c1f2b] text-shadow-none pt-[0.5vmin]"
      style={{ border: `1px solid ${borderColor}`}}
    >
      <div className="w-full h-[15%] flex justify-center lg:text-[18.5px] text-[10px]">
        <h1>{title ? title.slice(0,17) : "Title Of Task"}</h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[90%] h-0.5 bg-amber-50 rounded-2xl"></div>
      </div>

      <div className="w-full h-[60%] flex justify-center">
        <div className='w-[90%] h-[12.5vh] lg:text-[13px] text-[9px] text-center mt-2 font-["ubuntu",_sans_serif] text-[#cabdbd]'>
          <p className="w-full h-full break-words overflow-y-auto text-left px-2">
            {desc
              ?  `${desc.slice(0, 165)}`
              : "Lorem ipsum, dolor sit amet consectetur adipisicing elit Sed dicta labore itaque inventore natus iure doloremque ipsam ratione eos"}
          </p>
        </div>
      </div>
      <div className="w-full h-[20%] flex justify-center mt-0.5">
        <div className="lg:w-[95%] h-full lg:flex hidden justify-between items-center">
          <div
            className="p-1.5 h-[85%] rounded-2xl flex justify-center items-center text-[#3f3737] font-medium"
            style={{
              fontSize: status == "IN PROGRESS" ? "13px" : "16px",
              background: borderColor,
            }}
          >
            <h1>{status ? status : "TO DO"}</h1>
          </div>

          <div className="w-[10.5%] h-[70%] flex justify-center items-center text-2xl cursor-pointer">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
