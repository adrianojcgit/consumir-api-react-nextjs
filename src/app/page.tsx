import Link from "next/link";

export default function Home() {
  return (
    <div>
      Bem-Vindo!<br />
      <Link href="/users/list">Usuários</Link>
    </div>
  );
}
