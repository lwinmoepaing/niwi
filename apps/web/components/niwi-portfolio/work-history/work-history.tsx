const WorkHistory = () => {
  return (
    <section className="w-full max-w-[720px] mx-auto mt-10">
      <section id="work-history">
        <div>
          <h2 className="text-xl font-bold mb-3">Work History</h2>
        </div>
        <div>
          <div>
            <a className="block cursor-pointer" href="#">
              <div className="rounded-lg bg-card text-card-foreground flex">
                <div className="flex-none">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto bg-muted-background dark:bg-foreground">
                    {/* <img
                      className="aspect-square h-full w-full object-contain"
                      alt="Atomic Finance"
                      src="/atomic.png"
                    /> */}
                  </span>
                </div>
                <div className="flex-grow ml-4 items-center flex-col group">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-x-2 text-base">
                      <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                        uab bank
                        <span className="inline-flex gap-x-1"></span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-chevron-right size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 rotate-90"
                        >
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </h3>
                      <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                        May 2021 - Oct 2022
                      </div>
                    </div>
                    <div className="font-sans text-xs">
                      Senior React Native Developer
                    </div>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm">
                    At this time, I find it quite challenging as my background
                    is in frontend web development. However, in my current role,
                    I work as a mobile developer with React Native. Fortunately,
                    the transition isn’t taking much time because ReactJS and
                    React Native share many similarities. Despite this, I need
                    to familiarize myself with some native modules for specific
                    app functionalities. I am responsible for overseeing the
                    transition from version 1 to version 2, and implementing the
                    exciting gold exchange feature for our banking company’s
                    app.
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

export default WorkHistory;
