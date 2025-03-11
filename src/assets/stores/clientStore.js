import { defineStore } from "pinia";
import axios from "axios";

export const useClientStore = defineStore("clientStore", {
  state: () => ({
    clients: [],
    loading: false,
    error: null,
    form: {
      clienteId: 0,
      cpf: '',
      nome: '',
      rg: '',
      dataExpedicao: '',
      orgaoExpedicao: '',
      uf: '',
      dataNascimento: '',
      sexo: '',
      estadoCivil: '',
      endereco: {
        enderecoId: 0,
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
    }
  }
}),

  actions: {
    async fetchClients() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Listar');
        this.clients = response.data;
        
      } catch (err) {
        this.error = "Erro ao buscar clientes!";
      } finally {
        this.loading = false;
      }
    },

    addClient(client) {
      this.clients.push(client);
    },

     fillFormclient(data){
       this.form = {...this.form,...data}
     },

     async submitFormClient(){
      const headers = {
       
      }
      try {
           const response = await axios.post('https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Adicionar',
            this.form ,
            {
            headers: {
              'Content-Type': 'application/json',
            }
          }
          ) ;
          console.log("Adicionado com sucesso",response.data);
      } catch (error) {
         console.log(error);
      }
     }

  },

  getters: {
    totalClients: (state) => state.clients.length,
  },
});