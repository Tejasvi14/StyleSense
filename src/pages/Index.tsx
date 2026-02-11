import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Camera, Shirt, TrendingUp, Gem, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const features = [
  {
    icon: Camera,
    title: "Image Analysis",
    description: "Upload a photo of your outfit and get AI-powered accessory recommendations instantly.",
  },
  {
    icon: Sparkles,
    title: "AI Styling",
    description: "Our generative AI acts as your personal stylist, understanding your unique taste.",
  },
  {
    icon: Shirt,
    title: "Outfit Combos",
    description: "Receive complete outfit combinations tailored to your style and occasion.",
  },
  {
    icon: TrendingUp,
    title: "Trend Aware",
    description: "Stay ahead with recommendations informed by the latest fashion trends.",
  },
  {
    icon: Gem,
    title: "Accessory Match",
    description: "Upload any dress and discover the perfect accessories to complete your look.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight text-foreground">
            Style<span className="text-gradient-gold">Sense</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 font-body text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-4 h-4" />
              Try Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fashion editorial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-body text-sm uppercase tracking-[0.3em] text-fashion-gold mb-6"
            >
              AI-Powered Fashion Intelligence
            </motion.p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] text-fashion-cream mb-6">
              Your Personal
              <br />
              <span className="text-gradient-gold italic">AI Stylist</span>
            </h1>
            <p className="font-body text-lg text-fashion-cream/70 mb-10 max-w-lg leading-relaxed">
              Upload any outfit and discover the perfect accessories. StyleSense uses generative AI to deliver personalized fashion recommendations tailored to your unique style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-medium text-base hover:opacity-90 transition-all hover:gap-4"
              >
                Analyze Your Outfit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 border border-fashion-cream/30 text-fashion-cream px-8 py-4 rounded-full font-body font-medium text-base hover:bg-fashion-cream/10 transition-colors"
              >
                Explore Features
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-warm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">What We Offer</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Intelligent Fashion <span className="italic text-primary">Guidance</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">How It Works</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Three Simple <span className="italic text-primary">Steps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Upload", desc: "Take a photo or upload an image of your outfit or dress." },
              { step: "02", title: "Analyze", desc: "Our AI analyzes colors, style, and fabric to understand your piece." },
              { step: "03", title: "Discover", desc: "Get personalized accessory recommendations and styling tips." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <span className="font-display text-6xl font-bold text-gradient-gold">{item.step}</span>
                <h3 className="font-display text-2xl font-semibold text-foreground mt-4 mb-3">{item.title}</h3>
                <p className="font-body text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/analyze"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-full font-body font-medium text-lg hover:opacity-90 transition-all hover:gap-4"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="font-display text-xl font-bold text-foreground mb-2">
            Style<span className="text-gradient-gold">Sense</span>
          </p>
          <p className="font-body text-sm text-muted-foreground">
            AI-Powered Fashion Intelligence • Your Virtual Stylist
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
