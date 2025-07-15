"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  GraduationCap,
  Computer,
  Users,
  Heart,
  Shield,
  Home,
  Trophy,
  Briefcase,
  Palette,
  Leaf,
  Stethoscope,
  AlertCircle,
  FileText,
  School,
  Baby,
  Droplets,
  DollarSign,
} from "lucide-react";

// About page translations
const aboutTranslations = {
  en: {
    heroSubtitle: "Empowering Communities • Transforming Lives • Building Hope",
    trustTitle: "About Our Trust",
    trustDescription:
      "Sahyog Asha Trust is dedicated to creating positive social change through comprehensive community development programs. We believe in empowering individuals and communities to build a better, more equitable society for everyone.",
    ourCommitment: "Our Commitment",
    commitmentDescription1:
      "Since our inception, we have been committed to addressing the multifaceted challenges faced by underprivileged communities. Our holistic approach encompasses education, healthcare, skill development, environmental conservation, and social welfare.",
    commitmentDescription2:
      "We work tirelessly to bridge the gap between opportunity and access, ensuring that every individual has the chance to realize their potential and contribute meaningfully to society.",
    missionVision: "Mission & Vision",
    ourMission: "Our Mission",
    missionDescription:
      "To empower underprivileged communities through comprehensive education, skill development, healthcare, and social welfare programs, fostering sustainable development and creating opportunities for dignified living.",
    ourVision: "Our Vision",
    visionDescription:
      "To build an inclusive society where every individual has access to quality education, healthcare, and opportunities for personal growth, contributing to a just and equitable world free from poverty and discrimination.",
    ourObjectives: "Our Objectives",
    objectivesSubtitle:
      "Our comprehensive approach addresses multiple aspects of community development",
    whoWeServe: "Who We Serve",
    whoWeServeSubtitle:
      "Our programs are designed to support various segments of society who need assistance and empowerment",

    // Objectives
    objective1Title: "Promote Education",
    objective1Desc:
      "Empowering communities through quality education and learning opportunities",
    objective2Title: "IT & Vocational Training",
    objective2Desc:
      "Running computer, IT, and vocational training institutes for skill development",
    objective3Title: "Women Empowerment",
    objective3Desc:
      "Empowering women through comprehensive skill development programs",
    objective4Title: "Support the Vulnerable",
    objective4Desc:
      "Supporting disabled individuals, orphans, and those in need",
    objective5Title: "De-addiction Campaigns",
    objective5Desc:
      "Conducting awareness and rehabilitation programs for addiction recovery",
    objective6Title: "Elder Care",
    objective6Desc:
      "Operating old age homes with dignity and compassionate care",
    objective7Title: "Youth Development",
    objective7Desc:
      "Developing youth through sports activities and career guidance",
    objective8Title: "Self-Employment Training",
    objective8Desc:
      "Providing training and support for entrepreneurship and self-employment",
    objective9Title: "Rural Development",
    objective9Desc:
      "Promoting rural development and preserving local art and culture",
    objective10Title: "Environment Protection",
    objective10Desc:
      "Working for environmental conservation and pollution control",
    objective11Title: "Health & Nutrition",
    objective11Desc: "Organizing health camps and nutrition awareness programs",
    objective12Title: "Human Rights Awareness",
    objective12Desc:
      "Spreading awareness on human rights and cleanliness initiatives",
    objective13Title: "Right to Information",
    objective13Desc:
      "Promoting transparency through Right to Information (RTI) advocacy",
    objective14Title: "Higher Education",
    objective14Desc: "Operating higher and technical education institutes",
    objective15Title: "Health Awareness",
    objective15Desc: "Running family planning and health awareness programs",
    objective16Title: "Water Conservation",
    objective16Desc:
      "Implementing water conservation and rainwater harvesting projects",
    objective17Title: "Financial Support",
    objective17Desc:
      "Managing institutional funding and providing financial assistance",

    // Beneficiaries
    beneficiary1Title: "Children & Youth",
    beneficiary1Desc:
      "Orphans, underprivileged children, and young adults seeking education and skill development",
    beneficiary2Title: "Women",
    beneficiary2Desc:
      "Women from rural and urban areas looking for empowerment and skill development opportunities",
    beneficiary3Title: "Elderly",
    beneficiary3Desc:
      "Senior citizens in need of care, support, and dignified living conditions",
    beneficiary4Title: "Disabled Individuals",
    beneficiary4Desc:
      "People with disabilities requiring support, training, and rehabilitation services",
    beneficiary5Title: "Rural Communities",
    beneficiary5Desc:
      "Farmers, artisans, and rural populations needing development and livelihood support",
    beneficiary6Title: "Addiction Affected",
    beneficiary6Desc:
      "Individuals and families affected by addiction seeking recovery and rehabilitation",
  },
  hi: {
    heroSubtitle: "समुदायों को सशक्त बनाना • जीवन को बदलना • आशा का निर्माण",
    trustTitle: "हमारे ट्रस्ट के बारे में",
    trustDescription:
      "सहयोग आशा ट्रस्ट व्यापक सामुदायिक विकास कार्यक्रमों के माध्यम से सकारात्मक सामाजिक परिवर्तन लाने के लिए समर्पित है। हम व्यक्तियों और समुदायों को सशक्त बनाने में विश्वास करते हैं ताकि सभी के लिए एक बेहतर, अधिक न्यायसंगत समाज का निर्माण किया जा सके।",
    ourCommitment: "हमारी प्रतिबद्धता",
    commitmentDescription1:
      "हमारी स्थापना के बाद से, हम वंचित समुदायों के सामने आने वाली बहुआयामी चुनौतियों को संबोधित करने के लिए प्रतिबद्ध हैं। हमारा समग्र दृष्टिकोण शिक्षा, स्वास्थ्य देखभाल, कौशल विकास, पर्यावरण संरक्षण और सामाजिक कल्याण को शामिल करता है।",
    commitmentDescription2:
      "हम अवसर और पहुंच के बीच की खाई को पाटने के लिए अथक प्रयास करते हैं, यह सुनिश्चित करते हुए कि हर व्यक्ति को अपनी क्षमता का एहसास करने और समाज में सार्थक योगदान देने का मौका मिले।",
    missionVision: "मिशन और विजन",
    ourMission: "हमारा मिशन",
    missionDescription:
      "व्यापक शिक्षा, कौशल विकास, स्वास्थ्य देखभाल और सामाजिक कल्याण कार्यक्रमों के माध्यम से वंचित समुदायों को सशक्त बनाना, सतत विकास को बढ़ावा देना और सम्मानजनक जीवन के लिए अवसर पैदा करना।",
    ourVision: "हमारा विजन",
    visionDescription:
      "एक समावेशी समाज का निर्माण करना जहां हर व्यक्ति को गुणवत्तापूर्ण शिक्षा, स्वास्थ्य देखभाल और व्यक्तिगत विकास के अवसरों तक पहुंच हो, गरीबी और भेदभाव से मुक्त एक न्यायसंगत और न्यायपूर्ण दुनिया में योगदान करना।",
    ourObjectives: "हमारे उद्देश्य",
    objectivesSubtitle:
      "हमारा व्यापक दृष्टिकोण सामुदायिक विकास के कई पहलुओं को संबोधित करता है",
    whoWeServe: "हम किसकी सेवा करते हैं",
    whoWeServeSubtitle:
      "हमारे कार्यक्रम समाज के विभिन्न वर्गों की सहायता और सशक्तिकरण के लिए डिज़ाइन किए गए हैं",

    // Objectives
    objective1Title: "शिक्षा को बढ़ावा देना",
    objective1Desc:
      "गुणवत्तापूर्ण शिक्षा और सीखने के अवसरों के माध्यम से समुदायों को सशक्त बनाना",
    objective2Title: "आईटी और व्यावसायिक प्रशिक्षण",
    objective2Desc:
      "कौशल विकास के लिए कंप्यूटर, आईटी और व्यावसायिक प्रशिक्षण संस्थान चलाना",
    objective3Title: "महिला सशक्तिकरण",
    objective3Desc:
      "व्यापक कौशल विकास कार्यक्रमों के माध्यम से महिलाओं को सशक्त बनाना",
    objective4Title: "कमजोर वर्गों की सहायता",
    objective4Desc: "विकलांग व्यक्तियों, अनाथों और जरूरतमंदों की सहायता",
    objective5Title: "नशा मुक्ति अभियान",
    objective5Desc:
      "नशा मुक्ति के लिए जागरूकता और पुनर्वास कार्यक्रम आयोजित करना",
    objective6Title: "वृद्ध देखभाल",
    objective6Desc: "गरिमा और करुणा के साथ वृद्धाश्रम संचालित करना",
    objective7Title: "युवा विकास",
    objective7Desc:
      "खेल गतिविधियों और करियर मार्गदर्शन के माध्यम से युवाओं का विकास",
    objective8Title: "स्वरोजगार प्रशिक्षण",
    objective8Desc:
      "उद्यमिता और स्वरोजगार के लिए प्रशिक्षण और सहायता प्रदान करना",
    objective9Title: "ग्रामीण विकास",
    objective9Desc:
      "ग्रामीण विकास को बढ़ावा देना और स्थानीय कला और संस्कृति को संरक्षित करना",
    objective10Title: "पर्यावरण संरक्षण",
    objective10Desc: "पर्यावरण संरक्षण और प्रदूषण नियंत्रण के लिए काम करना",
    objective11Title: "स्वास्थ्य और पोषण",
    objective11Desc: "स्वास्थ्य शिविर और पोषण जागरूकता कार्यक्रम आयोजित करना",
    objective12Title: "मानवाधिकार जागरूकता",
    objective12Desc: "मानवाधिकार और स्वच्छता पहलों पर जागरूकता फैलाना",
    objective13Title: "सूचना का अधिकार",
    objective13Desc:
      "सूचना का अधिकार (आरटीआई) वकालत के माध्यम से पारदर्शिता को बढ़ावा देना",
    objective14Title: "उच्च शिक्षा",
    objective14Desc: "उच्च और तकनीकी शिक्षा संस्थान संचालित करना",
    objective15Title: "स्वास्थ्य जागरूकता",
    objective15Desc: "परिवार नियोजन और स्वास्थ्य जागरूकता कार्यक्रम चलाना",
    objective16Title: "जल संरक्षण",
    objective16Desc: "जल संरक्षण और वर्षा जल संचयन परियोजनाएं लागू करना",
    objective17Title: "वित्तीय सहायता",
    objective17Desc: "संस्थागत धन का प्रबंधन और वित्तीय सहायता प्रदान करना",

    // Beneficiaries
    beneficiary1Title: "बच्चे और युवा",
    beneficiary1Desc:
      "अनाथ, वंचित बच्चे और शिक्षा और कौशल विकास की तलाश में युवा वयस्क",
    beneficiary2Title: "महिलाएं",
    beneficiary2Desc:
      "ग्रामीण और शहरी क्षेत्रों की महिलाएं जो सशक्तिकरण और कौशल विकास के अवसरों की तलाश में हैं",
    beneficiary3Title: "वृद्ध",
    beneficiary3Desc:
      "देखभाल, सहायता और गरिमापूर्ण जीवन स्थितियों की आवश्यकता वाले वरिष्ठ नागरिक",
    beneficiary4Title: "विकलांग व्यक्ति",
    beneficiary4Desc:
      "सहायता, प्रशिक्षण और पुनर्वास सेवाओं की आवश्यकता वाले विकलांग लोग",
    beneficiary5Title: "ग्रामीण समुदाय",
    beneficiary5Desc:
      "विकास और आजीविका सहायता की आवश्यकता वाले किसान, कारीगर और ग्रामीण आबादी",
    beneficiary6Title: "नशा प्रभावित",
    beneficiary6Desc:
      "पुनर्प्राप्ति और पुनर्वास की तलाश में नशे से प्रभावित व्यक्ति और परिवार",
  },
};

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

