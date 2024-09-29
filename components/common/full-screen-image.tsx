import { ImageKey, images } from "@/assets/image";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type Props = {
  imageKey: ImageKey;
  alt: string;
};

export const FullScreenImage = ({ imageKey, alt }: Props) => {
  return (
    <div className="relative w-full h-auto">
      <Zoom>
        <Image
          src={images[imageKey]}
          alt={alt}
          width={200}
          height={200}
          className="w-full h-auto cursor-pointer object-cover"
        />
      </Zoom>
    </div>
  );
};
