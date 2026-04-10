# Preliminary Literature Scan
**Date:** 2026-03-14
**Purpose:** Discovery research to feed Phase 1 (template diagnosis) and Phase 2 (learning science foundations) of the curriculum builder project. This is a first-pass scan — sources flagged for deeper extraction are noted explicitly.

---

## Topic 1: Instructional Design Quality Criteria

**Search query used:** "ADDIE model curriculum requirements Merrill's First Principles Gagné Nine Events backward design Wiggins McTighe instructional design quality criteria"

### Top Results

1. **"Instructional Design Models for 2026: ADDIE, Gagne's, Merrill's and Bloom's Methodologies"**
   - URL: https://research.com/education/instructional-design-models
   - Key finding: Synthesizes all four major frameworks as complementary. ADDIE provides the process scaffold; Gagné provides the event-level checklist; Merrill provides the problem-centered quality test; Bloom provides the cognitive-level sequencing logic. Together they define what a complete curriculum document must contain.

2. **"The ADDIE Model Explained: Evolution, Steps, and Applications for 2026"**
   - URL: https://research.com/education/the-addie-model
   - Key finding: The five stages — Analysis, Design, Development, Implementation, Evaluation — are not merely procedural; they define required *artifact types* in a curriculum. A curriculum lacking audience analysis, formative evaluation criteria, or implementation guidance is structurally incomplete by ADDIE standards.

3. **"Backward Design" — Wikipedia**
   - URL: https://en.wikipedia.org/wiki/Backward_design
   - Key finding: Wiggins & McTighe (1998/99) argue that effective curriculum must be designed from desired outcomes backward. The three-stage logic: (1) identify desired results, (2) determine acceptable evidence, (3) plan learning experiences. A curriculum that describes activities before specifying evidence of learning violates this structure — a common flaw in AI-generated templates.

4. **"Gagne's Nine Events of Instruction" — Northern Illinois University CITL**
   - URL: https://www.niu.edu/citl/resources/guides/instructional-guide/gagnes-nine-events-of-instruction.shtml
   - Key finding: Gagné's nine events constitute a completeness checklist: (1) Gain attention, (2) Inform learners of objectives, (3) Stimulate recall of prior learning, (4) Present content, (5) Provide learning guidance, (6) Elicit performance, (7) Provide feedback, (8) Assess performance, (9) Enhance retention and transfer. A curriculum document that does not address all nine creates predictable learning gaps. Events 3, 7, 8, and 9 are most commonly absent from AI-generated content.

5. **"Merrill's First Principles of Instruction: Unleashing The Power of Problem-Solving" — Growth Engineering**
   - URL: https://www.growthengineering.co.uk/merrills-first-principles/
   - Key finding: Merrill's five principles — Task-centered, Activation, Demonstration, Application, Integration — establish a quality test. Instruction that concentrates on Demonstration and skips the other phases (especially Application and Integration) is a recognized and documented failure mode. Research shows students in First Principles-designed courses learn significantly more and complete tasks faster than in conventionally designed courses.

### What This Tells Us About the Thesis

The four frameworks converge on the same structural requirements: curriculum must specify (a) the target learner and prior knowledge, (b) stated outcomes tied to assessable evidence, (c) a cognitive progression from recall through application and transfer, and (d) feedback and retention mechanisms. Any template that lists topics and activities without these elements is pedagogically incomplete by well-established standards. This gives us an explicit rubric for diagnosing the source template in Phase 1.

**FLAG FOR DEEPER EXTRACTION:** Merrill's original 2002 paper at https://mdavidmerrill.files.wordpress.com/2019/04/firstprinciplesbymerrill.pdf — use in Phase 2 as primary source for the problem-centered learning argument.

---

## Topic 2: AI Curriculum Generation Quality Gaps

**Search query used:** "AI generated curriculum quality gaps instructional design what is missing from AI educational content 2024 2025" + "instructional designers critique AI generated courses missing assessment alignment prerequisites cognitive load sequencing 2024"

