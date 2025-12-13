"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Linkedin, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Mithlesh Kumar",
    nameHi: "मिथलेश कुमार",
    position: "Founder",
    positionKey: "founder",
    mobile: "+91 8448206564",
    image: "/images/mithilesh.jpg",
    email: "sarah.johnson@ngo.org",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    id: 2,
    name: "Ritik Kumar",
    nameHi: "रितिक कुमार",
    position: "President",
    positionKey: "president",
    mobile: "+91 8271669274",
    image: "/images/ritik.jpg",
    email: "michael.chen@ngo.org",
    linkedin: "https://linkedin.com/in/michaelchen",
  },
  {
    id: 3,
    name: "Dilip Verma",
    nameHi: "दिलीप वर्मा",
    position: "Vice President",
    positionKey: "vicePresident",
    mobile: "+91 7992303603",
    image: "",
    email: "emily.rodriguez@ngo.org",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: 4,
    name: "Karuna Minj",
    nameHi: "कुरुना मिंज",
    position: "Delhi Pradesh President",
    positionKey: "delhiPresident",
    mobile: "+91 9958038621",
    image: "/images/karuna.jpg",
    email: "emily.rodriguez@ngo.org",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: 5,
    name: "Anita Kindo",
    nameHi: "अनिता किंडो",
    position: "Treasurer",
    positionKey: "delhiTreasurer",
    mobile: "+91 7678276610",
    image: "/images/anita.jpg",
    email: "emily.rodriguez@ngo.org",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: 6,
    name: "Seema Bhengra",
    nameHi: "सीमा भेंग्रा",
    position: "Delhi Pradesh Secretary",
    positionKey: "delhiSecretary",
    mobile: "+91 9958376419",
    image: "/images/seema.jpg",
    email: "emily.rodriguez@ngo.org",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: 7,
    name: "Sanjay Ram",
    nameHi: "संजय राम",
    position: "Treasurer",
    positionKey: "treasurer",
    mobile: "+91 6205098368",
    image: "/images/sanjay.jpg",
    email: "david.thompson@ngo.org",
    linkedin: "https://linkedin.com/in/davidthompson",
  },
  {
    id: 8,
    name: "Vijay uraon",
    nameHi: "विजय उरांव",
    position: "Secretary",
    positionKey: "secretary",
    mobile: "+91 9308710891",
    image: "/images/vijay.jpg",
    email: "aisha.patel@ngo.org",
    linkedin: "https://linkedin.com/in/aishapatel",
  },
  {
    id: 9,
    name: "Saroj Ekka",
    nameHi: "सरोज एक्का",
    position: "Coordinator",
    positionKey: "coordinator",
    mobile: "+91 ",
    image: "",
    email: "james.wilson@ngo.org",
    linkedin: "https://linkedin.com/in/jameswilson",
  },
  {
    id: 10,
    name: "Poonam Lakra",
    nameHi: "पूनम लकड़ा",
    position: "nationalPresident",
    positionKey: "nationalPresident",
    mobile: "+91 6206181061",
    image: "/images/poonam.jpg",
    email: "james.wilson@ngo.org",
    linkedin: "https://linkedin.com/in/jameswilson",
  },
  {
    id: 11,
    name: "Sitaram Singh",
    nameHi: "सीताराम सिंह",
    position: "Member",
    positionKey: "member",
    mobile: "+91 9572170801",
    image: "/images/sitaram.jpg",
    email: "james.wilson@ngo.org",
    linkedin: "https://linkedin.com/in/jameswilson",
  },
];

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word: string) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarColor = (index: number): string => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  return colors[index % colors.length];
};

export default function TeamSection() {
  const { t, language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
    },
  });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setIsAutoPlaying(false); // Stop auto-sliding when user clicks
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setIsAutoPlaying(false); // Stop auto-sliding when user clicks
    }
  }, [emblaApi]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi || !isAutoPlaying) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 2000);

    return () => clearInterval(autoplay);
  }, [emblaApi, isAutoPlaying]);

  // Stop auto-play on user interaction (touch/drag)
  useEffect(() => {
    if (!emblaApi) return;

    const onPointerDown = () => setIsAutoPlaying(false);

    emblaApi.on("pointerDown", onPointerDown);

    return () => {
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi]);

  return (
    <section
      id="team"
      className="py-8 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("meetLeadershipTeam")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("leadershipSubtitle")}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 md:w-12 md:h-12 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 -ml-6"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 md:w-12 md:h-12 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 -mr-6"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="flex-[0_0_100%] md:flex-[0_0_33.333%] px-3"
                >
                  <div className="px-1 md:px-2">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group h-full transform hover:-translate-y-2">
                      <div className="relative overflow-hidden">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={
                              language === "hi" ? member.nameHi : member.name
                            }
                            width={400}
                            height={256}
                            className="w-full h-48 md:h-64 fill group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-48 md:h-64 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <Avatar className="w-24 h-24">
                              <AvatarFallback
                                className={`${getAvatarColor(
                                  index
                                )} text-white text-2xl font-bold`}
                              >
                                {getInitials(
                                  language === "hi"
                                    ? member.nameHi
                                    : member.name
                                )}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          {/* <div className="flex space-x-2 md:space-x-3">
                            <button
                              onClick={() =>
                                window.open(`mailto:${member.email}`, "_blank")
                              }
                              className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              <Mail className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <button
                              onClick={() =>
                                window.open(`tel:${member.mobile}`, "_blank")
                              }
                              className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                            >
                              <Phone className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            {member.linkedin && (
                              <button
                                onClick={() =>
                                  window.open(member.linkedin, "_blank")
                                }
                                className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                              >
                                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                              </button>
                            )}
                          </div> */}
                        </div>
                      </div>

                      <div className="p-4 md:p-6 text-center">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                          {language === "hi" ? member.nameHi : member.name}
                        </h3>
                        <p className="text-blue-600 font-semibold mb-2 md:mb-3 text-sm md:text-base">
                          {t(member.positionKey)}
                        </p>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          {member.mobile}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
