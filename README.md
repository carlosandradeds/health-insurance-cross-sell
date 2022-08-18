# Health Insurance Cross Sell

## Descrição do Problema

Uma empresa que oferece seguros de saúde para seus clientes, a Insurance All, conta agora com a possibilidade de oferecer um novo produto aos seus clientes: um seguro de automóveis.

Com isso a empresa fez uma pesquisa com cerca de 380.000 clientes, para saber sobre o seu interesse em adquirir um novo produto, que seria o seguro de automóveis.Todos os clientes responderam a pesquisa e responderam que sim e que não e as respostas junto aos suas informações foram salvos em um banco de dados.

Agora a equipe selecionou 127 mil novos clientes que não responderam ao questionário anterior, para participar de uma nova campanha para ofertar o novo produto. A oferta será feita pela equipe de vendas por meio de ligações telefônicas, porém a equipe só irá conseguir realizar 20.000 ligações. 

# 1. Problema de Negócio

Diante desse contexto, como consultor de Data Science, deverá construir um modelo que prevê e faz um ranking com os clientes que teriam mais chance de adquirir o produto.

Dessa forma a equipe de venda conseguirar priorizar clientes que tem mais chance de aderir um seguro de automóvel, assim otimizando a campanha e garantindo mais clientes para o novo produto.

Assim como resultado será entregue um relatório contendo algumas análises e respostas para as seguintes perguintas:

- Principais insights sobre os atributos mais relevantes dos clientes interessados em adquirir seguro de automóveis.

- Qual a porcentagem de clientes interessados em comprar seguro de automóveis a equipe de vendas poderá atingir com 20.000 ligações?

- E se a capacidade da equipe de vendas aumentar para 40.000 chamadas, que porcentagem de clientes interessados em adquirir seguro de automóveis a equipe de vendas poderá entrar em contato?

# 2. Planejamento da Solução

Será disponibilizado ao final do trabalho uma ferramenta através do Google Sheets que ordena os clientes de acordo com sua propensão de compra do novo produto.

## Processo: 

**Etapa 01. Descrição dos dados:**

Nessa etapa foi feita a coleta dos dados e assim descrição dos seus atributos, como dimensão, tipos, dados nulos e tentar identificar quais dados podem está fora do escopo de negócio. 

**Etapa 02. Feature Engineering:**

Etapa para criação de novos atributos baseados nas variáveis originais e assim melhor descrever o fenômeno que será modelado.

**Etapa 03. Filtragem de Dados:**

Filtragem de linhas e colunas que contenham informações que possam atrapalhar a modelagem e que estão fora do escopo do negócio.

**Step 04. Análise exploratória dos dados:**

Nessa etapa são explorados os dados para encontrar insights e entender melhor como as variáveis podem influenciar no modelo e qual o seu grau de importância. 

**Etapa 05. Preparação dos dados:**

Agora os dados são preparados para que os modelos de aprendizado de maquina possam responder melhor ao comportamento em questão

**Etapa 06. Seleção de Features:**

Seleção dos atributos que tem mais significado para treinar o modelo.

**Etapa 07. Machine Learning Modelling:**

O modelo de machine learning é treinado e validado.

**Etapa 08. Hyperparameter Fine Tunning:**

Escolha dos melhores parâmetros do modelo selecionado na etapa anterior.

**Etapa 09. Conversão do desempenho do modelo para valores de negócio:**

Responder as questões de negócio e comparar os resultados da lista ordenada pelo modelo e a lista aleatória antes utilizada.

**Step 10. Deploy do Modelo em Produção:**

O modelo é publicado em um ambiente de nuvem para que outras pessoas pessoas possam utilizar.

# 4. Top 3 Data Insights

**Hipótese 01:** Clientes que já sofreram algum acidente tem mais interesse em adquirir seguros de veículos.

![h1](/img/vehicle_damage.png)

**Verdadeira:** 98% dos clientes interessados no seguro já sofreram algum tipo de acidentes.

**Hipótese 02:** Clientes com carro a mais tempo tem mais interesse em adquirir um seguro.

![h2](/img/vehicle_age.png)

**Verdadeiro.** Proporcionalmente, pessoas que tem carros a mais tempo são mais interessadas em ter um seguro.

**Hipótese 03:** Clientes acima de 30 anos são mais interessados em adquirir seguro de veículos.

![h3](/img/age1.png) ![h4](/img/age2.png)

