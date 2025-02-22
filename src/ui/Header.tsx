import { Toaster } from "react-hot-toast"
export default function Header() {
  return (
    <div>
      <header className="fixed w-full bg-white shadow-md z-50">
        <Toaster />
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <div className="text-4xl font-bold">MegaCity</div>
        </div>
      </header>

    </div>
  )
}
