import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";



const CourseIdPage = async ({params}: {params: {courseId: string}}) => {
    const {userId} = auth()

    if(!userId){
        return redirect("/");
    }


    const course = await db.course.findUnique({
        where : {
            id : params.courseId
        }
    })

    if (!course) {
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
    ];

    const totalFields = requiredFields.length;
    const compeltedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${compeltedFields} / ${totalFields})`

    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        course Setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gapx-2">
                        <IconBadge icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CourseIdPage;