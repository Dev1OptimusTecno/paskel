import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./form";
import { TabsContent } from "@/components/ui/tabs";

export default function LoginCard() {
	return (
		<TabsContent value="Login">
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Log in into your account</CardDescription>
				</CardHeader>
				<LoginForm />
			</Card>
		</TabsContent>
	);
}
