import BluetoothConnectionService from "./BluetoothConnectionService";
import PrinterCommandService from "./PrinterCommandService";

type ConnectionType = "bluetooth";

interface PrinterServiceConfig {
  type?: ConnectionType;
}

export interface PrintBuilderProps {
  text(
    text: string,
    options?: {
      bold?: boolean;
      align?: "left" | "center" | "right";
      newLine?: number;
    },
  ): this;

  cut(): this;
  newLine(lines?: number): this;
}

export default class PrinterService implements PrintBuilderProps {
  private connection: BluetoothConnectionService;
  private commandService: PrinterCommandService;

  constructor(config: PrinterServiceConfig = {}) {
    const type = config.type ?? "bluetooth";

    this.connection = this.createConnection(type);
    this.commandService = new PrinterCommandService();
  }

  private createConnection(type: ConnectionType) {
    switch (type) {
      case "bluetooth":
        return new BluetoothConnectionService();

      default:
        throw new Error("Tipo de conexão não suportado");
    }
  }

  // =========================
  // 🔵 CONEXÃO
  // =========================

  async getAvailablePrinters() {
    return this.connection.getBondedDevices();
  }

  async connect(identifier: string) {
    await this.connection.connect(identifier);
  }

  async disconnect() {
    await this.connection.disconnect();
  }

  async isConnected() {
    return this.connection.isConnected();
  }

  // =========================
  // 🖨️ COMANDOS
  // =========================

  text(
    text: string,
    options?: {
      bold?: boolean;
      align?: "left" | "center" | "right";
      newLine?: number;
    },
  ) {
    this.commandService.addText(text, options);
    return this;
  }

  cut() {
    this.commandService.cut();
    return this;
  }

  newLine(lines = 1) {
    this.commandService.newLine(lines);
    return this;
  }

  // =========================
  // 🚀 NOVO MÉTODO PRINT
  // =========================

  async print(callback: (printer: PrintBuilderProps) => void | Promise<void>) {
    const isConnected = await this.connection.isConnected();

    if (!isConnected) {
      throw new Error("Impressora não está conectada");
    }

    try {
      this.commandService.init();

      await callback(this);

      const content = this.commandService.build();
      await this.connection.write(content);
    } finally {
      this.commandService.clear();
    }
  }
}
