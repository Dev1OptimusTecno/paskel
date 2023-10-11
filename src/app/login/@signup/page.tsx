import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "./form";
import { TabsContent } from "@/components/ui/tabs";

export default function LoginCard() {
    return (
        <TabsContent value="SignUp">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create an account.
                    </CardDescription>
                </CardHeader>
                <SignupForm />
            </Card>
        </TabsContent>
    );
}
