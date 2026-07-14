import LoginForm from "@/components/LoginForm";

interface Props {
  searchParams: Promise<{ callbackUrl?: string; registered?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl, registered } = await searchParams;
  return (
    <LoginForm
      callbackUrl={callbackUrl || "/dashboard"}
      registered={registered === "1"}
    />
  );
}
