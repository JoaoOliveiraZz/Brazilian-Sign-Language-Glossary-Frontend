import axios from "axios";
import { FormEvent, useState } from "react"
import { Link } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";

interface Category {
    name: string
    description: string
}

export function NewCategoryForm(){

    const [newCategoryForm, setNewCategoryForm] = useState<Category>({
        name: "",
        description: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function SubmitNewCategory(event: FormEvent<HTMLFormElement>){

        event.preventDefault();

        if(newCategoryForm.name && newCategoryForm.description){
            setIsLoading(true)
            const response = await axios.post("https://bsl-deploy.onrender.com/category", newCategoryForm);

            if(response.status === 201){
                setIsLoading(false)
                alert("Nova categoria criada com sucesso")
            }
        }

    }


    return (
        <div className="w-screen h-screen bg-gray-400 flex items-center justify-center">
            <div className="h-1/2 w-1/2 md:w-1/3 bg-white rounded-xl px-4 py-2 flex flex-col gap-5 shadow-xl">
                <h1 className="font-bold text-lg">Nova categoria</h1>                
                <form action="" className="flex flex-col gap-3 flex-1" onSubmit={e => SubmitNewCategory(e)}>
                    <input 
                        type="text" 
                        name="categoryName"
                        placeholder="Nome da categoria"
                        className="bg-gray-200 px-3 py-1 rounded-lg placeholder:text-black outline-none"
                        onChange={(e) => {
                            setNewCategoryForm({
                                ...newCategoryForm,
                                name: e.target.value
                            })
                        }}
                    />
                    <textarea 
                        name="categoryDescription" 
                        className="bg-gray-200 h-full resize-none outline-none rounded-lg px-3 py-1 placeholder:text-black"
                        placeholder="Descrição da categoria"
                        onChange={(e) => {
                            setNewCategoryForm({
                                ...newCategoryForm,
                                description: e.target.value
                            })
                        }}
                    />
                    <div className="flex gap-2">
                    <button disabled={isLoading} type="submit" className="bg-emerald-700 text-gray-200 rounded-lg h-12 flex-1 flex items-center justify-center">
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
                        <Link to={"/"} className="flex-1 bg-gray-400 rounded-lg flex items-center justify-center">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    )

}