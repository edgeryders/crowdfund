<template>
  <div class="section md:section-md" id="books">
    <div class="section_title">
      Books &amp; Authors
      <div class="toggle_menu flex md:toggle_menu-md">
        <div
          class="toggle list"
          v-if="$mq == 'md'"
          :class="{ active: view == 'list' }"
          @click="toggleView('list')"
        ></div>
        <div
          class="toggle cards"
          :class="{ active: view == 'cards' }"
          @click="toggleView('cards')"
        ></div>
      </div>
    </div>

    <div class="introduction flex">
      <div class="quote">
        <blockquote v-html="custom.quote.text"></blockquote>
        <a
          class="user"
          target="_blank"
          href="https://edgeryders.eu/t/a-preliminary-synthesis-of-econscifi-activities-so-far/9099"
        >
          <img
            src="https://edgeryders.eu/user_avatar/edgeryders.eu/alex_levene/90/9903_2.png"
          />
          @{{ custom.quote.user }}
        </a>
      </div>
      <div style="float: left" v-html="custom.text"></div>
    </div>

    <div class="cards-container" :class="{ row: view == 'list' }">
      <Row :cards="books" @select="setActive" v-if="view == 'cards'" />

      <div class="user_list md:user_list-md" v-if="view == 'list'">
        <ul>
          <li
            v-for="(item, index) in books"
            :key="index"
            @click="setActive(index)"
            :class="{ active: selected === index }"
          >
            <p class="title">
              <b>{{ item.title }}</b>
            </p>
            <p class="author">{{ item.author }}</p>
          </li>
        </ul>
      </div>

      <div class="book_info">
        <div class="book_title">
          <h4>
            <b>{{ books[selected].title }}</b> by {{ books[selected].author }}
          </h4>
          <p>{{ books[selected].publisher }} · {{ books[selected].date }}</p>
        </div>
        <div class="book_data">
          <div class="book_description">
            <h4>Publisher Summary</h4>
            <p class="excerpt">
              {{ books[selected].description }}
            </p>
          </div>
          <div class="lab_notes" v-if="books[selected].notes">
            <h4>Lab Notes</h4>
            <div class="notes" v-html="books[selected].notes"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Row from "@/components/Row.vue";
