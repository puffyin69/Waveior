import { Outfit } from "next/font/google";
import Image from "next/image";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});
const Aboutus = () => {
  return (
    <>
      <div className="mt-16 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <h1
            className={`text-5xl text-center font-bold text-gray-800 ${outfit.className}`}
          >
            About us
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mx-4 md:mx-20 mb-32 pb-16">
        <div>
          <Image
            src="/aboutus.jpg"
            alt="about us"
            width={500}
            height={400}
            className="object-cover rounded-lg overflow-hidden shadow-lg w-full h-64"
          />
        </div>
        <div className="space-y-4">
          <h2
            className={`text-3xl font-bold text-gray-800 ${outfit.className}`}
          >
            Our Mission
          </h2>
          <p
            className={`text-lg text-gray-600 leading-relaxed ${outfit.className}`}
          >
            Wearvio isn’t just about fashion — it’s about feeling seen. We craft
            every piece to help you express your raw, authentic self — with
            minimal effort and maximum impact. Inspired by modern streetwear and
            driven by timeless design, our mission is to empower creators,
            thinkers, and everyday rebels to wear confidence like a second skin.
          </p>
        </div>
      </div>
    </>
  );
};
export default Aboutus;
