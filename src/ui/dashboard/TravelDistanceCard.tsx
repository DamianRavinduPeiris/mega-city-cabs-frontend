interface TravelCardProps {
  originCity: string
  destinationCity: string
  distance: string
  duration: string
}

export default function TravelDistanceCard({
  originCity = "New York",
  destinationCity = "Los Angeles",
  distance = "2,451 miles",
  duration = "5h 25m",
}: TravelCardProps) {
  return (
    <div className="w-full max-w-md border border-zinc-200 bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="flex flex-row items-center justify-between p-6 pb-2">
        <div className="flex flex-col space-y-1.5">
          <h3 className="font-semibold text-lg tracking-tight">
            {originCity.charAt(0).toUpperCase() + originCity.slice(1)}
          </h3>
          <p className="text-sm text-zinc-500">Origin</p>
        </div>
        <svg
          className="h-5 w-5 text-zinc-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M21 12l-3-3m3 3l-3 3" />
        </svg>
        <div className="flex flex-col space-y-1.5 items-end">
          <h3 className="font-semibold text-lg tracking-tight">
            {destinationCity.charAt(0).toUpperCase() + destinationCity.slice(1)}
          </h3>
          <p className="text-sm text-zinc-500">Destination</p>
        </div>
      </div>
      <hr className="border-t border-zinc-200" />
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
              <svg
                className="h-5 w-5 text-zinc-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4 className="text-sm font-medium">Distance</h4>
            <p className="text-xl font-bold">{distance}</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
              <svg
                className="h-5 w-5 text-zinc-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h4 className="text-sm font-medium">Duration</h4>
            <p className="text-xl font-bold">{duration}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <div className="relative h-1 w-full bg-zinc-100">
            <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-zinc-900"></div>
            <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-zinc-900"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

