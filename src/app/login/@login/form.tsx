"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { userScheme as formSchema } from "@/schemas";
import { API_URL } from "@/utils/envs";

export const LoginForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
		event.preventDefault();
		const response = await fetch(`${API_URL}/login`, {
			method: "POST",
			body: JSON.stringify({
				username: values.username,
				password: values.password,
			} as z.infer<typeof formSchema>),
			headers: {
				"content-type": "application/json",
			},
		});
		if (response.status == 400) {
			var message = "";

			form.setError("username", {
				message,
			});
		}
	}
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
					<Button type="submit">Login</Button>
				</CardFooter>
			</form>
		</Form>
	);
};
