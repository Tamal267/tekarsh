'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const reviews = [
  {
    id: 1,
    image: '/placeholder.svg?height=40&width=40',
    name: 'Jane Doe',
    profession: 'Marketing Manager',
    text: "Tekarsh's support team is incredibly responsive and helpful. They resolved my issue quickly and efficiently.",
  },
  {
    id: 2,
    image: '/placeholder.svg?height=40&width=40',
    name: 'John Smith',
    profession: 'Software Engineer',
    text: "I'm impressed with the level of expertise and professionalism shown by Tekarsh's engineers. They went above and beyond to solve my complex problem.",
  },
  {
    id: 3,
    image: '/placeholder.svg?height=40&width=40',
    name: 'Alice Johnson',
    profession: 'Business Owner',
    text: "Tekarsh's services have been a game-changer for our business. Their support and maintenance are top-notch.",
  },
  {
    id: 4,
    image: '/placeholder.svg?height=40&width=40',
    name: 'Bob Williams',
    profession: 'Project Manager',
    text: 'The team at Tekarsh is always willing to go the extra mile. Their dedication to customer satisfaction is truly commendable.',
  },
  {
    id: 5,
    image: '/placeholder.svg?height=40&width=40',
    name: 'Eve Brown',
    profession: 'Data Scientist',
    text: 'I highly recommend Tekarsh for anyone looking for reliable and efficient IT solutions. Their support is unparalleled.',
  },
]

export function ClientReviews() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1,
    )
  }

  const goToNext = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1,
    )
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800">
            Client Reviews
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            See what our clients are saying about our support services.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Review Content */}
          {[0, 1, 2].map((i) => {
            const index = (currentReviewIndex + i) % reviews.length
            const review = reviews[index]
            return (
              <div
                key={review.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={review.image || '/placeholder.svg'}
                      alt={review.name}
                    />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-800">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.profession}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-lg mt-4">
                  {'"'}
                  {review.text}
                  {'"'}
                </p>
              </div>
            )
          })}
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={goToPrevious}
            className="bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors p-2"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Previous Review</span>
          </button>
          <button
            onClick={goToNext}
            className="bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors p-2"
          >
            <ArrowRight className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Next Review</span>
          </button>
        </div>
      </div>
    </section>
  )
}
