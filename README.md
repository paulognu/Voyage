# Voyage

**Automatização de Relatórios do Setor Elétrico (SEP e ERAC)**

O projeto **Voyage** tem como objetivo automatizar a geração e envio de relatórios dos setores **SEP** e **ERAC**, facilitando o trabalho e aumentando a eficiência da equipe elétrica.

- **SEP (Sistema Especial de Proteção ou Sistema Específico de Proteção)**:  
  É utilizado para proteger equipamentos contra condições anormais, como sobrecarga, sobretensão, subtensão e, principalmente, subfrequência ou sobrefrequência na rede elétrica. Atua automaticamente para evitar danos aos equipamentos e garantir a estabilidade do sistema elétrico.

- **ERAC (Esquema Regional de Alívio de Carga)**:  
  Atua de forma semelhante ao SEP, mas com foco em reduzir a carga em determinadas áreas quando há anomalias na frequência, prevenindo apagões e mantendo o equilíbrio do sistema elétrico.

## 🌟 Diferencial

O principal diferencial do Voyage é a **integração com a Base Histórica do SAGE**  
(Sistema Aberto de Gestão de Energia do CEPEL - [https://www.cepel.br/](https://www.cepel.br/)), permitindo:

- Consulta e extração direta de dados históricos de energia elétrica  
- Processamento automatizado de grandes volumes de informações  
- Geração de relatórios precisos com base em dados confiáveis e atualizados  

## 📝 Funcionalidades

- Geração automática de relatórios do SEP e ERAC  
- Processamento de dados elétricos diretamente da base SAGE  
- Exportação para formatos padrões (ex.: Excel, PDF)  
- Envio automático de relatórios para e-mails ou sistemas internos  

## 💻 Tecnologias Utilizadas

- **Frontend:** JavaScript/Angular
- **Backend:** Python com Django  
- **Banco de dados:** PostgreSQL  
- Integração com sistemas: SAGE (CEPEL)  

## ⚙️ Instalação

Siga os passos abaixo para configurar o ambiente do projeto:

```bash
# Clone o repositório
git clone https://github.com/paulognu/Voyage.git

# Acesse o diretório do projeto
cd Voyage

# Configure o banco de dados PostgreSQL
# (detalhes de criação e conexão com o banco devem ser adicionados)

# Execute as migrações do Django
python manage.py migrate

# Inicie o servidor
python manage.py runserver