**Verdadeiro** Aproximadamente 87% dos clientes interessados tem mais que 30 anos de idade.

# 5. Machine Learning Model Applied

Os modelos foram treinados utilizando técnicas de cross-validation e fine tuning e assim comparados através das métricas de precision e recall que foram obtidas com combinação de hyperparametros que tiveram o melhor desempenho.


|Model|Precision|Recall
|:----------------|:------------------:|-----------------------:|
| KNN| 0.29383+/-0.00125 | 0.78514+/-0.00334  |
| L_Regression  | 0.29582+/-0.00168| 0.78899+/-0.00449 |
| XGB   | 0.31127+/-0.00113 | 0.83174+/-0.00301 |
| R_Forest| 0.30844+/-0.00134 |0.82265+/-0.00355|
| E_Trees| 0.30258+/-0.0013 | 0.807+/-0.00346 |


# 6. Machine Learning Modelo Performance

Então a partir do desempenho calculado nos testes anteriores, o XGBoost mostrou bons resultados e foi também escolhido por ser um modelo melhor otimizado, garantindo mais velocidade com arquivos muito menores.

Com o modelo treinado avaliamos a partir das métricas de recall@k e precision@k.

![gain](/img/cumulative_manually.png) ![lift1](/img/lift_manually.png)

# 7. Resultado de negócio

- Qual a porcentagem de clientes interessados em comprar o seguro de automóveis a equipe conseguirá atingir com 20.000 ligações?

Ao utilizar aproximadamente 26% dos dados de validação que correspondem a 20.000 ligações, o modelo seria capaz de identificar aproximadamente 71% do total de interessados em adquirir o seguro.

![gain2](/img/cumulative.png)

Ao realizar 20 mil ligaões, o modelo é cerca de 2,7 vezes melhor que a escolha aleatória.

![lift2](/img/lift.png)

Considerando agora os 127 mil clientes que não foram entrevistados para a campanha em questão, temos que 20.000 ligaçoes representam 15,75% desse total.

Assim, cogitando que o modelo se manterá para os dados que não foram treinados, analisando a curva de ganho é possivel afirmar que aproximadamente 47% do total de clientes interessados. 


- E se a capacidade da equipe de vendas aumentar para 40.000 chamadas, que porcentagem de clientes interessados em adquirir seguro de automóveis a equipe de vendas poderá entrar em contato?

Agora ao utilizar aproximadamente 52% dos dados de validação, que seriam traduzidos em 40 mil ligações, o modelo seria capaz de identificar 99,38% do total de pessoas interessadas.

![gain40](/img/cumulative_40.png)

Ao relizar 40 mil ligações o modelo é cerca de 1,8 vezes melhor que a escolha aleatória.

Agora considerando os clientes que não foram entrevistados, 40 mil ligações de 127 mil clientes, significar atingir cerca 31% do total de clientes, conseguindo agora idenitificar cerca de 80% dos clientes interessados em novo seguro para automóveis. 


# 8. Conclusão

O modelo foi publicado na cloud do Heroku e implementado em uma planilha do Google Sheets ().

A planilha então pode ser utilizada por qualquer funcionário e estabelecer um ranking dos clientes com maior probabilidade de adquirir o seguro. 

# 9. Lições aprendidas

Ao final desse projeto foi possivel compreender o fenômeno Learning to Rank (LTR) e como é utilizada para melhorar resultados de uma pesquisa. Existem três abordagens para LTR sendo elas Pointwise,Listwise e Pairwise (utilizada neste projeto).

Abordagens de Pairwise examinam dois documentos juntos. Eles também usam classificação ou regressão - para decidir qual dos pares tem melhor classificação. Comparamos este par superior-inferior com a verdade básica e ajustamos a classificação se não corresponder. O objetivo é minimizar o número de casos em que o par de resultados está na ordem errada em relação à verdade fundamental.

Outro ponto muito interessante foram as métricas que precisaram ser utilizadadas para esse tipo de fenômeno, onde utilizamos as métricas Recall@k e Precision@k, contando agora com novas habilidades e conhecimentos para serem utilizados em novos projetos.

# 10. Proximos Passos

É possivel iniciar mais um ciclo e analisar o problema utilizando abordagens diferentes. 

- Criação de novas Features

- Rescaling e Encode com métodos diferentes

- Trabalhar um método mais robusto para achar melhores parametros para o modelo


