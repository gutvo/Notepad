import convertPercentage, { PercentageProps } from "@Utils/convertPercentage";

const FONT_SIZE = {
  NORMAL: 0x00, // normal
  "2X_HEIGHT": 0x01, // 2x altura
  "2X_WIDTH": 0x10, // 2x largura
  "2X_HEIGHT_WIDTH": 0x11, // 2x largura e altura
} as const;

type TextAlignProps = "LEFT" | "CENTER" | "RIGHT";
type FontSizeProps = keyof typeof FONT_SIZE;

interface AddTextOptionsProps {
  bold?: boolean;
  align?: TextAlignProps;
  newLine?: number;
  widthPercent?: PercentageProps;
  font?: 0 | 1;
  fontSize?: FontSizeProps;
}

interface ColumnTextOptionsProps {
  bold?: boolean;
  widthPercent?: PercentageProps;
  align?: Omit<TextAlignProps, "CENTER">;
}

interface AddRowOptionsProps {
  left?: ColumnTextOptionsProps;
  right?: ColumnTextOptionsProps;
  newLine?: number;
  gap?: number;
}

export default class PrinterCommandService {
  private buffer: string[] = [];
  private readonly ESC = "\x1B";
  private readonly GS = "\x1D";

  private readonly alignMap: Record<TextAlignProps, string> = {
    LEFT: "\x00",
    CENTER: "\x01",
    RIGHT: "\x02",
  };

  constructor(private columns: number = 48) {}

  private getWidthMultiplier(fontSize: FontSizeProps) {
    const value = FONT_SIZE[fontSize];

    // bit 4 = largura
    const widthBits = (value >> 4) & 0x0f;

    return widthBits + 1;
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

  private addToBuffer(value: string) {
    this.buffer.push(value);
  }

  private setBold(enabled: boolean) {
    this.addToBuffer(this.ESC + "E" + (enabled ? "\x01" : "\x00"));
  }

  private setAlign(align: TextAlignProps) {
    this.addToBuffer(this.ESC + "a" + this.alignMap[align]);
  }

  private setFont(font: 0 | 1) {
    this.addToBuffer(this.ESC + "M" + String.fromCharCode(font));
  }

  private setFontSize(size: keyof typeof FONT_SIZE) {
    const sizeByte = FONT_SIZE[size] ?? 0;
    this.addToBuffer(this.GS + "!" + String.fromCharCode(sizeByte));
  }

  private percentToColumns(percent: PercentageProps) {
    return Math.floor(this.columns * (convertPercentage(percent) / 100));
  }

  protected init() {
    this.addToBuffer(this.ESC + "@");
  }

  addNewLine(lines: number = 1) {
    this.addToBuffer("\n".repeat(lines - 1));
  }

  addText(text: string, options: AddTextOptionsProps = {}) {
    const {
      bold = false,
      align = "LEFT",
      newLine = 1,
      widthPercent = "100%",
      font = 0,
      fontSize = "NORMAL",
    } = options;

    const widthMultiplier = this.getWidthMultiplier(fontSize);

    const baseColumns = this.percentToColumns(widthPercent);

    const maxChars = Math.floor(baseColumns / widthMultiplier);

    this.setAlign(align);
    this.setFont(font);
    this.setFontSize(fontSize);
    this.setBold(bold);

    const lines = this.wrapText(text, maxChars);
    lines.forEach((line) => {
      this.addToBuffer(line + "\n");
    });

    if (newLine > 0) this.addNewLine(newLine);

    this.setBold(false);
    this.setFontSize("NORMAL");
    this.setAlign("LEFT");
    this.setFont(0);

    return this;
  }

  addRow(left: string, right: string, options: AddRowOptionsProps = {}) {
    const totalColumns = this.columns;
    const {
      left: leftOpts = {},
      right: rightOpts = {},
      newLine = 0,
      gap = 2,
    } = options;

    const leftWidthPercent = leftOpts.widthPercent ?? "70%";
    const leftCols = Math.floor(
      totalColumns * (convertPercentage(leftWidthPercent) / 100),
    );

    if (leftCols + gap > totalColumns) {
      throw new Error("Layout inválido: left + gap excede colunas disponíveis");
    }

    const rightCols = totalColumns - leftCols - gap;

    if (rightCols <= 0) {
      throw new Error("Coluna direita ficou sem espaço disponível");
    }

    const leftLines = this.wrapText(left, leftCols);
    const rightLines = this.wrapText(right, rightCols);

    const maxLines = Math.max(leftLines.length, rightLines.length);

    for (let i = 0; i < maxLines; i++) {
      let leftPart = leftLines[i] || "";
      let rightPart = rightLines[i] || "";

      leftPart = leftPart + " ".repeat(Math.max(0, leftCols - leftPart.length));
      rightPart =
        " ".repeat(Math.max(0, rightCols - rightPart.length)) + rightPart;

      if (leftOpts.bold) this.addToBuffer(this.ESC + "E\x01");
      this.addToBuffer(leftPart);
      if (leftOpts.bold) this.addToBuffer(this.ESC + "E\x00");

      this.addToBuffer(" ".repeat(Math.max(0, gap)));

      if (rightOpts.bold) this.addToBuffer(this.ESC + "E\x01");
      this.addToBuffer(rightPart);
      if (rightOpts.bold) this.addToBuffer(this.ESC + "E\x00");

      this.addToBuffer("\n");
    }

    if (newLine > 0) this.addToBuffer("\n".repeat(newLine));

    return this;
  }

  cut() {
    this.addToBuffer(this.GS + "V\x00");
  }

  protected build() {
    return this.buffer.join("");
  }

  protected clear() {
    this.buffer = [];
  }
}
