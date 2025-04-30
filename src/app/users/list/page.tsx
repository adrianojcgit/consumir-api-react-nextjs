//A diretiva 'use client' é usada para indicar que este componente é executado no cliente
//Essa diretiva é especifica para Next.js 13+ quando se utiliza a renderização no lado do cliente.
'use client'
//Importa hooks do React para usar o estado.
import { useEffect, useState } from "react";
//Importa a instância do axios configurada para fazer requisições para a API
import instance from "@/services/api";
//Importar componente para criar link
import Link from "next/link";

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
        <div>
            <h1>Listar Usuário</h1>
            <Link href={"/users/create"}>Cadastrar</Link>
            {/*Exibe mensagem de erro*/}
            {error && <p style={{color: "#f00"}}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}