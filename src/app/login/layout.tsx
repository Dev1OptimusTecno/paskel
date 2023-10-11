import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage(props: {
    login: React.ReactNode;
    signup: React.ReactNode;
}) {
    return (
        <div className="w-full h-full flex items-center justify-center align-center">
            <Tabs defaultValue="Login" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="Login">Login</TabsTrigger>
                    <TabsTrigger value="SignUp">SignUp</TabsTrigger>
                </TabsList>
                {props.login}
                {props.signup}
            </Tabs>
        </div>
    );
}
