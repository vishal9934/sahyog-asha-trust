"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: "en" | "hi";
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    // Header
    home: "Home",
    about: "About Us",
    program: "Our Programs",
    newsEvents: "News & Media",
    team: "Team",
    contact: "Contact Us",
    donate: "Donate",

    // Hero Carousel Slides
    slide1Title: " Sahyog Asha Trust",
    slide1Subtitle: "Empowering Communities, Transforming Lives",
    slide1Description:
      "Dedicated to creating positive change through education, skill development, and community empowerment across India.",

    slide2Title: "Education for All",
    slide2Subtitle: "Building Brighter Futures",
    slide2Description:
      "Providing quality education and skill development programs to children and adults in underserved communities.",

    slide3Title: "Women Empowerment",
    slide3Subtitle: "Strengthening Communities",
    slide3Description:
      "Supporting women through skill development, entrepreneurship training, and leadership programs.",

    slide4Title: "Rural Development",
    slide4Subtitle: "Strengthening Rural Roots Through Culture and Growth ",
    slide4Description:
      "Our NGO is committed to uplifting rural communities by encouraging sustainable development and preserving local heritage.",

    learnMore: "Learn More",

    // Trust Goals
    trustGoalsTitle: "Our Mission",
    trustGoalsSubtitle: "Working together for a better tomorrow",
    goal1: "Promote Education",
    goal2: "IT & Vocational Training",
    goal3: "Women Empowerment",
    goal4: "Support Disabled & Orphans",
    goal5: "De-addiction Campaigns",
    goal6: "Old Age Homes",
    goal7: "Youth Development",
    goal8: "Self-employment Training",
    goal9: "Rural Development",
    goal10: "Environment Protection",
    goal11: "Health Camps",
    goal12: "Human Rights Awareness",
    goal13: "Right to Information",
    goal14: "Technical Education",
    goal15: "Health Awareness",
    goal16: "Water Conservation",
    goal17: "Financial Support",

    // News & Events
    newsTitle: "Recent Activities",
    newsSubtitle: "Stay updated with our latest activities",
    readMore: "Read More",
    seeAllActivities: "See All Activities",

    // News & Media Dropdown
    allNews: "All News & Events",
    mediaCoverage: "Media Coverage",

    // Team
    president: "President",
    secretary: "Secretary",
    treasurer: "Treasurer",
    coordinator: "Program Coordinator",
    founder: "Founder",
    vicePresident: "Vice President",
    member: "Member",
    meetLeadershipTeam: "Meet Our Leadership Team",
    leadershipSubtitle:
      "Dedicated professionals working together to create positive change in communities worldwide",

    // Contact
    contactTitle: "Get In Touch",
    contactSubtitle: "We would love to hear from you",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    subjectLabel: "Subject",
    messageLabel: "Message",
    sendMessage: "Send Message",
    phone: "Phone",
    email: "Email",
    address: "Address",

    // Footer
    footerText: "Making a difference in communities across India.",
    quickLinks: "Quick Links",
    followUs: "Follow Us",

    // Sample content
    news1Title: "Education Drive in Rural Areas",
    news1Desc:
      "Successfully conducted educational workshops in 15 villages, reaching over 500 children.",
    news1Content1:
      "Our team of dedicated educators traveled across 15 remote villages in Uttar Pradesh to bring quality education to children who had limited access to formal schooling. The initiative focused on providing basic literacy, numeracy, and life skills training.",
    news1Content2:
      "The program included interactive learning sessions, distribution of educational materials, and training for local volunteers to continue the educational support. We also established community learning centers in each village to ensure sustained educational development.",
    news1Content3:
      "Parents and community leaders were actively involved in the program, creating a supportive environment for children's education. The initiative also addressed gender disparities by ensuring equal participation of boys and girls.",
    news1Highlight1: "Reached 500+ children across 15 villages",
    news1Highlight2: "Established 15 community learning centers",
    news1Highlight3: "Trained 30 local volunteers as educators",
    news1Highlight4: "Achieved 85% improvement in basic literacy rates",
    news1Impact:
      "The program has created a sustainable educational foundation in these communities, with children now having regular access to quality education and improved prospects for their future.",

    news2Title: "Women Skill Development Program",
    news2Desc:
      "Launched comprehensive skill development program for women in textile and handicrafts.",
    news2Content1:
      "Our women empowerment initiative focused on providing practical skills training in traditional textile arts and modern handicrafts. The program was designed to help women generate sustainable income while preserving cultural heritage.",
    news2Content2:
      "Participants received training in various techniques including embroidery, weaving, block printing, and modern design principles. The program also included business development skills, marketing strategies, and digital literacy training.",
    news2Content3:
      "We partnered with local artisans and established market linkages to ensure the women could sell their products effectively. The program also provided access to micro-finance options for those who wanted to start their own businesses.",
    news2Highlight1: "150+ women trained in textile and handicraft skills",
    news2Highlight2: "Established 5 self-help groups for collective marketing",
    news2Highlight3: "Created market linkages with 10+ retail partners",
    news2Impact:
      "The program has empowered women to become financially independent, with participants reporting an average 60% increase in household income.",

    news3Title: "Environment Conservation Campaign",
    news3Desc:
      "Organized tree plantation drive and awareness campaign in local communities.",
    news3Content1:
      "Our environmental conservation initiative focused on creating awareness about climate change and promoting sustainable practices in local communities. The campaign included tree plantation drives, waste management workshops, and renewable energy awareness programs.",
    news3Content2:
      "We organized community clean-up drives and established waste segregation systems in residential areas. The program also included training sessions on organic farming techniques and water conservation methods.",
    news3Content3:
      "Local schools and community groups were actively involved in the campaign, creating a culture of environmental responsibility among the younger generation. We also established community gardens and composting units.",
    news3Highlight1: "Planted 2000+ trees across 20 communities",
    news3Highlight2: "Established 15 waste segregation units",
    news3Highlight3: "Trained 200+ volunteers in environmental practices",
    news3Impact:
      "The campaign has significantly improved local environmental awareness and created sustainable practices that continue to benefit the community.",

    // News Details Page
    newsNotFound: "News article not found",
    backToNews: "Back to News",
    keyHighlights: "Key Highlights",
    impact: "Impact",
  },
  hi: {
    // Header
    home: "होम",
    about: "हमारे बारे में",
    program: "हमारे कार्यक्रम",
    objectives: "उद्देश्य",
    newsEvents: "समाचार और कार्यक्रम",
    team: "टीम",
    contact: "संपर्क",
    donate: "दान करें",

    // Hero Carousel Slides
    slide1Title: " सहयोग आशा ट्रस्ट",
    slide1Subtitle: "समुदायों को सशक्त बनाना, जीवन को बदलना",
    slide1Description:
      "शिक्षा, कौशल विकास और समुदायिक सशक्तिकरण के माध्यम से सकारात्मक बदलाव लाने के लिए समर्पित।",

    slide2Title: "सभी के लिए शिक्षा",
    slide2Subtitle: "उज्जवल भविष्य का निर्माण",
    slide2Description:
      "वंचित समुदायों में बच्चों और वयस्कों को गुणवत्तापूर्ण शिक्षा और कौशल विकास कार्यक्रम प्रदान करना।",

    slide3Title: "महिला सशक्तिकरण",
    slide3Subtitle: "समुदायों को मजबूत बनाना",
    slide3Description:
      "कौशल विकास, उद्यमिता प्रशिक्षण और नेतृत्व कार्यक्रमों के माध्यम से महिलाओं का समर्थन।",

    slide4Title: "ग्रामीण विकास और स्थानीय कला को बढ़ावा देना",
    slide4Subtitle: "गाँवों की तरक्की, परंपराओं की चमक",
    slide4Description:
      "हमारा उद्देश्य ग्रामीण क्षेत्रों का समग्र विकास करना है, जिसमें शिक्षा, स्वास्थ्य, रोजगार और बुनियादी ढाँचे को सुदृढ़ करना शामिल है।",

    learnMore: "और जानें",

    // Trust Goals
    trustGoalsTitle: "हमारे उद्देश्य",
    trustGoalsSubtitle: "बेहतर कल के लिए मिलकर काम करना",
    goal1: "शिक्षा को बढ़ावा देना",
    goal2: "आईटी और व्यावसायिक प्रशिक्षण",
    goal3: "महिला सशक्तिकरण",
    goal4: "विकलांग और अनाथों की सहायता",
    goal5: "नशा मुक्ति अभियान",
    goal6: "वृद्धाश्रम संचालन",
    goal7: "युवा विकास",
    goal8: "स्वरोजगार प्रशिक्षण",
    goal9: "ग्रामीण विकास",
    goal10: "पर्यावरण संरक्षण",
    goal11: "स्वास्थ्य शिविर",
    goal12: "मानवाधिकार जागरूकता",
    goal13: "सूचना का अधिकार",
    goal14: "तकनीकी शिक्षा",
    goal15: "स्वास्थ्य जागरूकता",
    goal16: "जल संरक्षण",
    goal17: "वित्तीय सहायता",

    // News & Events
    newsTitle: "हाल की गतिविधियाँ",
    newsSubtitle: "हमारी नवीनतम गतिविधियों से अपडेट रहें",
    readMore: "और पढ़ें",
    seeAllActivities: "सभी गतिविधियाँ देखें",

    // News & Media Dropdown
    allNews: "सभी समाचार और कार्यक्रम",
    mediaCoverage: "मीडिया कवरेज",

    // Team
    president: "अध्यक्ष",
    secretary: "सचिव",
    treasurer: "कोषाध्यक्ष",
    coordinator: "संयोजक",
    founder: "संस्थापक",
    vicePresident: "उपाध्यक्ष",
    member: "सदस्य",
    meetLeadershipTeam: "हमारी नेतृत्व टीम से मिलें",
    leadershipSubtitle:
      "समर्पित पेशेवर जो दुनिया भर के समुदायों में सकारात्मक बदलाव लाने के लिए एक साथ काम कर रहे हैं",

    // Contact
    contactTitle: "संपर्क में रहें",
    contactSubtitle: "हम आपसे सुनना पसंद करेंगे",
    nameLabel: "पूरा नाम",
    emailLabel: "ईमेल पता",
    subjectLabel: "विषय",
    messageLabel: "संदेश",
    sendMessage: "संदेश भेजें",
    phone: "फोन",
    email: "ईमेल",
    address: "पता",

    // Footer
    footerText: "भारत भर के समुदायों में बदलाव लाना।",
    quickLinks: "त्वरित लिंक",
    followUs: "हमें फॉलो करें",

    // Sample content
    news1Title: "ग्रामीण क्षेत्रों में शिक्षा अभियान",
    news1Desc:
      "15 गांवों में शैक्षिक कार्यशालाओं का सफल आयोजन, 500 से अधिक बच्चों तक पहुंच।",
    news1Content1:
      "हमारी समर्पित शिक्षकों की टीम ने उत्तर प्रदेश के 15 दूरस्थ गांवों में यात्रा की ताकि उन बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान की जा सके जिनकी औपचारिक स्कूली शिक्षा तक सीमित पहुंच थी। इस पहल का ध्यान बुनियादी साक्षरता, संख्यात्मकता और जीवन कौशल प्रशिक्षण प्रदान करने पर केंद्रित था।",
    news1Content2:
      "कार्यक्रम में इंटरैक्टिव शिक्षण सत्र, शैक्षिक सामग्री का वितरण, और स्थानीय स्वयंसेवकों को निरंतर शैक्षिक सहायता जारी रखने के लिए प्रशिक्षण शामिल था। हमने सतत शैक्षिक विकास सुनिश्चित करने के लिए प्रत्येक गांव में सामुदायिक शिक्षण केंद्र भी स्थापित किए।",
    news1Content3:
      "माता-पिता और सामुदायिक नेताओं ने कार्यक्रम में सक्रिय रूप से भाग लिया, बच्चों की शिक्षा के लिए एक सहायक वातावरण बनाया। पहल ने लड़कों और लड़कियों की समान भागीदारी सुनिश्चित करके लिंग असमानताओं को भी संबोधित किया।",
    news1Highlight1: "15 गांवों में 500+ बच्चों तक पहुंच",
    news1Highlight2: "15 सामुदायिक शिक्षण केंद्र स्थापित",
    news1Highlight3: "30 स्थानीय स्वयंसेवकों को शिक्षक के रूप में प्रशिक्षित",
    news1Highlight4: "बुनियादी साक्षरता दर में 85% सुधार",
    news1Impact:
      "कार्यक्रम ने इन समुदायों में एक सतत शैक्षिक आधार बनाया है, जिससे बच्चों को अब नियमित रूप से गुणवत्तापूर्ण शिक्षा तक पहुंच है और उनके भविष्य के लिए बेहतर संभावनाएं हैं।",

    news2Title: "महिला कौशल विकास कार्यक्रम",
    news2Desc:
      "वस्त्र और हस्तशिल्प में महिलाओं के लिए व्यापक कौशल विकास कार्यक्रम शुरू किया।",
    news2Content1:
      "हमारी महिला सशक्तिकरण पहल पारंपरिक वस्त्र कलाओं और आधुनिक हस्तशिल्प में व्यावहारिक कौशल प्रशिक्षण प्रदान करने पर केंद्रित थी। कार्यक्रम को सांस्कृतिक विरासत को संरक्षित करते हुए महिलाओं को सतत आय उत्पन्न करने में मदद करने के लिए डिज़ाइन किया गया था।",
    news2Content2:
      "प्रतिभागियों को कढ़ाई, बुनाई, ब्लॉक प्रिंटिंग और आधुनिक डिज़ाइन सिद्धांतों सहित विभिन्न तकनीकों में प्रशिक्षण प्राप्त हुआ। कार्यक्रम में व्यवसाय विकास कौशल, विपणन रणनीतियां और डिजिटल साक्षरता प्रशिक्षण भी शामिल था।",
    news2Content3:
      "हमने स्थानीय कारीगरों के साथ साझेदारी की और यह सुनिश्चित करने के लिए बाजार संबंध स्थापित किए कि महिलाएं अपने उत्पादों को प्रभावी ढंग से बेच सकें। कार्यक्रम ने उन लोगों के लिए सूक्ष्म-वित्त विकल्पों तक पहुंच भी प्रदान की जो अपना व्यवसाय शुरू करना चाहते थे।",
    news2Highlight1: "150+ महिलाओं को वस्त्र और हस्तशिल्प कौशल में प्रशिक्षित",
    news2Highlight2: "सामूहिक विपणन के लिए 5 स्वयं सहायता समूह स्थापित",
    news2Highlight3: "10+ खुदरा भागीदारों के साथ बाजार संबंध बनाए",
    news2Impact:
      "कार्यक्रम ने महिलाओं को आर्थिक रूप से स्वतंत्र बनने में सशक्त बनाया है, प्रतिभागियों ने घरेलू आय में औसत 60% की वृद्धि की सूचना दी है।",

    news3Title: "पर्यावरण संरक्षण अभियान",
    news3Desc:
      "स्थानीय समुदायों में वृक्षारोपण अभियान और जागरूकता कार्यक्रम का आयोजन।",
    news3Content1:
      "हमारी पर्यावरण संरक्षण पहल जलवायु परिवर्तन के बारे में जागरूकता पैदा करने और स्थानीय समुदायों में सतत प्रथाओं को बढ़ावा देने पर केंद्रित थी। अभियान में वृक्षारोपण अभियान, अपशिष्ट प्रबंधन कार्यशालाएं और नवीकरणीय ऊर्जा जागरूकता कार्यक्रम शामिल थे।",
    news3Content2:
      "हमने सामुदायिक सफाई अभियान आयोजित किए और आवासीय क्षेत्रों में अपशिष्ट पृथक्करण प्रणालियां स्थापित कीं। कार्यक्रम में जैविक खेती तकनीकों और जल संरक्षण विधियों पर प्रशिक्षण सत्र भी शामिल थे।",
    news3Content3:
      "स्थानीय स्कूलों और सामुदायिक समूहों ने अभियान में सक्रिय रूप से भाग लिया, युवा पीढ़ी के बीच पर्यावरणीय जिम्मेदारी की संस्कृति बनाई। हमने सामुदायिक उद्यान और कम्पोस्टिंग इकाइयां भी स्थापित कीं।",
    news3Highlight1: "20 समुदायों में 2000+ पेड़ लगाए",
    news3Highlight2: "15 अपशिष्ट पृथक्करण इकाइयां स्थापित",
    news3Highlight3: "200+ स्वयंसेवकों को पर्यावरणीय प्रथाओं में प्रशिक्षित",
    news3Impact:
      "अभियान ने स्थानीय पर्यावरणीय जागरूकता में काफी सुधार किया है और सतत प्रथाएं बनाई हैं जो समुदाय को लगातार लाभ पहुंचाती हैं।",

    // News Details Page
    newsNotFound: "समाचार लेख नहीं मिला",
    backToNews: "समाचार पर वापस जाएं",
    keyHighlights: "मुख्य बिंदु",
    impact: "प्रभाव",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
