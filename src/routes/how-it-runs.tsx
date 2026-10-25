import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Globe, Mail, MessageSquare, Phone, CreditCard, Mic, Video, Pause, Monitor, Database } from "lucide-react";
import { BigHeading, BriefNote, MetaRow, StripLabel } from "@/components/prixy/document-parts";

export const Route = createFileRoute("/how-it-runs")({
  head: () => ({
    meta: [
      { title: "how it runs | prixy" },
      { name: "description", content: "the browser, mail, payment, voice, and video services behind prixy's delegated presence." },
      { property: "og:title", content: "how it runs | prixy" },
      { property: "og:description", content: "a look at prixy's execution environments, service choices, and future self-hosted support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItRunsPage,
});

// provider cards share one treatment so secondary options stay visibly distinct.
function ServiceCard({ name, status, muted = false, children }: {
  name: string;
  status: string;
  muted?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`border border-primary p-3 ${muted ? "bg-secondary/40 text-muted-foreground" : "text-foreground"}`}>
      <div className={`mb-2 flex items-center gap-2 text-[10px] ${muted ? "text-muted-foreground" : "text-primary"}`}>
        {muted && <Pause size={12} aria-hidden="true" />}{status}
      </div>
      <h4 className="mb-2 text-sm font-semibold">{name}</h4>
      <p className="text-xs leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function HowItRunsPage() {
  return (
    <article className="[&_h1]:text-5xl [&_h1]:normal-case [&_h1]:tracking-normal sm:[&_h1]:text-7xl [&_span]:normal-case [&_span]:tracking-normal">
      <MetaRow fields={[
        { label: "document", value: "how it runs" },
        { label: "type", value: "system notes" },
        { label: "issue", value: "008" },
        { label: "status", value: "product stack" },
      ]} />
      <BriefNote>
        the services behind delegated presence. integration status refers to the product; this public preview does not connect to these services.
      </BriefNote>
      <StripLabel>execution / communication / presence</StripLabel>
      <BigHeading>how it runs</BigHeading>

      <section aria-labelledby="browser-environment" className="border-x border-b border-primary">
        <div className="flex items-center gap-3 border-b border-primary px-4 py-3 text-primary">
          <Globe size={18} aria-hidden="true" />
          <h2 id="browser-environment" className="text-lg font-semibold">browser environment</h2>
        </div>
        <div className="grid md:grid-cols-2">
          <div className="border-b border-primary p-4 md:border-r md:border-b-0">
            <h3 className="mb-2 text-sm font-semibold">cloud asynchronous work</h3>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              cloud browser sessions keep working while you are away, handling registrations, signed-in pages, and meeting links.
            </p>
            <div className="space-y-3">
              <ServiceCard name="browserbase" status="cloud asynchronous">
                the primary cloud browser environment for meeting joins and browser-based attendance.
              </ServiceCard>
              <ServiceCard name="kernel.sh" status="secondary" muted>
                secondary oss cloud browser used for a separate checkout browser during payment handoff and pre-oauth connectors allowing for joining meetings through the users account when joining as guest is not possible without need for prixie to ever see or have direct access to the user accounts
              </ServiceCard>
            </div>
          </div>
          <div className="p-4">
            <h3 className="mb-2 text-sm font-semibold">your own environment / future support</h3>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              future goal is to reduce dependency on subscriptions &amp; will incorporate open-source browser environments connectable to your own infrastructure. the aim is to let you choose where browser work runs without changing the instruction you give prixie whatsoever.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <ServiceCard name="own server" status="turnkey setup">
                turnkey setup running on hardware owned by you or dedicated vps
              </ServiceCard>
              <ServiceCard name="google cloud" status="future support">
                connect to any google cloud infrastructure you've already setup
              </ServiceCard>
              <ServiceCard name="aws cloud" status="future support">
                connect to amazon aws cloud infrastructure you've already setup
              </ServiceCard>
              <ServiceCard name="azure" status="future support">
                connect to microsoft azure infrastructure you've already setup
              </ServiceCard>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="communication" className="border-x border-b border-primary">
        <h2 id="communication" className="border-b border-primary px-4 py-3 text-lg font-semibold text-primary">communication</h2>
        <div className="grid md:grid-cols-2">
          <div className="border-b border-primary p-4 md:border-r md:border-b-0">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><Mail size={16} aria-hidden="true" />email</h3>
            <ServiceCard name="agentmail" status="mail layer">
              prixie's dedicated inbox receives invitations, registration confirmations, and meeting links, and carries contact and notification messages around the session.
            </ServiceCard>
          </div>
          <div className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><MessageSquare size={16} aria-hidden="true" />texting</h3>
            <ServiceCard name="photon.codes" status="imessage/rcs fallback (free tier)">
              sends &amp; receives imessages / sms via photon free tier from the shared number pool from limited ten whitelisted phone numbers or imessage emails that can include links for meetings or requests etc.
            </ServiceCard>
          </div>
        </div>
        <div className="border-t border-primary p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary"><Phone size={16} aria-hidden="true" />dedicated phone number</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <ServiceCard name="getdial.ai" status="still considering" muted>
              a candidate provider for dedicated phone numbers, not a built rail.
            </ServiceCard>
            <ServiceCard name="agentphone.ai" status="still considering" muted>
              a candidate provider for dedicated phone numbers, not a built rail.
            </ServiceCard>
          </div>
        </div>
      </section>

      <section aria-labelledby="payments" className="border-x border-b border-primary">
        <h2 id="payments" className="border-b border-primary px-4 py-3 text-lg font-semibold text-primary">payments</h2>
        <div className="p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ServiceCard name="kernel.sh vault" status="approval-based checkout">
              keeps card details inside an approved checkout browser rather than exposing them to the agent.
            </ServiceCard>
            <ServiceCard name="agentcard.ai" status="single-use card rail">
              provides capped, single-use cards for checkout handoffs. live payment gateway validation remains outstanding.
            </ServiceCard>
            <ServiceCard name="agentcard.sh" status="future candidate" muted>
              a candidate for future payment support, not a built rail.
            </ServiceCard>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            the current payment design only proceeds when a promo code produces a clearly readable $0 checkout total. paid registration and unreadable totals remain blocked. this preview cannot make payments.
          </p>
        </div>
      </section>

      <section aria-labelledby="voice" className="border-x border-b border-primary">
        <div className="flex items-center gap-3 border-b border-primary px-4 py-3 text-primary">
          <Mic size={18} aria-hidden="true" />
          <h2 id="voice" className="text-lg font-semibold">voice</h2>
        </div>
        <div className="grid md:grid-cols-2">
          <div className="border-b border-primary p-4 md:border-r md:border-b-0">
            <h3 className="mb-2 text-sm font-semibold">real-time audio</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              audio moves through the session as it happens, rather than waiting for a recording to finish. listening and transcription capture what is said; speaking lets prixy ask prepared questions when participation is permitted.
            </p>
          </div>
          <div className="space-y-3 p-4">
            <ServiceCard name="livekit" status="speaking">
              the real-time voice layer for spoken participation and asking prepared questions in an already-joined call.
            </ServiceCard>
            <ServiceCard name="assembly.ai" status="transcription">
              turns session audio into text for focused listening, answer capture, and transcript material.
            </ServiceCard>
          </div>
        </div>
      </section>

      <section aria-labelledby="video" className="border-x border-b border-primary">
        <div className="flex items-center gap-3 border-b border-primary px-4 py-3 text-primary">
          <Video size={18} aria-hidden="true" />
          <h2 id="video" className="text-lg font-semibold">video</h2>
        </div>
        <div className="grid md:grid-cols-2">
          <div className="border-b border-primary p-4 md:border-r md:border-b-0">
            <ServiceCard name="obs studio" status="capture and composition">
              assembles video sources into a scene and supports capture or a virtual-camera output for the visual presence workflow.
            </ServiceCard>
          </div>
          <div className="space-y-3 p-4">
            <ServiceCard name="masky.ai" status="integrated via api">
              the product's video presence layer has been integrated via api for rendering a visual representative. this public preview does not run that connection.
            </ServiceCard>
            <ServiceCard name="cantina.com" status="frozen / muted for now" muted>
              an alternative video direction on hold, outside the active provider plan.
            </ServiceCard>
          </div>
        </div>
      </section>

      <section aria-labelledby="screenshare" className="border-x border-b border-primary">
        <div className="flex items-center gap-3 border-b border-primary px-4 py-3 text-primary">
          <Monitor size={18} aria-hidden="true" />
          <h2 id="screenshare" className="text-lg font-semibold">screenshare</h2>
          <span className="ml-auto inline-flex items-center border border-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">coming soon</span>
        </div>
        <div className="p-4">
          <ServiceCard name="aixplore" status="in development" muted>
            spawnables for the agent family, predominantly powering prixie's screensharing capabilities for projects outside prixie's browser capabilities.
          </ServiceCard>
        </div>
      </section>

      <section aria-labelledby="context-memory" className="border-x border-b border-primary">
        <div className="flex items-center gap-3 border-b border-primary px-4 py-3 text-primary">
          <Database size={18} aria-hidden="true" />
          <h2 id="context-memory" className="text-lg font-semibold">context &amp; memory layer</h2>
        </div>
        <div className="p-4">
          <ServiceCard name="retelldb" status="in beta use">
            the context and memory layer keeping prixie's session context and remembered details in one place.
          </ServiceCard>
        </div>
      </section>
    </article>
  );
}