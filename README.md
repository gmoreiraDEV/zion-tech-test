# Zion Community — Social Feed App
> 🚀 Uma aplicação de feed com comentários e likes, usando Next.js 14, Supabase e Tailwind (via shadcn/ui).

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/gmoreiradevs-projects/zion-tech-test)
[![Made by Guilherme Moreira](https://img.shields.io/badge/Made%20by-Guilherme%20Moreira-blue)](https://github.com/gmoreiraDEV)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)

## 📦 Tecnologias Utilizadas
- [Next.js](https://nextjs.org/) – Framework React para SSR/SSG
- [Supabase](https://supabase.com/) – Backend as a Service (auth, banco e storage)
- [TailwindCSS](https://tailwindcss.com/) – CSS utility-first
- [React Query](https://tanstack.com/query) – Gerenciamento de dados assíncronos
- [React Hook Form](https://react-hook-form.com/) – Formulários otimizados
- [Moment.js](https://momentjs.com/) – Formatação de datas
- [shadcn/ui](https://ui.shadcn.com/) – Componentes UI acessíveis e estilizados

## ⚙️ Funcionalidades
- ✅ Autenticação via Supabase (e-mail e senha)
- ✅ Criação de perfil após primeiro login
- ✅ Feed de postagens com imagem e descrição
- ✅ Likes com atualização em tempo real (via RPC e React Query)
- ✅ Comentários com input interativo
- ✅ Contador de comentários por post
- ✅ Exibição de avatar (upload ou fallback via [ui-avatars.com](https://ui-avatars.com))

## 🧱 Estrutura de Banco (Supabase)
### Tabelas Principais
- `User`: dados do usuário autenticado (extensão do Supabase Auth)
- `Profile`: dados estendidos do usuário (nome, avatar, bio)
- `Post`: postagens feitas pelos usuários (com imagens)
- `Comment`: comentários relacionados aos posts

### Relacionamentos
- `Post.ownerId → User.id`
- `Comment.postId → Post.id`
- `Comment.userId → User.id`
- `Profile.userId → User.id`

### Views
- `post_with_comments_count`: view com `comment_count` para cada post.

### Funções RPC

- `increment_post_likes(post_id UUID)`: incrementa likes de forma segura e atômica.

## 🚀 Como rodar o projeto
```bash
# Instalar dependências
npm install

# Rodar o projeto localmente
npm run dev
```

## 📁 Organização de Pastas
```
/components        → Componentes UI (cards, botões, inputs)
 /lib              → Tipos, utilitários, instâncias Supabase
 /hooks            → React Query hooks (comentários, likes, etc)
 /data-access-layer → Funções de acesso a dados (DAL)
 /pages            → Rotas Next.js
```

## 🧪 Como Rodar Localmente
```bash
git clone https://github.com/gmoreiraDEV/zion-tech-test.git
cd zion-tech-test
npm install
npm run dev
```

Configure seu `.env` com as variáveis do Supabase.

---

## 📦 Deploy

Deploy automático via Vercel:
🔗 https://vercel.com/gmoreiradevs-projects/zion-tech-test

---

## 📃 Licença
MIT — [gmoreiraDEV](https://github.com/gmoreiraDEV)