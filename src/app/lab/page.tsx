import type { Metadata } from "next";
import { LensLab } from "@/components/world/LensLab";

export const metadata: Metadata = {
  title: "Lens Lab",
  robots: { index: false, follow: false },
};

/** Internal playground for comparing lens forms. Not linked, not indexed. */
export default function LabPage() {
  return <LensLab />;
}
