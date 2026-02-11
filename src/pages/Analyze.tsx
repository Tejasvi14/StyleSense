import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Sparkles, ArrowLeft, Loader2, X, Gem, Tag, Palette, Lightbulb, CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Accessory {
  category: string;
  name: string;
  description: string;
  colorSuggestion: string;
}

interface AnalysisResult {
  garmentDescription: string;
  style: string;
  colorPalette: string[];
  accessories: Accessory[];
  stylingTips: string[];
  occasionMatch: string[];
}

const AnalyzePage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }
    setFileName(file.name);
    setResult(null);
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const analyzeOutfit = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-outfit", {
        body: { imageBase64: image },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data);
      toast.success("Analysis complete!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to analyze outfit. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setFileName("");
    setResult(null);
  };

  const categoryIcons: Record<string, string> = {
    Jewelry: "💎", Bag: "👜", Shoes: "👠", Hat: "🎩",
    Belt: "🪢", Scarf: "🧣", Watch: "⌚", Sunglasses: "🕶️",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight text-foreground">
            Style<span className="text-gradient-gold">Sense</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back Home
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-28 pb-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">AI Outfit Analysis</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect <span className="italic text-primary">Accessories</span>
          </h1>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Upload a photo of your dress or outfit and our AI will recommend matching accessories, styling tips, and occasion pairings.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Upload Area */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {!image ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer ${
                  dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-display text-xl font-semibold text-foreground mb-2">Drop your outfit here</p>
                <p className="font-body text-sm text-muted-foreground">or click to browse • PNG, JPG up to 10MB</p>
              </div>
            ) : (
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-border">
                  <img src={image} alt="Uploaded outfit" className="w-full object-cover max-h-[500px]" />
                  <button
                    onClick={clearImage}
                    className="absolute top-3 right-3 bg-foreground/80 text-background p-2 rounded-full hover:bg-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-body text-sm text-muted-foreground mt-3 truncate">{fileName}</p>
                {!result && (
                  <button
                    onClick={analyzeOutfit}
                    disabled={isAnalyzing}
                    className="mt-4 w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body font-medium text-base hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing your outfit...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Analyze & Find Accessories
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* Results Area */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <p className="font-display text-xl font-semibold text-foreground mb-2">Analyzing your style...</p>
                  <p className="font-body text-sm text-muted-foreground">Our AI is finding the perfect accessories</p>
                  <div className="mt-6 w-48 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary shimmer rounded-full" />
                  </div>
                </motion.div>
              )}

              {result && !isAnalyzing && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Garment Info */}
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Tag className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">{result.garmentDescription}</h3>
                        <span className="inline-block mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
                          {result.style}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-muted-foreground" />
                      <div className="flex gap-2">
                        {result.colorPalette.map((color) => (
                          <span key={color} className="text-xs font-body text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Accessories */}
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Gem className="w-5 h-5 text-primary" />
                      Recommended Accessories
                    </h3>
                    <div className="space-y-3">
                      {result.accessories.map((acc, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{categoryIcons[acc.category] || "✨"}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-body text-xs uppercase tracking-wider text-primary font-medium">{acc.category}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs font-body text-muted-foreground">{acc.colorSuggestion}</span>
                              </div>
                              <h4 className="font-display text-base font-semibold text-foreground">{acc.name}</h4>
                              <p className="font-body text-sm text-muted-foreground mt-1">{acc.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Styling Tips & Occasions */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h4 className="font-display text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        Styling Tips
                      </h4>
                      <ul className="space-y-2">
                        {result.stylingTips.map((tip, i) => (
                          <li key={i} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-card rounded-2xl border border-border p-6">
                      <h4 className="font-display text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        Perfect For
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.occasionMatch.map((occ) => (
                          <span
                            key={occ}
                            className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-body font-medium"
                          >
                            {occ}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Analyze Another */}
                  <button
                    onClick={clearImage}
                    className="w-full inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-full font-body text-sm hover:bg-muted transition-colors"
                  >
                    Analyze Another Outfit
                  </button>
                </motion.div>
              )}

              {!result && !isAnalyzing && !image && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="font-display text-xl font-semibold text-foreground mb-2">Ready to style you</p>
                  <p className="font-body text-sm text-muted-foreground max-w-xs">
                    Upload a photo of your dress or outfit and our AI will recommend the perfect matching accessories.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
