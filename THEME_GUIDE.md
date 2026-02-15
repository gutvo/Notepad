# 🎨 Guia do Sistema de Temas

## Estrutura

### Arquivo: `defaultColors.ts`
Define as cores padrão para estados de status da aplicação.

**Cores Definidas:**
- `info.main` - Informações gerais
- `success.main` - Operações bem-sucedidas
- `warning.main` - Avisos e alertas
- `error.main` - Erros e validações bloqueantes
- `grey[50-900]` - Escala de cinza
- `common.black` - Preto puro

**Uso Recomendado:**
```tsx
// Toast de sucesso
color: theme.palette.success.main

// Mensagens de erro em inputs
color: theme.palette.error.main

// Bordas padrão
borderColor: theme.palette.grey[300]
```

---

### Arquivo: `backgroundTheme.ts`
Define as cores de fundo e texto para modo claro e escuro.

**Cores Definidas (Light & Dark):**
- `background.body` - Fundo principal
- `background.textPrimary` - Texto principal
- `background.textSecondary` - Texto secundário
- `background.border` - Bordas e separadores
- `background.button.pressed` - Estado pressionado de botões

**Diferenças:**
- **Light:** Fundo claro com texto escuro
- **Dark:** Fundo escuro com texto claro

**Uso Recomendado:**
```tsx
// Fundo de uma tela
backgroundColor: theme.palette.background.body

// Texto principal
color: theme.palette.background.textPrimary

// Borda de um input
borderColor: theme.palette.background.border

// Efeito ao tocar
style={{
  ...pressed && { 
    backgroundColor: theme.palette.background.button.pressed 
  }
}}
```

---

### Arquivo: `themes.ts`
Define 8 temas de cores primárias diferentes.

**Temas Disponíveis (8 total):**
1. Blue
2. Green
3. Indigo
4. Orange
5. Pink
6. Purple
7. Red
8. Teal

**Propriedades por Tema:**
- `light` - Variação clara
- `main` - Cor principal (mais usada)
- `dark` - Variação escura
- `contrast` - Cor contrastante para texto sobre o tema

**Uso Recomendado:**
```tsx
// Botão primário
backgroundColor: theme.palette.primary.main
color: theme.palette.primary.contrast

// Animações (raro)
color: theme.palette.primary.light
```

---

### Arquivo: `mergeTheme.ts`
Combina todos os temas em um objeto único.

**Estrutura Final:**
```typescript
{
  // Cores de status
  info: { main },
  success: { main },
  warning: { main },
  error: { main },
  
  // Escala de cinza
  grey: { 50, 100, ..., 900 },
  
  // Cor preta
  common: { black },
  
  // Fundo (claro/escuro)
  background: {
    body,
    textPrimary,
    textSecondary,
    border,
    button: { pressed }
  },
  
  // Tema primário selecionado
  primary: {
    light,
    main,
    dark,
    contrast
  },
  
  // Flag de modo escuro
  isDarkMode: boolean
}
```

---

## 📊 Seleção de Cores em Componentes

### Componentes Base

#### TextField / SelectInput
```tsx
const theme = useTheme();

// Borda
borderColor: focused 
  ? theme.palette.primary.main 
  : theme.palette.background.border

// Fundo
backgroundColor: theme.palette.background.body

// Erro
color: error ? theme.palette.error.main : theme.palette.background.textPrimary
```

#### Button / FloatButton
```tsx
const theme = useTheme();

// Fundo
backgroundColor: theme.palette.primary.main

// Texto
color: theme.palette.primary.contrast
```

#### Typography
```tsx
const theme = useTheme();

// Cor padrão
color: theme.palette.background.textPrimary
```

#### Toast
```tsx
const theme = useTheme();

// Cores por tipo
success: theme.palette.success.main
error: theme.palette.error.main
warning: theme.palette.warning.main
info: theme.palette.info.main
```

#### Icon
```tsx
const theme = useTheme();

// Cor padrão
color: theme.palette.background.textPrimary

// Customizável
color: customColor || theme.palette.background.textPrimary
```

---

## 🎯 Boas Práticas

### ✅ Faça
```tsx
// Use sempre as cores do tema
const theme = useTheme();
const styles = {
  backgroundColor: theme.palette.background.body,
  color: theme.palette.background.textPrimary,
  borderColor: theme.palette.background.border,
};

// Para estados:
success: theme.palette.success.main
error: theme.palette.error.main

// Para primário:
primary: theme.palette.primary.main
primaryContrast: theme.palette.primary.contrast
```

### ❌ Evite
```tsx
// Cores hardcoded
const styles = {
  backgroundColor: "#f9fafb",     // ❌ Use theme.palette.background.body
  color: "#1f2937",                // ❌ Use theme.palette.background.textPrimary
  borderColor: "#d1d5db",          // ❌ Use theme.palette.background.border
};

// Cores não documentadas
const styles = {
  backgroundColor: theme.palette.primary.dark,  // ❌ Não é usado em nenhum lugar
  color: theme.palette.primary.light,           // ❌ Uso muito raro
};
```

---

## 🔧 Adicionando Novas Cores

### Se você precisa de uma cor de STATUS:
Adicione em `defaultColors.ts`:
```typescript
const defaultColors = {
  // ... colors
  customStatus: {
    main: "#ABC123", // Defina sempre pelo menos 'main'
  },
};
```

### Se você precisa de uma cor TEMÁTICA (usuário escolhe):
Adicione em `themes.ts`:
```typescript
const themeCustom = {
  light: "#ABC123",
  main: "#ABC123",
  dark: "#ABC123",
  contrast: "#FFFFFF", // Para texto sobre a cor
};

const themes = [
  // ... existing themes
  themeCustom,
];
```

### Se você precisa de cores de BACKGROUND:
Adicione em `backgroundTheme.ts`:
```typescript
const lightBackground = {
  // ... existing
  customBackground: defaultColors.grey[100],
};

const darkBackground = {
  // ... existing
  customBackground: defaultColors.grey[800],
};
```

---

## 📱 Testando Temas

### Mudar o Tema
1. Abra o menu de Temas (ícone de engrenagem)
2. Selecione um tema diferente
3. Toggle "Modo noturno"

### Verificar Contraste
Ao adicionar cores, verifique o contraste usando:
- WebAIM (webaim.org/resources/contrastchecker/)
- Padrão: WCAG AA (4.5:1 para texto)

---

## 📋 Variáveis Removidas (v2.0)

As seguintes variáveis foram removidas por não estarem em uso:

- ❌ `defaultColors.info.{light, dark, contrast}`
- ❌ `defaultColors.success.{light, dark, contrast}`
- ❌ `defaultColors.warning.{light, dark, contrast}`
- ❌ `defaultColors.error.{light, dark, contrast}`
- ❌ `defaultColors.common.white`
- ❌ `background.divider` (light & dark)
- ❌ Muitos tones de grey não utilizados

Se precisar deles novamente, restaure a partir do Git.

---

## 🚀 Próximos Passos

- [ ] Adicionar testes de contraste automáticos
- [ ] Criar Storybook para showcase de componentes
- [ ] Implementar temas customizados pelo usuário
- [ ] Adicionar animações de transição entre temas
- [ ] Documentar tokens de design completos
