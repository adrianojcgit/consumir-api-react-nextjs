'use client'
import { useEffect, useState } from "react";
import instance from "@/services/api";

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
            {error && <p style={{color: "#f00"}}>erro</p>}
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