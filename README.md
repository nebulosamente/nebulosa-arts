# nebulosa-arts

Projeto 02 · Colagem do portfólio Nebulosa. Nova Hera skategirls e A Parada é o Amor: colagem digital.

Este repositório saiu do monorepo `nebulosa`, que juntava a home, o 3D, a Colagem e o Micanga (Editorial) num app só.
Agora cada site é independente e vai para o ar sozinho.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4

## Desenvolvimento

```bash
npm install
npm run dev      # http://127.0.0.1:4327
npm run build    # tsc -b && vite build, saída em dist/
npm run preview  # http://127.0.0.1:4328
npm run lint
```

As portas são diferentes em cada um dos três repositórios para dar para rodar todos ao mesmo tempo.

## Deploy

`vercel.json` reescreve qualquer caminho para `index.html` (SPA). As metatags de compartilhamento ganham a URL
absoluta do deploy automaticamente (`VERCEL_PROJECT_PRODUCTION_URL`).

## Identidade visual

Paleta: fundo `#07060A`, papel `#F4F2F8`, acentos violeta `#8C52FF`, verde `#3DE877`, azul `#14B1FF`, âmbar `#F9A01B`,
magenta `#FF2FD0`. Tipografia: Bricolage Grotesque, Instrument Serif, JetBrains Mono.
