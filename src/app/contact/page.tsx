"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Address",
    details: [
      "Sahyog Asha Trust",
      "123 Community Center Road",
      "Social Welfare District",
      "New Delhi - 110001, India",
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", color: "text-blue-600" },
  { icon: Twitter, href: "#", color: "text-sky-500" },
  { icon: Instagram, href: "#", color: "text-pink-600" },
  { icon: Linkedin, href: "#", color: "text-blue-700" },
];

export default function ContactPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Map Banner Section */}
        <section className="mt-20">
          {/* Embedded Map */}
          <div className="w-full max-w-7xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.528193796761!2d86.3389964496677!3d23.742670108807243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6a217c822a9ef%3A0x46e571290d7bc453!2sMoonidih%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1752476642794!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-64 md:h-96 border-0 rounded-lg"
              style={{ minHeight: 200 }}
            ></iframe>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-20 px-4 max-w-7xl mx-auto ">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help and answer any questions you might have. We
              look forward to hearing from you.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 mb-16 items-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group py-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-100 transition-colors">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Address
                  </h3>
                  <div className="space-y-2">
                    <div className="flex md:flex-row flex-col items-start gap-2">
                      <h3 className="w-35 font-medium">Registered Office:</h3>
                      <p className="text-gray-600 md:mt-0.5 text-left text-sm leading-relaxed flex-1">
                        B-268, Block-B, Rangpuri Pahadi Malikpur,Kobi urf
                        Rangpur South Delhi - 110037
                      </p>
                    </div>
                    <p className="text-gray-600 text-left text-sm leading-relaxed">
                      <span className="font-semibold">Mobile Number:</span> +91
                      8448206564
                    </p>
                    <p className="text-gray-600 text-sm text-left leading-relaxed">
                      <span className="font-semibold">Email:</span>{" "}
                      <a
                        href="mailto:mithleshkumar@gmail.com"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        mithleshkumar@gmail.com
                      </a>
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex md:flex-row flex-col items-start gap-2">
                      <h3 className="w-35 font-medium">Jharkhand Office:</h3>
                      <p className="text-gray-600 md:mt-0.5 text-left text-sm leading-relaxed flex-1">
                        Kamlanagar,Rd No. -4,Old H.B. Road,Kokar, Ranchi -
                        834001
                      </p>
                    </div>
                    <p className="text-gray-600 text-left text-sm leading-relaxed">
                      <span className="font-semibold">Mobile Number:</span> +91
                      7992303603
                    </p>
                    <p className="text-gray-600 text-sm text-left leading-relaxed">
                      <span className="font-semibold">Email:</span>{" "}
                      <a
                        href="mailto:dilipverma5@gmail.com"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        dilipverma5@gmail.com
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get in touch with us!
              </h2>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdAko6cJH-q8PWP3Q5NxfRYsXO8nTVzl5H17FLTkqqg1bUi_Q/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form and Additional Info */}
          <motion.div
            className="grid lg:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Quick Contact */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-0 shadow-lg">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Contact
                </h4>
                <p className="text-gray-600 mb-6">
                  For urgent matters or immediate assistance, please don't
                  hesitate to call us directly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      +91 11 2345 6789
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <a
                      href="mailto:info@sahyogashatrust.org"
                      className="text-gray-700 font-medium hover:underline"
                    >
                      info@sahyogashatrust.org
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Follow Us
                </h4>
                <p className="text-gray-600 mb-6">
                  Stay connected with our latest updates and activities on
                  social media.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ${social.color} hover:scale-110 transform transition-transform`}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
