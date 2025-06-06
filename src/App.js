import { useEffect, useRef, useState } from "react"
import TimerButton from "./component/TimerButton"


export default function TimeRanges(){

  let timeoutRef = useRef(null);

  const [timer, setTimer] = useState("00:00");
  const [isStart, setIsStart] = useState(false);
  const [remainTime, setRemainTime] = useState(0);
  const numbers = Array.from({length:12},(_,i) => i +1); //arry.from creer un tableau a partir d'un objet, 12 case vide , la fonction mapping prend 2 props _ car on l'utilise pas "inutile" et i l'index i +1 permet de commencer a 1 et pas à 0
  const [modaleStyle, setModaleStyle] = useState(false);

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

  function fermeModale(){
    setIsStart(false);
    clearTimeout(timeoutRef.current);
    setRemainTime(0);
    setModaleStyle(false);
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
    if(remainTime === 0 && isStart){
      setModaleStyle(true);
    }
    return () => {
      clearTimeout(timeoutRef.current);
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
            <TimerButton position="top" duration={720000} label={1} onClick={choixTimer}/>
            <TimerButton position="left" duration={2000} label={2} onClick={choixTimer}/>
            <TimerButton position="bottom" duration={360000} label={3} onClick={choixTimer}/>
            <TimerButton position="right" duration={540000} label={4} onClick={choixTimer}/>
        </div>
      </div>
      <div className="modaleTimer" style={{display: modaleStyle ? "flex" : "none"}}>
        <div className="containerModale">
          <div className="timerEndText">Fin du temps</div>
          <button className="btnEnd" onClick={() => fermeModale()}>fermer la modale</button>
        </div>
      </div>
    </div>
  );
}