# features

## event registration

prixy is intended to register for supported digital events when registration is required for attendance.

## virtual attendance

prixy joins supported meetings and events as the user's delegated presence. attendance handling depends on the rules and technical support of each platform.

## focused listening

the user gives prixy a concrete information goal. prixy follows the session with that goal in mind instead of assuming a generic recap is useful.

## prepared questions

the user can specify questions before the session. prixy waits for an appropriate opportunity to ask them and captures the response.

## precise retrieval

prixy returns requested details such as a decision, deadline, price, availability date, answer, or live promo code.

## source retention

transcripts and supporting material can be retained for later inspection. collecting the source does not force the user to consume it.

## account and identity handling

prixy is intended to attend as you, which means signed-in sessions, switching between the account that matches the meeting, watching more than one inbox for links and invitations, and syncing multiple calendars. camera and mic are off by default, with a configurable join delay.

## joining paths

a session can reach prixy in several ways: a link already sitting in your calendar, an invitation that arrives in an inbox beforehand, a call started live in discord or slack, a pre-registration or booking flow on luma, eventbrite, or calendly, or a link dropped into a channel or forum during the session window.

## platform coverage

meeting coverage is split into two join paths. the bot path covers zoom, google meet, microsoft teams, slack huddles, and cisco webex through a managed meeting-bot service. the browser path covers discord, bluejeans, ringcentral, and anything else with a browser join url through headless browser automation. capture logic is identical on both paths.

## responsive public site

the current build includes a responsive public site with dedicated index, purpose, problem, philosophy, about, features, features/capabilities, features/supports, suite, roadmap, and how-it-runs routes. the features page is organised into capabilities, stack, and considerations sections. suite, roadmap, and how it runs are grouped in a multi-column footer, separate from the primary product navigation.

## execution notes

how it runs explains browser, mail, payment, voice, and video layers without connecting any providers in this preview. browserbase has a cloud asynchronous service card, with kernel.sh muted and labelled secondary. mail & contact and payment have separate service-card groups. agentmail handles meeting mail; kernel.sh vault and agentcard.ai describe the payment rails, with agentcard.sh a candidate.

voice pairs an explanation of real-time audio with cards for livekit speaking and assembly.ai transcription. video pairs obs studio with masky.ai, which has been integrated via api in the product, and a frozen, muted cantina.com card beneath it. this integration status describes the product, not a live connection in the public preview.

## agent family

the suite lists milo, jerry, and moira in that order, all in development. milo covers memory and context, jerry is the jerryrigging agent, and moira's role has not yet been announced.

## payment and context roadmap

the roadmap distinguishes designed capabilities from verified ones. kernel.sh vault and agentcard.ai are documented payment rails that still need live gateway validation; agentcard.sh is a future candidate. the documented checkout rule requires a clearly readable $0 total after a promo code and blocks nonzero or unreadable totals. shared personal context is intended to carry identity, preferences, and ongoing threads across presence surfaces, but is not complete.