const getObjectives = (t: (key: string) => string) => [
  {
    icon: GraduationCap,
    title: t("objective1Title"),
    description: t("objective1Desc"),
  },
  {
    icon: Computer,
    title: t("objective2Title"),
    description: t("objective2Desc"),
  },
  {
    icon: Users,
    title: t("objective3Title"),
    description: t("objective3Desc"),
  },
  {
    icon: Heart,
    title: t("objective4Title"),
    description: t("objective4Desc"),
  },
  {
    icon: Shield,
    title: t("objective5Title"),
    description: t("objective5Desc"),
  },
  {
    icon: Home,
    title: t("objective6Title"),
    description: t("objective6Desc"),
  },
  {
    icon: Trophy,
    title: t("objective7Title"),
    description: t("objective7Desc"),
  },
  {
    icon: Briefcase,
    title: t("objective8Title"),
    description: t("objective8Desc"),
  },
  {
    icon: Palette,
    title: t("objective9Title"),
    description: t("objective9Desc"),
  },
  {
    icon: Leaf,
    title: t("objective10Title"),
    description: t("objective10Desc"),
  },
  {
    icon: Stethoscope,
    title: t("objective11Title"),
    description: t("objective11Desc"),
  },
  {
    icon: AlertCircle,
    title: t("objective12Title"),
    description: t("objective12Desc"),
  },
  {
    icon: FileText,
    title: t("objective13Title"),
    description: t("objective13Desc"),
  },
  {
    icon: School,
    title: t("objective14Title"),
    description: t("objective14Desc"),
  },
  {
    icon: Baby,
    title: t("objective15Title"),
    description: t("objective15Desc"),
  },
  {
    icon: Droplets,
    title: t("objective16Title"),
    description: t("objective16Desc"),
  },
  {
    icon: DollarSign,
    title: t("objective17Title"),
    description: t("objective17Desc"),
  },
];

