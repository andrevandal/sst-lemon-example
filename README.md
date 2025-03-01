# sst-lemon-example

Este projeto é uma PoC (Proof of Concept) para o [SST](https://sst.dev/).
Como contexto de exemplo de funcionalidades, vamos implementar um exemplo de como seria o Lemonpie dentro desta stack.

Neste projeto usamos:

- `node@22`
- `pnpm@10`
- `typescript@5`
- `sst@3`
- `vite`
- `vitest`
- `react`
- `react-router`
- `tailwindcss@4`

O ambiente de produção é `AWS`.

## Conteúdo

### `apps/`

#### `lemonpie-docs`

O `apps/lemonpie-docs` é a aplicação da [Documentação do Lemonpie](https://lemonpie.lemon.energy/).
Lembre-se de manter atualizado.

#### `lemonpie-playgroud`

O `apps/lemonpie-playground` é um ambiente de desenvolvimento para testes e desenvolvimento de componentes do Lemonpie.

### `packages/`

#### `lemonpie-theme`

O `packages/lemonpie-theme` é um pacote que exporta as configurações necessárias/padronizadas do Lemonpie usando o TailwindCSS v4.

#### `lemonpie-components`

O `packages/lemonpie-components` é um pacote que exporta os componentes mais "crus" do Lemonpie focando em reusabilidade, modularidade e composibilidade.

#### `lemonpie-utils`

O `packages/lemonpie-utils` é um pacote que exporta utilidades gerais que podem ser úteis em qualquer projeto.

## Comandos

- `pnpm install`
- `pnpm exec sst dev --stage dev`
- `pnpm exec sst deploy --stage dev`

## SST com React Router v7

O suporte oficial ainda não é funcional.

https://github.com/sst/sst/pull/5289
https://github.com/ironheart122/react-router-7-x-sst-template

## Live example

https://d31zhtgno0gbge.cloudfront.net