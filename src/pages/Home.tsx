import { useJwt } from "@/store";
import { useSocket } from "@/hooks/useSocket";
import Gauge from "@/components/widgets/Gauge";
import Thermometer from "@/components/widgets/Thermometer";

const Home = () => {
  const jwt = useJwt();
  const defaultDeviceId = "eff8f537-3901-4d6b-90fa-643933a3c51c";

  const socketData = useSocket(jwt, defaultDeviceId);
  const params = socketData?.params || {};

  return (
    <>
      <pre>
        {socketData ? JSON.stringify(socketData, null, 2) : "Waiting for data..."}
      </pre>

      <div className="flex gap-3">
        <Gauge
          title="Pdlite Active Energy"
          value={Number(params.Active_Energy_Import_kWh ?? 0)}
        />
        <Thermometer
          title="Pdlite Current"
          value={Number(params.RealTime_Current ?? 0)}
          unit="F"
        />
      </div>
    </>
  );
};

export default Home;
