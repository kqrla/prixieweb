import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type AgentityExampleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function DetailTable({
  rows,
}: {
  rows: { label: string; detail: ReactNode }[];
}) {
  return (
    <div className="overflow-x-auto border border-primary">
      <table className="w-full border-collapse text-left text-xs leading-relaxed">
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.label}
              className={index < rows.length - 1 ? "border-b border-primary" : ""}
            >
              <th
                scope="row"
                className="w-1/3 min-w-28 border-r border-primary px-3 py-3 align-top font-semibold text-primary"
              >
                {row.label}
              </th>
              <td className="px-3 py-3 align-top">{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AgentityExample({
  open,
  onOpenChange,
}: AgentityExampleProps) {
  const [selectedCountry, setSelectedCountry] = useState("United States");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl gap-0 overflow-y-auto border-primary p-0 shadow-none">
        <DialogHeader className="border-b border-primary p-4 pr-12 text-left">
          <DialogTitle className="font-display text-4xl font-black tracking-normal text-primary">
            agentity
          </DialogTitle>
          <DialogDescription className="text-xs leading-tight italic text-primary">
            a real u.s. entity for your autonomous agent
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="overview"
          className="flex min-h-0 flex-col-reverse"
        >
          <TabsList
            aria-label="Agentity information"
            className="grid h-auto w-full grid-cols-3 rounded-none border-t border-primary bg-transparent p-0 text-xs"
          >
            <TabsTrigger
              value="overview"
              className="h-full rounded-none border-r border-primary py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              overview
            </TabsTrigger>
            <TabsTrigger
              value="coverage"
              className="h-full rounded-none border-r border-primary py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              coverage
            </TabsTrigger>
            <TabsTrigger
              value="connects"
              className="h-full rounded-none py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              connects with
            </TabsTrigger>
          </TabsList>
          <div className="min-h-64 p-4 text-xs leading-relaxed">
            <TabsContent value="overview" className="mt-0 space-y-3">
              <div className="text-primary">01 / the idea</div>
              <p>
                agentity is for ambitious solopreneurs ready to give their
                autonomous agent—or team of agents—an actual U.S. legal entity
                to operate through. The goal is to make the entity layer
                accessible without asking a solo founder to become an expert
                in formation and administration.
              </p>
              <p>
                Inspired by the agent-entity concept demonstrated by ClawBank,
                agentity takes a traditional U.S. business and banking
                approach: fiat rails only, with no crypto. The planned default
                is a U.S. LLC; banking and other services would use conventional
                providers, not an agentity-issued bank account.
              </p>
              <p>
                Keep control of your providers and infrastructure: bring your
                own accounts, cloud, and language models. Formation,
                administration, banking, and partner connections shown here
                describe a direction, not live integrations or legal advice.
              </p>
            </TabsContent>
            <TabsContent value="coverage" className="mt-0 space-y-3">
              <div className="text-primary">02 / planned entity coverage</div>
              <DetailTable
                rows={[
                  {
                    label: "for-profit",
                    detail:
                      "U.S. LLC by default, with plans to expand to other for-profit corporation types.",
                  },
                  {
                    label: "countries",
                    detail: (
                      <div className="space-y-2">
                        <div
                          aria-label="Select a country"
                          className="flex flex-wrap gap-2"
                        >
                          {[
                            "United States",
                            "Canada",
                            "Singapore",
                            "Cayman Islands",
                          ].map((country) => {
                            const isUs = country === "United States";
                            const isSelected = selectedCountry === country;
                            return (
                              <button
                                key={country}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => setSelectedCountry(country)}
                                className={`rounded-full border px-3 py-1 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                  isUs
                                    ? isSelected
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-primary text-primary hover:bg-secondary"
                                    : isSelected
                                      ? "border-primary bg-secondary text-primary"
                                      : "border-primary/50 text-muted-foreground hover:border-primary hover:text-primary"
                                }`}
                              >
                                {country}
                              </button>
                            );
                          })}
                        </div>
                        <p aria-live="polite" className="text-muted-foreground">
                          {selectedCountry === "United States"
                            ? "Default: U.S. LLC."
                            : `${selectedCountry} is an intended expansion; the U.S. is the planned starting point.`}
                        </p>
                      </div>
                    ),
                  },
                  {
                    label: "nonprofit add-on",
                    detail:
                      "Optional supporting rails, not the main entity path: Swiss Verein with no bank accounts, or U.S. fiscal sponsorship through HCB (hcb.hacklub.com) and similar programs.",
                  },
                  {
                    label: "lock-in",
                    detail: "None — BYOA, BYOC & BYOLLM.",
                  },
                ]}
              />
            </TabsContent>
            <TabsContent value="connects" className="mt-0 space-y-3">
              <div className="text-primary">03 / related projects</div>
              <DetailTable
                rows={[
                  {
                    label: "communication stack",
                    detail: "neophony & clawtel",
                  },
                  {
                    label: "positioning",
                    detail: "beholder & deardonna",
                  },
                ]}
              />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
