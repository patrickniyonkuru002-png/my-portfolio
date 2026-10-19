import { useState } from "react";
import { sendContact } from "../services/api";

export default function Contact({ settings }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContact({ 
        name: form.name, 
        email: form.email, 
        message: `Subject: ${form.subject}\n\n${form.message}` 
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 4000);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">Get in <span className="gradient-text">Touch</span></h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto md:mx-0 font-medium">
            Whether you want to collaborate on a project, ask about my work or explore opportunities, I'm ready to connect.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--accent-color)] rounded-xl shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1">Location</h4>
                <p className="text-[var(--text-muted)] font-medium">Kigali, Rwanda</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--accent-color)] rounded-xl shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1">Email</h4>
                <p className="text-[var(--text-muted)] break-all font-medium">{settings.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--accent-color)] rounded-xl shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <h4 className="font-bold text-[var(--text-primary)] mb-1">Phone</h4>
                <p className="text-[var(--text-muted)] font-medium">+250 792306495</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <form onSubmit={submit} className="glass p-6 md:p-8 rounded-3xl space-y-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Send Me a Message</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Full Name *</label>
                  <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded-xl p-3 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Email Address *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded-xl p-3 outline-none transition" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Subject *</label>
                <input required type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border rounded-xl p-3 outline-none transition" />
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--text-secondary)] mb-1">Message *</label>
                <textarea required rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border rounded-xl p-3 outline-none transition resize-none"></textarea>
              </div>

              <button disabled={status === "sending"} className="w-full bg-[var(--accent-color)] py-3.5 rounded-xl font-bold text-[var(--accent-text)] hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50 shadow-md">
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "sent" && <p className="text-green-600 dark:text-green-400 text-sm text-center font-bold">✅ Message sent successfully!</p>}
              {status === "error" && <p className="text-red-600 dark:text-red-400 text-sm text-center font-bold">❌ Something went wrong. Try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}