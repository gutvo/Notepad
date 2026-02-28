type TextAlignProps = "left" | "center" | "right";

interface AddTextOptionsProps {
  bold?: boolean;
  align?: TextAlignProps;
  newLine?: number;
  widthPercent?: number;
}

interface ColumnTextOptionsProps {
  bold?: boolean;
  widthPercent?: number; // 0–100
  align?: "left" | "right";
}

interface AddRowOptionsProps {
  left?: ColumnTextOptionsProps;
  right?: ColumnTextOptionsProps;
  newLine?: number;
  gap?: number;
}

export default class PrinterCommandService {
  private buffer: string[] = [];

  constructor(private columns: number = 48) {}

  private readonly ESC = "\x1B";
  private readonly GS = "\x1D";

  private readonly alignMap: Record<TextAlignProps, string> = {
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

  private wrapText(text: string, maxChars: number) {
    const result: string[] = [];

    while (text.length > maxChars) {
      result.push(text.slice(0, maxChars));
      text = text.slice(maxChars);
    }

    if (text.length) result.push(text);

    return result;
  }

  addText(text: string, options?: AddTextOptionsProps) {
    const {
      bold = false,
      align = "left",
      newLine = 1,
      widthPercent = 100,
    } = options || {};

    // largura máxima baseada na porcentagem
    const maxChars = Math.floor(this.columns * (widthPercent / 100));

    // alinhamento
    this.buffer.push(this.ESC + "a" + this.alignMap[align]);

    // bold ON
    this.buffer.push(this.ESC + "E" + (bold ? "\x01" : "\x00"));

    // quebra automática
    const lines = this.wrapText(text, maxChars);

    lines.forEach((line) => {
      this.buffer.push(line);
      this.buffer.push("\n");
    });

    // bold OFF
    if (bold) {
      this.buffer.push(this.ESC + "E\x00");
    }

    // quebra extra opcional
    if (newLine > 0) {
      this.buffer.push("\n".repeat(newLine - 1));
    }

    return this;
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
  addRow(left: string, right: string, options?: AddRowOptionsProps) {
    const totalColumns = this.columns;

    const {
      left: leftOpts = {},
      right: rightOpts = {},
      newLine = 0,
      gap = 2, // valor padrão de gap em colunas
    } = options || {};

    const leftWidthPercent = leftOpts.widthPercent ?? 70;
    const leftCols = Math.floor(totalColumns * (leftWidthPercent / 100));

    // rightCols deve considerar o gap
    const rightCols = totalColumns - leftCols - gap;

    // função segura para quebrar texto
    const wrap = (text: string, max: number) => {
      const result: string[] = [];
      while (text.length > max) {
        result.push(text.slice(0, max));
        text = text.slice(max);
      }
      if (text.length) result.push(text);
      return result;
    };

    const leftLines = wrap(left, leftCols);
    const rightLines = wrap(right, rightCols);

    const maxLines = Math.max(leftLines.length, rightLines.length);

    for (let i = 0; i < maxLines; i++) {
      let leftPart = leftLines[i] || "";
      let rightPart = rightLines[i] || "";

      // alinhamento direito dentro da coluna
      if (rightOpts.align === "right") {
        rightPart =
          " ".repeat(Math.max(0, rightCols - rightPart.length)) + rightPart;
      }

      // aplica bold left
      if (leftOpts.bold) this.buffer.push(this.ESC + "E\x01");
      this.buffer.push(leftPart);
      if (leftOpts.bold) this.buffer.push(this.ESC + "E\x00");

      // preenche o gap
      this.buffer.push(" ".repeat(Math.max(0, gap)));

      // aplica bold right
      if (rightOpts.bold) this.buffer.push(this.ESC + "E\x01");
      this.buffer.push(rightPart);
      if (rightOpts.bold) this.buffer.push(this.ESC + "E\x00");

      this.buffer.push("\n");
    }

    if (newLine > 0) {
      this.buffer.push("\n".repeat(newLine));
    }

    return this;
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