### Top Results

1. **"AI in Instructional Design: Reflections on 2024 & Predictions for 2025" — Dr. Philippa Hardman (Substack)**
   - URL: https://drphilippahardman.substack.com/p/ai-in-instructional-design-reflections
   - Key finding: "In 2024 we saw widespread adoption without any substantive positive impact on the speed, volume or quality of instructional designers' work. Without a user who can bring significant expertise in optimal instructional design practices and understanding of how LLMs work, the value we can get from generic AI models is severely limited." This is the most direct practitioner voice on the quality gap.

2. **"Beyond the Hype: What 18 Recent Research Papers Say about How to Use AI in Instructional Design" — Dr. Philippa Hardman (Substack)**
   - URL: https://drphilippahardman.substack.com/p/beyond-the-hype-what-18-recent-research
   - Key finding: Systematic review surfaces a consistent pattern: AI tools produce content that requires substantial human intervention for accuracy, relevance, and alignment. Generic, template-like outputs are the norm. Assessment alignment is the most commonly cited failure.

3. **"Utilizing Generative AI for Instructional Design: Exploring Strengths, Weaknesses, Opportunities, and Threats" — TechTrends / Springer**
   - URL: https://link.springer.com/article/10.1007/s11528-024-00967-w
   - Key finding: SWOT analysis of GenAI in ID practice. Weaknesses include: factual inaccuracies, lack of depth, template-like outputs, inability to account for learner context, and assessment items that do not map to stated cognitive objectives. This is the most academically rigorous source on the gap.

4. **"Frontiers | A Systematic Review of the Early Impact of AI on Higher Education Curriculum, Instruction, and Assessment"**
   - URL: https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1522841/full
   - Key finding: Notes an "absence of research into the real world of higher education classroom pedagogical activities, course development, and assessment design." Identifies that AI-generated curricula prioritize surface-level content organization over authentic alignment.

5. **"Reshaping Curriculum Adaptation in the Age of AI" — British Educational Research Journal**
   - URL: https://bera-journals.onlinelibrary.wiley.com/doi/full/10.1002/berj.4068
   - Key finding: Teachers using AI for curriculum adaptation tend to default to AI-generated structures rather than adapting to local instructional context — meaning AI output imposes generic sequencing on specific learning needs rather than the reverse.

6. **"AI-Integrated Instructional Design in Higher Education" — CITE Journal**
   - URL: https://citejournal.org/volume-25/issue-4-25/general/ai-integrated-instructional-design-in-higher-education-a-systematic-exploration-of-tools-roles-and-challenges/
   - Key finding: Most commonly reported failure: AI-generated assessments must be manually reviewed to ensure alignment with learner profiles, delivery modes, and cognitive objectives. The gap between generated content and authentic instructional alignment is structural, not incidental.

### What This Tells Us About the Thesis

The practitioner and academic literature are converging on the same point: AI generates plausible-looking curriculum structures that systematically lack (a) learner context sensitivity, (b) assessment-outcome alignment, (c) cognitive load sequencing, and (d) retention and transfer mechanisms. This is not a matter of prompt quality alone — it is a structural gap in how general LLMs approach educational content. The thesis that a purpose-built, learning-science-informed tool can close these gaps is directly supported by the identified failure patterns.

**FLAG FOR DEEPER EXTRACTION:** Hardman Substack posts (both) and the TechTrends/Springer article — these are the closest thing to a practitioner evidence base for the quality gap claim.

---

## Topic 3: Prompt Engineering for Educational AI

**Search query used:** "prompt engineering pedagogy AI educational content learning science alignment research"

### Top Results

1. **"AI-Powered Prompt Engineering for Education 4.0: Transforming Digital Resources into Engaging Learning Experiences" — MDPI Education Sciences**
   - URL: https://www.mdpi.com/2227-7102/15/12/1640
   - Key finding: Presents a methodological model for prompt engineering that explicitly aligns technical formulation with pedagogical objectives. The central argument: prompt structure determines whether AI output reflects learning science principles or surface-level content organization.

