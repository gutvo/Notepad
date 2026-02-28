type TextAlign = "left" | "center" | "right";

interface AddTextOptions {
  bold?: boolean;
  align?: TextAlign;
  newLine?: number;
}

export default class PrinterCommandService {
  private buffer: string[] = [];

  private readonly ESC = "\x1B";
  private readonly GS = "\x1D";

  private readonly alignMap: Record<TextAlign, string> = {
    left: "\x00",
    center: "\x01",
    right: "\x02",
  };

  init() {
    this.buffer.push(this.ESC + "@");
  }

  addText(text: string, options?: AddTextOptions) {
    const { bold = false, align = "left", newLine = 1 } = options || {};

    const alignMap = {
      left: "\x00",
      center: "\x01",
      right: "\x02",
    };

    // alinhamento
    this.buffer.push(this.ESC + "a" + alignMap[align]);

    // bold ON/OFF
    this.buffer.push(this.ESC + "E" + (bold ? "\x01" : "\x00"));

    // texto
    this.buffer.push(text);

    // quebra de linha (agora sempre controlada)
    if (newLine > 0) {
      this.buffer.push("\n".repeat(newLine));
    }
  }

  newLine(lines = 1) {
    this.buffer.push("\n".repeat(lines));
    return this;
  }

  cut() {
    this.buffer.push(this.GS + "V\x00");
  }

  build() {
    return this.buffer.join("");
  }

  clear() {
    this.buffer = [];
  }
}
