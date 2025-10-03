import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import RevealOnScroll from "./RevealOnScroll";

function HeaderOverlay({ productsCartCount }) {
  return (
    //Or absolute
    <header className="top-0 left-0 w-full h-full z-50 m-0 p-0 absolute">
      <div
        className="flex justify-between h-full mx-auto w-full m-0 p-0 relative"
        // style={{ maxWidth: "1600px" }}
      >
        <Navigation productsCartCount={productsCartCount} />

        {/* Мобільне меню */}
        <MobileNavigation productsCartCount={productsCartCount} />

        <div className="absolute left-[50px] bottom-1/4 ">
          <h1
            data-reveal
            className="text-white font-bold text-xl md:text-2xl lg:text-3xl [@media(max-width:360px)]:text-sm from-right"
          >
            Сумки з історією. Твій стиль із новим подихом.
          </h1>
          <p
            data-reveal
            className="text-white text-sm md:text-base lg:text-lg [@media(max-width:360px)]:text-xs from-left"
          >
            Друге життя одягу — перша любов до сумок.
          </p>
        </div>
        <RevealOnScroll />
      </div>
    </header>
  );
}

export default HeaderOverlay;
