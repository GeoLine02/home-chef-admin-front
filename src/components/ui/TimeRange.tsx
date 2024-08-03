import React, { useState } from "react";

interface TimeRangeProps {
  onChange: (start: string, end: string) => void;
  minTime?: string;
  maxTime?: string;
  initialStartTime?: string;
  initialEndTime?: string;
  startTimeHeader: string;
  endTimeHeader: string;
}

const TimeRange = ({
  onChange,
  minTime = "00:00",
  maxTime = "23:59",
  initialStartTime = "00:00",
  initialEndTime = "23:59",
  startTimeHeader = "start time",
  endTimeHeader = "end time",
}: TimeRangeProps) => {
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    onChange(newStartTime, endTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    onChange(startTime, newEndTime);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-dark_backgorund_color rounded-md border-2 border-border_color p-1 justify-evenly">
      <div className="flex flex-col">
        <label
          htmlFor="start-time"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {startTimeHeader}
        </label>
        <input
          type="time"
          id="start-time"
          value={startTime}
          min={minTime}
          max={endTime}
          onChange={handleStartTimeChange}
          className="block w-full px-3 py-2 border border-border_color rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-light_background_color"
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="end-time"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {endTimeHeader}
        </label>
        <input
          type="time"
          id="end-time"
          value={endTime}
          min={startTime}
          max={maxTime}
          onChange={handleEndTimeChange}
          className="block w-full px-3 py-2 border border-border_color rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm bg-light_background_color"
        />
      </div>
    </div>
  );
};

export default TimeRange;
