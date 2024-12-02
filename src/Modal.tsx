import axios from "axios"
import { useEffect, useState } from "react"
import { signal } from "./utils/signals"
import React from "react"

// WIP
function Modal() {

  const [signals, setSignals] = useState<signal[]>([]);

  console.log(signals)


  async function fetchSignals() {
    const response = await axios.get("https://bsl-deploy.onrender.com/signals");

    console.log(response.data.length)

    if (response.data.length > 0) {
      setSignals(response.data);
    } else {
      setSignals(signals);
    }
  }

  useEffect(() => {
    fetchSignals();
  }, [])

  return (
    <>
      <div className="relative h-screen">
        <div className="absolute inset-0"></div>
        {
          signals.map(signal => {
            return (
              <div className="fixed inset-0 bg-black/10 backdrop-blur flex items-center justify-center z-10">
                <div className="bg-white p-6 rounded shadow-lg flex flex-col text-black gap-1 max-w-md w-full mx-4 focus:outline-none">
                  <button className="font-bold self-end px-3 py-0.5 text-right focus:outline-none focus:ring-0">x</button>
                  <span>{signal.name}</span>
                  <p>{signal.description}</p>
                </div>
              </div>

            )
          })
        }
      </div>


    </>
  )
}

export default Modal
