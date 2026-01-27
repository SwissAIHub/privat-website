'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'

const contactSchema = z.object({
  name: z.string().min(2, 'Name ist erforderlich'),
  email: z.string().email('Gueltige E-Mail-Adresse erforderlich'),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen lang sein'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Server Action or API route for form submission
    console.log('Form submitted:', data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-text-secondary">
        Nachricht gesendet. Ich melde mich.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      <div>
        <label htmlFor="name" className="block text-sm text-text-secondary mb-2">
          Name
        </label>
        <Input
          id="name"
          placeholder="Ihr Name"
          error={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-text-secondary mb-2">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="ihre@email.com"
          error={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-text-secondary mb-2">
          Nachricht
        </label>
        <Textarea
          id="message"
          placeholder="Worum geht es?"
          error={!!errors.message}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="text-sm text-accent hover:underline disabled:opacity-50 disabled:no-underline"
      >
        {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
      </button>
    </form>
  )
}
