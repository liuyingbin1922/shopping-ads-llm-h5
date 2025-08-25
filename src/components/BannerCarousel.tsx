import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Banner } from '../types'
import 'swiper/css'
import 'swiper/css/pagination'

interface BannerCarouselProps {
  banners: Banner[]
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-48 sm:h-64"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div 
              className="relative w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${banner.image})`,
                backgroundColor: banner.backgroundColor 
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p className="text-lg sm:text-xl opacity-90">
                      {banner.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
