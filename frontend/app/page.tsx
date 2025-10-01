import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/shared/config/site";
import { title, subtitle } from "@/shared/components/primitives";
import InvoiceGenerator from "../features/invoice-generator";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-16 pb-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>
          Generate an invoice and export it in PDF{" "}
        </span>
        <span className={`${title({ color: "pink" })}`}>in clicks!</span>
      </div>

      <InvoiceGenerator />
    </section>
  );
}
