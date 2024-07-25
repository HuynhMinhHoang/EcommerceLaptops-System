import React from "react";
import "./LaptopDetail.scss";

const LaptopDetail = () => {
  return (
    <div class="bg-card p-6 rounded-lg shadow-lg">
      <div class="flex items-start">
        <div class="flex flex-col items-center space-y-4">
          <img
            src="https://placehold.co/200x200"
            alt="Laptop Image"
            class="rounded-lg"
          />
          <div class="flex space-x-2">
            <img
              src="https://placehold.co/50x50"
              alt="Thumbnail 1"
              class="border-2 border-primary rounded-lg"
            />
            <img
              src="https://placehold.co/50x50"
              alt="Thumbnail 2"
              class="rounded-lg"
            />
            <img
              src="https://placehold.co/50x50"
              alt="Thumbnail 3"
              class="rounded-lg"
            />
            <img
              src="https://placehold.co/50x50"
              alt="Thumbnail 4"
              class="rounded-lg"
            />
            <img
              src="https://placehold.co/50x50"
              alt="Thumbnail 5"
              class="rounded-lg"
            />
          </div>
        </div>

        <div class="ml-6 flex-1">
          <div class="text-sm text-muted-foreground mb-2">
            <a href="#" class="text-primary hover:underline">
              Trang chủ
            </a>{" "}
            /{" "}
            <a href="#" class="text-primary hover:underline">
              Laptop
            </a>{" "}
            /<span>Laptop gaming ASUS ROG Strix G16 G614JI N4125W</span>
          </div>
          <h1 class="text-xl font-bold mb-2">
            Laptop gaming ASUS ROG Strix G16 G614JI N4125W
          </h1>
          <div class="flex items-center mb-4">
            <div class="text-yellow-500">0★</div>
            <a href="#" class="ml-2 text-primary hover:underline">
              Xem đánh giá
            </a>
          </div>
          <div class="text-3xl font-bold text-red-600 mb-2">49.990.000đ</div>
          <div class="text-muted-foreground line-through mb-2">54.990.000đ</div>
          <div class="bg-red-100 text-red-600 px-2 py-1 rounded-lg inline-block mb-4">
            -9%
          </div>
          <div class="bg-accent text-accent-foreground p-4 rounded-lg mb-4">
            <div class="flex items-center">
              <img
                aria-hidden="true"
                alt="gift-icon"
                src="https://openui.fly.dev/openui/24x24.svg?text=🎁"
                class="mr-2"
              />
              <span>Quà tặng khuyến mãi</span>
            </div>
            <div class="flex items-center mt-2">
              <img
                aria-hidden="true"
                alt="gift-icon"
                src="https://openui.fly.dev/openui/24x24.svg?text=1"
                class="mr-2"
              />
              <span>
                GeForce RTX 40 Series bundle - Black Myth Wukong Game Code -
                Laptop ASUS
              </span>
            </div>
          </div>
          <button class="bg-red-600 text-white px-6 py-3 rounded-lg w-full mb-4">
            MUA NGAY
          </button>
          <ul class="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            <li>Bảo hành chính hãng 24 tháng.</li>
            <li>Hỗ trợ đổi mới trong 7 ngày.</li>
            <li>Miễn phí vận chuyển toàn quốc.</li>
          </ul>
          <div class="text-red-600">
            Hỗ trợ trả góp MPOS (Thẻ tín dụng), HDSAISON (
            <a href="#" class="text-primary hover:underline">
              Xem chi tiếtâ
            </a>
            ).
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopDetail;
