import { title } from "@/shared/components/primitives";
import InvoiceGenerator from "../features/invoice-generator";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-16 pb-10">
      <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-128 w-lg max-w-full pointer-events-none opacity-40 z-0 filter blur-[130px] bg-linear-to-r from-primary/60 via-primary/100 to-secondary/60" />
      <div className="inline-block max-w-xl text-center justify-center relative z-10">
        <span className={title()}>
          Generate an invoice and export it in PDF{" "}
        </span>
        <span className={`${title({ color: "blue" })}`}>in clicks!</span>
      </div>

      <InvoiceGenerator />
    </section>
  );
}
