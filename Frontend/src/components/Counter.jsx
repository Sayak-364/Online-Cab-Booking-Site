import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Counter=()=>{

    const [counterOn,setCounterOn] = useState(false)

    return(
        <div className="counter-main">
            <div className="counter" id="counter-1">
                <div className="numbers">
                    <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(true)}>
                        <p>
                            {counterOn && <CountUp start={10} end={60} duration={5} delay={0} useEasing={false} />}
                        </p>
                    </ScrollTrigger>
                </div>
                <div >
                    <label>Year</label><br/>
                    <label>Experienced</label>
                </div>
            </div>
            <div className="counter">
                <div className="numbers">
                    <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(true)}>
                        <p>
                            {counterOn && <CountUp start={200} end={1090} duration={5} delay={0} useEasing={false} />}
                        </p>
                    </ScrollTrigger>
                </div>
                <div>
                    <label>Total</label><br/>
                    <label>Cars</label>
                </div>
            </div>
            <div className="counter"> 
                <div className="numbers">
                    <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(true)}>
                        <p>
                            {counterOn && <CountUp start={700} end={2590} duration={5} delay={0} useEasing={false} />}
                        </p>
                    </ScrollTrigger>
                </div>
                <div>
                    <label>Happy</label><br/>
                    <label>Coustomers</label>
                </div>
            </div>
            <div className="counter">
                <div className="numbers">
                    <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(true)}>
                        <p>
                            {counterOn && <CountUp start={15} end={67} duration={5} delay={0} useEasing={false} />}
                        </p>
                    </ScrollTrigger>
                </div>
                <div>
                    <label>Total</label><br/>
                    <label>Branches</label>
                </div>
            </div>

        </div>
    )


}

export default Counter
