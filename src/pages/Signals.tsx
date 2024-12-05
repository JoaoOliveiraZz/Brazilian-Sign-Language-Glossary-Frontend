import axios from "axios"
import { CrossIcon, Search  } from "lucide-react"
import { useEffect, useState } from "react"
import { signal } from "../utils/signals"
import { Modal } from '../components/Modal'
import { Link, useParams } from "react-router-dom"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { EmptyRegisters } from "../components/EmptyRegisters"

export function Signals() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [originalSignals, setOriginalSignals] = useState<signal[]>([])
  const [signals, setSignals] = useState<signal[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<signal>()
  const [search, setSearch] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false)

  const {categoryId} = useParams<{categoryId: string}>();

  function closeModal(){
    setModalIsVisible(false);
  }

  function openModal(){
    setModalIsVisible(true)
  }

  async function fetchSignals() {
    setIsLoading(true);
    const response = await axios.get("https://bsl-deploy.onrender.com/signals/"+categoryId);

    if (response.data.length > 0) {
      setIsLoading(false);
      setOriginalSignals(response.data);
      setSignals(response.data)
    }else{
      setIsEmpty(true)
    }
  }

 
  useEffect(() => {
    fetchSignals();
  }, [])

  useEffect(() => {
    setSignals(originalSignals.filter(signal => signal.name.includes(search)))
  }, [search])


  return (
    <main className="h-screen flex flex-col">
      <div className="flex w-full justify-between px-[145px] items-center py-3">
        <p>Glossário de libras</p>

        <div className="flex gap-8 items-center">
        <Link to={"/newSignal"} className="bg-green-600 rounded-md px-4 py-2 text-white flex gap-2 items-center">
          Sugerir novo sinal
          <CrossIcon size={20} />
        </Link>
        </div>
      </div>

      <div className="px-[145px] flex justify-between py-8">
        <h1>Sinais</h1>
        <div className="bg-gray-200 px-3 py-2 rounded-xl flex items-center gap-2">
          <Search size={18}/>
          <input 
            type="text"
            placeholder="Buscar sinal"
            className="bg-transparent placeholder:text-black text-black outline-none"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      {
        isEmpty ?
        (
          <div className="flex flex-1 flex-col justify-center items-center gap-5">
            <EmptyRegisters
              title="Parece que ainda não existem sinais"
              linkHref="/newSignal" 
              linkLabel="Comece sugerindo novos sinais"
            />
          </div>
        )
        :
        isLoading ?
        (
          <div className="flex flex-col gap-2 flex-1 justify-center items-center">
            <LoadingSpinner />
            <span>Carregando sinais</span>
          </div>
        )
        :
        (

          <div className="px-[154px] flex gap-6 max-w-full flex-wrap">
            {
              signals.map(signal => {
                return (
                  <div className="bg-gray-300 rounded-lg px-8 py-4 flex flex-col gap-10 w-[368px]" key={signal.id}>
                    <div className="flex flex-col text-black gap-1 max-w-1/2">
                      <span>{signal.name}</span>
                      <p>
                        {signal.description}
                      </p>
                    </div>
                    <button 
                      className="bg-gray-400 px-6 py-1 rounded-md text-center" 
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
        )
      }

      {modalIsVisible && <Modal signal={selectedSignal} onClose={closeModal} />}
    </main>
  )
}
