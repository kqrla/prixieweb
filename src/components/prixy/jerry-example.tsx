import { ArrowDown, ArrowRight, Mail, Globe, Wrench } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function JerryExample({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl gap-0 overflow-y-auto border-primary p-0 shadow-none">
        <DialogHeader className="border-b border-primary p-5 pr-12 text-left">
          <DialogTitle className="font-display text-4xl font-black tracking-normal text-primary">jerry airidian</DialogTitle>
          <DialogDescription className="italic text-primary">i'll either find a way or make one</DialogDescription>
        </DialogHeader>
        <div className="space-y-5 p-5 text-xs leading-relaxed">
          <div>
            <div className="mb-2 text-primary">01 / the request</div>
            <p>" i need a free business email with my own domain, but all i see are paid services :/"</p>
          </div>
          <div className="border-y border-primary py-4">
            <div className="mb-2 flex items-center gap-2 text-primary"><Wrench size={16} aria-hidden="true" />02 / find the missing piece</div>
            <p>jerry separates the problem into receiving mail and sending mail. before choosing a workaround, he asks:</p>
            <p className="mt-3 font-semibold">“where did you purchase your domain?”</p>
            <p className="mt-1 text-muted-foreground">“porkbun.”</p>
          </div>
          <div>
            <div className="mb-3 text-primary">03 / the jerryrigged path</div>
            <div className="border border-primary">
              <div className="border-b border-primary px-3 py-2 font-semibold text-primary">inbound / free email forwarding</div>
              <div className="flex flex-wrap items-center gap-3 p-3">
                <span className="flex items-center gap-2"><Globe size={16} aria-hidden="true" />your domain email</span>
                <ArrowRight size={16} aria-hidden="true" />
                <span>porkbun forwarding</span>
                <ArrowRight size={16} aria-hidden="true" />
                <span className="flex items-center gap-2"><Mail size={16} aria-hidden="true" />your google inbox</span>
              </div>
            </div>
            <div className="flex justify-center py-2 text-primary"><ArrowDown size={18} aria-hidden="true" /></div>
            <div className="border border-primary">
              <div className="border-b border-primary px-3 py-2 font-semibold text-primary">outbound / google smtp workaround</div>
              <div className="flex flex-wrap items-center gap-3 p-3">
                <span>gmail “send mail as”</span>
                <ArrowRight size={16} aria-hidden="true" />
                <span>google smtp</span>
                <ArrowRight size={16} aria-hidden="true" />
                <span>recipient</span>
              </div>
            </div>
            <p className="mt-3">jerry maps the forwarding address to your google account, then works through verifying your domain email and configuring “send mail as” for outbound messages.</p>
          </div>
          <p className="border-t border-primary pt-4 text-muted-foreground">an illustrative workaround, not a connected email setup or hosted business mailbox</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}