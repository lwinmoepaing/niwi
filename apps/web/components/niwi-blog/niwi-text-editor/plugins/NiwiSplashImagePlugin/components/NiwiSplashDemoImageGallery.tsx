import Image from "next/image";
import { memo } from "react";
import NiwiSplashLoading from "./NiwiSplashLoading";

const NiwiSplashDemoImageGallery = () => {
  const isLoading = false;

  return (
    <div>
      {isLoading ? (
        <>
          <NiwiSplashLoading />
        </>
      ) : (
        <div className="niwi-editor-splash-photo-gallery">
          <div className="niwi-editor-splash-photo-column">
            <div className="niwi-editor-splash-photo-column-photo">
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1500576992153-0271099def59?ixid=M3wxMzcyNnwwfDF8c2VhcmNofDF8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3"
              />
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?ixid=M3wxMzcyNnwwfDF8c2VhcmNofDJ8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3"
              />
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1531592937781-344ad608fabf?ixid=M3wxMzcyNnwwfDF8c2VhcmNofDN8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3"
              />
            </div>
          </div>

          <div className="niwi-editor-splash-photo-column">
            <div className="niwi-editor-splash-photo-column-photo">
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1568144628871-ccbb00fc297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMzcyNnwwfDF8c2VhcmNofDZ8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3&q=80&w=200"
              />
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1542880435-afda6a0019dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMzcyNnwwfDF8c2VhcmNofDR8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3&q=80&w=200"
              />
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1531592937781-344ad608fabf?ixid=M3wxMzcyNnwwfDF8c2VhcmNofDN8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3"
              />
            </div>
          </div>

          <div className="niwi-editor-splash-photo-column">
            <div className="niwi-editor-splash-photo-column-photo">
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1596443686812-2f45229eebc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMzcyNnwwfDF8c2VhcmNofDh8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3&q=80&w=200"
              />
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1500576992153-0271099def59?ixid=M3wxMzcyNnwwfDF8c2VhcmNofDF8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3"
              />
              <Image
                className="niwi-editor-splash-photo-column-img"
                width={300}
                height={300}
                alt="Hello"
                src="https://images.unsplash.com/photo-1520453803296-c39eabe2dab4?ixid=M3wxMzcyNnwwfDF8c2VhcmNofDJ8fEhlbGxvfGVufDB8fHx8MTcyMTE5MTE0MHww&ixlib=rb-4.0.3"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(NiwiSplashDemoImageGallery);
