import Image from "next/image";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type ProductGalleryProps = {
  items: readonly GalleryItem[];
};

export function ProductGallery({ items }: ProductGalleryProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.src}
          className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]"
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={1086}
            height={1448}
            className="aspect-[3/4] w-full object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg font-semibold text-bone">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-bone/60">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
