import { ModeToggle } from "@/components/mode-toggle"
import { CircuitStatus } from "@/components/widgets/CircuitStatus"
import Gauge from "@/components/widgets/Gauge"
import { HeatLoss } from "@/components/widgets/HeatLoss"
import Thermometer from "@/components/widgets/Thermometer"

const Home = () => {
    return (
        <>
            <div>
                <ModeToggle />
                Kernopy Web Dashboard Template
            </div>
            <div className="flex gap-3">
                <Gauge title="Gauge Kernopy" value={67} />
                <Thermometer title="Thermometer Kernopy" unit='°F' value={78} />
                <CircuitStatus isOpen={true} title="Circuit Status Kernopy" />
                <HeatLoss title="Heatloss value Kernopy" value={80} />
            </div>
        </>
    )
}

export default Home