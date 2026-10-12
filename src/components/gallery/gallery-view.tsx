"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems, galleryCategories, GalleryCategory, GalleryItem } from "@/data/gallery";
import { Calendar, Tag, ExternalLink, X, ZoomIn } from "lucide-react";

export function GalleryView() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 max-w-6xl">
      {/* Header Section */}
      <div className="mb-12 text-center md:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono uppercase tracking-wider text-primary">
          Verified Media & Photographs
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
          Photography & Media Gallery
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Authentic photographs, competition achievements, and engineering architecture diagrams documenting the work of{" "}
          <strong className="text-foreground">Karan Raj KR</strong>.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10 justify-start" role="tablist" aria-label="Media Categories">
        {galleryCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                isActive
                  ? "bg-foreground text-background shadow-md"
                  : "bg-muted/10 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.figure
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative flex flex-col rounded-2xl border border-border/80 bg-muted/10 overflow-hidden hover:border-primary/40 hover:bg-muted/20 transition-all duration-300"
            >
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20 cursor-pointer"
                onClick={() => setActiveItem(item)}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  priority={item.isPortrait}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-background/85 backdrop-blur-md border border-border/60 text-foreground">
                    <Tag className="w-3 h-3 text-primary" />
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              <figcaption className="p-5 flex flex-col flex-grow justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={item.date}>{item.date}</time>
                  </span>
                  {item.relatedUrl && (
                    <Link
                      href={item.relatedUrl}
                      className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                    >
                      Context <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-2xl p-6 flex flex-col gap-4"
            >
              <button
                onClick={() => setActiveItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/40 hover:bg-muted text-foreground transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[50vh] sm:h-[60vh] rounded-xl overflow-hidden bg-muted/10">
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                    {activeItem.categoryLabel}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {activeItem.width} × {activeItem.height} px
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">
                    Date: {activeItem.date}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-foreground">
                  {activeItem.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {activeItem.description}
                </p>

                {activeItem.relatedUrl && (
                  <div className="pt-2">
                    <Link
                      href={activeItem.relatedUrl}
                      onClick={() => setActiveItem(null)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors"
                    >
                      View Associated Case Study / Page <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
