'use client'

import {
  bottomToTopVarient,
  leftToRightVarient,
  rightToLeftVarient,
} from '@/lib/animation'
import { motion } from 'framer-motion'
import { CheckCircle, Code } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ClientReviews } from '../components/ClientReviews'
import { OurServices } from '../components/OurServices'
import { TextGen } from '../components/TextGen'
import Loading from './loading'

const whyChooseUs = [
  {
    title: 'Our team is your team',
    description:
      'We break the barriers of traditional onshore-offshore models by integrating seamlessly with your workflow.',
    icon: '/images/h2icon1.svg',
  },
  {
    title: 'Collaborative approach',
    description:
      "We don't just work for you — we work with you, aligning closely with your goals.",
    icon: '/images/h2icon2.svg',
  },
  {
    title: 'Agile and ultra-responsive',
    description:
      'Our teams are fast, adaptable, and committed to keeping feedback loops short and efficient.',
    icon: '/images/h2icon3.svg',
  },
  {
    title: 'US-market focused',
    description:
      'Our skilled professionals bring years of industry expertise to your projects.',
    icon: '/images/h2icon4.svg',
  },
  {
    title: 'Low turnover, high retention',
    description:
      'In an industry with high attrition, we retain 90% of our top talent — ensuring consistent quality and reliability.',
  },
]

const tierInfo = [
  {
    title: 'Tier 1 Support',
    description:
      'Our Tier 1 squad works directly with clients to address reported issues. Most problems are resolved at this stage through communication and quick fixes.',
    image: '/images/h4icon1.svg',
    icon: CheckCircle,
    features: [
      'Quick response time',
      'Direct client communication',
      'Issue documentation',
      'Basic troubleshooting',
    ],
  },
  {
    title: 'Tier 2 Support',
    description:
      'If issues persist, our Tier 2 engineers step in. They analyze code and data in-depth to efficiently resolve complex problems.',
    image: '/images/h4icon2.svg',
    icon: Code,
    features: [
      'Advanced technical support',
      'Code-level problem solving',
      'Performance optimization',
      'System architecture review',
    ],
  },
]

export default function Home() {
  const [bgLoaded, setBgLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.src = '/images/zigzag.svg'
    img.onload = () => setBgLoaded(true)
  }, [])

  if (!bgLoaded) {
    return (
      <div className="flex w-full items-center justify-center h-screen">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex w-full  items-center justify-center bg-gradient-to-b from-white to-green-50 overflow-x-hidden">
      <div className="flex flex-col gap-12 m-0 p-0">
        <div
          className="flex md:flex-row flex-col items-center justify-between md:justify-center p-0 m-0 md:h-screen"
          style={{
            backgroundImage: 'url("/images/zigzag.svg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="max-w-lg flex flex-col gap-4 p-4">
            <h1
              className="text-3xl font-bold text-green-600"
              style={{ fontFamily: 'var(--font-poetsen-one)' }}
            >
              Tekarsh
            </h1>
            <TextGen
              words="A fully integrated software development company, soup to nuts. Not
            only do we develop the highest of high quality custom software, we
            provide elite level quality assurance, partner-centric client
            services, and full-scope invoice processing. As your business needs
            grow, we'll be right there with you, ensuring that your business
            grows responsibly."
            />
          </div>
          <div className="overflow-hidden transition-transform duration-500 ease-in-out hover:scale-105 hover:rounded-2xl">
            <Image
              src="/images/l1hero1.svg"
              alt="Logo"
              width={1000}
              height={1000}
              className="rounded-sm w-96 h-auto hover:shadow-lg filter transition-all duration-500 ease-in-out hover:contrast-125"
              priority
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center justify-between p-4">
          <div className="max-w-lg flex flex-col flex-grow">
            <div className="overflow-hidden transition-transform duration-500 ease-in-out hover:scale-105 hover:rounded-2xl">
              <Image
                src="/images/hero2.svg"
                alt="Logo"
                width={1000}
                height={1000}
                className="rounded-sm hover:shadow-lg filter transition-all duration-500 ease-in-out hover:contrast-125 w-full h-auto"
                priority
              />
            </div>
          </div>
          <div
            className="flex flex-col gap-4 p-4"
            id="why-choose-us"
          >
            <h1 className="text-2xl font-bold ">
              <span className="text-green-500">Why</span> Choose Us
              <span className="text-green-500">?</span>
            </h1>
            {whyChooseUs.map((item, index) => (
              <motion.div
                variants={rightToLeftVarient}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                key={index}
                className="flex flex-row gap-4 items-center p-4 border-b overflow-hidden"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon ? item.icon : '/images/h2icon1.svg'}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="rounded-sm w-12 h-12"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">{item.title}</h1>
                  <p className="text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <OurServices id="services" />

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-center">Product Support</h1>
            <div className="border-2 border-green-600 w-12 mx-auto"></div>
          </div>

          <div>
            <p className="text-center text-md p-4">
              Tekarsh provides 24/7 support for all of our products. We are
              committed to ensuring that your experience with our software is
              seamless and efficient. If you have any questions or need
              assistance with our products, please don{"'"}t hesitate to reach
              out to us.
            </p>
          </div>

          <div className="flex md:flex-row flex-col gap-8 justify-center">
            {tierInfo.map((item, index) => (
              <motion.div
                variants={
                  index % 2 === 0 ? leftToRightVarient : rightToLeftVarient
                }
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-xl shadow-md rounded-md"
                key={index}
              >
                <motion.div
                  className="p-4 relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Image
                    src={item.image ? item.image : '/images/h4icon1.svg'}
                    alt="Logo"
                    width={1000}
                    height={1000}
                    className="rounded-sm w-full h-auto hover:shadow-md"
                    priority
                  />
                </motion.div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <ul className="space-y-3">
                    {item.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start"
                      >
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center p-4">
          <motion.div
            variants={bottomToTopVarient}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative h-96 w-full rounded-2xl overflow-hidden group shadow-md"
          >
            <Image
              src="/images/h5icon1.svg"
              alt="Partner"
              fill
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all" />

            <div className="absolute inset-0 flex flex-col justify-around items-center gap-4 p-6 z-10">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  TEKARSH AS A PARTNER
                </h1>
              </div>
              <div className="flex flex-col gap-6 text-white tracking-wider text-center overflow-y-scroll">
                <p>
                  Here at TEKARSH, communication reigns supreme. Our highly
                  skilled teams are self-organized and take a cross-functional
                  approach to problem solving. Quality at top speed!
                </p>

                <p>
                  We value your time and won{"'"}t waste it. Our support team is
                  there whenever you need us. We work for you — but more
                  importantly, we work with you. That{"'"}s why we call our
                  clients partners. We listen, adapt, and deliver through a
                  custom-fit model tailored to each client{"'"}s unique needs.
                </p>

                <p>
                  Stay agile, reduce overhead, and free up your budget with
                  Tekarsh{"'"}s efficient delivery model. We{"'"}ve stayed lean
                  on purpose — it lets us move fast and work smarter, always
                  aligned with your success.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <ClientReviews />
      </div>
    </div>
  )
}
