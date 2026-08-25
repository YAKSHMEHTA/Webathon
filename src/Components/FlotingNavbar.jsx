import React, { useLayoutEffect, useEffect, useRef, useEffectEvent } from "react";
import gsap from "gsap";
import "../App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP); 
gsap.registerPlugin(ScrollTrigger);

function FlotingNavbar() {

  useGSAP(() => {

    const fade = ()=>{
      gsap.to(".par",{y:-150,opacity:0,duration:0.7,ease:"sine.out"});
    }

    const fadeIn = ()=>{
      gsap.to(".par",{y:0,opacity:1,ease:"power2.out"});
    }

    const tl =gsap.timeline({
    scrollTrigger:{
      markers:true,
      trigger:".par",
      start:"top 5%",
      end:"+=800px",
      onUpdate:(self)=>{
        if(self.direction > 0){
          fade();
        }else if(self.direction < 0){
          fadeIn();
        }
      }
    }

  })
  
  },[])
  


  return (
    <>
      <div className="flex justify-center ">
        <div style={{paddingInline:"0.7rem"}} className="fixed par top-5 h-13 flex items-center gap-3  left-center border-[2px] border-[#121212]  w-100 rounded-4xl px-5 bg-black border-solid z-50">
          <div  className="flex justify-around items-center gap-1 w-full">
            <div
              style={{ paddingInline: "1rem",paddingBlock:"0.4rem" }}
              className="  flex justify-center h-10  items-center text-[#717171] hover:text-white rounded-4xl hover:bg-[#1a191a]"
            >
              <a href="/" className="px-5 ">
                Home
              </a>
            </div>
            <div style={{ paddingInline: "1rem",paddingBlock:"0.8rem" }} className=" h-10 text-[#717171] hover:text-white  flex justify-center items-center rounded-4xl hover:bg-[#1a191a]">
              <a href="/">About</a>
            </div>
            <div style={{ paddingInline: "1rem",paddingBlock:"1rem" }} className="h-10 text-[#717171] hover:text-white flex justify-center items-center rounded-4xl hover:bg-[#1a191a]">
              <a href="/">Contact</a>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2 w-full">
            <div className="h-7 w-0.5  bg-[#121212]"></div>
            <div style={{ paddingInline: "1rem",paddingBlock:"1rem" }} className="h-10 text-black bg-white flex justify-center items-center rounded-4xl hover:shadow-xs hover:shadow-white">
              <a href="/">Login</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlotingNavbar;
