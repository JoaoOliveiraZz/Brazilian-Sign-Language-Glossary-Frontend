import axios from "axios"
import { CrossIcon, LogOut, User, } from "lucide-react"
import { useEffect, useState } from "react"
import { sign } from "./utils/signs";

function Signs() {

  const [signs, setSigns] = useState<sign[]>([]);

  console.log(signs)


  async function fetchSigns() {
    const response = await axios.get("https://bsl-deploy.onrender.com/sign");

    console.log(response.data.length)

    if (response.data.length > 0) {
      setSigns(response.data);
    } else {
      setSigns(signs);
    }
  }

  useEffect(() => {
    fetchSigns();
  }, [])

  return (
    <>
      <div className="flex w-full justify-between px-[145px] items-center py-3">
        <p>Glossário de libras</p>

        <div className="flex gap-8 items-center">
          <button className="flex gap-2 items-center ">
            <span className="bg-gray-400 p-2 rounded-full">
              <User className="text-white" size={20} />
            </span>
            <span>Nome do usuário</span>
          </button>
          <button className="flex gap-2 items-center ">
            <span className="bg-gray-400 p-2 rounded-full">
              <LogOut className="text-white" size={20} />
            </span>
            <span>Sair</span>
          </button>
        </div>
      </div>

      <div className="px-[145px] flex justify-between py-8">
        <h1>Categoria</h1>
        <button className="bg-green-500 rounded-md px-4 py-2 text-white flex gap-2 items-center">
          Sugerir novo sinal
          <CrossIcon size={20} />
        </button>
      </div>

      <div className="px-[154px] flex gap-6 max-w-full flex-wrap">
        {
          signs.map(sign => {
            return (
              <div className="bg-gray-400 rounded-lg px-8 py-4 flex flex-col gap-10 w-[368px]" key={sign.id}>
                <div className="flex flex-col text-black gap-1 max-w-1/2">
                  <span>{sign.name}</span>
                  <p>
                    {sign.description}
                  </p>
                </div>
                <button className="bg-gray-300 px-6 py-1 rounded-md">
                  Sinais
                </button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Signs
