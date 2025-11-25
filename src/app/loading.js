export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 backdrop-blur-sm z-9999">
      <div className="animate-spin w-14 h-14 rounded-full border-4 border-black border-t-transparent"></div>
    </div>
  );
}
