import { image, images } from "@/assets/image";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type Props = {
  image: image;
  alt: string;
};

export const FullScreenImage = ({ image, alt }: Props) => {
  return (
    <div className="relative w-full h-auto">
      <Zoom>
        <Image
          src={images[image]}
          alt={alt}
          width={200}
          height={200}
          className="w-full h-auto cursor-pointer object-cover"
        />
      </Zoom>
    </div>
  );
};
