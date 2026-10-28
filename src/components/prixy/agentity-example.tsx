import { useState, type ReactNode } from "react";
import { Check, Timer } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type AgentityExampleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function DetailTable({ rows }: { rows: { label: string; detail: ReactNode }[] }) {
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
                className="w-1/3 min-w-28 border-r border-primary px-2 py-2 align-top font-semibold text-primary"
              >
                {row.label}
              </th>
              <td className="px-2 py-2 align-top">{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TooltipTerm({ label, description }: { label: string; description: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="cursor-help text-left underline decoration-dotted underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {label}
        </button>
      </TooltipTrigger>
      <TooltipContent>{description}</TooltipContent>
    </Tooltip>
  );
}

function CountryChip({
  country,
  selected,
  onSelect,
  tooltip,
}: {
  country: string;
  selected: boolean;
  onSelect: () => void;
  tooltip?: string | undefined;
}) {
  const chip = (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`border px-2 py-0.5 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        selected
          ? "border-primary bg-secondary text-primary"
          : "border-primary/50 text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {country}
    </button>
  );

  if (!tooltip) return chip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{chip}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

type Provision = {
  label: string;
  status: "included" | "planned";
};

type CoverageGroup = {
  label: string;
  entries: { id: string; content: ReactNode }[];
  provisions: Provision[];
};

function CoverageTable({ groups }: { groups: CoverageGroup[] }) {
  return (
    <div className="overflow-x-auto border border-primary">
      <table className="w-full min-w-[34rem] border-collapse text-left text-xs leading-relaxed">
        <thead>
          <tr className="border-b border-primary text-primary">
            <th className="border-r border-primary px-2 py-1.5 font-semibold">area</th>
            <th className="border-r border-primary px-2 py-1.5 font-semibold">coverage</th>
            <th className="px-2 py-1.5 font-semibold">provisions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, groupIndex) =>
            group.entries.map((entry, index) => {
              const isLastEntry = index === group.entries.length - 1;
              const hasGroupBorder = groupIndex < groups.length - 1;
              const groupBorderClass = hasGroupBorder ? "border-b border-primary" : "";
              const borderClass = isLastEntry && !hasGroupBorder ? "" : "border-b border-primary";
              return (
                <tr key={entry.id} className={borderClass}>
                  {index === 0 && (
                    <th
                      scope="rowgroup"
                      rowSpan={group.entries.length}
                      className={`w-1/5 min-w-24 border-r border-primary px-2 py-2 align-top font-semibold text-primary ${groupBorderClass}`}
                    >
                      {group.label}
                    </th>
                  )}
                  <td
                    className={`w-2/5 border-r border-primary px-2 py-2 align-top ${borderClass}`}
                  >
                    {entry.content}
                  </td>
                  {index === 0 && (
                    <td
                      rowSpan={group.entries.length}
                      className={`px-2 py-2 align-top ${groupBorderClass}`}
                    >
                      <div className="mb-1 font-semibold text-primary">{group.label}</div>
                      <ul className="space-y-1">
                        {group.provisions.map((provision) => (
                          <li key={provision.label} className="flex items-start gap-1.5">
                            {provision.status === "included" ? (
                              <Check
                                aria-hidden="true"
                                size={14}
                                className="mt-0.5 shrink-0 text-emerald-700"
                              />
                            ) : (
                              <Timer
                                aria-hidden="true"
                                size={14}
                                className="mt-0.5 shrink-0 text-violet-700"
                              />
                            )}
                            <span>
                              {provision.label}
                              {provision.status === "planned" && " (planned)"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  )}
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}

export function AgentityExample({ open, onOpenChange }: AgentityExampleProps) {
  const [selectedCountry, setSelectedCountry] = useState("united states");
  const selectCountry = (country: string) => () => setSelectedCountry(country);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl gap-0 overflow-y-auto border-primary p-0 shadow-none">
        <TooltipProvider>
          <DialogHeader className="border-b border-primary p-4 pr-12 text-left">
            <DialogTitle className="font-display text-4xl font-black tracking-normal text-primary">
              agentity
            </DialogTitle>
            <DialogDescription className="text-xs leading-tight italic text-primary">
              a real u.s. entity for your autonomous agent
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="overview" className="flex min-h-0 flex-col-reverse">
            <TabsList
              aria-label="agentity information"
              className="grid h-auto w-full grid-cols-4 rounded-none border-t border-primary bg-transparent p-0 text-xs"
            >
              <TabsTrigger
                value="overview"
                className="h-full rounded-none border-r border-primary px-1 py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                overview
              </TabsTrigger>
              <TabsTrigger
                value="coverage"
                className="h-full rounded-none border-r border-primary px-1 py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                coverage
              </TabsTrigger>
              <TabsTrigger
                value="lifecycle"
                className="h-full rounded-none border-r border-primary px-1 py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                lifecycle
              </TabsTrigger>
              <TabsTrigger
                value="connects"
                className="h-full rounded-none px-1 py-3 data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                connects with
              </TabsTrigger>
            </TabsList>
            <div className="min-h-64 p-3 text-xs leading-relaxed sm:p-4">
              <TabsContent value="overview" className="mt-0 space-y-3">
                <div className="text-primary">01 / the idea</div>
                <p>
                  agentity is for ambitious solopreneurs ready to give their autonomous agent—or
                  team of agents—an actual u.s. legal entity to operate through. the goal is to make
                  the entity layer accessible without asking a solo founder to become an expert in
                  formation and administration.
                </p>
                <p>
                  inspired by the agent-entity concept demonstrated by clawbank, agentity takes a
                  traditional u.s. business and banking approach: fiat rails only, with no crypto.
                  the planned default is a u.s. llc; banking and other services would use
                  conventional providers, not an agentity-issued bank account.
                </p>
                <p>
                  keep control of your providers and infrastructure: bring your own accounts, cloud,
                  and language models. formation, administration, banking, and partner connections
                  shown here describe a direction, not live integrations or legal advice.
                </p>
              </TabsContent>
              <TabsContent value="coverage" className="mt-0 space-y-3">
                <div className="text-primary">02 / planned entity coverage</div>
                <p className="text-muted-foreground">
                  ticks show planned in-scope provisions, not a live service.
                </p>
                <CoverageTable
                  groups={[
                    {
                      label: "primary entities",
                      entries: [
                        {
                          id: "llc",
                          content: (
                            <TooltipTerm
                              label="u.s. llc"
                              description="the planned default entity type, available for formation in any u.s. state."
                            />
                          ),
                        },
                        {
                          id: "corporation",
                          content: (
                            <TooltipTerm
                              label="u.s. corporation"
                              description="an additional entity type planned after the initial llc path."
                            />
                          ),
                        },
                      ],
                      provisions: [
                        { label: "state filing", status: "included" },
                        { label: "ein issuing", status: "included" },
                        { label: "registered agent", status: "included" },
                        { label: "business address", status: "included" },
                        { label: "ricardian contracts", status: "included" },
                        { label: "bank account", status: "planned" },
                        { label: "startup credits", status: "planned" },
                      ],
                    },
                    {
                      label: "countries",
                      entries: [
                        {
                          id: "united-states",
                          content: (
                            <CountryChip
                              country="united states"
                              selected={selectedCountry === "united states"}
                              onSelect={selectCountry("united states")}
                            />
                          ),
                        },
                        {
                          id: "other-countries",
                          content: (
                            <div className="flex flex-wrap gap-1.5">
                              {["canada", "singapore", "cayman islands"].map((country) => (
                                <CountryChip
                                  key={country}
                                  country={country}
                                  selected={selectedCountry === country}
                                  onSelect={selectCountry(country)}
                                />
                              ))}
                            </div>
                          ),
                        },
                        {
                          id: "europe",
                          content: (
                            <div className="flex flex-wrap gap-1.5">
                              {[
                                { country: "uk", tooltip: "private limited company" },
                                { country: "ireland", tooltip: "private limited company" },
                                { country: "estonia" },
                                { country: "bulgaria" },
                              ].map(({ country, tooltip }) => (
                                <CountryChip
                                  key={country}
                                  country={country}
                                  selected={selectedCountry === country}
                                  onSelect={selectCountry(country)}
                                  tooltip={tooltip}
                                />
                              ))}
                            </div>
                          ),
                        },
                      ],
                      provisions: [
                        { label: "u.s. launch first", status: "included" },
                        { label: "international expansion", status: "planned" },
                      ],
                    },
                    {
                      label: "nonprofit add-on",
                      entries: [
                        {
                          id: "swiss-verein",
                          content: <TooltipTerm label="swiss verein" description="no bank." />,
                        },
                        {
                          id: "fiscal-sponsorship",
                          content: (
                            <TooltipTerm
                              label="u.s. fiscal sponsorship"
                              description="through hcb and similar programs."
                            />
                          ),
                        },
                      ],
                      provisions: [
                        { label: "supporting rails only", status: "planned" },
                        { label: "bank account", status: "planned" },
                      ],
                    },
                    {
                      label: "lock-in",
                      entries: [
                        {
                          id: "accounts",
                          content: (
                            <TooltipTerm
                              label="bring your own accounts"
                              description="keep control of your existing provider accounts."
                            />
                          ),
                        },
                        {
                          id: "infrastructure",
                          content: (
                            <TooltipTerm
                              label="bring your own cloud and models"
                              description="choose your own cloud and language-model providers."
                            />
                          ),
                        },
                      ],
                      provisions: [{ label: "no provider lock-in", status: "included" }],
                    },
                  ]}
                />
                <p aria-live="polite" className="text-muted-foreground">
                  {selectedCountry === "united states"
                    ? "default: u.s. llc."
                    : `${selectedCountry} is an intended expansion; the u.s. is the planned starting point.`}
                </p>
              </TabsContent>
              <TabsContent value="lifecycle" className="mt-0 space-y-3">
                <div className="text-primary">03 / formation lifecycle</div>
                <p>
                  an illustrative sequence for the planned entity journey; these steps are not live
                  integrations or legal advice.
                </p>
                <DetailTable
                  rows={[
                    {
                      label: "choose",
                      detail: (
                        <TooltipTerm
                          label="u.s. llc"
                          description="the planned default entity type."
                        />
                      ),
                    },
                    {
                      label: "file",
                      detail: (
                        <TooltipTerm
                          label="state filing"
                          description="submit formation documents to the selected state's filing office."
                        />
                      ),
                    },
                    {
                      label: "identify",
                      detail: (
                        <TooltipTerm
                          label="ein issuing"
                          description="request an employer identification number after formation."
                        />
                      ),
                    },
                    {
                      label: "maintain",
                      detail: (
                        <>
                          <TooltipTerm
                            label="registered agent"
                            description="a registered-agent service is part of the planned entity support."
                          />
                          {" · "}
                          <TooltipTerm
                            label="business address"
                            description="a business address is part of the planned entity support."
                          />
                        </>
                      ),
                    },
                    {
                      label: "connect",
                      detail: (
                        <>
                          <TooltipTerm
                            label="bank account"
                            description="planned through a conventional third-party provider."
                          />
                          {" · "}
                          <TooltipTerm
                            label="startup credits"
                            description="planned partner benefit; availability may vary."
                          />
                        </>
                      ),
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="connects" className="mt-0 space-y-3">
                <div className="text-primary">04 / decoupled projects</div>
                <p>independent projects that tie into the same ecosystem.</p>
                <DetailTable
                  rows={[
                    {
                      label: "communication stack",
                      detail: (
                        <>
                          <TooltipTerm
                            label="neophony"
                            description="a related communication project."
                          />
                          {" · "}
                          <TooltipTerm
                            label="clawtel"
                            description="a related communication project."
                          />
                        </>
                      ),
                    },
                    {
                      label: "positioning",
                      detail: (
                        <>
                          <TooltipTerm
                            label="beholder"
                            description="a related positioning project."
                          />
                          {" · "}
                          <TooltipTerm
                            label="deardonna"
                            description="a related positioning project."
                          />
                        </>
                      ),
                    },
                    {
                      label: "identity",
                      detail: (
                        <TooltipTerm
                          label="self.xyz"
                          description="an independent identity project in the same ecosystem."
                        />
                      ),
                    },
                  ]}
                />
              </TabsContent>
            </div>
          </Tabs>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
