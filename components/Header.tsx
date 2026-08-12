"use client";
import { AnimatePresence,motion } from "framer-motion";
import { Menu,X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect,useState } from "react";

const links=[{label:"Trabalhos",href:"/#trabalhos"},{label:"Serviços",href:"/#servicos"},{label:"Sobre",href:"/#sobre"},{label:"Contato",href:"/contato"}];
export function Header(){
 const [scrolled,setScrolled]=useState(false),[open,setOpen]=useState(false);
 useEffect(()=>{const onScroll=()=>setScrolled(scrollY>24);onScroll();addEventListener("scroll",onScroll,{passive:true});return()=>removeEventListener("scroll",onScroll)},[]);
 return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled||open?"border-b border-white/10 bg-ink/85 backdrop-blur-xl":"bg-transparent"}`}>
  <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
   <Link href="/" aria-label="AA Design & Mídia — início" className="flex items-center gap-3"><Image src="/logos/aa-mark.svg" alt="" width={48} height={30}/><span className="hidden text-xs font-semibold uppercase tracking-[.22em] sm:block">Design & Mídia</span></Link>
   <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">{links.map(x=><Link className="text-sm text-white/70 transition hover:text-white" key={x.href} href={x.href}>{x.label}</Link>)}<Link className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-electric hover:text-white" href="/contato">Solicitar orçamento</Link></nav>
   <button className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"Fechar menu":"Abrir menu"}>{open?<X/>:<Menu/>}</button>
  </div>
  <AnimatePresence>{open&&<motion.nav initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden bg-ink lg:hidden"><div className="flex flex-col px-5 pb-8 pt-3">{links.map((x,i)=><motion.div key={x.href} initial={{x:-16,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:i*.05}}><Link onClick={()=>setOpen(false)} className="block border-b border-white/10 py-4 font-display text-2xl" href={x.href}>{x.label}</Link></motion.div>)}</div></motion.nav>}</AnimatePresence>
 </header>
}
