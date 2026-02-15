/**
 * Locales - Sistema de mensagens centralizado
 * Padrão: 'pagina.componente.assunto'
 */

const locales = {
  buttons: {
    cancel: "Cancelar",
    confirm: "Confirmar",
    save: "Salvar",
    delete: "Deletar",
    close: "Fechar",
  },
  validations: {
    required: "Campo obrigatório",
  },
  selectModal: {
    title: "Selecione",
  },
  home: {
    list: {
      drawer: {
        title: "Menu",
        config: "Configuração",
        theme: "Temas",
      },
      actionModal: {
        title: "Opções",
        actions: {
          view: "Visualizar",
          duplicate: "Duplicar",
          delete: "Deletar",
        },
        success: {
          delete: "Nota deletada com sucesso!",
          duplicate: "Nota duplicada com sucesso!",
        },
      },
    },
    detail: {
      title: "Detalhes",
      note: {
        error: {
          delete: "Erro ao deletar nota!",
          update: "Erro ao atualizar nota!",
          create: "Erro ao criar nota!",
        },
        success: {
          delete: "Nota deletada com sucesso!",
          update: "Nota atualizada com sucesso!",
          create: "Nota criada com sucesso!",
        },
      },
      header: {
        error: {
          save: "Erro ao salvar nota antes de sair",
        },
      },
    },
  },
  config: {
    modal: {
      title: "Configurações",
      section: {
        fontSize: {
          label: "Tamanho da fonte",
        },
      },
      success: "Configuração atualizadas com sucesso!",
    },
  },
  theme: {
    modal: {
      title: "Temas",
      section: {
        theme: {
          label: "Tema",
          optionLabel: "Tema {index}",
        },
        darkMode: {
          label: "Modo noturno",
        },
      },
      success: "Configuração atualizadas com sucesso!",
    },
  },
  migration: {
    modal: {
      error: {
        title: "Erro ao migrar os dados:",
      },
      progress: "Fazendo a migração dos dados...",
    },
  },
} as const;

export default locales;
