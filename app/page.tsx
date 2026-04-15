'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaWhatsapp, FaMapMarkerAlt, FaPhone, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Componente do slider de hero
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slides com as especialidades
  const slides = [
    { id: 1, title: 'Atendimentos de Adultos e Crianças', subtitle: 'Nós cuidamos da saúde ocular da sua família!', image: '/images/slider/slide-1.jpg' },
    { id: 2, title: 'Cirurgia de Catarata', subtitle: 'Usamos a mais recente tecnologia para oferecer a maior precisão e os melhores resultados visuais.', image: '/images/slider/slide-2.jpg' },
    { id: 3, title: 'Cirurgia Refrativa', subtitle: 'Miopia, Astigmatismo e Hipermetropia - FemtoLASIK', image: '/images/slider/slide-3.jpg' },
    { id: 4, title: 'Segunda Opinião', subtitle: 'Solicite uma segunda opinião de nossos especialistas por Telemedicina. Atendimento por convênios e particular.', image: '/images/slider/slide-4.jpg' },
    { id: 5, title: 'Adaptação de Lentes de Contato', subtitle: 'Adaptação de lentes de contato gelatinosas e especiais para ceratocone.', image: '/images/slider/slide-5.jpg' },
    { id: 6, title: 'Experiência - Retina', subtitle: 'Tratamento especializado nas doenças de retina', image: '/images/slider/slide-6.jpg' },
    { id: 7, title: 'Genética Ocular', subtitle: 'Centro Especializado em Doenças Hereditárias Oculares.', image: '/images/slider/slide-7.jpg' },
    { id: 8, title: 'Oftalmopediatria', subtitle: 'Especialidade dedicada ao cuidado da saúde visual infantil', image: '/images/slider/slide-8.jpg' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden rounded-xl mx-4 my-2">
      <div className="w-full h-64 md:h-96 flex items-center justify-center">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`relative w-full h-full flex items-center justify-center ${index === currentSlide ? 'block' : 'hidden'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex items-center">
              <div className="text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-6 max-w-2xl">{slide.subtitle}</p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition">
                  Saiba mais
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Navegação por setas */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all"
        aria-label="Slide anterior"
      >
        <FaChevronLeft />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow-lg transition-all"
        aria-label="Próximo slide"
      >
        <FaChevronRight />
      </button>
      
      {/* Navegação por dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Componente do botão flutuante do WhatsApp
const WhatsAppButton = () => {
  return (
    <Link 
      href="https://wa.me/551141142158" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 md:p-5 shadow-2xl transition-all duration-300 flex items-center justify-center"
      style={{ width: '64px', height: '64px' }}
    >
      <FaWhatsapp className="text-3xl md:text-4xl" />
    </Link>
  );
};

// Componente das unidades
const Unidades = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Unidade Paraíso */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-green-600">
        <div className="flex items-start mb-6">
          <img 
            src="/images/unidades/paraiso.jpg" 
            alt="Unidade Paraíso" 
            className="w-24 h-24 object-cover rounded-lg mr-4"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Unidade Paraíso</h3>
            <p className="text-gray-600">Rua Correia Dias, 184, conjunto 62<span className="hidden lg:inline"> - </span><span className="lg:hidden block"> </span>Paraíso - São Paulo</p>
            <p className="text-gray-500 text-sm">A 100 metros da estação do metrô do Paraíso</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <p className="flex items-center text-gray-700">
            <FaClock className="text-green-600 mr-3" />
            <strong>Horário:</strong> <span className="ml-1">Seg/Qua/Sex | 13h-19h</span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaPhone className="text-green-600 mr-3" />
            <strong>Médica:</strong> <span className="ml-1">Dra. Simone Finzi</span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaPhone className="text-green-600 mr-3" />
            <strong>Telefone:</strong> <span className="ml-1">(11) 4114-2158</span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="text-green-600 mr-3" />
            <strong>CEP:</strong> <span className="ml-1">04104-000</span>
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link 
            href="https://wa.me/551141142158" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full flex items-center text-sm font-semibold"
          >
            <FaWhatsapp className="mr-2" /> WhatsApp Agora
          </Link>
          <a 
            href="https://www.google.com/maps/place/Clinica+Hailife+_+Unidade+Paraiso/@-23.576838,-46.641412,14z/data=!4m5!3m4!1s0x0:0xb2e81bbd1fa5e8a!8m2!3d-23.576838!4d-46.641412?hl=pt-BR" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full flex items-center text-sm font-semibold"
          >
            <FaMapMarkerAlt className="mr-2" /> Ver no Google Maps
          </a>
        </div>
      </div>
      
      {/* Unidade Campo Belo */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-green-600">
        <div className="flex items-start mb-6">
          <img 
            src="/images/unidades/campobelo.jpg" 
            alt="Unidade Campo Belo" 
            className="w-24 h-24 object-cover rounded-lg mr-4"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Unidade Campo Belo</h3>
            <p className="text-gray-600">Rua Vieira de Moraes, 2110, conjunto 207<span className="hidden lg:inline"> - </span><span className="lg:hidden block"> </span>Campo Belo - São Paulo</p>
            <p className="text-gray-500 text-sm">Próximo ao Aeroporto de Congonhas</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <p className="flex items-center text-gray-700">
            <FaClock className="text-green-600 mr-3" />
            <strong>Horário:</strong> <span className="ml-1">Ter/Qui/Sáb | 8h-12h</span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaPhone className="text-green-600 mr-3" />
            <strong>Médica:</strong> <span className="ml-1">Dra. Liliana Campos</span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaPhone className="text-green-600 mr-3" />
            <strong>Telefone:</strong> <span className="ml-1">(11) 2574-7858</span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="text-green-600 mr-3" />
            <strong>CEP:</strong> <span className="ml-1">04617-007</span>
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link 
            href="https://wa.me/551141142158" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full flex items-center text-sm font-semibold"
          >
            <FaWhatsapp className="mr-2" /> WhatsApp Agora
          </Link>
          <a 
            href="https://www.google.com/maps/place/Clinica+Hailife+-+Unidade+Campo+Belo/@-23.6023572,-46.669961,14z/data=!4m8!1m2!2m1!1sClinica+Hailife+!3m4!1s0x94ce5b3623bd662f:0x374b3f9f8e19f082!8m2!3d-23.6278784!4d-46.663405?hl=pt-BR" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full flex items-center text-sm font-semibold"
          >
            <FaMapMarkerAlt className="mr-2" /> Ver no Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente das médicas
const Medicas = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Dra. Simone Finzi */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        <div className="flex items-start mb-6">
          <img 
            src="/images/medicas/simone.jpg" 
            alt="Dra. Simone Finzi" 
            className="w-32 h-32 rounded-full object-cover mr-4 flex-shrink-0"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Dra. Simone Finzi</h3>
            <p className="text-green-600 font-medium text-lg">Oftalmologia Geral, Retina e Genética Ocular</p>
            <p className="text-gray-500">CRM: <span>CRM-SP 85608</span></p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <p className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="text-green-600 mr-3" />
            <strong>Unidade:</strong> <span className="ml-1">Unidade Paraíso</span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaClock className="text-green-600 mr-3" />
            <strong>Horário:</strong> <span className="ml-1">Seg/Qua/Sex | 13h-19h</span>
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" className="text-blue-600 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path></svg>Formação e Experiência
          </h4>
          <ul className="space-y-2">
            <li className="text-gray-600 text-sm list-disc list-inside">Formada em Medicina pela Santa Casa de São Paulo (FCMSCSP)</li>
            <li className="text-gray-600 text-sm list-disc list-inside">Residência médica em Oftalmologia</li>
            <li className="text-gray-600 text-sm list-disc list-inside">Especialização em Glaucoma no New England Eye Center, Boston - EUA</li>
            <li className="text-gray-600 text-sm list-disc list-inside">Genética Ocular no Wilmer Eye Institute – Johns Hopkins Hospital</li>
            <li className="text-gray-600 text-sm list-disc list-inside">Doutorado em Oftalmologia na UNIFESP</li>
            <li className="text-gray-600 text-sm list-disc list-inside">Ex-chefe do setor de Genética Ocular do Hospital das Clínicas da FMUSP</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 italic">"Mais de 20 anos de experiência em cirurgias de Catarata, Cirurgia Refrativa, Glaucoma e diversas doenças oculares"</p>
        </div>
        
        <div className="mb-6 bg-yellow-50 rounded-xl p-4">
          <h5 className="font-bold text-gray-800 mb-2 flex items-center">
            <FaPhone className="text-yellow-600 mr-2" />Atuação Acadêmica
          </h5>
          <p className="text-gray-600 text-sm">Já publicou diversos artigos em revistas nacionais e internacionais e capítulos de livros. Palestrante e coordenadora de cursos nos maiores Congressos de Oftalmologia do país e internacionais.</p>
        </div>
        
        <Link 
          href="https://wa.me/551141142158" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full w-full flex items-center justify-center transition-all duration-300"
        >
          <FaWhatsapp className="mr-2" />Agendar Consulta com Simone
        </Link>
      </div>
      
      {/* Dra. Liliana Campos */}
      <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        <div className="flex items-start mb-6">
          <img 
            src="/images/medicas/liliana.jpg" 
            alt="Dra. Liliana Campos" 
            className="w-32 h-32 rounded-full object-cover mr-4 flex-shrink-0"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Dra. Liliana Campos</h3>
            <p className="text-green-600 font-medium text-lg">Oftalmopediatria e Cirurgia Refrativa</p>
            <p className="text-gray-500">CRM: <span>CRM-SP 123456</span></p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <p className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="text-green-600 mr-3" />
            <strong>Unidade:</strong> <span className="ml-1">Unidade Campo Belo</span>
          </p>
          <p className="flex items-center text-gray-700">
            <FaClock className="text-green-600 mr-3" />
            <strong>Horário:</strong> <span className="ml-1">Ter/Qui/Sáb | 8h-12h</span>
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" className="text-blue-600 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path></svg>Especialidades
          </h4>
          <ul className="space-y-2">
            <li className="text-gray-600 text-sm list-disc list-inside">Oftalmopediatria</li>
            <li className="text-gray-600 text-sm list-disc list-inside">Cirurgia Refrativa</li>
            <li className="text-gray-600 text-sm list-disc list-inside">Cirurgia de Catarata</li>
            <li className="text-gray-600 text-sm list-disc list-inside">Glaucoma</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 italic">"Especialista em tratamentos oftalmológicos para crianças e adultos, com foco em cirurgias refrativas de alta precisão"</p>
        </div>
        
        <Link 
          href="https://wa.me/551141142158" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full w-full flex items-center justify-center transition-all duration-300"
        >
          <FaWhatsapp className="mr-2" />Agendar Consulta com Liliana
        </Link>
      </div>
    </div>
  );
};

// Componente de especialidades
const Especialidades = () => {
  const especialidades = [
    'Catarata', 'Glaucoma', 'Retina', 'Ceratocone', 
    'Cirurgia Refrativa', 'Oftalmopediatria', 'Ambliopia', 
    'Estrabismo', 'Pterígio', 'Uveíte', 'Neuroftalmologia', 
    'Orbita e Anexos', 'Plástica Facial', 'Terapia Ocupacional', 
    'Psicologia', 'Fonoaudiologia', 'Nutrição', 'Fisioterapia'
  ];
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {especialidades.map((especialidade, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-center text-center h-24 transition-transform hover:scale-105"
        >
          <span className="text-gray-700 font-medium">{especialidade}</span>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Clínica Hailife | Oftalmologia São Paulo | Agende WhatsApp</title>
        <meta name="description" content="Clínica Hailife - Agende sua consulta de oftalmologia em São Paulo. Unidades Paraíso e Campo Belo. Atendimento pelas Dras. Simone Finzi e Liliana Campos." />
        <meta name="keywords" content="oftalmologia são paulo, clínica oftalmologia paraíso, clínica oftalmologia campo belo, agendar consulta oftalmologia, dra simone finzi, dra liliana campos, oftalmologia whatsapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Schema.org markup for MedicalBusiness */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "MedicalClinic",
                  "@id": "https://www.clinicahailife.com.br/#medicalclinic",
                  "name": "Clínica Hailife - Clínica de Olhos Dra. Simone Finzi",
                  "description": "Clínica especializada em oftalmologia com mais de 20 anos de experiência em São Paulo",
                  "address": [
                    {
                      "@type": "PostalAddress",
                      "streetAddress": "Rua Correia Dias, 184, Conjunto 62",
                      "addressLocality": "São Paulo",
                      "addressRegion": "SP",
                      "postalCode": "04104-000",
                      "addressCountry": "BR",
                      "description": "Unidade Paraíso - 100 metros do metrô Paraíso"
                    },
                    {
                      "@type": "PostalAddress",
                      "streetAddress": "Rua Vieira de Moraes, 2110, Conjunto 207",
                      "addressLocality": "São Paulo",
                      "addressRegion": "SP",
                      "postalCode": "04617-007",
                      "addressCountry": "BR",
                      "description": "Unidade Campo Belo - próximo ao Aeroporto de Congonhas"
                    }
                  ],
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Wednesday", "Friday"],
                      "opens": "13:00",
                      "closes": "19:00",
                      "description": "Unidade Paraíso"
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Tuesday", "Thursday", "Saturday"],
                      "opens": "08:00",
                      "closes": "12:00",
                      "description": "Unidade Campo Belo"
                    }
                  ],
                  "telephone": "+551141142158",
                  "url": "https://www.clinicahailife.com.br",
                  "email": "atendimento@clinicahailife.com.br",
                  "priceRange": "R$",
                  "medicalSpecialty": "Ophthalmology",
                  "providerType": "HealthcareProvider"
                },
                {
                  "@type": "Person",
                  "name": "Dra. Simone Finzi",
                  "jobTitle": "Diretora Técnica da Clínica Hailife",
                  "description": "Oftalmologista com 20+ anos de experiência. CRM-SP 85608. Formada pela FCMSCSP, residência em Oftalmologia, especialização em Glaucoma no New England Eye Center (Boston, EUA), Genética Ocular no Wilmer Eye Institute (Johns Hopkins Hospital), Doutorado em Oftalmologia na UNIFESP. Ex-chefe do setor de Genética Ocular do HC-FMUSP. Publicou diversos artigos nacionais e internacionais.",
                  "sameAs": [
                    "https://www.facebook.com/clinicahailife",
                    "https://www.instagram.com/clinicahailife"
                  ]
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.clinicahailife.com.br/",
                  "name": "Clínica Hailife - Clínica de Olhos Dra. Simone Finzi",
                  "description": "A Clínica Hailife está situada na cidade de São Paulo a 100 metros da estação do metrô do Paraíso e em uma segunda unidade no Campo Belo, próximo ao Aeroporto de Congonhas. Mais de 20 anos de dedicação para disponibilizar o que há de mais moderno e seguro em oftalmologia clínica e cirúrgica.",
                  "isPartOf": {
                    "@id": "https://www.clinicahailife.com.br/#website"
                  },
                  "mainContentOfPage": {
                    "@type": "WebPageElement",
                    "isPartOf": {
                      "@id": "https://www.clinicahailife.com.br/"
                    },
                    "textContent": "Clínica de Oftalmologia em São Paulo com especialidades em Catarata, Genética Ocular, Cirurgia Refrativa, Oftalmopediatria, Retina, Glaucoma, Ceratocone e mais. Atendimento pelas Dra. Simone Finzi e Dra. Liliana Campos."
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://www.clinicahailife.com.br/#organization",
                  "name": "Clínica Hailife - Clínica de Olhos Dra. Simone Finzi",
                  "description": "A Clínica Hailife está situada na cidade de São Paulo a 100 metros da estação do metrô do Paraíso e em uma segunda unidade no Campo Belo, próximo ao Aeroporto de Congonhas. Possui toda uma infraestrutura moderna capaz de atender às mais diferentes e complexas doenças oftalmológicas.",
                  "url": "https://www.clinicahailife.com.br",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.clinicahailife.com.br/wp-content/uploads/2024/06/clinica_hailife.png"
                  },
                  "sameAs": [
                    "https://www.facebook.com/clinicahailife",
                    "https://www.instagram.com/clinicahailife"
                  ]
                }
              ]
            })
          }}
        />
      </Head>
      
      <WhatsAppButton />
      
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Clínica <span className="text-green-600">Hailife</span></h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#unidades" className="text-gray-700 hover:text-green-600 font-medium transition">Unidades</a>
            <a href="#especialidades" className="text-gray-700 hover:text-green-600 font-medium transition">Especialidades</a>
            <a href="#medicas" className="text-gray-700 hover:text-green-600 font-medium transition">Médicas</a>
            <a href="#depoimentos" className="text-gray-700 hover:text-green-600 font-medium transition">Depoimentos</a>
            <a href="#videos" className="text-gray-700 hover:text-green-600 font-medium transition">Vídeos</a>
          </div>
          
          <Link 
            href="https://wa.me/551141142158" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full flex items-center transition-all duration-300 shadow-lg hidden md:flex text-sm"
          >
            <FaWhatsapp className="mr-2 text-lg" />Agendar Consulta
          </Link>
          
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </header>
      
      <main>
        {/* Hero Section com Slider */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <HeroSlider />
          </div>
        </section>
        
        {/* Seção de Unidades */}
        <section id="unidades" className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Nossas Unidades</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">A 100 metros do metrô Paraíso e próximo ao Aeroporto de Congonhas</p>
            
            <Unidades />
          </div>
        </section>
        
        {/* Seção de Especialidades */}
        <section id="especialidades" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Nossas Especialidades</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Tratamentos especializados em diversas áreas da oftalmologia</p>
            
            <Especialidades />
          </div>
        </section>
        
        {/* Seção de Médicas */}
        <section id="medicas" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Nossas Médicas</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Especialistas com formação acadêmica impecável e mais de 20 anos de experiência</p>
            
            <Medicas />
          </div>
        </section>
        
        {/* Seção de Depoimentos */}
        <section id="depoimentos" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Depoimentos</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Veja o que nossos pacientes dizem sobre nosso atendimento</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81l-2.8-2.034z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"Excelente atendimento e profissionais altamente qualificados. Recomendo!"</p>
                <p className="mt-4 font-semibold text-gray-800">- Maria Silva</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81l-2.8-2.034z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"Fiz minha cirurgia de catarata aqui e o resultado foi excelente. Muito obrigado!"</p>
                <p className="mt-4 font-semibold text-gray-800">- João Oliveira</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461c.969 0 1.371-1.24.588-1.81l-2.8-2.034z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"Atendimento humanizado e tecnologia de ponta. A clínica que eu procurava há anos!"</p>
                <p className="mt-4 font-semibold text-gray-800">- Ana Costa</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Seção de Vídeos */}
        <section id="videos" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Vídeos Informativos</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Conheça mais sobre nossos procedimentos e especialidades</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 rounded-xl p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-gray-600">Cirurgia de Catarata</p>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-gray-600">Cirurgia Refrativa</p>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-gray-600">Exames Oftalmológicos</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Clínica Hailife</h3>
              <p className="text-gray-300">Especializada em oftalmologia com mais de 20 anos de experiência em São Paulo.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaPhone className="mr-2 text-green-400" />
                  <span>(11) 4114-2158</span>
                </li>
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-green-400" />
                  <span>Paraíso e Campo Belo</span>
                </li>
                <li className="flex items-center">
                  <FaWhatsapp className="mr-2 text-green-400" />
                  <span>WhatsApp: (11) 4114-2158</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Horários</h4>
              <ul className="space-y-2">
                <li>Paraíso: Seg/Qua/Sex | 13h-19h</li>
                <li>Campo Belo: Ter/Qui/Sáb | 8h-12h</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com/clinicahailife" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors">
                  <FaFacebookF />
                </a>
                <a href="https://instagram.com/clinicahailife" target="_blank" rel="noopener noreferrer" className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com/company/clinicahailife" target="_blank" rel="noopener noreferrer" className="bg-blue-800 hover:bg-blue-900 p-2 rounded-full transition-colors">
                  <FaLinkedinIn />
                </a>
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