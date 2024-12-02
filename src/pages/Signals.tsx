import axios from "axios"
import { CrossIcon, Search  } from "lucide-react"
import { useEffect, useState } from "react"
import { signal } from "../utils/signals"
import { Modal } from '../components/Modal'

export function Signals() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [originalSignals, setOriginalSignals] = useState<signal[]>([])
  const [signals, setSignals] = useState<signal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<signal>()
  const [search, setSearch] = useState<string>("")

  function closeModal(){
    setModalIsVisible(false);
  }

  function openModal(){
    setModalIsVisible(true)
  }

  async function fetchSignals() {
    const response = await axios.get("https://bsl-deploy.onrender.com/signals");

    if (response.data.length > 0) {
      setOriginalSignals(response.data);
      setSignals(response.data)
    }
  }

 
  useEffect(() => {
    fetchSignals();
  }, [])

  useEffect(() => {
    setSignals(originalSignals.filter(signal => signal.name.includes(search)))
  }, [search])


  return (
    <>
      <div className="flex w-full justify-between px-[145px] items-center py-3">
        <p>Glossário de libras</p>

        <div className="flex gap-8 items-center">
        <button className="bg-green-600 rounded-md px-4 py-2 text-white flex gap-2 items-center">
          Sugerir novo sinal
          <CrossIcon size={20} />
        </button>
        </div>
      </div>

      <div className="px-[145px] flex justify-between py-8">
        <h1>Sinais</h1>
        <div className="bg-gray-200 px-3 py-2 rounded-xl flex items-center gap-2">
          <Search size={18}/>
          <input 
            type="text"
            placeholder="buscar sinal"
            className="bg-transparent placeholder:text-black text-black outline-none"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>


      <div className="px-[154px] flex gap-6 max-w-full flex-wrap">
        {
          signals.map(signal => {
            return (
              <div className="bg-gray-400 rounded-lg px-8 py-4 flex flex-col gap-10 w-[368px]" key={signal.id}>
                <div className="flex flex-col text-black gap-1 max-w-1/2">
                  <span>{signal.name}</span>
                  <p>
                    {signal.description}
                  </p>
                </div>
                <button 
                  className="bg-green-500 px-6 py-1 rounded-md text-white" 
                  onClick={() => {
                    openModal();
                    setSelectedSignal(signal);
                  }}
                >
                    Visualizar
                </button>

              </div>
            )
          })
        }
      </div>
      {modalIsVisible && <Modal signal={selectedSignal} onClose={closeModal} />}
    </>
  )
}
