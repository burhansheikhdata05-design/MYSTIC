/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  Zap, 
  Flame, 
  Sparkles,
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  Play
} from 'lucide-react';
import { getFlavorRecommendation } from './lib/gemini';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-primary py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="#" className="text-3xl font-display text-brand-cream tracking-tighter">MYSTIC</a>
          <div className="hidden md:flex gap-6 text-brand-cream/80 font-medium uppercase text-sm tracking-widest">
            <a href="#products" className="hover:text-brand-accent transition-colors">Products</a>
            <a href="#about" className="hover:text-brand-accent transition-colors">Our Story</a>
            <a href="#locator" className="hover:text-brand-accent transition-colors">Find Us</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 bg-brand-accent text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-orange-600 transition-all">
            <ShoppingBag size={18} />
            Shop Now
          </button>
          <button className="md:hidden text-brand-cream" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-brand-primary z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-brand-cream">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 text-4xl font-display text-brand-cream uppercase">
              <a href="#products" onClick={() => setMobileMenuOpen(false)}>Flavors</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>Story</a>
              <a href="#locator" onClick={() => setMobileMenuOpen(false)}>Locator</a>
              <a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-primary">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-accent/20 text-brand-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} />
            The 24th Flavor is Here
          </div>
          <h1 className="text-6xl md:text-8xl text-brand-cream leading-[0.9] mb-8">
            NOT JUST <br />
            <span className="text-brand-accent italic">ANOTHER</span> <br />
            SODA.
          </h1>
          <p className="text-brand-cream/70 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
            23 flavors were a good start. We added the 24th: <span className="text-brand-cream font-bold">Chaos.</span> Bold, spicy, and completely uncategorizable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary flex items-center justify-center gap-2">
              Taste the Mystery
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 rounded-full border border-brand-cream/30 text-brand-cream font-bold uppercase tracking-widest hover:bg-brand-cream hover:text-brand-primary transition-all">
              Find Near Me
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img 
                  key={i} 
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  className="w-10 h-10 rounded-full border-2 border-brand-primary" 
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-sm text-brand-cream/60">
              <div className="flex text-brand-accent mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="font-bold text-brand-cream">4.9/5</span> from 50k+ Mystic Rebels
            </div>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: y1, rotate }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-[120%] h-[120%] bg-brand-accent/10 rounded-full blur-3xl animate-pulse" />
          <img 
            src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800" 
            alt="Mystic Soda Can" 
            className="w-full max-w-md drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform -rotate-12"
            referrerPolicy="no-referrer"
          />
          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-2xl rotate-12 hidden lg:block"
          >
            <div className="text-brand-primary font-bold text-xl">24 Flavors</div>
            <div className="text-xs text-brand-primary/60 uppercase font-bold">Perfectly Balanced</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialProofTicker = () => {
  return (
    <div className="bg-brand-accent py-4 overflow-hidden border-y border-brand-black/10">
      <div className="flex whitespace-nowrap animate-marquee">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="flex items-center gap-8 mx-8 text-white font-display text-2xl uppercase italic">
            <span>The Vibe Tribe</span>
            <Sparkles size={24} />
            <span>Uncategorizable</span>
            <Flame size={24} />
            <span>Mystic Original</span>
            <Zap size={24} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const products = [
    {
      id: 1,
      name: "Original Mystic",
      desc: "Cherry, Spice, and a hint of Chaos.",
      color: "bg-brand-primary",
      img: "https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "Electric Citrus",
      desc: "Lime, Ginger, and pure Zest.",
      color: "bg-green-800",
      img: "https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      name: "Midnight Vanilla",
      desc: "Creamy, Bold, and Dark.",
      color: "bg-slate-900",
      img: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section id="products" className="py-24 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl mb-4">PICK YOUR <br />POISON.</h2>
            <p className="text-brand-black/60 max-w-md">Each can is a journey. No two sips are the same. Are you ready to lose control?</p>
          </div>
          <button className="flex items-center gap-2 font-bold uppercase tracking-widest text-brand-accent group">
            View All Flavors
            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <motion.div 
              key={p.id}
              whileHover={{ y: -10 }}
              className={`${p.color} rounded-[2rem] p-8 text-brand-cream relative overflow-hidden group cursor-pointer`}
            >
              <div className="relative z-10">
                <h3 className="text-3xl mb-2">{p.name}</h3>
                <p className="text-brand-cream/60 mb-8">{p.desc}</p>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all">
                  Shop Now
                </button>
              </div>
              <img 
                src={p.img} 
                alt={p.name} 
                className="absolute bottom-0 right-0 w-48 h-48 object-cover rounded-tl-[3rem] opacity-40 group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FlavorQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = async (val: string) => {
    const newAnswers = answers + " " + val;
    if (step < 2) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      setLoading(true);
      const res = await getFlavorRecommendation(newAnswers);
      setResult(res);
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-brand-black text-brand-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 skew-x-12 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {!result ? (
          <>
            <h2 className="text-4xl md:text-6xl mb-8">WHICH MYSTIC <br />ARE YOU?</h2>
            <p className="text-brand-cream/60 mb-12">Our AI knows your soul better than your barista. Take the 30-second vibe check.</p>
            
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl">
              {loading ? (
                <div className="flex flex-col items-center gap-4 py-12">
                  <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
                  <p className="font-display uppercase tracking-widest animate-pulse">Consulting the Oracle...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {step === 0 && (
                    <div className="space-y-4">
                      <p className="text-xl font-bold mb-6">How do you start your morning?</p>
                      <button onClick={() => handleAnswer("Chaos and coffee")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Chaos and black coffee</button>
                      <button onClick={() => handleAnswer("Meditation and tea")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Meditation and green tea</button>
                      <button onClick={() => handleAnswer("Sleeping in")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Hitting snooze 5 times</button>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="space-y-4">
                      <p className="text-xl font-bold mb-6">Your ideal weekend vibe?</p>
                      <button onClick={() => handleAnswer("Underground rave")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Underground warehouse rave</button>
                      <button onClick={() => handleAnswer("Cozy cabin")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Cozy cabin with a book</button>
                      <button onClick={() => handleAnswer("City exploration")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Exploring hidden city alleys</button>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-4">
                      <p className="text-xl font-bold mb-6">Pick a superpower:</p>
                      <button onClick={() => handleAnswer("Invisibility")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Invisibility</button>
                      <button onClick={() => handleAnswer("Time travel")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Time Travel</button>
                      <button onClick={() => handleAnswer("Telekinesis")} className="w-full py-4 rounded-2xl border border-white/20 hover:bg-brand-accent hover:border-brand-accent transition-all">Telekinesis</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-accent p-12 rounded-[3rem] text-white"
          >
            <div className="mb-6 inline-block bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Your Match</div>
            <h3 className="text-5xl md:text-7xl mb-4">{result.flavor}</h3>
            <p className="text-xl mb-8 opacity-90 italic">"{result.reason}"</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand-accent px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all">Buy Now</button>
              <button onClick={() => {setResult(null); setStep(0); setAnswers("");}} className="px-8 py-4 rounded-full border border-white/30 font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Retake Quiz</button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const BrandStory = () => {
  return (
    <section id="about" className="py-24 px-6 bg-brand-cream">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1556742049-02e49f30b46c?auto=format&fit=crop&q=80&w=800" 
            alt="Founders" 
            className="rounded-[3rem] shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -right-8 bg-brand-accent p-8 rounded-[2rem] text-white max-w-[200px] rotate-6">
            <p className="font-display text-2xl leading-none mb-2 italic">EST. 2024</p>
            <p className="text-xs uppercase font-bold tracking-widest opacity-70">Born in a Basement. Raised by Rebels.</p>
          </div>
        </div>
        <div>
          <h2 className="text-5xl md:text-7xl mb-8">WE DIDN'T <br />ASK FOR <br />PERMISSION.</h2>
          <p className="text-lg text-brand-black/70 mb-8 leading-relaxed">
            The world didn't need another soda. It needed a wake-up call. We spent 18 months in a garage in East London, mixing 24 secret ingredients until we found the one that made our hearts race.
          </p>
          <p className="text-lg text-brand-black/70 mb-10 leading-relaxed">
            Mystic isn't for everyone. It's for the ones who don't fit in. The ones who question the status quo. The ones who want a drink that's as complex as they are.
          </p>
          <button className="flex items-center gap-2 font-bold uppercase tracking-widest text-brand-primary group">
            Read the Manifesto
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-brand-cream pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <h2 className="text-4xl font-display mb-8">JOIN THE <br />VIBE TRIBE.</h2>
            <p className="text-brand-cream/60 mb-8 max-w-sm">Get early access to limited drops, secret flavors, and underground events.</p>
            <form className="flex gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 focus:outline-none focus:border-brand-accent transition-colors"
              />
              <button className="bg-brand-accent text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-orange-600 transition-all">Join</button>
            </form>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-brand-accent">Explore</h4>
            <ul className="space-y-4 text-brand-cream/60">
              <li><a href="#" className="hover:text-brand-cream transition-colors">Flavors</a></li>
              <li><a href="#" className="hover:text-brand-cream transition-colors">Merch</a></li>
              <li><a href="#" className="hover:text-brand-cream transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-brand-cream transition-colors">Manifesto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-brand-accent">Connect</h4>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-all"><Twitter size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-accent transition-all"><Facebook size={20} /></a>
            </div>
            <p className="text-xs text-brand-cream/40 uppercase tracking-widest font-bold">© 2026 Mystic Soda Co. <br />All Rights Reserved.</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-8xl md:text-[12rem] font-display text-white/5 leading-none select-none">MYSTIC</div>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-bold text-brand-cream/40">
            <a href="#" className="hover:text-brand-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="selection:bg-brand-accent selection:text-white">
      <Navbar />
      <Hero />
      <SocialProofTicker />
      <ProductShowcase />
      <FlavorQuiz />
      <BrandStory />
      
      {/* Conversion Section */}
      <section className="py-24 px-6 bg-brand-accent text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl mb-8">READY TO <br />WAKE UP?</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">Order your first 12-pack today and get a free "Chaos" limited edition tee. Offer ends at midnight.</p>
          <button className="bg-white text-brand-accent px-12 py-6 rounded-full text-xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
            Claim Your Pack
          </button>
          <p className="mt-8 text-sm uppercase tracking-widest font-bold opacity-60">Free Shipping on all orders over $40</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
