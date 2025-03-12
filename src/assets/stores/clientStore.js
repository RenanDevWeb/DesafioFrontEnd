import { defineStore } from "pinia";
import axios from "axios";

// Função auxiliar para garantir que as datas sejam no formato correto
function formatDate(date) {
  if (!date) return '';  // Retorna vazio se não houver data
  const d = new Date(date);
  return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0]; // Formato yyyy-mm-dd
}

export const useClientStore = defineStore("clientStore", {
  state: () => ({
    clients: [],
    loading: false,
    error: null,
    totalClients: 0,
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
      
      // Formatando as datas corretamente
      this.form.dataExpedicao = formatDate(this.form.dataExpedicao);
      this.form.dataNascimento = formatDate(this.form.dataNascimento);

      console.log(this.form); // Verificando os dados
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
        console.log(`Cliente com ID ${clienteId} deletado com sucesso.`);
      } catch (error) {
        this.error = "Erro ao deletar o cliente!";
      }
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
        const response = await axios.put(`https://extranet.fcc.org.br/webapi/testecandidato/v1/Cliente/Alterar/${clienteId}`,
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
   
  },
});