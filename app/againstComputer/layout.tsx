import { Suspense } from "react";

export default function AgainstComputerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
