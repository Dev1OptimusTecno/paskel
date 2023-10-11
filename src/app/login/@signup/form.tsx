"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { userScheme as formSchema } from "@/schemas";
import { API_URL } from "@/utils/envs";
import { SignupResponse } from "@/types/api";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export const SignupForm = () => {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
		event.preventDefault();
		var response ;
		try {
			response = await fetch('/api/signup', {
				method: "POST",
				body: JSON.stringify({
					username: values.username,
					password: values.password,
				} as z.infer<typeof formSchema>),
				headers: {
					"content-type": "application/json",
				},
			});
		} catch (error) {
			return window.alert(error)
		}
		const data: SignupResponse = await response.json();
		if (response.status == 400 && data.errors) {
			var message = data.errors.message;
			form.setError("username", {
				message: message,
			});
		} else if (response.status == 400 && data.message) {
			form.setError("username", {
				message: data.message,
			});
		} else {
			toast({
				variant: "sucess",
				title: "Criado com sucesso!",
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
									<FormItem>
										<Label htmlFor="usuario">Usuário</Label>
										<FormControl>
											<Input
												placeholder="Usuário..."
												id="usuario"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</div>
							);
						}}
					/>
					<FormField
						name="password"
						render={({ field }) => {
							return (
								<div className="space-y-1">
									<FormItem>
										<Label htmlFor="senha">Senha</Label>
										<FormControl>
											<Input
												id="senha"
												placeholder="Senha..."
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								</div>
							);
						}}
					/>
				</CardContent>
				<CardFooter>
					<Button type="submit">Sign Up</Button>
				</CardFooter>
			</form>
		</Form>
	);
};
