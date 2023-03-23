"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import Image from "next/image";
import { VideoDetail } from "@/application/domain/video";
import "swiper/swiper.min.css";

type Props = VideoDetail;

export default function ImgSwiper({ movie }: { movie: Props }) {
  return (
    <Swiper>
      <SwiperSlide style={{ width: "500px" }}>
        <Image
          className="rounded-lg"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          style={{
            // maxWidth: "100%",
            height: "100%",
          }}
        ></Image>
      </SwiperSlide>
      <SwiperSlide style={{ width: "500px" }}>
        <Image
          className=" rounded-lg"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          style={{
            // maxWidth: "100%",
            height: "100%",
          }}
        ></Image>
      </SwiperSlide>
      <SwiperSlide style={{ width: "500px" }}>
        <Image
          className=" rounded-lg"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          style={{
            // maxWidth: "100%",
            height: "100%",
          }}
        ></Image>
      </SwiperSlide>
    </Swiper>
  );
}
