"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

// Schema for contact form validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API request submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 text-left text-xs font-semibold">
      <section className="text-center space-y-2">
        <h1 className="text-2xl font-black uppercase tracking-wider text-foreground">Contact Us</h1>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Have questions about orders, products, or sizing? Our support team is here to assist.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact coordinates */}
        <div className="space-y-4 md:col-span-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b">
            Get in touch
          </h2>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <Mail className="h-4.5 w-4.5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground">Support Email</h4>
                <p className="text-muted-foreground mt-0.5">support@woxly.store</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-4.5 w-4.5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground">Phone Helpline</h4>
                <p className="text-muted-foreground mt-0.5">+1 (800) 555-WOXLY</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4.5 w-4.5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-foreground">Headquarters</h4>
                <p className="text-muted-foreground mt-0.5 leading-relaxed">
                  100 Fashion Plaza, Suite 400<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form card */}
        <div className="bg-card text-card-foreground border border-border p-6 rounded-3xl shadow-sm md:col-span-2 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b">
            Send us a message
          </h2>

          {isSubmitSuccessful && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5" />
              <span>Thank you! Your message has been sent successfully. We will reach back shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-muted-foreground mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  {...register("name")}
                  className={`w-full bg-muted text-foreground p-3 rounded-lg border focus:outline-none focus:border-accent ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-muted-foreground mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. customer@example.com"
                  {...register("email")}
                  className={`w-full bg-muted text-foreground p-3 rounded-lg border focus:outline-none focus:border-accent ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-muted-foreground mb-1.5">Subject</label>
              <input
                type="text"
                placeholder="e.g. Inquiry regarding order tracking"
                {...register("subject")}
                className={`w-full bg-muted text-foreground p-3 rounded-lg border focus:outline-none focus:border-accent ${
                  errors.subject ? "border-red-500" : "border-border"
                }`}
              />
              {errors.subject && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="block text-muted-foreground mb-1.5">Message Content</label>
              <textarea
                rows={5}
                placeholder="Tell us what you need support with in detail..."
                {...register("message")}
                className={`w-full bg-muted text-foreground p-3 rounded-lg border focus:outline-none focus:border-accent resize-none ${
                  errors.message ? "border-red-500" : "border-border"
                }`}
              />
              {errors.message && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider cursor-pointer disabled:bg-zinc-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
