<template >
 <div class="table">
    <h1>Lista de Clientes</h1>
     <div class="finder">
        <input type="text" />
        <button type="text"> Procurar</button>
     </div> 

    <p v-if="clientStore.loading">Carregando...</p>
    <p v-if="clientStore.error">{{ clientStore.error }}</p>

    <!-- Tabela de Clientes -->
    <table v-if="clientStore.clients.length" class="client-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>CPG</th>
          <th>Nome</th>
          <th>RG</th>
          <th>Data de Expedição</th>
          <th>Orgão de expedição</th>
          <th>UF</th>
          <th>Data de Nascimento</th>
          <th>Sexo</th>
          <th>Estado Civil</th>
          <th>Endereço ID</th>
          <th>Cep</th>
          <th>Logradouro</th>
          <th>Numero</th>
          <th>Complemento</th>
          <th>Bairro</th>
          <th>cidade</th>
          <th>UF</th>
          <th>Acoes</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clientStore.clients" :key="client.id">
          <td>{{ client.clienteId }}</td>
          <td>{{ client.cpf }}</td>
          <td>{{ client.nome }}</td>
          <td>{{ client.rg }}</td>
          <td>{{ client.dataExpedicao }}</td>
          <td>{{ client.orgaoExpedicao }}</td>
          <td>{{ client.uf }}</td>
          <td>{{ client.dataNascimento }}</td>
          <td>{{ client.sexo }}</td>
          <td>{{ client.estadoCivil }}</td>
          <td>{{ client.endereco.enderecoId }}</td>
          <td>{{ client.endereco.cep }}</td>
          <td>{{ client.endereco.logradouro }}</td>
          <td>{{ client.endereco.numero }}</td>
          <td>{{ client.endereco.complemento }}</td>
          <td>{{ client.endereco.bairro }}</td>
          <td>{{ client.endereco.cidade }}</td>
          <td>{{ client.endereco.uf }}</td>
          <td class="actions">
            <button>Ver</button>
            <button>Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Nenhum cliente encontrado.</p>

    <p>Total de clientes: {{ clientStore.totalClients }}</p>
  </div>

</template>
<script setup>
     import {onMounted} from 'vue'
     import { useClientStore } from "../assets/stores/clientStore"

     const clientStore  = useClientStore()

   onMounted(() => {
        clientStore.fetchClients()
     })


</script>
<style >

.finder{
    display: flex;
    margin: 20px;
    width: 70%;
}
.finder input{
    width: 100%;
}
.finder button{
    margin-left: 20px;
    max-width: 100px;
}
.table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
table{
    color: #000;
    width: 85%;
    
}

</style>