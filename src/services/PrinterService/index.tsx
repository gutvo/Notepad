import BluetoothConnectionService from "./BluetoothConnectionService";
import PrinterCommandService from "./PrinterCommandService";

type ConnectionTypeProps = "bluetooth";

const PAPER_SIZES = {
  "58mm": 32,
  "58mm-compact": 30,
  "58mm-small": 24,
  "80mm": 48,
  "80mm-compact": 42,
  "80mm-wide": 64,
} as const;

type PaperSizeProps = keyof typeof PAPER_SIZES;

interface PrinterServiceConfig {
  type?: ConnectionTypeProps;
  paperSize?: PaperSizeProps;
  customColumns?: number;
}

export type PrintBuilderProps = Omit<
  PrinterService,
  "connect" | "disconnect" | "getAvailablePrinters" | "isConnected" | "print"
>;

export default class PrinterService extends PrinterCommandService {
  private connection: BluetoothConnectionService;

  constructor(config: PrinterServiceConfig = {}) {
    const type = config.type ?? "bluetooth";
    const paperSize = config.paperSize ?? "80mm";

    const columns =
      config.customColumns ?? PAPER_SIZES[paperSize] ?? PAPER_SIZES["80mm"];

    super(columns); // 🔥 herança correta

    this.connection = this.createConnection(type);
  }

  private createConnection(type: ConnectionTypeProps) {
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
  // 🚀 MÉTODO PRINT
  // =========================

  async print(callback: (printer: PrintBuilderProps) => void | Promise<void>) {
    const isConnected = await this.connection.isConnected();

    if (!isConnected) {
      throw new Error("Impressora não está conectada");
    }

    try {
      this.init(); // vem do PrinterCommandService

      await callback(this);

      const content = this.build(); // vem do PrinterCommandService
      await this.connection.write(content);
    } finally {
      this.clear(); // vem do PrinterCommandService
    }
  }
}
