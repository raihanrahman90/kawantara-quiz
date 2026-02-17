import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Smartphone, Ticket } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* Navbar */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Image
              src="/logo.png"        // letakkan file logo di public/logo.png
              alt="Kawantara Logo"
              width={50}            // sesuaikan ukuran logo
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex gap-4">
            {/* <Button variant="ghost" className="text-gray-700 hover:text-primary">Services</Button>
            <Button variant="ghost" className="text-gray-700 hover:text-primary">Portfolio</Button> */}
            {/* <Button variant="ghost" className="text-gray-700 hover:text-primary">About</Button> */}
            <a
              href="https://wa.me/6283199740445"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white hover:bg-blue-700 py-2 px-3 radius-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900">
          Building Digital Solutions That Drive Growth
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We deliver modern, scalable, and reliable software solutions 
          for startups and enterprises. Web apps, mobile apps, blockchain, 
          or backend systems — we make it happen.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://wa.me/6283199740445"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 bg-primary text-white text-lg font-medium rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Our Services</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-primary">Website with QR Features</h4>
              </div>
              <p className="mt-2 text-gray-600">
                Create modern websites integrated with QR code functionality for fast access, authentication, and digital interactions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <ShoppingCart className="w-6 h-6 text-primary" />              
              </div>
              <div>

                <h4 className="text-xl font-semibold text-primary">eCommerce Development</h4>
              </div>
              <p className="mt-2 text-gray-600">
                Build scalable eCommerce platforms with secure payment gateways, product management, and smooth user experience.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Ticket className="w-6 h-6 text-primary" />
              </div>
              <div>

                <h4 className="text-xl font-semibold text-primary">Event Ticketing Website</h4>
              </div>
              <p className="mt-2 text-gray-600">
                Develop event ticketing websites with real-time seat booking, QR-based ticket verification, and seamless user flow.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>


      {/*colaboration*/}
      <section className="container mx-auto px-4 py-16 bg-white rounded-xl shadow-sm mt-16">
        <h3 className="text-3xl font-bold text-center mb-4 text-gray-900">Collaboration</h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          We love working with startups, enterprises, and fellow developers to create meaningful digital experiences.  
          Let’s combine our skills and bring innovative solutions to life together.
        </p>
      </section>

      {/*colaboration*/}

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center bg-gradient-to-r from-primary/90 to-blue-600 rounded-xl text-white shadow-lg">
        <h3 className="text-3xl font-bold">Ready to Build Your Next Project?</h3>
        <p className="mt-3 text-gray-100">
          Let’s collaborate and bring your ideas to life with cutting-edge technology.
        </p>
        <a
          href="https://wa.me/6283199740445"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-white text-primary hover:bg-gray-200 px-6 py-3 rounded-md font-medium transition"
        >
          Contact Us
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-gray-500 bg-white">
        © {new Date().getFullYear()} Kawantara. All rights reserved.
      </footer>

    </main>
  )
}
