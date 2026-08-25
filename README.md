# AA Design & Media

Site oficial da produtora, construído com Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion e Supabase. O projeto foi preparado para Vercel, com página pública completa, portfólio multimídia e painel administrativo real em `/admin`.

## O que está pronto

- Hero cinematográfico com vídeo sob demanda, poster e fallback sem mídia quebrada.
- Portfólio com filtros, formatos 16:9, 9:16 e 1:1, preview no hover, modal, galeria, compartilhamento e páginas individuais.
- Serviços, apresentação da equipe, equipamentos, processo, bastidores, clientes e depoimentos condicionais.
- Formulário de orçamento validado, honeypot, limite de tentativas e armazenamento server-side.
- Painel protegido com projetos, rascunho/publicação, ordenação, upload, crop/ponto focal, conteúdo geral e gestão de contatos.
- Supabase Auth, Database, Storage e RLS com políticas de menor privilégio.
- Metadata, Open Graph, sitemap, robots.txt, PWA manifest e dados estruturados locais.
- Responsividade, navegação por teclado e `prefers-reduced-motion`.

## Desenvolvimento local

Requisitos: Node.js 22 ou superior e npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

O site abre em `http://localhost:3000`. Sem Supabase configurado, a página pública usa dados de demonstração reais da operação e placeholders de mídia; o painel permanece bloqueado.

## Configurar o Supabase

1. Crie um projeto no Supabase.
2. Abra o SQL Editor e execute [`supabase/schema.sql`](supabase/schema.sql) por inteiro.
3. Em Authentication > Users, crie o usuário administrador.
4. Copie o UUID do usuário e execute:

```sql
insert into public.admin_users (id) values ('UUID-DO-USUARIO');
```

5. Preencha `.env.local` com a URL, a chave pública `anon` e a `service_role`.
6. Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no navegador nem a prefixe com `NEXT_PUBLIC_`.
7. Entre em `/admin/login` e envie o logotipo oficial, o showreel, as capas e as fotos.

O bucket privado `media` aceita JPEG, PNG, WebP, AVIF, SVG, MP4, WebM e QuickTime, com limite de 250 MB por arquivo. Somente administradores podem ler ou escrever objetos diretamente; o site público recebe URLs assinadas de curta duração apenas para conteúdo publicado ou visível.

## Variáveis

| Variável | Onde usar | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canônica e validação do formulário | Sim em produção |
| `NEXT_PUBLIC_SUPABASE_URL` | Cliente Supabase | Sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública protegida por RLS | Sim |
| `SUPABASE_SERVICE_ROLE_KEY` | URLs assinadas e RPC server-side de contatos | Sim |
| `CONTACT_RATE_LIMIT_SALT` | Segredo separado para anonimizar IPs no rate limit | Recomendado |
| `TRUSTED_PROXY_IP_HEADER` | Header de IP do proxy confiável fora da Vercel | Somente self-hosted |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Fallback do botão, com DDI | Recomendado |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Fallback do Instagram | Recomendado |
| `CONTACT_NOTIFICATION_EMAIL` | Reservada para integração de e-mail | Opcional |

## Verificações

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Cadastre as mesmas variáveis em Project Settings > Environment Variables.
3. Defina `NEXT_PUBLIC_SITE_URL` com o domínio definitivo, incluindo `https://`.
4. Faça o deploy. O preset Next.js é detectado automaticamente.
5. Depois de apontar o domínio, atualize o Site URL e Redirect URLs no Supabase Authentication.

## Mídias e identidade

O repositório anterior não continha arquivos de vídeo, fotografias ou o arquivo oficial do símbolo azul. Por isso o layout usa placeholders identificados, sem inventar trabalhos, prêmios ou depoimentos. O upload do logo pelo painel não redesenha o arquivo: ele apenas o exibe preservando sua proporção.
