import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function DateTimePicker({
  value,
  onChange,
}: {
  value?: Date
  onChange?: (date: Date) => void
}) {
  // Initialize with current date/time or provided value
  const [date, setDate] = useState<Date>(value || new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<"date" | "time">("date")
  const pickerRef = useRef<HTMLDivElement>(null)

  // Calendar state
  const [viewDate, setViewDate] = useState(new Date(date))

  // Time state
  const [hours, setHours] = useState(date.getHours())
  const [minutes, setMinutes] = useState(date.getMinutes())
  const [period, setPeriod] = useState<"AM" | "PM">(date.getHours() >= 12 ? "PM" : "AM")

  // Update internal state when value prop changes
  useEffect(() => {
    if (value) {
      setDate(value)
      setHours(value.getHours())
      setMinutes(value.getMinutes())
      setPeriod(value.getHours() >= 12 ? "PM" : "AM")
    }
  }, [value])

  // Handle click outside to close the picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Calendar helpers
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0-6, where 0 is Sunday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  // Handle month navigation
  const handlePrevMonth = () => {
    const newDate = new Date(viewDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setViewDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(viewDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setViewDate(newDate)
  }

  // Handle date selection
  const handleSelectDate = (selectedDate: Date) => {
    const newDate = new Date(date)
    newDate.setFullYear(selectedDate.getFullYear())
    newDate.setMonth(selectedDate.getMonth())
    newDate.setDate(selectedDate.getDate())

    setDate(newDate)
    setView("time")

    if (onChange) {
      onChange(newDate)
    }
  }

  // Handle time changes
  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = Number.parseInt(e.target.value)

    // Convert to 24-hour format for the date object
    const hours24 = period === "PM" && newHour !== 12 ? newHour + 12 : period === "AM" && newHour === 12 ? 0 : newHour

    setHours(hours24)

    const newDate = new Date(date)
    newDate.setHours(hours24)
    setDate(newDate)

    if (onChange) {
      onChange(newDate)
    }
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinutes = Number.parseInt(e.target.value)
    setMinutes(newMinutes)

    const newDate = new Date(date)
    newDate.setMinutes(newMinutes)
    setDate(newDate)

    if (onChange) {
      onChange(newDate)
    }
  }

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod)

    let newHours = hours
    if (newPeriod === "PM" && hours < 12) {
      newHours = hours + 12
    } else if (newPeriod === "AM" && hours >= 12) {
      newHours = hours - 12
    }

    setHours(newHours)

    const newDate = new Date(date)
    newDate.setHours(newHours)
    setDate(newDate)

    if (onChange) {
      onChange(newDate)
    }
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Check if a date is the selected date
  const isSelectedDate = (checkDate: Date) => {
    return (
      checkDate.getDate() === date.getDate() &&
      checkDate.getMonth() === date.getMonth() &&
      checkDate.getFullYear() === date.getFullYear()
    )
  }

  // Check if a date is today
  const isToday = (checkDate: Date) => {
    const today = new Date()
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    )
  }

  // Generate options for hours (1-12)
  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1)

  // Generate options for minutes (00-59)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i)

  // Format number to have leading zero
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0")
  }

  // Get 12-hour format hour
  const get12HourFormat = (hour: number) => {
    if (hour === 0) return 12
    if (hour > 12) return hour - 12
    return hour
  }

  // Toggle the picker
  const togglePicker = () => {
    setIsOpen(!isOpen)
  }

  // Close the picker
  const closePicker = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative w-full" ref={pickerRef}>
      {/* Input field */}
      <button
        type="button"
        onClick={togglePicker}
        className="w-full flex items-center justify-between px-4 py-2 text-left border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <div className="flex items-center">
          {/* Calendar icon */}
          <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{date ? `${formatDate(date)} at ${formatTime(date)}` : "Select date and time"}</span>
        </div>
        {/* Dropdown icon */}
        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setView("date")}
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                view === "date" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center justify-center">
                {/* Calendar icon */}
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Date
              </div>
            </button>
            <button
              type="button"
              onClick={() => setView("time")}
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                view === "time" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center justify-center">
                {/* Clock icon */}
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Time
              </div>
            </button>
          </div>

          {/* Date View */}
          {view === "date" && (
            <div className="p-3">
              <div className="flex justify-between items-center mb-4">
                <button type="button" onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="font-medium">
                  {months[viewDate.getMonth()]} {viewDate.getFullYear()}
                </div>
                <button type="button" onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 h-8 flex items-center justify-center"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => (
                  <div key={index} className="h-8 flex items-center justify-center">
                    {day ? (
                      <button
                        type="button"
                        onClick={() => handleSelectDate(day)}
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                          isSelectedDate(day)
                            ? "bg-black text-white"
                            : isToday(day)
                              ? "border border-gray-300 hover:bg-gray-100"
                              : "hover:bg-gray-100"
                        }`}
                      >
                        {day.getDate()}
                      </button>
                    ) : (
                      <span></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time View */}
          {view === "time" && (
            <div className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="relative">
                  <select
                    value={get12HourFormat(hours)}
                    onChange={handleHourChange}
                    className="appearance-none bg-gray-100 border border-gray-200 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-200 text-center"
                  >
                    {hourOptions.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-xl font-medium">:</span>
                <div className="relative">
                  <select
                    value={minutes}
                    onChange={handleMinuteChange}
                    className="appearance-none bg-gray-100 border border-gray-200 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-200 text-center"
                  >
                    {minuteOptions.map((minute) => (
                      <option key={minute} value={minute}>
                        {formatNumber(minute)}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <button
                    type="button"
                    onClick={() => handlePeriodChange("AM")}
                    className={`px-2 py-1 text-xs rounded-md ${
                      period === "AM" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePeriodChange("PM")}
                    className={`px-2 py-1 text-xs rounded-md ${
                      period === "PM" ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={closePicker}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

