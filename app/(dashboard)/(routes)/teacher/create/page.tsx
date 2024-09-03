"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Link from "next/link";
import toast from "react-hot-toast";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})


const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const onSubmit =  async (values: z.infer<typeof formSchema>) => {
        try {
            const respone = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${respone.data.id}`);
            toast.success("Course created")
        } catch {
            toast.error("Something went wrong");
        }
    }

    const { isSubmitting, isValid } = form.formState;

    return (  
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center p-6">
            <div>
                <h1 className="text-2x1">
                    name your Course
                </h1>
                <p className="text-sm text-slate-600">
                    what would you like to name your course? Dont worrym you can change this later.
                </p>
                <Form { ...form } >
                    <form
                        onSubmit={ form.handleSubmit(onSubmit) }
                       className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced web development'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course? 
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="">
                            <Link href="/" >
                                <Button 
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
 
export default CreatePage;