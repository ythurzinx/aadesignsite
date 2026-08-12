import type { Config } from "tailwindcss";
export default {content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],theme:{extend:{colors:{ink:"#050608",electric:"#176BFF",mist:"#A7ACB5"},fontFamily:{sans:["var(--font-inter)","sans-serif"],display:["var(--font-space)","sans-serif"]}}},plugins:[]} satisfies Config;