2. **"Realizing the Possibilities of Large Language Models: Strategies for Prompt Engineering in Educational Inquiries" — Taylor & Francis**
   - URL: https://www.tandfonline.com/doi/full/10.1080/00405841.2025.2528545
   - Key finding: Chain-of-thought prompting enables LLMs to incorporate student features, knowledge content, objectives, and structured reasoning steps into curriculum activities. This reflects cognitive and learning science principles about how students process complex information — and demonstrates that prompt structure can scaffold pedagogical output.

3. **"Generative AI Prompt Engineering for Educators: Practical Strategies" — Journals of SAGE**
   - URL: https://journals.sagepub.com/doi/10.1177/01626434241298954
   - Key finding: Introduces the IDEA framework: Include essential components, Develop prompts using clear language, Evaluate outcomes and refine prompts, Apply accountability. This is one of the few frameworks explicitly designed to make AI output evidence-based. Note: the framework is practitioner-facing, not architectural.

4. **"CIDDL Research and Practice Brief: Generative AI Prompt Engineering for Educators" — CIDDL**
   - URL: https://ciddl.org/ciddl-research-and-practice-brief-generative-ai-prompt-engineering-for-educators/
   - Key finding: Emphasizes that effective instructional prompting requires the prompter to supply deep content knowledge and critical thinking. "Educators need to provide the necessary content knowledge to successfully guide the LLM and effectively evaluate the response." This means embedding learning science in the prompt architecture — not just in the output review stage.

5. **"AI Literacy and Its Implications for Prompt Engineering Strategies" — ScienceDirect**
   - URL: https://www.sciencedirect.com/science/article/pii/S2666920X24000262
   - Key finding: AI literacy (including understanding of how LLMs work) is a prerequisite for generating pedagogically sound output. Unskilled prompting reliably produces generic educational content.

### What This Tells Us About the Thesis

The research consensus is: prompt structure matters enormously for pedagogical output quality, and current generic prompting produces generic, non-pedagogically-grounded curricula. A curriculum builder that embeds learning-science criteria directly into its prompt architecture — rather than relying on the user to supply them — would close a documented gap. Chain-of-thought prompting and structured constraint-passing are the most promising documented techniques.

**FLAG FOR DEEPER EXTRACTION:** The MDPI Education 4.0 paper and the Taylor & Francis chain-of-thought piece — both give concrete prompt structure examples that could inform the tool's architecture.

---

## Topic 4: Marketing vs. Pedagogy Tension in Course Design

**Search query used:** "marketing course descriptions versus actual curriculum substance instructional design critique" + "online course design marketing language versus learning outcomes"

### Top Results

1. **"Towards a Critical Instructional Design Framework" — Pressbooks**
   - URL: https://pressbooks.pub/criticalinstructionaldesign/chapter/towards-a-critical-instructional-design-framework/
   - Key finding: Critical pedagogy challenges the field to examine "how" teaching is organized rather than "what is taught." Courses can appear well-designed on the surface while lacking substantive pedagogical grounding — this is explicitly named as a systemic issue.

2. **"Frontiers | Everyone Loves a Good Story: Learning Design in Massive Open Online Courses for Language Learning"**
   - URL: https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2022.1007091/full
   - Key finding: In MOOCs, "ideologically inspired pedagogical approaches are seldom at the centre of learning design," with the MOOC phenomenon showing "a general development towards market mechanisms, and a decreasing interest in discussions of pedagogy." This is the most direct evidence that market pressures displace pedagogical design at scale.

3. **"Deep vs. Surface Learning: Which Approach Wins?" — Distance Learning Institute**
   - URL: https://distancelearning.institute/instructional-design/deep-vs-surface-learning-approach/
   - Key finding: Surface learning is often a product of learning environment design, not learner disposition. Curricula that prioritize coverage and attractiveness over depth systematically push learners toward surface approaches regardless of learner intent.