export default {
  props: ["custom"],
  data() {
    return {
      books: [
        {
          title: "Distraction",
          author: "Bruce Sterling",
          cover:
            "http://books.google.com/books/content?id=3RZAau6_o2IC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Spectra",
          date: "2011",
          description:
            "It's November 2044, an election year, and the state of the Union is a farce. The government is broke, the cities are privately owned, and the military is shaking down citizens in the streets. Washington has become a circus and no one knows that better than Oscar Valparaiso. A political spin doctor, Oscar has always made things look good. Now he wants to make a difference. But Oscar has a skeleton in his closet. His only ally: Dr. Greta Penninger, a gifted neurologist at the bleeding edge of the neural revolution. Together they're out to spread a very dangerous idea whose time has come. And so have their enemies: every technofanatic, government goon, and laptop assassin in America. Oscar and Greta might not survive to change the world, but they'll put a new spin on it. From the Paperback edition.",
          notes:
            "This novel focuses on politics, but the action happens against a backdrop of economic semi-collapse, where only about a third of people participate into the mainstream economy, and many of them do so by forming parts of the retinues of rich people (“krews”). Many people are nomads, and live on cheap-and-open tech and biotech. Nomad society is organized around “reputation servers” storing reputation as a currency. The book also contains a funny (but chilly) conversation in which one of the character, a car industry executive, explains why radical innovation is bad for business."
        },
        {
          title: "Makers",
          author: "Cory Doctorow",
          cover:
            "http://books.google.com/books/content?id=1dQ2swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          publisher: "Tor Books",
          date: "2018",
          description:
            "From Cory Doctorow, the New York Times bestselling author of Little Brother, the repackaged trade paperback of Makers, a novel of the booms, busts, and further booms in store for America—now with a new cover! Perry and Lester invent things—seashell robots that make toast, Boogie Woogie Elmo dolls that drive cars. They also invent entirely new economic systems, like the \"New Work,\" a New Deal for the technological era. Barefoot bankers cross the nation, microinvesting in high-tech communal mini-startups like Perry and Lester's. Together, they transform the country, and Andrea Fleeks, a journo-turned-blogger, is there to document it. Then it slides into collapse. The New Work bust puts the dot.combomb to shame. Perry and Lester build a network of interactive rides in abandoned Wal-Marts across the land. As their rides, which commemorate the New Work's glory days, gain in popularity, a rogue Disney executive grows jealous, and convinces the police that Perry and Lester's 3D printers are being used to run off AK-47s. Hordes of goths descend on the shantytown built by the New Workers, joining the cult. Lawsuits multiply as venture capitalists take on a new investment strategy: backing litigation against companies like Disney. Lester and Perry's friendship falls to pieces when Lester gets the ‘fatkins' treatment, turning him into a sybaritic gigolo. Then things get really interesting.",
          notes:
            "<p>A near-future novel centered on Schumpeterian creative destruction, as enacted by a movement called New Work. New Work is all about very small, networked business units working as independent companies within large corporates (who no longer have a viable business model, but who do have viable plumbing and cash from the good old days). These companies dream up new products, build them on top of cheap, open source components, immediately get imitated and undercut by others, and move on to the next product, surfing the wave of novelty and high margins. The movement gets eventually busted by Wall Street pulling the plug on something it does not understand. Many ideas generated in economics are floating around <em>Makers</em> beside creative destruction: Bertrand competition, building-blocks technical innovation, Arrow’s paradox and others. <a class='mention' href='/u/alberto'>@alberto</a> wrote <a href='http://www.cottica.net/2010/08/30/leconomia-di-makers-di-cory-doctorowthe-economics-of-cory-doctorows-makers/' rel='nofollow noopener'>a complete review from the point of view of an economist</a>.</p>"
        },
        {
          title: "Walkaway",
          author: "Cory Doctorow",
          cover:
            "http://books.google.com/books/content?id=QBNCDgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          publisher: "Tor Books",
          date: "2017",
          description:
            "“Is Doctorow’s fictional utopia bravely idealistic or bitterly ironic? The answer is in our hands. Walkaway reminds us the world we choose to build is the one we’ll inhabit. Technology empowers both the powerful and the powerless, and if we want a world with more liberty and less control, we’re going to have to fight for it.”—Edward Snowden",
          notes:
            "<p>Depicts an economy entirely based on DIY production, in the book made cheap at an arbitrarily small scale by advanced 3D printing and biotech. Production is organized like a Wikipedia-style project. The book makes the argument that reputation bookkeeping (kudos, karma etc.) invites gaming of the system, and is an inferior way to organize production to a pure gift economy (given some key abundances). It also makes the case for defection from mainstream society (<a href='https://edgeryders.eu/t/exit-vs-voice-reacting-to-decline-in-2017/7633'>exit</a> in Hirschman’s terms) as a viable strategy when cheap, open tech is available.</p>"
        },
        {
          title: "Memoirs of a Spacewoman",
          author: "Naomi Mitchison",
          cover:
            "http://books.google.com/books/content?id=UpGLuQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          date: "2011",
          description:
            "Naomi Mitchison, daughter of a distinguished scientist, sister of geneticist J B S Haldane, was always interested in the sciences, especially genetics. Her novels did not tend to demonstrate this, and she did not publish a Science Fiction novel until almost forty years into her fiction-writing career. Isobel Murray's Introduction here argues that it is by no means 'pure' Science Fiction: the success of the novel depends not only on the extraordinarily variety of life forms its heroine encounters and attempts to communicate with on different worlds: she is also a very credible human, or Terran, with recognisibly human emotions and a dramatic emotional life. This novel works effectively for readers who usually eschew the genre and prefer more traditional narratives. Explorers like Mary are an elite class who consider curiosity to be Terrans' supreme gift, and in the novel she more than once takes risks that may destroy her life. Her voice, as she records her adventures and experiments, is individual, attractive and memorable. Isobel Murray is Emeritus Professor of Modern Scottish Literature at the University of Aberdeen."
        },
        {
          title: "Neptune's Brood",
          author: "Charles Stross",
          cover:
            "http://books.google.com/books/content?id=nEeFRxTx_F4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Penguin",
          date: "2013",
          description:
            "The year is AD 7000. The human species is extinct—for the fourth time—due to its fragile nature. Krina Alizond-114 is metahuman, descended from the robots that once served humanity. She’s on a journey to the water-world of Shin-Tethys to find her sister Ana. But her trip is interrupted when pirates capture her ship. Their leader, the enigmatic Count Rudi, suspects that there’s more to Krina’s search than meets the eye. He’s correct: Krina and Ana each possess half of the fabled Atlantis Carnet, a lost financial instrument of unbelievable value—capable of bringing down entire civilizations. Krina doesn’t know that Count Rudi suspects her motives, so she accepts his offer to get her to Shin-Tethys in exchange for an introduction to Ana. And what neither of them suspects is that a ruthless body-double assassin has stalked Krina across the galaxy, ready to take the Carnet once it is whole—and leave no witnesses alive to tell the tale…"
        },
        {
          title: "The Shockwave Rider",
          author: "John Brunner",
          cover:
            "http://books.google.com/books/content?id=fkkrZzaRNoIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Hachette UK",
          date: "2011",
          description:
            "He was the most dangerous fugitive alive, but he didn't exist! Nickie Haflinger had lived a score of lifetimes . . . but technically he didn't exist. He was a fugitive from Tarnover, the high-powered government think tank that had educated him. First he had broken his identity code - then he escaped. Now he had to find a way to restore sanity and personal freedom to the computerised masses and to save a world tottering on the brink of disaster. He didn't care how he did it . . . but the government did. That's when his Tarnover teachers got him back in their labs . . . and Nickie Haflinger was set up for a whole new education! First published in 1975."
        },
        {
          title: "Autonomous",
          author: "Annalee Newitz",
          cover:
            "http://books.google.com/books/content?id=lr3MswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          publisher: "Tor Books",
          date: "2018",
          description:
            '"Autonomous is to biotech and AI what Neuromancer was to the Internet."—Neal Stephenson "Something genuinely and thrillingly new in the naturalistic, subjective, paradoxically humanistic but non-anthropomorphic depiction of bot-POV—and all in the service of vivid, solid storytelling."—William Gibson When anything can be owned, how can we be free Earth, 2144. Jack is an anti-patent scientist turned drug pirate, traversing the world in a submarine as a pharmaceutical Robin Hood, fabricating cheap scrips for poor people who can’t otherwise afford them. But her latest drug hack has left a trail of lethal overdoses as people become addicted to their work, doing repetitive tasks until they become unsafe or insane. Hot on her trail, an unlikely pair: Eliasz, a brooding military agent, and his robotic partner, Paladin. As they race to stop information about the sinister origins of Jack’s drug from getting out, they begin to form an uncommonly close bond that neither of them fully understand. And underlying it all is one fundamental question: Is freedom possible in a culture where everything, even people, can be owned?',
          notes:
            "It’s a far future, earth-bound scenario with advanced biotech, under a corporate rulership primarily powered by extreme intellectural property rights. She goes deep in the debate between master-servant relationships, as the world features both classic human indebted servitude and autonomous artifically intelligent robots as well as into piracy, open knowledge, addiction and freedom."
        },
        {
          title: "Subspace Explorers",
          author: "E.E. 'Doc' Smith",
          cover:
            "http://books.google.com/books/content?id=00qA8ZC7ciYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Hachette UK",
          date: "2011",
          description:
            'All the creative energies of the West have been directed into space exploration and development - dozens of new worlds are being opened up. Left behind on Earth are the sluggish remnants of former greatness. But in the East, a mighty dictatorship has arisen - a single absolute monarch rules: The Nameless One of the East. What follows is a raging conflict, on Earth and in space - conflict as only master pulp storyteller E.E. "Doc" Smith can write it.',
          notes:
            "'The Principle of Enlightened Self Interest' as the basis of an economy."
        },
        {
          title: "The Webs of Varok",
          author: "Cary Neeper",
          cover:
            "http://books.google.com/books/content?id=2ZcqmgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          date: "2013",
          description:
            "Tandra Grey has left a struggling 21st century Earth for the ancient sustainable culture of Varok, a veiled moon of Jupiter, with its promise of stability for her young daughter. But a genius with a hidden talent sets her eye on Varok's wealth¿and Tandra's soul mates. Tandra, the elll Conn, and the varok Orram must untangle a web of deceit to restore balance for Varok and their fragile new family.",
          notes:
            "<p>In the book a woman from Earth is adopted into an alien family on a world which has a green, steady-state economy.  (Mild spoiler) The villain of the book is somebody who doesn’t want to abide by the economic restrictions.  Dr. Neeper (PhD in Microbiology, not Economics) uses the book to envisage what a steady state economy might be like unencumbered with Earth’s political history. She posts about her sources for the economics on her website at <a href='http://ArchivesOfVarok.com' rel='nofollow noopener'>http://ArchivesOfVarok.com</a>.  The book interesting, but questions remain about how productivity growth (the economy of Varok devotes a large portion of is research to science) would effect the steady state economy.</p>"
        },
        {
          title: "The Space Merchants",
          author: "Frederik Pohl",
          cover:
            "http://books.google.com/books/content?id=ziZxJJWPamkC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          publisher: "Macmillan",
          date: "1987",
          description:
            "Mitchell Courtenay, an advertising copywriter of the future is assigned to sway public support for the American colonization of Venus"
        },
        {
          title: "Red Plenty",
          author: "Francis Spufford",
          cover:
            "http://books.google.com/books/content?id=PioE2EDcuMsC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          publisher: "Graywolf Press",
          date: "2012",
          description:
            '"Spufford cunningly maps out a literary genre of his own . . . Freewheeling and fabulous." —The Times (London) Strange as it may seem, the gray, oppressive USSR was founded on a fairy tale. It was built on the twentieth-century magic called "the planned economy," which was going to gush forth an abundance of good things that the lands of capitalism could never match. And just for a little while, in the heady years of the late 1950s, the magic seemed to be working. Red Plenty is about that moment in history, and how it came, and how it went away; about the brief era when, under the rash leadership of Khrushchev, the Soviet Union looked forward to a future of rich communists and envious capitalists, when Moscow would out-glitter Manhattan and every Lada would be better engineered than a Porsche. It\'s about the scientists who did their genuinely brilliant best to make the dream come true, to give the tyranny its happy ending. Red Plenty is history, it\'s fiction, it\'s as ambitious as Sputnik, as uncompromising as an Aeroflot flight attendant, and as different from what you were expecting as a glass of Soviet champagne.',
          notes:
            "<p>A mix of history and fiction, it is a sort of docudrama on the Soviet Union’s 1960s attempt to upgrade its economic planning using computers and scientific methods. The main economic concept called into play is that of <a href='https://en.wikipedia.org/wiki/Shadow_price' rel='nofollow noopener'>shadow prices</a>. These are estimates of the cost of a product or service based on the willingness to pay, that is, what the relevant economic actor is willing to give up to obtain that product or service. A group of Soviet economists attempts to reform the way the economy works: now factories are supposed to pursue a “shadow profit” made  by meeting their objectives while using preferentially those inputs that have a lower shadow price. The reform collides with the “folk” ways in which these decisions have traditionally been made, and finally fails. This book is rich in insight about the nuts-and-bolts of a deep economic reform. Also discussed in the thread below, especially <a href='https://edgeryders.eu/t/8582/54'>this post</a>.</p>"
        },
        {
          title: "Eight Worlds of C.M. Kornbluth",
          author: "C. M. Kornbluth",
          cover:
            "http://books.google.com/books/content?id=aL0N_AetksoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Wildside Press LLC",
          date: "2010",
          description:
            "Collects eight of Kornbluth's classic science fiction stories."
        },
        {
          title: "The Year 200",
          author: "Agustín de Rojas",
          cover:
            "http://books.google.com/books/content?id=exIOygEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          publisher: "Restless Books",
          date: "2016",
          description:
            "“There could scarcely be a more opportune moment for the appearance in English of the late Cuban science fiction master Agustín de Rojas’s epic novel The Year 200…. De Rojas’s lucid fictional world intersects with many of our contemporary technological obsessions but charges them with remarkably distinct political valences..... A riveting narrative of espionage and geopolitical turmoil.” —Los Angeles Review of Books Centuries have passed since the Communist Federation defeated the capitalist Empire, but humanity is still divided. A vast artificial-intelligence network, a psychiatric bureaucracy, and a tiny egalitarian council oversee civil affairs and quash “abnormal” attitudes such as romantic love. Disillusioned civilians renounce the new society and either forego technology to live as “primitives” or enhance their brains with cybernetic implants to become “cybos.” When the Empire returns and takes over the minds of unsuspecting citizens in a scenario that terrifyingly recalls Invasion of the Body Snatchers, the world’s fate falls into the hands of two brave women. Drawing as much from the realms of the adventure novel, spy thriller, and political satire as from hard science fiction, horror, and fantasy, The Year 200 has been proven prophetic in its consideration of cryogenic freezing, artificial intelligence, and state surveillance, while its advanced weapons and robot assassins exist in an all-too-imaginable future. Originally published in 1990, just after the fall of the Berlin Wall and before the onset of Cuba's devastating Special Period, Agustín de Rojas’s magnum opus brings contemporary trajectories to their logical extremes and boldly asks, “What does ‘the greatest good for the greatest number’ really mean?”"
        },
        {
          title: "Numbercaste",
          author: "Yudhanjaya Wijeratne",
          cover:
            "http://books.google.com/books/content?id=KlwstAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          publisher: "Independently Published",
          date: "2017",
          description:
            "Welcome to the new world order. When Patrick Udo is offered a marketing job at NumberCorp, he packs his bags and goes to the Valley. After all, the 2030s are a difficult time, and jobs are rare. Little does he know that he's joining one of the most ambitious undertakings of his time or any other. NumberCorp, crunching through vast amounts of social network data, is building a new society - one where everyone's social circles are examined, their activities quantified, and their importance distilled into the all-powerful Number. A society where everything from your home to your education to entry at the local nightclub depends on an app that states exactly how important you are. As NumberCorp rises in power and in influence, the questions start coming in. What would you do to build the perfect state? And how far is too far?",
          notes:
            "A near-future novel where a Silicon Valley corporation replaces credit scoring with a quantification of their influence, scraped from social media. Sold with a bottom-up microservices model, the company integrates the use of this system into every customer-facing aspect of life - from restaurants to banks to nightclubs. Also examines a similar system being constructed in China but pushed using top-down methods. A key theme is how this quantification of social influence eventually cripples upward mobility (except in those who can game the system), due to children inheriting the social networks of their parents. A late-stage concept is how this ‘stick’ in turned into a ‘carrot’ - by means of an app that will now tell people who to talk to, who to mingle with, who to know based on the likelihood of it increasing their Number."
        },
        {
          title: "Down and Out in the Magic Kingdom",
          author: "Cory Doctorow",
          cover:
            "http://books.google.com/books/content?id=9-RC2Gj12SYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Macmillan",
          date: "2003",
          description:
            "Bursting with cutting-edge speculation and human insight, Cory Doctorow's Down and Out in the Magic Kingdom is a coming-of-age romantic comedy and a kick-butt cybernetic tour de force Jules is a young man barely a century old. He's lived long enough to see the cure for death and the end of scarcity, to learn ten languages and compose three symphonies...and to realize his boyhood dream of taking up residence in Disney World. Disney World! The greatest artistic achievement of the long-ago twentieth century. Now in the care of a network of volunteer \"ad-hocs\" who keep the classic attractions running as they always have, enhanced with only the smallest high-tech touches. Now, though, it seems the \"ad hocs\" are under attack. A new group has taken over the Hall of the Presidents and is replacing its venerable audioanimatronics with new, immersive direct-to-brain interfaces that give guests the illusion of being Washington, Lincoln, and all the others. For Jules, this is an attack on the artistic purity of Disney World itself. Worse: it appears this new group has had Jules killed. This upsets him. (It's only his fourth death and revival, after all.) Now it's war: war for the soul of the Magic Kingdom, a war of ever-shifting reputations, technical wizardry, and entirely unpredictable outcomes. At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.",
          notes: "Explores the idea of a reputation-based economy."
        },
        {
          title: "Metagame",
          author: "Sam Landstrom",
          cover:
            "http://books.google.com/books/content?id=0b6vSgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          publisher: "Amazonencore",
          date: "2010",
          description:
            "In sci-fi author Sam Landstrom's MetaGame, he creates a believable but disturbing world with fewer than six degrees of separation. In fact, every single person, product, pastime, and proclivity humans take part in is interconnected. Life is the Game -- and winners never die. In the Game, points amount to currency and top scorers are eligible for immortality. A mysterious, unifying force, the OverSoul, calls the shots, and an individual player's health contract can be indefinitely extended -- and with the offer of a permanent twenty-year-old's body and health, it's with fanaticism that gamers play the Game. D_Light is one of the best players in his family and will do anything to win, even kill. When he's invited to a MetaGame -- an exclusive, high-stakes competition -- he jumps at the chance. But after the first quest, D_Light's overly ambitious ways brand him a renegade. With a warped sense of free will that is needed to prevail, D_Light must either kill someone he's grown to love -- or lose everything.",
          notes:
            "<p><em>MetaGame</em>, by Sam Landstrom. It describes a world rebuilt on a more or less clean slate after a pandemic wiped out most of the population. As a new starting point, Landstrom has chosen <a href='https://en.wikipedia.org/wiki/Mihaly_Csikszentmihalyi' rel='nofollow noopener'>Mihaly Cskiszentmihalyi</a>’s idea of Flow. Since Flow is achieved in play, it follows that a total gamification of the economy leads to the maximally efficient outcome. For example, a minor character works (or rather “plays”) as an operator of small robots who clean public spaces such as tunnels and hallways. To him, he is playing a game (itself a part of the economy-wide Game), where he earns points for clean surfaces, but he has to spend points to rent the robots. Points are used as the system’s currency.  In a sense, this is a <a href='https://en.wikipedia.org/wiki/Coase_theorem' rel='nofollow noopener'>Coaseian</a> world where hierarchies have no reason to exist, because the Game brokers between players’ supply and demand schedules. On the other hand, he does imagine s form of collective production unit: the Great Houses, large families with thousands of members, that have replaced corporations. The author explains they grew out of civil unions, after some activists successfully fought for the right to have civil unions between more than two people.</p>"
        },
        {
          title: "Ring of Fire",
          author: "Eric Flint",
          cover:
            "http://books.google.com/books/content?id=O7Z0CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Baen Publishing Enterprises",
          date: "2008",
          description:
            "Tale of the American Town Lost in Time by Bestselling Writers New York Times Bestselling Series At the publisher's request, this title is sold without DRM (Digital Rights Management).",
          notes: "Unions as the basis of commonwealth."
        },
        {
          title: "New York 2140",
          author: "Kim Stanley Robinson",
          cover:
            "http://books.google.com/books/content?id=dxYZDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Hachette UK",
          date: "2017",
          description:
            "NOMINATED FOR THE HUGO AWARD FOR BEST NOVEL 2018 'A towering novel' Guardian 'Relevant and essential' Bloomberg Businessweek As the sea level rose, every street became a canal, every skyscraper an island. For the residents of one apartment building in Madison Square, however, New York in the year 2140 is far from a drowned city. New York Times bestselling author Kim Stanley Robinson delivers a bold and brilliant vision of New York in the next century. 'New York may be underwater but it's better than ever' New Yorker 'Massively enjoyable' Washington Post 'Gripping ... so hard to put down' Business Insider 'A document of hope as much as dread' Los Angeles Review of Books",
          note:
            "The Villain: Soul-devouring stage-5 capitalism/ The Heroes: You and me/ Their Weapons: Pitchforks and mortgages/ The Dramatic Twist: An oligarch’s change of heart/ The Princess: Post-capitalist utopia"
        },
        {
          title: "Utopia Five",
          author: "A. E. Currie",
          cover:
            "http://books.google.com/books/content?id=h6RJxQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          date: "2019",
          description:
            '"My name is Lee and I was born on the 8th January 2025 - the day the Panopticon was turned on."A battle is raging and Utopia Five holds the key.The Earth of 2053 is a changed place. A decimated humanity is constantly watched by a mysterious organisation. City states make their own laws, enforced by the omnipresent army of drones. A few have reached the new Mars or Moon colonies but for most, virtual reality is the only escape from the restrictions of WorldGov and the Panopticon.Has Earth become a dystopia? Someone believes so and will stop at nothing to change things back. Lee is caught in a fight to destroy the present order and return life to how it was before the Summer - an event that nearly wiped out civilisation. In a high speed chase through time and realities, a decision will be made. What is the future of humankind?Utopia Five is a fast paced, standalone Science Fiction novel. It is the first in a new series set in the near future - the world of the Panopticon.',
          notes:
            "<p><em>Utopia Five</em>, by A. E. Currie. Depicts a post-event, capitalist surveillance economy, where surveillance data have become public record. Entrepreneurs like the main characters build profit-making applications on those data including games, search engines, social credit, and law enforcement systems. These are then operated under the constant threat of a form of nationalisation. The day-to-day operation of the world is loosely based on Cuba and its recovery from the <a href='https://en.wikipedia.org/wiki/Special_Period' rel='nofollow noopener'>special period</a> of the 1990’s, which was characterised by sudden severe shortages of hydrocarbon energy sources and necessitated a complete overhaul of the country’s agriculture, diet and transport. The novel is clearly influenced by the current high levels of private and state surveillance, particularly in the UK and China, and the uses to which that data is put.</p>"
        },
        {
          title: "2312",
          author: "Kim Stanley Robinson",
          cover:
            "http://books.google.com/books/content?id=7sPvoQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          date: "2014",
          description:
            "Winner of the Nebula Award for Best SF Novel of the Year The year is 2312. Scientific and technological advances have opened gateways to an extraordinary future. Earth is no longer humanity's only home; new habitats have been created throughout the solar system on moons, planets, and in between. But in this year, 2312, a sequence of events will force humanity to confront its past, its present, and its future. The first event takes place on Mercury, on the city of Terminator, itself a miracle of engineering on an unprecedented scale. It is an unexpected death, but one that might have been foreseen. For Swan Er Hong, it is an event that will change her life. Swan was once a woman who designed worlds. Now she will be led into a plot to destroy them.",
          notes:
            "Set in a later epoch in the same future history as the Mars trilogy and New York 2140. It depicts a solar system economy, with a fully terraformed Mars, Venus, Titan and Triton well on their way to their own full terraforming, colonies on Mercury, Luna and other moons of Jupiter and Saturn, and plenty of hollowed out asteroids. The economy is dual. “Space” meaning everything except Earth and Mars, is run by the Mondragon Accord. This is a network of space settlements, which started out their economies as scientific stations (and so as planned economies). As these economies grew in size and complexity, they drew inspiration by Mondragon (“a small Basque town that ran an economic system of nested co-ops organized for mutual support”). The Mondragon Accord is depicted as a more sophisticated planned economy, run by quantum computers making real-time adjustments in production schedules. Markets and capitalism are still there, but they “tended to be private unregulated individual enterprises in nonessential goods. Capitalism was in effect relegated to the margin, and the necessities of life were a shared commons exchange between Earth and individual space colonies was on a national or treaty-association basis, thus a kind of colonial model”. Earth is still run by late-stage capitalism; Mars has withdrawn from the Mondragon Accord and is described as a “planetary social democratic economy”."
        },
        {
          title: "The Culture Series",
          author: "Iain M. Banks",
          cover:
            "http://books.google.com/books/content?id=U9J7BwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "McFarland",
          date: "2018",
          description:
            "This critical history of Iain M. Banks’ Culture novels covers the series from its inception in the 1970s to the The Hydrogen Sonata (2012), published less than a year before Banks’ death. It considers Banks’ origins as a writer, the development of his politics and ethics, his struggles to become a published author, his eventual success with The Wasp Factory (1984) and the publication of the first Culture novel, Consider Phlebas (1987). His 1994 essay “A Few Notes on the Culture” is included, along with a range of critical responses to the 10 Culture books he published in his lifetime and a discussion of the series’ status as utopian literature. Banks was a complex man, both in his everyday life and on the page. This work aims at understanding the Culture series not only as a fundamental contribution to science fiction but also as a product of its creator’s responses to the turbulent times he lived in.",
          notes:
            "<p>These novels are set in the far future. The economy they depict is one of <a href='https://en.wikipedia.org/wiki/Post-scarcity_economy' rel='nofollow noopener'>post-scarcity</a>, sustained by technologies of inconceivable power (“<a href='https://en.wikipedia.org/wiki/Unobtainium' rel='nofollow noopener'>handwavium</a>”). The Culture is a galactic polity whose citizens are both biological and non-biological sophonts. Humans predominate among biologicals. AIs, many of which embodied in ships, are vastly smarter and more powerful, and do most of the societal heavy lifting. The most important economic concept deployed is that a post-scarcity society which is leisure-oriented. Culture people (and AIs) focus on “serious fun” elaborated games, art forms, extreme sports, re-enactments of past events, and so on. In this sense, Banks is following up on the Keynes’ famous 1930 essay, <a href='https://assets.aspeninstitute.org/content/uploads/files/content/upload/Intro_Session1.pdf' rel='nofollow noopener'>Economic possibilities for our grandchildren</a>. His contribution consists in giving an “architect’s rendering” of what it would feel like to live in a post-scarcity world. He agrees with Keynes’ strategy of boosting the arts as a way to keep people engaged and happy in a world without work.</p>"
        },
        {
          title: "The Moon is a Harsh Mistress",
          author: "Robert A. Heinlein",
          cover:
            "http://books.google.com/books/content?id=MlaEAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Hachette UK",
          date: "2014",
          description:
            "In 2075, the Moon is no longer a penal colony. But it is still a prison... Life isn't easy for the political dissidents and convicts who live in the scattered colonies that make up lunar civilisation. Everything is regulated strictly, efficiently and cheaply by a central supercomputer, HOLMES IV. When humble technician Mannie O'Kelly-Davis discovers that HOLMES IV has quietly achieved consciousness (and developed a sense of humour), the choice is clear: either report the problem to the authorities... or become friends. And perhaps overthrow the government while they're at it. The Moon is a Harsh Mistress has been called Robert A. Heinlein's crowning achievement. His best-known novels include Starship Troopers Mistress and Stranger in a Strange Land.",
          notes:
            "<p>The Moon is a former penal colony, where convicted criminals have been deported and left there with a skeletal surveillance crew. Escape being all but impossible, authorities are unconcerned about what prisoners and their descendants do, as long as they keep farming grain and shipping it to an overpopulated Earth. In this situation, a free market “Randian” economy has evolved. Everything is purchased on the market, including health care, insurance (from bookmakers) and oxygen. The book has some an unusual attention for economic matters, but according to this editor (<a class='mention' href='https://edgeryders.eu/u/alberto'>@alberto</a>) its economic system is familiar (as an abstractiion) with anyone who’s been through Economics 101.</p>"
        },
        {
          title: "Freedom (TM)",
          author: "Daniel Suarez",
          cover:
            "http://books.google.com/books/content?id=uXsixF-yclAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Penguin",
          date: "2010",
          description:
            "The New York Times bestseller Daemon unleashed a terrifying technological vision of an all-powerful, malicious computer program. Now, our world is the Daemon's world—unless someone stops it once and for all... The Daemon is in absolute control, using an expanded network of shadowy operatives to tear apart civilization and build it anew. Even as civil war breaks out in the American Midwest in a wave of nightmarish violence, former detective Pete Sebeck—the Daemon's most powerful, though reluctant, operative—must lead a small band of enlightened humans in a movement designed to protect the new world order. But the private armies of global business are preparing to crush the Daemon once and for all. In a world of shattered loyalties, collapsing societies, and seemingly endless betrayal, the only thing worth fighting for may be nothing less than the freedom of all humankind.",
          notes:
            "Suarez imagines a market economy based on “darknet credits”. It looks like prices of different things as denominated in darknet credits are determined by market mechanisms, but it’s hard to say. The darknet economy emerges in two steps: first, a complicated scheme enacted by a weak (but very effective) AI extracts money off large financial corporations, funding the transition to the new economy (a pretty bloody one, that entails eliminating some plutocrats and violently wiping out drug cartels). Second, the fledgling economy turns out to be very efficient, because it wastes much less energy in corporate bullshit and does not care about IPRs. The critique of the inefficiencies of late capitalism is sharp enough, but there is no real explanation for why the agents of the darknet economy do not become extractive and bullshitting like those of the mainstream economy."
        },
        {
          title: "Infomocracy",
          author: "Malka Older",
          cover:
            "http://books.google.com/books/content?id=05eDCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Tor.com",
          date: "2016",
          description:
            'Read Infomocracy, the first book in Campbell Award finalist Malka Older\'s groundbreaking cyberpunk political thriller series The Centenal Cycle, a finalist for the Hugo Award for Best Series, and the novel NPR called "Kinetic and gripping." • A Locus Award Finalist for Best First Novel • The book The Huffington Post called "one of the greatest literary debuts in recent history" • One of Kirkus\' "Best Fiction of 2016" • One of The Washington Post\'s "Best Science Fiction and Fantasy of 2016" • One of Book Riot\'s "Best Books of 2016 So Far" It\'s been twenty years and two election cycles since Information, a powerful search engine monopoly, pioneered the switch from warring nation-states to global micro-democracy. The corporate coalition party Heritage has won the last two elections. With another election on the horizon, the Supermajority is in tight contention, and everything\'s on the line. With power comes corruption. For Ken, this is his chance to do right by the idealistic Policy1st party and get a steady job in the big leagues. For Domaine, the election represents another staging ground in his ongoing struggle against the pax democratica. For Mishima, a dangerous Information operative, the whole situation is a puzzle: how do you keep the wheels running on the biggest political experiment of all time, when so many have so much to gain? Infomocracy is Malka Older\'s debut novel. THE CENTENAL CYCLE Book 1: Infomocracy Book 2: Null States Book 3: State Tectonics PRAISE FOR INFOMOCRACY “A fast-paced, post-cyberpunk political thriller... If you always wanted to put The West Wing in a particle accelerator with Snow Crash to see what would happen, read this book.” —Max Gladstone, author of Last First Snow "Smart, ambitious, bursting with provocative extrapolations, Infomocracy is the big-data-big-ideas-techno-analytical-microdemoglobal-post-everything political thriller we\'ve been waiting for." —Ken Liu, author of The Grace of Kings "In the mid-21st century, your biggest threat isn’t Artificial Intelligence—it’s other people. Yet the passionate, partisan, political and ultimately fallible men and women fighting for their beliefs are also Infomocracy’s greatest hope. An inspiring book about what we frail humans could still achieve, if we learn to work together." —Karl Schroeder, author of Lockstep and the Virga saga At the Publisher\'s request, this title is being sold without Digital Rights Management Software (DRM) applied.',
          notes:
            "More political than economic but placing here for high relevance"
        },
        {
          title: "Neptune's Brood",
          author: "Charles Stross",
          cover:
            "http://books.google.com/books/content?id=nEeFRxTx_F4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
          publisher: "Penguin",
          date: "2013",
          description:
            "The year is AD 7000. The human species is extinct—for the fourth time—due to its fragile nature. Krina Alizond-114 is metahuman, descended from the robots that once served humanity. She’s on a journey to the water-world of Shin-Tethys to find her sister Ana. But her trip is interrupted when pirates capture her ship. Their leader, the enigmatic Count Rudi, suspects that there’s more to Krina’s search than meets the eye. He’s correct: Krina and Ana each possess half of the fabled Atlantis Carnet, a lost financial instrument of unbelievable value—capable of bringing down entire civilizations. Krina doesn’t know that Count Rudi suspects her motives, so she accepts his offer to get her to Shin-Tethys in exchange for an introduction to Ana. And what neither of them suspects is that a ruthless body-double assassin has stalked Krina across the galaxy, ready to take the Carnet once it is whole—and leave no witnesses alive to tell the tale…",
          notes:
            "<p>Loose sequel to Saturn’s Children and inspired by Debt: The First Five Thousand Years. “Neptune’s Brood invents an economic framework for space colonization, complete with fast, medium and slow cryptocurrencies. Because colonizing a star system is an insanely large investment that takes an insanely long time. Stross discusses his economic thinking <a href='http://www.antipope.org/charlie/blog-static/2014/09/crib-sheet-neptunes-brood.html' rel='nofollow noopener'>on his blog</a>.”</p>"
        }
      ],
      catalogue: {
        books: [
          "0765392763",
          "0307796787",
          "1250196434",
          "0765392089",
          "1101624531",
          "1101184604",
          "1622220021",
          "1849210357",
          "0575101660",
          "1632060515",
          "1434408868",
          "0312906552",
          "1429972548",
          "1101624531",
          "0575122714",
          "1618246240",
          "0765385147",
          "0356508773",
          "0316192813",
          "1555970419",
          "1521795436",
          "1093609761",
          "1476620407",
          "1935597167",
          "1444791044"
        ]
      },
      book: null,
      selected: 2,
      view: "cards"
    };
  },
  components: { Row },
  methods: {
    getBook(isbn) {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
            isbn +
            "&key=AIzaSyCJfbs0cBITE-5ja0fIBgLXLKBm5keO630"
        )
        .then(({ data }) => {
          var obj = {
            title: data.items[0].volumeInfo.title,
            author: data.items[0].volumeInfo.authors[0],
            cover: data.items[0].volumeInfo.imageLinks.thumbnail,
            publisher: data.items[0].volumeInfo.publisher,
            date: data.items[0].volumeInfo.publishedDate.substring(0, 4),
            description: data.items[0].volumeInfo.description
          };
          this.books.push(obj);
        })
        .catch();
    },
    toggleView(view) {
      this.view = view;
    },
    setActive(index) {
      this.selected = index;
    }
  },
  mounted: function() {
    // for (let x = 0; x < this.catalogue.books.length; x++) {
    //   this.getBook(this.catalogue.books[x]);
    // }
  }
};
</script>
<style lang="scss">
@import "../assets/index.scss";
#books .toggle_menu {
  width: 100px !important;
}
#books .introduction {
  width: 75%;
  margin: 0 auto 30px;
  font-size: 20px;
  p {
    margin-top: 20px;
  }
  a {
    font-weight: bold;
    text-decoration: underline;
  }
}
#books .section_title {
  margin: 30px auto 20px !important;
  border: none;
}
.user {
  display: inline-flex;
  width: auto;
  align-items: center;
  overflow: hidden;
  margin-top: 15px;
  border-radius: 7px;
  font-family: "Helvetica", sans-serif;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.05) !important;
  font-size: 13px;
  padding-right: 10px;
  font-weight: bold;
  text-decoration: none !important;
  img {
    width: 35px;
    height: 35px;
    margin-right: 7px;
  }
}
#books .section_title {
  width: 75%;
  margin: 0 auto;
}
.quote {
  min-width: 50%;
  margin-right: 30px;
  border-left: 2px solid #ddd;
  padding: 20px 20px 10px;
  font-family: "Crimson Text", serif;

  background: #fafafa;
  font-size: 19px;
  blockquote {
  }
}
.cards-container {
  width: 75%;
  margin: 0 auto;
  &.row {
    display: flex;
    .book_title {
      display: none;
    }
    .user_list {
      flex-basis: 430px !important;
      margin: 0 20px 0 0;
      border-radius: 0;
      border: none;
      border-right: 1px solid #efefef;
      li {
        flex-direction: column;
        display: flex;
        height: auto !important;
        align-items: center;
        padding: 10px 15px;
        p {
          width: 100%;
          margin: 0;
          padding: 0;
          display: inline-block;
          &.author {
            font-weight: normal !important;
          }
        }
      }
    }
    .book_info {
      margin: 10px 0 0 0;
    }
  }
}

