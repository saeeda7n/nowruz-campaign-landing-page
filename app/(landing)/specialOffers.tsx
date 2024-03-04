"use client";
import React from "react";
import { MoveLeft, PartyPopper, Truck } from "lucide-react";
import { special_offers } from "@/data/landing/content.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const colors = [
  { name: "مشکی", cssColor: "#4A4A4A" },
  { name: "طلایی", cssColor: "#FDB913" },
  { name: "نقره ای", cssColor: "#EFEFF0" },
  { name: "بنقش", cssColor: "#815F91" },
];

type Colors = {
  name: string;
  cssColor: string;
};
type ProductCardProps = {
  title: string;
  price: number;
  discount: number;
  colors: Colors[];
  attachedUrl: string;
  body: string;
  freeDelivery: boolean;
  thumbnail: string;
};

function ProductCard({
  title,
  colors,
  body,
  price,
  discount,
  freeDelivery,
  attachedUrl,
  thumbnail,
}: ProductCardProps) {
  return (
    <div className="relative w-[19rem] flex-shrink-0 rounded-[2rem] bg-white p-2 shadow-2xl">
      <div className="absolute end-2 top-2 flex min-h-16 w-12 select-none flex-col items-center justify-center rounded-3xl bg-black py-3 text-center text-xs font-medium text-gray-50">
        <Truck />
        ارسال رایگان
      </div>
      <div className="mt-5 w-full">
        <div className="relative mx-auto flex aspect-video h-60 w-44 items-center  ">
          <img
            alt={title}
            draggable={false}
            src={thumbnail}
            className="h-full w-full object-contain object-center"
          />
          {discount > 0 && (
            <div className="absolute mb-5 flex size-[4.2rem] items-center justify-center rounded-full bg-[red] pt-0.5 text-2xl font-bold text-gray-50">
              {discount}%
            </div>
          )}
        </div>
      </div>
      <div className="my-2 flex">
        <div className="mx-auto flex h-5 gap-0.5 rounded-full border p-0.5">
          {colors.map((item) => (
            <div
              key={item.name}
              style={{ backgroundColor: item.cssColor }}
              className="aspect-square h-full rounded-full"
            />
          ))}
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mx-auto max-w-44 text-center text-xs font-light">
          {body}
        </p>
      </div>
      <div className="mt-2 flex items-end gap-6">
        <div className="ms-auto flex flex-1 flex-col">
          {discount > 0 && (
            <div className="flex items-center justify-end gap-1 font-bold text-[red]">
              <span className="text-sm tracking-wide line-through">
                {price.toLocaleString()}
              </span>
              <span className="text-xs">تومان</span>
            </div>
          )}
          <div className="flex items-center justify-end gap-1 font-bold text-gray-950">
            <span className="text-lg tracking-wide">
              {(price - (discount / 100) * price).toLocaleString()}
            </span>
            <span className="text-sm">تومان</span>
          </div>
        </div>
        <a
          href={attachedUrl}
          className="ms-auto flex size-12 items-center justify-center rounded-full bg-orange-600 text-gray-50"
        >
          <MoveLeft strokeWidth={3} />
        </a>
      </div>
    </div>
  );
}

const SpecialOffers = () => {
  return (
    <section className="mx-[calc(50%-50vw)] overflow-hidden bg-gray-100 py-16">
      <div className="container space-y-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="text-brown flex gap-2">
            <PartyPopper />
            <h3 className="text-lg font-bold">محصولات شگفت انگیز</h3>
          </div>
        </div>
        <div>
          <Swiper
            spaceBetween={38}
            slidesPerView="auto"
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className="mySwiper !overflow-visible"
          >
            {special_offers.map(({ id, ...product }) => (
              <SwiperSlide className="!w-[19rem]" key={id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
