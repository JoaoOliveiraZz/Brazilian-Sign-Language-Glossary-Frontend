import axios from "axios"
import { CrossIcon, Search  } from "lucide-react"
import { useEffect, useState } from "react"
import { category } from "../utils/categories";
import { Link } from "react-router-dom";

export function Category() {

  const [categories, setCategories] = useState<category[]>([]);
  const [search, setSearch] = useState<string>("")
  const [originalCategories, setOriginalCategories] = useState<category[]>([])


  async function fetchCategories() {
    const response = await axios.get("https://bsl-deploy.onrender.com/category");
    
    if(response.data.length > 0){
      setCategories(response.data);
      setOriginalCategories(response.data)
    }else{
      setCategories(categories);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  useEffect(() => {
    setCategories(originalCategories.filter(category => category.name.includes(search)))
  }, [search])

  return (
    <>
      <div className="flex w-full justify-between px-[145px] items-center py-3">
        <p>Glossário de libras</p>

        <div className="flex gap-8 items-center">
        <Link to={"/newCategory"} className="bg-green-600 rounded-md px-4 py-2 text-white flex gap-2 items-center">
          Sugerir nova categoria
          <CrossIcon size={20} />
        </Link>
        </div>
      </div>

      <div className="px-[145px] flex justify-between py-8">
        <h1>Categorias</h1>
        <div className="bg-gray-200 px-3 py-2 rounded-xl flex items-center gap-2">
          <Search size={18}/>
          <input 
            type="text"
            placeholder="buscar categoria"
            className="bg-transparent placeholder:text-black text-black outline-none"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="px-[154px] flex gap-6 max-w-full flex-wrap">
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
                <Link className="bg-gray-300 px-6 py-1 rounded-md text-center" to= {`/signals/${category.id}`}>
                  Sinais
                </Link>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

