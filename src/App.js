import { useEffect, useRef, useState } from "react"


export default function TimeRanges(){
  const [timer, setTimer] = useState("00:00");
  const [isStart, setIsStart] = useState(false);
  const [remainTime, setRemainTime] = useState(0);
  let timeoutRef = useRef(null);
  const numbers = Array.from({length:12},(_,i) => i +1); //arry.from creer un tableau a partir d'un objet, 12 case vide , la fonction mapping prend 2 props _ car on l'utilise pas "inutile" et i l'index i +1 permet de commencer a 1 et pas à 0


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
      <div className="containerTimer">
        <div className="TimerGlobal">{timer}</div>
        <button className="goBtn" onClick={() => setIsStart(!isStart)}>{ !isStart ? "Lance le temps": "Mettre en pause" }</button>
      </div>
      <div className="TimerSelect">
        <div className="selectTemp">
            <div className="roue">
              {numbers.map((minute) => ( // ici on parcourt le tableau numbers créé plus haut, pour chaque élément on le nomme "minute"
              <div key={minute} className="number" style={{ "--i": minute}} onClick={() => choixTimer(minute * 60000)}>{minute}</div>
              ))}
            </div>
            <div className="containerTrait"  style={{transform : `rotateZ(${(remainTime / 1000 / 60) * 30}deg)`}}>
              <div className="trait"></div>
            </div>
            <button className="btnChoix top" onClick={() => choixTimer(720000)}>1</button>
            <button className="btnChoix left" onClick={() => choixTimer(180000)}>2</button>
            <button className="btnChoix bottom" onClick={() => choixTimer(360000)}>3</button>
            <button className="btnChoix right" onClick={() => choixTimer(540000)}>4</button>
        </div>
      </div>
    </div>
  );
}

