<template>
    <div class="form-container">
      <form @submit.prevent="submitForm" class="client-form">
        <h2>Cadastro de Cliente</h2>
  
        <!-- Dados Pessoais -->
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input type="text" v-model="form.cpf" id="cpf" placeholder="Digite o CPF" required />
        </div>
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" v-model="form.nome" id="nome" placeholder="Digite o nome completo" required />
        </div>
        <div class="form-group">
          <label for="rg">RG</label>
          <input type="text" v-model="form.rg" id="rg" placeholder="Digite o RG" required />
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="dataExpedicao">Data Expedição</label>
            <input type="datetime-local" v-model="form.dataExpedicao" id="dataExpedicao" required />
          </div>
          <div class="form-group">
            <label for="orgaoExpedicao">Órgão Expedição</label>
            <input type="text" v-model="form.orgaoExpedicao" id="orgaoExpedicao" placeholder="Digite o órgão expedidor" required />
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="ufExpedicao">UF</label>
            <input type="text" v-model="form.ufExpedicao" id="ufExpedicao" placeholder="Digite a UF" required />
          </div>
          <div class="form-group">
            <label for="dataNascimento">Data de Nascimento</label>
            <input type="datetime-local" v-model="form.dataNascimento" id="dataNascimento" required />
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="sexo">Sexo</label>
            <select v-model="form.sexo" id="sexo" required>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div class="form-group">
            <label for="estadoCivil">Estado Civil</label>
            <select v-model="form.estadoCivil" id="estadoCivil" required>
              <option value="solteiro">Solteiro</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
              <option value="viuvo">Viúvo</option>
            </select>
          </div>
        </div>
  
        <!-- Endereço -->
        <h3>Endereço Cliente</h3>
  
        <div class="form-row">
          <div class="form-group">
            <label for="cep">CEP</label>
            <input
              type="text"
              v-model="form.cep"
              id="cep"
              placeholder="Digite o CEP"
              required
              @input="fetchAddressByCep"
            />
          </div>
          <div class="form-group">
            <label for="logradouro">Logradouro</label>
            <input type="text" v-model="form.logradouro" id="logradouro" placeholder="Digite o logradouro" required />
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="numero">Número</label>
            <input type="text" v-model="form.numero" id="numero" placeholder="Digite o número" required />
          </div>
          <div class="form-group">
            <label for="complemento">Complemento</label>
            <input type="text" v-model="form.complemento" id="complemento" placeholder="Digite o complemento" />
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="bairro">Bairro</label>
            <input type="text" v-model="form.bairro" id="bairro" placeholder="Digite o bairro" required />
          </div>
          <div class="form-group">
            <label for="cidade">Cidade</label>
            <input type="text" v-model="form.cidade" id="cidade" placeholder="Digite a cidade" required />
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label for="uf">UF</label>
            <input type="text" v-model="form.uf" id="uf" placeholder="Digite a UF" required />
          </div>
        </div>
  
        <!-- Botão de envio -->
        <button type="submit" class="submit-btn">Cadastrar</button>
      </form>
    </div>
  </template>
  
 
<script>
import axios from "axios";
import { ref } from "vue";
import { useClientStore } from "../assets/stores/clientStore"; // Ajuste o caminho conforme necessário

export default {
  setup() {
    const form = ref({
      cpf: "",
      nome: "",
      rg: "",
      dataExpedicao: "",
      orgaoExpedicao: "",
      ufExpedicao: "",
      dataNascimento: "",
      sexo: "masculino",
      estadoCivil: "solteiro",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
    });

    // Acessando a store
    const clientStore = useClientStore();

    // Função para submeter o formulário
    const submitForm = async () => {
      try {
        console.log("Dados do formulário:", form.value);

        // Chama a ação para enviar os dados
        await clientStore.submitFormClient(form.value);

        // Sucesso no envio
        alert("Cliente cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Houve um erro ao enviar o formulário.");
      }
    };

    // Função para buscar o endereço por CEP
    const fetchAddressByCep = async () => {
      const cep = form.value.cep.replace(/\D/g, ""); // Remove qualquer coisa que não seja número

      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (response.data.erro) {
            alert("CEP não encontrado!");
          } else {
            form.value.logradouro = response.data.logradouro;
            form.value.bairro = response.data.bairro;
            form.value.cidade = response.data.localidade;
            form.value.uf = response.data.uf;
          }
        } catch (error) {
          console.error("Erro ao buscar o CEP:", error);
          alert("Erro ao buscar o CEP.");
        }
      }
    };

    return {
      form,
      submitForm,
      fetchAddressByCep,
    };
  },
};
</script>

  

  
  <style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: #f4f4f4;
    margin-top:10rem;
  }
  
  .client-form {
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  h3 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .form-group {
    flex: 1;
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button.submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button.submit-btn:hover {
    background-color: #45a049;
  }
  </style>