4. **"A Self-Directed Guide to Designing Courses for Significant Learning" — L. Dee Fink / Boston University**
   - URL: https://www.bu.edu/sph/files/2014/03/www.deefinkandassociates.com_GuidetoCourseDesignAug05.pdf
   - Key finding: Fink identifies that most instructional design concentrates primarily on the "demonstration" phase (content delivery) and ignores activation, application, and integration. This is a direct analog to the marketing-over-pedagogy failure pattern.

5. **"Augmented Course Design: Using AI to Boost Efficiency and Expand Capacity" — EDUCAUSE Review**
   - URL: https://er.educause.edu/articles/2024/8/augmented-course-design-using-ai-to-boost-efficiency-and-expand-capacity
   - Key finding: AI-assisted course design can accelerate the production of courses that look structurally complete (descriptions, objectives, activities) but lack the alignment and depth that characterize genuine instructional quality.

### What This Tells Us About the Thesis

The marketing/pedagogy tension is recognized in the instructional design literature, primarily through the lens of MOOCs and online course proliferation. The core failure pattern: course descriptions that promise comprehensive learning while actual curriculum structure prioritizes content coverage and accessibility over outcome alignment, cognitive progression, and authentic application. AI accelerates this pattern because it is optimized to produce plausible-sounding structures, not pedagogically grounded ones. The curriculum builder project is directly addressing this recognized failure mode.

**FLAG FOR DEEPER EXTRACTION:** The MOOC pedagogy article from Frontiers and the Fink course design guide — the MOOC piece provides empirical grounding for the market-over-pedagogy claim.

---

## Topic 5: Flipped Classroom Meta-Analyses

**Search query used:** "flipped classroom meta-analysis adult learners professional development effectiveness moderating conditions 2023 2024 2025"

### Top Results

1. **"The Effectiveness of the Flipped Classroom: A Second-Order Meta-Analysis" — ScienceDirect (2025)**
   - URL: https://www.sciencedirect.com/science/article/abs/pii/S0883035525003283
   - Key finding: g = 0.726 (p < .0001) — a large, positive effect on learning outcomes compared to traditional instruction. However, "large heterogeneity indicated that the effectiveness of the flipped classroom is highly context-dependent." Effect size alone is insufficient; moderating conditions matter significantly.

2. **"The Effects of Flipped Classrooms to Improve Learning Outcomes" — JCU / Systematic Review (2023)**
   - URL: https://researchonline.jcu.edu.au/80319/1/Campbell%20Systematic%20Reviews%20-%202023%20-%20Naing%20-%20The%20effects%20of%20flipped%20classrooms%20to%20improve%20learning%20outcomes%20in.pdf
   - Key finding: Systematic review. Effect is moderated by: quality of pre-class materials, degree of active learning in synchronous sessions, and learner autonomy. When pre-class materials are passive (video-only, no comprehension checks), the in-class benefit is diminished.

3. **"Effects of Flipped Learning on Language Learning Outcomes: A Meta-Analysis Investigating Moderators" — SAGE (2025)**
   - URL: https://journals.sagepub.com/doi/10.1177/21582440251331298
   - Key finding: Analyzed 70 studies across 4,616 students. Moderators include: pre-instructional comprehension check mechanisms, in-class activity design, and instructional time frames. The comprehension-check mechanism is the single most underspecified element in flipped classroom implementations.

4. **"A Meta-Analysis of Online Learning, Blended Learning, the Flipped Classroom and Classroom Instruction for Pre-Service and In-Service Teachers" — ScienceDirect**
   - URL: https://www.sciencedirect.com/science/article/pii/S2666557323000204
   - Key finding: For pre-service and in-service teachers (the closest available proxy for adult professional learners), flipped classroom outperforms traditional instruction with a moderate effect. Cognitive ability differences between university-level and K-12 students affect results — adult learners generally respond more positively.

