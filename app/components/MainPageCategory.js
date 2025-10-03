import RevealOnScroll from "./RevealOnScroll";
import SidebarMenu from "../products/SidebarMenu";

export default function MainPageCategory() {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8 mt-24">
      <div
        data-reveal
        className="flex-1 from-left flex flex-col justify-between h-[300px]"
      >
        {/* Верх */}
        <div className="flex flex-col items-center gap-3 pb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#171717]">
            Обирай за категоріями
          </h2>
          <span className="h-[22px] border-l-2 w-[1px] border-dotted border-[#0f0f0f]"></span>
        </div>

        {/* Центр */}
        <div className="flex flex-1 items-center justify-center">
          <ul className="md:max-w-[400px] space-y-4 text-[#171717]">
            <li>
              <strong>Тоут сумки</strong> — твій надійний напарник у великому
              місті. Просторі й стильні.
            </li>
            <li>
              <strong>Шопер / Торба</strong> — для прогулянок, покупок і пригод.
              Легкі, з характером.
            </li>
            <li>
              <strong>Міні сумочки / Хінкальні куб</strong> — маленькі, але з
              великим настроєм. Додають родзинку образу.
            </li>
          </ul>
        </div>
      </div>

      <div
        data-reveal
        className="flex-1 justify-end flex flex-col gap-4 from-right"
      >
        <SidebarMenu variant="main" />
      </div>
      <RevealOnScroll />
    </div>
  );
}
