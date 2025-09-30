import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ExportedImage
          src="https://images.unsplash.com/photo-1530462274063-62abdc6a564d?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful landscaped backyard with lush green lawn and garden beds in Fayetteville, Arkansas"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Trust Indicator */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/90 text-white text-sm font-medium rounded-full">
              Serving Northwest Arkansas Since 2015
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Transform Your Outdoor Space
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto text-balance">
            Professional Landscaping Services in Fayetteville, AR
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Get Free Estimate
              </Button>
            </Link>

            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-text-primary"
              >
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Additional Trust Elements */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-200">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>Family Owned & Operated</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>Free Estimates</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
