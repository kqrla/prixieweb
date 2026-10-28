import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { JerryExample } from "@/components/prixy/jerry-example";
import { AixploreExample } from "@/components/prixy/aixplore-example";
import { DearDonnaExample } from "@/components/prixy/deardonna-example";
import { Bot, Wrench, Sprout, Phone, Fingerprint, Database, Shield, Building, Eye, Heart } from "lucide-react";
import {
  BigHeading,
  BriefNote,
  CellGrid,
  MetaRow,
  StripLabel,
} from "@/components/prixy/document-parts";

export const Route = createFileRoute("/suite")({
  head: () => ({
    meta: [
      { title: "suite | prixy" },
      {
        name: "description",
        content:
          "prixy is part of an upcoming family of agents. meet milo, jerry, and moira, all in development.",
      },
      { property: "og:title", content: "suite | prixy" },
      {
        property: "og:description",
        content:
          "prixy is part of an upcoming family of agents. meet milo, jerry, and moira, all in development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SuitePage,
});

function SuitePage() {
  const [jerryOpen, setJerryOpen] = useState(false);
  const [aixploreOpen, setAixploreOpen] = useState(false);
  const [deardonnaOpen, setDeardonnaOpen] = useState(false);
  return (
    <div>
      <MetaRow
        fields={[
          { label: "doc", value: "suite" },
          { label: "issue", value: "01" },
          { label: "status", value: "preview" },
        ]}
      />
      <BigHeading>prixy is only the first</BigHeading>

      <BriefNote label="brief">
        prixy handles delegated presence for meetings and live sessions. it is
        the first member of a small family of agents, each built for a different
        kind of task. the suite will grow slowly and only release agents that
        earn their place through daily use.
      </BriefNote>

      <StripLabel>family principles</StripLabel>
      <div className="border-x border-b border-primary px-4 py-4">
        <ul className="space-y-2 text-sm leading-relaxed text-foreground">
          <li className="flex gap-3">
            <span className="text-primary opacity-60">01</span>
            <span>every agent solves one concrete problem well.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary opacity-60">02</span>
            <span>agents share the same quiet, text-first reporting style.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-primary opacity-60">03</span>
            <span>each one runs under your identity, not on its own.</span>
          </li>
        </ul>
      </div>

      <StripLabel>siblings</StripLabel>
      <CellGrid
        columns={3}
        items={[
          {
            title: "milo",
            description:
              "a memory and context agent. milo keeps track of ongoing threads across conversations, documents, and decisions so nothing drops between sessions.",
            icon: <Bot size={18} />,
            marker: "in development",
          },
          {
            title: "jerry",
            onSelect: () => setJerryOpen(true),
            description:
              "the jerryrigging agent. jerry patches together quick workflows, one-off scripts, and improvised connections between tools when there is no formal integration.",
            icon: <Wrench size={18} />,
            marker: "in development",
          },
          {
            title: "moira",
            description:
              "moira is a context engine with personas: one place where your context lives, split into personas you fully control, shared only through explicit consent, fed from the apps and services each persona actually uses.",
            icon: <Bot size={18} />,
            marker: "in development",
          },
        ]}
      />

      <StripLabel>ecosystems</StripLabel>
      <CellGrid
        columns={3}
        items={[
          {
            title: "aixplore",
            onSelect: () => setAixploreOpen(true),
            description:
              "spawnable vms for the agent family. spawnables is in development which will predominantly power prixie's screensharing capabilities when it comes to projects that are not within prixie's browser capabilities.",
            icon: <Sprout size={18} />,
            marker: "in development",
          },
          {
            title: "neophony",
            description:
              "dedicated phone numbers for agents, built on neocloud-based esim instead of voip. omnichannel communication stack connected back to the number across platforms.",
            icon: <Phone size={18} />,
            marker: "in development",
          },
          {
            title: "clawtel",
            description: "",
            icon: <Phone size={18} />,
            marker: "in development",
          },
        ]}
      />

          <StripLabel>creative studio + socials</StripLabel>
      <CellGrid
        columns={3}
        items={[
          {
            title: "proskena",
            description: "digital browser-based photography studio",
            icon: <Sprout size={18} />,
            marker: "released in beta",
          },
          {
            title: "evie",
            description: "personal consumer-side cultural taste intelligence, not business-side.",
            icon: <Heart size={18} />,
            marker: "in development",
          },
        ]}
      />

       <StripLabel>brandbarbie | brand + positioning</StripLabel>
      <CellGrid
        columns={3}
        items={[
          {
            title: "beholder",
            description: "product positioning based on your repo",
            icon: <Eye size={18} />,
            marker: "in development",
          },
          {
            title: "donna & dom",
            onSelect: () => setDeardonnaOpen(true),
            description: "domain broker and domain hack master",
            icon: <Heart size={18} />,
            marker: "in development",
          },
        ]}
      />

        <StripLabel>data</StripLabel>
      <CellGrid
        columns={3}
        items={[
          {
            title: "retelldb",
            description:
              "the shared context and memory layer for the suite. retelldb is in beta use.",
            icon: <Database size={18} />,
            marker: "in beta use",
          },
        ]}
      />

      <StripLabel>security</StripLabel>
      <CellGrid
        columns={3}
        items={[
          {
            title: "orchid.dev",
            description:
              "agent ids for the ecosystem. orchid.dev is in development, with more details to come.",
            icon: <Fingerprint size={18} />,
            marker: "in development",
          },
          {
            title: "aasn - autonomous agent social number",
            description: "",
            icon: <Shield size={18} />,
            marker: "in development",
          },
           {
            title: "themailtell & co",
            description: "collection of projects that function as standalone components (plugging into consumer apps) that turns email domains, phone numbers, and postal addresses into cited, dated signal vectors about their infrastructure, such as disposable-service lists, mail routing, and numbering rules. it makes no trust or fraud decision, passes no verdicts and says unknown when applicable so the plugging-in app owns that policy & authority.",
            icon: <Building size={18} />,
            marker: "released, in use",
            muted: true,
          },
        ]}
      />


      <StripLabel>sovereignity</StripLabel>
      <CellGrid
        columns={3}
        items={[
          {
            title: "fingentica",
            description: "",
            icon: <Building size={18} />,
            marker: "in development",
            muted: true,
          },
          {
            title: "agentity",
            description: "built around clawbank, giving agents their own entities.",
            icon: <Building size={18} />,
            marker: "in development",
            muted: true,
          },
           {
            title: "stacktimize",
            description: "built around clawbank, giving agents their own entities.",
            icon: <Building size={18} />,
            marker: "in development",
            muted: true,
          },
           {
            title: "orchart",
            description: "built around clawbank, giving agents their own entities.",
            icon: <Building size={18} />,
            marker: "in development",
            muted: true,
          },
        ]}
      />




      <JerryExample open={jerryOpen} onOpenChange={setJerryOpen} />
      <AixploreExample open={aixploreOpen} onOpenChange={setAixploreOpen} />
      <DearDonnaExample open={deardonnaOpen} onOpenChange={setDeardonnaOpen} />
    </div>
  );
}
