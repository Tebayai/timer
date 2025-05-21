export default function TimerButton ({position, duration, label, onClick}){
    return (
        <button
            className = {`btnChoix ${position}`}
            onClick = {() => onClick(duration)}
        >
            {label}
        </button>
    )
}
