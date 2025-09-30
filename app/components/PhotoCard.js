import RevealOnScroll from "./RevealOnScroll";

export default function PhotoCard() {
  const images = ["w2.jpg", "s2.webp", "s3.webp"];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 p-8 mt-[80px] lg:mt-[170px]">
      {/* Ліва частина — текст */}

      <div className="flex-1 relative w-full h-64 lg:h-80 flex justify-center">
        <div
          className="relative
          w-[250px] h-[250px]   /* за замовчуванням для мобільних */
          sm:w-full sm:max-w-[320px] sm:aspect-[1/1]  /* з ширини ≥640px */"
        >
          {images.map((src, index) => (
            <img
              data-reveal
              key={index}
              src={src}
              alt={`Фото ${index + 1}`}
              className={`
        photo-card-img
        absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg
        transition-transform duration-300
      `}
              data-photo-index={index}
            />
          ))}
        </div>
      </div>

      {/* Права частина — фото */}

      <div
        data-reveal
        className="flex-1 text-center lg:text-left mt-[40px] md:mt-[80px] z-40"
      >
        <div className="flex items-center">
          <h2 className="text-3xl font-bold mb-4 text-[#171717]">Про нас</h2>
          <span className="h-[1px] border-t-2 w-[34px] border-dotted border-[#0f0f0f] mt-[-10px] ml-[15px]"></span>
        </div>

        <p className="text-gray-700 text-lg">
          Тут можна написати опис, наприклад, цікаву інформацію про продукт чи
          фотографії.
        </p>
      </div>
      <RevealOnScroll />

      {/* Локальний CSS — можна винести у файл .css або .module.css */}
      <style>{`
        /* Загальний клас для картинок */
        .photo-card-img {
          transition: transform 300ms cubic-bezier(.4,0,.2,1), box-shadow 300ms;
          transform-origin: center;
          /* щоб браузер оптимізував анімацію */
          will-change: transform;
        }

        /* Початкові позиції і оберт для кожного фото */
        .photo-card-img[data-photo-index="0"] {
          left: -80px;
          top: 100px;
          transform: rotate(-15deg);
        }
        .photo-card-img[data-photo-index="1"] {
          left: 1rem; /* lg:left-8 ~ 2rem */
          top: -5rem;  /* lg:top-4 ~ 1rem */
          transform: rotate(0deg);
        }
        .photo-card-img[data-photo-index="2"] {
          left: 8rem; /* lg:left-16 ~ 4rem */
          top: 2rem;  /* lg:top-8 ~ 2rem */
          transform: rotate(15deg);
        }

        /* Hover: зберігаємо початковий поворот, додаємо підняття, невеликий масштаб і великий z-index */
        .photo-card-img[data-photo-index="0"]:hover {
          transform: scale(1.03);
          z-index: 40;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        .photo-card-img[data-photo-index="1"]:hover {
          transform:  scale(1.03);
          z-index: 40;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        .photo-card-img[data-photo-index="2"]:hover {
          transform:  scale(1.03);
          z-index: 40;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }

      @media (max-width: 618px) {
        .photo-card-img[data-photo-index="0"] {
        left: -20px;  /* нові значення */
        top: 50px;
        }
        .photo-card-img[data-photo-index="1"] {
        left: 0.5rem;
        top: -2rem;
        }
        .photo-card-img[data-photo-index="2"] {
        left: 4rem;
        top: 1rem;
        }
      }
      @media (max-width: 515px) {
        .photo-card-img[data-photo-index="0"] {
        left: -30px;  /* нові значення */
        top: 50px;
        }
        .photo-card-img[data-photo-index="1"] {
        left: 0.5rem;
        top: -2rem;
        }
        .photo-card-img[data-photo-index="2"] {
        left: 3rem;
        top: 1rem;
        }
        @media (max-width: 380px) {
        .photo-card-img[data-photo-index="0"] {
        left: -10px;  /* нові значення */
        top: 20px;
        }
        .photo-card-img[data-photo-index="1"] {
        left: 0.5rem;
        top: 0rem;
        }
        .photo-card-img[data-photo-index="2"] {
        left: 1rem;
        top: 1rem;
        }
      }
      `}</style>
    </div>
  );
}

