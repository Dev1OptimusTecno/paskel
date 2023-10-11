"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { userScheme as formSchema } from "@/schemas";

function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    event.preventDefault();
}

export const SignupForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
                <CardContent className="space-y-2">
                    <FormField
                        name="username"
                        render={({ field }) => {
                            return (
                                <div className="space-y-1">
                                    <FormLabel htmlFor="usuario">
                                        Usuário
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Usuário..."
                                            id="usuario"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                            );
                        }}
                    />
                    <FormField
                        name="password"
                        render={({ field }) => {
                            return (
                                <div className="space-y-1">
                                    <FormLabel htmlFor="senha">Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="senha"
                                            placeholder="Senha..."
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                            );
                        }}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit">SignUp</Button>
                </CardFooter>
            </form>
        </Form>
    );
};
