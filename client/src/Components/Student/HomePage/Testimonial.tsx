import React from 'react'

const Testimonial: React.FC = () => {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <h4 className="text-center text-3xl font-semibold leading-8 text-gray-800 sm:text-4xl sm:leading-10 mb-10">Testimonials</h4>
                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                    <p>
                    This testimonial emphasizes the flexibility, quality of content, and support provided by the e-learning platform, which are key factors that users often appreciate. It also highlights the user's personal experience, including the completion of a certification, which adds a personal touch and credibility to the testimonial.
                    </p>
                </blockquote>
                <figcaption className="mt-10">
                    <img
                        className="mx-auto h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&it=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                        <div className="font-semibold text-gray-900">Kevin</div>
                        <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <div className="text-gray-600">Testimonials</div>
                    </div>
                </figcaption>
            </div>
        </section>
    </div>
  )
}

export default Testimonial
