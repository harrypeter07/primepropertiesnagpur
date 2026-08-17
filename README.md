# Prime Nagpur Properties

A high-performance real estate marketplace and advisory platform tailored for **Nagpur, Maharashtra**. Built for NMRDA & RERA approved residential plots, luxury apartments, and commercial corridors.

---

## 🌟 Core Features

- **Nagpur Real Estate Focus**: Curated listings across Besa-Pipla, Wardha Road, Civil Lines, Dharampeth, MIHAN SEZ, Hingna, and Koradi.
- **Ultra-Fast & Mobile-First**: Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.
- **GSAP & ScrollTrigger Micro-Animations**: Smooth physics-based interactions, magnetic buttons, and dynamic category crossfades.
- **Interactive WhatsApp Direct Connect**: Floating quick-chat widget and pre-filled 1-click WhatsApp property inquiries.
- **Secure Admin Portal**:
  - Dashboard with valuation metrics and active client leads.
  - Full property manager with 100% editable photos, prices, dimensions, and legal certificates.
  - ImageKit CDN readiness for rapid image delivery.
- **Hardened Security**: Clickjacking prevention, XSS mitigation, strict referrer policies, and encrypted JWT session cookies.

---

## 🚀 Tech Stack

- **Framework**: Next.js 16.3.1 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: GSAP + ScrollTrigger
- **Database**: MongoDB Atlas + Mongoose
- **Authentication**: NextAuth.js (JWT Strategy)
- **Icons**: Lucide React

---

## 🛠️ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harrypeter07/primepropertiesnagpur.git
   cd primepropertiesnagpur
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables** in `.env.local`:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Administrative Access

- **Login URL**: `/admin/login`
- **Default Email**: `admin@primenagpurproperties.com`
- **Dashboard**: `/admin`
- **Listings Manager**: `/admin/listings`
- **Client Inquiries**: `/admin/inquiries`
