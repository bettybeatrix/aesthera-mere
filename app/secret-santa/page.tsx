import SecretSantaApp from "./secret-santa-app";

export const metadata = {
  title: "Secret Santa 2026 | Aesthera Mère",
  description: "A private wishlist and Secret Santa draw for Aesthera Mère's Year-End Party 2026.",
  robots: { index: false, follow: false },
};

export default function SecretSantaPage() {
  return <SecretSantaApp />;
}
