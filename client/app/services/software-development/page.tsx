import {
  Cloud,
  Code,
  Database,
  Laptop,
  Lightbulb,
  Smartphone,
} from 'lucide-react'
import Image from 'next/image'
import { getBlur } from '../../../lib/utils'

export default function SoftwareDevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="relative w-full h-[50vh] md:h-[60vh] bg-black">
          <Image
            src="/images/s1img1.svg"
            alt="Software developer working on code"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-md">
                Software Development at Tekarsh
              </h1>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                  More Than Just Code
                </h2>

                <div className="space-y-8">
                  {[
                    {
                      title: 'Dynamic & Diverse Thinking',
                      description:
                        "Through continuous learning and adaptation to the ever-expanding universe, we grow by adapting to every new challenge. Our developers don't just solve — they evolve.",
                    },
                    {
                      title: 'Challenges Drive Us',
                      description:
                        'At Tekarsh, we look beyond problems and into core challenges. With a forward-thinking mindset, we approach every project with innovation, not just maintenance.',
                    },
                    {
                      title: 'A Programmatic Marvel',
                      description:
                        "Our divergent development team aims for programmatic brilliance. We're not here to patch — we're here to engineer lasting solutions with creativity and precision.",
                    },
                    {
                      title: 'Committed to Progress',
                      description:
                        "In this radical world of tech, we value daily progress over perfection. That's why we never settle. We continue to push boundaries.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 mb-8"
                    >
                      <div className="w-1 bg-green-600 flex-shrink-0"></div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/s1img2.jpg"
                  alt="Team collaborating on software development"
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={getBlur()}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
              Our Toolbox of Innovation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Code,
                  title: 'Core Languages & Frameworks',
                  items: ['Java', 'C#', 'Python', 'Angular.js', 'React.js'],
                  description:
                    'Building robust foundations with cutting-edge technologies',
                },
                {
                  icon: Smartphone,
                  title: 'Mobile Development',
                  items: ['Android', 'Flutter', 'React Native'],
                  description:
                    'Creating seamless mobile experiences across platforms',
                },
                {
                  icon: Cloud,
                  title: 'Web Services & Cloud',
                  items: ['AWS', 'Cross-Platform Tech', 'Web Apps'],
                  description: 'Scalable cloud solutions for modern businesses',
                },
                {
                  icon: Database,
                  title: 'Databases',
                  items: ['Relational & Non-relational DBMS'],
                  description:
                    'Efficient data management and storage solutions',
                },
                {
                  icon: Laptop,
                  title: 'Advanced Tech',
                  items: ['Machine Learning', 'Data Science'],
                  description:
                    'Pushing boundaries with AI and advanced analytics',
                },
                {
                  icon: Lightbulb,
                  title: 'Innovation Lab',
                  items: ['Emerging Technologies', 'R&D'],
                  description: 'Exploring the future of technology',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 mb-6">
                    <item.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    {item.items.map((listItem, i) => (
                      <li key={i}>{listItem}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
              How We Build Excellence
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  src: '/images/s1img3.svg',
                  alt: 'Team collaboration',
                  title: 'Driven by collaboration',
                },
                {
                  src: '/images/s1img4.svg',
                  alt: 'Results focused development',
                  title: 'Focused on results, not just delivery',
                },
                {
                  src: '/images/s1img5.svg',
                  alt: 'Purposeful software development',
                  title: 'We build software with purpose',
                },
                {
                  src: '/images/s1img6.svg',
                  alt: 'Future-ready technology',
                  title: "Ready for tomorrow's tech",
                },
              ].map(({ src, alt, title }, index) => (
                <div
                  key={index}
                  className="flex flex-col"
                >
                  <div className="h-48 md:h-64 relative rounded-lg overflow-hidden mb-4">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover  filter transition-all duration-300 hover:contrast-125"
                      placeholder="blur"
                      blurDataURL={getBlur()}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    {title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
