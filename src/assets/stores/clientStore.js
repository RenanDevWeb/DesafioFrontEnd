import { defineStore } from "pinia";
import axios from "axios";

function formatDate(date) {
  if (!date) return ''; 
  const d = new Date(date);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0]; // Formato yyyy-mm-dd
}

export const useClientStore = defineStore("clientStore", {
  state: () => ({
    clients: [],
    loading: false,
    error: null,
    totalClients: 0,
    searchQuery: "",
    form: {
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
        enderecoId: 2777,
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
      },
    },
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

    fillFormclient(data) {
      this.form = { ...this.form, ...data };
      
      
      this.form.dataExpedicao = formatDate(this.form.dataExpedicao);
      this.form.dataNascimento = formatDate(this.form.dataNascimento);
    },

    async fetchClientById(clienteId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/ListarPorId/${clienteId}`);
        this.fillFormclient(response.data);
      } catch (err) {
        this.error = "Erro ao buscar cliente!";
      } finally {
        this.loading = false;
      }
    },

    async submitFormClient() {
      try {
        console.log(this.form);
        const response = await axios.post(
          'https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Adicionar',
          this.form, 
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Adicionado com sucesso', response.data);
      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
      }
    },

    async deleteClient(clienteId) {
      try {
        await axios.delete(`https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Excluir/${clienteId}`);
        this.clients = this.clients.filter(client => client.clienteId !== clienteId);
        
      } catch (error) {
        this.error = "Erro ao deletar o cliente!";
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },
      
    async updateClient(clienteId, updatedData) {
      if (!clienteId) {
        console.error("Erro: clienteId não está definido.");
        return;
      }

      this.loading = true;
      this.error = null;
      console.log(`https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Alterar/${clienteId}`);
      try {
        const response = await axios.put(`https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Alterar`,
          updatedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Cliente atualizado na store:", response.data);

        const index = this.clients.findIndex((client) => client.clienteId === clienteId);
        if (index !== -1) {
          this.clients[index] = { ...this.clients[index], ...updatedData };
        }
      } catch (error) {
        this.error = "Erro ao atualizar cliente!";
        console.error("Erro ao atualizar:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  

  getters: {

    filteredClients: (state) => {

  
     
      if (!state.searchQuery) {

        return state.clients; 
      }
  
      const searchTerm = state.searchQuery.trim().toLowerCase();  
    
  
      return state.clients.filter((client) => {
        if (!client) {

          return false; 
        }
  
 
        const clientName = client.nome
          ? client.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          : "";
  
        const nameMatch = clientName.includes(searchTerm);
        
        const clientCPF = client.cpf ? client.cpf.replace(/\D/g, "") : "";
        const cpfMatch = clientCPF.includes(searchTerm.replace(/\D/g, ""));  
        

        return nameMatch || cpfMatch; 
      });
    }
  }
});