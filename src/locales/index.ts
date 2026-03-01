/**
 * Locales - Sistema de mensagens centralizado
 * Padrão: 'geral.assunto.detalhe'
 */

const locales = {
  "buttons.cancel": "Cancelar",
  "buttons.confirm": "Confirmar",
  "buttons.save": "Salvar",
  "buttons.create": "Criar",
  "buttons.delete": "Deletar",
  "buttons.close": "Fechar",

  "validations.required": "Campo obrigatório",

  "messages.success.create-note": "Nota criada com sucesso!",
  "messages.failure.create-note": "Falha ao criar nota!",

  "messages.success.update-note": "Nota atualizada com sucesso!",
  "messages.failure.update-note": "Falha ao atualizar nota!",

  "messages.success.delete-note": "Nota deletada com sucesso!",
  "messages.failure.delete-note": "Falha ao deletar nota!",

  "messages.success.duplicate-note": "Nota duplicada com sucesso!",
  "messages.failure.duplicate-note": "Falha ao duplicar nota!",

  "messages.success.update-config": "Configurações atualizadas com sucesso!",
  "messages.failure.update-config": "Falha ao atualizar configurações!",

  "messages.failure.print": "Falha ao imprimir!",
  "messages.failure.not-found-thermal": "Impressora térmica não encontrada!",

  "messages.success.update-theme": "Tema atualizado com sucesso!",
  "messages.failure.update-theme": "Falha ao atualizar o tema!",

  "messages.success.create-reminder": "Lembrete criado com sucesso!",
  "messages.failure.create-reminder": "Falha ao criar o lembrete!",

  "messages.success.update-reminder": "Lembrete atualizado com sucesso!",
  "messages.failure.update-reminder": "Falha ao atualizar o lembrete!",

  "messages.success.delete-reminder": "Lembrete deletado com sucesso!",
  "messages.failure.delete-reminder": "Falha ao deletar o lembrete!",

  "messages.failure.not-found-note": "Nota não encontrada!",

  "modals.home-actions.title": "Opções",
  "modals.home-actions.action.view": "Visualizar",
  "modals.home-actions.action.print": "Imprimir",
  "modals.home-actions.action.print-list": "Imprimir lista",
  "modals.home-actions.action.duplicate": "Duplicar",
  "modals.home-actions.action.add-reminder": "Adicionar Lembrete",
  "modals.home-actions.action.delete": "Deletar",

  "modals.reminder-actions.title": "Opções",
  "modals.reminder-actions.action.update": "Atualizar",
  "modals.reminder-actions.action.delete": "Deletar",

  "modals.sidebar.title": "Menu",
  "modals.sidebar.option.config": "Configurações",
  "modals.sidebar.option.theme": "Temas",
  "modals.sidebar.option.reminder": "Lembretes",

  "modals.config.title": "Configurações",
  "modals.config.fields.font-size": "Tamanho da fonte",
  "modals.config.fields.days-before-reminder":
    "Notificar dias antes do lembrete",
  "modals.config.fields.days-before-reminder-value": "{value} dias",
  "modals.config.fields.printer": "Impressora térmica",
  "modals.config.fields.paper-size": "Tamanho do papel",

  "modals.theme.title": "Temas",
  "modals.theme.fields.theme": "Tema",
  "modals.theme.fields.theme-value": "Tema {value}",
  "modals.theme.fields.dark-mode": "Modo noturno",

  "modals.migration.title": "Migração",
  "modals.migration.message.error": "Erro ao migrar os dados:",
  "modals.migration.message.progress": "Fazendo a migração dos dados...",

  "modals.reminders.title.update": "Atualizar lembrete",
  "modals.reminders.title.create": "Criar lembrete",
  "modals.reminders.fields-name": "Título da notificação",
  "modals.reminders.fields-name.placeholder": "Adicione um Título",
  "modals.reminders.fields-notify-at": "Data da notificação",
  "modals.reminders.fields-notify-at.placeholder":
    "Adicione uma data da notificação",

  "modals.select.title": "Selecionar",
  "modals.calendar.title": "Calendário",

  "pages.home-list.title": "Página Inicial",

  "pages.home-detail.title": "Detalhes",
} as const;

export type LocaleKeysProps = keyof typeof locales;

export default locales;
