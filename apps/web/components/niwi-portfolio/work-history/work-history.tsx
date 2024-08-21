import portfolioConfig from "@/portfolio.config";
import { WorkHistoryDetail } from "./work-history-detail";
import { WorkHistoryImage } from "./work-history-image";
import { WorkHistoryItem } from "./work-history-item";

const { workHistory } = portfolioConfig;
const WorkHistory = () => {
  return (
    <section id="work-history" className="w-full max-w-[720px] mx-auto my-10">
      <div>
        <h2 className="text-xl font-bold mb-3">{workHistory.title}</h2>
      </div>
      <div>
        {workHistory.workList.map((item) => (
          <WorkHistoryItem key={`${item.companyName}_${item.role}`}>
            <WorkHistoryImage alt={item.companyName} url={item.companyImage} />
            <WorkHistoryDetail
              companyName={item.companyName}
              date={item.timeline}
              role={item.role}
            >
              <>{item.description}</>
            </WorkHistoryDetail>
          </WorkHistoryItem>
        ))}
      </div>
    </section>
  );
};

export default WorkHistory;
