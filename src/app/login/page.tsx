import { LoginForm } from "../components/forms/login-form";

type LoginPageProps = {
    searchParams: Promise<{from?: string }>;
}


export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { from } = await searchParams

    return <LoginForm from={ from ? from : null } />;
}