import portfolioConfig from "@/portfolio.config";
import { EducationHistoryDetail } from "./education-history-detail";
import { EducationHistoryImage } from "./education-history-image";
import { EducationHistoryItem } from "./education-history-item";

const { educationHistory } = portfolioConfig;

const EducationHistory = () => {
  return (
    <section
      id="education-history"
      className="w-full max-w-[720px] mx-auto my-10"
    >
      <div>
        <h2 className="text-xl font-bold mb-3">{educationHistory.title}</h2>
      </div>
      <div>
        {educationHistory.educationList.map((item) => (
          <EducationHistoryItem key={`${item.name}_${item.timeline}`}>
            <EducationHistoryImage alt={item.name} url={item.image} />
            <EducationHistoryDetail
              name={item.name}
              date={item.timeline}
              message={item.message}
            />
          </EducationHistoryItem>
        ))}
      </div>
    </section>
  );
};

export default EducationHistory;