5. **"Effectiveness of the Flipped Classroom on Self-Efficacy: A Meta-Analysis" — Taylor & Francis (2023)**
   - URL: https://www.tandfonline.com/doi/full/10.1080/2331186X.2023.2287886
   - Key finding: Flipped classroom enhances self-efficacy (22 studies), which mediates engagement in learning. For adult learners with pre-existing professional knowledge, self-efficacy effects may be smaller but persistence effects may be larger.

### What This Tells Us About the Thesis

The evidence supports flipped methodology with a strong average effect size, but "context-dependent" is the key qualifier. The three critical moderating conditions are: (1) quality and active engagement of pre-class materials (not passive video), (2) explicit in-class active learning design (not lecture), and (3) comprehension check mechanisms between pre- and in-class phases. A curriculum template that specifies "pre-work" without specifying the nature of that pre-work, or "workshop" without designing active learning activities, fails to deliver the conditions under which flipped learning actually works. This is a direct diagnostic criterion for Phase 1 template analysis.

**FLAG FOR DEEPER EXTRACTION:** The 2025 second-order meta-analysis and the 2025 SAGE moderators study — these are the most current and methodologically strong sources for the flipped classroom claim.

---

## Topic 6: Scaffolded Instruction Research

**Search query used:** "scaffolded instruction cognitive load theory Bloom's taxonomy curriculum sequencing theory application progression research"

### Top Results

1. **"Bloom's Taxonomy of Cognitive Learning Objectives" — PMC / National Library of Medicine**
   - URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC4511057/
   - Key finding: Peer-reviewed overview of Bloom's revised taxonomy. Confirms the cognitive hierarchy: Remember → Understand → Apply → Analyze → Evaluate → Create. The hierarchy is not arbitrary — it reflects empirically supported cognitive prerequisites. Lower-order processing must precede higher-order processing for effective learning.

2. **"Bloom's Taxonomy in Instructional Design: A Practical Guide" — CommLab India**
   - URL: https://www.commlabindia.com/blog/blooms-taxonomy-in-instructional-design
   - Key finding: Sequencing instruction using the taxonomy prevents cognitive overload and supports progressive skill-building. Activities that skip levels (e.g., jumping from knowledge recall to evaluation without application) are documented as causing frustration and disengagement.

3. **"Taxonomies of Learning — Scaffolding Instruction Toolkit" — PALNI Consortium LibGuides**
   - URL: https://libguides.palni.edu/c.php?g=930607&p=6706165
   - Key finding: Explicit connection between scaffolding theory (Vygotsky) and taxonomic sequencing: "Instructional scaffolding of higher-level skills from lower-level skills is an application of Vygotskian constructivism." Scaffolding is not just a metaphor — it has a specific structural implication for curriculum sequencing.

4. **"Applying Learning Theories and Instructional Design Models for Effective Instruction" — Advances in Physiology Education**
   - URL: https://journals.physiology.org/doi/full/10.1152/advan.00138.2015
   - Key finding: Connects Bloom's, cognitive load theory, and Gagné's events as a unified framework for sequencing. The paper explicitly argues that Theory → Method → Application progression is supported by the combined weight of these three frameworks. When instruction introduces complex theory before building conceptual foundation, extraneous cognitive load increases.

5. **"Cognitive Load and Curriculum Design" — Hattie synthesis (cited in search results)**
   - Key finding: Strategies targeting higher-order thinking produce effect sizes of d = 0.62–0.82 depending on approach (Hattie, 2009). The condition for achieving these effects is proper scaffolding — without progressive scaffolding, higher-order activities do not produce higher learning gains.

### What This Tells Us About the Thesis

The Theory → Method → Application progression is not just a pedagogical convention — it is grounded in cognitive load theory (Sweller), constructivism (Vygotsky), and taxonomic sequencing (Bloom). The evidence says: (a) lower-order processing must be established before higher-order tasks are introduced, (b) skipping levels increases extraneous cognitive load and disengagement, and (c) explicit scaffolding (cues, worked examples, progressive complexity) significantly improves transfer. A curriculum that presents content as flat parallel modules without a cognitive progression is structurally contradicted by this evidence base.

