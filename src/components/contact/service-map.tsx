'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/ui/container'

export function ServiceMap() {
  return (
    <section className="border-t border-white/5 py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            Our Reach
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white md:text-5xl">Service Coverage</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Map Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5"
          >
            <div className="relative aspect-square">
              <Image
                src="/images/mirissa.jpg"
                alt="Mirissa beach, Sri Lanka"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>

          {/* Service Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">All of Sri Lanka</h3>
              <p className="text-gray-400">
                We operate throughout Sri Lanka, from the bustling streets of Colombo to the serene beaches of Mirissa,
                and from the misty mountains of Ella to the ancient temples of Sigiriya.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div>
                  <p className="font-semibold text-white">Major Cities</p>
                  <p className="text-sm text-gray-400">Colombo, Kandy, Galle, Mirissa, Ella</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <p className="font-semibold text-white">National Parks</p>
                  <p className="text-sm text-gray-400">Yala Safari, Horton Plains, Peak Wilderness</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <p className="font-semibold text-white">Airport Access</p>
                  <p className="text-sm text-gray-400">Bandaranaike International & Regional Airports</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <p className="font-semibold text-white">Coastal Coverage</p>
                  <p className="text-sm text-gray-400">South & West coasts including all beach resorts</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
