import { useEffect, useRef, useState } from "react"


export default function TimeRanges(){
  const [timer, setTimer] = useState("00:00");
  const [isStart, setIsStart] = useState(false);
  const [remainTime, setRemainTime] = useState(0);
  let timeoutRef = useRef(null);
  
  function choixTimer(temp, isBtn = true){

    if(isBtn && isStart){
      setIsStart(false);
      clearTimeout(timeoutRef.current);
    }

    const sec = Math.floor(temp/1000) % 60;
    const min = Math.floor(temp/1000/60) % 60;

    setTimer(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`)
    setRemainTime(temp);
  }

  useEffect(() => {
    if (isStart) {
      timeoutRef.current = setTimeout(() => {
        let newTime = remainTime - 1000

        if (newTime <= 0) {
          choixTimer(0, false);
          setRemainTime(0)
        } else{
          setRemainTime(newTime)
          choixTimer(newTime, false);
        }

      },1000)
    }
  }, [isStart, remainTime])

    return (
    <div className="container">
      <div className="TimerGlobal">{timer}
      </div>
      <div className="TimerSelect">
        <div className="selectTemp">
            <button className="goBtn" onClick={() => setIsStart(!isStart)}>{ !isStart ? "Lance le temps": "Mettre en pause" }</button>
            <br></br>
            <button className="btnChoix" onClick={() => choixTimer(720000)}>Dur</button>
            <button className="btnChoix" onClick={() => choixTimer(180000)}>oeuf cocottte</button>
            <button className="btnChoix" onClick={() => choixTimer(360000)}>mollet</button>
            <button className="btnChoix" onClick={() => choixTimer(540000)}>au plat</button>
        </div>
        <div className="Roue">
        </div>
      </div>
    </div>
  );
}

