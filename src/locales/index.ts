/**
 * Locales - Sistema de mensagens centralizado
 * Padrão: 'geral.assunto.detalhe'
 */

const locales = {
  "buttons.cancel": "Cancelar",
  "buttons.confirm": "Confirmar",
  "buttons.save": "Salvar",
  "buttons.delete": "Deletar",
  "buttons.close": "Fechar",

  "validations.required": "Campo obrigatório",

  "messages.success.create-note": "Nota criada com sucesso!",
  "messages.success.update-note": "Nota atualizada com sucesso!",
  "messages.success.delete-note": "Nota deletada com sucesso!",
  "messages.success.duplicate-note": "Nota duplicada com sucesso!",

  "messages.failure.create-note": "Falha ao criar nota!",
  "messages.failure.update-note": "Falha ao atualizar nota!",
  "messages.failure.delete-note": "Falha ao deletar nota!",
  "messages.failure.duplicate-note": "Falha ao duplicar nota!",

  "messages.success.update-config": "Configurações atualizadas com sucesso!",

  "messages.failure.update-config": "Falha ao atualizar configurações!",

  "messages.failure.print": "Falha ao imprimir!",
  "messages.failure.not-found-thermal": "Impressora térmica não encontrada!",

  "modals.home-actions.title": "Opções",
  "modals.home-actions.action.view": "Visualizar",
  "modals.home-actions.action.print": "Imprimir",
  "modals.home-actions.action.print-list": "Imprimir lista",
  "modals.home-actions.action.duplicate": "Duplicar",
  "modals.home-actions.action.add-reminder": "Adicionar Lembrete",
  "modals.home-actions.action.delete": "Deletar",

  "modals.sidebar.title": "Menu",
  "modals.sidebar.option.config": "Configurações",
  "modals.sidebar.option.theme": "Temas",
  "modals.sidebar.option.reminder": "Lembretes",

  "modals.config.title": "Configurações",
  "modals.config.field.font-size": "Tamanho da fonte",

  "modals.theme.title": "Temas",
  "modals.theme.fields.theme": "Tema",
  "modals.theme.fields.theme-label": "Tema {index}",
  "modals.theme.fields.dark-mode": "Modo noturno",

  "modals.migration.title": "Migração",
  "modals.migration.message.error": "Erro ao migrar os dados:",
  "modals.migration.message.progress": "Fazendo a migração dos dados...",

  "modals.select.title": "Selecione",

  "pages.home-list.title": "Página Inicial",

  "pages.home-detail.title": "Detalhes",
} as const;

export type LocaleKeysProps = keyof typeof locales;

export default locales;
