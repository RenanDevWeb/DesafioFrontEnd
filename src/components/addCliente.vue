<template>
 
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
          <input type="date" v-model="form.dataExpedicao" id="dataExpedicao" required />
        </div>
        <div class="form-group">
          <label for="orgaoExpedicao">Órgão Expedição</label>
          <input type="text" v-model="form.orgaoExpedicao" id="orgaoExpedicao" placeholder="Digite o órgão expedidor" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="dataNascimento">Data de Nascimento</label>
          <input type="date" v-model="form.dataNascimento" id="dataNascimento" required />
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
            v-model="form.endereco.cep"
            id="cep"
            placeholder="Digite o CEP"
            required
            @input="fetchAddressByCep"
          />
        </div>
        <div class="form-group">
          <label for="logradouro">Logradouro</label>
          <input type="text" v-model="form.endereco.logradouro" id="logradouro" placeholder="Digite o logradouro" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="numero">Número</label>
          <input type="text" v-model="form.endereco.numero" id="numero" placeholder="Digite o número" required />
        </div>
        <div class="form-group">
          <label for="complemento">Complemento</label>
          <input type="text" v-model="form.endereco.complemento" id="complemento" placeholder="Digite o complemento" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input type="text" v-model="form.endereco.bairro" id="bairro" placeholder="Digite o bairro" required />
        </div>
        <div class="form-group">
          <label for="cidade">Cidade</label>
          <input type="text" v-model="form.endereco.cidade" id="cidade" placeholder="Digite a cidade" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="uf">UF</label>
          <input type="text" v-model="form.endereco.uf" id="uf" placeholder="Digite a UF" required />
        </div>
      </div>

      <!-- Botão de envio -->
      <button type="submit" class="submit-btn">Cadastrar</button>
    </form>
 
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useClientStore } from "../assets/stores/clientStore.js";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  setup() {
    const form = ref({
      clienteId: 2777,
      cpf: "",
      nome: "",
      rg: "",
      dataExpedicao: "",
      orgaoExpedicao: "",
      dataNascimento: "",
      sexo: "",
      estadoCivil: "",
      endereco: {
        enderecoId: 2777,
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
      },
    });

    const clientStore = useClientStore();

    // Função de sanitização dos dados
    const sanitizeData = () => {
      form.value.cpf = form.value.cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos do CPF
      form.value.rg = form.value.rg.replace(/[^\d]/g, ""); // Remove caracteres não numéricos do RG
      form.value.nome = form.value.nome.trim().replace(/[^\w\s]/gi, ''); // Remove caracteres especiais do nome
      form.value.dataExpedicao = form.value.dataExpedicao ? new Date(form.value.dataExpedicao).toISOString().split('T')[0] : ''; // Sanitiza a data
      form.value.dataNascimento = form.value.dataNascimento ? new Date(form.value.dataNascimento).toISOString().split('T')[0] : ''; // Sanitiza a data
      form.value.orgaoExpedicao = form.value.orgaoExpedicao.trim().replace(/[^\w\s]/gi, ''); // Sanitiza o órgão de expedição
      form.value.sexo = form.value.sexo.trim(); // Remove espaços extras no sexo
      form.value.estadoCivil = form.value.estadoCivil.trim(); // Remove espaços extras no estado civil

      // Sanitização do endereço
      form.value.endereco.cep = form.value.endereco.cep.replace(/[^\d]/g, ''); // Remove caracteres não numéricos do CEP
      form.value.endereco.logradouro = form.value.endereco.logradouro.trim().replace(/[^\w\s]/gi, ''); // Sanitiza o logradouro
      form.value.endereco.numero = form.value.endereco.numero.trim(); // Remove espaços extras no número
      form.value.endereco.complemento = form.value.endereco.complemento.trim().replace(/[^\w\s]/gi, ''); // Sanitiza o complemento
      form.value.endereco.bairro = form.value.endereco.bairro.trim().replace(/[^\w\s]/gi, ''); // Sanitiza o bairro
      form.value.endereco.cidade = form.value.endereco.cidade.trim().replace(/[^\w\s]/gi, ''); // Sanitiza a cidade
      form.value.endereco.uf = form.value.endereco.uf.trim().toUpperCase(); // Converte o UF para maiúsculas
    };

    // Função para submeter o formulário
    const submitForm = async () => {
      try {
        // Sanitiza os dados antes de enviá-los
        sanitizeData();
        
        console.log("Dados do formulário:", form.value);
        clientStore.fillFormclient(form.value); // Atualiza os dados na store
        await clientStore.submitFormClient();  // Envia os dados da store
        Swal.fire('Cliente cadastrado com Sucesso');
      } catch (error) {
        Swal.fire('Houve um erro ao enviar o formulário.');
       
      }
    };

    // Função para buscar o endereço por CEP
    const fetchAddressByCep = async () => {
      const cep = form.value.endereco.cep.replace(/\D/g, ""); // Remove qualquer coisa que não seja número

      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (response.data.erro) {
            alert("CEP não encontrado!");
          } else {
            form.value.endereco.logradouro = response.data.logradouro;
            form.value.endereco.bairro = response.data.bairro;
            form.value.endereco.cidade = response.data.localidade;
            form.value.endereco.uf = response.data.uf;
          }
        } catch (error) {
          
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
    margin-top:8rem;
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