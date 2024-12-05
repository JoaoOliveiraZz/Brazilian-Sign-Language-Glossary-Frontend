import axios from "axios"
import { CrossIcon, Search, BookOpen} from "lucide-react"
import { useEffect, useState } from "react"
import { category } from "../utils/categories";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { EmptyRegisters } from "../components/EmptyRegisters";

export function Category() {

  const [categories, setCategories] = useState<category[]>([]);
  const [search, setSearch] = useState<string>("");
  const [originalCategories, setOriginalCategories] = useState<category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false)


  async function fetchCategories() {
    setIsLoading(true);
    const response = await axios.get("https://bsl-deploy.onrender.com/category");
    
    if(response.data.length > 0){
      setCategories(response.data);
      setOriginalCategories(response.data)
      setIsLoading(false);
    }else{
      setIsEmpty(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  useEffect(() => {
    setCategories(originalCategories.filter(category => category.name.includes(search)))
  }, [search])

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const getIconSize = () => {
    if (screenWidth >= 1200) return 64;
    if (screenWidth >= 768) return 32;
    return 32;
  };

  return (
     <main className="h-screen flex flex-col">
      <div className="flex w-full justify-between px-[145px] items-center py-3">
        <div className="flex flex-row gap-2">
          <BookOpen className="text-green-500" size={getIconSize()}/>
          <p className="text-green-500 font-bold text-1xl lg:text-5xl">Glossário de Libras</p>
        </div>
        <div className="flex gap-8 items-center">
        <Link to={"/newCategory"} className="bg-green-600 rounded-md px-4 py-2 text-white flex gap-2 items-center">
          Sugerir nova categoria
          <CrossIcon size={20} />
        </Link>
        </div>
      </div>

      <div className="px-[145px] flex justify-between py-8">
        <h1 className="text-green-500 font-bold text-1xl lg:text-3xl">Categorias</h1>
        <div className="bg-gray-200 px-3 py-2 rounded-xl flex items-center gap-2">
          <Search size={18}/>
          <input 
            type="text"
            placeholder="Buscar categoria"
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
              title="Parece que ainda não existem categorias"
              linkHref="/newCategory" 
              linkLabel="Comece sugerindo novas categorias"
            />
          </div>
        )
        :
        isLoading ?
        (
          <div className="flex flex-col gap-2 flex-1 justify-center items-center">
            <LoadingSpinner />
            <span>Carregando categorias</span>
          </div>
        ) :
        (
          <div className="px-[154px] flex gap-6 max-w-full flex-wrap">
            {
              categories.map(category => {
                return (
                  <div className="bg-gray-300 rounded-lg px-8 py-4 flex flex-col gap-10 w-[368px]" key={category.id}>
                    <div className="flex flex-col text-black gap-1 max-w-1/2">
                      <span className="text-lg font-semibold">{category.name}</span>
                      <div className="w-full h-px bg-gray-400" />
                      <p>
                        {category.description}
                      </p>
                    </div>
                    <Link className="bg-gray-400 px-6 py-1 rounded-md text-center" to= {`/signals/${category.id}`}>
                      Sinais
                    </Link>
                  </div>
                )
              })
            }
          </div>

        )
      }
    </main>
  )
}

