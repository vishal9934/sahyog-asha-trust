"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Smartphone,
  Building2,
  Copy,
  CheckCircle,
  Users,
  MoveDown,
} from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

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

const donationMethods = [
  {
    icon: Building2,
    title: "Bank Transfer",
    description: "Direct bank transfer to our account",
    details: {
      accountName: "Sahyog Asha Trust",
      accountNumber: "1234567890123456",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      branch: "Community Branch, New Delhi",
    },
  },
  {
    icon: Smartphone,
    title: "UPI Payment",
    description: "Quick payment using UPI apps",
    details: {
      upiId: "sahyogashatrust@sbi",
      phoneNumber: "+91 98765 43210",
    },
  },
];

const donateTranslations = {
  en: {
    heroTitle: "Make a Difference",
    heroSubtitle:
      "Your donation helps us transform lives and build stronger communities. Every contribution, no matter the size, creates lasting impact.",
    howToDonate: "How to Donate",
    howToDonateSubtitle:
      "Choose your preferred method to make a secure donation to Sahyog Asha Trust",
    donorRegistration: "Donor Registration",
    donorRegistrationDesc:
      "Please fill your details so we can acknowledge your contribution and send you updates about our work.",
    donorFormBtn: "Donar Details",
    donorFormNote: "Secure form powered by Google Forms",
    donorFormAfter: "Please Fill your details after donating",
    goBelow: "Go Below to Donate",
  },
  hi: {
    heroTitle: "परिवर्तन लाएँ",
    heroSubtitle:
      "आपका दान हमें जीवन बदलने और मजबूत समुदाय बनाने में मदद करता है। हर योगदान, चाहे छोटा हो या बड़ा, स्थायी प्रभाव डालता है।",
    howToDonate: "कैसे दान करें",
    howToDonateSubtitle:
      "सहयोग आशा ट्रस्ट को सुरक्षित दान करने के लिए अपनी पसंदीदा विधि चुनें",
    donorRegistration: "दाता पंजीकरण",
    donorRegistrationDesc:
      "कृपया अपनी जानकारी भरें ताकि हम आपके योगदान की पुष्टि कर सकें और आपको हमारे कार्यों की जानकारी भेज सकें।",
    donorFormBtn: "दाता विवरण",
    donorFormNote: "सुरक्षित फॉर्म गूगल फॉर्म्स द्वारा संचालित",
    donorFormAfter: "कृपया दान करने के बाद अपनी जानकारी भरें",
    goBelow: "दान करने के लिए नीचे जाएं",
  },
};

export default function DonatePage() {
  const { language } = useLanguage();
  const [copiedText, setCopiedText] = useState("");

  const t = (key: string) =>
    donateTranslations[language][key as keyof typeof donateTranslations.en] ||
    key;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Banner Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(images/donate.jpeg)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-green-900/50" />

          <motion.div
            className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 mt-10 md:mt-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {t("heroTitle")}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-4 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-white !cursor-default text-blue-900 hover:bg-blue-50 text-lg px-8 py-6"
              >
                {t("goBelow")}
                <MoveDown />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Donation Methods */}
        <section className="py-8 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div className="text-center mb-8 md:mb-16" {...fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                {t("howToDonate")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("howToDonateSubtitle")}
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {donationMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="h-full bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group py-2 md:py-4">
                      <CardContent className="p-4 md:p-8">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                          <Icon className="w-8 h-8 text-blue-600" />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {method.description}
                        </p>

                        <div className="space-y-3">
                          {method.title === "Bank Transfer" && (
                            <>
                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">
                                  Account Name:
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-900">
                                    {method.details.accountName}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      copyToClipboard(
                                        method.details.accountName!,
                                        "Account Name"
                                      )
                                    }
                                    className="h-6 w-6 p-0"
                                  >
                                    {copiedText === "Account Name" ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">
                                  Account Number:
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-900 font-mono">
                                    {method.details.accountNumber}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      copyToClipboard(
                                        method.details.accountNumber!,
                                        "Account Number"
                                      )
                                    }
                                    className="h-6 w-6 p-0"
                                  >
                                    {copiedText === "Account Number" ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">
                                  IFSC Code:
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-900 font-mono">
                                    {method.details.ifscCode}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      copyToClipboard(
                                        method.details.ifscCode!,
                                        "IFSC Code"
                                      )
                                    }
                                    className="h-6 w-6 p-0"
                                  >
                                    {copiedText === "IFSC Code" ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <strong>Bank:</strong>{" "}
                                  {method.details.bankName}
                                  <br />
                                  <strong>Branch:</strong>{" "}
                                  {method.details.branch}
                                </p>
                              </div>
                            </>
                          )}

                          {method.title === "UPI Payment" && (
                            <>
                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-700">
                                  UPI ID:
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-900 font-mono">
                                    {method.details.upiId}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      copyToClipboard(
                                        method.details.upiId!,
                                        "UPI ID"
                                      )
                                    }
                                    className="h-6 w-6 p-0"
                                  >
                                    {copiedText === "UPI ID" ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <div className="p-3 bg-green-50 rounded-lg text-center">
                                <p className="text-sm text-green-800 mb-3">
                                  Scan QR Code to Pay
                                </p>
                                <div className="w-32 h-32 bg-white border-2 border-green-200 rounded-lg mx-auto flex items-center justify-center">
                                  <span className="text-xs text-gray-500">
                                    QR Code
                                  </span>
                                </div>
                                <p className="text-xs text-green-700 mt-2">
                                  Phone: {method.details.phoneNumber}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Donor Details Form */}
              <motion.div variants={fadeInUp}>
                <Card className=" py-2 md:py-4 h-full bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-4 md:p-8">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {t("donorRegistration")}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t("donorRegistrationDesc")}
                    </p>

                    <div className="bg-green-50 rounded-lg p-6">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSd7hf8NPzIyQg2spM4pfhVb9CZQQqQYiPLsAiqHpq-iqBsv-w/viewform?usp=header"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        {t("donorFormBtn")}
                      </a>
                      <p className="text-xs text-green-700 mt-3 text-center">
                        {t("donorFormNote")}
                      </p>
                    </div>
                    <p className="mt-5 text-gray-600">{t("donorFormAfter")}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
