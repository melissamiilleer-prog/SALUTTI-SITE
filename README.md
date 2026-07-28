# Salutti Empresarial — Site Institucional

Site institucional multipáginas da SALUTTI Empresarial, consultoria estratégica em licitações públicas.

## Estrutura do projeto

```
.
├── index.html        # Início
├── sobre.html         # Sobre — missão, visão, valores, equipe
├── servicos.html       # Serviços — metodologia, diferenciais, oportunidades
├── contato.html        # Contato — formulário + canais diretos
├── styles.css          # Estilos compartilhados (tokens, componentes, responsivo)
├── script.js            # Menu mobile, scroll reveal, header on scroll, form → WhatsApp
├── assets/
│   ├── hero.jpg          # Imagem de abertura (Início)
│   ├── equipe-sede.jpg    # Foto real da equipe na sede
│   ├── editais.jpg         # Foto ilustrando análise de editais/legislação
│   ├── logo-selo.jpg        # Logotipo (lockup) usado como selo/badge
│   ├── logo.png              # Logotipo (ícone + nome) — favicon / apple-touch-icon
│   └── logo-wide.png          # Logotipo (versão larga) — header / footer
└── README.md
```

Não há build step: é um site estático puro (HTML/CSS/JS), pronto para publicar em
qualquer host estático (GitHub Pages, Netlify, Vercel, etc.) ou em um servidor
tradicional. Basta servir a raiz do projeto.

## Publicar no GitHub Pages

1. Suba este conteúdo para um repositório no GitHub.
2. Em **Settings → Pages**, selecione a branch principal e a pasta raiz (`/`).
3. O site ficará disponível em `https://<usuario>.github.io/<repositorio>/`.

Se o domínio final não for a raiz do GitHub Pages (ex.: usa domínio próprio via
`CNAME`), nenhuma alteração de caminho é necessária — todos os links internos e
assets usam caminhos relativos (`./assets/...`, `index.html`, `sobre.html` etc.).

## Convenções

- Todas as páginas compartilham o mesmo `<header>` e `<footer>` (copiados
  manualmente em cada arquivo, já que o projeto não usa um gerador estático).
  Ao editar o menu, o WhatsApp, e-mail ou telefone, atualize os quatro arquivos
  `.html`.
- Paleta, tipografia e componentes ficam centralizados em `styles.css`
  (custom properties no `:root`).
- `script.js` é compartilhado por todas as páginas; funcionalidades específicas
  de uma página (como o formulário de contato) verificam se o elemento existe
  antes de rodar, então é seguro incluir o mesmo `script.js` em todas as páginas.

## Conteúdo

Os textos institucionais (missão, visão, valores, metodologia, diferenciais e
dados de mercado) foram redigidos com base no material institucional da SALUTTI.
Informações comerciais específicas de propostas a clientes (valores de
mensalidade, comissão, dados de clientes individuais) não foram incluídas por
não serem apropriadas para um site público.
