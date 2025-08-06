import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HeatLossIndicatorProps {
    value: number;
    title: string;
}

export const HeatLoss: React.FC<HeatLossIndicatorProps> = ({ value, title }) => {
    const getColor = (value: number) => {
        if (value <= 30) return '#0E6D1D'; // green
        if (value <= 60) return '#CC9600'; // yellow
        return '#942323'; // red
    };

    const getStatus = (value: number) => {
        if (value <= 30) return { label: 'Normal Range', bg: 'bg-green-700' };
        if (value <= 60) return { label: 'High Range', bg: 'bg-yellow-600' };
        return { label: 'Critical Range', bg: 'bg-red-700' };
    };

    const { label, bg } = getStatus(value);
    const heatColor = getColor(value);

    const HeatArrow = ({ delay = 0 }: { delay?: number }) => (
        <div
            className="animate-pulse"
            style={{
                animationDelay: `${delay}ms`,
                animationDuration: '2s',
                color: heatColor
            }}
        >
            <svg width="28" height="80" viewBox="0 0 40 120" className="fill-current">
                <path
                    d="M20 120 Q10 100 20 80 Q30 60 20 40 Q10 20 20 0"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                />
                <polygon points="20,0 15,12 25,12" fill="currentColor" />
            </svg>
        </div>
    );

    return (
        <Card className="h-[347px] rounded-xl flex flex-col justify-between items-center px-4 py-6">
            {/* Header */}
            <div className="bg-gray-300 dark:bg-[#222] h-[57px] rounded-[4px] w-full py-2 px-4 text-center mb-4">
                <h2 className="text-black dark:text-white text-[22px] font-medium">{title}</h2>
            </div>

            {/* Value */}
            <div className="text-[20px] font-semibold" style={{ color: heatColor }}>
                {value.toFixed(1)} KW/sq. ft.
            </div>

            {/* Arrows */}
            <div className="flex space-x-4 items-end">
                <HeatArrow delay={0} />
                <HeatArrow delay={300} />
                <HeatArrow delay={600} />
            </div>

            {/* Status */}
            <div className="flex justify-center">
                <div
                    className={cn(
                        "text-white border border-white font-semibold text-[21px] px-4 py-1 rounded-md",
                        bg
                    )}
                >
                    {label}
                </div>
            </div>
        </Card>
    );
};
