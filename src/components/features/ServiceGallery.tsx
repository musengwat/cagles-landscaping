import { useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Service } from '@/types';

interface ServiceGalleryProps {
  service: Service;
}

export function ServiceGallery({ service }: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? service.fields.galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === service.fields.galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Before & After Gallery
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
            See the transformative power of our {service.fields.title.toLowerCase()} work.
            These real projects showcase the quality and attention to detail we bring to every job.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {service.fields.galleryImages.map((image, index) => (
            <div
              key={image.sys.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <ExportedImage
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <ExternalLink className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">View Full Size</span>
                </div>
              </div>

              {/* Image Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-medium text-sm">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA */}
        <div className="text-center">
          <p className="text-text-secondary mb-6">
            Ready to see similar results for your property?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              <a href="/contact">Get Your Free Estimate</a>
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <a href="/portfolio">View More Projects</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Image */}
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <ExportedImage
              src={service.fields.galleryImages[selectedImage].url}
              alt={service.fields.galleryImages[selectedImage].title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className="bg-black/60 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-white font-medium mb-1">
                {service.fields.galleryImages[selectedImage].title}
              </h3>
              <p className="text-gray-300 text-sm">
                {selectedImage + 1} of {service.fields.galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}