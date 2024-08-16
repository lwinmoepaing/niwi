import Image from "next/image";

type NiwiEmptyPaymentProps = {
  title?: string;
};

function NiwiEmptyPayment({
  title = "You have no payment.",
}: NiwiEmptyPaymentProps) {
  return (
    <section className="w-full">
      <div className="niwi-blog-profile-container text-[16px] flex flex-col justify-center items-center gap-y-[18px]">
        <p className="niwi-logo-text font-bold text-[24px] mt-2">{title}</p>
        <p className="tracking-widest flex flex-row w-full justify-center items-center gap-x-2 mb-4">
          <Image
            src={"/images/icons/payment.gif"}
            alt={"Blogs"}
            width={25}
            height={25}
            className="relative top-[-2px]"
          />
          There is no payment transaction.
        </p>
      </div>
    </section>
  );
}
export default NiwiEmptyPayment;
