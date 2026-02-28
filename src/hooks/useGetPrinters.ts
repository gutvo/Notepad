import PrinterService from "@Services/PrinterService";
import { useEffect, useState } from "react";
import { BluetoothDevice } from "react-native-bluetooth-classic";

export type PrinterProps = BluetoothDevice;

export default function useGetPrinters() {
  const [printers, setPrinters] = useState<BluetoothDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        setLoading(true);
        setError(null);

        const service = new PrinterService();
        const devices = await service.getAvailablePrinters();

        setPrinters(devices);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrinters();
  }, []);

  return { printers, loading, error };
}
