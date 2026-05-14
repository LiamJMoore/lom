import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Clock, 
  MapPin, 
  Instagram, 
  Facebook, 
  Menu, 
  X, 
  Sparkles, 
  Minus,
  Quote
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SOLO_BOOKING_URL = "https://booksolo.co/thebodyworks/book/treatments";

const TREATMENTS = [
  {
    id: "mld-signature",
    title: "Manual Lymphatic Drainage",
    tag: "Signature Focus",
    description: "A specialized, gentle technique designed to stimulate the flow of lymph and detoxify the body. Essential for immune support, fluid retention, and systemic healing.",
    duration: "60 / 90 mins",
    price: "From £65",
    image: "https://images.unsplash.com/photo-1544161515-4ad6ce17521c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "mld-post-op",
    title: "Post-Surgical Recovery (MLD)",
    tag: "Clinical",
    description: "Strategic lymphatic drainage tailored for post-operative sessions. Reduces swelling, accelerates healing, and minimizes scar tissue formation.",
    duration: "60 mins",
    price: "£75",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "deep-tissue",
    title: "Therapeutic Deep Tissue",
    tag: "Muscle Release",
    description: "Targeted, slow strokes and firm pressure to reach deeper layers of muscle and connective tissue. Ideal for chronic aches and structural alignment.",
    duration: "60 / 90 mins",
    price: "From £60",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "massage-signature",
    title: "The Bodyworks Signature",
    tag: "Restorative",
    description: "Our core ritual. An intuitive fusion of Swedish and deep tissue techniques designed for total physical and mental decompression.",
    duration: "60 / 90 mins",
    price: "From £55",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "indian-head",
    title: "Indian Head Massage",
    tag: "Mental Calm",
    description: "Focusing on the scalp, face, and neck, this ancient technique relieves mental fatigue, tension headaches, and digital eye strain.",
    duration: "30 / 45 mins",
    price: "From £40",
    image: "https://images.unsplash.com/photo-1602353620107-163155700868?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "reflexology",
    title: "Clinical Reflexology",
    tag: "Holistic",
    description: "Bespoke foot therapy targeting pressure points that correspond to systemic systems. Restores balance from the ground up.",
    duration: "45 / 60 mins",
    price: "From £50",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "pregnancy-massage",
    title: "Pregnancy Wellness",
    tag: "Nurture",
    description: "A gentle, supportive treatment designed for the specific physiological needs of the expectant mother. Relief for hips, back, and fluid levels.",
    duration: "60 mins",
    price: "£65",
    image: "https://images.unsplash.com/photo-1531233076846-42934604ca3d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "cupping-therapy",
    title: "Dry Cupping Therapy",
    tag: "Decompression",
    description: "Ancient clinical technique using silicone cups to create suction. Promotes blood flow, releases fascia, and accelerates tissue repair.",
    duration: "30 / 45 mins",
    price: "From £40",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "iastm",
    title: "IASTM Soft Tissue",
    tag: "Precision",
    description: "Instrument Assisted Soft Tissue Mobilization. Using medical-grade tools to effectively break down scar tissue and fascial restrictions.",
    duration: "30 / 45 mins",
    price: "From £45",
    image: "https://images.unsplash.com/photo-1544161515-4ad6ce17521c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "lymphatic-facial",
    title: "Lymphatic Facial Ritual",
    tag: "Skin Health",
    description: "A drainage-focused facial that reduces puffiness, clears sinus congestion, and sculpts the jawline using precise lymphatic strokes.",
    duration: "45 mins",
    price: "£50",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      {/* Designer Cursor Overlay (Hidden on Mobile) */}
      <div 
        className="custom-cursor hidden lg:block" 
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)' 
        }} 
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? "glass-nav-premium py-4" : "bg-transparent py-8"}`}>
        <div className="container mx-auto px-8 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`font-serif text-2xl tracking-tighter transition-colors duration-700 ${isScrolled ? "text-charcoal" : "text-limestone"}`}
          >
            The Bodyworks<span className="text-moss">.</span>
          </motion.div>

          {/* Luxury Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {["Services", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-all hover:text-moss ${isScrolled ? "text-charcoal/60" : "text-limestone/60"}`}
              >
                {item}
              </a>
            ))}
            <a 
              href={SOLO_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className={`px-8 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-700 rounded-full magnetic-btn ${
                isScrolled 
                ? "bg-charcoal text-limestone hover:shadow-2xl" 
                : "bg-limestone text-charcoal"
              }`}
            >
              Book Reservation
            </a>
          </div>

          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={isScrolled ? "text-charcoal" : "text-limestone"} />
            ) : (
              <Menu className={isScrolled ? "text-charcoal" : "text-limestone"} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-charcoal text-limestone pt-32 px-10 lg:hidden flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col space-y-10">
              {["Services", "About", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-6xl font-serif leading-none tracking-tighter"
                >
                  {item}
                </a>
              ))}
            </div>
            <a 
              href={SOLO_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full py-6 bg-limestone text-charcoal text-center rounded-2xl font-bold uppercase tracking-widest"
            >
              Confirm Booking
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero: The Sanctuary Entrance */}
      <section ref={heroRef} className="relative h-[110vh] flex items-center overflow-hidden bg-charcoal">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=2400"
            alt="Sanctuary"
            className="w-full h-full object-cover grayscale-[0.2]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-charcoal/20" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-8 mt-24">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center space-x-4 text-limestone/60 text-[10px] uppercase tracking-[0.5em] mb-12">
                <Minus size={20} />
                <span>Modern Wellness Foundry</span>
              </span>
              <h1 className="text-7xl md:text-[10rem] font-serif text-limestone leading-[0.85] tracking-tighter italic mb-16">
                Refining <br />
                The <span className="text-moss">Vessel.</span>
              </h1>
              
              <div className="flex flex-col md:flex-row items-end gap-12">
                <p className="text-limestone/60 max-w-sm text-sm leading-relaxed font-light">
                  A curated dialogue between therapist and tissue. High-end recovery for those who demand excellence from their mind and body.
                </p>
                <a 
                  href="#services"
                  className="group flex items-center space-x-6 text-limestone"
                >
                  <div className="w-16 h-16 rounded-full border border-limestone/20 flex items-center justify-center transition-all group-hover:bg-limestone group-hover:text-charcoal duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Discover Rituals</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-12 hidden lg:flex items-center space-x-6 rotate-90 origin-right translate-y-full">
           <span className="text-[10px] uppercase tracking-[0.4em] text-limestone/40">Scroll to Explore</span>
           <div className="w-32 h-px bg-limestone/20 overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-moss"
              />
           </div>
        </div>
      </section>

      {/* MLD SPECIAL EMPHASIS SECTION */}
      <section className="py-40 bg-charcoal text-limestone overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-moss/5 blur-[120px] rounded-full translate-x-1/4" />
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-moss text-[10px] uppercase tracking-[0.5em] mb-6 block font-bold underline underline-offset-8">Specialist Focus</span>
              <h2 className="text-6xl md:text-8xl font-serif tracking-tighter mb-10 leading-[0.9]">
                Manual Lymphatic <br />
                <span className="italic text-moss">Drainage (MLD)</span>
              </h2>
              <p className="text-limestone/60 text-xl leading-relaxed mb-12 font-light max-w-xl">
                The pinnacle of systemic recovery. Our specialized MLD protocol focuses on the Vodder method, providing a gentle yet profound reset for your lymphatic system.
              </p>
              
              <div className="space-y-10 mb-16">
                 {[
                   { title: "Detoxification", desc: "Systemic removal of waste and fluid." },
                   { title: "Post-Op Recovery", desc: "Essential healing for surgical procedures." },
                   { title: "Immune Support", desc: "Optimizing the body's natural defense." }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-6 group">
                      <div className="w-12 h-px bg-moss group-hover:w-20 transition-all duration-500" />
                      <div>
                         <h4 className="font-serif text-2xl italic">{item.title}</h4>
                         <p className="text-[10px] uppercase tracking-[0.2em] text-limestone/40">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <a 
                href={SOLO_BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-6 group"
              >
                <div className="w-20 h-20 rounded-full bg-moss flex items-center justify-center text-charcoal shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <ArrowUpRight size={28} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Book Specialist MLD</span>
                  <span className="text-limestone/40 text-[9px] uppercase tracking-widest mt-1 italic">Consultation Required</span>
                </div>
              </a>
            </motion.div>

            <div className="relative">
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                 className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl"
               >
                 <img 
                    src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover scale-110 grayscale"
                    alt="MLD Technique"
                 />
               </motion.div>
               <div className="absolute -top-12 -right-12 bg-moss p-10 rounded-full shadow-2xl rotate-12 hidden lg:block">
                  <Sparkles className="text-charcoal" size={40} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Block */}
      <section id="about" className="py-40 bg-limestone border-y border-charcoal/5">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
               <motion.div
                 initial={{ scale: 0.9, opacity: 0 }}
                 whileInView={{ scale: 1, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.2 }}
                 className="aspect-[4/5] rounded-[3rem] overflow-hidden"
               >
                 <img 
                    src="https://images.unsplash.com/photo-1544161515-4ad6ce17521c?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover scale-110 active:scale-100 transition-transform duration-[3s]"
                    alt="Process"
                 />
               </motion.div>
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-moss p-8 rounded-full flex items-center justify-center text-limestone text-center hidden lg:flex">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Boutique <br /> Sanctuary</span>
               </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2"
            >
              <Quote className="text-moss mb-8" size={48} />
              <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-10 leading-tight">
                "We don't just treat muscle; we restore the <span className="text-moss">rhythm</span> of existence."
              </h2>
              <p className="text-charcoal/60 leading-loose mb-12 text-lg font-light">
                The Bodyworks is a labor of intention. We move beyond standard spa protocols to deliver a bespoke clinical experience wrapped in architectural tranquility. Every movement is a choice; every session is a journey.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <h4 className="font-display font-medium text-xs uppercase tracking-widest mb-2 border-b border-charcoal/10 pb-2">Philosophy</h4>
                    <p className="text-[12px] text-charcoal/50 leading-relaxed italic">Technical precision meet's sensory grace.</p>
                 </div>
                 <div>
                    <h4 className="font-display font-medium text-xs uppercase tracking-widest mb-2 border-b border-charcoal/10 pb-2">Heritage</h4>
                    <p className="text-[12px] text-charcoal/50 leading-relaxed italic">Born from a passion for human biomechanics.</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid: The Editorial View */}
      <section id="services" className="py-40 bg-limestone overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="mb-32 flex flex-col items-center text-center">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
               <span className="text-moss text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Curated List</span>
               <h2 className="text-7xl md:text-9xl font-serif tracking-tighter">Rituals<span className="text-moss">.</span></h2>
             </motion.div>
          </div>

          <div className="flex flex-col space-y-40">
            {TREATMENTS.map((treatment, idx) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 lg:gap-32 items-center`}
              >
                <div className="flex-1 lg:w-[45%] relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
                   <img 
                      src={treatment.image} 
                      alt={treatment.title}
                      className="w-full aspect-[4/5] lg:aspect-square object-cover filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-[2.5s] ease-out"
                      referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-40" />
                </div>

                <div className="flex-1 lg:w-[55%] px-4">
                   <div className="flex items-center space-x-6 text-charcoal/30 text-[10px] uppercase tracking-[0.4em] font-bold mb-8">
                      <span className="text-moss">{treatment.tag}</span>
                      <div className="w-12 h-px bg-charcoal/10" />
                      <span>{treatment.duration}</span>
                   </div>
                   <h3 className="text-5xl md:text-8xl font-serif tracking-tighter mb-10 italic leading-[0.9]">{treatment.title}</h3>
                   <p className="text-charcoal/60 text-xl leading-relaxed mb-12 max-w-lg font-light">
                      {treatment.description}
                   </p>
                   <div className="flex items-center justify-between border-t border-charcoal/5 pt-10">
                      <span className="font-serif text-3xl italic text-moss">{treatment.price}</span>
                      <a 
                        href={SOLO_BOOKING_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center space-x-4 bg-charcoal text-limestone px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-moss transition-all duration-500 magnetic-btn shadow-lg"
                      >
                        <span>Reserve</span>
                        <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
                      </a>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 p-16 bg-moss/5 rounded-[3rem] border border-moss/10 text-center"
          >
            <Sparkles className="mx-auto mb-8 text-moss" size={40} />
            <h3 className="text-4xl font-serif italic mb-6">Give the gift of wellness</h3>
            <p className="text-charcoal/60 max-w-xl mx-auto mb-10 leading-relaxed uppercase tracking-widest text-[10px] font-bold">
              Surprise someone special with a Bodyworks gift voucher. <br />Available for all treatments and denominations.
            </p>
            <a 
              href={SOLO_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block border-b-2 border-moss pb-2 text-xs uppercase tracking-[0.3em] font-bold hover:text-moss transition-all"
            >
              Enquire About Vouchers
            </a>
          </motion.div>
        </div>
      </section>

      {/* Booking: The Black Box */}
      <section id="contact" className="py-40 bg-limestone">
        <div className="container mx-auto px-8">
           <div className="bg-charcoal text-limestone rounded-[4rem] p-12 md:p-32 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(74,74,53,0.15)_0%,transparent_60%)] pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 relative z-10">
                 <div>
                    <h2 className="text-6xl md:text-[8rem] font-serif leading-[0.8] tracking-tighter italic mb-16">
                      Elevate <br />
                      The <span className="text-moss">Waitlist.</span>
                    </h2>
                    <div className="space-y-12 mb-20">
                       <div className="flex items-start space-x-10">
                          <MapPin className="text-moss shrink-0" size={32} />
                          <div>
                             <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2 text-limestone/40">Studio Location</h4>
                             <p className="text-xl leading-relaxed">74b Wellington Road, Edgeworth, BL7 0EF. Solo-integrated verification for all appointments.</p>
                          </div>
                       </div>
                       <div className="flex items-start space-x-10">
                          <Sparkles className="text-moss shrink-0" size={32} />
                          <div>
                             <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2 text-limestone/40">Appointment Focus</h4>
                             <p className="text-xl leading-relaxed">Single client focus. We don't double-book; we dedicate.</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex space-x-6">
                       <a href="#" className="w-14 h-14 rounded-full border border-limestone/10 flex items-center justify-center hover:bg-moss hover:bg-opacity-20 transition-all">
                          <Instagram size={20} />
                       </a>
                       <a href="#" className="w-14 h-14 rounded-full border border-limestone/10 flex items-center justify-center hover:bg-moss hover:bg-opacity-20 transition-all">
                          <Facebook size={20} />
                       </a>
                    </div>
                 </div>

                 <div className="flex items-center justify-center">
                    <div className="w-full max-w-md aspect-square bg-limestone rounded-[3rem] p-12 text-charcoal flex flex-col justify-between shadow-2xl relative">
                       <div className="absolute -top-12 -right-12 w-32 h-32 bg-moss rounded-full flex items-center justify-center text-limestone p-6 text-center transform -rotate-12">
                          <span className="text-[10px] font-bold leading-tight uppercase tracking-widest">Limited Slots <br /> Weekly</span>
                       </div>
                       <div>
                          <div className="w-12 h-1 bg-charcoal/20 mb-8 rounded-full" />
                          <h3 className="text-4xl font-serif italic mb-6">Secured via Solo</h3>
                          <p className="text-charcoal/50 text-sm leading-relaxed mb-10">
                             Premium scheduling powered by BookSolo. Instant synchronization with our private clinic calendar.
                          </p>
                       </div>
                       <a 
                         href={SOLO_BOOKING_URL} 
                         target="_blank"
                         rel="noreferrer"
                         className="w-full py-6 bg-charcoal text-limestone text-center rounded-3xl text-xs uppercase tracking-[0.3em] font-bold hover:bg-moss hover:scale-[1.02] transition-all magnetic-btn"
                       >
                         Initial Consultation
                       </a>
                       <p className="mt-8 text-[8px] uppercase tracking-[0.4em] text-charcoal/30 text-center">Identity & Card Verification Required</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Subtle Footer */}
      <footer className="py-20 bg-limestone">
        <div className="container mx-auto px-8 border-t border-charcoal/5 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center text-charcoal/40 text-[9px] uppercase tracking-[0.5em] font-bold">
            <div>&copy; {new Date().getFullYear()} The Bodyworks Foundry</div>
            <div className="my-8 md:my-0 font-serif italic normal-case text-lg tracking-tighter text-charcoal/20">The pursuit of biological grace</div>
            <div>Edgeworth • BL7 0EF</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
