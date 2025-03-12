<template>
  <div class="container-list">
    <h1>Lista de Clientes</h1>
     <div class="finder">
        <input type="text"
        v-model="clientStore.searchQuery" 
        placeholder="Buscar por CPF" 
        
        />
        <router-link to="/addClients"><button type="text" class="view pi pi-plus"> Cadastrar</button></router-link>
     </div> 

    <p v-if="clientStore.loading">Carregando...</p>
    <p v-if="clientStore.error">{{ clientStore.error }}</p>


    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>CPF</th>
          <th>Nome</th>
          <th>RG</th>
          <th>Data de Expedição</th>
          <th>Orgão de Expedição</th>
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
          <th>Cidade</th>
          <th>UF</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="client in clientStore.filteredClients" :key="client.clienteId">
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
            <router-link :to="{ name: 'edit-client', params: { clienteId: client.clienteId } }">
              <button class="view "><i class="pi pi-eye"></i> Ver</button>
            </router-link>
          
            <button v-on:click="deleteClient(client.clienteId)" class="delete"> <i class="pi pi pi-trash"></i>Deletar</button>
          </td>
        </tr>
        <tr v-if="clientStore.filteredClients.length === 0">
        <td colspan="17">Nenhum cliente encontrado!</td>
      </tr>
      </tbody>
    </table>
    
 
  </div>
 



</template>
<script setup>
     import {onMounted} from 'vue'
     import { useClientStore } from "../assets/stores/clientStore"
     import Swal from 'sweetalert2';
    import 'sweetalert2/dist/sweetalert2.min.css';

     const clientStore  = useClientStore()

   onMounted(() => {
        clientStore.fetchClients()
     })


    const deleteClient = (clientID) => {
      Swal.fire({
    title: 'Tem certeza?',
    text: 'Esta ação não pode ser desfeita!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, Deletar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  }).then((result) => {
    if (result.isConfirmed) {
      clientStore.deleteClient(clientID)
      Swal.fire(
        'Deletado!',
        'O cliente foi removido.',
        'success'
      )
    }
  })
}
       


     


</script>
<style >
.container-list{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: start;
}
h1{
  margin-bottom: 10px;
}
.finder{
    display: flex;
    margin-bottom: 20px;
    width: 100%;
}
.finder input{
    width: 100%;
    outline: none;
    border-radius: 6px;
    padding: 10px;
}
.finder button{
    margin-left: 20px;
    max-width: 100px;
}
.container {
  width: 50vw;
  margin: 0 auto;
  padding: 20px;
}

.styled-table {
  width: 50vw;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ddd; /* Borda externa */
  border-radius: 5px;
}

.styled-table thead {
  background-color: #4CAF50;
  color: #fff;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  border: 1px solid #ddd; /* Bordas internas para células */
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
}

.styled-table td {
  background-color: #fff;
}

.styled-table th {
  text-align: center;
  font-weight: bold;
}

.styled-table td:last-child {
  text-align: center;
}
.actions{
  display: flex;
  justify-content: space-between;
}
.view{
	background:linear-gradient(to bottom, #2dabf9 5%, #0688fa 100%);
	background-color:#2dabf9;
	border-radius: 6px;
	cursor:pointer;
	color:#ffffff;
	font-size:16px;
	padding:9px 23px;
	text-decoration:none;
  margin-right: 10px;

}
.viewButton:hover {
	background:linear-gradient(to bottom, #0688fa 5%, #2dabf9 100%);
	background-color:#0688fa;
}
.view:active {
	position:relative;
	top:1px;
}
.delete{
	background-color:red;
	border-radius: 6px;
	cursor:pointer;
	color:#ffffff;
	font-size:16px;
	padding:9px 23px;
	text-decoration:none;
  margin-right: 10px;

}
.delete:hover {

	background-color:rgb(147, 25, 25);
}
.delete:active {
	position:relative;
	top:1px;
}

</style>