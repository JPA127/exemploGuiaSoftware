# Guia de softwares de design

Site estático (HTML, CSS e JS puros) gerado a partir do `Guia_de_softwares_v2.docx`.

## Estrutura
- `index.html` — página única com navegação lateral e busca
- `css/style.css` — estilos
- `js/app.js` — rotas (`#/c/<área>`, `#/s/<software>`) e renderização
- `js/data.js` — **todo o conteúdo do guia**; edite aqui para atualizar textos, preços e tutoriais

## Rodar localmente
Abra `index.html` no navegador, ou use `npx serve .`.

## Publicar
1. GitHub: crie um repositório e envie o conteúdo desta pasta (o `index.html` fica na raiz).
2. Vercel: *Add New → Project*, importe o repositório. Framework Preset: **Other**; deixe Build Command e Output Directory em branco. Deploy.
