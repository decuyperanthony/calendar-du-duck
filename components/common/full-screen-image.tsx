"use client";

import { image, images } from "@/assets/image";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Card } from "../ui/card";

type Props = {
  image: image;
  alt: string;
};

export const FullScreenImage = ({ image, alt }: Props) => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative w-full overflow-auto bg-muted/30">
        <div className="min-w-[320px] p-2 md:p-4">
          <Zoom>
            <Image
              src={images[image]}
              alt={alt}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg cursor-zoom-in object-contain"
              priority
            />
          </Zoom>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-border/50 bg-muted/20">
        <p className="text-xs text-muted-foreground text-center">
          Touchez l&apos;image pour zoomer
        </p>
      </div>
    </Card>
  );
};