const getBeneficiaries = (t: (key: string) => string) => [
  {
    title: t("beneficiary1Title"),
    description: t("beneficiary1Desc"),
  },
  {
    title: t("beneficiary2Title"),
    description: t("beneficiary2Desc"),
  },
  {
    title: t("beneficiary3Title"),
    description: t("beneficiary3Desc"),
  },
  {
    title: t("beneficiary4Title"),
    description: t("beneficiary4Desc"),
  },
  {
    title: t("beneficiary5Title"),
    description: t("beneficiary5Desc"),
  },
  {
    title: t("beneficiary6Title"),
    description: t("beneficiary6Desc"),
  },
];

export default function AboutPage() {
  const { language } = useLanguage();

  // Get translations for current language
  const t = (key: string) =>
    aboutTranslations[language][key as keyof typeof aboutTranslations.en] ||
    key;

  // Get objectives and beneficiaries with translations
  const objectives = getObjectives(t);
  const beneficiaries = getBeneficiaries(t);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/child.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/60" />

        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Sahyog Asha Trust
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {t("heroSubtitle")}
          </motion.p>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("trustTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t("trustDescription")}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <img
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Community work"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              {t("ourCommitment")}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t("commitmentDescription1")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("commitmentDescription2")}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 md:py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="text-center mb-5 md:mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("missionVision")}
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-0">
                <CardContent className="p-4 md:p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("ourMission")}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {t("missionDescription")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-0">
                <CardContent className="p-4 md:p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Trophy className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t("ourVision")}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {t("visionDescription")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-8 md:py-20 px-4 max-w-7xl mx-auto">
        <motion.div className="text-center mb-8 md:mb-16" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("ourObjectives")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("objectivesSubtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group p-0">
                  <CardContent className="p-4 md:p-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                      {objective.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {objective.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Who We Serve */}
      <section className="py-8 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="text-center mb-8 md:mb-16" {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("whoWeServe")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("whoWeServeSubtitle")}
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {beneficiaries.map((beneficiary, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-0">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {beneficiary.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {beneficiary.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
