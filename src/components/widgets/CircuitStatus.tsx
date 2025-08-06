import { X } from "lucide-react";
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";

interface CircuitStatusProps {
    isOpen: boolean;
    title: string
}

export const CircuitStatus: React.FC<CircuitStatusProps> = ({ isOpen, title }) => {
    return (
        <Card className="h-[347px]rounded-xl flex flex-col justify-between items-center px-4 py-6">
            {/* Header */}
            <div className="bg-gray-300 dark:bg-[#222] h-[57px] rounded-[4px] w-full flex items-center px-2 py-0 text-center mb-4">
                <h2 className="text-black dark:text-white text-[22px] font-medium">{title}</h2>
            </div>

            {/* Circuit Diagram */}
            <div className="relative w-full max-w-[200px] h-16 flex items-center justify-center mb-6 mt-2">
                <div className="absolute left-0 w-3 h-3 bg-black dark:bg-white rounded-full" />
                <div className="absolute right-0 w-3 h-3 bg-black dark:bg-white rounded-full" />
                <div className="flex-1 flex items-center justify-center px-4">
                    {isOpen ? (
                        <div className="w-full h-1 bg-black dark:bg-white" />
                    ) : (
                        <>
                            <div className="w-2/5 h-1 bg-black dark:bg-white" />
                            <div className="flex items-center justify-center w-1/5">
                                <X className="w-6 h-6 t bg-blackedark:xt-white bg-[#942323] rounded-full p-1 border border-white" />
                            </div>
                            <div className="w-2/5 h-1 bg-black dark:bg-white" />
                        </>
                    )}
                </div>
            </div>

            {/* Status */}
            <div className="flex justify-center">
                <div
                    className={cn(
                        "text-white border border-white font-semibold text-[21px] px-4 py-1 rounded-md",
                        isOpen ? "bg-green-700" : "bg-red-700"
                    )}
                >
                    {isOpen ? 'Circuit Open' : 'Circuit Closed'}
                </div>
            </div>
        </Card>
    );
};
