import { cn } from "@/lib/utils";

const celebrities = [
  {
    id: 1,
    name: "Celebrity 1",
    imageUrl: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749971932/images%20with%20celeb/dnnvnjanjzyfqglcisfb.jpg",
    role: "Bollywood Actor"
  },
  {
    id: 2,
    name: "Celebrity 2",
    imageUrl: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749971931/images%20with%20celeb/eljvini6pe8qitbsughf.jpg",
    role: "Bollywood Actress"
  },
  {
    id: 3,
    name: "Celebrity 3",
    imageUrl: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749971931/images%20with%20celeb/zihmmsyakdk3nwzzp7vk.jpg",
    role: "Bollywood Star"
  },
  {
    id: 4,
    name: "Celebrity 4",
    imageUrl: "https://res.cloudinary.com/dhxetyrkb/image/upload/v1749971931/images%20with%20celeb/hxcoapvwqjk7io6po7ak.jpg",
    role: "Bollywood Star"
  }
];

export default function RecognizedByCelebrities() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Recognized by <span className="text-primary">Celebrities</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Trusted by the biggest names in the entertainment industry for creating memorable events
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {celebrities.map((celebrity, index) => (
            <div 
              key={celebrity.id}
              className={cn(
                "group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                "bg-card border border-border"
              )}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={celebrity.imageUrl}
                  alt={celebrity.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{celebrity.name}</h3>
                  <p className="text-muted-foreground text-sm">{celebrity.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
