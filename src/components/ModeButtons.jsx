import React from "react";

export default function ModeButtons({ onPomodoro, onShortBreak, onLongBreak }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-2 sm:px-4">
      <button
        className="btn btn-soft btn-primary h-12 flex-wrap px-6 text-sm sm:text-base"
        onClick={onPomodoro}
      >
        Pomodoro
      </button>
      <button
        className="btn btn-soft btn-primary h-12 flex-wrap px-6 text-sm sm:text-base"
        onClick={onShortBreak}
      >
        Short Break
      </button>
      <button
        className="btn btn-soft btn-primary h-12 flex-wrap px-6 text-sm sm:text-base"
        onClick={onLongBreak}
      >
        Long Break
      </button>
    </div>
  );
}