**FLAG FOR DEEPER EXTRACTION:** The Advances in Physiology Education paper (integrates three frameworks) and the PALNI scaffolding toolkit (connects Vygotsky to Bloom directly).

---

## Topic 7: Analogical Transfer and Comparison-Based Learning

**Search query used:** "analogical reasoning learning far transfer cognitive flexibility theory comparison-based learning instructional design research"

### Top Results

1. **"Learning and Transfer: A General Role for Analogical Encoding" — Gentner, Loewenstein & Thompson (2003)**
   - URL: https://groups.psych.northwestern.edu/gentner/papers/GentnerLoewensteinThompson03.pdf
   - Key finding: This is the foundational empirical paper. Analogical encoding (comparing two cases to extract common structure) provides a "two- or three-fold advantage" over single-case learning across multiple experiments with advanced learners. Key mechanism: comparison processes reveal common relational structure and promote transfer even when neither example is fully understood individually.

2. **"Learning Analogical Reasoning" — Gentner & Loewenstein (2002)**
   - URL: https://groups.psych.northwestern.edu/gentner/papers/GentnerLoewenstein02a.pdf
   - Key finding: Analogical reasoning is a cognitive mechanism that enables noticing and transferring structural similarities across contexts. Learning environments that explicitly invite comparison between cases activate this mechanism; those that present cases in isolation do not.

3. **"Cognitive Flexibility Theory: Advanced Knowledge Acquisition in Ill-Structured Domains" — Spiro et al.**
   - URL: https://www.researchgate.net/publication/272177675_Cognitive_Flexibility_Theory_Advanced_Knowledge_Acquisition_in_Ill-Structured_Domains
   - Key finding: Cognitive Flexibility Theory holds that knowledge in ill-structured domains (complex, real-world problems) cannot be acquired through single-case or linear instruction. Multiple representations of the same concept, presented in multiple contexts, are required for genuine transfer. The "draw comparisons" instructional move is a direct application of CFT.

4. **"Analogical Reasoning in the Classroom: Insights from Cognitive Science" — Vendetti et al. (2015), Mind, Brain, and Education**
   - URL: https://learninglab.uchicago.edu/Publications_files/Vendetti_et_al-2015-Mind,_Brain,_and_Education.pdf
   - Key finding: Reviews neuroscience and cognitive science evidence for analogical reasoning in classroom contexts. Explicit scaffolding (hints, cues, cueing visual similarities) significantly improves learners' ability to find useful analogical sources. Without instructional scaffolding, learners default to surface similarity and miss structural similarity.

5. **"Transfer of Learning and Teaching: A Review of Transfer Theories and Effective Teaching Practices" — ERIC**
   - URL: https://files.eric.ed.gov/fulltext/EJ1217940.pdf
   - Key finding: Reviews multiple transfer frameworks. Identifies near transfer (same domain, similar context) and far transfer (different domain, novel context) as distinct targets requiring different instructional strategies. Analogical comparison is the strongest documented mechanism for far transfer.

### What This Tells Us About the Thesis

The cognitive science literature strongly supports the "draw comparisons" instructional move, with empirical evidence going back to Gentner's foundational work. The key findings for curriculum design: (a) comparing cases produces 2-3x better transfer than studying cases individually, (b) the mechanism is structural similarity extraction (not surface similarity), (c) explicit instructional scaffolding is required — comparison does not happen automatically, (d) cognitive flexibility requires multiple contexts and representations, not single-case instruction. A curriculum that never asks learners to compare concepts, draw analogies, or apply knowledge in novel contexts is documentably failing to support transfer. This is one of the most evidence-dense areas in the cognitive science of learning.

