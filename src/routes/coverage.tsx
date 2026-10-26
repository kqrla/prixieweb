import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BigHeading,
  BriefNote,
  DocBox,
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
          "what prixie can actually do today, per surface: shipped, partial, or not built. every row is the state of the repo at the time of writing, not a wish.",
      },
      { property: "og:title", content: "coverage | the honest state of the build" },
      {
        property: "og:description",
        content:
          "shipped, partial, and not-built surfaces, listed per section. rows without prose are the ones that are not built yet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoveragePage,
});

type CoverageRow = {
  name: string;
  status: string;
  note?: string;
};

/*
  a row carries prose only when the thing is shipped (working, partial, or built
  with a named gate). everything else renders bare: name and status, no prose.
  the status text itself decides: notes are written only on shipped rows.
*/
function isShipped(status: string) {
  return /^(working|partial|built)/.test(status.trim());
}

function CoverageTable({ rows }: { rows: CoverageRow[] }) {
  return (
    <div className="overflow-x-auto border border-primary">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-primary">
            {["item", "status", "notes"].map((heading) => (
              <th
                key={heading}
                className="px-3 py-2 text-[10px] font-normal uppercase tracking-[0.18em] text-primary opacity-60"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const shipped = isShipped(row.status);
            return (
              <tr
                key={row.name}
                className={rowIndex < rows.length - 1 ? "border-b border-primary" : ""}
              >
                <td
                  className={`px-3 py-2 text-xs ${
                    shipped ? "font-semibold text-primary" : "text-muted-foreground"
                  }`}
                >
                  {row.name}
                </td>
                <td
                  className={`px-3 py-2 text-xs whitespace-nowrap ${
                    shipped ? "font-semibold text-primary" : "text-muted-foreground"
                  }`}
                >
                  {row.status}
                </td>
                <td className="px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                  {row.note ?? ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const meetingPlatforms: CoverageRow[] = [
  {
    name: "zoom",
    status: "working",
    note: "zoom web sdk as a real participant, with the browserbase join as the fallback path. chat, reactions and raise hand all work; the q&a panel is webinar-scoped, she tries with no promises. waiting room: she joins and waits.",
  },
  {
    name: "google meet",
    status: "working",
    note: "browserbase join engine, anonymous by default — the default auth mode for meet.",
  },
  {
    name: "microsoft teams",
    status: "working",
    note: "browserbase join engine, anonymous guest path.",
  },
  {
    name: "discord (watching)",
    status: "working",
    note: "the room watch is live: one gateway connection per server reads voice states and scheduled events, so a call being open is a fact she sees, not a guess. verified oct 22 2026: dm calls and group dm calls are invisible to bots.",
  },
  { name: "discord (joining)", status: "planned" },
  {
    name: "slack",
    status: "partial (channel scan)",
    note: "live_links scans slack channels for links posted in real time. joining a huddle is planned: slack's api does not surface huddle links to apps, so the path would be browser, not api.",
  },
  { name: "ringcentral", status: "planned" },
  { name: "bluejeans", status: "planned" },
  { name: "webex / gather.town / others", status: "planned" },
];

const calendarSync: CoverageRow[] = [
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
  {
    name: "cal.com",
    status: "working",
    note: "v2 bookings api as a calendar source.",
  },
  {
    name: "zcal",
    status: "working",
    note: "via the host calendar: the booking lands on the host's calendar and she reads it there.",
  },
];

const registration: CoverageRow[] = [
  {
    name: "lu.ma",
    status: "working (register-then-source)",
    note: "the signup gate is the point: she registers first, then reads. events that expose the link to registered guests are joined immediately; events that hold the link until the confirmation hand it to the inbox path, which completes the sourcing when the confirmation arrives.",
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
  {
    name: "zcal",
    status: "working",
    note: "via the host calendar, the same way calendar sync reads it.",
  },
  { name: "eventbrite", status: "planned" },
  { name: "zoom webinars / teams live events", status: "planned" },
];

const consent: CoverageRow[] = [
  {
    name: "necessary-only cookies",
    status: "working",
    note: "she picks reject-all / only-necessary from the banner's buttons; an accept-only banner is left standing and reported, a close button is a dismissal, never an agreement. the walk rides every navigation: join pages, registrations, doc side sessions, recap fetches.",
  },
  {
    name: "no newsletters",
    status: "working",
    note: "opt-in boxes are never checked — a pre-checked one is the site's yes, not hers, and gets unchecked. opt-out boxes, tick-to-not-be-added, are always hers and she ticks them, recorded on the receipt.",
  },
];

const linkSources: CoverageRow[] = [
  {
    name: "email",
    status: "working",
    note: "the agentmail inbox is link sourcing's first citizen: forward the invite to her dedicated address, the webhook parses it and the meeting url is found. no time in the email means she joins in 5 minutes.",
  },
  {
    name: "imessage (photon.codes)",
    status: "built, never live-run",
    note: "the mac blocker is gone: photon hosts the apple hardware, the free tier carries up to 10 users on a whitelist, rcs/sms fallback included, and email-addressed imessage works. the webhook is hmac-signed with 5-minute freshness and verified against the raw body; the whitelist is anne's only, unset means a closed door; the relay back rides the same conversation and refuses non-whitelisted recipients structurally. needs the photon project creds and webhook registration to go live. honest limits: the shared pool means no group chats on free, green-bubble traffic is carrier-filtered, and apple suppresses links in first messages from unknown numbers — anne is the first message by design.",
  },
  {
    name: "slack channels",
    status: "working",
    note: "scanned for links posted in real time.",
  },
  {
    name: "discord channels",
    status: "working",
    note: "scanned the same way; the room watch covers the calls themselves.",
  },
  {
    name: "forums",
    status: "working",
    note: "subreddits, discourse forums, mlh events.",
  },
  {
    name: "calendar itself",
    status: "working",
    note: "a calendar event that carries its own join url is sourced directly, no other channel needed.",
  },
  {
    name: "chat posts in-meeting",
    status: "working",
    note: "once she is in a meeting, links posted in chat are captured.",
  },
];

const relayBack: CoverageRow[] = [
  {
    name: "email (agentmail outbound)",
    status: "working",
    note: "the take-home goes to the owner's address using the creds she already has from the inbound side.",
  },
  { name: "imessage", status: "not built" },
  { name: "signal", status: "not built" },
  { name: "whatsapp", status: "not built" },
  { name: "telegram", status: "not built" },
  { name: "line", status: "not built" },
  { name: "wechat", status: "not built" },
  { name: "slack dm", status: "not built" },
  { name: "discord dm", status: "not built" },
  { name: "sms", status: "not built" },
];

const streaming: CoverageRow[] = [
  {
    name: "twitch",
    status: "working (streaming)",
    note: "the obs bridge speaks the obs protocol and the stream key rides the env; she goes live as a stream session with the camera toggle honest. joining a stream to read and comment is webinar mode, planned.",
  },
  {
    name: "kick",
    status: "working (streaming)",
    note: "same obs bridge: adding a platform was adding a file. webinar mode, planned, same shape.",
  },
  { name: "youtube live", status: "planned" },
];

const socialSurfaces: CoverageRow[] = [
  { name: "calls (meeting / livekit)", status: "16:9, 1280x720" },
  {
    name: "youtube — long form",
    status: "16:9, 1920x1080",
    note: "4k 3840x2160 supported. burned captions live in the bottom tenth; end screens cover the edges late in the video.",
  },
  {
    name: "youtube — shorts",
    status: "9:16, 1080x1920",
    note: "up to 3 mins. 14 percent top and bottom ui safe bands (title, engagement rail, comment band).",
  },
  {
    name: "youtube — thumbnail",
    status: "16:9, 3840x2160",
    note: "2026 guidance. the duration badge covers the bottom-right corner: nothing critical there.",
  },
  {
    name: "twitch — vod / republish",
    status: "16:9, 1920x1080",
    note: "the vod inherits the broadcast; the to-youtube republish is a corner-cam composite, not a crop.",
  },
  {
    name: "tiktok — vertical",
    status: "9:16, 1080x1920",
    note: "14 percent top and bottom ui safe bands.",
  },
  {
    name: "instagram / facebook — reels / stories",
    status: "9:16, 1080x1920",
    note: "14 percent top and bottom ui safe bands, same shape as shorts.",
  },
  { name: "instagram / facebook — feed", status: "4:5, 1080x1350" },
  { name: "instagram / facebook — carousel", status: "1:1, 1080x1080" },
  { name: "pinterest — standard pin", status: "2:3, 1000x1500" },
];

const recaps: CoverageRow[] = [
  {
    name: "youtube unlisted link",
    status: "working",
    note: "the video is fetched, assembly.ai transcribes it, retelldb ingests it, capture requests are answered against it. the first-class path: someone sends her the unlisted link.",
  },
  {
    name: "youtube live recap",
    status: "working",
    note: "the same pipeline on the live vod once it exists as a recording.",
  },
  {
    name: "twitch rewatch",
    status: "partial",
    note: "the transport is real and covers twitch vods, but the end-to-end pass has not been exercised on one yet. the pipe is built, the run has not happened.",
  },
  { name: "sequel.io link rewatch", status: "planned" },
];

const preMeeting: CoverageRow[] = [
  {
    name: "capture requests",
    status: "working",
    note: "pre-assigned per meeting: what to fetch, what to ask, what to mark attendance. keywords, questions and screenshot flags all ride on the meeting's requests.",
  },
  {
    name: "expiry urgency from the words said",
    status: "working",
    note: "she extracts the window the speaker actually gave — \"expires in 10 minutes\", \"expires at 3pm eastern\" — and it lands on the capture row and in the notify subject. never a guess: no expiry-shaped sentence heard means the honest generic line, and a clock with no zone is quoted, not invented. announcements usually precede the code, so the last window heard per call is remembered and the capture inherits it.",
  },
  {
    name: "prepared questions",
    status: "working",
    note: "assigned pre-meeting; asking them out loud is the voice transport (see the q&a flow below).",
  },
  { name: "profile / persona selection", status: "designed" },
  {
    name: "colloquial timezone conversion",
    status: "working",
    note: "\"3pm ist\", \"tomorrow 9am pt\" style prose converts through the source zone exactly once, whatever zone the server runs in; email subjects parse through the same path, anchored to the email's own date.",
  },
  {
    name: "the docket",
    status: "working",
    note: "not a schedule: each meeting is a watch with approximate details, regenerated from the live list every cycle, never a promise.",
  },
  {
    name: "doc access",
    status: "working",
    note: "pre-meeting doc fetching for context she should walk in with.",
  },
  {
    name: "join delay scheduling",
    status: "working",
    note: "the default trigger: she joins n minutes after start, set per meeting.",
  },
  {
    name: "participant-triggered join",
    status: "working",
    note: "hold until n humans are already inside, read from the pre-join page. a page that will not say is a hold, never a guess.",
  },
];

const duringJoining: CoverageRow[] = [
  {
    name: "waiting room handling",
    status: "working",
    note: "\"asked\" is not \"in\": success is the in-call ui being seen, never a clicked button. nobody answering means she asks again on a bounded cadence, and every ask is counted on the result.",
  },
  {
    name: "join triggers",
    status: "working",
    note: "delay (the default), participants (n humans already inside, from the pre-join page read), or room_open — the discord watcher's state: a voice channel with occupants is the call happening, the schedule was a guess.",
  },
  {
    name: "auth modes",
    status: "working",
    note: "anonymous by default; a zoom signature is signed when the meeting wants a signed participant; registration-gated events follow register-then-source.",
  },
  {
    name: "zoom registration links",
    status: "built, never live-run",
    note: "a zoom register link is a signup, not a join: she fills the form in a side session with the form identity (never the owner's), reads the real join link off the confirmation page, records it, and joins that. if zoom emails the link instead of showing it, the flow says so and stops.",
  },
  {
    name: "camera off",
    status: "working",
    note: "she joins silently: camera off by default, always.",
  },
  {
    name: "mic off",
    status: "working",
    note: "mic off by default; it turns on only for the voice feature's speaking turns.",
  },
  {
    name: "late join",
    status: "working",
    note: "she joins ongoing meetings gracefully; the docket does not judge it.",
  },
  {
    name: "join url safety",
    status: "working",
    note: "every url is checked before she follows it: the redirect chain is walked in house so no third party ever sees the url, marketing params are stripped before the first ping, every hop is re-gated, and it fails closed on loops and broken chains. sessions only ever open the destination — the shortener hop and its pixels are told, never visited.",
  },
  {
    name: "one bot per meeting",
    status: "working",
    note: "the deploy claims the row before the join runs, as a lease with a heartbeat: a live deploy touches it every 5 minutes, and only a claim whose holder died is swept back. the cycle also skips while the previous one is still running.",
  },
];

const postJoining: CoverageRow[] = [
  {
    name: "attendance via chat",
    status: "working",
    note: "\"present!\" style messages in the meeting chat, per the meeting's attendance method; what was sent, when, and why is recorded.",
  },
  {
    name: "attendance via form link",
    status: "working",
    note: "pre-set attendance forms are filled; the fill is recorded as the attendance receipt.",
  },
  {
    name: "attendance forms found in chat",
    status: "working",
    note: "a form link posted in-meeting that the host language marks as attendance is filled; a bare form link with no attendance context is not hers to touch.",
  },
  {
    name: "chat monitor",
    status: "working",
    note: "installs the moment the page says she is in the room: immediate joins, waiting-room admissions at the entry transition, late joins the same way. idempotent, so no double-reporting.",
  },
  {
    name: "transcript retrieval",
    status: "working",
    note: "assembly.ai transcription through the meeting transcript pipeline.",
  },
  {
    name: "capture request answering",
    status: "working",
    note: "keywords watched in chat and transcript; screenshots on request; chat links captured; answers recorded per request.",
  },
  {
    name: "term detection",
    status: "working",
    note: "codes, access info, and other take-home terms picked from the live text.",
  },
  {
    name: "host identification",
    status: "working",
    note: "the host name is read from the room and carried into the take-home.",
  },
  {
    name: "relay back to owner",
    status: "working (email)",
    note: "the notifyOwner seam. the imessage relay is built and whitelist-gated, awaiting a live run; the rest of the channel list above is the honest not-built remainder.",
  },
];

const interactive: CoverageRow[] = [
  {
    name: "q&a flow",
    status: "working",
    note: "she waits for the \"any questions?\" moment, watches raised hands, asks permission in chat, and posts her question in the window.",
  },
  {
    name: "raise hand",
    status: "working",
    note: "zoom web sdk participant path.",
  },
  {
    name: "chat messages",
    status: "working",
    note: "she posts in meeting chat: questions, attendance marks.",
  },
  {
    name: "chat dm to one person",
    status: "working",
    note: "she can speak to the whole room or dm one person. the one rule: a dm that cannot be made is never broadcast as a fallback — the host's \"participants can chat with\" setting is the honest gate, never bypassed.",
  },
  {
    name: "screenshare control",
    status: "working",
    note: "she does not share a screen in general; the show-and-tell moment is the on-demand microvm's job. the seams are the switch: the page seam first, the dom share button as the fallback. from a cloud browser she shares the page's own view, no standing vm.",
  },
  {
    name: "reactions",
    status: "working",
    note: "zoom web sdk participant reactions.",
  },
  {
    name: "asking out loud (voice)",
    status: "working (transport)",
    note: "the q&a flow coordinates when to speak; the livekit audio transport does the speaking. barging and interruption handling are the transcription engine's job, never custom logic.",
  },
  { name: "breakout rooms", status: "designed" },
  { name: "screenshare awareness", status: "planned" },
];

const takeHome: CoverageRow[] = [
  {
    name: "full transcript",
    status: "working",
    note: "the complete transcript, searchable; assembly.ai is the engine.",
  },
  {
    name: "capture answers",
    status: "working",
    note: "every capture request answered with what was found: captured content, links, screenshots.",
  },
  {
    name: "answers with timestamps",
    status: "working",
    note: "h:mm:ss citations back into the transcript, never a summary standing in for the source.",
  },
  {
    name: "the questions you asked her to ask",
    status: "working",
    note: "the answer to each prepared question, quoted from the room.",
  },
  {
    name: "attendance receipts",
    status: "working",
    note: "the message text, sent time and status, and trigger for every attendance mark, plus form fills.",
  },
  {
    name: "codes and access info",
    status: "working",
    note: "take-home terms relayed verbatim, never paraphrased.",
  },
  {
    name: "screenshots",
    status: "working",
    note: "captured on request, stored, linked in the take-home.",
  },
  {
    name: "summaries",
    status: "working (only when asked)",
    note: "a summary is never sent unless the owner specifically asked for one: the default take-home is the transcript, the answers, and the receipts.",
  },
];

const formPlatforms: CoverageRow[] = [
  {
    name: "google forms",
    status: "working (verified)",
    note: "the only one live-proven: the attendance flow runs on it end to end.",
  },
  {
    name: "tally.so",
    status: "working in principle",
    note: "a published tally inspected: real dom radio inputs and a real submit button, whole form on one page. never live-filled.",
  },
  {
    name: "surveymonkey",
    status: "working in principle",
    note: "the per-screen advance loop is built: fill the screen, click next until a submit-shaped button, max 15 screens, with the newsletter and card rules riding every screen. recaptcha on free plans can stop her cold, and that would be told, not hidden. never live-filled.",
  },
  {
    name: "typeform",
    status: "working in principle",
    note: "the same advance loop, one question per screen. the homepage demos are marketing mockups; a real link is the first verified row upgrade. never live-filled.",
  },
  { name: "jotform", status: "presumed" },
  { name: "fillout", status: "presumed" },
  { name: "airtable forms", status: "presumed" },
  { name: "microsoft forms", status: "needs a probe first" },
];

const unsuccessful: CoverageRow[] = [
  {
    name: "the waiting room never answers",
    status: "working",
    note: "she asks again on a bounded cadence, every ask counted on the result; still ignored is waiting_room, not failed. she does not give up silently and she never fakes success.",
  },
  {
    name: "the join attempt fails",
    status: "partial",
    note: "the failure is recorded honestly, the reason kept. one deploy attempt per meeting today; a retry ladder is planned. duplicate deployment is closed.",
  },
  {
    name: "a shared file she cannot open",
    status: "working",
    note: "she reads the access state in a side session, tries the request-access flow, and asks the host in the chat by name; one attempt per link per meeting. never assumed open, never assumed requested.",
  },
  {
    name: "a time-bound promo code with no straightforward place to apply it",
    status: "planned",
  },
];

const understanding: CoverageRow[] = [
  { name: "persona context", status: "designed" },
  {
    name: "technical term detection",
    status: "working",
    note: "codes, access info, and jargon pulled from the live text verbatim.",
  },
  {
    name: "multilingual: hinglish transliteration",
    status: "working",
    note: "hinglish renders latin script, phonetically written, italics on the hinglish portion; devanagari never in the take-home.",
  },
  {
    name: "multi-speaker transcript parsing",
    status: "working",
    note: "diarization with speaker labels end to end: capture keyword hits carry the speaker, host reads carry the name.",
  },
  {
    name: "screenshare, call voice, and chat treated hand in hand",
    status: "working",
    note: "chat and spoken prompts count equally in the q&a flow, the voice agent pauses through screen-share setup silence, and the chat monitor runs beside the transcript. reading the share's contents is a later step.",
  },
];

const horizon: CoverageRow[] = [
  { name: "voice: her own phone number", status: "planned" },
  { name: "context across calls", status: "planned" },
  {
    name: "payments: the two rails",
    status: "built, not exercised",
    note: "one walk shared by two rails. the kernel rail: a persistent wallet card enrolled once plus one ephemeral card per checkout, capped and consumed at first use, with the approval link parked and a fail closed on silence. the agentcard rail: a one-time card capped to the requested amount, dead in 7 days, approval-free. the money rule is unchanged: handoff fires only on the card gate plus a promo code, and completes only on a parsed $0 total. neither rail has been exercised against a live gateway.",
  },
  { name: "payments: agent pay paths, 3ds loops, wallet crypto", status: "not built, on purpose" },
  { name: "wallet / identity rails beyond the agentcard test account", status: "planned" },
  { name: "her own cloud vm", status: "planned" },
  { name: "her own password manager", status: "planned" },
  { name: "vtuber-esque features", status: "planned" },
  { name: "multilingual coverage beyond english", status: "planned" },
  { name: "book a meeting with her", status: "planned" },
  { name: "she hosts meetings", status: "planned" },
  { name: "an oss join engine", status: "planned" },
];

function CoveragePage() {
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
        every row is the honest state of the build at the time of writing, not a wish.
        <span className="ml-1 font-semibold">working</span> = shipped, tested, in the loop.
        <span className="ml-1 font-semibold">partial</span> = shipped with a named limit.
        <span className="ml-1 font-semibold">designed</span> = the fields exist, the flow is not
        built. <span className="ml-1 font-semibold">planned</span> = on the map, nothing built.
        rows without prose are the ones that are not built yet, listed bare on purpose.
      </BriefNote>

      <StripLabel>coverage</StripLabel>
      <BigHeading>
        the honest
        <br />
        state.
      </BigHeading>

      <DocBox label="meeting platforms">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          the platforms she can join, and how she gets in the room.
        </p>
        <CoverageTable rows={meetingPlatforms} />
      </DocBox>

      <DocBox label="calendar sync">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          where meetings are discovered before the link ever lands anywhere else.
        </p>
        <CoverageTable rows={calendarSync} />
      </DocBox>

      <DocBox label="registration through">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          where she registers for an event when the link is behind a signup.
        </p>
        <CoverageTable rows={registration} />
      </DocBox>

      <DocBox label="consent">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          the standing rules: she never ever accepts cookies that are not necessary, and she never
          ever opts into newsletters. not per-site judgment — a policy module every surface shares,
          and the banner walk rides every navigation.
        </p>
        <CoverageTable rows={consent} />
      </DocBox>

      <DocBox label="source links through">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          every way a meeting link can reach her, monitored live.
        </p>
        <CoverageTable rows={linkSources} />
      </DocBox>

      <DocBox label="relay information back">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          how what she learned gets back to the owner. every later channel plugs into the same
          seam; that is the whole design of it.
        </p>
        <CoverageTable rows={relayBack} />
      </DocBox>

      <DocBox label="streaming coverage">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          she is not only in meetings: she streams. joining a stream as a webinar (reading the
          stream, commenting) is the roadmap shape for twitch, kick and youtube live alike.
        </p>
        <CoverageTable rows={streaming} />
      </DocBox>

      <DocBox label="social media presence">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          the pipeline renders, it never publishes: captions, attribution, and posting stay with
          the creator. dimensions are the platforms' own reference, not a second invented set.
        </p>
        <CoverageTable rows={socialSurfaces} />
      </DocBox>

      <DocBox label="recaps">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          a meeting missed is not a meeting lost. someone sends the recording link, and the recap
          pass turns it into the same take-home a live meeting gets — with h:mm:ss citations back
          into the source, never a summary standing in for it.
        </p>
        <CoverageTable rows={recaps} />
      </DocBox>

      <DocBox label="pre-meeting checklist">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          what she has assigned and prepared before she ever joins.
        </p>
        <CoverageTable rows={preMeeting} />
      </DocBox>

      <DocBox label="during joining checklist">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          what happens between the join url and being in the room.
        </p>
        <CoverageTable rows={duringJoining} />
      </DocBox>

      <DocBox label="post joining checklist">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          what she does once she is in the room.
        </p>
        <CoverageTable rows={postJoining} />
      </DocBox>

      <DocBox label="interactive participation">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          how she takes part in the room, not just listens.
        </p>
        <CoverageTable rows={interactive} />
      </DocBox>

      <DocBox label="take home">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          what is waiting for the owner after the meeting ends.
        </p>
        <CoverageTable rows={takeHome} />
      </DocBox>

      <DocBox label="form platforms she can fill">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          the fill engine is engine-agnostic: it walks standard dom selectors, types the form
          identity, aligns newsletter boxes, refuses card fields, and clicks one submit — so the
          honest answer per platform is about page structure, not brand.
        </p>
        <CoverageTable rows={formPlatforms} />
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          single-page standard-dom forms are hers. one-screen-at-a-time engines have the advance
          step built, never live-filled. every \"presumed\" row becomes \"working (verified)\" the
          first time a real link of that engine is filled, and not before.
        </p>
      </DocBox>

      <DocBox label="unsuccessful attempts">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          what she does when the answer is no. she does not give up silently and she never fakes
          success: she asks again, or asks someone, and the receipt says exactly what happened.
        </p>
        <CoverageTable rows={unsuccessful} />
      </DocBox>

      <DocBox label="improved understanding">
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
          the reading that makes the transcript more than text.
        </p>
        <CoverageTable rows={understanding} />
      </DocBox>

      <DocBox label="on the horizon" filled>
        <p className="mb-3 text-xs leading-relaxed opacity-80">
          not promises, direction. entries wait until they are built — the payments rails are the
          one already standing. candidates read for the oss join engine, none built:
          browserstation, steel.dev, browserless.io, camofox-browser, kernel.sh.
        </p>
        <CoverageTable rows={horizon} />
      </DocBox>

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
