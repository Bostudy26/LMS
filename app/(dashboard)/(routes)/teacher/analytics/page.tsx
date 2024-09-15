import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataCard } from "./_components/data-card";


 

const AnalyticsPAge = async () => {
    const { userId } = auth();

    if (!userId){
        return redirect("/");
    }

    const {
        data,
        totalRevenue,
        totalSales,
    } = await getAnalytics(userId);

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md-4">
                <DataCard
                    value={totalRevenue}
                    label="Total Revenue"
                    shouldFormat
                />  
                <DataCard
                    value={totalSales}
                    label="Total Sales"
                />    
            </div>
        </div>
    );
}
 
export default AnalyticsPAge;