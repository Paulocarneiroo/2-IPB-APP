# 📱 Aplicativo IPB — Igreja Presbiteriana do Brasil

Aplicativo desenvolvido em **React Native** (usando **Expo**) com o propósito de centralizar recursos cristãos da **Igreja Presbiteriana do Brasil (IPB)** em um só lugar.  
O app oferece acesso rápido à **Bíblia Sagrada**, **Catecismo Maior de Westminster**, **Hinário Presbiteriano**, **Manual Presbiteriano**, devocionais e links úteis para membros e visitantes.

<p align="center">
  <img src="./demo/demo.gif" width="300" alt="Demonstração do App" />
</p>


---

## 🚀 Tecnologias Utilizadas

- **React Native**  
- **Expo Router**
- **TypeScript**
- **React Navigation**
- **Axios** (para requisições de conteúdo dinâmico)
- **Ionicons / FontAwesome / MaterialCommunityIcons** (ícones)
- **ScrollView, FlatList e Linking** (navegação e recursos nativos)
- **StyleSheet (CSS-in-JS)** para estilização

---

## 📲 Funcionalidades Principais

✅ **Tela Inicial (Home)**  
- Exibe botões em formato de **grade (2 colunas)** para cada seção do app.  
- Ícones intuitivos para cada funcionalidade (Bíblia, Catecismo, Hinário, Manual, etc).  
- Botões podem redirecionar tanto para telas internas quanto para **links externos** (ex: site da IPB ou documentos oficiais).  

✅ **Bíblia**  
- Leitura de versículos por capítulo.  
- **Texto selecionável** e copiável.  
- Scroll fluido e carregamento dinâmico de capítulos.  

✅ **Catecismo Maior de Westminster**  
- Exibição de perguntas e respostas em formato JSON.  
- Interface simples e legível para estudos teológicos.  

✅ **Hinário e Manual Presbiteriano**  
- Acesso direto a PDFs ou páginas oficiais.  
- Uso de `Linking.openURL()` para abrir recursos externos.  

✅ **Confissão de Fé de Westminster**  
- Exibição dos capítulos, tópicos e referências bíblicas da CFW.
---


## 🎨 Estilo Visual

* Paleta de cores suaves (tons de azul, verde e lilás)
* Layout limpo e responsivo
* Tipografia legível
* Ícones grandes e intuitivos
* Estrutura visual baseada em **ScrollView + Grid (2 colunas)**

---

## ⚙️ Como Executar o Projeto

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/seu-usuario/ipb-app.git
   cd ipb-app
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Executar em ambiente Expo**

   ```bash
   npx expo start
   ```

---

## 📦 Gerar Arquivo Executável (APK / IPA)

### Android

```bash
npx expo build:android -t apk
```
---
## 👤 Autor

**Paulo Carneiro**
📍 Brasil
🎓 Estudante de Ciência da Computação
✝️ Cristão e desenvolvedor apaixonado por tecnologia e fé <br>
🔗 [LinkedIn](https://www.linkedin.com/in/paulocarneiroo/) • [GitHub](https://github.com/Paulocarneiroo)

---

## ⚠️ Importante Saber
<b>Este projeto NÃO tem 
nenhuma ligação oficial com a 
Igreja Presbiteriana do Brasil, é apenas um projeto feito de forma independente e para fins de estudo 
</b>
---

## 🌟 Agradecimentos

Agradecimentos à minha amada **Igreja Presbiteriana do Brasil (IPB)** por inspirar este projeto,
e a todos os irmãos e irmãs que contribuem com o ensino fiel da Palavra de Deus.<br>
<i>Soli Deo Gloria</i>
