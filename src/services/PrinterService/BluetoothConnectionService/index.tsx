import { PermissionsAndroid, Platform } from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";

export default class BluetoothConnectionService {
  private device: BluetoothDevice | null = null;
  private initialized = false;

  // 🔒 Método central que garante que tudo está pronto
  private async ensureReady() {
    if (this.initialized) return;

    if (Platform.OS === "android") {
      if (Platform.Version >= 31) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        if (result["android.permission.BLUETOOTH_CONNECT"] !== "granted") {
          throw new Error("Permissão BLUETOOTH_CONNECT negada");
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error("Permissão de localização negada");
        }
      }
    }

    const enabled = await RNBluetoothClassic.isBluetoothEnabled();
    if (!enabled) {
      await RNBluetoothClassic.requestBluetoothEnabled();
    }

    this.initialized = true;
  }

  async getBondedDevices() {
    await this.ensureReady();
    return RNBluetoothClassic.getBondedDevices();
  }

  async getConnectedDevices() {
    await this.ensureReady();
    return RNBluetoothClassic.getConnectedDevices();
  }

  async isConnected() {
    if (!this.device) return false;
    return this.device.isConnected();
  }

  async connect(identifier: string) {
    await this.ensureReady();
    this.device = await RNBluetoothClassic.connectToDevice(identifier);
  }

  async write(data: string) {
    if (!this.device) throw new Error("Não conectado");
    await this.device.write(data);
  }

  async disconnect() {
    if (this.device) {
      await this.device.disconnect();
      this.device = null;
    }
  }
}
