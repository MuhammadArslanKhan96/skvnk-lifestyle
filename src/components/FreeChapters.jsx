import { CheckIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

const features = [
  {
    name: 'Exclusive Content',
    description:
      'Eos laudantium repellat sed architecto earum unde incidunt. Illum sit dolores voluptatem.',
  },
  {
    name: 'Private Feed',
    description:
      'Eos laudantium repellat sed architecto earum unde incidunt. Illum sit dolores voluptatem.',
  },
  {
    name: 'Exclusive Live Streams',
    description:
      'Eos laudantium repellat sed architecto earum unde incidunt. Illum sit dolores voluptatem.',
  },
  {
    name: 'Discounts on merchandise',
    description:
      'Eos laudantium repellat sed architecto earum unde incidunt. Illum sit dolores voluptatem.',
  },
  {
    name: 'Club only merchandise',
    description:
      'Eos laudantium repellat sed architecto earum unde incidunt. Illum sit dolores voluptatem.',
  },
  {
    name: 'Chance to FaceTime Logan',
    description:
      'Eos laudantium repellat sed architecto earum unde incidunt. Illum sit dolores voluptatem.',
  },
]

export function FreeChapters() {
  return (
    <section
      style={{
        background:
          'url(https://images.ctfassets.net/y73ne2owszf3/cz3BGN7ZKWgF3gbwlllZn/323e1b521cb1ba18675dac2e635d1e8b/bg.fb4c566cecdebadaaa70a903c34109ab.png)',
      }}
      id="free-chapters"
      aria-label="Free preview"
      className="scroll-mt-14 bg-slate-100 sm:scroll-mt-32"
    >
      <div className="overflow-hidden lg:relative">
        <Container
          size="md"
          className="relative flex grid-cols-1 items-end justify-center gap-y-12 py-20 lg:static lg:grid-cols-2 lg:py-28 xl:py-32"
        >
          <div className="overflow-hidden bg-white p-3 shadow sm:rounded-lg">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl p-3">
                <div className="mx-auto flex max-w-2xl grid-cols-1 flex-col gap-x-8 gap-y-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  <div>
                    <p className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      What's included?
                    </p>
                  </div>
                  <dl className="col-span-2 grid grid-cols-1 gap-x-5 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-10">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="font-semibold text-gray-900">
                          <CheckIcon
                            className="absolute top-1 left-0 h-5 w-5 text-altGreen"
                            aria-hidden="true"
                          />
                          {feature.name}
                        </dt>
                        <dd className="mt-2">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>

                  <dl className="py-10 text-center  text-base text-gray-600">
                    <div className="relative">
                      <dt className="text-3xl font-semibold text-gray-900">
                        Member only giveaways
                      </dt>
                      <dd className="mt-2 text-lg">
                        Eos laudantium repellat sed architecto earum unde
                        incidunt. Illum sit dolores voluptatem.
                      </dd>
                    </div>
                    <div className="mt-3">
                      <Button href="/login" color="blue">
                        Join the Club
                      </Button>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
