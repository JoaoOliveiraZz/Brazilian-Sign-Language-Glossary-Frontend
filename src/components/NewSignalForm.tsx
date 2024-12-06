import axios from "axios";
import { FormEvent, useEffect, useState } from "react"
import { category } from "../utils/categories";
import { LoadingSpinner } from "./LoadingSpinner";

interface Category {
    name: string
    description: string
    source: string
    CategoryId: string
}

export function NewSignalForm(){

    const [newSignalForm, setNewSignalForm] = useState<Category>({
        name: "",
        description: "",
        source: "",
        CategoryId: ""
    });
    const [categories, setCategories] = useState<category[]>([]);
    const [categorySelected, setCategorySelected] = useState<{categoryId: string, name: string}>({
        categoryId: "",
        name: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function SubmitNewCategory(event: FormEvent<HTMLFormElement>){

        event.preventDefault();

        if(newSignalForm.name && newSignalForm.description && newSignalForm.source && newSignalForm.CategoryId){
            setIsLoading(true)
            const response = await axios.post("https://bsl-deploy.onrender.com/signal", newSignalForm);

            if(response.status === 201){
                setIsLoading(false)
                alert("Novo sinal criado com sucesso")
            }
        }

    }
    
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
        <div className="w-screen h-screen bg-gray-400 flex items-center justify-center">
            <div className="h-1/2 w-1/2 md:w-1/3 bg-white rounded-xl px-4 py-2 flex flex-col gap-5 shadow-xl">
                <h1 className="font-bold text-lg">Nova categoria</h1>                
                <form action="" className="flex flex-col gap-3 flex-1" onSubmit={e => SubmitNewCategory(e)}>
                    <input 
                        type="text" 
                        name="signalName"
                        placeholder="Nome do sinal"
                        className="bg-gray-200 px-3 py-1 rounded-lg placeholder:text-black outline-none"
                        onChange={(e) => {
                            setNewSignalForm({
                                ...newSignalForm,
                                name: e.target.value
                            })
                        }}
                    />
                    <input 
                        type="text" 
                        name="signalSource"
                        placeholder="Link para o vídeo"
                        className="bg-gray-200 px-3 py-1 rounded-lg placeholder:text-black outline-none"
                        onChange={(e) => {
                            setNewSignalForm({
                                ...newSignalForm,
                                source: e.target.value
                            })
                        }}
                    />
                    <select 
                        name="categorySelected" 
                        value={categorySelected.categoryId} 
                        className="bg-gray-200 py-1 px-2 rounded-lg"
                        onChange={(e) => {
                            setNewSignalForm({
                                ...newSignalForm,
                                CategoryId: e.target.value
                            })
                            const {value, textContent} = e.target
                            if(value && textContent){
                                setCategorySelected({
                                    name: textContent,
                                    categoryId: value
                                })
                            }
                        }}
                    >
                        <option value={""}>Selecione a categoria</option>
                        {
                            categories.map((category) => {
                                return (
                                    <option key={category.id} value={category.id} id={category.name}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                    <textarea 
                        name="categoryDescription" 
                        className="bg-gray-200 h-full resize-none outline-none rounded-lg px-3 py-1 placeholder:text-black"
                        placeholder="Descrição do sinal"
                        onChange={(e) => {
                            setNewSignalForm({
                                ...newSignalForm,
                                description: e.target.value
                            })
                        }}
                    />
                    <div className="flex gap-2">
                        <button disabled={!isLoading} type="submit" className="bg-emerald-700 text-gray-200 rounded-lg h-12 flex-1 flex items-center justify-center">
                            {
                                isLoading ?
                                (
                                    <LoadingSpinner size="h-8 w-8" />
                                ):
                                (
                                    <span>Cadastrar</span>
                                )
                            }
                        </button>
                        <button onClick={() => window.history.back()} className="flex-1 bg-gray-400 rounded-lg">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )

}