**FLAG FOR DEEPER EXTRACTION:** Gentner et al. 2003 paper (the empirical anchor) and the Vendetti et al. 2015 classroom application paper — these two together give a research-to-practice bridge.

---

## Cross-Cutting Themes and Synthesis Notes

### Theme 1: The Completeness Problem
All seven areas point toward the same underlying issue: a curriculum that looks complete (has titles, descriptions, objectives, activities) can be structurally incomplete in ways that are only visible through a learning science lens. The Gagné nine-events checklist, Merrill's activation-to-integration cycle, and Bloom's cognitive hierarchy each provide distinct but complementary completeness criteria. A diagnostic rubric drawing on all three would be highly defensible.

### Theme 2: AI Accelerates Plausibility Without Depth
The emerging research consensus (Hardman 2024, TechTrends 2024, Frontiers 2025) is that AI produces plausible-looking curriculum structures that systematically fail on assessment alignment, cognitive sequencing, and transfer design. This is not a bug — it is a predictable output of training on text that describes courses rather than text that encodes learning science. A purpose-built tool that embeds learning science criteria in its architecture (rather than expecting the user to supply them) addresses a documented and named gap.

### Theme 3: Scaffolding as Architecture, Not Decoration
Scaffolding appears across all seven topics as a structural design requirement: Bloom requires it for cognitive progression, Vygotsky grounds it theoretically, cognitive load theory predicts what happens without it, flipped classroom effectiveness depends on it, and analogical transfer requires it for comparison to work. Any curriculum that does not explicitly design the scaffolding sequence is failing to implement the core mechanism through which learning science says learning happens.

### Theme 4: Marketing Creates Anti-Pedagogical Incentives
The MOOC literature and critical instructional design literature establish that market pressures (scale, accessibility, speed-to-production) create systematic incentives to prioritize content delivery over outcome alignment. AI tools, which optimize for producing content quickly, are a technological amplifier of this pre-existing failure mode. The project is not addressing an AI problem alone — it is addressing a structural tension in course production that AI makes more acute.

---

## Priority Sources for Deeper Extraction

| Priority | Source | Reason |
|----------|--------|--------|
| 1 | Gentner, Loewenstein & Thompson (2003) — "Learning and Transfer: A General Role for Analogical Encoding" | Empirical anchor for comparison-based learning; foundational |
| 2 | Hardman, Philippa — "AI in Instructional Design: Reflections on 2024" (Substack) | Best practitioner voice on AI quality gap |
| 3 | Merrill (2002) — "First Principles of Instruction" (original PDF) | Primary source for problem-centered curriculum criteria |
| 4 | TechTrends SWOT paper (Springer, 2024) | Academic SWOT on GenAI in ID — most rigorous quality-gap source |
| 5 | 2025 second-order flipped classroom meta-analysis (ScienceDirect) | Most current evidence on flipped effectiveness and moderators |
| 6 | Vendetti et al. (2015) — "Analogical Reasoning in the Classroom" | Research-to-practice bridge for comparison-based learning |
| 7 | MDPI Education 4.0 prompt engineering paper (2024) | Concrete prompt architecture models for pedagogical alignment |

---

## Gaps Identified in This Scan (For Follow-Up)

- **Adult learner specificity:** Most flipped classroom meta-analyses are K-12 or undergraduate. Need targeted search for professional/adult learner contexts specifically.
- **Worked examples research:** Sweller's worked examples effect was mentioned but not directly searched — important for the Theory → Method → Application claim.
- **Constructive alignment (Biggs):** Only briefly surfaced. The constructive alignment framework (learning outcomes → assessment → activities alignment) is closely related to backward design and deserves its own search.
- **Spaced repetition and retention:** Gagné's Event 9 (enhance retention and transfer) points to spacing effects, but this was not searched directly.
- **Practitioner forums:** The marketing/pedagogy tension is likely discussed more directly in practitioner communities (LinkedIn, ID communities of practice) than in academic literature. Consider qualitative scrape.
