# Projeção ICM v1.1.0

Projeção para Igreja Cristã Maranata. Suporta os idiomas português (pt-BR), inglês (en) e italiano (it)

Painel                     |  Projeção
:-------------------------:|:-------------------------:
![](https://github.com/chacalbl4ck/projection-html5-icm/raw/master/docs/assets/img/painel.gif)      |  ![](https://github.com/chacalbl4ck/projection-html5-icm/raw/master/docs/assets/img/projecao.gif)

Características
---------------

* Edição fácil de louvores (Uma linha vazia faz a separação dos slides)
* Criar pastas para organizar letras (em um idioma específico)
* Crie de forma rápida sua lista de projeção (apenas com um duplo-clique no louvor)
* Projeta avisos
* Projeta imagens
* Suporte a bíblias (ACF e NVI)
* Suporte a múltiplos idiomas

Tecnologias Utilizadas
----------------------

1. Bootstrap
2. Jstree
3. Reveal.js
4. jQuery
5. FontAwesome

Roda nos navegadores
--------------------

* Mozilla Firefox
* Google Chrome (É necessário importar manualmente o data.json pela primeira vez, após isso ficará salvo).

Uso
---

1. Baixe o Node.js
2. Abra um Prompt de Comando no Windows na pasta onde está o projeto da Projeção.
3. Digite "npm i" e depois "npm start" e veja no console o endereço para abrir a projeção.
4. Se a projeção entrar em loop pela primeira vez, certifique-se de que o navegador esteja permitindo os Pop Ups da página. Depois basta recarregar.

Copyrights
---

Este projeto é uma derivação do projeto de Ítalo Zaina https://italozaina.github.io/projection-html5-icm/
Nesta versão que estou disponibilizando foi corrigido o problema de não conseguir salvar os louvores editados ou acrecentados/deletados.

TODOs mais críticos
---

* Corrigir problema em que ao escolher uma configuração e clicar em salvar, o projeto não salva.
* Corrigir problema em que imagens e avisos não são salvos ao recarregar a página ou encerrar o Node.js.
* Otimizar o uso de memória evitando o carregamento da bíblia juntamente com o site (deverá ser carregada quando clicado na aba Bíblia).
* Otimizar a busca de louvores (devido ao arquivo data.json ter muitas informações, essa busca fica lenta). Talvez dividir os louvores em arquivos separados?

TODOs de melhorias
---

* Permitir arrastar ou organizar louvores, avisos e imagens entre as pastas.
* Incluir um seletor de fonte nas configurações da projeção.
