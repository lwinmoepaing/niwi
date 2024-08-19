import { EducationHistoryDetail } from "./education-history-detail";
import { EducationHistoryImage } from "./education-history-image";
import { EducationHistoryItem } from "./education-history-item";

const EducationHistory = () => {
  return (
    <section id="education-history" className="w-full max-w-[720px] mx-auto my-10">
      <div>
        <h2 className="text-xl font-bold mb-3">Education History</h2>
      </div>
      <div>
        <EducationHistoryItem>
          <EducationHistoryImage
            alt="Hong Kong University"
            url="/images/portfolio/uohk.jpg"
          />
          <EducationHistoryDetail
            companyName="Hong Kong University"
            date="2022 - 2023"
            role="Certified React Full Stack Developer"
          />
        </EducationHistoryItem>
        <EducationHistoryItem>
          <EducationHistoryImage
            alt="University of Yangon"
            url="/images/portfolio/uoy.jpg"
          />
          <EducationHistoryDetail
            companyName="University of Yangon"
            date="2019 - 2020"
            role="Diploma in Web Development"
          />
        </EducationHistoryItem>
        <EducationHistoryItem>
          <EducationHistoryImage
            alt="UCSY"
            url="/images/portfolio/ucsy.jpg"
          />
          <EducationHistoryDetail
            companyName="University of Computer Studies, Yangon"
            date="2013 - 2015"
            role="Completing coursework up to the third year"
          />
        </EducationHistoryItem>
      </div>
    </section>
  );
};

export default EducationHistory;
