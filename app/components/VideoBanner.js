// export default function VideoBanner() {
//   return (
//     <section className="w-full aspect-video relative">
//       <iframe
//         className="w-full h-full object-cover pointer-events-none"
//         src="https://www.youtube.com/embed/KL0ALLWT32s?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&start=5&loop=1&playlist=KL0ALLWT32s"
//         title="YouTube video player"
//         frameBorder="0"
//         allow="autoplay; encrypted-media"
//         allowFullScreen
//       ></iframe>

//       <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-20"></div>
//     </section>
//   );
// }

export default function VideoBanner() {
  return (
    <div className="w-full aspect-video relative">
      <iframe
        className="w-full h-full object-cover pointer-events-none"
        src="https://www.youtube.com/embed/KL0ALLWT32s?autoplay=1&mute=1&controls=0&loop=1&playlist=KL0ALLWT32s"
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      {/* затемнення */}
      <div className="absolute inset-0 bg-black/40 z-10" />
    </div>
  );
}
