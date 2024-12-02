import { X } from "lucide-react"
import { signal } from "../utils/signals"
import React from "react"

interface ModalProps {
  signal: signal | undefined;
  onClose: () => void
}

// WIP
export function Modal({signal, onClose} : ModalProps) {


  return (
    <>
      <div className="h-screen w-screen right-0 top-0 fixed bg-black/30 flex justify-center items-center">
        <div className="h-1/2 w-1/2 bg-white rounded-lg shadow-md">
          <div className="">
            <header className="flex justify-between items-center px-3 py-1">
              <h1 className="text-xl font-bold">
                {
                  signal && signal.name 
                }
              </h1>
              <span className="bg-gray-300 rounded-full p-2 cursor-pointer" onClick={onClose}>
                <X size={20} />
              </span>
            </header>

            <main className="px-3 py-1 h-full flex flex-col gap-4">
              <div className="">
                <h2 className="font-bold text-lg">Descrição do sinal</h2>
                <p>
                  {
                    signal && signal.description
                  }
                </p>
              </div>
              <div className="">
                <video controls={true}>
                  <source type="video/mp4" src="https://www.ines.gov.br/dicionario-de-libras/public/media/palavras/videos/amareloSm_Prog001.mp4" />
                </video>
              </div>
            </main>
          </div>

        </div>
      </div>


    </>
  )
}

