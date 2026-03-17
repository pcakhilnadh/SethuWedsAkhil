import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, X } from "lucide-react";
import { useGreetings } from "@/hooks/use-greetings";

interface Greeting {
  name: string;
  message: string;
  timestamp?: string;
}

export function GreetingSection() {
  const { greetings, loading, error, addGreeting } = useGreetings();
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Format timestamp to human-readable format
  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return "";
    try {
      // Google Forms timestamp format: "M/D/YYYY H:MM:SS AM/PM" or "D/M/YYYY H:MM:SS AM/PM"
      // Example: "3/18/2026 1:12:50 AM" or "18/3/2026 1:12:50 AM"
      const timestamp_cleaned = timestamp.trim();
      const parts = timestamp_cleaned.split(' ');
      if (parts.length < 2) return timestamp_cleaned;
      
      const dateParts = parts[0].split('/');
      const timeParts = parts[1].split(':');
      
      if (dateParts.length < 3 || timeParts.length < 2) return timestamp_cleaned;
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      let monthNum = parseInt(dateParts[0]);
      let day = parseInt(dateParts[1]);
      let year = dateParts[2];
      
      // If first part is > 12, it's likely DD/MM/YYYY format, swap them
      if (monthNum > 12 && day <= 12) {
        [monthNum, day] = [day, monthNum];
      }
      
      const month = (monthNum >= 1 && monthNum <= 12) ? months[monthNum - 1] : months[0];
      const dayStr = String(day).padStart(2, '0');
      const hours = String(timeParts[0]).padStart(2, '0');
      const minutes = String(timeParts[1]).padStart(2, '0');
      
      return `${dayStr} ${month} ${year} • ${hours}:${minutes}`;
    } catch (err) {
      console.error('Timestamp format error:', timestamp, err);
      return timestamp || "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert("Please fill in both name and message fields");
      return;
    }

    setFormLoading(true);
    try {
      await addGreeting(formData.name.trim(), formData.message.trim());
      setSubmitSuccess(true);
      setFormData({ name: "", message: "" });
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to submit greeting";
      if (errorMsg.includes("Tools")) {
        // Google Form setup instructions
        alert(errorMsg + "\n\nOnce you set up the form, configure the environment variables in .env");
      } else {
        alert("Failed to submit greeting. Please try again.");
      }
      console.error("Error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section id="greetings" className="py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Blessings & Greetings" 
          subtitle="Share your warm wishes for the couple" 
        />

        {/* Greetings List */}
        {!loading && greetings.length > 0 && (
          <div className="max-w-4xl mx-auto mb-12 space-y-4">
            {greetings.map((greeting: Greeting, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div 
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary cursor-pointer group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/5"
                >
                  {/* Decorative heart emoji */}
                  <div className="absolute top-4 right-6 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                    💝
                  </div>

                  {/* Name and Timestamp */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary">
                        {greeting.name}
                      </h3>
                      {greeting.timestamp && (
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTimestamp(greeting.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message - Preview or Full */}
                  <AnimatePresence mode="wait">
                    {expandedIndex === index ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap"
                      >
                        {greeting.message}
                      </motion.p>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-600 text-sm line-clamp-2"
                      >
                        {greeting.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && greetings.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No greetings yet. Be the first to share your blessings!</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        {/* Add Greeting Form */}
        <motion.div className="max-w-2xl mx-auto">
          {!showForm ? (
            <div className="flex justify-center">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2"
              >
                💝
                Add Your Blessing
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-primary">Share Your Blessings</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={formLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="Share your warm wishes and blessings..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={formLoading}
                    className="min-h-24"
                    required
                  />
                </div>

                {submitSuccess && (
                  <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">
                    ✓ Thank you! Your blessing has been submitted. It will appear on the site shortly.
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Blessing
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ name: "", message: "" });
                    }}
                    disabled={formLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
