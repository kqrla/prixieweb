import { createFileRoute, Link } from "@tanstack/react-router";
import { Pause } from "lucide-react";
import type { ReactNode } from "react";
import {
  BigHeading,
  BriefNote,
  MetaRow,
  StripLabel,
} from "../components/prixy/document-parts";

export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "coverage | the honest state of the build" },
      {
        name: "description",
        content:
          "what prixie can actually do today, per surface: shipped, partial, or not built.",
      },
      { property: "og:title", content: "coverage | the honest state of the build" },
      {
        property: "og:description",
        content:
          "shipped, partial, and not-built surfaces, listed per section. muted cards are the ones not built yet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoveragePage,
});

type CoverageItem = {
  name: string;
  status: string;
  note?: ReactNode;
};

/*
  same card treatment as /how-it-runs: one card per surface, even when part of
  it is not built yet — the status says the state. notes only ride shipped
  cards; muted cards stay bare on purpose.
*/
function CoverageCard({ item }: { item: CoverageItem }) {
  const shipped = !/^(planned|not built|designed|presumed|needs a probe)/.test(item.status);
  return (
    <div
      className={`border border-primary p-3 ${
        shipped ? "text-foreground" : "bg-secondary/40 text-muted-foreground"
      }`}
    >
      <div
        className={`mb-2 flex items-center gap-2 text-[10px] ${
          shipped ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {!shipped && <Pause size={12} aria-hidden="true" />}
        {item.status}
      </div>
      <h4 className={`text-sm font-semibold ${item.note ? "mb-2" : ""}`}>{item.name}</h4>
      {item.note && (
        <p className="text-xs leading-relaxed text-muted-foreground">{item.note}</p>
      )}
    </div>
  );
}

function CoverageSection({
  id,
  title,
  items,
  columns = 3,
  filled = false,
}: {
  id: string;
  title: string;
  items: CoverageItem[];
  columns?: 2 | 3;
  filled?: boolean;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`border-x border-b border-primary ${filled ? "bg-primary text-primary-foreground" : ""}`}
    >
      <h2
        id={id}
        className={`border-b px-4 py-3 text-lg font-semibold ${
          filled ? "border-primary-foreground/30" : "border-primary text-primary"
        }`}
      >
        {title}
      </h2>
      <div className={`grid gap-3 p-4 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
        {items.map((item) => (
          <CoverageCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

const sections: { id: string; title: string; columns?: 2 | 3; items: CoverageItem[] }[] = [
  {
    id: "meeting-platforms",
    title: "meeting platforms",
    items: [
      {
        name: "zoom",
        status: "working",
        note: "zoom web sdk as a real participant, with the browserbase join as the fallback path. chat, reactions and raise hand all work; waiting room: she joins and waits.",
      },
      {
        name: "google meet",
        status: "working",
        note: "browserbase join engine, anonymous by default.",
      },
      {
        name: "microsoft teams",
        status: "working",
        note: "browserbase join engine, anonymous guest path.",
      },
      {
        name: "discord",
        status: "partial (watching)",
        note: "the room watch is live: one gateway connection per server reads voice states and scheduled events. joining the call itself is planned.",
      },
      {
        name: "slack",
        status: "partial (channel scan)",
        note: "live_links scans slack channels for links posted in real time. joining a huddle is planned.",
      },
      { name: "ringcentral", status: "planned" },
      { name: "bluejeans", status: "planned" },
      { name: "webex / gather.town / others", status: "planned" },
    ],
  },
  {
    id: "calendar-sync",
    title: "calendar sync",
    items: [
      {
        name: "google calendar",
        status: "working",
        note: "automatic meeting discovery, connector-triggered sync workflow, sync tokens.",
      },
      {
        name: "apple calendar",
        status: "working",
        note: "caldav, pulled per cycle from its own creds; unset creds are skipped, never faked.",
      },
      {
        name: "microsoft calendar",
        status: "working",
        note: "outlook via the graph api, per cycle; the same skip rule.",
      },
      {
        name: "notion",
        status: "working",
        note: "calendar source wired into the scheduler alongside the others.",
      },
      { name: "cal.com", status: "working", note: "v2 bookings api as a calendar source." },
      {
        name: "zcal",
        status: "working",
        note: "via the host calendar: the booking lands on the host's calendar and she reads it there.",
      },
    ],
  },
  {
    id: "registration",
    title: "registration through",
    items: [
      {
        name: "lu.ma",
        status: "working (register-then-source)",
        note: "she registers first, then reads: events that expose the link to registered guests are joined immediately; events that hold it until confirmation hand it to the inbox path.",
      },
      {
        name: "calendly",
        status: "working",
        note: "the integration service syncs events and extracts meeting links.",
      },
      {
        name: "cal.com",
        status: "working",
        note: "v2 bookings api: the booking and its join link arrive as a calendar source.",
      },
      { name: "zcal", status: "working", note: "via the host calendar, the same way calendar sync reads it." },
      { name: "eventbrite", status: "planned" },
      { name: "zoom webinars / teams live events", status: "planned" },
    ],
  },
  {
    id: "consent",
    title: "consent",
    columns: 2,
    items: [
      {
        name: "necessary-only cookies",
        status: "working",
        note: "she picks reject-all / only-necessary from the banner's buttons; an accept-only banner is left standing and reported. the walk rides every navigation.",
      },
      {
        name: "no newsletters",
        status: "working",
        note: "opt-in boxes are never checked; opt-out boxes are always hers and she ticks them, recorded on the receipt.",
      },
    ],
  },
  {
    id: "link-sources",
    title: "source links through",
    items: [
      {
        name: "email",
        status: "working",
        note: "forward the invite to her dedicated agentmail address; the webhook parses it and the meeting url is found.",
      },
      {
        name: "imessage (photon.codes)",
        status: "built, never live-run",
        note: "hmac-signed webhook, anne-only whitelist, relay back on the same conversation. needs the photon project creds and webhook registration to go live.",
      },
      { name: "slack channels", status: "working", note: "scanned for links posted in real time." },
      { name: "discord channels", status: "working", note: "scanned the same way; the room watch covers the calls themselves." },
      { name: "forums", status: "working", note: "subreddits, discourse forums, mlh events." },
      { name: "calendar itself", status: "working", note: "a calendar event that carries its own join url is sourced directly." },
      { name: "chat posts in-meeting", status: "working", note: "once she is in a meeting, links posted in chat are captured." },
    ],
  },
  {
    id: "relay-back",
    title: "relay information back",
    items: [
      {
        name: "email (agentmail outbound)",
        status: "working",
        note: "the take-home goes to the owner's address using the creds she already has from the inbound side.",
      },
       { name: "imessage", status: "built, never live-run", note: "photon.codes relay is built and whitelist-gated; awaiting a live run." },
      { name: "whatsapp", status: "not built" },
       { name: "discord", status: "not built" },
       { name: "signal", status: "not built" },
      { name: "telegram", status: "not built" },
      { name: "slack dm", status: "not built" },
       { name: "wechat / line", status: "not built" },
    ],
  },
  {
    id: "streaming",
    title: "streaming coverage",
    items: [
      {
        name: "twitch",
        status: "working (streaming)",
        note: "the obs bridge speaks the obs protocol; she goes live as a stream session with the camera toggle honest.",
      },
      {
        name: "kick",
        status: "working (streaming)",
        note: "same obs bridge: adding a platform was adding a file.",
      },
      { name: "youtube live", status: "planned" },
    ],
  },
  {
    id: "social-surfaces",
    title: "social media presence",
    items: [
      { name: "calls (meeting / livekit)", status: "16:9, 1280x720" },
      {
        name: "youtube",
        status: "supported formats",
        note: "long form: 16:9, 1920x1080, with 4k support and burned captions. shorts: 9:16, 1080x1920, up to 3 mins with ui safe bands. thumbnails: 16:9, 3840x2160, keeping the duration badge clear.",
      },
      {
        name: "twitch",
        status: "supported formats",
        note: "vod / republish: 16:9, 1920x1080. youtube republishing uses a corner-cam composite, not a crop.",
      },
      { name: "tiktok", status: "supported formats", note: "vertical videos: 9:16, 1080x1920, with top and bottom ui safe bands." },
      { name: "instagram", status: "supported formats", note: "reels / stories: 9:16, 1080x1920, with ui safe bands. feed: 4:5, 1080x1350. carousels: 1:1, 1080x1080." },
      { name: "facebook", status: "supported formats", note: "reels / stories: 9:16, 1080x1920, with ui safe bands. feed: 4:5, 1080x1350. carousels: 1:1, 1080x1080." },
      { name: "pinterest", status: "supported formats", note: "standard pins: 2:3, 1000x1500." },
    ],
  },
  {
    id: "recaps",
    title: "recaps",
    items: [
      {
        name: "youtube unlisted link",
        status: "working",
        note: "the video is fetched, assembly.ai transcribes it, retelldb ingests it, capture requests are answered against it.",
      },
      {
        name: "youtube live recap",
        status: "working",
        note: "the same pipeline on the live vod once it exists as a recording.",
      },
      {
        name: "twitch rewatch",
        status: "partial",
        note: "the transport is real and covers twitch vods, but the end-to-end pass has not been exercised on one yet.",
      },
      { name: "sequel.io link rewatch", status: "planned" },
    ],
  },
  {
    id: "pre-meeting",
    title: "pre-meeting",
    items: [
      {
        name: "capture requests",
        status: "working",
        note: "pre-assigned per meeting: what to fetch, what to ask, what to mark attendance.",
      },
      {
        name: "expiry urgency from the words said",
        status: "working",
        note: "she extracts the window the speaker actually gave and it lands on the capture row and in the notify subject.",
      },
      {
        name: "prepared questions",
        status: "working",
        note: "assigned pre-meeting; asking them out loud is the voice transport.",
      },
      {
        name: "colloquial timezone conversion",
        status: "working",
        note: "\"3pm ist\", \"tomorrow 9am pt\" style prose converts through the source zone exactly once.",
      },
      {
        name: "the docket",
        status: "working",
        note: "not a schedule: each meeting is a watch with approximate details, regenerated from the live list every cycle.",
      },
      { name: "doc access", status: "working", note: "pre-meeting doc fetching for context she should walk in with." },
      { name: "join delay scheduling", status: "working", note: "the default trigger: she joins n minutes after start, set per meeting." },
      {
        name: "participant-triggered join",
        status: "working",
        note: "hold until n humans are already inside, read from the pre-join page.",
      },
      { name: "profile / persona selection", status: "designed" },
    ],
  },
  {
    id: "during-joining",
    title: "during joining",
    items: [
      {
        name: "waiting room handling",
        status: "working",
        note: "\"asked\" is not \"in\": success is the in-call ui being seen. nobody answering means she asks again on a bounded cadence.",
      },
      {
        name: "join triggers",
        status: "working",
        note: "delay (the default), participants, or room_open from the discord watcher.",
      },
      {
        name: "auth modes",
        status: "working",
        note: "anonymous by default; a zoom signature when the meeting wants one; registration-gated events follow register-then-source.",
      },
      {
        name: "zoom registration links",
        status: "built, never live-run",
        note: "she fills the form in a side session, reads the real join link off the confirmation page, and joins that.",
      },
      { name: "camera off", status: "working", note: "she joins silently: camera off by default, always." },
      { name: "mic off", status: "working", note: "mic off by default; it turns on only for the voice feature's speaking turns." },
      { name: "late join", status: "working", note: "she joins ongoing meetings gracefully." },
      {
        name: "join url safety",
        status: "working",
        note: "the redirect chain is walked in house, marketing params stripped, every hop re-gated; it fails closed on loops.",
      },
      {
        name: "one bot per meeting",
        status: "working",
        note: "the deploy claims the row before the join runs, as a lease with a heartbeat.",
      },
    ],
  },
  {
    id: "post-joining",
    title: "post joining",
    items: [
      {
        name: "attendance via chat",
        status: "working",
        note: "\"present!\" style messages in the meeting chat, per the meeting's attendance method.",
      },
      {
        name: "attendance via form link",
        status: "working",
        note: "pre-set attendance forms are filled; the fill is recorded as the attendance receipt.",
      },
      {
        name: "attendance forms found in chat",
        status: "working",
        note: "a form link posted in-meeting that the host language marks as attendance is filled.",
      },
      {
        name: "chat monitor",
        status: "working",
        note: "installs the moment the page says she is in the room; idempotent, so no double-reporting.",
      },
      { name: "transcript retrieval", status: "working", note: "assembly.ai transcription through the meeting transcript pipeline." },
      {
        name: "capture request answering",
        status: "working",
        note: "keywords watched in chat and transcript; screenshots on request; answers recorded per request.",
      },
      { name: "term detection", status: "working", note: "codes, access info, and other take-home terms picked from the live text." },
      { name: "host identification", status: "working", note: "the host name is read from the room and carried into the take-home." },
      {
        name: "relay back to owner",
        status: "working (email)",
        note: "the notifyOwner seam. the imessage relay is built and whitelist-gated, awaiting a live run.",
      },
    ],
  },
  {
    id: "interactive",
    title: "interactive participation",
    items: [
      {
        name: "q&a flow",
        status: "working",
        note: "she waits for the \"any questions?\" moment, watches raised hands, asks permission in chat, and posts her question in the window.",
      },
      { name: "raise hand", status: "working", note: "zoom web sdk participant path." },
      { name: "chat messages", status: "working", note: "she posts in meeting chat: questions, attendance marks." },
      {
        name: "chat dm to one person",
        status: "working",
        note: "a dm that cannot be made is never broadcast as a fallback — the host's chat setting is the honest gate.",
      },
      {
        name: "screenshare control",
        status: "working",
        note: "from a cloud browser she shares the page's own view, no standing vm.",
      },
      { name: "reactions", status: "working", note: "zoom web sdk participant reactions." },
      {
        name: "asking out loud (voice)",
        status: "working (transport)",
        note: "the q&a flow coordinates when to speak; the livekit audio transport does the speaking.",
      },
      { name: "breakout rooms", status: "designed" },
      {
        name: "screenshare awareness",
        status: "planned",
        note: "awareness is when someone else is presenting: she follows what is on the shared screen while staying out of the way.",
      },
      {
        name: "share her screen",
        status: "planned",
        note: "sharing is prixie's own screen being shared: she puts her browser work up front for everyone in the room to see.",
      },
    ],
  },
  {
    id: "take-home",
    title: "take home",
    items: [
      { name: "full transcript", status: "working", note: "the complete transcript, searchable; assembly.ai is the engine." },
      { name: "capture answers", status: "working", note: "every capture request answered with what was found." },
      { name: "answers with timestamps", status: "working", note: "h:mm:ss citations back into the transcript." },
      { name: "the questions you asked her to ask", status: "working", note: "the answer to each prepared question, quoted from the room." },
      { name: "attendance receipts", status: "working", note: "message text, sent time and status, and trigger for every attendance mark." },
      { name: "codes and access info", status: "working", note: "take-home terms relayed verbatim, never paraphrased." },
      { name: "screenshots", status: "working", note: "captured on request, stored, linked in the take-home." },
      {
        name: "summaries",
        status: "working (only when asked)",
        note: "a summary is never sent unless the owner specifically asked for one.",
      },
    ],
  },
  {
    id: "form-platforms",
    title: "form platforms she can fill",
    items: [
      {
        name: "google forms",
        status: "working (verified)",
        note: "the only one live-proven: the attendance flow runs on it end to end. for now this is only working for forms that don't require someone to be logged in via their google account which is next up. afterwards we'll tackle when the form requires the sharing of google account connected to go ahead and submit the form.",
      },
      { name: "tally.so", status: "working in principle", note: "real dom radio inputs and a real submit button inspected. never live-filled." },
      { name: "surveymonkey", status: "working in principle", note: "the per-screen advance loop is built; recaptcha on free plans can stop her cold. never live-filled." },
      { name: "typeform", status: "working in principle", note: "the same advance loop, one question per screen. never live-filled." },
      { name: "jotform", status: "presumed" },
      { name: "fillout", status: "presumed" },
      { name: "airtable forms", status: "presumed" },
      { name: "microsoft forms", status: "needs a probe first" },
    ],
  },
  {
    id: "unsuccessful",
    title: "unsuccessful attempts",
    columns: 2,
    items: [
      {
        name: "the waiting room never answers",
        status: "working",
        note: "she asks again on a bounded cadence, every ask counted; still ignored is waiting_room, not failed.",
      },
      {
        name: "the join attempt fails",
        status: "partial",
        note: "the failure is recorded honestly, the reason kept; a retry ladder is planned.",
      },
      {
        name: "a shared file she cannot open",
        status: "working",
        note: "she tries the request-access flow and asks the host in the chat by name; one attempt per link per meeting.",
      },
      { name: "a promo code with no place to apply it", status: "planned" },
    ],
  },
  {
    id: "understanding",
    title: "improved understanding",
    columns: 2,
    items: [
      { name: "technical term detection", status: "working", note: "codes, access info, and jargon pulled from the live text verbatim." },
      {
        name: "multilingual: hinglish transliteration",
        status: "working",
        note: "hinglish renders latin script, phonetically written; devanagari never in the take-home.",
      },
      {
        name: "multi-speaker transcript parsing",
        status: "working",
        note: "diarization with speaker labels end to end: capture hits carry the speaker, host reads carry the name.",
      },
      {
        name: "screenshare, voice, and chat hand in hand",
        status: "working",
        note: "chat and spoken prompts count equally in the q&a flow; the chat monitor runs beside the transcript.",
      },
      { name: "persona context", status: "designed" },
    ],
  },
];

const horizon: CoverageItem[] = [
  {
    name: "voice: her own phone number",
    status: "planned",
    note: "omnichannel phone number for calling, imessage, whatsapp, signal etc. alike instead of a decoupled communication stack.",
  },
  {
    name: "context across calls",
    status: "planned",
    note: "shared context carried over calls and prixie's ability to on call make queries to connected context as well as recognize the same acquantance interacted with across different platforms",
  },
  {
    name: "payments: the two rails",
    status: "built, not exercised",
    note: "the kernel rail (persistent wallet card plus one ephemeral capped card per checkout) and the agentcard rail (one-time capped card, dead in 7 days) share one walk. handoff fires only on the card gate plus a promo code, and completes only on a parsed $0 total.",
  },
  { name: "payments: agent pay paths, 3ds loops, wallet crypto", status: "not built, on purpose" },
  { name: "wallet / identity rails beyond the agentcard test account", status: "planned" },
  {
    name: "her own password manager",
    status: "planned",
    note: <>her own 1password / bitwarden account, or an <a href="https://agent-vault.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">agentvault by infisical</a> connection. currently operates on kernel.sh managed auth.</>,
  },
  {
    name: "swap out subscription dependencies",
    status: "planned",
    note: "right now she depends on, albeit the free tiers of, browserbase / kernel.sh. swapping them out with the oss join engine would allow self-hosting on personal servers and instances.",
  },
  {
    name: "her own cloud machine",
    status: "planned",
    note: "beyond just the browser capabilities: choose per task between disposable ephemeral firecracker vms, or a dedicated persistent computer (using celesto) that can later be switched, frozen, or deleted entirely.",
  },
  {
    name: "vtuber-esque features",
    status: "planned | digital twin infra",
    note: "brings that ability to meetings too, beyond the twitch/livestream features: prixie acts as your autonomous avatar ai digital twin, and hands off to you the moment you want to speak or react yourself w vtuber ai masks like deep-live-cam & persona-live smoothly handing off between the two.",
  },
  {
    name: "global language coverage",
    status: "planned",
    note: "coverage beyond english as well as multilingual usage in the same call with transcript latin-script transliteration.",
  },
  {
    name: "book a meeting with her",
    status: "planned",
    note: "a calendly-like booking option: 1-on-1, or a group limited to people whose emails you add while booking.",
  },
  {
    name: "she hosts meetings",
    status: "planned",
    note: "lu.ma style meetings she hosts; you register and join.",
  },
  {
    name: "double booking calendar connect",
    status: "planned",
    note: "connect prixie inside your calendar and allow assigning tasks in case of double booking",
  },
  {
    name: "auth awareness",
    status: "planned",
    note: "aware of cases where you can only join meetings via a certain type of organization email (university / workspace) etc.  ",
  },
];

function CoveragePage(): ReactNode {
  return (
    <div>
      <MetaRow
        fields={[
          { label: "document", value: "coverage" },
          { label: "parent", value: "behind prixy" },
          { label: "status", value: "honest state" },
          { label: "updated", value: "oct 2026" },
        ]}
      />
      <BriefNote>
        what prixie can do today, and what is still ahead.
      </BriefNote>

      <StripLabel>coverage</StripLabel>
      <BigHeading>
        the honest
        <br />
        state.
      </BigHeading>

      {sections.map((section) => (
        <CoverageSection
          key={section.id}
          id={section.id}
          title={section.title}
          items={section.items}
          columns={section.columns ?? 3}
        />
      ))}

      <CoverageSection id="horizon" title="on the horizon" items={horizon} />

      <div className="flex flex-wrap gap-4 border-x border-b border-primary px-4 py-4">
        <Link
          to="/roadmap"
          className="border-b border-primary text-[10px] uppercase tracking-[0.12em] text-primary"
        >
          roadmap
        </Link>
        <Link
          to="/how-it-runs"
          className="border-b border-primary text-[10px] uppercase tracking-[0.12em] text-primary"
        >
          how it runs
        </Link>
      </div>
    </div>
  );
}
