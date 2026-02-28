type TextAlign = "left" | "center" | "right";

interface AddTextOptions {
  bold?: boolean;
  align?: TextAlign;
  newLine?: number;
}

export default class PrinterCommandService {
  private buffer: string[] = [];

  // 48 = padrão 80mm | 32 = 58mm
  constructor(private columns: number = 48) {}

  private readonly ESC = "\x1B";
  private readonly GS = "\x1D";

  private readonly alignMap: Record<TextAlign, string> = {
    left: "\x00",
    center: "\x01",
    right: "\x02",
  };

  // =========================
  // 🧾 CONTROLE BÁSICO
  // =========================

  protected init() {
    this.buffer.push(this.ESC + "@");
  }

  addText(text: string, options?: AddTextOptions) {
    const { bold = false, align = "left", newLine = 1 } = options || {};

    // alinhamento
    this.buffer.push(this.ESC + "a" + this.alignMap[align]);

    // bold ON
    this.buffer.push(this.ESC + "E" + (bold ? "\x01" : "\x00"));

    // texto
    this.buffer.push(text);

    // bold OFF (evita vazar para próxima linha)
    if (bold) {
      this.buffer.push(this.ESC + "E\x00");
    }

    // quebra de linha
    if (newLine > 0) {
      this.buffer.push("\n".repeat(newLine));
    }
  }

  addNewLine(lines = 1) {
    if (lines > 0) {
      this.buffer.push("\n".repeat(lines));
    }
  }

  // =========================
  // 🧾 LINHAS FORMATADAS
  // =========================

  // Linha com esquerda + direita
  addRow(left: string, right: string) {
    if (left.length + right.length > this.columns) {
      right = right.slice(0, this.columns - left.length);
    }

    const spaces = this.columns - (left.length + right.length);
    const line = left + " ".repeat(spaces) + right;

    this.buffer.push(this.ESC + "a" + this.alignMap.left);
    this.buffer.push(line);
    this.buffer.push("\n");
  }

  // Linha com 3 colunas (ex: qtd | descrição | valor)
  addRow3(col1: string, col2: string, col3: string) {
    const col1Width = 6;
    const col3Width = 10;
    const col2Width = this.columns - col1Width - col3Width;

    const format = (text: string, width: number, align: "left" | "right") => {
      if (text.length > width) {
        return text.slice(0, width);
      }

      return align === "right"
        ? " ".repeat(width - text.length) + text
        : text + " ".repeat(width - text.length);
    };

    const line =
      format(col1, col1Width, "left") +
      format(col2, col2Width, "left") +
      format(col3, col3Width, "right");

    this.buffer.push(this.ESC + "a" + this.alignMap.left);
    this.buffer.push(line);
    this.buffer.push("\n");
  }

  // Linha divisória
  addDivider(char: string = "-") {
    this.buffer.push(char.repeat(this.columns));
    this.buffer.push("\n");
  }

  // =========================
  // ✂️ CORTE
  // =========================

  cut() {
    this.buffer.push(this.GS + "V\x00");
  }

  // =========================
  // 🔧 BUILD / CLEAR
  // =========================

  protected build() {
    return this.buffer.join("");
  }

  protected clear() {
    this.buffer = [];
  }
}
