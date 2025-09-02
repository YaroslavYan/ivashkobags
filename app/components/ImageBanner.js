export default function ImageBanner() {
  return (
    <div className="w-full h-[500px] relative">
      <img
        src="/w1.jpg"
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
    </div>
  );
}
