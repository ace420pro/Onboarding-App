import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface P2ClientForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  ssn?: string
}

export default function AddP2Client() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<P2ClientForm>({
    defaultValues: {
      country: 'US'
    }
  })

  const onSubmit = async (data: P2ClientForm) => {
    setIsSubmitting(true)
    try {
      // TODO: Replace with actual API call
      console.log('Creating P2 client:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('P2 client created successfully!')
      navigate('/p2-clients')
    } catch (error) {
      toast.error('Failed to create P2 client')
      console.error('Error creating P2 client:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/p2-clients')}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to P2 Clients
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Add New P2 Client</h1>
          <p className="mt-2 text-sm text-gray-700">
            Enter the P2 client information to start the onboarding process.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="card p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label className="form-label">
                First Name *
              </label>
              <input
                type="text"
                className="form-input"
                {...register('firstName', {
                  required: 'First name is required',
                  minLength: { value: 1, message: 'First name is required' }
                })}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="form-label">
                Last Name *
              </label>
              <input
                type="text"
                className="form-input"
                {...register('lastName', {
                  required: 'Last name is required',
                  minLength: { value: 1, message: 'Last name is required' }
                })}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                className="form-input"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="form-label">
                Phone Number *
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="+1-555-123-4567"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Invalid phone number format'
                  }
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="form-label">
                Date of Birth *
              </label>
              <input
                type="date"
                className="form-input"
                {...register('dateOfBirth', {
                  required: 'Date of birth is required'
                })}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* SSN (Optional) */}
            <div>
              <label className="form-label">
                SSN (Optional)
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="123456789"
                maxLength={9}
                {...register('ssn', {
                  pattern: {
                    value: /^\d{9}$/,
                    message: 'SSN must be 9 digits'
                  }
                })}
              />
              {errors.ssn && (
                <p className="mt-1 text-sm text-red-600">{errors.ssn.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter 9 digits without dashes or spaces. This will be encrypted for security.
              </p>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="form-label">
                Street Address *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="123 Main Street"
                {...register('address', {
                  required: 'Address is required',
                  minLength: { value: 5, message: 'Address must be at least 5 characters' }
                })}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="form-label">
                City *
              </label>
              <input
                type="text"
                className="form-input"
                {...register('city', {
                  required: 'City is required',
                  minLength: { value: 1, message: 'City is required' }
                })}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="form-label">
                State *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="CA"
                {...register('state', {
                  required: 'State is required',
                  minLength: { value: 2, message: 'State must be at least 2 characters' }
                })}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            {/* ZIP Code */}
            <div>
              <label className="form-label">
                ZIP Code *
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="12345"
                {...register('zipCode', {
                  required: 'ZIP code is required',
                  minLength: { value: 5, message: 'ZIP code must be at least 5 characters' }
                })}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="form-label">
                Country *
              </label>
              <select
                className="form-select"
                {...register('country', { required: 'Country is required' })}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/p2-clients')}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </>
              ) : (
                'Create P2 Client'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}