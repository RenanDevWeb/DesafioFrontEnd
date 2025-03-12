<template>
  <div class="form-container">
    <form @submit.prevent="updateClient" class="client-form">
      <h2>Alteração de Cliente</h2>
      
      <!-- Dados Pessoais -->
      <div class="form-group">
        <label for="cpf">CPF</label>
        <input type="text" v-model="clientData.cpf" id="cpf" placeholder="Digite o CPF" required />
      </div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" v-model="clientData.nome" id="nome" placeholder="Digite o nome completo" required />
      </div>
      <div class="form-group">
        <label for="rg">RG</label>
        <input type="text" v-model="clientData.rg" id="rg" placeholder="Digite o RG" required />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="dataExpedicao">Data Expedição</label>
          <input type="date" v-model="clientData.dataExpedicao" id="dataExpedicao" required />
        </div>
        <div class="form-group">
          <label for="orgaoExpedicao">Órgão Expedição</label>
          <input type="text" v-model="clientData.orgaoExpedicao" id="orgaoExpedicao" placeholder="Digite o órgão expedidor" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="dataNascimento">Data de Nascimento</label>
          <input type="date" v-model="clientData.dataNascimento" id="dataNascimento" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="sexo">Sexo</label>
          <select v-model="clientData.sexo" id="sexo" required>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div class="form-group">
          <label for="estadoCivil">Estado Civil</label>
          <select v-model="clientData.estadoCivil" id="estadoCivil" required>
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
            v-model="clientData.endereco.cep"
            id="cep"
            placeholder="Digite o CEP"
            required
            @input="fetchAddressByCep"
          />
        </div>
        <div class="form-group">
          <label for="logradouro">Logradouro</label>
          <input type="text" v-model="clientData.endereco.logradouro" id="logradouro" placeholder="Digite o logradouro" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="numero">Número</label>
          <input type="text" v-model="clientData.endereco.numero" id="numero" placeholder="Digite o número" required />
        </div>
        <div class="form-group">
          <label for="complemento">Complemento</label>
          <input type="text" v-model="clientData.endereco.complemento" id="complemento" placeholder="Digite o complemento" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="bairro">Bairro</label>
          <input type="text" v-model="clientData.endereco.bairro" id="bairro" placeholder="Digite o bairro" required />
        </div>
        <div class="form-group">
          <label for="cidade">Cidade</label>
          <input type="text" v-model="clientData.endereco.cidade" id="cidade" placeholder="Digite a cidade" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="uf">UF</label>
          <input type="text" v-model="clientData.endereco.uf" id="uf" placeholder="Digite a UF" required />
        </div>
      </div>

      <!-- Botão de envio -->
      <button type="submit" class="submit-btn">Alterar</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useClientStore } from '../assets/stores/clientStore';

export default {
  name: 'AlterarCliente',
  setup() {
    const route = useRoute();
    const clientStore = useClientStore();
    const clientData = ref({
      clienteId: 0,
      cpf: '',
      nome: '',
      rg: '',
      dataExpedicao: '',
      orgaoExpedicao: '',
      dataNascimento: '',
      sexo: '',
      estadoCivil: '',
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: ''
      }
    });

    const loadClientData = async (clientId) => {
      if (!clientId) {
        console.log("ID do cliente não encontrado");
        return;
      }

      try {
        await clientStore.fetchClientById(clientId);
        if (clientStore.form) {
          Object.assign(clientData.value, clientStore.form);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do cliente:", error);
      }
    };

    watch(() => route.params.clienteId, (newId) => {
      if (newId) {
        loadClientData(newId);
      }
    });

    onMounted(() => {
      const clientId = route.params.clienteId;
      if (!clientId) {
        console.log("O ID está incorreto");
        return;
      }
      loadClientData(clientId);
    });

    const sanitizeData = (clientData) => {
      clientData.value.cpf = form.value.cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos do CPF
      clientData.value.rg = form.value.rg.replace(/[^\d]/g, ""); // Remove caracteres não numéricos do RG
      clientData.value.nome = form.value.nome.trim().replace(/[^\w\s]/gi, ''); // Remove caracteres especiais do nome
      clientData.value.dataExpedicao = form.value.dataExpedicao ? new Date(form.value.dataExpedicao).toISOString().split('T')[0] : ''; // Sanitiza a data
      clientData.value.dataNascimento = form.value.dataNascimento ? new Date(form.value.dataNascimento).toISOString().split('T')[0] : ''; // Sanitiza a data
      clientData.value.orgaoExpedicao = form.value.orgaoExpedicao.trim().replace(/[^\w\s]/gi, ''); // Sanitiza o órgão de expedição
      clientData.value.sexo = form.value.sexo.trim(); // Remove espaços extras no sexo
      clientData.value.estadoCivil = form.value.estadoCivil.trim(); // Remove espaços extras no estado civil

      // Sanitização do endereço
      clientData.value.endereco.cep = form.value.endereco.cep.replace(/[^\d]/g, ''); // Remove caracteres não numéricos do CEP
      clientData.value.endereco.logradouro = form.value.endereco.logradouro.trim().replace(/[^\w\s]/gi, ''); // Sanitiza o logradouro
      clientData.value.endereco.numero = form.value.endereco.numero.trim(); // Remove espaços extras no número
      clientData.value.endereco.complemento = form.value.endereco.complemento.trim().replace(/[^\w\s]/gi, ''); // Sanitiza o complemento
      clientData.value.endereco.bairro = form.value.endereco.bairro.trim().replace(/[^\w\s]/gi, ''); // Sanitiza o bairro
      clientData.value.endereco.cidade = form.value.endereco.cidade.trim().replace(/[^\w\s]/gi, ''); // Sanitiza a cidade
      clientData.value.endereco.uf = form.value.endereco.uf.trim().toUpperCase(); // Converte o UF para maiúsculas
    };


    const updateClient = async () => {
      const sanitizedData = sanitizeData(clientData.value);
      console.log(sanitizeData);
  if (sanitizedData.clienteId) {
    await clientStore.updateClient(sanitizedData.clienteId, sanitizedData);
  } else {
    await clientStore.submitFormClient(sanitizedData);
  }
    };

    return {
      clientData,
      updateClient
    };
  }
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