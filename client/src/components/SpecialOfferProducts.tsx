import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { Product } from "../types/product";
import HighlightBar from "./HighlightBar";
import DiscountTimer from "./DiscountTimer";
import SpecialOfferProductItem from "./SpecialOfferProductItem";
import { FaArrowLeft, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

interface SpecialOfferProductsProps {
  products: Product[] | undefined;
}

function SpecialOfferProducts({ products }: SpecialOfferProductsProps) {
  const discountedProducts = products?.filter((product) => product.discount > 0);

  return (
    <div className="mt-16 px-4 md:px-8">
      <h2 className="mb-6 text-lg font-semibold md:mb-8 md:text-2xl lg:text-3xl">تخفیف‌های مارکتی</h2>
      <HighlightBar />

      <div className="relative mt-10 h-full rounded-xl bg-primary-500 p-4 shadow-lg md:p-6 lg:rounded-2xl lg:p-8">
        <div className="flex w-full items-center justify-between rounded-lg md:hidden">
          <div className="flex items-center gap-1">
            <h2 className="text-sm font-semibold text-white md:text-lg">تخفیف ویژه %</h2>
            <DiscountTimer />
          </div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-white">مشاهده</p>
            <FaArrowLeft className="text-white" />
          </div>
        </div>

        <button id="ProductPrevBtn" className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 bg-white p-2 text-neutral-300 shadow-md hover:text-neutral-500 md:right-4 md:p-4">
          <FaLongArrowAltRight size={20} />
        </button>
        <button id="ProductNextBtn" className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border-2 bg-white p-2 text-neutral-300 shadow-md hover:text-neutral-500 md:left-4 md:p-4">
          <FaLongArrowAltLeft size={20} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 25 },
          }}
          navigation={{
            prevEl: `#ProductPrevBtn`,
            nextEl: `#ProductNextBtn`,
          }}
          className="h-full"
        >
          <SwiperSlide className="hidden h-[400px] flex-col items-center justify-center space-y-4 rounded-lg p-4 md:flex">
            <h2 className="text-lg font-semibold text-white">تخفیف ویژه %</h2>
            <DiscountTimer />
            <p className="flex items-center gap-2 text-sm font-medium text-white">
              مشاهده محصولات
              <FaArrowLeft />
            </p>
          </SwiperSlide>

          {discountedProducts?.map((product, index) => (
            <SwiperSlide key={index} className="rounded-xl">
              <SpecialOfferProductItem product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SpecialOfferProducts;
