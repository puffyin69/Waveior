"use client";
import { cn } from "@/lib/utils";

export function Card({ title, description, Actualimg, overlayimg }) {
  return (
    <div className="max-w-xs w-full">
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "bg-cover bg-center",
          "shadow-2xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500 hover:scale-105"
        )}
        style={{
          backgroundImage: `url(${Actualimg || 'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'})`,
        }}
        onMouseEnter={(e) => {
          if (overlayimg) {
            e.currentTarget.style.backgroundImage = `url(${overlayimg})`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundImage = `url(${Actualimg || 'https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'})`;
        }}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {title || "Background Overlays"}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {description || "This card is for some special elements, like displaying background gifs on hover only."}
          </p>
        </div>
      </div>
    </div>
  );
}
