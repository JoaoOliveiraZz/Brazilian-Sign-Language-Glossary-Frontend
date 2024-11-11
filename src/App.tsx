import axios from "axios"
import { CrossIcon, LogOut, User,  } from "lucide-react"
import { useEffect, useState } from "react"
import { category } from "./utils/categories";

function App() {

  const [categories, setCategories] = useState<category[]>([]);

  console.log(categories)


  async function fetchCategories() {
    const response = await axios.get("https://bsl-deploy.onrender.com/category");
    
    if(response.data.length > 0){
      setCategories(response.data);
    }else{
      setCategories(categories);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <>
      <div className="flex w-screen justify-between px-[145px] items-center py-3">
        <p>Glossário de libras</p>

        <div className="flex gap-8 items-center">
          <button className="flex gap-2 items-center ">
            <span className="bg-gray-400 p-2 rounded-full">
              <User className="text-white"  size={20} />
            </span>
            <span>Nome do usuário</span>
          </button>
          <button  className="flex gap-2 items-center ">
          <span className="bg-gray-400 p-2 rounded-full">
              <LogOut className="text-white" size={20} />
            </span>
            <span>Sair</span>
          </button>
        </div>
      </div>

      <div className="px-[145px] flex justify-between py-8">
        <h1>Categorias</h1>
        <button className="bg-gray-400 rounded-md px-4 py-2 text-white flex gap-2 items-center">
          Sugerir nova categoria
          <CrossIcon size={20} />
        </button>
      </div>

      <div className="px-[154px] flex gap-6">
        {
          categories.map(category => {
            return (
              <div className="bg-gray-400 rounded-lg px-8 py-4 flex flex-col gap-10 w-[368px]" key={category.id}>
                <div className="flex flex-col text-black gap-1 max-w-1/2">
                  <span>{category.name}</span>
                  <p>
                    {category.description}
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

export default App
