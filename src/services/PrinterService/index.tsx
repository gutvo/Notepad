import BluetoothConnectionService from "./BluetoothConnectionService";
import PrinterCommandService from "./PrinterCommandService";

type ConnectionTypeProps = "BLUETOOTH";

export const PAPER_SIZES = {
  "58mm": 32,
  "65mm": 36,
  "70mm": 40,
  "76mm": 44,
  "80mm": 48,
} as const;

type PaperSizeProps = keyof typeof PAPER_SIZES;

interface PrinterServiceConfig {
  type?: ConnectionTypeProps;
  paperSize?: PaperSizeProps;
  customColumns?: number;
}

export type PrintBuilderProps = PrinterCommandService;

export default class PrinterService extends PrinterCommandService {
  private connection: BluetoothConnectionService;

  constructor(config: PrinterServiceConfig = {}) {
    const type = config.type ?? "BLUETOOTH";
    const paperSize = config.paperSize ?? "80mm";

    const columns =
      config.customColumns ?? PAPER_SIZES[paperSize] ?? PAPER_SIZES["80mm"];

    super(columns);

    this.connection = this.createConnection(type);
  }

  private createConnection(type: ConnectionTypeProps) {
    switch (type) {
      case "BLUETOOTH":
        return new BluetoothConnectionService();

      default:
        throw new Error("Tipo de conexão não suportado");
    }
  }

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

  async print(callback: (printer: PrintBuilderProps) => void | Promise<void>) {
    const isConnected = await this.connection.isConnected();

    if (!isConnected) {
      throw new Error("Impressora não está conectada");
    }

    try {
      this.init();

      await callback(this);

      const content = this.build();
      await this.connection.write(content);
    } finally {
      this.clear();
    }
  }
}
