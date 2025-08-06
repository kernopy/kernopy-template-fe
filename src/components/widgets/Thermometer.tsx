import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ThermometerProps {
    title: string;
    unit: string;
    minTemp?: number;
    maxTemp?: number;
    value: number;
}

const Thermometer: React.FC<ThermometerProps> = ({
    title,
    unit,
    minTemp = 0,
    maxTemp = 100,
    value
}) => {
    const clampedValue = Math.max(minTemp, Math.min(value, maxTemp));
    const percentage = ((clampedValue - minTemp) / (maxTemp - minTemp)) * 100;

    const getTemperatureColor = (percent: number): string => {
        if (percent <= 30) return '#0E6D1D'; // green
        if (percent <= 60) return '#CC9600'; // yellow
        return '#942323'; // red
    };

    const temperatureColor = getTemperatureColor(percentage);
    const getStatusInfo = (percent: number) => {
        if (percent <= 40) return { label: 'Normal', color: 'bg-green-700' };
        if (percent <= 60) return { label: 'High', color: 'bg-yellow-600' };
        return { label: 'Critical', color: 'bg-red-700' };
    };
    const { label: statusLabel, color: statusColor } = getStatusInfo(percentage);

    return (
        <Card className="h-[347px] rounded-xl flex flex-col justify-between items-center px-4 py-6">
            {/* Header */}
            <div className="bg-gray-300 dark:bg-[#222] h-[57px] rounded-[4px] w-full p-2 text-center mb-4">
                <h2 className="text-black dark:text-white text-[22px] font-medium">{title}</h2>
            </div>

            {/* Value + Thermometer */}
            <div className="flex flex-col items-center space-y-3">
                {/* <div
                    className="text-lg font-semibold"
                    style={{ color: temperatureColor }}
                >
                    {clampedValue} {unit}
                </div> */}

                <div className="relative">
                    {/* Thermometer Tube */}
                    <div className="w-5 h-32  rounded-full relative overflow-hidden border border-[#444]">
                        <div
                            className="absolute bottom-0 w-full rounded-full transition-all duration-1000 ease-in-out"
                            style={{
                                height: `${Math.max(percentage, 5)}%`,
                                backgroundColor: temperatureColor
                            }}
                        />
                    </div>

                    {/* Bulb */}
                    <div
                        className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-black"
                        style={{ backgroundColor: temperatureColor }}
                    />

                    {/* Labels */}
                    <div className="absolute -right-14 top-0 h-full flex flex-col justify-center text-white text-xs font-light">
                        {/* If nedd the Min Max Labels here */}
                        {/* <span>{maxTemp}</span>
                        <span>{Math.floor((maxTemp + minTemp) / 2)}</span>
                        <span>{minTemp}</span> */}
                        <div
                            className="text-lg font-semibold "
                            style={{ color: temperatureColor }}
                        >
                            {clampedValue} {unit}
                        </div>
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="flex justify-center mt-4">
                <Badge
                    className={`text-white border border-white font-semibold text-[21px] px-4 py-1 rounded-md ${statusColor}`}
                >
                    {statusLabel}
                </Badge>
            </div>
        </Card>
    );
};

export default Thermometer;
