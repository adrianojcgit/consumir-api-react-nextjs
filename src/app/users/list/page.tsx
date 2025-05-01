//A diretiva 'use client' é usada para indicar que este componente é executado no cliente
//Essa diretiva é especifica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'
//Importa hooks do React para usar o estado.
import { useEffect, useState } from "react";
//Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";
//Importar componente para criar link
import Link from "next/link";
//Importar o componente com o Menu
import Menu from "@/components/Menu"

interface User{
    id: number,
    name : string,
    email: string,
}

export default function Users(){

    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    //Função para buscar os usuários da API
    const fetchUsers = async () => {
        try {
            const response = await instance.get("/users");
            setUsers(response.data);

        }catch(error) {
            setError("Erro ao carregar os usuários");
        }        
    }
        
    useEffect(() => {
        fetchUsers();
    },[]);

    return(
        <div className="flex flex-col h-screen bg-gray-100 text-black">
            {/* Menu superior */}
            <Menu />
            {/* Conteúdo Principal */}
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Listar Usuário</h1>
            <Link href={"/users/create"} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Cadastrar</Link>
            </div>
            {/*Exibe mensagem de erro*/}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div  className="mt-6 bg-white shadow-md rounded-lg p-6">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-3 text-left">ID</th>
                            <th className="border p-3 text-left">Nome</th>
                            <th className="border p-3 text-left">Email</th>
                            <th className="border p-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="border p-3">{user.id}</td>
                                <td className="border p-3">{user.name}</td>
                                <td className="border p-3">{user.email}</td>
                                <td className="border p-3">Visualizar Editar Apagar</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>            
        </div>
    )
}