.book_info {
  width: 90%;
  margin: 20px auto 0;
  background: #fafafa;
  .book_title {
    border-bottom: 1px solid #efefef;
    padding: 0 10px 15px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 25px;
    }
    p {
      font-weight: bold;
    }
  }
  .book_data {
    width: 100%;
    padding: 0 20px;
    justify-content: space-between;
    display: flex;
  }
  .lab_notes {
    width: 100%;
    padding: 20px;
    border-left: 1px solid #efefef;
    h4 {
      font-weight: bold;
      border-bottom: 1px solid #efefef;
      padding-bottom: 10px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath d='M97 0H3C1 0 0 1 0 3v56l41 41h56c2 0 3-1 3-3V3c0-2-1-3-3-3zM40 86L16 61h24v25zm50 4H50V51H10V10h80v80z'/%3E%3C/svg%3E%0A")
        no-repeat 2px 5.5px;
      background-size: 14px;
      padding-left: 27px;
    }
    .notes {
      padding-top: 12px;
      font-size: 14px;
      overflow: scroll;
      height: 200px;
      a {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
  .book_description {
    width: 100%;
    margin-top: 20px;
    padding-right: 20px;
    h4 {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath d='M16.5 16.5C-2 35-2 65 16.5 83.5s48.5 18.5 67 0 18.5-48.5 0-67-48.5-18.5-67 0zm35.4 6c4 0 7.2 3.3 7.2 7.3s-3.3 7.3-7.2 7.3c-4 0-7.3-3.3-7.3-7.4 0-4 3.3-7.2 7.3-7.2zm10.3 48.9c-.2.6-.6 1.3-1 1.7-2.6 2.7-5.8 4.3-9.6 4.3-1.8 0-3.5 0-5.3-.3-2.9-.4-6.6-4-6.1-7.8l1.2-7.8c.8-4.5 1.6-9.1 2.4-13.6 0-.3.1-.6.1-.9 0-1.9-.6-2.6-2.5-2.8-.8-.1-1.6-.2-2.4-.4-.9-.3-1.4-1.1-1.3-1.8.1-.8.6-1.3 1.6-1.5.5-.1 1.1-.1 1.7-.1h13.8c1.7 0 2.7.8 2.7 2.5 0 1.4-.2 2.8-.5 4.2-.9 5.2-1.9 10.3-2.8 15.5-.3 1.7-.7 3.4-.9 5.1-.1.8 0 1.7.2 2.5.3 1.1 1.1 1.7 2.2 1.6.9-.1 1.8-.4 2.7-.8.7-.3 1.3-.8 2-1 1.2-.4 2.1.3 1.8 1.4z'/%3E%3C/svg%3E")
        no-repeat 2px 3.5px;
      background-size: 18px;
      padding-left: 30px;
      font-weight: bold;
      border-bottom: 1px solid #efefef;
      padding-bottom: 10px;
    }
    p {
      padding-top: 12px;
      font-size: 14px;
      overflow: scroll;
      height: 200px;
    }
  }
}
</style>
