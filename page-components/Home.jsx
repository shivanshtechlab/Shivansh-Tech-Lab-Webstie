'use client'

import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';
import Hero from '../sections/Hero/Hero';
import Process from '../sections/Process/Process';
import Technologies from '../sections/Technologies/Technologies';
import ERPModules from '../sections/ERPModules/ERPModules';
import CRMModules from '../sections/CRMModules/CRMModules';
import DashboardPreview from '../sections/DashboardPreview/DashboardPreview';
import MobileApp from '../sections/MobileApp/MobileApp';
import WebsiteShowcase from '../sections/WebsiteShowcase/WebsiteShowcase';
import SaaSShowcase from '../sections/SaaSShowcase/SaaSShowcase';
import Features from '../sections/Features/Features';
import Testimonials from '../sections/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <motion.main
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      <Hero />
      <WebsiteShowcase />
      <DashboardPreview />
      <MobileApp />
      <ERPModules />
      <CRMModules />
      <SaaSShowcase />
      <Process />
      <Technologies />
      <Features />
      <Testimonials />
      <Footer />
    </motion.main>
  );
}
