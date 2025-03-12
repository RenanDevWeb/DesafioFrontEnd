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
import { useRoute,useRouter  } from 'vue-router';
import { useClientStore } from '../assets/stores/clientStore';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  name: 'AlterarCliente',
  setup() {
    const route = useRoute();
    const router = useRouter();
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
  // Verifique se os campos do cliente estão definidos antes de sanitizar
  clientData.cpf = clientData.cpf ? clientData.cpf.replace(/[^\d]/g, "") : "";
  clientData.rg = clientData.rg ? clientData.rg.replace(/[^\d]/g, "") : "";
  clientData.nome = clientData.nome ? clientData.nome.trim().replace(/[^\w\s]/gi, '') : '';
  clientData.dataExpedicao = clientData.dataExpedicao ? new Date(clientData.dataExpedicao).toISOString().split('T')[0] : '';
  clientData.dataNascimento = clientData.dataNascimento ? new Date(clientData.dataNascimento).toISOString().split('T')[0] : '';
  clientData.orgaoExpedicao = clientData.orgaoExpedicao ? clientData.orgaoExpedicao.trim().replace(/[^\w\s]/gi, '') : '';
  clientData.sexo = clientData.sexo ? clientData.sexo.trim() : '';
  clientData.estadoCivil = clientData.estadoCivil ? clientData.estadoCivil.trim() : '';

  // Verificação e sanitização do objeto endereco
  clientData.endereco = clientData.endereco || {};  // Garantir que 'endereco' existe
  clientData.endereco.cep = clientData.endereco.cep ? clientData.endereco.cep.replace(/[^\d]/g, '') : '';
  clientData.endereco.logradouro = clientData.endereco.logradouro ? clientData.endereco.logradouro.trim().replace(/[^\w\s]/gi, '') : '';
  clientData.endereco.numero = clientData.endereco.numero ? clientData.endereco.numero.trim() : '';
  clientData.endereco.complemento = clientData.endereco.complemento ? clientData.endereco.complemento.trim().replace(/[^\w\s]/gi, '') : '';
  clientData.endereco.bairro = clientData.endereco.bairro ? clientData.endereco.bairro.trim().replace(/[^\w\s]/gi, '') : '';
  clientData.endereco.cidade = clientData.endereco.cidade ? clientData.endereco.cidade.trim().replace(/[^\w\s]/gi, '') : '';
  clientData.endereco.uf = clientData.endereco.uf ? clientData.endereco.uf.trim().toUpperCase() : '';

  console.log(clientData); // Verifique o conteúdo de clientData após sanitização
};
    const updateClient = async () => {
  sanitizeData(clientData.value); // Sanitiza os dados
  const sanitizedData = clientData.value; // Obtém os dados já sanitizados


  if (sanitizedData.clienteId) {
    await clientStore.updateClient(sanitizedData.clienteId, sanitizedData);
    Swal.fire('Cliente alterado com Sucesso');
    router.push('/clientes');
  } else {
    await clientStore.submitFormClient(sanitizedData);
    Swal.fire('Houve algum erro na alteração');
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
  background-color: #ededed;
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