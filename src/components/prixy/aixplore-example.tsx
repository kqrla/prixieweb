import { Monitor, Server } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function AixploreExample({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl gap-0 overflow-y-auto border-primary p-0 shadow-none">
        <DialogHeader className="border-b border-primary p-4 pr-12 text-left">
          <DialogTitle className="font-display text-3xl font-black tracking-normal text-primary">aixplore</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">two sides, in development</DialogDescription>
        </DialogHeader>
        <div className="text-xs leading-relaxed">
          <section className="space-y-3 border-b border-primary p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-primary"><Server size={16} aria-hidden="true" />spawnables</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="border-l border-primary pl-3">
                <h3 className="mb-1 font-semibold text-primary">disposable / ephemeral</h3>
                <p>vms provisioned for a task, then disposed of when the work is done.</p>
              </div>
              <div className="border-l border-primary pl-3">
                <h3 className="mb-1 font-semibold text-primary">persistent / byoc</h3>
                <p>persistent vms on your own cloud infrastructure, carried across tasks.</p>
              </div>
            </div>
            <p>both come with a twist: provision not just linux vms, but also macos, android, windows, ios, and other operating systems.</p>
          </section>
          <section className="space-y-3 p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-primary"><Monitor size={16} aria-hidden="true" />legacy</h2>
            <p>your agent can spin up legacy operating systems that are no longer supported, such as windows 7, to run legacy apps that are abandoned or no longer in development, with no api, oauth, or mcp tooling.</p>
            <p className="border-l border-primary pl-3 italic text-primary">allowing the agent to meet the legacy app “where they're at, not where we wish they were at”.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}