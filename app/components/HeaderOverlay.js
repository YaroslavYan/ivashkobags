import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import RevealOnScroll from "./RevealOnScroll";

function HeaderOverlay() {
  return (
    //Or absolute
    <header className="top-0 left-0 w-full h-full z-50 m-0 p-0 absolute">
      <div
        className="flex justify-between h-full mx-auto w-full m-0 p-0 relative"
        // style={{ maxWidth: "1600px" }}
      >
        <Navigation />

        {/* Мобільне меню */}
        <MobileNavigation />

        <div className="absolute left-[50px] bottom-1/4 ">
          <h1 data-reveal className="text-white font-bold text-3xl from-down">
            Створені руками, натхненні штанами.
          </h1>
          <p data-reveal className="text-white from-up">
            Друге життя одягу — перша любов до сумок.
          </p>
        </div>
        <RevealOnScroll />
      </div>
    </header>
  );
}

export default HeaderOverlay;
