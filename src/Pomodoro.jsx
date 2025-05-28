import React, { useState, useEffect, useRef, useCallback } from "react";
import TimerDisplay from "./components/TimerDisplay";
import ModeButtons from "./components/ModeButtons";
import ControlButtons from "./components/ControlButtons";
import SessionCounterDisplay from "./components/SessionCounterDisplay";

function Pomodoro() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500000);
  const [pomodoroDuration, setPomodoroDuration] = useState(1500000);
  const [shortBreakDuration, setShortBreakDuration] = useState(300000);
  const [longBreakDuration, setLongBreakDuration] = useState(900000);
  const [phase, setPhase] = useState("Pomodoro");
  const [workSessionCount, setWorkSessionCount] = useState(0);
  const intervalIdRef = useRef(null);
  const audioRef = useRef(null);

  const handleSessionEnd = useCallback(() => {
    if (phase === "Pomodoro") {
      if (workSessionCount < 3) {
        setIsRunning(false);
        setWorkSessionCount((w) => w + 1);
        setPhase("Short Break");
        setMode(shortBreakDuration);
      } else {
        setIsRunning(false);
        setWorkSessionCount(0);
        setPhase("Long Break");
        setMode(longBreakDuration);
      }
    } else if (phase === "Short Break" || phase === "Long Break") {
      setIsRunning(false);
      setPhase("Pomodoro");
      setMode(pomodoroDuration);
    }
  }, [
    phase,
    workSessionCount,
    pomodoroDuration,
    longBreakDuration,
    shortBreakDuration,
  ]);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1000) {
            handleSessionEnd();
            audioRef.current.play();
          }
          return t - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, handleSessionEnd]);

  function setMode(duration) {
    setTimeLeft(duration);
    setIsRunning(false);
  }

  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleSkip() {
    handleSessionEnd();
  }

  function handlePomodoro() {
    setMode(pomodoroDuration);
    setPhase("Pomodoro");
  }

  function handleShortBreak() {
    setMode(shortBreakDuration);
    setPhase("Short Break");
  }

  function handleLongBreak() {
    setMode(longBreakDuration);
    setPhase("Long Break");
  }

  return (
    <div className="bg-base-100 flex min-h-screen flex-col items-center justify-center">
      <audio
        src="/airhorn.mp3"
        ref={audioRef}
        preload="auto"
        aria-label="session finished sound"
      />
      <div className="flex w-[90vw] max-w-sm flex-col items-center gap-4 rounded-xl bg-white/20 p-8 shadow-md backdrop-blur-md sm:max-w-md sm:p-8">
        <ModeButtons
          onPomodoro={handlePomodoro}
          onShortBreak={handleShortBreak}
          onLongBreak={handleLongBreak}
        />
        <TimerDisplay timeLeft={timeLeft} phase={phase} />
        <ControlButtons
          onStart={handleStart}
          onStop={handleStop}
          onSkip={handleSkip}
        />
        <SessionCounterDisplay workSessionCount={workSessionCount} />
      </div>
    </div>
  );
}

export default Pomodoro;
