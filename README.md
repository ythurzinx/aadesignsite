# AA Design & Mídia — Portfólio audiovisual

Site de produção da AA Design & Mídia em Next.js (App Router), React, TypeScript, Tailwind CSS e Framer Motion. O conteúdo provisório é identificado visualmente e no código; não há clientes, métricas ou contatos fictícios.

## Executar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. Para validar uma entrega, execute `npm run lint`, `npm run typecheck` e `npm run build`.

## Conteúdo

### Adicionar ou editar um projeto

Edite `data/projects.ts` e adicione um objeto à lista `projects`. Preencha `slug`, `title`, `client`, `category`, `year`, `thumbnail`, `cover`, `video` (opcional), `description`, `gallery`, `featured` e `orientation`. Coloque imagens em `public/images/` e vídeos em `public/videos/`; nos dados, use caminhos iniciados por `/images/` ou `/videos/`. A rota `/projetos/[slug]`, os filtros e a navegação são gerados automaticamente.

### Trocar o showreel

Coloque o arquivo final em `public/videos/showreel.mp4`. Para o poster/fallback, substitua `public/images/showreel-cover.svg` (ou altere as referências nos componentes). Exporte um MP4 otimizado para web; evite bitrate e resolução maiores que o necessário. O hero usa `preload="metadata"`; players internos só carregam quando necessários.

### Adicionar clientes

Edite `data/clients.ts`, substitua os placeholders e coloque logos em `public/logos/`. O tipo já aceita um caminho no campo `logo`; ao integrar logos reais, renderize-o no marquee de `components/sections/HomeSections.tsx`.

### Trocar o logo

Substitua `public/logos/aa-mark.svg` mantendo o nome, ou altere o caminho em `components/Header.tsx` e `components/Footer.tsx`. Atualize também `public/favicon.svg` se necessário.

### Configurar WhatsApp, Instagram e e-mail

Edite somente `data/contact.ts`: WhatsApp deve conter DDI, DDD e número, apenas dígitos; Instagram deve ser informado sem `@`; e-mail deve ser o endereço real. Enquanto vazios, links levam à página de contato e são marcados como pendentes. O formulário valida os dados, mas **não simula envio**: conecte o `submit` em `components/ContactForm.tsx` a uma API antes da publicação.

## Mídia e placeholders

As artes em `public/images/project-*.svg`, foto de equipe, logos, datas, clientes e métricas `XX` são placeholders. Substitua antes do lançamento. Não há banco de imagens ou marcas inventadas.

## Publicação

1. Configure o domínio definitivo em `metadataBase` (`app/layout.tsx`), `app/sitemap.ts` e `app/robots.ts`.
2. Execute `npm run lint`, `npm run typecheck` e `npm run build`.
3. Na Vercel, importe o repositório e use as configurações automáticas de Next.js. Em outro provedor Node.js, execute `npm ci && npm run build` e inicie com `npm start`.
4. Confirme cache/CDN para vídeos, substitua os placeholders e conecte o formulário antes do lançamento.
