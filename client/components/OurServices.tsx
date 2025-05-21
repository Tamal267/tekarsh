'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { bottomToTopVarient } from '../lib/animation'

const ourServices = [
  {
    title: 'Software Development',
    description:
      'Tekarsh believes in dynamics and diversity. We evolve with the world we live in, from point origin to a forever expanding universe. Challenges induce growth, so do we. We look beyond the problem to recognize the underlying challenge as we live and breathe. So if you are looking forward to experiencing excellence with programmatic marvel, welcome aboard!',
    icon: '/images/h3icon1.svg',
    link: '/services/software-development',
  },
  {
    title: 'Quality Assurance',
    description:
      'Here at TEKARSH, ROI is king. Our goal is to deliver a top quality product at top speed. Our team takes ownership over quality assurance practices. Through shared responsibility and a fluid communication process, our quality assurance engineers are there for you from A to Z.',
    icon: '/images/h3icon2.svg',
    link: '/services/quality-assurance',
  },
  {
    title: 'Client Services',
    description:
      'Our highly trained client service team provides 24×7 support to ensure prompt and efficient response to resolve any emerging queries for our clients. We believe in succeeding with our clients because YOUR success is our success. We provide precise solutions for your problems and help you at each step of the process.',
    icon: '/images/h3icon3.svg',
    link: '/services/client-services',
  },
  {
    title: 'Data Processing',
    description:
      'Our data analyst team is highly trained to ensure our clients’ data is processed efficiently. Our team can organize your data processes to simplify your operations and save your time for better decision-making at a low cost. We use our proprietary technologies, techniques and trained professionals, to process data from any format',
    icon: '/images/h3icon4.svg',
    link: '/services/data-processing',
  },
]

export function OurServices({ id }: { id?: string }) {
  return (
    <section
      className="w-full py-12 md:py-24 bg-white"
      id={id}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col justify-between gap-6 md:gap-10">
          <div className="flex flex-col w-full items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Our Services
            </h2>
            <div className="border-2 border-green-600 w-12"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {ourServices.map((item, index) => (
              <motion.div
                variants={bottomToTopVarient}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="p-4 md:p-6 flex flex-col gap-2 md:gap-3 shadow-md rounded-md h-full"
                key={index}
              >
                <div className="mb-2">
                  <Image
                    src={item.icon ? item.icon : '/images/h3icon1.svg'}
                    alt={`${item.title} icon`}
                    width={48}
                    height={48}
                    className="rounded-sm w-12 h-12"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <div className="text-gray-600 text-sm md:text-base flex-grow overflow-hidden text-ellipsis line-clamp-3">
                  {item.description}
                </div>
                <div className="mt-2 pt-2">
                  <Link
                    href={item.link}
                    className="text-green-600 hover:text-green-800 flex gap-2 items-center text-sm md:text-base"
                  >
                    Learn More <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
