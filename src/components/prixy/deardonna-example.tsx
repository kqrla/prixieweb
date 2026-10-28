import { ArrowRight, Globe, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function DearDonnaExample({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl gap-0 overflow-y-auto border-primary p-0 shadow-none">
        <DialogHeader className="border-b border-primary p-4 pr-12 text-left">
          <DialogTitle className="font-display text-4xl font-black tracking-normal text-primary">deardoma.in | donna & dom</DialogTitle>
          <DialogDescription className="text-xs leading-tight italic text-primary">a better name is out there</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 p-4 text-xs leading-relaxed">
          <section>
            <div className="mb-2 text-primary">01 / start with the idea</div>
            <p>you have a product, a point of view, and a name that is already taken. deardonna helps explore domain names that still feel like you.</p>
          </section>
          <section className="border-y border-primary py-4">
            <div className="mb-3 flex items-center gap-2 text-primary"><Search size={16} aria-hidden="true" />02 / explore a few directions</div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="border-l border-primary pl-3">
                <h2 className="mb-1 font-semibold text-primary">brand-first</h2>
                <p>short, memorable names built around your product.</p>
              </div>
              <div className="border-l border-primary pl-3">
                <h2 className="mb-1 font-semibold text-primary">domain hack</h2>
                <p>a name that uses the domain ending as part of the word.</p>
              </div>
              <div className="border-l border-primary pl-3">
                <h2 className="mb-1 font-semibold text-primary">clear + direct</h2>
                <p>names that make the product easy to understand.</p>
              </div>
            </div>
          </section>
          <section>
            <div className="mb-2 text-primary">03 / compare before you choose</div>
            <div className="flex flex-wrap items-center gap-3 border border-primary p-3">
              <span className="flex items-center gap-2"><Globe size={16} aria-hidden="true" />name ideas</span>
              <ArrowRight size={16} aria-hidden="true" />
              <span>availability + meaning</span>
              <ArrowRight size={16} aria-hidden="true" />
              <span>your shortlist</span>
            </div>
          </section>
          <p className="border-t border-primary pt-4 text-muted-foreground">an illustrative domain discovery flow, not a live search or availability check</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
