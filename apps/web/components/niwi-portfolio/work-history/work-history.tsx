import { WorkHistoryDetail } from "./work-history-detail";
import { WorkHistoryImage } from "./work-history-image";
import { WorkHistoryItem } from "./work-history-item";

const WorkHistory = () => {
  return (
    <section id="work-history" className="w-full max-w-[720px] mx-auto my-10">
      <div>
        <h2 className="text-xl font-bold mb-3">Work History</h2>
      </div>
      <div>
        <WorkHistoryItem>
          <WorkHistoryImage
            alt="Binary Lab"
            url="/images/portfolio/binarylab.png"
          />
          <WorkHistoryDetail
            companyName="Binary Lab"
            date="Jul 2023 - Present"
            role="Senior NextJs, React Developer"
          >
            <>
              Currently, I’m working on a project for the Croucher Foundation
              based in HongKong. I’m updating their old WordPress site to
              Next.js, incorporating CMS editor tools for a more modern and
              efficient user experience. For more information about the Croucher
              Foundation
            </>
          </WorkHistoryDetail>
        </WorkHistoryItem>
        <WorkHistoryItem>
          <WorkHistoryImage
            alt="Mo Operandy"
            url="/images/portfolio/mo-money.png"
          />
          <WorkHistoryDetail
            companyName="Mo.com.mm"
            date="Jan 2023 - June 2023 "
            role="Senior React Native Developer"
          >
            <>
              I played a pivotal role in fostering collaboration with the
              Vietnam team. My focus was on articulating and fulfilling
              essential requirements for feature development using React Native.
              Working within a team proficient in core banking, I specialized in
              API integration and implemented crucial error logging features for
              app development.
            </>
          </WorkHistoryDetail>
        </WorkHistoryItem>
        <WorkHistoryItem>
          <WorkHistoryImage
            alt="uab Bank"
            url="/images/portfolio/uabbank.jpg"
          />
          <WorkHistoryDetail
            companyName="uab Bank"
            date="Jul 2021 - May 2022"
            role="Senior React Native Developer"
          >
            <>
              At this time, I find it quite challenging as my background is in
              frontend web development. However, in my current role, I work as a
              mobile developer with React Native. Fortunately, the transition
              isn’t taking much time because ReactJS and React Native share many
              similarities.
            </>
          </WorkHistoryDetail>
        </WorkHistoryItem>
        <WorkHistoryItem>
          <WorkHistoryImage
            alt="Move Move Everything"
            url="/images/portfolio/move-move.png"
          />
          <WorkHistoryDetail
            companyName="Move Move Everything"
            date="Jan 2021 - Jun 2021"
            role="Senior React Developer"
          >
            <>
              Despite the learning curve of logistics sector, I dedicated myself
              to the role and successfully contributed to the development of
              various internal dashboards.
            </>
          </WorkHistoryDetail>
        </WorkHistoryItem>
        <WorkHistoryItem>
          <WorkHistoryImage
            alt="Marathon Myanmar"
            url="/images/portfolio/marathon-myanmar.png"
          />
          <WorkHistoryDetail
            companyName="Marathon Myanmar"
            date="Jan 2020 - Dec 2020"
            role="Mid-Level VueJs Developer"
          >
            <>
              My primary focus was on crafting seamless user experiences through
              the integration of UX/UI design with coding for the Marathon Web
              platform. Utilizing Nuxt.js, a Vue.js Server Side Framework, I was
              instrumental in developing internal portals, including an agent
              portal and a customer service portal.
            </>
          </WorkHistoryDetail>
        </WorkHistoryItem>
        <WorkHistoryItem>
          <WorkHistoryImage
            alt="Fairway Technology"
            url="/images/portfolio/fairway.jpg"
          />
          <WorkHistoryDetail
            companyName="Fairway Technology"
            date="May 2019 - Jan 2020"
            role="Internship Program, Junior Developer"
          >
            <>
              I was selected as an intern and actively contributed to projects
              involving Vue.js and React.js during this period.I had the
              opportunity to work with ReactJS on the career listing page on
              large project, similar to a job-finding platform and it is for
              AyaBank.
            </>
          </WorkHistoryDetail>
        </WorkHistoryItem>
        <WorkHistoryItem>
          <WorkHistoryImage
            alt="Spiceworks Myanmar"
            url="/images/portfolio/spiceworks-mm.jpg"
          />
          <WorkHistoryDetail
            companyName="Spiceworks Myanmar"
            date="Mar 2018 - Nov 2018"
            role="Part-time Frontend Developer as Student"
          >
            <>
              I specialized in ensuring pixel-perfect designs and client-side
              frontend development using HTML, CSS, and JavaScript. My
              responsibilities included maintaining a high standard of visual
              precision and collaborating with clients to achieve their desired
              frontend designs. One of my significant achievements was
              spearheading the development of the WIT 2019 landing page, where I
              took on the responsibility of translating creative concepts into
              functional and visually appealing web designs.
            </>
          </WorkHistoryDetail>
        </WorkHistoryItem>
      </div>
    </section>
  );
};

export default WorkHistory;
