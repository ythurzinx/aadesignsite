import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[#03060d] p-4 text-center"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#62b8ff]">Erro 404</p><h1 className="display mt-5 text-[clamp(4rem,12vw,9rem)] font-black uppercase leading-[0.8]">Cena não encontrada.</h1><p className="mx-auto mt-7 max-w-lg text-white/52">A página saiu de quadro ou nunca foi publicada.</p><Link href="/" className="button-primary mt-9"><ArrowLeft className="h-4 w-4" /> Voltar ao início</Link></div></main>;
}
