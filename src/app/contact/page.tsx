import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { social } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Masaki Kawakami.",
};

export default function ContactPage() {
  return (
    <Container className="py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        The fastest way to reach me is email or LinkedIn. Based in Sydney, open
        to roles in Australia and Japan, plus remote and freelance work.
      </p>

      <ul className="mt-10 space-y-4 text-lg">
        <li>
          <a
            href={`mailto:${social.email}`}
            className="underline-offset-4 hover:text-primary hover:underline"
          >
            {social.email}
          </a>
        </li>
        <li>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-primary hover:underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-primary hover:underline"
          >
            GitHub
          </a>
        </li>
      </ul>
    </Container>
  );
}
