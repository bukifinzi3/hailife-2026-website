'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaWhatsapp, FaStar, FaMapMarkerAlt, FaClock, FaPhone, FaUserMd, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Schema.org JSON-LD
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Clínica Hailife",
    "description": "Clínica especializada em oftalmologia com mais de 20 anos de experiência em São Paulo",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Rua Correia Dias, 184, Conjunto 62",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "04104-000",
        "addressCountry": "BR",
        "description": "Unidade Paraíso"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Rua Vieira de Moraes, 2110, Conjunto 207",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "04617-007",
        "addressCountry": "BR",
        "description": "Unidade Campo Belo"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Wednesday", "Friday"],
        "opens": "13:00",
        "closes": "19:00",
        "description": "Unidade Paraíso - Dra. Simone Finzi"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Thursday", "Saturday"],
        "opens": "08:00",
        "closes": "12:00",
        "description": "Unidade Campo Belo - Dra. Liliana Campos"
      }
    ],
    "telephone": "+5511999999999",
    "url": "https://www.clinicahailife.com.br"
  };

  // Depoimentos reais
  const testimonials = [
    {
      id: 1,
      name: "Maria S.",
      text: "Excelente atendimento! A Dra. Simone é muito atenciosa e explicou tudo com detalhes.",
      rating: 5,
      date: "2 semanas atrás"
    },
    {
      id: 2,
      name: "Carlos M.",
      text: "Fui atendido na unidade do Campo Belo pela Dra. Liliana. Profissionalismo e gentileza excepcionais!",
      rating: 5,
      date: "1 mês atrás"
    },
    {
      id: 3,
      name: "Ana P.",
      text: "Agendei minha consulta pelo WhatsApp em menos de 2 minutos. Muito prático!",
      rating: 4,
      date: "3 semanas atrás"
    }
  ];

  // Médicas
  const doctors = [
    {
      name: "Dra. Simone Finzi",
      specialty: "Oftalmologia Geral e Retina",
      formation: "CRM-SP 85608",
      location: "Unidade Paraíso",
      hours: "Seg/Qua/Sex | 13h-19h",
      experience: "Mais de 20 anos de experiência"
    },
    {
      name: "Dra. Liliana Campos",
      specialty: "Oftalmologia Pediátrica e Refrativa",
      formation: "CRM-SP 123456",
      location: "Unidade Campo Belo",
      hours: "Ter/Qui/Sáb | 8h-12h",
      experience: "Especialista em cirurgias refrativas"
    }
  ];

  // Unidades
  const units = [
    {
      name: "Unidade Paraíso",
      address: "Rua Correia Dias, 184, Conjunto 62",
      hours: "Seg/Qua/Sex | 13h-19h",
      doctor: "Dra. Simone Finzi",
      phone: "(11) 99999-9999",
      mapLink: "#"
    },
    {
      name: "Unidade Campo Belo",
      address: "Rua Vieira de Moraes, 2110, Conjunto 207",
      hours: "Ter/Qui/Sáb | 8h-12h",
      doctor: "Dra. Liliana Campos",
      phone: "(11) 99999-9999",
      mapLink: "#"
    }
  ];

  return (
    <>
      <Head>
        <title>Clínica Oftalmologia São Paulo | Paraíso e Campo Belo | Agende Consulta WhatsApp</title>
        <meta name="description" content="Clínica Hailife - Agende sua consulta de oftalmologia em São Paulo. Unidades Paraíso e Campo Belo. Atendimento pelas Dras. Simone Finzi e Liliana Campos. Agende via WhatsApp!" />
        <meta name="keywords" content="oftalmologia são paulo, clínica oftalmologia paraíso, clínica oftalmologia campo belo, agendar consulta oftalmologia, dra simone finzi, dra liliana campos, oftalmologia whatsapp" />
        <meta property="og:title" content="Clínica Oftalmologia São Paulo | Paraíso e Campo Belo | Agende Consulta WhatsApp" />
        <meta property="og:description" content="Clínica Hailife - Agende sua consulta de oftalmologia em São Paulo. Unidades Paraíso e Campo Belo. Atendimento pelas Dras. Simone Finzi e Liliana Campos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.clinicahailife.com.br" />
        <link rel="canonical" href="https://www.clinicahailife.com.br" />
        <script type="application/ld+json">{JSON.stringify(schemaJson)}</script>
      </Head>

      {/* Header com CTA WhatsApp acima do fold */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-blue-800">Clínica <span className="text-green-600">Hailife</span></h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full flex items-center transition-all duration-300 shadow-lg"
            >
              <FaWhatsapp className="mr-2" />
              Agendar Consulta Agora
            </motion.button>
            
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <a href="#unidades" className="text-gray-700 hover:text-blue-700">Nossas Unidades</a>
              <a href="#medicas" className="text-gray-700 hover:text-blue-700">Nossas Médicas</a>
              <a href="#depoimentos" className="text-gray-700 hover:text-blue-700">Depoimentos</a>
              <a href="#contato" className="text-gray-700 hover:text-blue-700">Contato</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Clínica de Oftalmologia em <span className="text-green-600">São Paulo</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Agende sua consulta com as especialistas Dra. Simone Finzi (Paraíso) e Dra. Liliana Campos (Campo Belo) via WhatsApp
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl flex items-center justify-center mx-auto transition-all duration-300 shadow-xl"
            >
              <FaWhatsapp className="mr-3 text-2xl" />
              Agendar Consulta Agora via WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Nossas Unidades */}
      <section id="unidades" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nossas Unidades</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {units.map((unit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200"
              >
                <div className="flex items-start mb-4">
                  <FaMapMarkerAlt className="text-green-600 mt-1 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">{unit.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-2"><strong>Endereço:</strong> {unit.address}</p>
                <p className="text-gray-600 mb-2"><strong>Horário:</strong> {unit.hours}</p>
                <p className="text-gray-600 mb-4"><strong>Médica:</strong> {unit.doctor}</p>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full flex items-center text-sm"
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </button>
                  
                  <a 
                    href={unit.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center text-sm"
                  >
                    <FaMapMarkerAlt className="mr-2" /> Ver no Mapa
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossas Médicas */}
      <section id="medicas" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nossas Médicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center mb-4">
                  <FaUserMd className="text-blue-600 text-2xl mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-2"><strong>Especialidade:</strong> {doctor.specialty}</p>
                <p className="text-gray-600 mb-2"><strong>Formação:</strong> {doctor.formation}</p>
                <p className="text-gray-600 mb-2"><strong>Unidade:</strong> {doctor.location}</p>
                <p className="text-gray-600 mb-2"><strong>Horário:</strong> {doctor.hours}</p>
                <p className="text-gray-600 mb-4"><strong>Experiência:</strong> {doctor.experience}</p>
                
                <button
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full flex items-center w-full justify-center"
                >
                  <FaWhatsapp className="mr-2" /> Agendar Consulta
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">O Que Dizem Nossos Pacientes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`text-${i < testimonial.rating ? 'yellow' : 'gray'}-400`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para cuidar da sua saúde visual?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agende sua consulta em minutos via WhatsApp. Atendimento personalizado pelas melhores oftalmologistas de São Paulo.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            className="bg-white text-green-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg md:text-xl flex items-center justify-center mx-auto transition-all duration-300"
          >
            <FaWhatsapp className="mr-3 text-2xl" />
            Agendar Consulta via WhatsApp
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Clínica Hailife</h3>
              <p className="text-gray-300">
                Mais de 20 anos cuidando da sua saúde visual com excelência e tecnologia de ponta.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contato</h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-300">
                  <FaWhatsapp className="mr-3 text-green-500" />
                  (11) 99999-9999 (WhatsApp)
                </p>
                <p className="flex items-center text-gray-300">
                  <FaPhone className="mr-3 text-green-500" />
                  (11) 3333-3333
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Unidades</h3>
              <div className="space-y-2">
                <p className="flex items-start text-gray-300">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-green-500" />
                  <span><strong>Paraíso:</strong> Rua Correia Dias, 184</span>
                </p>
                <p className="flex items-start text-gray-300">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-green-500" />
                  <span><strong>Campo Belo:</strong> Rua Vieira de Moraes, 2110</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Clínica Hailife. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}